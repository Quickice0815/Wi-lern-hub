import type { CaseStudy, DiagramDef, TermMatchSet } from './types';

// ============================================================
// STRATEGIE & FÜHRUNG — Inhalte
// Basierend auf den Klausurvorbereitungs-Unterlagen: Situatives
// Führungsmodell (Hersey/Blanchard), Five-Forces, SWOT und die drei
// generischen Strategien nach Porter, Johari-Fenster, Werte- und
// Entwicklungsquadrat (Schulz von Thun), Vier-Seiten-Modell,
// Eisbergmodell, SMART-Ziele, Harvard-Konzept, Konfliktdynamik nach
// Glasl, Tuckman-Teamentwicklung sowie Chancen/Risiken der Teamarbeit.
// Ansoff-Matrix und BCG-Matrix ergänzen die Standard-Portfolio-/
// Wachstumsmodelle, die im Quellenmaterial nur referenziert werden.
//
// Jede Übung ist einer von drei Schwierigkeitsstufen zugeordnet
// (anfaenger/fortgeschritten/profi). Modelle, die bereits als
// Diagramm beschriftet wurden, tauchen auf einer höheren Stufe
// zusätzlich als Fallstudie wieder auf, in der sie auf ein
// konkretes, leicht verständliches Beispiel angewendet werden müssen.
// ============================================================

export const DIAGRAMS: DiagramDef[] = [
  {
    id: 'bcg-matrix',
    title: 'BCG-Matrix',
    subtitle: 'Portfolio-Analyse nach der Boston Consulting Group',
    difficulty: 'anfaenger',
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
    difficulty: 'anfaenger',
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
    id: 'ansoff-matrix',
    title: 'Ansoff-Matrix',
    subtitle: 'Produkt-Markt-Strategien nach Igor Ansoff',
    difficulty: 'anfaenger',
    intro:
      'Die Ansoff-Matrix zeigt vier Wachstumsstrategien, je nachdem ob ein Unternehmen bestehende oder neue ' +
      'Produkte auf bestehenden oder neuen Märkten anbietet. Ziehe zuerst die beiden Achsen zu, danach die vier Strategien.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisTerms: [
      {
        id: 'ansoff-y',
        axis: 'y',
        label: 'Markt (bestehend/neu)',
        explanation: 'Wird der bereits bekannte Markt bedient, oder wird ein neuer Markt erschlossen (z. B. neue Region, neue Zielgruppe)?',
      },
      {
        id: 'ansoff-x',
        axis: 'x',
        label: 'Produkt (bestehend/neu)',
        explanation: 'Wird ein bereits vorhandenes Produkt weiterverwendet, oder wird ein neues Produkt entwickelt?',
      },
    ],
    slots: [
      {
        id: 'ansoff-marktdurchdringung',
        area: 'tl',
        label: 'Marktdurchdringung',
        explanation:
          'Bestehender Markt + bestehendes Produkt: Vorhandene Produkte auf bestehenden Märkten intensiver vermarkten ' +
          '(z. B. mehr Werbung, Preisaktionen), um den Marktanteil zu erhöhen — die risikoärmste Wachstumsstrategie.',
      },
      {
        id: 'ansoff-produktentwicklung',
        area: 'tr',
        label: 'Produktentwicklung',
        explanation: 'Bestehender Markt + neues Produkt: neue Produkte für bereits bekannte Märkte und Kunden entwickeln.',
      },
      {
        id: 'ansoff-marktentwicklung',
        area: 'bl',
        label: 'Marktentwicklung',
        explanation: 'Neuer Markt + bestehendes Produkt: bestehende Produkte auf neuen Märkten anbieten, z. B. in neuen Regionen.',
      },
      {
        id: 'ansoff-diversifikation',
        area: 'br',
        label: 'Diversifikation',
        explanation:
          'Neuer Markt + neues Produkt: die risikoreichste Strategie — oft durch Zukauf oder Kooperation umgesetzt, ' +
          'da weder Produkt noch Markt bekannt sind.',
      },
    ],
  },
  {
    id: 'reifegradmodell',
    title: 'Situatives Führungsmodell',
    subtitle: 'Reifegradmodell nach Hersey/Blanchard',
    difficulty: 'fortgeschritten',
    intro:
      'Nach Hersey/Blanchard ist der effektivste Führungsstil abhängig vom Reifegrad des Mitarbeiters bezüglich ' +
      'der Aufgabe. Ordne zuerst die beiden Orientierungs-Achsen zu, danach die vier Führungsstile in ihre Felder.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisDistractors: ['Fachkompetenz'],
    slotDistractors: ['Kooperativer Stil'],
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
  {
    id: 'johari-fenster',
    title: 'Johari-Fenster',
    subtitle: 'Selbst- und Fremdbild als Grundlage für Feedback',
    difficulty: 'fortgeschritten',
    intro:
      'Das Johari-Fenster zeigt, wie sich Selbst- und Fremdwahrnehmung überschneiden — die Basis für gutes ' +
      'Feedback in der Führungsarbeit. Ordne zuerst die beiden Achsen zu, danach die vier Felder.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisDistractors: ['Kompetenzniveau'],
    slotDistractors: ['Geheimnis'],
    axisTerms: [
      {
        id: 'johari-y',
        axis: 'y',
        label: 'Bekanntheit bei anderen',
        explanation:
          'Beschreibt, ob eine Information über mich von anderen Menschen wahrgenommen wird oder nicht.',
      },
      {
        id: 'johari-x',
        axis: 'x',
        label: 'Bekanntheit bei mir selbst',
        explanation: 'Beschreibt, ob mir eine Information über mich selbst bewusst ist oder nicht.',
      },
    ],
    slots: [
      {
        id: 'johari-oeffentlich',
        area: 'tl',
        label: 'Öffentliche Person',
        explanation:
          'Mir bekannt UND anderen bekannt (Arena): Verhalten und Eigenschaften, die offen zutage liegen — die ' +
          'Basis für freie, unverkrampfte Zusammenarbeit.',
      },
      {
        id: 'johari-blind',
        area: 'tr',
        label: 'Blinder Fleck',
        explanation:
          'Anderen bekannt, mir aber UNbekannt: Dinge, die andere an mir wahrnehmen, die mir selbst nicht bewusst ' +
          'sind — genau hier setzt ehrliches Feedback an.',
      },
      {
        id: 'johari-fassade',
        area: 'bl',
        label: 'Fassade (Privatperson)',
        explanation:
          'Mir bekannt, anderen aber UNbekannt: Dinge, die ich bewusst verberge oder nicht preisgebe — Selbstoffenbarung verkleinert dieses Feld.',
      },
      {
        id: 'johari-unbekannt',
        area: 'br',
        label: 'Unbekanntes',
        explanation:
          'Weder mir noch anderen bekannt: unbewusstes Potenzial oder Verhalten, das erst durch neue Situationen sichtbar wird.',
      },
    ],
  },
  {
    id: 'werte-entwicklungsquadrat',
    title: 'Werte- und Entwicklungsquadrat',
    subtitle: 'Konfliktbehandlung nach Schulz von Thun',
    difficulty: 'profi',
    intro:
      'Jede positive Eigenschaft hat eine wertvolle "Schwestertugend" — wird sie ohne diese übertrieben, kippt ' +
      'sie ins Negative. Ordne die vier Begriffe den richtigen Feldern zu (oben = positiver Kern, unten = Übertreibung).',
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['wert kritik', 'schmeichel herab'],
    accent: 'var(--strategy)',
    axisTerms: [],
    slotDistractors: ['Anpassung', 'Ignoranz'],
    slots: [
      {
        id: 'wq-wertschaetzung',
        area: 'wert',
        label: 'Wertschätzung',
        explanation:
          'Positiver Kern: Anerkennung und Würdigung des anderen — die wertschätzende Schwestertugend zur offenen Kritik.',
      },
      {
        id: 'wq-kritik',
        area: 'kritik',
        label: 'Kritik',
        explanation:
          'Positiver Kern: offene, ehrliche Konfrontation, die auf Verbesserung zielt — die kritische Schwestertugend zur Wertschätzung.',
      },
      {
        id: 'wq-schmeichelei',
        area: 'schmeichel',
        label: 'Schmeichelei',
        explanation:
          'Übertreibung der Wertschätzung ohne Kritik: unkritische Anbiederung und Idealisierung ohne Ehrlichkeit.',
      },
      {
        id: 'wq-herabsetzung',
        area: 'herab',
        label: 'Herabsetzung',
        explanation:
          'Übertreibung der Kritik ohne Wertschätzung: Verächtlichmachung und Geringschätzung des anderen.',
      },
    ],
  },
  {
    id: 'generische-strategien',
    title: 'Die drei generischen Strategien',
    subtitle: 'Wettbewerbsstrategien nach Michael Porter',
    difficulty: 'profi',
    intro:
      'Porter unterscheidet Geschäftsstrategien nach strategischer Ausrichtung (Gesamt- oder Teilmarkt) und ' +
      'strategischem Vorteil (Einzigartigkeit oder Kostenminimum). Ordne zuerst die Achsen, dann die drei Strategien zu.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis diff kf', 'yaxis konz konz', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
    axisDistractors: ['Kundenzufriedenheit'],
    slotDistractors: ['Diversifikation'],
    axisTerms: [
      {
        id: 'gs-y',
        axis: 'y',
        label: 'Strategische Ausrichtung',
        explanation:
          'Werden die Güter/Dienstleistungen auf dem gesamten Branchenmarkt angeboten (Gesamtmarkt) oder nur auf einem Teilmarkt (Nische)?',
      },
      {
        id: 'gs-x',
        axis: 'x',
        label: 'Strategischer Vorteil',
        explanation:
          'Basiert der Wettbewerbsvorteil auf vom Kunden wahrgenommener Einzigartigkeit oder auf dem geringsten Preis (Kostenminimum)?',
      },
    ],
    slots: [
      {
        id: 'gs-differenzierung',
        area: 'diff',
        label: 'Differenzierung',
        explanation:
          'Gesamtmarkt + Einzigartigkeit: Das Angebot wird vom Kunden als einzigartig wahrgenommen (z. B. Markenimage, ' +
          'Produktdesign) — schwer von der Konkurrenz zu kopieren.',
      },
      {
        id: 'gs-kostenfuehrerschaft',
        area: 'kf',
        label: 'Kostenführerschaft',
        explanation:
          'Gesamtmarkt + Kostenminimum: ein vergleichbares Produkt zum niedrigsten Preis der Branche, ermöglicht ' +
          'durch Economies of Scale und konsequente Kostenminimierung.',
      },
      {
        id: 'gs-konzentration',
        area: 'konz',
        label: 'Konzentration (Fokussierung)',
        explanation:
          'Teilmarkt: Beschränkung auf ein Nischensegment, in dem dann entweder differenziert oder kostenführend agiert wird.',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'eisenhower-montag',
    title: 'Führungsalltag: Prioritäten setzen',
    difficulty: 'anfaenger',
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
  {
    id: 'swot-anwenden',
    title: 'SWOT anwenden: Die Stadtbäckerei',
    difficulty: 'anfaenger',
    scenario:
      'Eine seit 40 Jahren familiengeführte Stadtbäckerei überlegt, einen Online-Shop mit Lieferservice zu eröffnen.',
    instructions: 'Ordne jede Beobachtung der passenden SWOT-Kategorie zu.',
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['staerken schwaechen', 'chancen risiken'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'staerken', area: 'staerken', title: 'Stärken', hint: 'intern, positiv' },
      { id: 'schwaechen', area: 'schwaechen', title: 'Schwächen', hint: 'intern, negativ' },
      { id: 'chancen', area: 'chancen', title: 'Chancen', hint: 'extern, positiv' },
      { id: 'risiken', area: 'risiken', title: 'Risiken', hint: 'extern, negativ' },
    ],
    items: [
      {
        id: 'sw1',
        label: 'Die Bäckerei genießt seit Jahrzehnten einen exzellenten Ruf und treue Stammkundschaft.',
        correctQuadrant: 'staerken',
        explanation: 'Ein interner Vorteil: Markenvertrauen, das dem Unternehmen selbst gehört.',
      },
      {
        id: 'sw2',
        label: 'Rezepte und Backprozesse sind über Generationen ausgereift und schmecken einzigartig gut.',
        correctQuadrant: 'staerken',
        explanation: 'Interne Kernkompetenz, die schwer zu kopieren ist.',
      },
      {
        id: 'sw3',
        label: 'Niemand im Team hat Erfahrung mit Online-Shops oder digitalem Marketing.',
        correctQuadrant: 'schwaechen',
        explanation: 'Eine interne Lücke, die das Unternehmen selbst beheben muss (z. B. durch Schulung).',
      },
      {
        id: 'sw4',
        label: 'Die vorhandene Küche hat keine Kapazität für zusätzliche Lieferaufträge.',
        correctQuadrant: 'schwaechen',
        explanation: 'Interne Ressourcenbegrenzung, die die Umsetzung erschwert.',
      },
      {
        id: 'sw5',
        label: 'Immer mehr Menschen in der Umgebung bestellen Lebensmittel und Backwaren online.',
        correctQuadrant: 'chancen',
        explanation: 'Ein Trend im Marktumfeld, den das Unternehmen nutzen könnte.',
      },
      {
        id: 'sw6',
        label: 'Die Stadt fördert lokale Betriebe, die auf nachhaltige Lieferdienste umstellen.',
        correctQuadrant: 'chancen',
        explanation: 'Eine externe Rahmenbedingung, die zusätzlich unterstützt.',
      },
      {
        id: 'sw7',
        label: 'Ein großer Lieferdienst-Konzern plant, in der Region eigene Backwaren anzubieten.',
        correctQuadrant: 'risiken',
        explanation: 'Eine externe Bedrohung durch einen neuen, finanzstarken Wettbewerber.',
      },
      {
        id: 'sw8',
        label: 'Steigende Mehl- und Energiepreise könnten die Margen der ganzen Branche belasten.',
        correctQuadrant: 'risiken',
        explanation: 'Eine externe wirtschaftliche Entwicklung außerhalb der eigenen Kontrolle.',
      },
    ],
  },
  {
    id: 'tuckman-teamentwicklung',
    title: 'Teamentwicklung nach Tuckman',
    difficulty: 'fortgeschritten',
    scenario: 'Ein neu zusammengestelltes Projektteam durchläuft im Laufe der Zusammenarbeit typische Entwicklungsphasen.',
    instructions: 'Ordne jede Beobachtung der passenden Tuckman-Phase zu.',
    columns: '1fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    areas: ['forming storming norming performing adjourning'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'forming', area: 'forming', title: 'Forming', hint: 'Orientierung' },
      { id: 'storming', area: 'storming', title: 'Storming', hint: 'Konflikt' },
      { id: 'norming', area: 'norming', title: 'Norming', hint: 'Regelfindung' },
      { id: 'performing', area: 'performing', title: 'Performing', hint: 'Leistung' },
      { id: 'adjourning', area: 'adjourning', title: 'Adjourning', hint: 'Auflösung' },
    ],
    items: [
      {
        id: 'form1',
        label: 'Die Teammitglieder sind noch unsicher, höflich und zurückhaltend zueinander.',
        correctQuadrant: 'forming',
        explanation: 'Forming: Orientierungsphase — Rollen und Ziele sind noch unklar, man tastet sich vorsichtig ab.',
      },
      {
        id: 'form2',
        label: 'Rollen und Zuständigkeiten im Team sind noch völlig offen.',
        correctQuadrant: 'forming',
        explanation: 'Forming: Das Team sucht noch nach Struktur und gegenseitigem Kennenlernen.',
      },
      {
        id: 'storm1',
        label: 'Erste Konflikte um Rollen, Kompetenzen und Vorgehen brechen offen auf.',
        correctQuadrant: 'storming',
        explanation: 'Storming: Machtkämpfe und Meinungsverschiedenheiten sind typisch für diese Phase.',
      },
      {
        id: 'storm2',
        label: 'Einzelne Teammitglieder konkurrieren offen um Einfluss und Anerkennung.',
        correctQuadrant: 'storming',
        explanation: 'Storming: Konkurrenz um Positionen prägt die Zusammenarbeit noch stark.',
      },
      {
        id: 'norm1',
        label: 'Regeln und Rollen werden akzeptiert, ein gemeinsamer Konsens entsteht.',
        correctQuadrant: 'norming',
        explanation: 'Norming: Das Team einigt sich auf gemeinsame Normen und Arbeitsweisen.',
      },
      {
        id: 'norm2',
        label: 'Der Zusammenhalt wächst, Kritik wird zunehmend konstruktiv geäußert.',
        correctQuadrant: 'norming',
        explanation: 'Norming: Vertrauen und Kooperationsbereitschaft nehmen spürbar zu.',
      },
      {
        id: 'perf1',
        label: 'Das Team arbeitet eigenständig, effizient und lösungsorientiert an der Aufgabe.',
        correctQuadrant: 'performing',
        explanation: 'Performing: Die Energie fließt fast vollständig in die eigentliche Aufgabe statt in Beziehungsklärung.',
      },
      {
        id: 'perf2',
        label: 'Entscheidungen werden schnell und ohne große Reibungsverluste getroffen.',
        correctQuadrant: 'performing',
        explanation: 'Performing: Das Team hat sein höchstes Leistungsniveau erreicht.',
      },
      {
        id: 'adj1',
        label: 'Das Team löst sich nach Projektende auf, Ergebnisse werden gemeinsam reflektiert.',
        correctQuadrant: 'adjourning',
        explanation: 'Adjourning: Abschluss und Rückblick auf die gemeinsame Zusammenarbeit.',
      },
      {
        id: 'adj2',
        label: 'Abschied und Wertschätzung der gemeinsamen Zusammenarbeit stehen im Vordergrund.',
        correctQuadrant: 'adjourning',
        explanation: 'Adjourning: Das Team würdigt die geleistete Arbeit, bevor es sich auflöst.',
      },
    ],
  },
  {
    id: 'chancen-risiken-teamarbeit',
    title: 'Chancen & Risiken der Teamarbeit',
    difficulty: 'fortgeschritten',
    scenario: 'Ihr Unternehmen überlegt, künftig mehr Aufgaben in festen Teams statt einzeln bearbeiten zu lassen.',
    instructions: 'Sortiere die folgenden Effekte danach, ob sie eine Chance oder ein Risiko der Teamarbeit darstellen.',
    columns: '1fr 1fr',
    rows: '1fr',
    areas: ['chance risiko'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'chance', area: 'chance', title: 'Chance', hint: 'spricht für Teamarbeit' },
      { id: 'risiko', area: 'risiko', title: 'Risiko', hint: 'spricht gegen Teamarbeit' },
    ],
    items: [
      {
        id: 'synergie',
        label: 'Synergieeffekte: "Das Ganze ist mehr als die Summe seiner Teile."',
        correctQuadrant: 'chance',
        explanation: 'Durch Kombination unterschiedlicher Kompetenzen entsteht mehr, als Einzelne leisten könnten.',
      },
      {
        id: 'innovation',
        label: 'Erhöhte Innovationskraft durch gesteigerte Kreativität im Team.',
        correctQuadrant: 'chance',
        explanation: 'Unterschiedliche Perspektiven im Team fördern neue Ideen.',
      },
      {
        id: 'entscheidung',
        label: 'Höhere Entscheidungsqualität und -akzeptanz durch gemeinsame Beratung.',
        correctQuadrant: 'chance',
        explanation: 'Mehr Perspektiven verbessern die Entscheidungsgrundlage und die Akzeptanz im Team.',
      },
      {
        id: 'motivation',
        label: 'Steigerung von Motivation und Zufriedenheit der Mitarbeitenden.',
        correctQuadrant: 'chance',
        explanation: 'Soziale Einbindung und gemeinsame Erfolge wirken sich positiv auf die Zufriedenheit aus.',
      },
      {
        id: 'wissenstransfer',
        label: 'Wissenstransfer und Flexibilität durch kontinuierliches Peer-Learning.',
        correctQuadrant: 'chance',
        explanation: 'Teammitglieder lernen voneinander und können sich gegenseitig vertreten.',
      },
      {
        id: 'socialloafing',
        label: 'Leistungsverluste durch Social Loafing — Einzelne reduzieren unbewusst ihre Anstrengung.',
        correctQuadrant: 'risiko',
        explanation: 'In Gruppen sinkt oft die individuell wahrgenommene Verantwortung für das Ergebnis.',
      },
      {
        id: 'koordination',
        label: 'Hoher Koordinationsaufwand durch Abstimmung und "Process Losses".',
        correctQuadrant: 'risiko',
        explanation: 'Abstimmungsprozesse zwischen mehreren Personen kosten zusätzliche Zeit und Energie.',
      },
      {
        id: 'groupthink',
        label: 'Gefahr von "Groupthink" — Kritik und Widerspruch werden vermieden.',
        correctQuadrant: 'risiko',
        explanation: 'Der Wunsch nach Harmonie im Team kann kritisches Hinterfragen unterdrücken.',
      },
      {
        id: 'konfliktpotenzial',
        label: 'Destruktives Konfliktpotenzial durch Rollenkonflikte im Team.',
        correctQuadrant: 'risiko',
        explanation: 'Unklare Rollen und Zuständigkeiten können zu andauernden Spannungen führen.',
      },
      {
        id: 'verantwortungsdiffusion',
        label: 'Verantwortungsdiffusion durch reduzierte Eigenverantwortung Einzelner.',
        correctQuadrant: 'risiko',
        explanation: 'Wenn viele verantwortlich sind, fühlt sich am Ende oft niemand richtig zuständig.',
      },
    ],
  },
  {
    id: 'five-forces-flugbranche',
    title: 'Five-Forces anwenden: Die Flugbranche',
    difficulty: 'fortgeschritten',
    scenario:
      'Die Fluglinienbranche ist durch geringe Renditen und starken Wettbewerb zwischen etablierten Hochkosten- ' +
      'Airlines und neuen Billigfluglinien gekennzeichnet.',
    instructions: 'Ordne jede Beobachtung der passenden Five-Forces-Kraft zu.',
    columns: '1fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    areas: ['wettbewerb neu kunden lieferanten substitute'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'wettbewerb', area: 'wettbewerb', title: 'Wettbewerber', hint: 'Branchenwettbewerb' },
      { id: 'neu', area: 'neu', title: 'Neue Wettbewerber', hint: 'Markteintritt' },
      { id: 'kunden', area: 'kunden', title: 'Kunden', hint: 'Käufermacht' },
      { id: 'lieferanten', area: 'lieferanten', title: 'Lieferanten', hint: 'Lieferantenmacht' },
      { id: 'substitute', area: 'substitute', title: 'Substitute', hint: 'Ersatzangebote' },
    ],
    items: [
      {
        id: 'flug1',
        label: 'Etablierte Airlines konkurrieren stark über Sicherheit, Service und Vielflieger-Programme.',
        correctQuadrant: 'wettbewerb',
        explanation: 'Direkte Rivalität zwischen bereits in der Branche aktiven Fluggesellschaften.',
      },
      {
        id: 'flug2',
        label: 'Billigflieger und Hochkosten-Airlines liefern sich einen intensiven Preiskampf.',
        correctQuadrant: 'wettbewerb',
        explanation: 'Auch der Wettbewerb zwischen unterschiedlichen Strategietypen zählt zum Branchenwettbewerb.',
      },
      {
        id: 'flug3',
        label: 'Eine neue Billigfluglinie könnte mit sehr niedrigen Einstiegspreisen in den Markt drängen.',
        correctQuadrant: 'neu',
        explanation: 'Die Gefahr durch neue Marktteilnehmer hängt von den Eintrittsbarrieren der Branche ab.',
      },
      {
        id: 'flug4',
        label: 'Hohe Kosten für Flugzeugflotte, Landerechte und IT-Systeme erschweren den Markteintritt.',
        correctQuadrant: 'neu',
        explanation: 'Hohe Eintrittsbarrieren senken die Bedrohung durch neue Wettbewerber.',
      },
      {
        id: 'flug5',
        label: 'Freizeitkunden achten hauptsächlich auf den günstigsten Preis und wechseln leicht den Anbieter.',
        correctQuadrant: 'kunden',
        explanation: 'Geringe Wechselkosten und Preissensibilität stärken die Verhandlungsmacht der Kunden.',
      },
      {
        id: 'flug6',
        label: 'Geschäftskunden sind weniger preissensibel und legen mehr Wert auf Flexibilität und Komfort.',
        correctQuadrant: 'kunden',
        explanation: 'Unterschiedliche Kundengruppen haben unterschiedlich starke Verhandlungsmacht.',
      },
      {
        id: 'flug7',
        label: 'Fluggesellschaften benötigen große Mengen an Kerosin und sind von wenigen Öllieferanten abhängig.',
        correctQuadrant: 'lieferanten',
        explanation: 'Wenige, wichtige Lieferanten für einen zentralen Rohstoff stärken deren Verhandlungsmacht.',
      },
      {
        id: 'flug8',
        label: 'Nur zwei große Flugzeughersteller (Boeing, Airbus) beliefern nahezu den gesamten Weltmarkt.',
        correctQuadrant: 'lieferanten',
        explanation: 'Ein stark konzentrierter Anbietermarkt erhöht die Lieferantenmacht deutlich.',
      },
      {
        id: 'flug9',
        label: 'Bahn- oder Fernbusverbindungen könnten auf innereuropäischen Kurzstrecken eine günstigere Alternative sein.',
        correctQuadrant: 'substitute',
        explanation: 'Alternative Verkehrsmittel gefährden bei kurzen Distanzen den Nutzen des Fliegens.',
      },
      {
        id: 'flug10',
        label: 'Videokonferenzen ersetzen zunehmend Geschäftsreisen, die früher per Flugzeug stattfanden.',
        correctQuadrant: 'substitute',
        explanation: 'Digitale Alternativen können ganze Reiseanlässe überflüssig machen.',
      },
    ],
  },
  {
    id: 'bcg-anwenden',
    title: 'BCG-Portfolio anwenden: Freizeit GmbH',
    difficulty: 'profi',
    scenario:
      'Die "Freizeit GmbH" betreibt mehrere Geschäftsfelder rund um Freizeitaktivitäten am Stadtsee. Für jedes ' +
      'Geschäftsfeld liegen Angaben zu Marktwachstum und eigenem Marktanteil vor.',
    instructions: 'Ordne jedes Geschäftsfeld dem passenden BCG-Feld zu.',
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['tl tr', 'bl br'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'tl', area: 'tl', title: 'Stars', hint: 'Wachstum hoch, Anteil hoch' },
      { id: 'tr', area: 'tr', title: 'Question Marks', hint: 'Wachstum hoch, Anteil niedrig' },
      { id: 'bl', area: 'bl', title: 'Cash Cows', hint: 'Wachstum niedrig, Anteil hoch' },
      { id: 'br', area: 'br', title: 'Poor Dogs', hint: 'Wachstum niedrig, Anteil niedrig' },
    ],
    items: [
      {
        id: 'bcga1',
        label: 'E-Bike-Vermietung: Boommarkt E-Mobilität, das Unternehmen ist hier bereits die klare Nummer 1.',
        correctQuadrant: 'tl',
        explanation: 'Hohes Marktwachstum + hoher Marktanteil = Star. Weiter investieren, um die Position zu halten.',
      },
      {
        id: 'bcga2',
        label: 'Stand-up-Paddle-Verleih: stark wachsende Nachfrage, aber viele neue Konkurrenten mit größerem Marktanteil.',
        correctQuadrant: 'tr',
        explanation: 'Hohes Marktwachstum, aber geringer eigener Anteil = Question Mark. Entscheidung nötig: investieren oder aufgeben.',
      },
      {
        id: 'bcga3',
        label: 'Klassische Fahrradreparatur: Markt wächst kaum noch, das Unternehmen ist hier aber seit Jahrzehnten Marktführer.',
        correctQuadrant: 'bl',
        explanation: 'Niedriges Wachstum + hoher Marktanteil = Cash Cow. Finanziert andere Geschäftsfelder.',
      },
      {
        id: 'bcga4',
        label: 'Tretboot-Verleih am Stadtsee: Nachfrage sinkt seit Jahren, das Unternehmen hat nur einen kleinen Anteil.',
        correctQuadrant: 'br',
        explanation: 'Niedriges Wachstum + niedriger Marktanteil = Poor Dog. Kandidat für Desinvestition.',
      },
      {
        id: 'bcga5',
        label: 'Indoor-Kletterhalle: expandierender Trendsport, das Unternehmen betreibt bereits die größte Halle der Region.',
        correctQuadrant: 'tl',
        explanation: 'Hohes Wachstum + hoher Marktanteil = ebenfalls ein Star.',
      },
      {
        id: 'bcga6',
        label: 'Escape-Room-Anbieter: beliebter, wachsender Markt, aber das Unternehmen ist erst seit Kurzem dabei mit wenig Anteil.',
        correctQuadrant: 'tr',
        explanation: 'Wachstumsmarkt mit noch kleinem eigenen Anteil = Question Mark.',
      },
      {
        id: 'bcga7',
        label: 'Minigolfanlage: gesättigter, kaum noch wachsender Markt, aber seit Jahren die etablierte Nummer 1 vor Ort.',
        correctQuadrant: 'bl',
        explanation: 'Reifer Markt mit hohem eigenem Anteil = Cash Cow.',
      },
      {
        id: 'bcga8',
        label: 'Videothek für Filmklassiker: stark rückläufiger Markt, das Unternehmen hat hier nur wenige Stammkunden.',
        correctQuadrant: 'br',
        explanation: 'Schrumpfender Markt + kleiner Anteil = Poor Dog.',
      },
    ],
  },
  {
    id: 'reifegrad-anwenden',
    title: 'Reifegradmodell anwenden',
    difficulty: 'profi',
    scenario: 'Als Führungskraft treffen Sie auf Mitarbeitende mit ganz unterschiedlichem Reifegrad bezüglich derselben Aufgabe.',
    instructions: 'Ordne jede Mitarbeiterbeschreibung dem passenden Führungsstil nach Hersey/Blanchard zu.',
    columns: '1fr 1fr 1fr 1fr',
    rows: '1fr',
    areas: ['telling selling participating delegating'],
    accent: 'var(--strategy)',
    quadrants: [
      { id: 'telling', area: 'telling', title: 'Telling (S1)', hint: 'M1: kann/will nicht' },
      { id: 'selling', area: 'selling', title: 'Selling (S2)', hint: 'M2: will, kann noch nicht' },
      { id: 'participating', area: 'participating', title: 'Participating (S3)', hint: 'M3: kann, will unsicher' },
      { id: 'delegating', area: 'delegating', title: 'Delegating (S4)', hint: 'M4: kann und will' },
    ],
    items: [
      {
        id: 'reif1',
        label: 'Ein neuer Auszubildender kennt die Abläufe noch nicht und ist unsicher, ob er die Aufgabe überhaupt schafft.',
        correctQuadrant: 'telling',
        explanation: 'Reifegrad M1: weder Können noch Wollen ausgeprägt — klare Anweisungen und enge Kontrolle sind nötig.',
      },
      {
        id: 'reif2',
        label: 'Ein Praktikant hat noch kaum Erfahrung, ist aber hoch motiviert und will sich unbedingt beweisen.',
        correctQuadrant: 'selling',
        explanation: 'Reifegrad M2: hohe Motivation, aber noch fachliche Lücken — die Führungskraft erklärt und unterstützt.',
      },
      {
        id: 'reif3',
        label: 'Eine erfahrene Mitarbeiterin kann die Aufgabe fachlich gut, traut sich aber nicht recht zu, allein zu entscheiden.',
        correctQuadrant: 'participating',
        explanation: 'Reifegrad M3: Können ist da, aber Unsicherheit bremst — gemeinsames Entscheiden und Ermutigung helfen.',
      },
      {
        id: 'reif4',
        label: 'Ein langjähriger Experte erledigt diese Aufgabe seit Jahren zuverlässig und völlig selbstständig.',
        correctQuadrant: 'delegating',
        explanation: 'Reifegrad M4: kann und will — Verantwortung wird vollständig übergeben.',
      },
      {
        id: 'reif5',
        label: 'Ein Mitarbeiter hat wiederholt Fehler gemacht und wirkt inzwischen völlig demotiviert für diese Aufgabe.',
        correctQuadrant: 'telling',
        explanation: 'Geringes Können und geringe Motivation entsprechen wieder M1 — klare Struktur schafft Sicherheit.',
      },
      {
        id: 'reif6',
        label: 'Eine neue Kollegin brennt für die Aufgabe, hat aber noch keinerlei praktische Erfahrung damit gesammelt.',
        correctQuadrant: 'selling',
        explanation: 'Hohe Motivation bei noch fehlender Erfahrung entspricht M2.',
      },
      {
        id: 'reif7',
        label: 'Ein Teammitglied beherrscht die Aufgabe technisch einwandfrei, zögert aber, eigenständig Entscheidungen zu treffen.',
        correctQuadrant: 'participating',
        explanation: 'Fachliches Können bei geringem Selbstvertrauen entspricht M3.',
      },
      {
        id: 'reif8',
        label: 'Eine Senior-Mitarbeiterin optimiert den Prozess sogar eigenständig und schult neue Kollegen darin ein.',
        correctQuadrant: 'delegating',
        explanation: 'Höchstes Können und höchste Eigenmotivation entsprechen M4.',
      },
    ],
  },
];

export const TERM_MATCH_SETS: TermMatchSet[] = [
  {
    id: 'fuehrungseffizienz',
    title: 'Führungseffizienz',
    difficulty: 'anfaenger',
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
    difficulty: 'anfaenger',
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
  {
    id: 'smart-ziele',
    title: 'SMART-Ziele',
    difficulty: 'anfaenger',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'sm1',
        before: 'Ziele sollten nach dem SMART-Prinzip formuliert werden: Sie sind ',
        correctTermId: 'spezifisch',
      },
      {
        id: 'sm2',
        before: ' (klar und eindeutig formuliert), ',
        correctTermId: 'messbar',
      },
      {
        id: 'sm3',
        before: ' (durch Kennzahlen überprüfbar), ',
        correctTermId: 'attraktiv',
      },
      {
        id: 'sm4',
        before: ' (herausfordernd, aber motivierend), ',
        correctTermId: 'realistisch',
      },
      {
        id: 'sm5',
        before: ' (unter den gegebenen Bedingungen erreichbar) sowie ',
        correctTermId: 'terminiert',
      },
    ],
    tail: ' (mit einem klaren Termin versehen).',
    terms: [
      { id: 'spezifisch', text: 'spezifisch' },
      { id: 'messbar', text: 'messbar' },
      { id: 'attraktiv', text: 'attraktiv' },
      { id: 'realistisch', text: 'realistisch' },
      { id: 'terminiert', text: 'terminiert' },
    ],
    distractors: [
      { id: 'flexibel', text: 'flexibel' },
      { id: 'delegierbar', text: 'delegierbar' },
    ],
  },
  {
    id: 'vier-seiten-nachricht',
    title: 'Vier-Seiten-einer-Nachricht',
    difficulty: 'fortgeschritten',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'v1',
        before: 'Nach Schulz von Thun enthält jede Nachricht vier Seiten. Die ',
        correctTermId: 'sachinfo',
      },
      {
        id: 'v2',
        before: ' informiert sachlich über einen Sachverhalt. Die ',
        correctTermId: 'selbstkundgabe',
      },
      {
        id: 'v3',
        before: ' gibt Auskunft darüber, was der Sender von sich selbst preisgibt. Der ',
        correctTermId: 'beziehungshinweis',
      },
      {
        id: 'v4',
        before: ' zeigt, wie Sender und Empfänger zueinander stehen. Der ',
        correctTermId: 'appell',
      },
    ],
    tail: ' drückt aus, wozu der Sender den Empfänger veranlassen möchte.',
    terms: [
      { id: 'sachinfo', text: 'Sachinformation' },
      { id: 'selbstkundgabe', text: 'Selbstkundgabe' },
      { id: 'beziehungshinweis', text: 'Beziehungshinweis' },
      { id: 'appell', text: 'Appell' },
    ],
    distractors: [
      { id: 'feedback', text: 'Feedback' },
      { id: 'ichbotschaft', text: 'Ich-Botschaft' },
    ],
  },
  {
    id: 'eisbergmodell',
    title: 'Eisbergmodell',
    difficulty: 'fortgeschritten',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'e1',
        before:
          'Das Eisbergmodell geht davon aus, dass eine sichtbare Kommunikationsstörung nur die Spitze eines Eisbergs ist. Über der Wasseroberfläche, auf der ',
        correctTermId: 'sichtbar',
      },
      {
        id: 'e2',
        before:
          ' Ebene, liegen Themen, Ziele, Termine und Rollen. Darunter, auf der ',
        correctTermId: 'unsichtbar',
      },
    ],
    tail: ' Ebene, verbergen sich Gefühle, Ängste, Werte und Konflikte — sie beeinflussen die Kommunikation, ohne offen ausgesprochen zu werden.',
    terms: [
      { id: 'sichtbar', text: 'sichtbaren' },
      { id: 'unsichtbar', text: 'unsichtbaren' },
    ],
    distractors: [
      { id: 'emotional', text: 'emotionalen' },
      { id: 'rational', text: 'rationalen' },
    ],
  },
  {
    id: 'harvard-konzept',
    title: 'Harvard-Konzept',
    difficulty: 'profi',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'h1',
        before:
          'Das Harvard-Konzept nach Fisher/Ury (1991) beschreibt eine sachbezogene Verhandlungsführung nach vier Prinzipien: Erstens sollten ',
        correctTermId: 'menschen-probleme',
      },
      {
        id: 'h2',
        before: ' voneinander getrennt behandelt werden. Zweitens sollte man sich auf ',
        correctTermId: 'interessen',
      },
      {
        id: 'h3',
        before: ' konzentrieren statt auf starre Positionen. Drittens sollten ',
        correctTermId: 'entscheidungsoptionen',
      },
      {
        id: 'h4',
        before: ' zum beiderseitigen Vorteil entwickelt werden. Viertens sollten ',
        correctTermId: 'objektive-kriterien',
      },
    ],
    tail: ' zur Bewertung der Ergebnisse herangezogen werden.',
    terms: [
      { id: 'menschen-probleme', text: 'Menschen und Probleme' },
      { id: 'interessen', text: 'Interessen' },
      { id: 'entscheidungsoptionen', text: 'Entscheidungsoptionen' },
      { id: 'objektive-kriterien', text: 'objektive Kriterien' },
    ],
    distractors: [
      { id: 'emotionen-fakten', text: 'Emotionen und Fakten' },
      { id: 'positionen', text: 'Positionen' },
    ],
  },
  {
    id: 'glasl-konfliktdynamik',
    title: 'Konfliktdynamik nach Glasl',
    difficulty: 'profi',
    intro: 'Ziehe die passenden Fachbegriffe in die Lücken.',
    accent: 'var(--strategy)',
    blanks: [
      {
        id: 'g1',
        before:
          'Nach Glasl eskalieren Konflikte in drei Phasen. Auf einem moderaten Konfliktniveau helfen meist noch ',
        correctTermId: 'gespraeche',
      },
      {
        id: 'g2',
        before: '. Reicht das nicht mehr aus, wird häufig eine ',
        correctTermId: 'moderation',
      },
      {
        id: 'g3',
        before: ' notwendig. Ist die Eskalation am weitesten fortgeschritten, kommt es schließlich zum offenen ',
        correctTermId: 'machteingriff',
      },
    ],
    tail: ', bei dem keine Seite mehr auf eine gemeinsame Lösung setzt.',
    terms: [
      { id: 'gespraeche', text: 'Gespräche' },
      { id: 'moderation', text: 'externe Moderation' },
      { id: 'machteingriff', text: 'Machteingriff' },
    ],
    distractors: [
      { id: 'abmahnung', text: 'Abmahnung' },
      { id: 'betriebsrat', text: 'Betriebsrat' },
    ],
  },
];
