// ============================================================
// DATEN — Pendant zu NumbersData.swift.
// Vier historische Zahlensysteme: Regeln, Symbole, Tutorial-Texte,
// Konvertierungslogik und der Fragengenerator für das Endlos-Quiz.
// ============================================================

export type NumSystemID = 'roman' | 'egyptian' | 'babylonian' | 'maya';

export interface LegendItem {
  sym: string;
  val: string;
}

export interface TutorialStep {
  h: string;
  t: string;
}

export interface NumSystem {
  id: NumSystemID;
  name: string;
  flag: string;
  color: string;
  baseDesc: string;
  tutorial: TutorialStep[];
  range: [number, number]; // inclusive lower/upper bound
  legend: LegendItem[];
}

export const NUM_SYSTEMS: NumSystem[] = [
  {
    id: 'roman',
    name: 'Römische Zahlen',
    flag: '🏛️',
    color: 'var(--numbers)',
    baseDesc: 'additiv (mit Subtraktionsregel)',
    tutorial: [
      {
        h: 'Basis & Prinzip',
        t: 'Die römischen Zahlen sind additiv: Symbole werden aneinandergereiht und ihre Werte addiert. Es gibt keine echte Stellenwert-Logik und keine Null.',
      },
      {
        h: 'Die Grundsymbole',
        t: 'I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000. Diese sieben Zeichen genügen für alle Zahlen von 1 bis 3999.',
      },
      {
        h: 'Subtraktionsregel',
        t: 'Steht ein kleineres Zeichen VOR einem größeren, wird subtrahiert: IV = 4 (5−1), IX = 9, XL = 40, XC = 90, CD = 400, CM = 900. Nur diese sechs Paare sind erlaubt.',
      },
      {
        h: 'Beispiel 513',
        t: '513 = D (500) + X (10) + III (3) = DXIII. Man arbeitet immer vom größten zum kleinsten Wert.',
      },
      {
        h: 'Grenze',
        t: 'Üblich ist 1 bis 3999 (MMMCMXCIX). Für größere Zahlen fehlen die Symbole — ein Grund, warum sich das Stellenwertsystem durchsetzte.',
      },
    ],
    range: [1, 3999],
    legend: [
      { sym: 'I', val: '1' },
      { sym: 'V', val: '5' },
      { sym: 'X', val: '10' },
      { sym: 'L', val: '50' },
      { sym: 'C', val: '100' },
      { sym: 'D', val: '500' },
      { sym: 'M', val: '1000' },
    ],
  },
  {
    id: 'egyptian',
    name: 'Ägyptische Hieroglyphen',
    flag: '𓂀',
    color: 'var(--attribute)',
    baseDesc: 'additiv, Basis 10',
    tutorial: [
      {
        h: 'Basis & Prinzip',
        t: 'Die Ägypter nutzten ein additives Zehnersystem. Für jede Zehnerpotenz gibt es ein eigenes Symbol, das so oft wiederholt wird, wie nötig.',
      },
      {
        h: 'Die Symbole',
        t: '𓏤 = 1 (Strich) · 𓎆 = 10 (Henkel) · 𓆱 = 100 (Seil) · 𓆼 = 1000 (Lotus) · 𓂭 = 10000 (Finger) · 𓆐 = 100000 (Kaulquappe) · 𓁨 = 1.000.000 (Gott Heh).',
      },
      {
        h: 'Wiederholung statt Stellenwert',
        t: 'Es gibt keinen Stellenwert: Die Reihenfolge ist egal, gezählt wird, wie oft jedes Symbol vorkommt. 200 = 𓆱𓆱 (zweimal die 100).',
      },
      {
        h: 'Beispiel 1234',
        t: '1234 = 𓆼 (1000) + 𓆱𓆱 (200) + 𓎆𓎆𓎆 (30) + 𓏤𓏤𓏤𓏤 (4).',
      },
      {
        h: 'Keine Null nötig',
        t: 'Da nur vorhandene Mengen gezählt werden, braucht ein additives System keine Null — eine leere Stelle wird einfach weggelassen.',
      },
    ],
    range: [1, 99999],
    legend: [
      { sym: '𓏤', val: '1' },
      { sym: '𓎆', val: '10' },
      { sym: '𓆱', val: '100' },
      { sym: '𓆼', val: '1.000' },
      { sym: '𓂭', val: '10.000' },
      { sym: '𓆐', val: '100.000' },
      { sym: '𓁨', val: '1.000.000' },
    ],
  },
  {
    id: 'babylonian',
    name: 'Babylonische Keilschrift',
    flag: '𒁹',
    color: 'var(--relation)',
    baseDesc: 'Basis 60 (Sexagesimal), positionell',
    tutorial: [
      {
        h: 'Basis & Prinzip',
        t: 'Die Babylonier rechneten im Sexagesimalsystem (Basis 60) und positionell — ähnlich wie wir, nur mit 60 statt 10 als Bündelungsgröße. Davon stammen unsere 60 Minuten und 360°.',
      },
      {
        h: 'Nur zwei Keile',
        t: 'Innerhalb einer Stelle (0–59) wird additiv geschrieben: 𒁹 = 1 (senkrechter Keil), 𒌋 = 10 (Winkelkeil). 23 = 𒌋𒌋𒁹𒁹𒁹 (zwei Zehner + drei Einer).',
      },
      {
        h: 'Stellenwert × 60',
        t: 'Mehrere Stellen werden mit | getrennt. Jede Stelle nach links zählt 60-mal so viel: [a | b] = a·60 + b. Beispiel: [1 | 12] = 1·60 + 12 = 72.',
      },
      {
        h: 'Das Null-Problem',
        t: 'Ursprünglich gab es KEINE Null — eine leere Stelle war nur eine Lücke, was mehrdeutig war (61 vs. 3601). Erst spät kam ein Platzhalter (hier ▯) dazu.',
      },
      {
        h: 'Beispiel 3661',
        t: '3661 = 1·3600 + 1·60 + 1 → [𒁹 | 𒁹 | 𒁹], also drei Stellen mit je einem Einerkeil.',
      },
    ],
    range: [1, 3599],
    legend: [
      { sym: '𒁹', val: '1' },
      { sym: '𒌋', val: '10' },
      { sym: '▯', val: '0 (Lücke)' },
      { sym: 'Stelle ×60', val: 'pro Position nach links' },
    ],
  },
  {
    id: 'maya',
    name: 'Maya-Zahlen',
    flag: '🗿',
    color: '#9333ea',
    baseDesc: 'Basis 20 (Vigesimal), positionell',
    tutorial: [
      {
        h: 'Basis & Prinzip',
        t: 'Die Maya nutzten ein Vigesimalsystem (Basis 20) und schrieben positionell — typischerweise vertikal von unten (kleinster Wert) nach oben.',
      },
      {
        h: 'Drei Symbole',
        t: '• = 1 (Punkt) · ▬ = 5 (Balken) · 𝟘 = 0 (Muschel). Innerhalb einer Stelle (0–19) gilt: bis zu drei Punkte über einem Balken, max. drei Balken. 13 = ▬ ▬ ••• (zwei Balken + drei Punkte).',
      },
      {
        h: 'Stellenwert × 20',
        t: 'Jede Stelle nach oben zählt 20-mal so viel: [a / b] = a·20 + b. Beispiel: [1 / 0] = 1·20 + 0 = 20 (eine Muschel unten, ein Punkt darüber).',
      },
      {
        h: 'Die Null als Erfindung',
        t: 'Die Maya hatten eine echte Null (die Muschel) — eine geniale Idee, denn ein Stellenwertsystem BRAUCHT ein Symbol für „nichts an dieser Stelle“, um z. B. 20 von 1 zu unterscheiden.',
      },
      {
        h: 'Beispiel 419',
        t: '419 = 1·400 + 0·20 + 19 → [• / 𝟘 / ▬ ▬ ▬ ••••]. Die mittlere Muschel zeigt: an der 20er-Stelle steht nichts.',
      },
    ],
    range: [0, 7999],
    legend: [
      { sym: '•', val: '1' },
      { sym: '▬', val: '5' },
      { sym: '𝟘', val: '0' },
      { sym: 'Stelle ×20', val: 'pro Position nach oben' },
    ],
  },
];

export function getSystem(id: NumSystemID): NumSystem {
  const sys = NUM_SYSTEMS.find((s) => s.id === id);
  if (!sys) throw new Error(`Unknown NumSystemID: ${id}`);
  return sys;
}

// ============================================================
// KONVERTER — Pendant zu NumConverters (NumbersData.swift).
// ============================================================

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

export function romanStr(nIn: number): string | null {
  if (!(nIn > 0 && nIn < 4000)) return null;
  let n = nIn;
  let s = '';
  for (const [v, sym] of ROMAN_MAP) {
    while (n >= v) {
      s += sym;
      n -= v;
    }
  }
  return s;
}

const EGY_POWERS: [number, string][] = [
  [1000000, '𓁨'],
  [100000, '𓆐'],
  [10000, '𓂭'],
  [1000, '𓆼'],
  [100, '𓆱'],
  [10, '𓎆'],
  [1, '𓏤'],
];

export function egyptianStr(nIn: number): string | null {
  if (!(nIn > 0 && nIn <= 9999999)) return null;
  let n = nIn;
  let s = '';
  for (const [v, g] of EGY_POWERS) {
    const c = Math.floor(n / v);
    s += g.repeat(c);
    n -= c * v;
  }
  return s;
}

export function babyDigit(d: number): string {
  if (d === 0) return '▯';
  return '𒌋'.repeat(Math.floor(d / 10)) + '𒁹'.repeat(d % 10);
}

export function babyDigitsArr(nIn: number): number[] {
  let n = nIn;
  const arr: number[] = [];
  while (n > 0) {
    arr.unshift(n % 60);
    n = Math.floor(n / 60);
  }
  return arr.length === 0 ? [0] : arr;
}

export function babylonianStr(n: number): string | null {
  if (!(n > 0 && n < 60 * 60 * 60)) return null;
  return babyDigitsArr(n).map(babyDigit).join('  |  ');
}

export function mayaDigit(d: number): string {
  if (d === 0) return '𝟘';
  const bars = Math.floor(d / 5);
  const dots = d % 5;
  // Schmales Leerzeichen (U+2009) zwischen den Balken, damit 2 Balken nicht
  // optisch zu einem langen Strich verschmelzen.
  const barPart = Array(bars).fill('▬').join(' ');
  const dotPart = '•'.repeat(dots);
  if (bars > 0 && dots > 0) return barPart + ' ' + dotPart;
  return barPart === '' ? dotPart : barPart;
}

export function mayaDigitsArr(nIn: number): number[] {
  let n = nIn;
  const arr: number[] = [];
  while (n > 0) {
    arr.unshift(n % 20);
    n = Math.floor(n / 20);
  }
  return arr.length === 0 ? [0] : arr;
}

export function mayaStr(n: number): string | null {
  if (!(n >= 0 && n < 20 * 20 * 20)) return null;
  return mayaDigitsArr(n).map(mayaDigit).join('  /  ');
}

export function toStr(sys: NumSystemID, n: number): string | null {
  switch (sys) {
    case 'roman':
      return romanStr(n);
    case 'egyptian':
      return egyptianStr(n);
    case 'babylonian':
      return babylonianStr(n);
    case 'maya':
      return mayaStr(n);
  }
}

export function explainConversion(sys: NumSystemID, n: number, repr: string): string {
  switch (sys) {
    case 'roman': {
      let x = n;
      const parts: string[] = [];
      for (const [v, sym] of ROMAN_MAP) {
        const c = Math.floor(x / v);
        if (c > 0) {
          parts.push(`${sym.repeat(c)} = ${v * c}`);
          x -= c * v;
        }
      }
      return `${n} = ${repr}. Zerlegung vom größten zum kleinsten Wert: ${parts.join(' + ')}.`;
    }
    case 'egyptian': {
      const names: Record<string, number> = {
        𓏤: 1,
        𓎆: 10,
        𓆱: 100,
        𓆼: 1000,
        𓂭: 10000,
        𓆐: 100000,
        𓁨: 1000000,
      };
      const counts: Record<string, number> = {};
      for (const ch of repr) counts[ch] = (counts[ch] ?? 0) + 1;
      const parts = Object.entries(counts).map(
        ([g, c]) => `${c}× ${g} (${c * (names[g] ?? 0)})`,
      );
      return `${n} = ${repr}. Jedes Symbol steht für eine Zehnerpotenz, wiederholt nach Bedarf: ${parts.join(' + ')}.`;
    }
    case 'babylonian': {
      const digs = babyDigitsArr(n);
      const parts = digs.map((d, i) => `${d}×${60 ** (digs.length - 1 - i)}`);
      return `${repr} = ${n}. Basis 60, von links: ${parts.join(' + ')} = ${n}. (𒁹 = 1, 𒌋 = 10 innerhalb einer Stelle.)`;
    }
    case 'maya': {
      const digs = mayaDigitsArr(n);
      const parts = digs.map((d, i) => `${d}×${20 ** (digs.length - 1 - i)}`);
      return `${repr} = ${n}. Basis 20, von oben: ${parts.join(' + ')} = ${n}. (• = 1, ▬ = 5, 𝟘 = 0.)`;
    }
  }
}

// ============================================================
// FRAGEGENERATOR — Pendant zu NumQuestionGenerator.
// ============================================================

export type NumQuestionType = 'conversion' | 'backCalc' | 'logic';

export interface NumQuestion {
  type: NumQuestionType;
  typeLabel: string;
  q: string;
  isInput: boolean;
  options: string[];
  optionDigits: number[][] | null; // Maya-MC: Ziffergruppen je Option, sonst null
  correctIndex: number;
  display: string | null;
  displayDigits: number[] | null; // Maya-Rückrechnung: Ziffergruppen, sonst null
  correctValue: number | null;
  explain: string;
  bigOptions: boolean;
  sysID: NumSystemID;
}

function randInt(lo: number, hi: number): number {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffled<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function upperBoundFor(id: NumSystemID): number {
  switch (id) {
    case 'roman':
      return 3999;
    case 'egyptian':
      return 4999;
    case 'babylonian':
      return 3599;
    case 'maya':
      return 7999;
  }
}

function makeConversion(id: NumSystemID, sys: NumSystem): NumQuestion {
  const lo = Math.max(sys.range[0], 2);
  const hi = Math.min(sys.range[1], upperBoundFor(id));
  const n = randInt(lo, hi);
  const correct = toStr(id, n) ?? '';
  const set = new Set<string>([correct]);
  const distractors: string[] = [];
  const distractorValues: number[] = [n];
  let guardCount = 0;
  while (distractors.length < 3 && guardCount < 60) {
    guardCount += 1;
    const delta = randInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
    const m = n + delta;
    if (m < sys.range[0] || m > sys.range[1]) continue;
    const r = toStr(id, m);
    if (r !== null && !set.has(r)) {
      set.add(r);
      distractors.push(r);
      distractorValues.push(m);
    }
  }
  let options = shuffled([correct, ...distractors]);
  if (options.length < 2) options = [correct, correct + ' ']; // Sicherheitsnetz, sollte nie eintreten
  const correctIdx = options.indexOf(correct);

  let optionDigits: number[][] | null = null;
  if (id === 'maya') {
    const valueForOption = new Map<string, number>();
    [correct, ...distractors].forEach((opt, i) => valueForOption.set(opt, distractorValues[i]));
    optionDigits = options.map((opt) => mayaDigitsArr(valueForOption.get(opt) ?? n));
  }

  return {
    type: 'conversion',
    typeLabel: 'Konvertierung',
    q: `Wie schreibt man die Zahl ${n} in diesem Zahlensystem?`,
    isInput: false,
    options,
    optionDigits,
    correctIndex: correctIdx,
    display: null,
    displayDigits: null,
    correctValue: null,
    explain: explainConversion(id, n, correct),
    bigOptions: true,
    sysID: id,
  };
}

function makeBackCalc(id: NumSystemID, sys: NumSystem): NumQuestion {
  const lo = Math.max(sys.range[0], 2);
  const hi = Math.min(sys.range[1], upperBoundFor(id));
  const n = randInt(lo, hi);
  const repr = toStr(id, n) ?? '';
  const digits = id === 'maya' ? mayaDigitsArr(n) : null;
  return {
    type: 'backCalc',
    typeLabel: 'Rückrechnung',
    q: 'Welchen Dezimalwert hat diese Darstellung?',
    isInput: true,
    options: [],
    optionDigits: null,
    correctIndex: 0,
    display: repr,
    displayDigits: digits,
    correctValue: n,
    explain: explainConversion(id, n, repr),
    bigOptions: false,
    sysID: id,
  };
}

interface LogicQ {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

const LOGIC_BANK: Record<NumSystemID, LogicQ[]> = {
  roman: [
    {
      q: 'Warum kommt die römische Zahlschrift ohne eine Null aus?',
      options: [
        'Weil sie additiv ist und nur vorhandene Werte zusammenzählt — eine leere Stelle gibt es nicht',
        'Weil die Römer die Null nicht kannten und sie verboten war',
        'Weil I bereits die Null bedeutet',
        'Weil die Null durch V ersetzt wird',
      ],
      correct: 0,
      explain:
        'Additive Systeme reihen nur vorhandene Werte aneinander. Eine „leere Stelle“ wie im Stellenwertsystem existiert nicht, daher braucht man kein Symbol für nichts.',
    },
    {
      q: 'Was ist die größte Zahl, die sich üblicherweise mit den römischen Standardsymbolen darstellen lässt?',
      options: ['999', '3999 (MMMCMXCIX)', '1000', '9999'],
      correct: 1,
      explain:
        'Mit M = 1000 lassen sich maximal drei M (MMM = 3000) sinnvoll voranstellen, plus CMXCIX (999) → 3999. Größere Zahlen sprengen das Symbolinventar.',
    },
    {
      q: 'Welche Schreibweise ist nach der Subtraktionsregel KORREKT für 9?',
      options: ['VIIII', 'IX', 'XI', 'IIX'],
      correct: 1,
      explain:
        '9 = IX (10 − 1). VIIII ist die ältere additive Form, gilt heute aber als nicht regelkonform. IIX ist nie erlaubt.',
    },
  ],
  egyptian: [
    {
      q: 'Spielt bei ägyptischen Zahlen die Reihenfolge der Symbole eine Rolle?',
      options: [
        'Ja, wie bei uns bestimmt die Position den Wert',
        'Nein, da additiv — es zählt nur, wie oft jedes Symbol vorkommt',
        'Nur bei Zahlen über 1000',
        'Ja, das erste Symbol zählt doppelt',
      ],
      correct: 1,
      explain:
        'Das ägyptische System ist rein additiv. Die Position ist bedeutungslos; gezählt wird allein die Häufigkeit jedes Zehnerpotenz-Symbols.',
    },
    {
      q: 'Wie viele Einzelsymbole braucht man maximal, um die Zahl 999 darzustellen?',
      options: ['3', '9', '27', '999'],
      correct: 2,
      explain:
        '999 = 9×100 + 9×10 + 9×1 → 9 + 9 + 9 = 27 Symbole. Das ist die Schwäche additiver Systeme: große „9er“-Zahlen werden sehr lang.',
    },
    {
      q: 'Warum benötigt das ägyptische System keine Null?',
      options: [
        'Weil es positionell ist',
        'Weil es additiv ist und leere Stellen einfach weggelassen werden',
        'Weil die Null als Strich geschrieben wird',
        'Weil die Ägypter nicht bis 0 zählen konnten',
      ],
      correct: 1,
      explain:
        'Ohne Stellenwert gibt es keine „leere Stelle“ zu markieren. Fehlt eine Zehnerpotenz, lässt man ihr Symbol einfach weg.',
    },
  ],
  babylonian: [
    {
      q: 'Welche Basis hat das babylonische Zahlensystem?',
      options: ['10', '12', '60', '20'],
      correct: 2,
      explain:
        'Basis 60 (Sexagesimal). Reste davon stecken bis heute in 60 Sekunden, 60 Minuten und 360 Grad.',
    },
    {
      q: 'Warum war das Fehlen einer echten Null beim babylonischen System ein Problem?',
      options: [
        'Es konnte nicht addiert werden',
        'Eine leere Stelle war mehrdeutig — z. B. ließ sich 61 nicht eindeutig von 3601 unterscheiden',
        'Es gab zu viele Symbole',
        'Die Zahlen wurden zu kurz',
      ],
      correct: 1,
      explain:
        'Als positionelles System braucht es ein Zeichen für „an dieser Stelle nichts“. Ohne Platzhalter war eine Lücke mehrdeutig: 1·60+1 vs. 1·3600+0·60+1.',
    },
    {
      q: 'Wie viele verschiedene Grundkeile braucht das System für die Ziffern 1 bis 59?',
      options: ['Eins', 'Zwei (𒁹 = 1 und 𒌋 = 10)', 'Zehn', 'Neunundfünfzig'],
      correct: 1,
      explain:
        'Nur zwei: der Einerkeil 𒁹 (1) und der Zehnerkeil 𒌋 (10). Innerhalb einer Stelle werden sie additiv kombiniert.',
    },
  ],
  maya: [
    {
      q: 'Welche Basis nutzt das Maya-Zahlensystem?',
      options: ['10', '20', '60', '5'],
      correct: 1,
      explain:
        'Basis 20 (Vigesimal) — vermutlich abgeleitet von Fingern UND Zehen. Jede Stelle nach oben zählt das 20-fache.',
    },
    {
      q: 'Warum BRAUCHT das Maya-System (anders als das römische) zwingend eine Null?',
      options: [
        'Damit man bis unendlich zählen kann',
        'Weil es positionell ist — ohne Null ließe sich z. B. 20 nicht von 1 unterscheiden',
        'Weil die Muschel hübsch aussieht',
        'Weil 20 durch 0 teilbar ist',
      ],
      correct: 1,
      explain:
        'In einem Stellenwertsystem muss eine leere Stelle markiert werden. Ohne Null wären [1] und [1,0] (= 1 und 20) ununterscheidbar. Die Maya-Muschel löste genau das.',
    },
    {
      q: 'Welche drei Symbole genügen für alle Maya-Ziffern einer Stelle (0–19)?',
      options: ['Punkt, Balken, Muschel', 'Strich, Kreis, Dreieck', 'Nur Punkte', 'Zehn verschiedene Zeichen'],
      correct: 0,
      explain:
        'Punkt (•=1), Balken (▬=5) und Muschel (𝟘=0). Bis zu 3 Balken und 4 Punkte ergeben jede Ziffer von 0 bis 19.',
    },
  ],
};

function makeLogic(id: NumSystemID): NumQuestion {
  const bank = LOGIC_BANK[id];
  const picked = pickRandom(bank);
  const correctText = picked.options[picked.correct];
  const opts = shuffled(picked.options);
  const idx = opts.indexOf(correctText);
  return {
    type: 'logic',
    typeLabel: 'Logik & Grenzen',
    q: picked.q,
    isInput: false,
    options: opts,
    optionDigits: null,
    correctIndex: idx,
    display: null,
    displayDigits: null,
    correctValue: null,
    explain: picked.explain,
    bigOptions: false,
    sysID: id,
  };
}

export function makeQuestion(sysID: NumSystemID): NumQuestion {
  const sys = getSystem(sysID);
  const type = randInt(0, 2);
  if (type === 0) return makeConversion(sysID, sys);
  if (type === 1) return makeBackCalc(sysID, sys);
  return makeLogic(sysID);
}
