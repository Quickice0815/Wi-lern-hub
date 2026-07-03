// ============================================================
// ERM-TRAINER — Datenmodelle
// Portiert aus ERMData.swift / ERMTutorialView.swift (Tutorial-Inhalte)
// ============================================================

export type ERMNodeType = 'entity' | 'relation' | 'attr' | 'pk';

export const ERM_NODE_TYPES: ERMNodeType[] = ['entity', 'relation', 'attr', 'pk'];

export const nodeTypeLabel: Record<ERMNodeType, string> = {
  entity: 'Entität',
  relation: 'Beziehung',
  attr: 'Attribut',
  pk: 'Primärschlüssel',
};

export const nodeTypeDesc: Record<ERMNodeType, string> = {
  entity: 'Objekt/Substantiv (Rechteck)',
  relation: 'Verb (Raute)',
  attr: 'Eigenschaft (Oval)',
  pk: 'Eindeutige ID (unterstrichen)',
};

export const nodeTypeColorVar: Record<ERMNodeType, string> = {
  entity: 'var(--entity)',
  relation: 'var(--relation)',
  attr: 'var(--attribute)',
  pk: 'var(--pk)',
};

export interface ERMSolutionEntity {
  name: string;
  pk: string;
  attrs: string[];
}

export interface ERMSolutionRelation {
  name: string;
  from: string;
  to: string;
  card: string; // e.g. "N:1", "N:M"
  relAttrs: string[];
}

export interface ERMSolution {
  entities: ERMSolutionEntity[];
  relations: ERMSolutionRelation[];
}

export interface ERMTask {
  id: string;
  title: string;
  text: string;
  solution: ERMSolution;
}

export const ERM_TASKS: ERMTask[] = [
  {
    id: 'kosmetik',
    title: 'Großhändler Kosmetik',
    text: 'Ein Großhändler für kosmetische Artikel verwaltet die Kundenaufträge seiner Kunden. Jeder Kunde hat eine Kundennummer, einen Namen und einen Wohnort. Ein Artikel besitzt eine Artikelnummer und eine Bezeichnung. Kunden kaufen Artikel in einer bestimmten Menge zu einem Preis. Jeder Artikel wird von genau einem Hersteller hergestellt, der eine Herstellernummer und einen Namen hat.',
    solution: {
      entities: [
        { name: 'Kunde', pk: 'Kundennummer', attrs: ['Name', 'Wohnort'] },
        { name: 'Artikel', pk: 'Artikelnummer', attrs: ['Bezeichnung'] },
        { name: 'Hersteller', pk: 'Herstellernummer', attrs: ['Name'] },
      ],
      relations: [
        { name: 'kauft', from: 'Kunde', to: 'Artikel', card: 'N:N', relAttrs: ['Menge', 'Preis'] },
        { name: 'wird hergestellt', from: 'Artikel', to: 'Hersteller', card: 'N:1', relAttrs: [] },
      ],
    },
  },
  {
    id: 'elektro',
    title: 'Elektro-Großhändler (Routen)',
    text: 'Ein Großhändler für Elektrogeräte beliefert Kunden über feste Fahrtrouten. Jeder Kunde gehört genau einer Route an. Ein Kunde hat eine Kundennummer und einen Namen. Eine Route hat eine Routennummer und eine Bezeichnung. Fahrer fahren laut Dienstplan Routen an bestimmten Wochentagen. Ein Fahrer kann mehrere Routen fahren und eine Route wird von mehreren Fahrern gefahren. Ein Fahrer hat eine Fahrernummer und einen Namen.',
    solution: {
      entities: [
        { name: 'Kunde', pk: 'Kundennummer', attrs: ['Name'] },
        { name: 'Route', pk: 'Routennummer', attrs: ['Bezeichnung'] },
        { name: 'Fahrer', pk: 'Fahrernummer', attrs: ['Name'] },
      ],
      relations: [
        { name: 'gehört zu', from: 'Kunde', to: 'Route', card: 'N:1', relAttrs: [] },
        { name: 'fährt', from: 'Route', to: 'Fahrer', card: 'N:M', relAttrs: ['Wochentag'] },
      ],
    },
  },
  {
    id: 'pruefung',
    title: 'Prüfungen Hochschule',
    text: 'An der Hochschule sollen Prüfungen verwaltet werden. Ein Student hat eine Matrikelnummer, einen Namen und ein Semester. Eine Prüfung hat eine Kursnummer, einen Kursnamen und einen Professor. Studenten nehmen an Prüfungen teil, dabei werden Raum und Versuch festgehalten. Ein Student kann an mehreren Prüfungen teilnehmen und eine Prüfung wird von mehreren Studenten abgelegt.',
    solution: {
      entities: [
        { name: 'Student', pk: 'Matrikelnummer', attrs: ['Name', 'Semester'] },
        { name: 'Prüfung', pk: 'Kursnummer', attrs: ['Kursname', 'Professor'] },
      ],
      relations: [
        { name: 'nimmt teil', from: 'Student', to: 'Prüfung', card: 'N:M', relAttrs: ['Raum', 'Versuch'] },
      ],
    },
  },
  {
    id: 'online',
    title: 'Online-Handel',
    text: 'In einem Online-Handel sollen Bestellungen abgebildet werden. Kunden können Artikel bestellen. Ein Kunde hat eine Kundennummer, einen Namen und eine Adresse. Ein Artikel hat eine Artikelnummer, eine Bezeichnung und einen Preis. Bei einem Bestellvorgang werden eine Bestellnummer, das Datum und die Anzahl festgehalten. Ein Kunde kann mehrere Artikel bestellen, ein Artikel kann von mehreren Kunden bestellt werden. Jeder Artikel wird von genau einem Hersteller gefertigt, der eine Herstellernummer, einen Namen und eine Adresse hat.',
    solution: {
      entities: [
        { name: 'Kunde', pk: 'Kundennummer', attrs: ['Name', 'Adresse'] },
        { name: 'Artikel', pk: 'Artikelnummer', attrs: ['Bezeichnung', 'Preis'] },
        { name: 'Hersteller', pk: 'Herstellernummer', attrs: ['Name', 'Adresse'] },
      ],
      relations: [
        { name: 'wird bestellt', from: 'Kunde', to: 'Artikel', card: 'N:M', relAttrs: ['Bestellnummer', 'Datum', 'Anzahl'] },
        { name: 'wird gefertigt', from: 'Artikel', to: 'Hersteller', card: 'N:1', relAttrs: [] },
      ],
    },
  },
  {
    id: 'vorlesung',
    title: 'Vorlesungen & Räume',
    text: 'Studenten belegen Vorlesungen, die von Dozenten in Räumen gehalten werden. Ein Student hat eine Matrikelnummer, einen Namen und einen Studiengang. Eine Vorlesung hat einen Titel und eine Dauer. Ein Dozent hat eine Büronummer und einen Namen. Ein Raum hat eine Raumnummer und Plätze. Ein Student kann mehrere Vorlesungen belegen und eine Vorlesung wird von mehreren Studenten belegt. Eine Vorlesung wird von genau einem Dozenten gehalten. Eine Vorlesung findet in mehreren Räumen statt und ein Raum wird für mehrere Vorlesungen genutzt.',
    solution: {
      entities: [
        { name: 'Student', pk: 'Matrikelnummer', attrs: ['Name', 'Studiengang'] },
        { name: 'Vorlesung', pk: 'Titel', attrs: ['Dauer'] },
        { name: 'Dozent', pk: 'Büronummer', attrs: ['Name'] },
        { name: 'Raum', pk: 'Raumnummer', attrs: ['Plätze'] },
      ],
      relations: [
        { name: 'belegt', from: 'Student', to: 'Vorlesung', card: 'N:M', relAttrs: [] },
        { name: 'hält', from: 'Vorlesung', to: 'Dozent', card: 'N:1', relAttrs: [] },
        { name: 'findet statt', from: 'Vorlesung', to: 'Raum', card: 'N:M', relAttrs: [] },
      ],
    },
  },
  {
    id: 'zoo',
    title: 'Zoo',
    text: 'Für einen Zoo soll ein Datenmodell erstellt werden. Eine Tierart hat eine Bezeichnung, ein Herkunftsland und ein durchschnittliches Alter. Jedes Tier gehört genau einer Tierart an und hat eine ID, einen Namen, ein Geschlecht und ein Geburtsdatum. Tierpfleger kümmern sich um mehrere Tierarten, wobei der Zeitaufwand festgehalten wird. Ein Pfleger hat eine Mitarbeiternummer, einen Namen und eine Adresse. Jede Tierart bekommt Futter zu einer Menge und Uhrzeit. Ein Futter hat eine Futternummer, eine Bezeichnung, eine Art und einen Hauptbestandteil.',
    solution: {
      entities: [
        { name: 'Tier', pk: 'ID', attrs: ['Name', 'Geschlecht', 'Geburtsdatum'] },
        { name: 'Tierart', pk: 'Bezeichnung', attrs: ['Herkunftsland', 'durchschnittliches Alter'] },
        { name: 'Tierpfleger', pk: 'Mitarbeiternummer', attrs: ['Name', 'Adresse'] },
        { name: 'Futter', pk: 'Futternummer', attrs: ['Bezeichnung', 'Art', 'Hauptbestandteil'] },
      ],
      relations: [
        { name: 'ist von', from: 'Tier', to: 'Tierart', card: 'N:1', relAttrs: [] },
        { name: 'kümmert sich um', from: 'Tierart', to: 'Tierpfleger', card: 'N:M', relAttrs: ['Zeitaufwand'] },
        { name: 'bekommt', from: 'Tierart', to: 'Futter', card: 'N:M', relAttrs: ['Menge', 'Uhrzeit'] },
      ],
    },
  },
];

// ---------- Tokenizer (word runs vs. non-word runs) ----------
export interface ERMToken {
  id: number;
  word: string;
  isWord: boolean;
}

const LETTER_RE = /\p{L}/u;

export function tokenizeERM(text: string): ERMToken[] {
  const tokens: ERMToken[] = [];
  let current = '';
  let idx = 0;
  let isCurrentWord: boolean | null = null;

  const flush = () => {
    if (!current) return;
    tokens.push({ id: idx, word: current, isWord: isCurrentWord ?? false });
    idx += 1;
    current = '';
  };

  for (const ch of text) {
    const isWordChar = LETTER_RE.test(ch);
    if (isCurrentWord === null) isCurrentWord = isWordChar;
    if (isWordChar === isCurrentWord) {
      current += ch;
    } else {
      flush();
      isCurrentWord = isWordChar;
      current += ch;
    }
  }
  flush();
  return tokens;
}

// ---------- Canvas model ----------
// position is fractional (0..1) within the canvas surface, so layout
// stays correct across screen sizes (the Swift version used raw CGPoint
// pixel coordinates on a fixed-size GeometryReader).
export interface ERMCanvasNode {
  id: string;
  label: string;
  type: ERMNodeType;
  position: { x: number; y: number };
}

export interface ERMCanvasEdge {
  id: string;
  fromNodeID: string;
  toNodeID: string;
  cardFrom: string;
  cardTo: string;
}

export function normERM(s: string): string {
  return s
    .toLowerCase()
    .split('')
    .filter((c) => LETTER_RE.test(c) || /[0-9]/.test(c))
    .join('');
}

let uidCounter = 0;
export function makeId(prefix: string): string {
  uidCounter += 1;
  return `${prefix}-${uidCounter}-${Date.now().toString(36)}`;
}

// ============================================================
// TUTORIAL CONTENT — portiert aus ERMTutorialView.swift
// ============================================================
export interface ERMTutorialQuiz {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export type ERMTutorialVisualKind = 'overview' | 'entity' | 'relation' | 'attr' | 'pk' | 'card';

export interface ERMTutorialCard {
  badge: string;
  title: string;
  body: string;
  why: string | null;
  visual: ERMTutorialVisualKind;
  quiz: ERMTutorialQuiz | null;
}

export const ERM_TUTORIAL_CARDS: ERMTutorialCard[] = [
  {
    badge: "Worum geht's",
    title: 'Ein ER-Modell ist ein Bauplan für Daten',
    body: 'Bevor man eine Datenbank baut, malt man sie auf. Das ER-Modell (Entity-Relationship) zeigt, welche Dinge es gibt, wie sie zusammenhängen und welche Eigenschaften sie haben. Drei Formen reichen dafür: Rechteck, Raute und Oval. Diese Lernkarten erklären jede Form — und du probierst sie sofort aus.',
    why: null,
    visual: 'overview',
    quiz: null,
  },
  {
    badge: 'Baustein 1 von 3',
    title: 'Entität — das „Ding" (Rechteck)',
    body: 'Eine Entität ist ein Objekt aus der realen Welt, über das du Daten speichern willst: Kunde, Artikel, Tier. Faustregel: Es ist meist ein Substantiv und man kann es zählen („viele Kunden"). Im Diagramm immer ein Rechteck und immer in der Einzahl benannt.',
    why: 'Warum Einzahl? Das Rechteck steht für den Typ („ein Kunde"), nicht für die einzelne Person. In der späteren Datenbank wird daraus eine ganze Tabelle mit vielen Zeilen.',
    visual: 'entity',
    quiz: {
      q: 'Welches Wort ist hier eine Entität?',
      options: ['bestellt', 'Kunde', 'schnell'],
      correct: 1,
      explain: '„Kunde" ist ein zählbares Ding → Entität. „bestellt" ist ein Verb (Beziehung), „schnell" eine Eigenschaft.',
    },
  },
  {
    badge: 'Baustein 2 von 3',
    title: 'Beziehung — die Verbindung (Raute)',
    body: 'Eine Beziehung verknüpft zwei Entitäten und ist fast immer ein Verb: Kunde kauft Artikel, Tier ist von Tierart. Im Diagramm eine Raute, die zwischen den beiden Rechtecken sitzt.',
    why: 'Warum eine eigene Form? Weil die Verbindung selbst Daten tragen kann – z. B. die Menge oder der Preis beim „kauft". Solche Angaben gehören weder nur zum Kunden noch nur zum Artikel, sondern an die Beziehung.',
    visual: 'relation',
    quiz: {
      q: 'Was beschreibt eine Beziehung am besten?',
      options: ['Ein Substantiv wie „Artikel"', 'Ein Verb wie „kauft"', 'Eine Zahl wie „12"'],
      correct: 1,
      explain: 'Beziehungen sind Verben – sie sagen, was zwischen zwei Dingen passiert.',
    },
  },
  {
    badge: 'Baustein 3 von 3',
    title: 'Attribut — die Eigenschaft (Oval)',
    body: 'Ein Attribut ist eine Eigenschaft einer Entität oder Beziehung: Name, Wohnort, Preis, Datum. Im Diagramm ein Oval, das per Linie an seinem Rechteck (oder seiner Raute) hängt.',
    why: 'Warum hängen Attribute an etwas dran? Ein „Name" allein ergibt keinen Sinn – der Name wovon? Das Oval gehört immer zu genau einer Entität oder Beziehung. In der Tabelle wird daraus eine Spalte.',
    visual: 'attr',
    quiz: {
      q: 'Welches davon ist ein Attribut von „Kunde"?',
      options: ['Wohnort', 'kauft', 'Hersteller'],
      correct: 0,
      explain: '„Wohnort" ist eine Eigenschaft → Attribut. „Hersteller" wäre eine eigene Entität, „kauft" eine Beziehung.',
    },
  },
  {
    badge: 'Spezialfall',
    title: 'Primärschlüssel — der eindeutige Ausweis',
    body: 'Unter den Attributen gibt es eines, das jede Zeile eindeutig macht: die Kundennummer, die Matrikelnummer, die ID. Das ist der Primärschlüssel. Im Diagramm wird er unterstrichen.',
    why: 'Warum braucht man das? Zwei Kunden können „Max" heißen und in derselben Stadt wohnen. Nur die Kundennummer ist garantiert einmalig – daran erkennt die Datenbank jede Zeile sicher wieder.',
    visual: 'pk',
    quiz: {
      q: 'Welches Attribut eignet sich als Primärschlüssel?',
      options: ['Name', 'Matrikelnummer', 'Studiengang'],
      correct: 1,
      explain: 'Nur die Matrikelnummer ist garantiert eindeutig. Namen und Studiengänge können sich wiederholen.',
    },
  },
  {
    badge: 'Das Feintuning',
    title: 'Kardinalität — wie viele zu wie vielen?',
    body: 'An jede Linie schreibt man, wie viele auf jeder Seite stehen dürfen: 1, N oder M (N und M heißen beide „viele"). So liest man es: 1 Hersteller stellt N Artikel her, aber jeder Artikel hat nur 1 Hersteller → das ist eine 1:N-Beziehung.',
    why: 'Warum so wichtig? Die Kardinalität entscheidet später über den Tabellenbau. Eine N:M-Beziehung (z. B. Student belegt Vorlesungen) braucht sogar eine eigene Verbindungstabelle – eine 1:N nicht.',
    visual: 'card',
    quiz: {
      q: '„1 Mutter hat mehrere Kinder, jedes Kind hat 1 Mutter." Welche Kardinalität?',
      options: ['1 : 1', '1 : N', 'N : M'],
      correct: 1,
      explain: 'Eine Seite „1" (Mutter), die andere „viele" (Kinder) → 1:N.',
    },
  },
  {
    badge: 'Geschafft',
    title: 'Du kennst jetzt alle Bausteine',
    body: 'Rechteck = Entität (Ding) · Raute = Beziehung (Verb) · Oval = Attribut (Eigenschaft) · unterstrichen = Primärschlüssel · Zahlen an der Linie = Kardinalität. Genau in dieser Reihenfolge gehst du gleich auch durch jede Aufgabe: markieren, modellieren, auswerten.',
    why: null,
    visual: 'overview',
    quiz: null,
  },
];
