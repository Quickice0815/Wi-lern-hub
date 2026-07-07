// ============================================================
// DATEN — direkt portiert aus ArticleData.swift, SummaryData.swift
// und WorkedExampleData.swift. Inhalte 1:1 übernommen (keine
// Kürzungen), nur die Struktur an TypeScript angepasst.
// ============================================================

export interface Question {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  hasWorked: boolean;
  workedKey: string | null;
  questions: Question[];
}

// Farben — Pendant zu Theme.entity/relation/attribute/pk plus die
// beiden Sonderfarben Color(hex: "9333ea") und Color(hex: "dc2626")
// aus dem Swift-Quelltext.
export const COLORS = {
  entity: 'var(--entity)',
  relation: 'var(--relation)',
  attribute: 'var(--attribute)',
  pk: 'var(--pk)',
  good: 'var(--good)',
  bad: 'var(--bad)',
  warn: 'var(--warn)',
  purple: '#9333ea',
  red: '#dc2626',
} as const;

export const Articles: Article[] = [
  {
    id: 'multidim',
    title: 'Multidimensionale Datenanalyse',
    subtitle: 'Operative Daten, Kennzahlen, Skalenniveaus & Dimensionen',
    tag: 'Datenanalyse',
    color: COLORS.entity,
    hasWorked: true,
    workedKey: 'skalen',
    questions: [
      {
        q: 'Was sind operative Daten?',
        options: [
          'Strategische Zielvorgaben des Managements',
          'Daten, die beim Geschäftsbetrieb anfallen und meist strukturiert vorliegen',
          'Ausschließlich Finanzkennzahlen wie Umsatz und Gewinn',
          'Bereits zu Kennzahlen verdichtete Werte',
        ],
        correct: 1,
        explain:
          'Operative Daten fallen beim laufenden Geschäftsbetrieb an (z. B. in OLTP-Systemen) und liegen meist in strukturierter Form vor. Sie werden auch Rohdaten genannt.',
      },
      {
        q: 'Wofür steht die Abkürzung OLTP?',
        options: [
          'Online Transaction Processing',
          'Operational Time Planning',
          'Online Tactical Processing',
          'Output Level Transfer Protocol',
        ],
        correct: 0,
        explain:
          'OLTP = Online Transaction Processing. Diese Systeme wickeln Transaktionen ab, durch die der Zustand eines Objekts verändert wird.',
      },
      {
        q: 'Der Begriff „Analyse“ stammt aus dem Griechischen. Was bedeutet er?',
        options: ['Zusammenfügen', 'Berechnen', 'Zerlegen', 'Verdichten'],
        correct: 2,
        explain:
          '„análysis“ bedeutet „zerlegen“. Durch eine Analyse wird ein Ganzes in seine Bestandteile zerlegt. Bevor man zerlegen kann, müssen operative Daten aber erst zu Kennzahlen verdichtet werden.',
      },
      {
        q: 'Was ist eine Kennzahl?',
        options: [
          'Eine einzelne unveränderte Zeile aus der Datenbank',
          'Ein aggregierter quantitativer Wert, der komplexe betriebswirtschaftliche Beziehungen konzentriert darstellt',
          'Ein rein qualitatives Merkmal ohne Zahlenwert',
          'Ein Synonym für eine Datenbanktabelle',
        ],
        correct: 1,
        explain:
          'Eine Kennzahl ist ein aggregierter quantitativer Wert. Die Verdichtung erfolgt über mathematische Operationen wie Summe, Zählen, Mittelwert, Modus.',
      },
      {
        q: 'Welche Verdichtungsoperation ist bei NOMINAL skalierten Daten zulässig?',
        options: ['Mittelwert (Durchschnitt)', 'Median', 'Modus (häufigste Ausprägung)', 'Summe'],
        correct: 2,
        explain:
          'Nominaldaten kennen keine Rangordnung. Erlaubt ist nur der Modus (häufigste Ausprägung durch Zählen). Beispiel: Vertriebsart AUART (SO/TA/KM).',
      },
      {
        q: 'Welches Skalenniveau erlaubt den Median, aber KEINE Durchschnittsbildung?',
        options: ['Nominalskala', 'Ordinalskala', 'Kardinalskala', 'Alle drei'],
        correct: 1,
        explain:
          'Ordinaldaten haben eine Rangordnung, aber ungleiche Abstände. Daher ist der Median möglich, eine Durchschnittsbildung jedoch nicht. Beispiel: Profitabilitätsstufe PRFS.',
      },
      {
        q: 'Bei welchem Skalenniveau sind ALLE mathematischen Verdichtungen (Summe, Durchschnitt …) erlaubt?',
        options: ['Nominalskala', 'Ordinalskala', 'Kardinalskala', 'Keinem'],
        correct: 2,
        explain:
          'Kardinalskalierte Daten lassen sich hierarchisieren UND die Abstände zwischen den Werten sind gleich. Beispiel: Nettowert NETWR.',
      },
      {
        q: 'Eine Dimension ist …',
        options: [
          'dasselbe wie ein Attribut der operativen Daten',
          'eine Eigenschaft von Kennzahlen, die funktional von Attributen der operativen Daten abhängt',
          'immer nur die Zeit',
          'eine Datenbanktabelle',
        ],
        correct: 1,
        explain:
          'Eine Dimension ist eine Eigenschaft von Kennzahlen und funktional abhängig von Attributen der operativen Daten. Dimensionen spannen den Informationsraum auf, in dem die Analyse stattfindet.',
      },
      {
        q: 'Welche drei Erfassbarkeits-Dimensionen werden in der BWL unterschieden?',
        options: [
          'Länge, Höhe, Breite',
          'zeitlich (temporal), räumlich (lokal), sachlich (kausal)',
          'Vergangenheit, Gegenwart, Zukunft',
          'Nominal, ordinal, kardinal',
        ],
        correct: 1,
        explain:
          'In der BWL werden zeitliche (temporale), räumliche (lokale) und sachliche (kausale) Dimensionen unterschieden, um Kennzahlen näher zu spezifizieren.',
      },
      {
        q: 'Wie viel Prozent aller Unternehmensdaten haben laut Artikel einen Raumbezug?',
        options: ['10 bis 20 %', '30 bis 50 %', '60 bis 80 %', 'über 95 %'],
        correct: 2,
        explain:
          'Zwischen 60 und 80 % aller Daten im Unternehmen haben einen Raumbezug (z. B. Kundenwohnorte, Standorte, Vertriebsgebiete).',
      },
      {
        q: 'Worin unterscheiden sich sachliche Dimensionen von zeitlichen und räumlichen?',
        options: [
          'Sie sind für alle Unternehmen gleich',
          'Sie sind in ihren Erscheinungsformen unendlich und unternehmensspezifisch',
          'Sie haben keinen Bezug zu Kennzahlen',
          'Sie sind immer nominal skaliert',
        ],
        correct: 1,
        explain:
          'Zeit und Raum sind klar abgegrenzt und für alle Unternehmen gleich. Sachliche Dimensionen dagegen sind unendlich vielfältig und unternehmensspezifisch.',
      },
      {
        q: 'Eine zweidimensionale Analyse beantwortet …',
        options: [
          'nur eine einzelne Frage isoliert',
          'zwei Fragen zeitgleich (z. B. per Pivot-Tabelle), z. B. Umsatz nach Mitarbeiter UND Auftragsart',
          'gar keine Frage',
          'ausschließlich zeitbezogene Fragen',
        ],
        correct: 1,
        explain:
          'Bei der zweidimensionalen Analyse werden zwei Fragen zeitgleich beantwortet — typischerweise mit einer Pivot-Tabelle, die zwei Dimensionen auf Zeilen und Spalten legt.',
      },
      {
        q: 'Die Dimension „Zeit“ lässt sich hierarchisieren. Welche Reihenfolge stimmt?',
        options: [
          'Jahr → Quartal → Monat → Woche → Tag',
          'Tag → Woche → Monat → Quartal → Jahr',
          'Monat → Tag → Jahr → Woche',
          'Woche → Tag → Quartal → Monat',
        ],
        correct: 1,
        explain:
          'Die hierarchische Ordnung verläuft von fein zu grob: Tag → Woche → Monat → Quartal → Jahr. Der Wertebereich einer Ebene heißt Domäne.',
      },
    ],
  },
  {
    id: 'fussball',
    title: 'Multidimensionale Datenanalyse im Fußball',
    subtitle: 'Fallstudie: Opta-Daten, Stamm-/Bewegungsdaten & Passquote',
    tag: 'Fallstudie',
    color: COLORS.attribute,
    hasWorked: false,
    workedKey: null,
    questions: [
      {
        q: 'Warum sollen Fußballspieler laut Fallstudie systematisch bewertet werden?',
        options: [
          'Wegen der enormen Ablösesummen und hohen Investitionen bei Transfers',
          'Weil Statistiken im Sport verboten sind',
          'Um Eintrittspreise zu berechnen',
          'Ausschließlich zur Trainingsplanung',
        ],
        correct: 0,
        explain:
          'Angesichts enormer Ablösesummen (z. B. Ronaldo für 94 Mio. €) müssen Spieler wie Investitionen in einem Unternehmen vom Controlling analysiert werden.',
      },
      {
        q: 'Welcher externe Dienstleister erfasst im Fall die operativen Fußballdaten?',
        options: ['FIFA', 'Opta', 'UEFA', 'Transfermarkt'],
        correct: 1,
        explain:
          'Die operativen Daten werden vom externen Dienstleister Opta erfasst, der pro Spiel mehrere Mitarbeiter einsetzt und bis zu 200 verschiedene Aktivitäten zuordnet.',
      },
      {
        q: 'Was beschreiben Stammdaten im Fußball?',
        options: [
          'Ereignisse und Aktivitäten während des Spiels',
          'Zustände/sachliche Informationen, die längere Zeit unverändert bleiben (z. B. Spieler, Team, Position)',
          'Nur die erzielten Tore',
          'Die Wetterbedingungen',
        ],
        correct: 1,
        explain:
          'Stammdaten beschreiben Zustände und enthalten sachliche Informationen zu Objekten/Subjekten, die längere Zeit unverändert bleiben — z. B. der Spieler mit eindeutiger Player ID.',
      },
      {
        q: 'Was unterscheidet Bewegungsdaten von Stammdaten?',
        options: [
          'Sie ändern sich nie',
          'Sie dokumentieren Ereignisse/Aktivitäten und entstehen nach jedem Spiel',
          'Sie enthalten nur den Spielernamen',
          'Sie sind identisch mit Stammdaten',
        ],
        correct: 1,
        explain:
          'Bewegungsdaten dokumentieren Ereignisse (Aktivitäten der Stammdaten) und entstehen neu nach jedem Spiel, z. B. einzelne Pässe mit Distanz, Tempo, Zielzone.',
      },
      {
        q: 'Wie wird die Kennzahl „Passquote“ grundsätzlich berechnet?',
        options: [
          'Erfolgreiche Pässe geteilt durch gespielte Pässe × 100',
          'Anzahl Tore geteilt durch Anzahl Spiele',
          'Gelaufene Kilometer mal Tempo',
          'Zweikämpfe geteilt durch Pässe',
        ],
        correct: 0,
        explain: 'Passquote = (erfolgreiche Pässe / gespielte Pässe) × 100. Im Beispiel: 4 von 5 Pässen erfolgreich = 80 %.',
      },
      {
        q: 'Das Problem eindimensionaler Kennzahlen wird am Beispiel von Toni Kroos erklärt. Worum geht es?',
        options: [
          'Seine Passquote von 95 % im Mittelfeld sagt allein wenig über die Qualität der Pässe aus',
          'Er hat keine Pässe gespielt',
          'Seine Tore wurden falsch gezählt',
          'Er wurde nie erfasst',
        ],
        correct: 0,
        explain:
          'Eine pauschale Passquote von 95 % ist eindimensional. Erst Dimensionen wie Richtung, Geschwindigkeit, Ort des Passes zeigen, ob es riskante, wertvolle Pässe waren.',
      },
      {
        q: 'Im Passquote-Würfel werden drei Dimensionen kombiniert. Welche?',
        options: [
          'Tore, Pässe, Zweikämpfe',
          'Entfernung des Passes, Geschwindigkeit, Ort des Passes',
          'Zeit, Spieler, Team',
          'Höhe, Breite, Tiefe des Spielfelds',
        ],
        correct: 1,
        explain:
          'Der Würfel verbindet die Passquote mit Entfernung des Passes, Geschwindigkeit und Ort des Passes — so entsteht ein dreidimensionales Datenmodell.',
      },
      {
        q: 'Wann ist laut Würfel-Beispiel ein Pass besonders wertvoll/riskant?',
        options: [
          'Kurz, langsam, im eigenen Drittel',
          'Lang (über 50 m), schnell (über 50 km/h), nah am gegnerischen Tor',
          'Wenn er nicht ankommt',
          'Wenn er rückwärts gespielt wird',
        ],
        correct: 1,
        explain:
          'Das dunkelgraue Würfelfeld (höchste Passquote) steht für lange, schnelle Pässe nah am Tor — die sind anspruchsvoll und wertvoll, im Gegensatz zu kurzen Pässen im Mittelfeld.',
      },
      {
        q: 'Was bewirkt das Hinzufügen der Dimension „Zeit“ zur Passquote?',
        options: [
          'Sie macht die Kennzahl unbrauchbar',
          'Aussagen zum Spielverlauf werden möglich (z. B. Passquote lässt mit Spieldauer nach → Ermüdung)',
          'Die Passquote verschwindet',
          'Sie ersetzt den Ort des Passes',
        ],
        correct: 1,
        explain:
          'Mit der Zeitdimension (z. B. 10-Minuten-Intervalle) lässt sich erkennen, dass die Passquote zum Spielende nachlässt — ein Indikator für Ermüdung.',
      },
      {
        q: 'Welche der folgenden ist eine typische EINDIMENSIONALE Kennzahl im Fußball?',
        options: [
          'Passquote nach Richtung, Ort und Zeit',
          'Zurückgelegte Kilometer in einem Spiel',
          'Der Passquote-Würfel',
          'Das vierdimensionale Datenmodell',
        ],
        correct: 1,
        explain:
          'Eindimensionale Kennzahlen sind z. B. gelaufene Kilometer, angekommene Pässe, gewonnene Zweikämpfe, erzielte Tore — sie können zu Fehlinterpretationen verleiten.',
      },
      {
        q: 'Das Fazit der Fallstudie sagt: Multidimensionale Datenanalyse …',
        options: [
          'ersetzt die endgültige Entscheidung vollständig',
          'ist nutzlos für kleine Vereine',
          'ersetzt die Entscheidung nicht, unterstützt sie aber; Gespräche mit Spielern bleiben nötig',
          'macht Scouts überflüssig',
        ],
        correct: 2,
        explain:
          'Die multidimensionale Analyse schafft einen Informationsvorsprung und hilft, unterbewertete Spieler zu finden — ersetzt die endgültige Entscheidung aber nicht.',
      },
    ],
  },
  {
    id: 'fabrik',
    title: 'Zwischen Daten und Maschinen in der Fabrik 4.0',
    subtitle: 'Industrielle Revolutionen, Tätigkeitsarten & Analytics',
    tag: 'Industrie 4.0',
    color: COLORS.relation,
    hasWorked: true,
    workedKey: 'taetigkeit',
    questions: [
      {
        q: 'Welche Erfindung kennzeichnet die 1. industrielle Revolution?',
        options: ['Die Elektrizität', 'Die Dampfmaschine (Mechanisierung)', 'Der Mikrochip', 'Das Internet'],
        correct: 1,
        explain:
          '1. Revolution = Mechanisierung durch die Dampfmaschine (18. Jhd.). Adam Smith beschrieb die Zerlegung des Produktionsprozesses in Arbeitsschritte.',
      },
      {
        q: 'Ordne richtig zu: Die 3. industrielle Revolution steht für …',
        options: [
          'Elektrifizierung durch Elektrizität',
          'Informatisierung durch Erfindung des Mikrochips',
          'Mechanisierung durch die Dampfmaschine',
          'Smartisierung durch Kombination der Technik',
        ],
        correct: 1,
        explain:
          '3. Revolution = Informatisierung durch den Mikrochip (20. Jhd.). Maschinen bekamen ein „digitales Gehirn“ und übernahmen exekutive Tätigkeiten.',
      },
      {
        q: 'Was ist der Kern der 4. industriellen Revolution?',
        options: [
          'Eine einzelne neue Erfindung',
          'Der intelligente, kombinierte und vernetzte Einsatz bestehender Techniken (Smartisierung)',
          'Die Rückkehr zur Handarbeit',
          'Die Abschaffung aller Maschinen',
        ],
        correct: 1,
        explain:
          'Industrie 4.0 beruht nicht auf einer singulären Erfindung, sondern auf der intelligenten Kombination und Vernetzung bestehender Techniken — der Smartisierung.',
      },
      {
        q: 'Was ist der WESENTLICHE Unterschied zwischen 3. und 4. Revolution?',
        options: [
          'In 4.0 hat nicht nur die Maschine, sondern auch das zu produzierende Stück ein „digitales Gedächtnis“',
          'In 4.0 gibt es keine Computer mehr',
          'In 3.0 produzieren Roboter autonom',
          'Es gibt keinen Unterschied',
        ],
        correct: 0,
        explain:
          'In der 4. Revolution administriert das Werkstück seine Produktion mit eigenem digitalem Gedächtnis selbst — die Produktion wird dezentral und selbststeuernd.',
      },
      {
        q: 'Welche vier Tätigkeitsarten nennt der Artikel — in der Reihenfolge steigender kognitiver Komplexität?',
        options: [
          'kreativ, dispositiv, administrativ, exekutiv',
          'exekutiv, administrativ, dispositiv, kreativ',
          'administrativ, exekutiv, kreativ, dispositiv',
          'dispositiv, kreativ, exekutiv, administrativ',
        ],
        correct: 1,
        explain:
          'Die kognitive Komplexität steigt: exekutiv → administrativ → dispositiv → kreativ. Exekutiv = körperlich/ausführend, kreativ = höchste geistige Stufe.',
      },
      {
        q: 'Exekutive Tätigkeiten sind z. B. …',
        options: [
          'Planung und Kreation',
          'Bohren, Stanzen, Schweißen (körperlich/ausführend)',
          'Überwachung und Kontrolle',
          'Entwicklung neuer Methoden',
        ],
        correct: 1,
        explain:
          'Exekutive (ausführende) Tätigkeiten werden durch Muskelkraft mit Werkzeugen am Objekt erledigt — Bohren, Stanzen, Schweißen.',
      },
      {
        q: 'Welche Tätigkeit übernahm der Mensch nach der Mechanisierung (frei gewordene Lücke)?',
        options: ['exekutive Tätigkeiten', 'administrative Tätigkeiten', 'gar keine', 'nur kreative'],
        correct: 1,
        explain:
          'Als die Maschinen die körperlichen (exekutiven) Aufgaben übernahmen, füllte der Mensch die Lücke mit administrativen Aufgaben (Steuerung des Produktionsprozesses).',
      },
      {
        q: 'Was bedeutet „P2M“ bzw. „M2M“ im Kontext der Fabrik 4.0?',
        options: [
          'Person-to-Machine und Machine-to-Machine — Grenzen, die bei der Datentransformation überwunden werden',
          'Plan-to-Money und Money-to-Market',
          'Product-to-Market und Market-to-Market',
          'Pixel-to-Monitor',
        ],
        correct: 0,
        explain:
          'Vom Kundenauftrag bis zur Auslieferung müssen Grenzen zwischen Person und Maschine (P2M) sowie zwischen Maschine und Maschine (M2M) überwunden werden.',
      },
      {
        q: 'Welche drei Analytics-Arten müssen laut Artikel integriert betrachtet werden?',
        options: [
          'Visual, Multidimensional und Multi Ratio Analytics',
          'Big, Small und Smart Analytics',
          'Finanz-, Personal- und Produktionsanalyse',
          'Nominal, Ordinal und Kardinal Analytics',
        ],
        correct: 0,
        explain:
          'Visual Analytics (Vergangenheit/Reporting), Multidimensional Analytics (Analysis) und Multi Ratio Analytics (Monitoring) müssen integriert betrachtet werden.',
      },
      {
        q: 'Im Berichtswesen-Modell: Welche Frage beantwortet „Monitoring“?',
        options: [
          'Was ist passiert? (Vergangenheit)',
          'Warum ist es passiert? (Vergangenheit)',
          'Was passiert gerade? (Gegenwart)',
          'Was wird passieren? (Zukunft)',
        ],
        correct: 2,
        explain:
          'Reporting/Analysis = Vergangenheit (Was ist/warum passiert?). Monitoring = Gegenwart (Was passiert gerade?). Prediction = Zukunft (Was wird passieren?).',
      },
      {
        q: 'Wofür steht das Minard-Sankey-Diagramm-Beispiel (Napoleons Russlandfeldzug)?',
        options: [
          'Für eine schlechte Visualisierung',
          'Für eine ausdrucksstarke Infografik, die mehrere Daten gleichzeitig (Truppenstärke, Ort, Temperatur) zeigt',
          'Für ein Pivot-Tabellen-Beispiel',
          'Für Chernoff Faces',
        ],
        correct: 1,
        explain:
          'Minards Sankey-Diagramm zeigt Truppenstärke (Balkendicke), geografische Daten und Temperaturverlauf gleichzeitig — ein Musterbeispiel ausdrucksstarker Visualisierung.',
      },
      {
        q: 'Welches „Gesetz“ wird zitiert, das die Speicherung des Datenwachstums entschärft?',
        options: ['Moores Law', 'Storage Law (Speicherkapazität verdoppelt sich alle 12 Monate)', 'Gilders Law', 'Zuboffs Law'],
        correct: 1,
        explain:
          'Das Storage Law besagt, dass sich die Speicherkapazität alle 12 Monate verdoppelt — daher ist die Datenspeicherung weder finanziell noch technisch das Kernproblem.',
      },
    ],
  },
  {
    id: 'shingle',
    title: 'Duplicate-Content-Prüfung mit dem Shingle-Algorithmus',
    subtitle: 'SEO, Shingles, Jaccard-Koeffizient & Originalbestimmung',
    tag: 'SEO',
    color: COLORS.purple,
    hasWorked: true,
    workedKey: 'jaccard',
    questions: [
      {
        q: 'Was ist Duplicate Content?',
        options: [
          'Inhalt mit Rechtschreibfehlern',
          'Identische Inhalte, die unter mehreren verschiedenen URLs erreichbar sind',
          'Werbung auf einer Website',
          'Sehr langer Text',
        ],
        correct: 1,
        explain:
          'Duplicate Content sind inhaltlich identische Inhalte unter unterschiedlichen URLs — z. B. wenn ein Artikel in mehreren Kategorien gelistet ist.',
      },
      {
        q: 'Was versteht man unter Scraping?',
        options: [
          'Das Löschen von Websites',
          'Das Kopieren von Inhalten fremder Websites und Veröffentlichen auf der eigenen',
          'Das Verschlüsseln von Daten',
          'Eine Suchmaschinen-Werbeform',
        ],
        correct: 1,
        explain:
          'Beim Scraping kopieren Menschen oder Programme Inhalte fremder Websites und veröffentlichen sie auf der eigenen — eine Ursache für externen Duplicate Content.',
      },
      {
        q: 'Was bedeutet SEO?',
        options: [
          'Search Engine Optimization (Suchmaschinenoptimierung)',
          'System Engine Output',
          'Search Entry Operation',
          'Server Edge Optimization',
        ],
        correct: 0,
        explain:
          'SEO = Search Engine Optimization. Maßnahmen, um die Position einer Website in den organischen (nicht bezahlten) Suchergebnissen zu verbessern.',
      },
      {
        q: 'Worin unterscheiden sich organische und bezahlte Suchergebnisse?',
        options: [
          'Organische werden von Dritten bezahlt',
          'Organische werden allein nach Kriterien der Suchmaschine gerankt, nicht bezahlt',
          'Es gibt keinen Unterschied',
          'Bezahlte sind immer ganz unten',
        ],
        correct: 1,
        explain:
          'Bei organischen Suchergebnissen wird die Position nicht bezahlt, sondern allein von der Suchmaschine nach bestimmten Kriterien ermittelt.',
      },
      {
        q: 'Was ist ein „Shingle“?',
        options: [
          'Eine ganze Webseite',
          'Ein sich überschneidendes Segment aus mehreren aufeinanderfolgenden Wörtern eines Satzes',
          'Ein einzelnes Wort',
          'Eine URL',
        ],
        correct: 1,
        explain:
          '„Shingle“ (engl. Schindel) ist ein sich überschneidendes Wortsegment. Bei Shingle-Länge 3 besteht jedes Shingle aus 3 aufeinanderfolgenden Wörtern, die wie Schindeln überlappen.',
      },
      {
        q: 'Wie werden Shingles der Länge 3 gebildet?',
        options: [
          'Man nimmt jedes dritte Wort einzeln',
          'Man nimmt 3 Wörter, rückt dann um EIN Wort weiter und nimmt wieder 3, bis das letzte Wort erreicht ist',
          'Man nimmt nur die ersten 3 Wörter',
          'Man zählt die Buchstaben',
        ],
        correct: 1,
        explain:
          'Vom ersten Wort an werden 3 Wörter genommen, dann ab dem zweiten Wort wieder 3, dann ab dem dritten usw. — überlappend, bis das letzte Wort das Satzende bildet.',
      },
      {
        q: 'In welcher Reihenfolge laufen die vier Schritte ab, mit denen Google zu organischen Suchergebnissen kommt?',
        options: [
          'Ranking → Suche → Indexieren → Crawlen',
          'Crawlen → Indexieren → Suche → Ranking',
          'Indexieren → Crawlen → Ranking → Suche',
          'Suche → Crawlen → Ranking → Indexieren',
        ],
        correct: 1,
        explain:
          'Erst folgt der Googlebot Links (Crawlen), dann landen die gefundenen Wörter im Index (Indexieren), ein Keyword filtert passende Treffer (Suche), und zuletzt legt ein Algorithmus die Reihenfolge fest (Ranking).',
      },
      {
        q: 'Was passiert mit einer Seite, die Google als Duplikat eines bereits bekannten Originals einstuft?',
        options: [
          'Sie wird komplett aus dem Internet gelöscht',
          'Sie wandert in den Supplemental Index — eine Art zweite Reihe, die in der normalen Suche kaum auftaucht',
          'Sie erscheint automatisch auf Platz 1',
          'Sie wird in eine andere Sprache übersetzt',
        ],
        correct: 1,
        explain:
          'Erkennt Google beim Crawlen einen stark ähnlichen Text, bestimmt es das mutmaßliche Original und verschiebt die Duplikate in den Supplemental Index, der in normalen Suchergebnissen kaum sichtbar ist.',
      },
      {
        q: 'Womit wird der Übereinstimmungsgrad zweier Texte berechnet?',
        options: ['Mit dem Pythagoras-Satz', 'Mit dem Jaccard-Koeffizienten', 'Mit dem Mittelwert', 'Mit dem Modus'],
        correct: 1,
        explain:
          'Der Jaccard-Koeffizient Ü(A,B) = |Schnittmenge| / |Vereinigungsmenge| der Shingle-Mengen ergibt den prozentualen Übereinstimmungsgrad.',
      },
      {
        q: 'Die Jaccard-Formel lautet Ü(A,B) = |S(A) ∩ S(B)| / |S(A) ∪ S(B)|. Was steht im Zähler?',
        options: ['Die Vereinigungsmenge (alle Shingles)', 'Die Schnittmenge (gemeinsame Shingles beider Texte)', 'Die Anzahl Wörter', 'Die Differenz'],
        correct: 1,
        explain:
          'Im Zähler steht die Schnittmenge: die Shingles, die in BEIDEN Texten vorkommen. Im Nenner die Vereinigungsmenge: alle unterschiedlichen Shingles zusammen.',
      },
      {
        q: 'Je größer der Jaccard-Koeffizient, desto …',
        options: [
          'geringer der Duplicate Content',
          'größer der Duplicate Content (Ähnlichkeit) der Texte',
          'kürzer die Texte',
          'schlechter das Ranking des Originals',
        ],
        correct: 1,
        explain:
          'Der Jaccard-Koeffizient ist mit dem Duplikatsgrad identisch: je höher der Wert, desto ähnlicher (mehr Duplicate Content) sind die Texte.',
      },
      {
        q: 'Wie sehen die drei Zonen aus einem Test mit 20 Domains zum Duplikatsgrad aus?',
        options: [
          'Bis 40 % beide Seiten geranked, 40–60 % Grauzone, über 60 % wird das Original unklar',
          'Immer nur eine Seite wird geranked',
          'Bis 90 % beide Seiten geranked, danach Duplikat',
          'Der Duplikatsgrad spielt für das Ranking keine Rolle',
        ],
        correct: 0,
        explain:
          'Bis 40 % Duplikatsgrad rankt Google noch beide Seiten. Zwischen 40 % und 60 % liegt eine Grauzone. Über 60 % wird unklar, welche Seite das Original ist — die Kopie kann sogar besser ranken. Werbetexte sollten daher mind. 60 % einzigartigen Inhalt haben.',
      },
      {
        q: 'Welche drei Kriterien nutzen Suchmaschinen zusammen, um das Original zweier fast identischer Texte zu bestimmen?',
        options: [
          'Textlänge, Schriftart, Farbschema',
          'Indexierungsdatum, Reputation des Anbieters, eingehende Quellverweise',
          'Ladezeit, Serverstandort, Domainalter',
          'Anzahl Bilder, Anzahl Links, Dateigröße',
        ],
        correct: 1,
        explain:
          'Alle drei Kriterien zusammen entscheiden: das (früheste) Indexierungsdatum, die Reputation der Seite und eingehende Quellverweise (Links), auf die andere Seiten verweisen.',
      },
      {
        q: 'Warum kann das Indexierungsdatum allein zu Problemen bei der Originalbestimmung führen?',
        options: [
          'Weil es nur zeigt, wann Google eine Seite entdeckt hat — nicht, wann der Inhalt geschrieben wurde',
          'Weil Datumsangaben verboten sind',
          'Weil es immer korrekt ist',
          'Weil Google kein Datum speichert',
        ],
        correct: 0,
        explain:
          'Maßgeblich ist nur, wann die Seite indexiert (gecrawlt) wurde, nicht wann sie online ging. Eine Kopie kann schneller gecrawlt werden als das echte Original, z. B. weil sie in einer Sitemap gelistet ist — und so fälschlich als Original gelten.',
      },
      {
        q: 'Zwei Texte ergeben bei Shingle-Länge 4 jeweils 5 Shingles, davon 2 gemeinsam (Vereinigungsmenge = 8). Bei Shingle-Länge 3 lag der Jaccard-Koeffizient bei 33,3 %. Wie verändert sich der Wert bei Länge 4, und was zeigt das?',
        options: [
          'Er steigt auf 50 % — längere Shingles finden immer mehr Übereinstimmungen',
          'Er sinkt auf 25 % (2/8) — je größer die Shingle-Länge, desto strenger die Prüfung',
          'Er bleibt exakt gleich, die Shingle-Länge hat keinen Einfluss',
          'Er wird negativ, da zu wenige Shingles existieren',
        ],
        correct: 1,
        explain:
          '2 gemeinsame Shingles / 8 Shingles in der Vereinigungsmenge = 25 %. Das ist weniger als die 33,3 % bei Länge 3: Je größer die Shingle-Länge, desto strenger die Prüfung — schon kleine Umstellungen wirken sich stärker aus.',
      },
    ],
  },
  {
    id: 'chernoff',
    title: 'Visualisierung von Multikennzahlen mit Chernoff Faces',
    subtitle: 'Big Data, Informationspyramide, Sehprozess & Glyphen',
    tag: 'Big Data',
    color: COLORS.red,
    hasWorked: false,
    workedKey: null,
    questions: [
      {
        q: 'Welche Reihenfolge hat die Informationspyramide (von unten nach oben)?',
        options: [
          'Wissen → Informationen → Daten → Signale',
          'Signale/Zeichen → Daten → Informationen → Wissen',
          'Daten → Signale → Wissen → Informationen',
          'Informationen → Wissen → Daten → Signale',
        ],
        correct: 1,
        explain:
          'Von unten nach oben: Signale/Zeichen (techn. Basis) → Daten (Maschinen verarbeiten) → Informationen (Menschen verstehen) → Wissen (führt zu Entscheidungen).',
      },
      {
        q: 'Was unterscheidet Daten von Informationen?',
        options: [
          'Daten sind immer falsch',
          'Daten sind einzelne Werte; Informationen entstehen, wenn Daten semantisch erläutert werden',
          'Es gibt keinen Unterschied',
          'Informationen werden von Maschinen verarbeitet, Daten von Menschen',
        ],
        correct: 1,
        explain:
          'Daten (lat. dare = geben) sind einzelne Werte, von Maschinen verarbeitet. Informationen entstehen, wenn Daten semantisch erläutert werden — sie tragen Bedeutung.',
      },
      {
        q: 'Die Zahl 500 wird erst zur Information, wenn …',
        options: [
          'sie verdoppelt wird',
          'ihr eine semantische Bedeutung zugewiesen wird (z. B. 500 Kündigungen)',
          'sie gelöscht wird',
          'sie als römische Zahl geschrieben wird',
        ],
        correct: 1,
        explain:
          'Aus der reinen Zahl 500 wird eine Information, sobald ihr Bedeutung zugewiesen wird — z. B. 500 Kündigungen, 500 Euro oder 500 Liter.',
      },
      {
        q: 'Was sind Multikennzahlensysteme (z. B. Balanced Scorecard)?',
        options: [
          'Eine einzelne Finanzkennzahl',
          'Quantitative Variablen in sinnvoller Beziehung, auf ein gemeinsames Ziel ausgerichtet',
          'Nur Umsatz und Gewinn',
          'Eine Datenbanktabelle',
        ],
        correct: 1,
        explain:
          'Ein Multikennzahlensystem fasst quantitative Variablen zusammen, die sachlich sinnvoll zueinander stehen und auf ein übergeordnetes Ziel ausgerichtet sind.',
      },
      {
        q: 'Wie viele Informationen kann das menschliche Arbeitsgedächtnis laut Artikel gleichzeitig verarbeiten?',
        options: ['10 bis 15', 'drei bis fünf (in der Regel drei)', 'über 100', 'genau 7'],
        correct: 1,
        explain:
          'Im Arbeitsgedächtnis können parallel maximal drei bis fünf Gedächtnisgegenstände wahrgenommen werden — in der Regel liegt die Grenze bei drei.',
      },
      {
        q: 'In welchem Gedächtnis werden visuelle Eindrücke zunächst kurz gehalten?',
        options: ['Im Langzeitgedächtnis', 'Im ikonischen Gedächtnis', 'Im Arbeitsgedächtnis', 'Im semantischen Gedächtnis'],
        correct: 1,
        explain:
          'Visuelle Informationen werden kurzfristig im ikonischen Gedächtnis gehalten und durch die Aufmerksamkeit gefiltert, bevor sie ins Arbeitsgedächtnis gelangen.',
      },
      {
        q: 'Warum ist die Visualisierung gegenüber rein statistischen Ansätzen vorteilhaft?',
        options: [
          'Sie ist immer schneller zu programmieren',
          'Sie ist einfacher, gibt mehr Sicherheit und macht unerwartete Eigenschaften klar wahrnehmbar',
          'Sie braucht keine Daten',
          'Sie ist gesetzlich vorgeschrieben',
        ],
        correct: 1,
        explain:
          'Visualisierung ist oft einfacher und gibt dem Nutzer mehr Sicherheit; sie lässt unerwartete Eigenschaften (z. B. eine nur durchschnittliche Abteilung) klar erkennen.',
      },
      {
        q: 'Was ist eine Glyphen-Visualisierung?',
        options: [
          'Eine reine Textbeschreibung',
          'Die grafische Darstellung mehrerer Kennzahlen als EINE Einheit (z. B. durch Striche/Symbole)',
          'Eine Tonaufnahme',
          'Eine Datenbankabfrage',
        ],
        correct: 1,
        explain:
          'Glyphen-basierte Visualisierung stellt Kennzahlen eines Multikennzahlensystems grafisch als Einheit/Gesamtes dar. Bekanntestes Beispiel: der Boxplot.',
      },
      {
        q: 'Wie funktionieren klassische Chernoff Faces?',
        options: [
          'Jede Kennzahl wird einem Gesichtsmerkmal zugeordnet (z. B. großer Wert → große Nase)',
          'Jedes Gesicht ist ein Foto eines echten Menschen',
          'Sie zeigen nur eine einzige Kennzahl',
          'Sie bestehen aus Balkendiagrammen',
        ],
        correct: 0,
        explain:
          'Bei Chernoff Faces wird jede Kennzahl einem Gesichtsmerkmal zugewiesen — ist der Wert groß, wird z. B. die Nase groß. Mehrere Kennzahlen ergeben einen Gesichtsausdruck.',
      },
      {
        q: 'Welches Gesichtsmerkmal erzielt laut Rangordnung die GRÖSSTE Aufmerksamkeit?',
        options: ['Länge der Augenbrauen', 'Krümmung des Mundwinkels', 'Länge der Nase', 'Gesichtshöhe'],
        correct: 1,
        explain:
          'Die Rangordnung der Aufmerksamkeit beginnt mit (1) Krümmung des Mundwinkels, dann Augengröße, Kiefer … bis zuletzt Länge der Augenbrauen. Wichtigste Kennzahl → Mundwinkel.',
      },
      {
        q: 'Was sollte eine gute Visualisierung laut Artikel hervorheben?',
        options: [
          'Möglichst viele unwichtige Details',
          'Die auffälligsten Eigenschaften (Salience), um die Aufmerksamkeit zu lenken',
          'Nur Farben, keine Formen',
          'Ausschließlich Zahlen',
        ],
        correct: 1,
        explain:
          'Visualisierungen sollen wichtige Details, also die auffallendsten Eigenschaften (Salience), hervorheben und so die Aufmerksamkeit gezielt lenken.',
      },
      {
        q: 'Wie ist ein Boxplot aufgebaut?',
        options: [
          'Nur ein einzelner Punkt',
          'Box von 25%- bis 75%-Quantil, Median als Strich, Linien zu Minimum und Maximum',
          'Ein Kreis mit Sektoren',
          'Ein Gesicht mit Augen',
        ],
        correct: 1,
        explain:
          'Der Boxplot fasst fünf Kennzahlen zusammen: Min, 25%-Quantil, Median, 75%-Quantil, Max. Die Box (25–75 %) enthält 50 % der Beobachtungen.',
      },
    ],
  },
];

export function getArticle(id: string): Article | undefined {
  return Articles.find((a) => a.id === id);
}

// ============================================================
// ZUSAMMENFASSUNGEN — Pendant zu SummaryData.swift
// ============================================================

export type SummaryVisualKind =
  | 'verdichtung'
  | 'skalen'
  | 'wuerfel'
  | 'stammbewegung'
  | 'passquote'
  | 'revolutions'
  | 'taetigkeiten'
  | 'berichtswesen'
  | 'duplicate'
  | 'suchprozess'
  | 'shingles'
  | 'jaccard'
  | 'originalkriterien'
  | 'duplikatsgrad'
  | 'pyramide'
  | 'gedaechtnis'
  | 'faces';

export type SummaryBlock =
  | { kind: 'lead'; text: string }
  | { kind: 'text'; heading: string | null; body: string }
  | { kind: 'visual'; visual: SummaryVisualKind }
  | { kind: 'keypoints'; title: string; points: string[] };

export interface ArticleSummaryData {
  title: string;
  blocks: SummaryBlock[];
}

export const Summaries: Record<string, ArticleSummaryData> = {
  multidim: {
    title: 'Worum geht es?',
    blocks: [
      {
        kind: 'lead',
        text: 'Digitalisierung erzeugt riesige Mengen operativer Daten. Allein sagen diese wenig aus — erst durch Verdichtung zu Kennzahlen und das Hinzufügen von Dimensionen werden sie zu Wissen, das bei Entscheidungen hilft.',
      },
      {
        kind: 'text',
        heading: 'Von Rohdaten zu Wissen',
        body: 'Operative Daten fallen beim Geschäftsbetrieb an (OLTP-Systeme) und liegen strukturiert vor. Sie sind „atomar“ — eine einzelne Zeile entspricht z. B. einem Kundenauftrag. Um daraus Aussagen zu gewinnen, verdichtet man sie mit mathematischen Operationen zu Kennzahlen.',
      },
      { kind: 'visual', visual: 'verdichtung' },
      {
        kind: 'text',
        heading: 'Skalenniveau entscheidet über die Mathematik',
        body: 'Welche Verdichtung erlaubt ist, hängt vom Skalenniveau ab: Nominaldaten (Kategorien ohne Rang) erlauben nur den Modus, Ordinaldaten (Rang, ungleiche Abstände) zusätzlich den Median, Kardinaldaten (gleiche Abstände) auch Summe und Durchschnitt.',
      },
      { kind: 'visual', visual: 'skalen' },
      {
        kind: 'text',
        heading: 'Dimensionen spannen den Informationsraum auf',
        body: 'Eine Kennzahl wie „Gesamtumsatz“ wird erst durch Dimensionen aussagekräftig: zeitlich (wann?), räumlich (wo?), sachlich (wodurch?). Eine Pivot-Tabelle zerlegt eine Kennzahl entlang dieser Dimensionen — das ist multidimensionale Datenanalyse.',
      },
      { kind: 'visual', visual: 'wuerfel' },
      {
        kind: 'keypoints',
        title: 'Das musst du dir merken',
        points: [
          'Operative Daten → Kennzahlen (verdichten) → + Dimensionen (Aussagekraft)',
          'Nominal = nur Modus · Ordinal = + Median · Kardinal = + Durchschnitt/Summe',
          'Drei Dimensionsarten: zeitlich, räumlich, sachlich',
          '60–80 % aller Unternehmensdaten haben einen Raumbezug',
        ],
      },
    ],
  },
  fussball: {
    title: 'Worum geht es?',
    blocks: [
      {
        kind: 'lead',
        text: 'Fußballspieler sind teure Investitionen. Statt sich auf Bauchgefühl oder einzelne Statistiken zu verlassen, bewertet man sie wie im Controlling — multidimensional. Eine einzelne Zahl wie „95 % Passquote“ kann sonst in die Irre führen.',
      },
      {
        kind: 'text',
        heading: 'Stammdaten vs. Bewegungsdaten',
        body: 'Der Dienstleister Opta erfasst pro Spiel bis zu 200 Aktivitäten. Stammdaten beschreiben dauerhafte Zustände (Spieler, Team, Position mit Player-ID). Bewegungsdaten dokumentieren Ereignisse, die nach jedem Spiel neu entstehen (einzelne Pässe mit Distanz, Tempo, Zone).',
      },
      { kind: 'visual', visual: 'stammbewegung' },
      {
        kind: 'text',
        heading: 'Das Problem eindimensionaler Kennzahlen',
        body: 'Eine pauschale Passquote von 95 % sagt nichts über die Qualität der Pässe. Erst Dimensionen wie Entfernung, Geschwindigkeit und Ort des Passes zeigen, ob es riskante, wertvolle Pässe nah am Tor waren oder einfache Querpässe im Mittelfeld.',
      },
      { kind: 'visual', visual: 'passquote' },
      {
        kind: 'text',
        heading: 'Die Zeit als vierte Dimension',
        body: 'Fügt man die Zeit hinzu (z. B. 10-Minuten-Intervalle), erkennt man Muster im Spielverlauf: Lässt die Passquote zum Ende nach, ist das ein Indikator für Ermüdung.',
      },
      {
        kind: 'keypoints',
        title: 'Das musst du dir merken',
        points: [
          'Stammdaten = dauerhaft (Spieler, Team) · Bewegungsdaten = je Spiel neu (Pässe)',
          'Passquote = erfolgreiche Pässe / gespielte Pässe × 100',
          'Eindimensional täuscht — erst Dimensionen (Ort, Tempo, Zeit) geben Aussagekraft',
          'Die Analyse ersetzt nicht die Entscheidung, sie unterstützt sie',
        ],
      },
    ],
  },
  fabrik: {
    title: 'Worum geht es?',
    blocks: [
      {
        kind: 'lead',
        text: 'Industrie 4.0 ist die vierte industrielle Revolution. Über die Geschichte der Fabrik lässt sich verstehen, wie sich die Rolle des Menschen wandelt — von der Muskelkraft hin zur kreativen Gestaltung, während Maschinen immer mehr übernehmen.',
      },
      {
        kind: 'text',
        heading: 'Vier industrielle Revolutionen',
        body: 'Jede Revolution verschob Arbeit vom Menschen zur Maschine: Dampf (Mechanisierung), Strom (Elektrifizierung), Mikrochip (Informatisierung) und schließlich die intelligente Vernetzung bestehender Technik (Smartisierung).',
      },
      { kind: 'visual', visual: 'revolutions' },
      {
        kind: 'text',
        heading: 'Vier Tätigkeitsarten',
        body: 'Mit steigender kognitiver Komplexität: exekutiv (ausführen, z. B. Bohren), administrativ (nach Plan anweisen), dispositiv (überwachen, eingreifen), kreativ (Neues gestalten). Maschinen übernehmen von unten nach oben — der Mensch rückt nach oben.',
      },
      { kind: 'visual', visual: 'taetigkeiten' },
      {
        kind: 'text',
        heading: 'Berichtswesen: drei Zeithorizonte',
        body: 'Die Datenanalyse beantwortet drei Fragen entlang der Zeit: Was ist passiert? (Reporting/Analysis, Vergangenheit) · Was passiert gerade? (Monitoring, Gegenwart) · Was wird passieren? (Prediction, Zukunft).',
      },
      { kind: 'visual', visual: 'berichtswesen' },
      {
        kind: 'keypoints',
        title: 'Das musst du dir merken',
        points: [
          '1=Dampf · 2=Strom · 3=Mikrochip · 4=Smartisierung (Vernetzung)',
          'Tätigkeiten: exekutiv → administrativ → dispositiv → kreativ',
          '4.0-Kern: nicht nur die Maschine, auch das Werkstück hat ein digitales Gedächtnis',
          'Analytics: Visual (Vergangenheit) · Multidim (Analyse) · Multi-Ratio (Monitoring)',
        ],
      },
    ],
  },
  shingle: {
    title: 'Worum geht es?',
    blocks: [
      {
        kind: 'lead',
        text: 'In Online-Shops steht derselbe Artikeltext oft unter mehreren URLs — das ist Duplicate Content. Suchmaschinen müssen erkennen, welche Seite das Original ist. Der Shingle-Algorithmus misst dazu, wie ähnlich zwei Texte sind.',
      },
      {
        kind: 'text',
        heading: 'Duplicate Content & SEO',
        body: 'Erscheint ein Inhalt unter mehreren URLs (z. B. durch Kategorisierung, Paginierung oder Scraping), wertet die Suchmaschine Duplikate ab und zeigt nur das Original gut platziert. Intern passiert das innerhalb der eigenen Domain, extern auf fremden Websites. SEO sorgt dafür, in den organischen (nicht bezahlten) Ergebnissen vorne zu landen.',
      },
      { kind: 'visual', visual: 'duplicate' },
      {
        kind: 'text',
        heading: 'Wie Google Ergebnisse überhaupt sortiert',
        body: 'Damit organische Treffer entstehen, durchläuft Google vier Schritte: Crawlen (der Googlebot folgt Links von Seite zu Seite), Indexieren (gefundene Wörter landen in einer riesigen Tabelle), Suche (ein Keyword filtert passende Treffer aus dem Index) und Ranking (ein geheimer Algorithmus legt die Reihenfolge fest). Nur das Ranking der organischen Treffer ist kostenlos — bezahlte Treffer (z. B. Google Ads) erscheinen unabhängig von ihrer Relevanz.',
      },
      { kind: 'visual', visual: 'suchprozess' },
      {
        kind: 'text',
        heading: 'Shingles: überlappende Wortfenster',
        body: 'Ein Text wird in „Shingles“ zerlegt — überlappende Gruppen von z. B. 3 aufeinanderfolgenden Wörtern. Man nimmt 3 Wörter, rückt um eins weiter, nimmt wieder 3, wie Dachschindeln, die sich überlappen. Je größer die Shingle-Länge, desto strenger die Prüfung: Schon kleine Umstellungen wirken sich stärker aus.',
      },
      { kind: 'visual', visual: 'shingles' },
      {
        kind: 'text',
        heading: 'Jaccard-Koeffizient',
        body: 'Die Ähnlichkeit ist Schnittmenge geteilt durch Vereinigungsmenge der Shingle-Mengen. Findet Google beim Crawlen einen stark ähnlichen Text, vergleicht es ihn mit dem Bestand, bestimmt das mutmaßliche Original — und verschiebt alle Duplikate in den Supplemental Index, eine Art zweite Reihe, die in der normalen Suche kaum auftaucht.',
      },
      { kind: 'visual', visual: 'jaccard' },
      {
        kind: 'text',
        heading: 'Wer gilt als Original?',
        body: 'Findet Google zwei fast identische Texte, entscheiden drei Kriterien, welcher das Original ist. Das Indexierungsdatum ist dabei nicht unfehlbar: Es zeigt nur, wann Google eine Seite entdeckt hat — nicht, wann der Inhalt geschrieben wurde. Eine Kopie kann schneller gecrawlt werden als das echte Original, z. B. weil sie in einer Sitemap gelistet ist.',
      },
      { kind: 'visual', visual: 'originalkriterien' },
      {
        kind: 'text',
        heading: 'Ab wann wird es zum Problem?',
        body: 'Ein Test mit 20 Domains zeigt drei Zonen: Bis zu einem Duplikatsgrad von 40 % rankt Google noch beide Seiten. Zwischen 40 % und 60 % wird es zur Grauzone. Über 60 % wird unklar, welche Seite das Original ist — die Kopie kann sogar besser ranken. Werbetexte sollten deshalb mindestens 60 % einzigartigen Inhalt enthalten.',
      },
      { kind: 'visual', visual: 'duplikatsgrad' },
      {
        kind: 'keypoints',
        title: 'Das musst du dir merken',
        points: [
          'Duplicate Content = gleicher Inhalt unter mehreren URLs (intern oder extern)',
          'Suchprozess: Crawlen → Indexieren → Suche → Ranking',
          'Shingle = überlappendes Fenster aus n Wörtern (n = Shingle-Länge)',
          'Jaccard = |Schnittmenge| / |Vereinigungsmenge|',
          'Original-Kriterien: Indexierungsdatum, Reputation, eingehende Quellverweise',
          '≤ 40 % = beide geranked · 40–60 % Grauzone · > 60 % Original unklar (Ziel: ≥ 60 % unique)',
        ],
      },
    ],
  },
  chernoff: {
    title: 'Worum geht es?',
    blocks: [
      {
        kind: 'lead',
        text: 'Daten werden nicht nur mehr, sondern auch komplexer. Der Mensch kann aber nur 3–5 Kennzahlen gleichzeitig im Kopf bewerten. Chernoff Faces lösen das, indem sie viele Kennzahlen in einen Gesichtsausdruck übersetzen — den wir blitzschnell erfassen.',
      },
      {
        kind: 'text',
        heading: 'Die Informationspyramide',
        body: 'Signale werden zu Daten, Daten mit Bedeutung zu Informationen, Informationen zu Wissen. Maschinen verarbeiten Daten, Menschen verstehen Informationen. Aus der Zahl 500 wird erst dann Information, wenn ihr Bedeutung zugewiesen wird (z. B. 500 Kündigungen).',
      },
      { kind: 'visual', visual: 'pyramide' },
      {
        kind: 'text',
        heading: 'Die Grenze des Arbeitsgedächtnisses',
        body: 'Visuelle Eindrücke landen kurz im ikonischen Gedächtnis, dann im Arbeitsgedächtnis — dort passen aber nur 3–5 Dinge gleichzeitig. Moderne Kennzahlensysteme (Balanced Scorecard) überschreiten das deutlich.',
      },
      { kind: 'visual', visual: 'gedaechtnis' },
      {
        kind: 'text',
        heading: 'Chernoff Faces: Kennzahl → Gesichtsmerkmal',
        body: 'Jede Kennzahl steuert ein Merkmal (großer Wert → große Nase). Die wichtigste Kennzahl legt man auf den Mundwinkel, denn der erzielt die größte Aufmerksamkeit. So erkennt man Auffälligkeiten auf einen Blick.',
      },
      { kind: 'visual', visual: 'faces' },
      {
        kind: 'keypoints',
        title: 'Das musst du dir merken',
        points: [
          'Pyramide: Signale → Daten → Informationen → Wissen',
          'Arbeitsgedächtnis: nur 3–5 Kennzahlen gleichzeitig',
          'Chernoff Face: jede Kennzahl = ein Gesichtsmerkmal',
          'Größte Aufmerksamkeit: Krümmung des Mundwinkels',
        ],
      },
    ],
  },
};

// ============================================================
// ANWENDUNGSAUFGABEN — Pendant zu WorkedExampleData.swift
// ============================================================

export interface WorkedStep {
  h: string;
  t: string;
}

export interface WorkedExercise {
  intro: string;
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface WorkedExampleDataT {
  title: string;
  color: string;
  steps: WorkedStep[];
  exercise: WorkedExercise;
}

export const WorkedExamples: Record<string, WorkedExampleDataT> = {
  jaccard: {
    title: 'Anwendung: Jaccard-Koeffizient berechnen',
    color: COLORS.purple,
    steps: [
      {
        h: 'Schritt 1 — Texte in Shingles zerlegen',
        t: 'Bei Shingle-Länge 3 nimmst du 3 aufeinanderfolgende Wörter, rückst dann um EIN Wort weiter und nimmst wieder 3 — überlappend bis zum Satzende.',
      },
      {
        h: 'Beispiel aus dem Artikel',
        t: 'Text A: „Duplicate Content ist das Gegenteil von Unique Content“\nText B: „Unique Content ist das Gegenteil von Duplicate Content“\nBeide ergeben je 6 Shingles der Länge 3.',
      },
      {
        h: 'Schritt 2 — Schnittmenge bilden',
        t: 'Gemeinsame Shingles beider Texte: (Content,ist,das), (ist,das,Gegenteil), (das,Gegenteil,von) → 3 gemeinsame Shingles.',
      },
      {
        h: 'Schritt 3 — Vereinigungsmenge bilden',
        t: 'Alle unterschiedlichen Shingles zusammen: 9 Stück (die 3 gemeinsamen + 3 nur in A + 3 nur in B).',
      },
      {
        h: 'Schritt 4 — Formel anwenden',
        t: 'Ü(A,B) = |Schnittmenge| / |Vereinigungsmenge| = 3 / 9 = 0,333 → 33,3 %.',
      },
      {
        h: 'Schritt 5 — Und bei Shingle-Länge 4?',
        t: 'Mit Shingle-Länge 4 ergeben dieselben zwei Sätze je 5 Shingles, davon nur noch 2 gemeinsame. Vereinigungsmenge = 5 + 5 − 2 = 8.',
      },
      {
        h: 'Schritt 6 — Formel erneut anwenden',
        t: 'Ü(A,B) = 2 / 8 = 0,25 → 25 %. Das ist WENIGER als die 33,3 % bei Länge 3: Je größer die Shingle-Länge, desto strenger die Prüfung — schon kleine Umstellungen wirken sich stärker auf den Übereinstimmungsgrad aus.',
      },
    ],
    exercise: {
      intro: 'Jetzt du — eine ANDERE Aufgabe zur Kontrolle:',
      q: 'Zwei Texte ergeben zusammen 8 gemeinsame Shingles (Schnittmenge) und 20 unterschiedliche Shingles insgesamt (Vereinigungsmenge). Wie hoch ist der Jaccard-Koeffizient (gerundet)?',
      options: ['8 %', '40 %', '60 %', '28 %'],
      correct: 1,
      explain:
        'Ü = 8 / 20 = 0,40 = 40 %. Zähler = Schnittmenge (gemeinsame Shingles), Nenner = Vereinigungsmenge (alle unterschiedlichen Shingles).',
    },
  },
  skalen: {
    title: 'Anwendung: Skalenniveau & erlaubte Verdichtung bestimmen',
    color: COLORS.entity,
    steps: [
      {
        h: 'Die drei Skalenniveaus',
        t: 'Nominal (nur Kategorien, keine Rangordnung) · Ordinal (Rangordnung, ungleiche Abstände) · Kardinal (Rangordnung + gleiche Abstände).',
      },
      {
        h: 'Welche Verdichtung ist erlaubt?',
        t: 'Nominal → nur Modus (häufigste Ausprägung).\nOrdinal → zusätzlich Median.\nKardinal → zusätzlich Summe & Durchschnitt (alles).',
      },
      {
        h: 'Beispiel Vertriebsart (AUART)',
        t: 'SO/TA/KM sind nur Kategorien ohne Rangordnung → nominal. Erlaubt: nur Modus. Im Beispiel: SO kommt am häufigsten vor → Modus = SO.',
      },
      {
        h: 'Beispiel Profitstufe (PRFS)',
        t: 'Stufe 4 ist besser als Stufe 1, aber „wie viel besser“ ist unklar → ordinal. Erlaubt: Median, KEIN Durchschnitt.',
      },
      {
        h: 'Beispiel Nettowert (NETWR)',
        t: 'Geldbeträge haben gleiche Abstände (1 € = 1 €) → kardinal. Erlaubt: alles, inkl. Summe (Gesamtumsatz) und Durchschnitt.',
      },
    ],
    exercise: {
      intro: 'Jetzt du — eine ANDERE Aufgabe zur Kontrolle:',
      q: 'Ein Attribut speichert die Platzierung beim 100-m-Lauf (1. Platz, 2. Platz, 3. Platz). Welches Skalenniveau liegt vor und welche Verdichtung ist erlaubt?',
      options: [
        'Nominal — nur Modus',
        'Ordinal — Median, aber kein Durchschnitt',
        'Kardinal — Summe und Durchschnitt erlaubt',
        'Nominal — Durchschnitt erlaubt',
      ],
      correct: 1,
      explain:
        'Die Platzierung hat eine Rangordnung (1. besser als 2.), aber die Abstände sind nicht gleich (zwischen 1. und 2. kann viel mehr Zeit liegen als zwischen 2. und 3.) → ordinal. Erlaubt ist der Median, kein Durchschnitt.',
    },
  },
  taetigkeit: {
    title: 'Anwendung: Tätigkeitsarten zuordnen',
    color: COLORS.relation,
    steps: [
      {
        h: 'Die vier Tätigkeitsarten (steigende Komplexität)',
        t: '1. exekutiv (ausführend/körperlich) · 2. administrativ (Anweisung nach Plan) · 3. dispositiv (Überwachung/Kontrolle) · 4. kreativ (Neues schaffen).',
      },
      {
        h: 'Eselsbrücke',
        t: 'exekutiv = Hand anlegen · administrativ = nach Plan anweisen · dispositiv = überwachen & eingreifen · kreativ = erfinden/gestalten.',
      },
      {
        h: 'Beispiel aus dem Artikel (Rechnungsbezahlung)',
        t: '„Identifikation offener Posten“ und „Kontodaten ermitteln“ → administrativ.\n„Auszahlungszeitpunkt bestimmen“ → dispositiv.\n„Überweisungsformular ausfüllen“ & „zur Bank transferieren“ → exekutiv.',
      },
      {
        h: 'Logik dahinter',
        t: 'Identifizieren/Vorbereiten = administrativ. Entscheiden wann/welche = dispositiv. Konkretes Ausführen = exekutiv.',
      },
    ],
    exercise: {
      intro: 'Jetzt du — eine ANDERE Aufgabe zur Kontrolle:',
      q: 'In der Fabrik 4.0 entwirft der Mensch neue Produktionsmodelle und überführt sie in den Autopilot-Modus. Welche Tätigkeitsart ist „neue Produktionsmodelle entwerfen“?',
      options: ['exekutiv', 'administrativ', 'dispositiv', 'kreativ'],
      correct: 3,
      explain:
        'Etwas völlig Neues entwerfen/gestalten ist die höchste kognitive Stufe → kreativ. Das reine Überwachen wäre dispositiv, das Ausführen exekutiv.',
    },
  },
};
