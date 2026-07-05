import type { LectureChapter } from '../types';

export const kapitel1: LectureChapter = {
  id: 'kapitel1',
  number: 1,
  title: 'Grundlagen der Wirtschaftsinformatik',
  subtitle: 'Implikationen der IT, Definition der Wirtschaftsinformatik und Aufbau eines Computers',
  icon: '📘',
  color: 'var(--entity)',
  tutorial: [
    {
      title: 'Zuboffs Law: Die Grundregel der Digitalisierung',
      content:
        'Die Wirtschaftswissenschaftlerin Shoshana Zuboff formulierte 1981 an der Harvard Business School drei Kernaussagen zum computergestützten Arbeiten (computer-mediated work). Erstens wird alles, was automatisiert werden kann, auch automatisiert. Zweitens wird alles, was informatisiert bzw. digitalisiert werden kann, auch informatisiert. Drittens wird jede digitale Anwendung, die sich für Überwachung und Steuerung eignet, auch dafür eingesetzt. Zuboffs Law beschreibt damit einen technologischen Sog: Was technisch möglich ist, setzt sich in der Praxis früher oder später durch.',
    },
    {
      title: 'IT does matter! – Neue Geschäftsmodelle ohne klassische Ressourcen',
      content:
        'Die Vorlesung zeigt an mehreren Beispielen, dass IT bestehende Branchenlogiken verändert: Der größte Content-Anbieter der Welt besitzt selbst keinen Content, das größte Taxiunternehmen der Welt besitzt keine Taxis, das größte Hotelunternehmen der Welt besitzt keine Immobilien, und der größte Einzelhändler der Welt besitzt kein eigenes Lager. Solche Plattformmodelle (typische Beispiele sind etwa Uber oder Airbnb) besitzen nicht die physischen Ressourcen, sondern organisieren über IT die Vermittlung zwischen Anbietern und Nachfragern. Das ist eine zentrale Implikation der IT für die Wirtschaft: Wertschöpfung verlagert sich von Besitz auf Vermittlung und Information.',
    },
    {
      title: 'Das Produktivitätsparadoxon: Does IT matter?',
      content:
        'Kritiker der IT-Investition argumentieren mit dem sogenannten Produktivitätsparadoxon: Weil IT allgemein verfügbar ist, verschafft sie keinen dauerhaften Wettbewerbsvorteil und sollte daher nur defensiv und kostenorientiert eingesetzt werden (Brynjolfsson 1993; Loveman 1994: „IT capital had little, if any, marginal impact on output or labor productivity“). Dem widerspricht die Studie von Brynjolfsson/Hitt (2003) anhand von 527 US-Unternehmen (1987–1994): Sie fanden eine signifikant positive Korrelation zwischen IT-Einsatz und Produktivität. Kurzfristig (unter 5 Jahren) ist der IT-Beitrag zum Output etwa proportional zu den IT-Kosten (Faktor 1), mittelfristig (5–7 Jahre) überproportional (bis Faktor 3), und je länger IT im Einsatz ist, desto stärker steigt ihr Beitrag zum Output (Faktor über 3). IT-Investitionen zahlen sich also erst mit zeitlicher Verzögerung und bei konsequenter Nutzung wirklich aus.',
    },
    {
      title: 'Industrielle Revolutionen und die Zukunft der Arbeit',
      content:
        'Die Wirtschaftsinformatik lässt sich in eine Abfolge von vier industriellen Revolutionen einordnen: die 1. (18. Jhdt., Mechanisierung durch die Dampfmaschine), die 2. (19. Jhdt., Elektrifizierung durch die Erfindung der Elektrizität), die 3. (20. Jhdt., Automatisierung und Informatisierung durch die Erfindung des Microchips) und die 4. (21. Jhdt., Smartisierung durch die Kombination unterschiedlicher Technik). Studien wie der „Automation Risk Index“ und Deloittes Prognose zur „Berufswelt bis 2035“ zeigen, dass diese Entwicklung Berufsbilder in Deutschland spürbar verändert. Auch der World Digital Competitiveness Index bildet ab, wie unterschiedlich gut Länder auf diese digitale Transformation vorbereitet sind.',
    },
    {
      title: 'Was ist Wirtschaftsinformatik?',
      content:
        'Wirtschaftsinformatik beschäftigt sich mit der Lösung betriebswirtschaftlicher Aufgaben mit Hilfe der Informations- und Kommunikationstechnologie (IKT). Im Zentrum steht ein Zusammenspiel aus vier Elementen: Menschen lösen Aufgaben, nutzen dafür IKT-Systeme und entwerfen die dazugehörige Infrastruktur. Aufgaben sind betriebliche Prozesse und Funktionen, IKT umfasst Hardware, Software und Netze, und Infrastruktur meint Maschinen, Anlagen und Werkzeuge. Dieses Modell (Menschen – Aufgaben – IKT – Infrastruktur, kurz ORGA/WI) macht deutlich, dass Wirtschaftsinformatik immer an der Schnittstelle zwischen Betriebswirtschaftslehre (den Aufgaben) und Informatik (der IKT) steht.',
    },
    {
      title: 'Architektur der Informationssysteme',
      content:
        'Ein Informationssystem lässt sich als Beschreibung der Prozesse, der Organisation, der Funktionen, der Daten und der Kommunikationsbeziehungen eines Unternehmens verstehen. Ausgehend von der Unternehmensstrategie unterscheidet man die Organisationsarchitektur mit den Ebenen Aufbau (das hierarchische Gerüst zur Zuweisung von Funktionen) und Ablauf (die funktionsübergreifende Verkettung von Funktionen zur Leistungserzeugung). Die Informationsarchitektur umfasst Daten (kodierte und nicht kodierte Informationen), Funktionen (die eigentlichen Arbeitsverrichtungen) und Kommunikation (z. B. on schedule, on event oder ad hoc). Die darunterliegende IKT-Infrastruktur stellt Datenverarbeitung (Erfassen, Ändern, Löschen, Anzeigen von Transaktionen), Datenübertragung (Netze) und Datenspeicherung (Datenbanken) bereit. Das Zusammenspiel dieser Ebenen wird als Business-IT-Alignment bezeichnet.',
    },
    {
      title: 'Was ist ein Computer? Die Musikbox-Analogie',
      content:
        'Um zu verstehen, was einen Computer ausmacht, nutzt die Vorlesung eine Analogie: Bei einer Musikbox erzeugt ein Tonkamm zusammen mit einer Tonwalze Musik; bei einem Computer erzeugt ein Prozessor zusammen mit Software das gewünschte Ergebnis. Formal gilt also: Prozessor + Software = Computer. Zu den historischen Wegbereitern dieser Idee zählen Konrad Zuse, Alan Turing und John von Neumann. Die Entwicklung der Computer selbst verlief in Wellen, vom Mainframe (1. Welle, ab 1940) über Minicomputer und Desktop-Automaten bis zu Client-Server-Systemen, Internet- und Mobile-Portalen sowie – als jüngste, 7. Welle – KI-gestütztem maschinellem Lernen und der Automatisierung unstrukturierter Entscheidungen.',
    },
    {
      title: 'Von-Neumann-Architektur und Prozessor-Befehle',
      content:
        'Ein Computer nach der Von-Neumann-Architektur gliedert sich in Eingabe/UI (z. B. Tastatur, Scanner, Maus), Verarbeitung (Prozessor und Hauptspeicher) und Ausgabe (z. B. Drucker, Monitor); dazu kommt der Massenspeicher zur dauerhaften Datenhaltung. Der Hauptspeicher enthält die unmittelbar vom Prozessor auszuführenden Programme und die dafür benötigten Daten. In Anlehnung an die Musikbox-Analogie hat ein Prozessor einen Befehlsvorrat von etwa 150 bis 500 Instruktionen (RISC- und CISC-Prozessoren unterscheiden sich in Umfang und Komplexität dieses Befehlssatzes) – so wie ein Tonkamm zwischen 7 und 90 Tonzungen besitzt. Diese Befehle lassen sich in vier Arten einteilen: Transferbefehle (bewegen Daten, ohne sie zu verändern), arithmetische Befehle (führen Rechenoperationen aus), logische Befehle (liefern über Vergleiche/Boolesche Algebra einen Wahrheitswert, z. B. AND/OR) und Ein-/Ausgabebefehle (lesen oder schreiben Daten über Peripheriegeräte). Nach Moore’s Law verdoppelt sich die Anzahl der Schaltkreise pro Fläche eines Prozessors – und damit seine Leistungsfähigkeit – alle zwei Jahre (geometrische Reihe mit Faktor 2: Y = a·2^x).',
    },
    {
      title: 'Bit, Byte und Speichermedien',
      content:
        'Das Bit ist die kleinste technische Einheit der Datenverarbeitung, das Byte (8 Bit, 256 Darstellungsmöglichkeiten) die kleinste logische Dateneinheit. Software wird auf unterschiedlichen Trägern gespeichert: elektronisch (z. B. flüchtiger DRAM-/SRAM-Arbeitsspeicher oder permanenter/semi-permanenter Speicher wie ROM, EPROM, Flash/USB-Stick/SSD), magnetisch (rotierend wie Festplatte oder Diskette, nicht rotierend wie Magnetband oder Magnetkarte) und optisch (CD, DVD, Blu-ray). Die Speichermedien unterscheiden sich deutlich in Schreib-/Lesegeschwindigkeit und Kapazität, vom sehr schnellen, aber teuren Arbeitsspeicher bis zum langsameren, aber sehr kapazitätsstarken Magnetband. Analog zu Moore’s Law besagt das Storage Law, dass sich die Anzahl der Bits pro Fläche eines Speicherchips – und damit seine Speicherkapazität – jedes Jahr verdoppelt.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Was besagt der erste Teil von Zuboffs Law?',
        options: [
          'Alles, was automatisiert werden kann, wird automatisiert werden.',
          'Alles muss von Menschen kontrolliert werden.',
          'IT bringt grundsätzlich keinen Wettbewerbsvorteil.',
          'Digitalisierung betrifft nur Großunternehmen.',
        ],
        correct: 0,
        explain:
          'Zuboffs erste These lautet, dass alles technisch Automatisierbare auch tatsächlich automatisiert wird. Die zwei weiteren Thesen betreffen Informatisierung/Digitalisierung sowie den Einsatz für Überwachung und Steuerung.',
      },
      {
        q: 'Wie definiert die Vorlesung Wirtschaftsinformatik?',
        options: [
          'Als reine Programmierausbildung für Softwareentwickler',
          'Als Lösung betriebswirtschaftlicher Aufgaben mit Hilfe der Informations- und Kommunikationstechnologie',
          'Als Teilgebiet der Betriebswirtschaftslehre ganz ohne IT-Bezug',
          'Als Synonym für die klassische Informatik',
        ],
        correct: 1,
        explain:
          'Wirtschaftsinformatik löst betriebswirtschaftliche Aufgaben mit Hilfe von IKT. Sie steht damit an der Schnittstelle zwischen Betriebswirtschaftslehre und Informatik, ist aber keines von beiden allein.',
      },
      {
        q: 'Welche drei Computerpioniere nennt die Vorlesung?',
        options: [
          'Steve Jobs, Bill Gates, Mark Zuckerberg',
          'Konrad Zuse, Alan Turing, John von Neumann',
          'Ada Lovelace, Charles Babbage, Blaise Pascal',
          'Tim Berners-Lee, Larry Page, Sergey Brin',
        ],
        correct: 1,
        explain: 'Als historische Wegbereiter der Computerentwicklung nennt die Vorlesung Konrad Zuse, Alan Turing und John von Neumann.',
      },
      {
        q: 'Wie lautet die Analogie „Prozessor + Software = ?“',
        options: ['Netzwerk', 'Betriebssystem', 'Computer', 'Algorithmus'],
        correct: 2,
        explain:
          'So wie Tonkamm und Tonwalze zusammen die Musikbox ergeben, ergeben Prozessor und Software zusammen den Computer.',
      },
      {
        q: 'Was ist laut Vorlesung die kleinste technische Einheit der Datenverarbeitung?',
        options: ['Byte', 'Bit', 'Wort (Word)', 'Zeichen'],
        correct: 1,
        explain: 'Das Bit ist die kleinste technische Einheit. Das Byte (8 Bit) ist die kleinste logische Dateneinheit.',
      },
      {
        q: 'Wie viele Darstellungsmöglichkeiten bietet ein Byte (8 Bit)?',
        options: ['8', '64', '128', '256'],
        correct: 3,
        explain: 'Ein Byte besteht aus 8 Bit und bietet damit 2^8 = 256 verschiedene Darstellungsmöglichkeiten.',
      },
      {
        q: 'Aus welchen drei Bereichen besteht die Von-Neumann-Architektur laut Vorlesung?',
        options: [
          'Eingabe, Verarbeitung, Ausgabe',
          'Hardware, Software, Netzwerk',
          'Strategie, Taktik, Operation',
          'Daten, Funktionen, Kommunikation',
        ],
        correct: 0,
        explain:
          'Die Vorlesung gliedert den Computer in Eingabe/UI (Tastatur, Scanner, Maus), Verarbeitung (Prozessor, Hauptspeicher) und Ausgabe (Drucker, Monitor), ergänzt um den Massenspeicher.',
      },
      {
        q: 'Wodurch wurde die 3. industrielle Revolution laut Vorlesung ausgelöst?',
        options: [
          'Die Erfindung der Dampfmaschine',
          'Die Erfindung der Elektrizität',
          'Die Erfindung des Microchips',
          'Die Kombination unterschiedlicher Technik (Smartisierung)',
        ],
        correct: 2,
        explain:
          'Die 3. industrielle Revolution (20. Jhdt.) steht für Automatisierung und Informatisierung durch die Erfindung des Microchips. Dampfmaschine (1.), Elektrizität (2.) und Smartisierung (4.) gehören zu anderen Stufen.',
      },
    ],
    advanced: [
      {
        q: 'Welche Kernaussage macht die Studie von Brynjolfsson/Hitt (2003) zum Verhältnis von IT-Einsatz und Produktivität?',
        options: [
          'Es besteht keine Korrelation zwischen IT-Einsatz und Produktivität.',
          'Es besteht eine signifikant positive Korrelation, die mit der Dauer des IT-Einsatzes sogar zunimmt.',
          'IT-Einsatz wirkt sich nur kurzfristig positiv, langfristig aber negativ aus.',
          'Nur sehr große Unternehmen profitieren von IT-Investitionen.',
        ],
        correct: 1,
        explain:
          'Brynjolfsson/Hitt fanden eine positive Korrelation, die mit zunehmender Einsatzdauer der IT sogar überproportional ansteigt (von Faktor 1 kurzfristig auf über Faktor 3 langfristig) — eine Gegenposition zum „Does IT matter?“-Argument.',
      },
      {
        q: 'Welches Argument wird beim „Does IT matter?“-Standpunkt (Kritik an IT-Investitionen) vorgebracht?',
        options: [
          'IT sei allgemein verfügbar und verschaffe deshalb keinen Wettbewerbsvorteil, weshalb nur ein kostenorientierter, defensiver Einsatz sinnvoll sei.',
          'IT-Investitionen würden immer zu einem proportionalen Produktivitätsgewinn führen.',
          'IT sei ein knappes Gut, über das sich Unternehmen dauerhaft differenzieren könnten.',
          'IT-Kosten seien grundsätzlich vernachlässigbar.',
        ],
        correct: 0,
        explain:
          'Der „Does IT matter?“-Standpunkt argumentiert, dass allgemein verfügbare IT keinen dauerhaften Wettbewerbsvorteil bringt und daher nur defensiv/kostenorientiert eingesetzt werden sollte (Produktivitätsparadoxon).',
      },
      {
        q: 'Was unterscheidet die Organisationsarchitektur von der Informationsarchitektur in der „Architektur der Informationssysteme“?',
        options: [
          'Organisationsarchitektur betrifft Aufbau/Ablauf der Organisation, Informationsarchitektur betrifft Daten, Funktionen und Kommunikation.',
          'Beide beschreiben ausschließlich die IKT-Infrastruktur.',
          'Organisationsarchitektur ist nur für Software zuständig, Informationsarchitektur nur für Hardware.',
          'Es gibt keinen inhaltlichen Unterschied, beide Begriffe sind Synonyme.',
        ],
        correct: 0,
        explain:
          'Die Organisationsarchitektur beschreibt Aufbau (hierarchisches Gerüst) und Ablauf (funktionsübergreifende Verkettung), die Informationsarchitektur dagegen Daten, Funktionen und Kommunikation.',
      },
      {
        q: 'Im Modell „Menschen – Aufgaben – IKT – Infrastruktur“: Wozu zählen Prozesse und Funktionen?',
        options: ['Zu den Menschen', 'Zu den Aufgaben', 'Zur IKT', 'Zur Infrastruktur'],
        correct: 1,
        explain:
          'Aufgaben umfassen laut Vorlesung betriebliche Prozesse und Funktionen. IKT meint Hardware/Software/Netze, Infrastruktur meint Maschinen/Anlagen/Werkzeuge.',
      },
      {
        q: 'Zu welcher Kategorie von Prozessorbefehlen gehören logische Verknüpfungen wie AND und OR?',
        options: ['Transferbefehle', 'Arithmetische Befehle', 'Logische Befehle', 'Ein-/Ausgabebefehle'],
        correct: 2,
        explain:
          'Logische Befehle liefern über Vergleiche (Boolesche Algebra) einen Wahrheitswert — dazu zählen Verknüpfungen wie AND und OR.',
      },
      {
        q: 'Wie überträgt die Vorlesung die „Musikbox-Analogie“ auf den Befehlsvorrat eines Prozessors?',
        options: [
          'Ein Prozessor hat zwischen 50 und 500 Befehlen, vergleichbar mit den 7 bis 90 Tonzungen eines Tonkamms.',
          'Prozessor und Tonkamm haben exakt die gleiche Anzahl an Funktionen.',
          'Der Tonkamm hat mehr Funktionen als jeder moderne Prozessor.',
          'Die Analogie bezieht sich ausschließlich auf die Speicherkapazität.',
        ],
        correct: 0,
        explain:
          'Ein Prozessor verfügt über einen Befehlsvorrat von etwa 50 bis 500 (genauer: 150–500) Befehlen, ein Tonkamm über 7 bis 90 Tonzungen — beides sind endliche „Repertoires“, aus denen das jeweilige Gerät schöpft.',
      },
      {
        q: 'Was besagt Moore’s Law konkret?',
        options: [
          'Die Anzahl der Schaltkreise pro Fläche eines Prozessors (und damit seine Leistungsfähigkeit) verdoppelt sich alle zwei Jahre.',
          'Die Speicherkapazität von Prozessoren sinkt jährlich um die Hälfte.',
          'Die Kosten für Prozessoren verdoppeln sich jährlich.',
          'Software wird jedes Jahr doppelt so komplex.',
        ],
        correct: 0,
        explain:
          'Moore’s Law beschreibt eine geometrische Reihe mit Faktor 2: Die Schaltkreisdichte eines Prozessors verdoppelt sich alle zwei Jahre (Y = a·2^x).',
      },
    ],
    pro: [
      {
        q: 'Welche der folgenden Beschreibungen trifft das Produktivitätsparadoxon der Informationstechnologie am treffendsten?',
        options: [
          'Das Paradoxon illustriert, dass beträchtliche Investitionen in IT nicht unmittelbar zu einer Steigerung der betrieblichen Effizienz führen, was teilweise auf verzögerte Anpassungen, suboptimale Nutzung der Technologie und mangelnde Integration in bestehende Geschäftsprozesse zurückzuführen ist.',
          'Es beschreibt das Phänomen, dass Unternehmen, die massiv in IT investieren, eine verzögerte und proportionale Steigerung der Produktivität erfahren, was oft auf die effiziente Reallokation von Ressourcen und die Automatisierung von Arbeitsabläufen zurückzuführen ist.',
          'Das Paradoxon bezieht sich auf die Beobachtung, dass erhöhte IT-Ausgaben zwangsläufig zu einer Verringerung der menschlichen Arbeitskräfte führen, wodurch zwar die Betriebskosten gesenkt, aber die unternehmerische Innovationsfähigkeit beeinträchtigt werden.',
          'Das Paradoxon besagt, dass IT-Investitionen grundsätzlich unterbleiben sollten, da sie nachweislich nie einen Effekt auf die Produktivität haben.',
        ],
        correct: 0,
        explain:
          'Der Kern des Paradoxons ist, dass hohe IT-Investitionen sich nicht unmittelbar in Effizienzsteigerungen niederschlagen — u. a. wegen Anpassungsverzögerungen und suboptimaler Nutzung. Option B unterstellt fälschlich eine automatisch „proportionale Steigerung“, Option C behauptet fälschlich einen zwangsläufigen Stellenabbau als Kernaussage.',
      },
      {
        q: 'Ausgehend von 1.000.000 Schaltkreisen pro cm² eines Prozessors: Wie viele Schaltkreise befinden sich nach dem Moore’s Law nach 3 vollständigen Verdopplungszyklen (also 6 Jahren) auf derselben Fläche?',
        options: ['2.000.000', '4.000.000', '8.000.000', '16.000.000'],
        correct: 2,
        explain:
          'Nach Moore’s Law gilt Y = a·2^x. Mit a = 1.000.000 und x = 3 Zyklen ergibt sich Y = 1.000.000 · 2³ = 8.000.000. 2.000.000 entspräche nur einem Zyklus, 16.000.000 vier Zyklen (8 Jahren).',
      },
      {
        q: 'Eine SSD hat zu Beginn des Jahres 2018 eine Kapazität von 100 Terabyte. Nach dem Storage Law verdoppelt sich die Speicherkapazität jedes Jahr. Welche Kapazität hätte eine vergleichbare SSD demnach zu Beginn des Jahres 2015 gehabt?',
        options: ['12,5 Terabyte', '25 Terabyte', '50 Terabyte', '6,25 Terabyte'],
        correct: 0,
        explain:
          'Rückwärts gerechnet halbiert sich die Kapazität pro Jahr: 100 TB (2018) → 50 TB (2017) → 25 TB (2016) → 12,5 TB (2015).',
      },
      {
        q: 'Welche Aussage zu den vier industriellen Revolutionen ist FALSCH?',
        options: [
          'Die 1. industrielle Revolution wurde im 18. Jahrhundert durch die Dampfmaschine ausgelöst.',
          'Die 2. industrielle Revolution brachte die Elektrifizierung im 19. Jahrhundert.',
          'Die 3. industrielle Revolution wird durch Mechanisierung mittels Dampfmaschine charakterisiert.',
          'Die 4. industrielle Revolution steht für Smartisierung durch die Kombination unterschiedlicher Technik im 21. Jahrhundert.',
        ],
        correct: 2,
        explain:
          'Mechanisierung durch die Dampfmaschine kennzeichnet die 1. industrielle Revolution (18. Jhdt.), nicht die 3. Die 3. Revolution steht für Automatisierung/Informatisierung durch die Erfindung des Microchips (20. Jhdt.).',
      },
      {
        q: 'Welche Aussage zu Speichermedien ist FALSCH?',
        options: [
          'DRAM und SRAM sind flüchtige, elektronische Speicher.',
          'Eine Festplatte gehört zu den rotierenden magnetischen Speichermedien.',
          'Eine CD ist ein Beispiel für einen optischen Softwareträger.',
          'Ein Magnetband gehört zu den elektronischen, permanenten Speichermedien.',
        ],
        correct: 3,
        explain:
          'Ein Magnetband ist ein magnetischer, nicht rotierender Softwareträger — kein elektronischer Speicher. Elektronische Speicher sind laut Vorlesung z. B. DRAM/SRAM (flüchtig) oder ROM/Flash (permanent bzw. semi-permanent).',
      },
      {
        q: 'Welche Aussage bringt die „IT does matter!“-Position (Brynjolfsson/Hitt) NICHT zum Ausdruck?',
        options: [
          'Es gibt eine signifikant positive Korrelation zwischen IT-Einsatz und Produktivität.',
          'Kurzfristig ist der IT-Beitrag zum Output etwa proportional zu den IT-Kosten.',
          'IT ist allgemein verfügbar und verschafft deshalb grundsätzlich keinen Wettbewerbsvorteil.',
          'Mit zunehmender Einsatzdauer steigt der Beitrag der IT zum Output überproportional an.',
        ],
        correct: 2,
        explain:
          'Diese Aussage ist das Kernargument der Gegenposition „Does IT matter?“ (IT als austauschbares Gut ohne Wettbewerbsvorteil) — nicht der empirisch gestützten „IT does matter!“-Position von Brynjolfsson/Hitt.',
      },
    ],
  },
};
