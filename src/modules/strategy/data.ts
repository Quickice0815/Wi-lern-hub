import type { CaseStudy, DiagramDef, TermMatchSet } from './types';

// ============================================================
// STRATEGIE & FÜHRUNG — Inhalte
// Basierend auf den Klausurvorbereitungs-Unterlagen (Situatives
// Führungsmodell nach Hersey/Blanchard, Five-Forces und SWOT nach
// Porter) sowie dem Standard-Portfolio-Modell der BCG-Matrix.
// ============================================================

export const DIAGRAMS: DiagramDef[] = [
  {
    id: 'bcg-matrix',
    title: 'BCG-Matrix',
    subtitle: 'Portfolio-Analyse nach der Boston Consulting Group',
    intro:
      'Die BCG-Matrix ordnet Geschäftsfelder oder Produkte anhand von zwei Kennzahlen ein, um Investitions- ' +
      'entscheidungen im Portfolio zu treffen. Ziehe zuerst die beiden Achsenbegriffe an die richtige Stelle, ' +
      'danach die vier Feldnamen in die passenden Quadranten.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisTerms: [
      {
        id: 'bcg-y',
        axis: 'y',
        label: 'Marktwachstum',
        explanation:
          'Das Marktwachstum ist ein Indikator für die Attraktivität eines Marktsegments. Hohes Wachstum ' +
          'erfordert meist hohe Investitionen, um die eigene Marktposition zu halten oder auszubauen.',
      },
      {
        id: 'bcg-x',
        axis: 'x',
        label: 'Relativer Marktanteil',
        explanation:
          'Der relative Marktanteil setzt den eigenen Marktanteil ins Verhältnis zum stärksten Wettbewerber. ' +
          'Er gilt als Indikator für die Wettbewerbsposition und ist über die Erfahrungskurve oft mit Kostenvorteilen verbunden.',
      },
    ],
    slots: [
      {
        id: 'bcg-stars',
        area: 'tl',
        label: 'Stars',
        explanation:
          'Hohes Marktwachstum bei hohem relativem Marktanteil. Hoher Investitionsbedarf, aber auch hohe ' +
          'Erträge — Ziel ist es, die Marktposition zu halten, bis der Markt reift und die Stars zu Cash Cows werden.',
      },
      {
        id: 'bcg-questionmarks',
        area: 'tr',
        label: 'Question Marks',
        explanation:
          'Hohes Marktwachstum, aber (noch) geringer Marktanteil. Hoher Kapitalbedarf bei unsicherem Ertrag — ' +
          'es muss entschieden werden: gezielt investieren, um einen Star aufzubauen, oder desinvestieren.',
      },
      {
        id: 'bcg-cashcows',
        area: 'bl',
        label: 'Cash Cows',
        explanation:
          'Niedriges Marktwachstum, aber hoher Marktanteil. Geringer Investitionsbedarf bei hohen und stabilen ' +
          'Cashflows — Cash Cows finanzieren i. d. R. die Question Marks und Stars im Portfolio.',
      },
      {
        id: 'bcg-poordogs',
        area: 'br',
        label: 'Poor Dogs',
        explanation:
          'Niedriges Marktwachstum und niedriger Marktanteil. Geringe strategische Bedeutung — oft Kandidaten ' +
          'für Desinvestition oder Marktaustritt.',
      },
    ],
  },
  {
    id: 'five-forces',
    title: "Porters Five Forces",
    subtitle: 'Branchenstrukturanalyse nach Michael Porter',
    intro:
      'Das Five-Forces-Modell analysiert fünf Wettbewerbskräfte, die gemeinsam die Attraktivität einer Branche ' +
      'bestimmen. Der Branchenwettbewerb steht im Zentrum — ziehe die vier weiteren Kräfte an ihre Position rund um ihn herum.',
    columns: '1fr 1.3fr 1fr',
    rows: '1fr 1fr 1fr',
    areas: ['.    top    .', 'left center right', '.    bottom .'],
    accent: 'var(--strategy)',
    axisTerms: [],
    fixedBoxes: [{ label: 'Branchen­wettbewerber', area: 'center' }],
    slots: [
      {
        id: 'ff-new',
        area: 'top',
        label: 'Neue Wettbewerber',
        explanation:
          'Die Gefahr des Markteintritts neuer Wettbewerber hängt von den Markteintrittsbarrieren ab, z. B. ' +
          'Economies of Scale, Produktdifferenzierung, Kapitalbedarf und regulatorische Eingriffe des Staates. ' +
          'Je niedriger die Barrieren, desto größer die Bedrohung für etablierte Anbieter.',
      },
      {
        id: 'ff-suppliers',
        area: 'left',
        label: 'Lieferanten',
        explanation:
          'Die Verhandlungsmacht der Lieferanten ist umso größer, je konzentrierter und organisierter sie ' +
          'auftreten, je weniger Substitutionsmöglichkeiten es für ihren Einsatzstoff gibt und je wichtiger ' +
          'dieser für die Produktion ist.',
      },
      {
        id: 'ff-customers',
        area: 'right',
        label: 'Kunden',
        explanation:
          'Die Verhandlungsmacht (Käufermacht) der Kunden ist umso größer, je konzentrierter und organisierter ' +
          'die Abnehmer sind, je undifferenzierter das Produkt ist und je geringer die Wechselkosten für sie sind.',
      },
      {
        id: 'ff-substitutes',
        area: 'bottom',
        label: 'Substitutionsprodukte',
        explanation:
          'Substitutionsprodukte gefährden den Nutzen des eigenen Angebots. Je geringer die Wechselkosten und ' +
          'je höher die wahrgenommene Gleichwertigkeit des Ersatzprodukts, desto größer die Gefahr sinkender Preise und Gewinne.',
      },
    ],
  },
  {
    id: 'reifegradmodell',
    title: 'Situatives Führungsmodell',
    subtitle: 'Reifegradmodell nach Hersey/Blanchard',
    intro:
      'Nach Hersey/Blanchard ist der effektivste Führungsstil abhängig vom Reifegrad des Mitarbeiters bezüglich ' +
      'der Aufgabe. Ordne zuerst die beiden Orientierungs-Achsen zu, danach die vier Führungsstile in ihre Felder.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisTerms: [
      {
        id: 'lead-y',
        axis: 'y',
        label: 'Beziehungsorientierung',
        explanation:
          'Beziehungsorientierung beschreibt, in welchem Ausmaß die Führungskraft auf sozio-emotionale ' +
          'Unterstützung, Kommunikation und Zuhören setzt.',
      },
      {
        id: 'lead-x',
        axis: 'x',
        label: 'Aufgabenorientierung',
        explanation:
          'Aufgabenorientierung beschreibt, in welchem Ausmaß die Führungskraft Aufgaben, Rollen und Ziele ' +
          'strukturiert, vorgibt und kontrolliert.',
      },
    ],
    slots: [
      {
        id: 'lead-participating',
        area: 'tl',
        label: 'Partizipativer Stil (S3)',
        explanation:
          'Hohe Beziehungs-, geringe Aufgabenorientierung ("participating"). Passt zu Reifegrad M3 — der ' +
          'Mitarbeiter kann die Aufgabe, ist aber unsicher oder wenig motiviert. Die Führungskraft entscheidet gemeinsam und ermutigt.',
      },
      {
        id: 'lead-selling',
        area: 'tr',
        label: 'Integrierender Stil (S2)',
        explanation:
          'Hohe Aufgaben- UND Beziehungsorientierung ("selling"). Passt zu Reifegrad M2 — der Mitarbeiter will, ' +
          'kann die Aufgabe aber noch nicht vollständig. Die Führungskraft erklärt Entscheidungen und bietet Unterstützung.',
      },
      {
        id: 'lead-delegating',
        area: 'bl',
        label: 'Delegierender Stil (S4)',
        explanation:
          'Geringe Aufgaben- UND Beziehungsorientierung ("delegating"). Passt zu Reifegrad M4 — der Mitarbeiter ' +
          'kann und will. Verantwortung wird übergeben, die Steuerung bleibt minimal.',
      },
      {
        id: 'lead-telling',
        area: 'br',
        label: 'Autoritärer Stil (S1)',
        explanation:
          'Hohe Aufgaben-, geringe Beziehungsorientierung ("telling"). Passt zu Reifegrad M1 — der Mitarbeiter ' +
          'kann und will (noch) nicht. Die Führungskraft gibt klare Anweisungen und kontrolliert eng.',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'eisenhower-montag',
    title: 'Führungsalltag: Prioritäten setzen',
    scenario:
      'Sie leiten seit Kurzem ein achtköpfiges Vertriebsteam. An einem Montagmorgen liegen die folgenden acht ' +
      'Punkte auf Ihrem Tisch bzw. in Ihrem Posteingang.',
    instructions:
      'Ordnen Sie jeden Punkt nach dem Eisenhower-Prinzip in die richtige Matrix-Zelle ein (dringend/nicht ' +
      'dringend × wichtig/nicht wichtig).',
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['tl tr', 'bl br'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'tl', area: 'tl', title: 'Sofort erledigen', hint: 'dringend & wichtig' },
      { id: 'tr', area: 'tr', title: 'Terminieren', hint: 'wichtig, nicht dringend' },
      { id: 'bl', area: 'bl', title: 'Delegieren', hint: 'dringend, nicht wichtig' },
      { id: 'br', area: 'br', title: 'Streichen', hint: 'weder dringend noch wichtig' },
    ],
    items: [
      {
        id: 'reklamation',
        label: 'Ein wichtiger Kunde reklamiert eine termingebundene Lieferung von heute Nachmittag.',
        correctQuadrant: 'tl',
        explanation: 'Kurzfristiger Kundenverlust droht — muss sofort persönlich behandelt werden.',
      },
      {
        id: 'server',
        label: 'Ein Server-Ausfall blockiert gerade das CRM-System des gesamten Teams.',
        correctQuadrant: 'tl',
        explanation: 'Akute Betriebsstörung mit direkter Auswirkung auf die Arbeitsfähigkeit — sofort handeln.',
      },
      {
        id: 'strategie',
        label: 'Die Vertriebsstrategie für das nächste Geschäftsjahr muss ausgearbeitet werden (Frist: 6 Wochen).',
        correctQuadrant: 'tr',
        explanation: 'Wichtig für den langfristigen Erfolg, aber noch Zeit — fest einplanen statt aufschieben.',
      },
      {
        id: 'befragung',
        label: 'Die jährliche Mitarbeiterbefragung zur Zufriedenheit soll in den nächsten Monaten vorbereitet werden.',
        correctQuadrant: 'tr',
        explanation: 'Wichtig für die Teamentwicklung, aber nicht akut — gehört in den Terminkalender.',
      },
      {
        id: 'weiterleitung',
        label: 'Ein Kollege bittet um eine Routine-Weiterleitung, die auch das Praktikantenteam erledigen könnte.',
        correctQuadrant: 'bl',
        explanation: 'Zeitkritisch, aber keine Führungsaufgabe — an eine geeignete Person delegieren.',
      },
      {
        id: 'bericht',
        label: 'Ein Standardbericht mit heutiger Deadline kann auch von einem Teammitglied formatiert werden.',
        correctQuadrant: 'bl',
        explanation: 'Deadline vorhanden, aber geringe strategische Bedeutung — delegierbar.',
      },
      {
        id: 'kaffee',
        label: 'Ein Mitarbeiter lädt spontan zu einem informellen Kaffee ohne konkretes Thema ein.',
        correctQuadrant: 'br',
        explanation: 'Weder dringend noch wichtig für die aktuelle Führungsaufgabe — kann verschoben werden.',
      },
      {
        id: 'newsletter',
        label: 'Im Postfach liegt ein Newsletter über ein Branchenevent in acht Monaten.',
        correctQuadrant: 'br',
        explanation: 'Für die aktuelle Arbeit irrelevant — direkt archivieren oder löschen.',
      },
    ],
  },
];

export const TERM_MATCH_SETS: TermMatchSet[] = [
  {
    id: 'fuehrungseffizienz',
    title: 'Führungseffizienz',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'b1',
        before: 'Mitarbeiterführung ist nicht zweckfrei, sondern dient der Zielerreichung, der ',
        correctTermId: 'fuehrungseffizienz',
      },
      {
        id: 'b2',
        before: '. Man unterscheidet dabei zwei Dimensionen: Die ',
        correctTermId: 'wirtschaftliche-effizienz',
      },
      {
        id: 'b3',
        before:
          ' beschreibt den Grad der Erreichung institutioneller Ziele (ökonomischer Aspekt). Die ',
        correctTermId: 'soziale-effizienz',
      },
    ],
    tail: ' beschreibt den Grad der Befriedigung individueller Bedürfnisse der Mitarbeiter (humaner Aspekt).',
    terms: [
      { id: 'fuehrungseffizienz', text: 'Führungseffizienz' },
      { id: 'wirtschaftliche-effizienz', text: 'wirtschaftliche Effizienz' },
      { id: 'soziale-effizienz', text: 'soziale Effizienz' },
    ],
    distractors: [
      { id: 'fuehrungsspanne', text: 'Führungsspanne' },
      { id: 'delegation', text: 'Delegation' },
    ],
  },
  {
    id: 'swot',
    title: 'SWOT-Analyse',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 's1',
        before:
          'Die SWOT-Analyse besteht aus einer internen und externen Betrachtung des Unternehmens. Bei der internen Analyse werden die ',
        correctTermId: 'staerken',
      },
      { id: 's2', before: ' (Strengths) und ', correctTermId: 'schwaechen' },
      {
        id: 's3',
        before: ' (Weaknesses) des Unternehmens identifiziert. Bei der externen Analyse werden die ',
        correctTermId: 'chancen',
      },
      { id: 's4', before: ' (Opportunities) und ', correctTermId: 'risiken' },
    ],
    tail:
      ' (Threats) des Marktumfelds untersucht. Erst die Kombination beider Perspektiven liefert Hinweise zur Formulierung der Unternehmensstrategie.',
    terms: [
      { id: 'staerken', text: 'Stärken' },
      { id: 'schwaechen', text: 'Schwächen' },
      { id: 'chancen', text: 'Chancen' },
      { id: 'risiken', text: 'Risiken' },
    ],
    distractors: [
      { id: 'kernkompetenzen', text: 'Kernkompetenzen' },
      { id: 'marktanteile', text: 'Marktanteile' },
    ],
  },
];
