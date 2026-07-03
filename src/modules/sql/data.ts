// ============================================================
// SQL-FILTERUNG TRAINIEREN — Datenmodelle & Inhalte
// Portiert aus SqlTrainerData.swift und SqlLevelsData.swift
// ============================================================

export interface SqlField {
  label: string;
  chips: string[];
}

// ============================================================
// SQL-TRAINER — Fortschritt (rein im Arbeitsspeicher dieser Sitzung)
// Portiert aus SqlProgressStore (SqlModeAndTutorialView.swift)
// ============================================================
export interface SqlLevelProgress {
  completed: boolean;
  starsBlocks: number;
  starsFreitext: number;
}

export interface SqlProgressState {
  points: number;
  tutorialDone: boolean;
  levels: Record<number, SqlLevelProgress>;
  mode: SqlMode['id'] | null;
}

export const initialSqlProgress: SqlProgressState = {
  points: 0,
  tutorialDone: false,
  levels: {},
  mode: null,
};

export interface SqlLevel {
  id: number;
  title: string;
  subtitle: string;
  task: string;
  fields: SqlField[];
  /** Flache Bausteinliste in korrekter Reihenfolge, u.a. für den Block-Modus. */
  blocks: string[];
  /** Musterlösung, zeilenweise wie in der SAP/Klausur-Notation. */
  solutionLines: string[];
  hints: string[];
}

export interface SqlMode {
  id: 'beginner' | 'advanced' | 'pro';
  emoji: string;
  title: string;
  desc: string;
  detail: string;
}

export const SqlAccent = {
  cyan: '#22d3ee',
} as const;

export const SqlModes: { all: SqlMode[] } = {
  all: [
    {
      id: 'beginner',
      emoji: '🌱',
      title: 'Anfänger',
      desc: 'Ich habe noch keine Ahnung von SQL. Erkläre mir alles von Grund auf.',
      detail: 'Tutorial zuerst (Pflicht) → danach jedes Level mit Bausteinen zum Üben, dann Freitext.',
    },
    {
      id: 'advanced',
      emoji: '📈',
      title: 'Fortgeschritten',
      desc: 'Ich kenne SELECT/WHERE/AND/OR schon grob, will aber sicherer werden.',
      detail: 'Tutorial optional → jedes Level direkt im Freitext-Modus, Hinweise bleiben verfügbar.',
    },
    {
      id: 'pro',
      emoji: '🎯',
      title: 'Profi',
      desc: 'Ich will nur den Screenshot sehen und die SQL-Anweisung selbst schreiben — wie in der Klausur.',
      detail: 'Kein Tutorial, keine Bausteine, keine Hinweise. Nur Screenshot + Eingabefeld + strenge Prüfung.',
    },
  ],
};

export interface SqlTutorialDemoTable {
  headers: string[];
  rows: string[][];
}

export interface SqlTutorialStep {
  key: string;
  title: string;
  explain: string;
  demoTable?: SqlTutorialDemoTable;
  blocksDemo?: string[];
  fieldsDemo?: SqlField[];
  question: string;
  options: string[];
  correctIndex: number;
  afterCorrect: string;
}

export const SqlTutorialContent: { steps: SqlTutorialStep[] } = {
  steps: [
    {
      key: 'spalten',
      title: 'Was ist eine Spalte?',
      explain:
        'In SAP siehst du eine Tabelle mit Geschäftspartnern. Jede Zeile ist ein Datensatz (ein Geschäftspartner), jede Spalte ist eine Eigenschaft davon — zum Beispiel „Ort“ oder „Postleitzahl“. In SQL fragst du genau diese Spalten ab.',
      demoTable: {
        headers: ['Geschäftspartner', 'Ort', 'Postleitzahl'],
        rows: [
          ['Müller GmbH', 'Hamburg', '20457'],
          ['Schmidt AG', 'Berlin', '10115'],
        ],
      },
      question: 'Welche Spalte zeigt dir die Stadt eines Geschäftspartners?',
      options: ['Geschäftspartner', 'Ort', 'Postleitzahl'],
      correctIndex: 1,
      afterCorrect: 'Genau — „Ort“ ist eine Spalte. In SQL nennt man Spalten auch Felder.',
    },
    {
      key: 'select-from',
      title: 'SELECT und FROM — das Grundgerüst',
      explain:
        'Jede SQL-Anweisung beginnt gleich: SELECT sagt, welche Spalten du sehen willst. FROM sagt, aus welcher Tabelle. In unseren Aufgaben ist das immer dieselbe Tabelle: Geschäftspartner_verwalten.',
      blocksDemo: ['SELECT', 'Geschäftspartner, Ort, Postleitzahl, Land, Rolle', 'FROM', 'Geschäftspartner_verwalten'],
      question: 'Was kommt nach SELECT?',
      options: ['Der Tabellenname', 'Die gewünschten Spalten', 'Eine Filterbedingung'],
      correctIndex: 1,
      afterCorrect: 'Richtig! SELECT listet die Spalten auf, die du sehen möchtest.',
    },
    {
      key: 'where',
      title: 'WHERE — der Filter',
      explain:
        'WHERE schränkt ein, WELCHE Zeilen du sehen willst. Ein Filter im SAP-Screenshot (z. B. ein Chip wie „Kunde“ im Feld Rolle) wird zu einer WHERE-Bedingung: Rolle = \'Kunde\'.',
      fieldsDemo: [{ label: 'Rolle', chips: ['Kunde ⊗'] }],
      question: 'Wie lautet die passende WHERE-Bedingung für den Chip „Kunde“ im Feld Rolle?',
      options: ["WHERE Rolle = 'Kunde'", "WHERE Kunde = 'Rolle'", "SELECT Rolle = 'Kunde'"],
      correctIndex: 0,
      afterCorrect: 'Genau so! Feldname = Wert, in Anführungszeichen.',
    },
    {
      key: 'or',
      title: 'OR — zwei Werte im selben Feld',
      explain:
        'Stehen zwei Chips im selben Feld (z. B. „Kunde“ und „Lieferant“ beide unter Rolle), heißt das: einer von beiden reicht. Das nennt man eine ODER-Verknüpfung → OR.',
      fieldsDemo: [{ label: 'Rolle', chips: ['Kunde ⊗', 'Lieferant ⊗'] }],
      question: 'Welche Bedingung passt zu zwei Chips im selben Feld?',
      options: [
        "Rolle = 'Kunde' AND Rolle = 'Lieferant'",
        "Rolle = 'Kunde' OR Rolle = 'Lieferant'",
        "Rolle = 'Kunde', 'Lieferant'",
      ],
      correctIndex: 1,
      afterCorrect: 'Korrekt! Zwei positive Werte im selben Feld werden immer mit OR verbunden.',
    },
    {
      key: 'and',
      title: 'AND — zwei verschiedene Felder',
      explain:
        'Sind zwei UNTERSCHIEDLICHE Felder gefüllt (z. B. Rolle UND Land), müssen beide Bedingungen gleichzeitig zutreffen. Das ist eine UND-Verknüpfung → AND.',
      fieldsDemo: [
        { label: 'Rolle', chips: ['Kunde ⊗'] },
        { label: 'Land/Region', chips: ['DE ⊗'] },
      ],
      question: 'Wie verbindest du die Bedingungen aus zwei unterschiedlichen Feldern?',
      options: ['Mit OR', 'Mit AND', 'Gar nicht, man lässt eine weg'],
      correctIndex: 1,
      afterCorrect:
        'Genau! Unterschiedliche Felder werden mit AND verbunden — die Merkregel: gleiches Feld + positiv = OR, unterschiedliche Felder = AND.',
    },
  ],
};

const SELECT_COLUMNS = 'Geschäftspartner, Ort, Postleitzahl, Land, Rolle';
const TABLE_NAME = 'Geschäftspartner_verwalten';

export const SqlLevels: { all: SqlLevel[] } = {
  all: [
    {
      id: 1,
      title: 'TechParts Vertrieb GmbH',
      subtitle: 'Einstieg: ein einzelnes Filterkriterium',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Kunde ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: [] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Angelegt am', chips: [] },
      ],
      blocks: ['SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE', "Rolle = 'Kunde'"],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Kunde')",
      ],
      hints: [
        'Nur ein einziges Feld ist gefüllt — ein einziger Wert braucht keine Verknüpfung (kein AND/OR nötig).',
        'Das Grundgerüst ist immer: SELECT … FROM … WHERE …',
      ],
    },
    {
      id: 2,
      title: 'Olympic Protective Gear',
      subtitle: 'OR: zwei positive Werte im selben Feld',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Lieferant ⊗', 'Arztpraxis ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: [] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Angelegt am', chips: [] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Lieferant'", 'OR', "Rolle = 'Arztpraxis'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Lieferant' OR Rolle = 'Arztpraxis')",
      ],
      hints: [
        'Zwei positive Werte im selben Feld → OR (mind. einer der beiden muss zutreffen).',
        'Beide Bedingungen beziehen sich auf dasselbe Feld „Rolle“.',
      ],
    },
    {
      id: 3,
      title: 'Rheinmetall Büroservice',
      subtitle: 'AND: zwei verschiedene Felder verknüpfen',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Kunde ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: [] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: ['DE ⊗'] },
        { label: 'Angelegt am', chips: [] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Kunde'", 'AND', "Land = 'DE'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Kunde')",
        "AND     (Land = 'DE')",
      ],
      hints: [
        'Rolle und Land sind zwei unterschiedliche Felder → AND (beide müssen gleichzeitig zutreffen).',
        'Jedes Feld bekommt seine eigene Bedingung; AND verbindet die Felder, nicht die Werte innerhalb eines Feldes.',
      ],
    },
    {
      id: 4,
      title: 'Nordwind Logistik AG',
      subtitle: 'OR-Kette mit drei Werten + offene Datumsgrenze',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Kunde ⊗', 'Lieferant ⊗', 'Interessent ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: [] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Angelegt am', chips: ['≥ 01.01.2023 ⊗'] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Kunde'", 'OR', "Rolle = 'Lieferant'", 'OR', "Rolle = 'Interessent'",
        'AND', "Angelegt_am >= '01.01.2023'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Kunde' OR Rolle = 'Lieferant' OR Rolle = 'Interessent')",
        "AND     (Angelegt_am >= '01.01.2023')",
      ],
      hints: [
        'Drei positive Werte im selben Feld → OR OR OR, genau wie bei zwei Werten.',
        '„≥“ ist nur eine Grenze, kein Bereich → ein einziger Vergleich reicht, kein zweiter mit <=.',
        'Rolle-Bedingung und Datum sind unterschiedliche Felder → AND.',
      ],
    },
    {
      id: 5,
      title: 'Bergmann Sportartikel e.K.',
      subtitle: 'LIKE: Platzhalter im Namensfeld',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: [] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['*Sport* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Angelegt am', chips: [] },
      ],
      blocks: ['SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE', "Nachname/Name1 LIKE '*Sport*'"],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Nachname/Name1 LIKE '*Sport*')",
      ],
      hints: [
        '*…* ohne „!“ → LIKE, kein NOT LIKE.',
        'LIKE wird benutzt, wenn ein Text irgendwo den angegebenen Teilstring enthalten soll.',
      ],
    },
    {
      id: 6,
      title: 'Helios Medizintechnik',
      subtitle: 'NOT LIKE: Ausschluss mit Platzhalter',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: [] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['!*Sample* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Geändert am', chips: [] },
      ],
      blocks: ['SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE', "Nachname/Name1 NOT LIKE '*Sample*'"],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Nachname/Name1 NOT LIKE '*Sample*')",
      ],
      hints: [
        '„!“ MIT „*…*“ → NOT LIKE (Platzhalter vorhanden, aber negiert).',
        'Der Treffer darf den Teilstring NICHT enthalten.',
      ],
    },
    {
      id: 7,
      title: 'Alpenblick Handels GmbH',
      subtitle: 'Negation ohne Platzhalter + OR kombiniert',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Kunde ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['!*Test* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: ['!München ⊗'] },
        { label: 'Land/Region', chips: ['DE ⊗', 'AT ⊗'] },
        { label: 'Geändert am', chips: [] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Kunde'", 'AND', "Nachname/Name1 NOT LIKE '*Test*'", 'AND', "Ort <> 'München'",
        'AND', "Land = 'DE'", 'OR', "Land = 'AT'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Kunde')",
        "AND     (Nachname/Name1 NOT LIKE '*Test*')",
        "AND     (Ort <> 'München')",
        "AND     (Land = 'DE' OR Land = 'AT')",
      ],
      hints: [
        '„!“ OHNE „*…*“ → einfacher Ungleich-Vergleich <>, kein LIKE nötig.',
        'Zwei positive Werte im Feld Land → OR, unabhängig davon, dass andere Felder negiert sind.',
        'Vier unterschiedliche Felder → durchgängig AND zwischen den Feldern.',
      ],
    },
    {
      id: 8,
      title: 'Rheinland Handelshaus GmbH',
      subtitle: 'Klausurfalle: Positiv + Negativ im selben Feld = AND',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: [] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['*Handel* ⊗', '!*Alt* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: ['DE ⊗'] },
        { label: 'Geändert am', chips: [] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Nachname/Name1 LIKE '*Handel*'", 'AND', "Nachname/Name1 NOT LIKE '*Alt*'",
        'AND', "Land = 'DE'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Nachname/Name1 LIKE '*Handel*' AND Nachname/Name1 NOT LIKE '*Alt*')",
        "AND     (Land = 'DE')",
      ],
      hints: [
        'Positiver Eintrag (*Handel*) + negativer Eintrag (!*Alt*) im SELBEN Feld → AND, nicht OR!',
        'Das ist die häufigste Klausurfalle: man vermutet OR, weil es „zwei Werte“ sind — aber positiv+negativ ist immer AND.',
        'Name-Bedingung und Land sind unterschiedliche Felder → ebenfalls AND.',
      ],
    },
    {
      id: 9,
      title: 'Olympic Protective Gear (Datumsbereich)',
      subtitle: 'Voller Datumsbereich: zwei Grenzen mit AND',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an.',
      fields: [
        { label: 'Rolle', chips: ['Lieferant ⊗', 'Arztpraxis ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['*Protective* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: [] },
        { label: 'Angelegt am', chips: ['01.01.2020...31.12.2020 ⊗'] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Lieferant'", 'OR', "Rolle = 'Arztpraxis'",
        'AND', "Nachname/Name1 LIKE '*Protective*'",
        'AND', "Angelegt_am >= '01.01.2020'", 'AND', "Angelegt_am <= '31.12.2020'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Lieferant' OR Rolle = 'Arztpraxis')",
        "AND     (Nachname/Name1 LIKE '*Protective*')",
        "AND     (Angelegt_am >= '01.01.2020' AND Angelegt_am <= '31.12.2020')",
      ],
      hints: [
        'Ein Datumsbereich (von...bis) braucht zwei Bedingungen: >= und <=, verbunden mit AND.',
        'Beide Datumsgrenzen gehören zu demselben Feld, werden aber trotzdem mit AND verbunden (keine Ausnahme von der Feld-Regel).',
        'Rolle (OR), Name (LIKE) und Datum (zwei AND-Teile) sind drei unterschiedliche Blöcke, untereinander mit AND.',
      ],
    },
    {
      id: 10,
      title: 'Abschlussprüfung: Global Office Supplies AG',
      subtitle: 'Kombi: OR + AND + NOT LIKE + Datumsbereich',
      task:
        'Erstellen Sie eine SQL-Anweisung für die Filterung im SAP S/4HANA-System. Die SQL-Anweisung soll exakt die Angaben im Screenshot widerspiegeln! Wenden Sie die SQL-Syntax aus der Vorlesung an. Dies ist die Abschlussaufgabe — sie kombiniert alle bisher gelernten Regeln.',
      fields: [
        { label: 'Rolle', chips: ['Kunde ⊗', 'Interessent ⊗'] },
        { label: 'Geschäftspartner', chips: [] },
        { label: 'Nachname/Name 1', chips: ['!*Privat* ⊗'] },
        { label: 'Vorname/Name 2', chips: [] },
        { label: 'Straße', chips: [] },
        { label: 'Ort', chips: [] },
        { label: 'Land/Region', chips: ['DE ⊗'] },
        { label: 'Geändert am', chips: ['01.06.2022...31.12.2024 ⊗'] },
      ],
      blocks: [
        'SELECT', SELECT_COLUMNS, 'FROM', TABLE_NAME, 'WHERE',
        "Rolle = 'Kunde'", 'OR', "Rolle = 'Interessent'",
        'AND', "Nachname/Name1 NOT LIKE '*Privat*'",
        'AND', "Land = 'DE'",
        'AND', "Geändert_am >= '01.06.2022'", 'AND', "Geändert_am <= '31.12.2024'",
      ],
      solutionLines: [
        `SELECT  ${SELECT_COLUMNS}`,
        `FROM    ${TABLE_NAME}`,
        "WHERE   (Rolle = 'Kunde' OR Rolle = 'Interessent')",
        "AND     (Nachname/Name1 NOT LIKE '*Privat*')",
        "AND     (Land = 'DE')",
        "AND     (Geändert_am >= '01.06.2022' AND Geändert_am <= '31.12.2024')",
      ],
      hints: [
        'Rolle hat zwei positive Werte → OR innerhalb des Feldes.',
        'Name ist negiert mit Platzhalter → NOT LIKE.',
        'Land ist ein einzelner Wert, Datum ist ein voller Bereich (zwei Grenzen mit AND).',
        'Alle vier Blöcke (Rolle, Name, Land, Datum) werden untereinander mit AND verbunden.',
      ],
    },
  ],
};
