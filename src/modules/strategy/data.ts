import type { CaseStudy, DiagramDef, TermMatchSet } from './types';

// ============================================================
// STRATEGIE & FÜHRUNG — Inhalte
// Basierend auf den Klausurvorbereitungs-Unterlagen: Situatives
// Führungsmodell (Hersey/Blanchard), Five-Forces, SWOT und die drei
// generischen Strategien nach Porter, Johari-Fenster, Werte- und
// Entwicklungsquadrat (Schulz von Thun), Vier-Seiten-Modell,
// Eisbergmodell, SMART-Ziele, Tuckman-Teamentwicklung sowie Chancen/
// Risiken der Teamarbeit. Die BCG-Matrix ergänzt das Standard-
// Portfolio-Modell, das im Quellenmaterial nur referenziert wird.
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
  {
    id: 'johari-fenster',
    title: 'Johari-Fenster',
    subtitle: 'Selbst- und Fremdbild als Grundlage für Feedback',
    intro:
      'Das Johari-Fenster zeigt, wie sich Selbst- und Fremdwahrnehmung überschneiden — die Basis für gutes ' +
      'Feedback in der Führungsarbeit. Ordne zuerst die beiden Achsen zu, danach die vier Felder.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis tl tr', 'yaxis bl br', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
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
    intro:
      'Jede positive Eigenschaft hat eine wertvolle "Schwestertugend" — wird sie ohne diese übertrieben, kippt ' +
      'sie ins Negative. Ordne die vier Begriffe den richtigen Feldern zu (oben = positiver Kern, unten = Übertreibung).',
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['wert kritik', 'schmeichel herab'],
    accent: 'var(--strategy)',
    axisTerms: [],
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
    intro:
      'Porter unterscheidet Geschäftsstrategien nach strategischer Ausrichtung (Gesamt- oder Teilmarkt) und ' +
      'strategischem Vorteil (Einzigartigkeit oder Kostenminimum). Ordne zuerst die Achsen, dann die drei Strategien zu.',
    columns: '64px 1fr 1fr',
    rows: '1fr 1fr 64px',
    areas: ['yaxis diff kf', 'yaxis konz konz', '.     xaxis xaxis'],
    accent: 'var(--strategy)',
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
    id: 'tuckman-teamentwicklung',
    title: 'Teamentwicklung nach Tuckman',
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
  {
    id: 'vier-seiten-nachricht',
    title: 'Vier-Seiten-einer-Nachricht',
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
    id: 'smart-ziele',
    title: 'SMART-Ziele',
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
];
