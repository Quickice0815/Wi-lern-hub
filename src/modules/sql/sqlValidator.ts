// ============================================================
// SQL-FILTERUNG TRAINIEREN — Freitext-Validator
//
// Der ursprüngliche Swift-Prototyp hat den Freitext nur auf
// Zeichenketten-Gleichheit geprüft (Whitespace/Case normalisiert,
// aber exakter Text inkl. Klammern nötig). Das ist für Lernende
// unnötig streng (jede andere, aber gültige Formatierung wird als
// falsch gewertet). Diese Portierung parst die Eingabe stattdessen
// in eine kleine WHERE-Struktur (Feld/Operator/Wert-Bedingungen,
// per AND/OR verknüpft) und vergleicht diese Struktur inhaltlich
// mit der aus den Level-Daten abgeleiteten Musterlösung. Das deckt
// alle in den 10 Leveln vorkommenden Muster ab:
//   - Gleichheit:      Feld = 'Wert'
//   - Ungleichheit:     Feld <> 'Wert'   (auch != wird akzeptiert)
//   - Muster:           Feld LIKE '*Teil*'   (auch % als Platzhalter)
//   - Negiertes Muster: Feld NOT LIKE '*Teil*'
//   - Datumsgrenzen:    Feld >= 'TT.MM.JJJJ'  /  Feld <= 'TT.MM.JJJJ'
//   - Verknüpfung:      AND (versch. Felder) / OR (gleiches Feld)
//
// Es ist bewusst KEINE vollständige SQL-Engine: unterstützt werden
// genau die obigen Vergleichs-/Verknüpfungsformen, ohne Klammer-
// Präzedenz-Auswertung (jede Klammerung wird beim Parsen entfernt;
// stattdessen bestimmt die Abfolge AND/OR die Gruppierung — exakt
// wie sie auch die Bausteine der Level vorgeben).
// ============================================================

import type { SqlLevel } from './data';

type Op = '=' | '<>' | 'LIKE' | 'NOT LIKE' | '>=' | '<=';

interface ParsedCondition {
  field: string;
  op: Op;
  value: string;
}

type ConditionGroup = ParsedCondition[];

const SELECT_COLUMNS_EXPECTED = ['GESCHÄFTSPARTNER', 'ORT', 'POSTLEITZAHL', 'LAND', 'ROLLE'];
const TABLE_NAME_EXPECTED = 'GESCHÄFTSPARTNER_VERWALTEN';

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Feldnamen-Aliase: Bildschirm-Beschriftung ("Land/Region") bzw.
// tolerante Schreibweisen (Leerzeichen statt Unterstrich, fehlende
// Umlaute) werden auf den kanonischen SQL-Feldnamen abgebildet.
const FIELD_ALIASES: Record<string, string> = {
  'LAND/REGION': 'LAND',
  'ANGELEGT AM': 'ANGELEGT_AM',
  'GEANDERT AM': 'GEANDERT_AM',
  'GEÄNDERT AM': 'GEANDERT_AM',
  'NACHNAME/NAME 1': 'NACHNAME/NAME1',
  'VORNAME/NAME 2': 'VORNAME/NAME2',
};

function normalizeField(raw: string): string {
  let t = stripDiacritics(raw).trim().toUpperCase();
  t = t.replace(/\s*\/\s*/g, '/');
  t = t.replace(/\s+/g, ' ');
  return FIELD_ALIASES[t] ?? t;
}

function normalizeValue(raw: string, op: Op): string {
  let v = raw.trim();
  v = v.replace(/^['"]/, '').replace(/['"]$/, '').trim();
  v = v.toUpperCase();
  if (op === 'LIKE' || op === 'NOT LIKE') {
    v = v.replace(/%/g, '*');
  }
  return v;
}

const OPERATOR_PATTERNS: [RegExp, Op][] = [
  [/\bNOT\s+LIKE\b/i, 'NOT LIKE'],
  [/\bLIKE\b/i, 'LIKE'],
  [/<>/, '<>'],
  [/!=/, '<>'],
  [/>=/, '>='],
  [/<=/, '<='],
  [/=/, '='],
];

function parseCondition(raw: string): ParsedCondition | null {
  const text = raw.trim();
  if (!text) return null;
  let found: { op: Op; index: number; length: number } | null = null;
  for (const [re, op] of OPERATOR_PATTERNS) {
    const m = re.exec(text);
    if (m) {
      found = { op, index: m.index, length: m[0].length };
      break;
    }
  }
  if (!found) return null;
  const fieldRaw = text.slice(0, found.index);
  const valueRaw = text.slice(found.index + found.length);
  const field = normalizeField(fieldRaw);
  if (!field) return null;
  const value = normalizeValue(valueRaw, found.op);
  if (!value) return null;
  return { field, op: found.op, value };
}

function conditionKey(c: ParsedCondition): string {
  return `${c.field}|${c.op}|${c.value}`;
}

function groupKey(g: ConditionGroup): string {
  return g.map(conditionKey).sort().join('&');
}

function buildGroups(conds: ParsedCondition[], connectors: ('AND' | 'OR')[]): ConditionGroup[] {
  const groups: ConditionGroup[] = [];
  let current: ConditionGroup = [];
  conds.forEach((c, i) => {
    if (i === 0) {
      current = [c];
      return;
    }
    if (connectors[i - 1] === 'OR') {
      current.push(c);
    } else {
      groups.push(current);
      current = [c];
    }
  });
  if (current.length) groups.push(current);
  return groups;
}

function compareGroups(expected: ConditionGroup[], actual: ConditionGroup[]): boolean {
  if (expected.length !== actual.length) return false;
  const ek = expected.map(groupKey).sort();
  const ak = actual.map(groupKey).sort();
  return ek.every((k, i) => k === ak[i]);
}

/** Leitet die Ziel-Gruppenstruktur direkt aus den (bereits korrekt geordneten) Level-Bausteinen ab. */
export function expectedGroupsForLevel(level: SqlLevel): ConditionGroup[] {
  const whereIdx = level.blocks.indexOf('WHERE');
  const tokens = level.blocks.slice(whereIdx + 1);
  const conds: ParsedCondition[] = [];
  const connectors: ('AND' | 'OR')[] = [];
  for (const tok of tokens) {
    if (tok === 'AND' || tok === 'OR') {
      connectors.push(tok);
    } else {
      const c = parseCondition(tok);
      if (c) conds.push(c);
    }
  }
  return buildGroups(conds, connectors);
}

interface TokenizeResult {
  conds: ParsedCondition[];
  connectors: ('AND' | 'OR')[];
  unparsable: string[];
}

function tokenizeWhere(whereText: string): TokenizeResult {
  // Klammern tragen in unserer flachen Grammatik keine zusätzliche
  // Information (Gruppierung ergibt sich aus der AND/OR-Abfolge) —
  // sie werden daher einfach entfernt, damit Nutzer sie optional
  // setzen können, ohne bestraft zu werden.
  const cleaned = whereText.replace(/[()]/g, ' ').trim();
  const rawParts = cleaned
    .split(/\s*\b(AND|OR)\b\s*/i)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const conds: ParsedCondition[] = [];
  const connectors: ('AND' | 'OR')[] = [];
  const unparsable: string[] = [];

  rawParts.forEach((part, idx) => {
    if (idx % 2 === 1) {
      connectors.push(part.toUpperCase() as 'AND' | 'OR');
    } else {
      const c = parseCondition(part);
      if (c) {
        conds.push(c);
      } else {
        unparsable.push(part);
      }
    }
  });

  return { conds, connectors, unparsable };
}

export interface FreitextCheckResult {
  correct: boolean;
  message: string;
}

const STRUCTURE_RE = /^\s*SELECT\s+([\s\S]+?)\s+FROM\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?\s*$/i;

export function checkFreitextSQL(input: string, level: SqlLevel): FreitextCheckResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { correct: false, message: 'Bitte gib eine SQL-Anweisung ein.' };
  }

  const m = STRUCTURE_RE.exec(trimmed);
  if (!m) {
    return {
      correct: false,
      message:
        'Deine Anweisung muss dem Grundgerüst SELECT … FROM … WHERE … folgen. Es fehlt einer dieser drei Teile.',
    };
  }
  const [, columnsRaw, fromRaw, whereRaw] = m;

  const columns = columnsRaw
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
  const expectedColumnsSorted = [...SELECT_COLUMNS_EXPECTED].sort();
  const columnsOk =
    columns.length === expectedColumnsSorted.length &&
    [...columns].sort().every((c, i) => c === expectedColumnsSorted[i]);
  if (!columnsOk) {
    return {
      correct: false,
      message:
        'Die SELECT-Spalten stimmen nicht. Erwartet werden genau: Geschäftspartner, Ort, Postleitzahl, Land, Rolle (Reihenfolge egal).',
    };
  }

  const fromTable = stripDiacritics(fromRaw.trim()).toUpperCase();
  if (fromTable !== stripDiacritics(TABLE_NAME_EXPECTED)) {
    return {
      correct: false,
      message: 'Der Tabellenname hinter FROM stimmt nicht — es ist immer Geschäftspartner_verwalten.',
    };
  }

  const { conds, connectors, unparsable } = tokenizeWhere(whereRaw);
  if (unparsable.length > 0 || conds.length === 0) {
    return {
      correct: false,
      message:
        'Mindestens eine WHERE-Bedingung ist nicht als Feld/Operator/Wert erkennbar (z. B. Rolle = \'Kunde\'). Prüfe Feldname, Operator (=, <>, LIKE, NOT LIKE, >=, <=) und die Anführungszeichen um den Wert.',
    };
  }
  if (connectors.length !== conds.length - 1) {
    return {
      correct: false,
      message: 'Zwischen den Bedingungen fehlt an mindestens einer Stelle ein AND oder OR.',
    };
  }

  const actualGroups = buildGroups(conds, connectors);
  const expectedGroups = expectedGroupsForLevel(level);

  const ok = compareGroups(expectedGroups, actualGroups);
  if (ok) {
    return { correct: true, message: 'Exakt richtig!' };
  }
  return {
    correct: false,
    message:
      'Noch nicht ganz richtig. Vergleiche Schlüsselwörter (AND/OR/LIKE/NOT LIKE), Feldnamen und Werte genau. Groß-/Kleinschreibung und Leerzeichen spielen keine Rolle.',
  };
}

/** Für den Baustein-Modus: mischt die Bausteine und vergibt stabile IDs. */
export function shuffledBlocks(items: string[]): { id: string; text: string }[] {
  const arr = items.map((text, i) => ({ text, sortKey: Math.random(), i }));
  arr.sort((a, b) => a.sortKey - b.sortKey);
  return arr.map((entry) => ({ id: `${entry.i}-${entry.text}`, text: entry.text }));
}
