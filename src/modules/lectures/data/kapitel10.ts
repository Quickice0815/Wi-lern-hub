import type { LectureChapter } from '../types';

export const kapitel10: LectureChapter = {
  id: 'kapitel10',
  number: 10,
  title: 'Managementinformationssysteme',
  subtitle:
    'Informieren (operativ/strategisch), multidimensionale Analyse (OLAP) und Entscheidungsunterstützung durch ABC-Analyse, BCG-Matrix und maschinelles Lernen',
  icon: '📊',
  color: 'var(--warn)',
  tutorial: [
    {
      title: 'Drei Managementaufgaben: Informieren, Analysieren, Entscheiden',
      content:
        'Diese Vorlesung ordnet Managementinformationssysteme (MIS) drei Aufgabenbereichen zu, die den roten Faden des Kapitels bilden: Informieren (operativ und strategisch), Analysieren (multidimensional) und Entscheiden (Vergleichen, Priorisieren, Bewerten). Nach dem Managementmodell von Mintzberg hat ein Manager drei Rollen: die informationsbezogene Rolle (Informationen aufnehmen, analysieren und verteilen), die entscheidungsbezogene Rolle (Probleme lösen, Alternativen wählen, priorisieren, Ressourcen zuweisen) und die zwischenmenschliche Rolle (Unternehmen vertreten, Mitarbeiter motivieren, Bereiche vernetzen). MIS unterstützen vor allem die ersten beiden Rollen.',
    },
    {
      title: 'Funktionsorientierte Klassifikation: OLTP, CSCW und OLAP als Pyramide',
      content:
        'Betriebliche Informationssysteme lassen sich nach der Art der unterstützten Funktionen als Pyramide darstellen. An der Basis stehen operative Funktionen wie Einkauf, Lager, Produktion, ReWe, Vertrieb und Auslieferung, die horizontal integriert und durch OLTP-Systeme unterstützt werden. Auf der mittleren Ebene folgen Personal, Planung/Entwicklung und Finanzen, unterstützt durch CSCW (computergestützte kollaborative Zusammenarbeit). An der Spitze steht das Controlling, unterstützt durch OLAP. Die vertikale Integration entlang dieser drei Ebenen zeigt: Je höher die Managementebene, desto stärker verdichtet und analytischer werden die genutzten Systeme.',
    },
    {
      title: 'Informationsaufgaben: Reporting, Monitoring, Analysis und Prediction',
      content:
        'Informationsaufgaben stellen entscheidungsrelevante Informationen in adäquater Form bereit und lassen sich entlang der Zeitachse einordnen. Für die Vergangenheit beantwortet Reporting die Frage "Was ist passiert?" und Analysis die Frage "Warum ist es passiert?". Für die Gegenwart beantwortet Monitoring die Frage "Was passiert gerade?". Für die Zukunft beantwortet Prediction die Frage "Was wird passieren?". Strategische Daten (Kennzahlen) entstehen dabei durch Aggregation der operativen Rohdaten mittels Summe, Mittelwert, Quantilen, Anzahl, Quotient, Max, Min oder Modus.',
    },
    {
      title: 'Operatives vs. strategisches Reporting nach Christmann',
      content:
        'Christmann unterscheidet operatives Reporting (Ziel: Unterstützung der Prozessabwicklung für Sachbearbeiter) von strategischem, dispositivem Reporting (Ziel: Entscheidungsunterstützung für das Management). Operatives Reporting ist stichtagsbezogen, arbeitet mit detaillierten Rohdaten (Geschäftsvorfalldaten) aus OLTP-Systemen, die konkurrierend laufend geändert werden, und liefert vorgefertigte, statische Reports zu den zu unterstützenden Prozessen. Strategisches Reporting ist dagegen zeitraumbezogen und historisch, arbeitet mit verdichteten Kennzahlen aus OLAP, ergänzt Daten komplementär (alte bleiben erhalten, neue kommen hinzu) und liefert dynamische, per Drag-and-Drop ad hoc aufgebaute Reports zu erforschenden Themen.',
    },
    {
      title: 'Architektur der Managementinformationssysteme',
      content:
        'Die Architektur eines MIS baut auf vier Schichten auf. Ganz unten stehen die operativen Systeme (OLTP, CSCW) zur Transaktionsabwicklung und Anbindung externer Quellen. Die ETL-Schicht (Extraktion, Transformation, Laden) überführt diese Rohdaten in das Data Warehouse, das für Datenspeicherung und Administration zuständig ist. Ganz oben ermöglicht OLAP die mehrdimensionale Analyse dieser Daten für Reporting und Prediction.',
    },
    {
      title: 'Multidimensionale Analyse: Kennzahlen und ihre Dimensionen',
      content:
        'Analyse bedeutet "zerlegen" und untersucht Gründe für Abweichungen (Soll-Ist, Zeit, Raum, Organisation). Kennzahlen wie eine Passquote oder ein Gesamtumsatz besitzen Dimensionen, die ihre zeitliche, räumliche und begriffliche Erfassbarkeit beschreiben: temporal (Zeit, "Wann?"), lokal (Raum, "Wo?") und kausal (Sache, "Wer? Was? Warum? Wie? Wozu?", z. B. Kunden, Produkte, Prozesse). Eine eindimensionale Analyse zeigt eine Kennzahl nur entlang der Zeit, eine zweidimensionale zusätzlich nach Produkt, eine dreidimensionale zusätzlich nach Filiale – anschaulich als Würfel mit den Achsen Zeit, Produkt und Filiale dargestellt. Dimensionen besitzen zudem Hierarchiestufen, z. B. Zeit (Tag – Monat – Jahr), Raum (City – Bezirk – Bundesland) oder Kunde (Kunde – Kundenklasse).',
    },
    {
      title: 'Entscheidungsaufgaben nach Simon und Entscheidungstypen',
      content:
        'Nach Simon ist eine Entscheidung eine mehrstufige intellektuelle Leistung mit vier Schritten: Recherche (Welches Problem liegt vor?), Alternative (Welche Alternativen sind verfügbar?), Auswahl (Welche Alternative ist besser?) und Umsetzung (Ist die Alternative umsetzbar?). Entscheidungen lassen sich zudem nach ihrem Strukturierungsgrad und der zuständigen Organisationsebene einordnen: Strukturierte Entscheidungen sind formalisiert, wiederholen sich routiniert (z. B. Mahnwesen) und werden auf operativer Ebene von operativen Systemen (OLTP) oder künstlicher Intelligenz unterstützt. Unstrukturierte Entscheidungen sind nicht formalisiert, jede ist neuartig (z. B. Reaktion auf einen Umsatzrückgang) und werden auf Managementebene durch Managementinformationssysteme (OLAP) oder künstliche Intelligenz unterstützt.',
    },
    {
      title: 'Entscheidungsunterstützung durch Klassifikation: ABC-Analyse und BCG-Matrix',
      content:
        'Zur Priorisierung von Alternativen dient die ABC-Analyse: Sie bildet anhand eines zweidimensionalen Wertepaares (Mengenanteil, Wertanteil) eine Rangfolge von Objekten in die Klassen A, B und C. Typischerweise erzielen A-Objekte mit nur 20 % Mengenanteil rund 80 % Wertanteil, B-Objekte mit 30 % Mengenanteil weitere 15 % und C-Objekte mit 50 % Mengenanteil nur noch 5 %. Die BCG-Matrix teilt Produkte anhand von Marktwachstum und relativem Marktanteil (Schwelle bei 1, also gleich groß wie der stärkste Wettbewerber) in vier Gruppen ein: Question Marks (hohes Wachstum, geringer Marktanteil), Stars (hohes Wachstum, hoher Marktanteil), Cash Cows (geringes Wachstum, hoher Marktanteil) und Poor Dogs (geringes Wachstum, geringer Marktanteil).',
    },
    {
      title: 'Maschinelles Lernen und Textvergleich zur Entscheidungsunterstützung',
      content:
        'Auch maschinelles Lernen unterstützt die Klassifikation: Bei der überwachten Klassifikation (z. B. mit Support-Vector-Maschinen oder neuronalen Netzen) müssen die Klassen (etwa "Stuhl" und "Tisch" oder "Muttermal" und "Melanom") vorab feststehen und anhand eines annotierten Trainings- und Testdatensatzes gelernt werden. Beim Clustern (z. B. mit dem k-Means- oder dem Kleinste-Distanz-Algorithmus) sind die Gruppen dagegen vorher nicht bekannt und werden erst aus den Daten selbst gebildet, etwa Kundencluster nach Einkommen und Kaufpreis. Für den Vergleich unstrukturierter Informationen wie Texte zerlegt der Shingle-Algorithmus einen Text in Wortfolgen fester Länge (Shingles); der Jaccard-Koeffizient JK(A,B) = |Shingles(A) ∩ Shingles(B)| / |Shingles(A) ∪ Shingles(B)| misst dann den Übereinstimmungsgrad zweier Texte.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Welche drei Aufgabenbereiche des Managements bilden den roten Faden dieser Vorlesung?',
        options: [
          'Informieren, Analysieren, Entscheiden',
          'Planen, Organisieren, Kontrollieren',
          'Beschaffen, Produzieren, Verkaufen',
          'Bewerten, Vergleichen, Priorisieren',
        ],
        correct: 0,
        explain:
          'Die Vorlesung gliedert sich in Informieren (operativ/strategisch), Analysieren (multidimensional) und Entscheiden (Vergleichen, Priorisieren, Bewerten).',
      },
      {
        q: 'Welche drei Rollen umfasst das Managementmodell nach Mintzberg?',
        options: [
          'Informationsbezogene, entscheidungsbezogene und zwischenmenschliche Rolle',
          'Planende, kontrollierende und organisierende Rolle',
          'Strategische, taktische und operative Rolle',
          'Finanzielle, personelle und technische Rolle',
        ],
        correct: 0,
        explain:
          'Mintzberg unterscheidet die informationsbezogene Rolle (Informationen aufnehmen, analysieren, verteilen), die entscheidungsbezogene Rolle (Probleme lösen, Alternativen wählen) und die zwischenmenschliche Rolle (Unternehmen vertreten, Mitarbeiter motivieren).',
      },
      {
        q: 'Wofür steht OLAP im Kontext der Managementinformationssysteme?',
        options: [
          'Online Analytical Processing – mehrdimensionale Analyse verdichteter Daten',
          'Online Automated Production – automatisierte Fertigungssteuerung',
          'Online Application Programming – Softwareentwicklung im Web',
          'Offline Analytical Planning – Planung ohne Datenanbindung',
        ],
        correct: 0,
        explain: 'OLAP steht für Online Analytical Processing und ermöglicht laut Architektur der MIS die mehrdimensionale Analyse für Reporting und Prediction.',
      },
      {
        q: 'Wie entstehen laut Vorlesung strategische Daten (Kennzahlen)?',
        options: [
          'Durch Aggregation operativer Rohdaten, z. B. mittels Summe, Mittelwert oder Quantilen',
          'Durch manuelle Neueingabe sämtlicher Rohdaten durch das Management',
          'Durch Löschen aller historischen Daten',
          'Durch Zufallsstichproben aus dem Data Warehouse',
        ],
        correct: 0,
        explain: 'Strategische Daten entstehen durch Aggregationsoperationen wie Summe, Mittelwert, Quantile, Anzahl, Quotient, Max, Min oder Modus auf den operativen Rohdaten.',
      },
      {
        q: 'Was ist das Ziel des operativen Reportings nach Christmann?',
        options: [
          'Unterstützung der Prozessabwicklung für Sachbearbeiter',
          'Entscheidungsunterstützung für das Management',
          'Langfristige Marktanalyse für den Vorstand',
          'Automatisierte Preisbildung im E-Commerce',
        ],
        correct: 0,
        explain: 'Operatives Reporting unterstützt die Prozessabwicklung der Sachbearbeiter, während strategisches Reporting die Entscheidungsunterstützung für das Management zum Ziel hat.',
      },
      {
        q: 'Was beschreibt die ABC-Analyse?',
        options: [
          'Die Bildung einer Rangfolge von Objekten anhand eines zweidimensionalen Wertepaares in die Klassen A, B und C',
          'Die automatische Übersetzung von Kennzahlen in drei Sprachen',
          'Eine Methode zur Verschlüsselung von Kundendaten',
          'Die Klassifikation von Produkten ausschließlich nach ihrem Gewicht',
        ],
        correct: 0,
        explain: 'Die ABC-Analyse bildet anhand eines zweidimensionalen Wertepaares (Mengenanteil, Wertanteil) eine Rangfolge der Objekte in die Klassen A, B und C.',
      },
      {
        q: 'Welche vier Gruppen unterscheidet die BCG-Matrix?',
        options: [
          'Question Marks, Stars, Cash Cows, Poor Dogs',
          'Starter, Runner, Champions, Legend',
          'A-Güter, B-Güter, C-Güter, D-Güter',
          'Leader, Follower, Nischenanbieter, Outsider',
        ],
        correct: 0,
        explain: 'Die BCG-Matrix teilt Produkte anhand von Marktwachstum und relativem Marktanteil in Question Marks, Stars, Cash Cows und Poor Dogs ein.',
      },
      {
        q: 'Wozu dient der Shingle-Algorithmus?',
        options: [
          'Zum Vergleich unstrukturierter Texte durch Zerlegung in Wortfolgen fester Länge',
          'Zur Verschlüsselung von Kennzahlen',
          'Zur automatischen Übersetzung von Berichten',
          'Zur Berechnung des Mittelwerts einer Zeitreihe',
        ],
        correct: 0,
        explain: 'Der Shingle-Algorithmus zerlegt Texte in Shingles (Wortfolgen fester Länge), um unstrukturierte Informationen vergleichbar zu machen, z. B. für den Jaccard-Koeffizienten.',
      },
    ],
    advanced: [
      {
        q: 'In der funktionsorientierten Klassifikations-Pyramide: Welche Systemart unterstützt die operative Basisebene (Einkauf, Lager, Produktion, Vertrieb)?',
        options: ['OLTP', 'CSCW', 'OLAP', 'Data Warehouse'],
        correct: 0,
        explain:
          'Die operative Basisebene mit Einkauf, Lager, Produktion, Vertrieb etc. wird laut Pyramide durch OLTP-Systeme unterstützt; CSCW steht für die mittlere Ebene (Personal, Planung, Finanzen) und OLAP für die Spitze (Controlling).',
      },
      {
        q: 'Welche Systemart steht laut Pyramide an der Spitze, dem Controlling zugeordnet?',
        options: ['OLAP', 'OLTP', 'CSCW', 'ERP'],
        correct: 0,
        explain: 'An der Spitze der Pyramide steht das Controlling, das durch OLAP-Systeme (mehrdimensionale Analyse) unterstützt wird.',
      },
      {
        q: 'Ein Manager erstellt anhand vorgefertigter, statischer Reports eine tagesaktuelle Liste offener Rechnungen für die Buchhaltung. Um welche Reporting-Art handelt es sich nach Christmann?',
        options: ['Operatives Reporting', 'Strategisches Reporting', 'Prediction', 'Clustering'],
        correct: 0,
        explain: 'Stichtagsbezogene, vorgefertigte, statische Reports auf Basis von Rohdaten für die Prozessabwicklung sind Merkmale des operativen Reportings – im Gegensatz zum historischen, dynamischen strategischen Reporting.',
      },
      {
        q: 'Welche Schicht der MIS-Architektur ist für Extraktion, Transformation und Laden der Daten zuständig?',
        options: ['ETL', 'Data Warehouse', 'OLAP', 'Operative Systeme'],
        correct: 0,
        explain: 'ETL (Extraktion, Transformation, Laden) überführt die Rohdaten aus den operativen Systemen in das Data Warehouse.',
      },
      {
        q: 'In welchem Quadranten der Entscheidungstypen-Matrix wird das Mahnwesen als Beispiel genannt?',
        options: [
          'Strukturierte Entscheidungen (hoher Strukturierungsgrad, operative Ebene)',
          'Unstrukturierte Entscheidungen (niedriger Strukturierungsgrad, Managementebene)',
          'Teilstrukturierte Entscheidungen auf mittlerer Ebene',
          'Es wird keinem Quadranten zugeordnet',
        ],
        correct: 0,
        explain: 'Mahnwesen ist eine formalisierte, routinierte, wiederholte Entscheidung auf operativer Ebene – also eine strukturierte Entscheidung, unterstützt durch operative Systeme (OLTP) oder KI.',
      },
      {
        q: 'Welches Beispiel wird der Kategorie "unstrukturierte Entscheidungen" zugeordnet?',
        options: ['Reaktion auf einen Umsatzrückgang', 'Mahnwesen', 'Automatische Rechnungsprüfung', 'Lagerbestandsführung'],
        correct: 0,
        explain: 'Die Reaktion auf einen Umsatzrückgang ist laut Vorlesung eine unstrukturierte, neuartige Entscheidung auf Managementebene, unterstützt durch MIS (OLAP) oder KI.',
      },
      {
        q: 'Ein Unternehmen möchte seine Kunden nach Umsatz in Wichtigkeitsklassen einteilen, wobei ein kleiner Teil der Kunden für einen Großteil des Umsatzes verantwortlich ist. Welches Verfahren passt dazu am besten?',
        options: ['ABC-Analyse', 'BCG-Matrix', 'k-Means-Clustering', 'Shingle-Algorithmus'],
        correct: 0,
        explain: 'Die ABC-Analyse bildet genau eine solche Rangfolge nach Wertanteil und Mengenanteil (z. B. 20 % Menge = 80 % Wert bei A-Objekten). Die BCG-Matrix bewertet dagegen Produkte nach Marktwachstum und Marktanteil.',
      },
      {
        q: 'Worin unterscheidet sich Klassifikation durch maschinelles Lernen grundsätzlich vom Clustern durch maschinelles Lernen?',
        options: [
          'Bei der Klassifikation müssen die Klassen im Vorfeld anhand annotierter Trainingsdaten bestimmt werden, beim Clustern werden die Gruppen erst aus den Daten selbst gebildet',
          'Klassifikation funktioniert nur mit Bildern, Clustern nur mit Zahlen',
          'Clustern benötigt zwingend einen Testdatensatz, Klassifikation nicht',
          'Beide Verfahren liefern immer identische Ergebnisse',
        ],
        correct: 0,
        explain: 'Bei der Klassifikation (z. B. Support Vector, neuronale Netze) müssen die Klassen vorab bestimmt und die Trainingsdaten annotiert werden. Beim Clustern (z. B. k-Means) sind die Gruppen dagegen vorher nicht bekannt.',
      },
    ],
    pro: [
      {
        q: 'Zwei Texte werden mit dem Shingle-Algorithmus in Shingles der Länge 3 zerlegt. Text A liefert 6 Shingles, Text B liefert 6 Shingles, davon sind 3 Shingles in beiden Texten identisch. Wie hoch ist der Jaccard-Koeffizient JK(A,B)?',
        options: ['1/3 (≈0,33)', '3/6 (0,5)', '3/12 (0,25)', '1 (Texte sind identisch)'],
        correct: 0,
        explain:
          'JK(A,B) = |Schnittmenge| / |Vereinigungsmenge|. Die Vereinigungsmenge hat 6+6-3=9 Shingles, die Schnittmenge 3 Shingles, also JK = 3/9 = 1/3. Die Antwort 3/6 verwechselt die Vereinigungsmenge mit der Shingle-Anzahl eines einzelnen Textes.',
      },
      {
        q: 'Produkt A wächst von 3,5 Mio. € auf 3,8 Mio. € Umsatz (relatives Wachstum ca. 8,6 %); der stärkste Wettbewerber erzielt 8 Mio. € Umsatz. Wie wird Produkt A in der BCG-Matrix eingeordnet?',
        options: [
          'Question Mark – hohes Marktwachstum, aber relativer Marktanteil unter 1',
          'Star – hohes Marktwachstum und relativer Marktanteil über 1',
          'Cash Cow – geringes Marktwachstum, aber hoher Marktanteil',
          'Poor Dog – geringes Marktwachstum und geringer Marktanteil',
        ],
        correct: 0,
        explain:
          'Der relative Marktanteil von A beträgt 3,8 Mio. € / 8 Mio. € ≈ 0,48 und liegt damit unter 1 (hinter dem Marktführer), während das Marktwachstum mit 8,6 % als hoch gilt – das ergibt "Question Mark". Bei einem relativen Marktanteil über 1 wäre A dagegen ein "Star".',
      },
      {
        q: 'Welche Aussage zur Entscheidungstypen-Matrix ist FALSCH?',
        options: [
          'Managementinformationssysteme (OLAP) unterstützen laut Matrix vor allem strukturierte, operative Entscheidungen',
          'Der Strukturierungsgrad einer Entscheidung sinkt tendenziell, je höher die zuständige Organisationsebene ist',
          'Strukturierte Entscheidungen sind formalisiert und wiederholen sich routiniert',
          'Künstliche Intelligenz wird sowohl für strukturierte als auch für unstrukturierte Entscheidungen als Unterstützung genannt',
        ],
        correct: 0,
        explain:
          'Laut Matrix unterstützen Managementinformationssysteme (OLAP) gerade die unstrukturierten Entscheidungen auf Managementebene, nicht die strukturierten operativen Entscheidungen – dafür stehen operative Systeme (OLTP).',
      },
      {
        q: 'Welche Aussage zur ABC-Analyse ist FALSCH?',
        options: [
          'A-, B- und C-Klassen werden ausschließlich anhand einer einzigen eindimensionalen Kennzahl gebildet',
          'Die Klassifikation erfolgt anhand eines zweidimensionalen Wertepaares aus Mengen- und Wertanteil',
          'A-Objekte machen typischerweise einen kleinen Mengenanteil, aber einen großen Wertanteil aus',
          'C-Objekte machen typischerweise einen großen Mengenanteil, aber nur einen kleinen Wertanteil aus',
        ],
        correct: 0,
        explain: 'Die ABC-Analyse basiert laut Vorlesung ausdrücklich auf einem zweidimensionalen Wertepaar (Mengenanteil und Wertanteil), nicht auf einer einzigen eindimensionalen Kennzahl.',
      },
      {
        q: 'Welche Aussage zum Vergleich von operativem und strategischem Reporting nach Christmann ist FALSCH?',
        options: [
          'Operatives Reporting arbeitet komplementär, indem alte Daten erhalten bleiben und neue hinzugefügt werden',
          'Strategisches Reporting ist historisch und zeitraumbezogen, operatives Reporting aktuell und stichtagsbezogen',
          'Operatives Reporting nutzt detaillierte Rohdaten, strategisches Reporting verdichtete Kennzahlen',
          'Strategisches Reporting baut Reports dynamisch per Drag-and-Drop ad hoc auf, operatives Reporting nutzt vorgefertigte, statische Reports',
        ],
        correct: 0,
        explain:
          'Genau umgekehrt: Das strategische Reporting arbeitet komplementär (alte Daten bleiben erhalten, neue kommen hinzu), während das operative Reporting konkurrierend arbeitet, weil alte Daten laufend geändert werden.',
      },
      {
        q: 'Ein Team möchte per überwachtem maschinellem Lernen automatisch erkennen, ob ein Hautfleck ein harmloses Muttermal oder ein Melanom ist. Was ist dafür zwingend erforderlich?',
        options: [
          'Ein annotierter Trainingsdatensatz, in dem die Klassen "Muttermal" und "Melanom" bereits vorab festgelegt sind',
          'Ein Clustering-Verfahren wie k-Means, da die Klassen vorab unbekannt sind',
          'Ein Jaccard-Koeffizient zum Vergleich der beiden Bilder',
          'Eine ABC-Analyse der Bilddaten nach Dateigröße',
        ],
        correct: 0,
        explain:
          'Bei der überwachten Klassifikation (z. B. mit Support-Vector-Maschinen oder neuronalen Netzen) müssen die Zielklassen vorab bestimmt und die Trainingsdaten entsprechend annotiert werden. Beim Clustern dagegen sind die Klassen gerade nicht im Vorfeld bekannt.',
      },
    ],
  },
};
