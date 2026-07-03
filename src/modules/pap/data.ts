// ============================================================
// PAP-QUEST: DIE LOGIK-ODYSSEE — Datenmodelle
// Portiert 1:1 aus PapQuestData.swift (Inhalte, Reihenfolgen,
// Tipps unverändert übernommen).
// ============================================================

export type PapShapeType = 'circle' | 'rect' | 'diamond' | 'parallelogram' | 'arrow';
export type PapLevelType = 'match' | 'order' | 'build';

export interface PapTableRow {
  shape: PapShapeType;
  name: string;
  rule: string;
}

export interface PapMatchItem {
  id: string;
  label: string;
  shape: PapShapeType;
}

export interface PapMatchSlot {
  id: number;
  label: string;
  answer: string;
}

export interface PapOrderItem {
  id: string;
  label: string;
}

export interface PapLevel {
  id: number;
  title: string;
  subtitle: string;
  explain: string;
  table?: PapTableRow[];
  type: PapLevelType;
  scenario?: string;
  matchItems?: PapMatchItem[];
  matchSlots?: PapMatchSlot[];
  orderItems?: PapOrderItem[];
  correctOrder?: string[];
  hint: string;
}

// Farb-Akzente je Symboltyp — entspricht PapAccent in PapQuestData.swift.
// Direkt an die in index.css definierten CSS-Variablen gekoppelt.
export const PAP_ACCENT = {
  control: 'var(--pap-control)',
  action: 'var(--pap-action)',
  decision: 'var(--pap-decision)',
  io: 'var(--pap-io)',
  flow: 'var(--ink)',
} as const;

export const PAP_LEVELS: PapLevel[] = [
  {
    id: 1,
    title: 'Die 5 heiligen Symbole',
    subtitle: 'PAP-Grundbausteine',
    explain:
      'Jeder Programmablaufplan (nach DIN 66001) besteht aus 5 Symbolen. Jedes hat eine feste Bedeutung und eine feste Formulierungsregel.',
    table: [
      { shape: 'circle', name: 'Kontrollpunkt', rule: 'Darstellung von Ereignissen — formuliert als Aussage' },
      { shape: 'rect', name: 'Aktivität', rule: 'Darstellung von Transaktionen/Prozessen — Verb + Substantiv' },
      { shape: 'diamond', name: 'Verzweigung', rule: 'Darstellung von Entscheidungen — geschlossene Ja/Nein-Frage' },
      { shape: 'parallelogram', name: 'Ein-/Ausgabe', rule: 'Darstellung von Daten — Verb + Daten' },
      { shape: 'arrow', name: 'Reihenfolge', rule: 'Zeigt den Ablauf / die Pfeilrichtung' },
    ],
    type: 'match',
    matchItems: [
      { id: 'A', label: 'Parallelogramm', shape: 'parallelogram' },
      { id: 'B', label: 'Pfeil', shape: 'arrow' },
      { id: 'C', label: 'Kreis', shape: 'circle' },
      { id: 'D', label: 'Raute', shape: 'diamond' },
      { id: 'E', label: 'Rechteck', shape: 'rect' },
    ],
    matchSlots: [
      { id: 1, label: 'Darstellung von Entscheidungen', answer: 'D' },
      { id: 2, label: 'Darstellung von Ereignissen', answer: 'C' },
      { id: 3, label: 'Darstellung der Reihenfolge', answer: 'B' },
      { id: 4, label: 'Darstellung von Transaktionen/Prozessen', answer: 'E' },
      { id: 5, label: 'Darstellung von Daten', answer: 'A' },
    ],
    hint: 'Die Raute ist der Türsteher: nur Ja/Nein kommt durch. Der Kreis markiert einen Moment (Ereignis), das Rechteck eine Handlung (Aktivität).',
  },
  {
    id: 2,
    title: 'IF, THEN, ELSE',
    subtitle: 'Die Grundlogik des Quellcodes',
    explain:
      'IF…THEN…ELSE ist die grundlegendste Struktur der Datenverarbeitung. Transaktionen werden nur ausgeführt, wenn eine Bedingung erfüllt ist. Bei mehreren verschachtelten IFs gilt: ELSE bezieht sich immer auf das letzte davorstehende IF, welches noch kein ELSE hatte.',
    type: 'order',
    scenario:
      'Mutter: „Bist du so lieb und gehst in den Supermarkt. Kaufe dort eine Flasche Milch. Wenn sie Eier haben, bringe sechs mit.“',
    orderItems: [
      { id: 'A', label: 'ELSE\n  IF Milch = 0 und Eier = 0\n  THEN Gehe nach Hause' },
      { id: 'B', label: 'IF Milch > 0 und Eier >= 6\nTHEN Kaufe 1 Milch und 6 Eier' },
      { id: 'C', label: 'ELSE\n  IF Milch > 0 und Eier = 0\n  THEN Kaufe 1 Milch' },
      { id: 'D', label: 'ELSE\n  IF Milch = 0 und Eier >= 6\n  THEN Kaufe 6 Eier' },
    ],
    correctOrder: ['B', 'D', 'C', 'A'],
    hint: 'Erst der Idealfall (beides da), dann absteigend die Sonderfälle.',
  },
  {
    id: 3,
    title: 'Note berechnen',
    subtitle: 'Logische Operatoren OR & AND',
    explain:
      'Klausur „Wirtschaftsinformatik“: 90 Punkte gesamt (je 45 Theorie T und Praxis P). Nicht bestanden, wenn ein Teil unter 30 Punkten liegt. Sonst: bei max. 70 Punkten gesamt → Durchschnittlich, sonst → Überdurchschnittlich.',
    type: 'build',
    orderItems: [
      { id: 'A', label: 'IF (T < 30 OR P < 30)' },
      { id: 'B', label: 'THEN NB' },
      { id: 'C', label: 'ELSE' },
      { id: 'D', label: 'IF (T + P ≤ 70)' },
      { id: 'E', label: 'THEN D' },
      { id: 'F', label: 'ELSE ÜD' },
    ],
    correctOrder: ['A', 'B', 'C', 'D', 'E', 'F'],
    hint: 'Erst die K.O.-Bedingung prüfen (einer der Teile < 30), dann erst zwischen Durchschnittlich/Überdurchschnittlich unterscheiden.',
  },
  {
    id: 4,
    title: 'Milch & Eier – der PAP',
    subtitle: 'Vom Text zum Flussdiagramm',
    explain:
      'Jetzt drehen wir die Aufgabe um: aus der IF-Logik wird ein Programmablaufplan. Bring die Schritte in die richtige Pfeil-Reihenfolge.',
    type: 'order',
    scenario: 'PAP für den Einkauf: Milch wird gebraucht! → ... → Einkauf abgeschlossen!',
    orderItems: [
      { id: 'A', label: 'Ist Milch > 0? — Nein → Gehe in den Supermarkt' },
      { id: 'B', label: 'Sind Eier ≥ 6? — Ja → Kaufe sechs Eier' },
      { id: 'C', label: 'Ist Milch > 0? — Ja → weiter zur Eier-Prüfung' },
      { id: 'D', label: 'Kaufe eine Flasche Milch' },
      { id: 'E', label: 'Einkauf abgeschlossen!' },
    ],
    correctOrder: ['A', 'D', 'C', 'B', 'E'],
    hint: 'Erst wird geprüft ob Milch fehlt (Nein-Pfad kauft Milch), danach läuft beides in die Eier-Prüfung zusammen, danach Ende.',
  },
  {
    id: 5,
    title: 'Bibliothek-Boss',
    subtitle: 'Buch ausleihen, vorbestellen oder fernleihen',
    explain:
      'Vor der Bachelorarbeit: Buch suchen. Vorhanden? Wenn nicht → Fernleihe. Wenn vorhanden, aber ausgeliehen → vorbestellen. Sonst → ausleihen (max. 5 Bücher gleichzeitig).',
    type: 'order',
    scenario: 'Start → Buch suchen → ... → Ende',
    orderItems: [
      { id: 'A', label: 'Vorhanden? — Nein → Fernleihe bestellen' },
      { id: 'B', label: 'Ausgeliehen? — Ja → Vorbestellen' },
      { id: 'C', label: 'Ausgeliehen? — Nein → Ausleihen' },
      { id: 'D', label: '5 Bücher erreicht? — Nein → zurück zu „Buch suchen“' },
      { id: 'E', label: '5 Bücher erreicht? — Ja → Ende' },
    ],
    correctOrder: ['A', 'B', 'C', 'D', 'E'],
    hint: 'Erst die Verfügbarkeits-Frage, dann (falls vorhanden) die Ausleih-Frage, am Schluss die Schleifenbedingung über die 5-Bücher-Grenze.',
  },
  {
    id: 6,
    title: 'Online-Shop-Endboss',
    subtitle: 'Artikel ansehen, Warenkorb oder Merkzettel',
    explain:
      'Letzter Boss: Kunde wählt Artikel, sieht ihn an. Gefällt er? Wenn ja: sofort kaufen oder auf den Merkzettel. Danach: weitere Artikel ansehen oder zur Kasse.',
    type: 'order',
    scenario: 'Shopper beginnt → ... → zur Kasse gehen → Ende',
    orderItems: [
      { id: 'A', label: 'Artikel auswählen → Artikel ansehen' },
      { id: 'B', label: 'Gefällt? — Nein → zurück zu Artikel auswählen' },
      { id: 'C', label: 'Gefällt? — Ja → Soll Artikel jetzt gekauft werden?' },
      { id: 'D', label: 'Ja → Artikel in Warenkorb / Nein → Artikel in Merkzettel' },
      { id: 'E', label: 'Letzter Artikel? — Nein → zurück zu Artikel auswählen' },
      { id: 'F', label: 'Letzter Artikel? — Ja → Warenkorb wird angezeigt → zur Kasse gehen' },
    ],
    correctOrder: ['A', 'B', 'C', 'D', 'E', 'F'],
    hint: 'Zwei verschachtelte Entscheidungen: erst „gefällt“, dann „kaufen oder merken“, ganz am Ende erst die Schleifenfrage nach weiteren Artikeln.',
  },
];

export const POINTS_PER_LEVEL = 100;
