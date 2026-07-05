import type { LectureChapter } from '../types';

export const kapitel8: LectureChapter = {
  id: 'kapitel8',
  number: 8,
  title: 'Interne Informationssysteme',
  subtitle:
    'Betriebliche Informationssysteme in Rechnungswesen, Logistik und Personal – Klassifikation nach Funktion und Kommunikation, Integration zu ERP-Systemen',
  icon: '🏢',
  color: 'var(--pk)',
  tutorial: [
    {
      title: 'Zwei Klassifikationsansätze für betriebliche Informationssysteme',
      content:
        'Betriebliche Informationssysteme können nach der Art der unterstützten Funktion (funktionsorientiert) oder nach der Art der unterstützten Kommunikation (kommunikationsorientiert) klassifiziert werden. Die funktionsorientierte Klassifikation ordnet Systeme nach dem Grad der Prozessstrukturierung als OLTP-, CSCW- oder Controlling-Systeme (OLAP) ein. Die kommunikationsorientierte Klassifikation unterscheidet dagegen anhand des Informations- und Warenflusses zwischen externen Infosystemen (Richtung Beschaffungsmarkt/Lieferanten bzw. Absatzmarkt/Kunden) und internen Infosystemen innerhalb des Unternehmens.',
    },
    {
      title: 'Die Pyramide: OLTP, CSCW und Controlling (OLAP)',
      content:
        'Die funktionsorientierte Klassifikation ordnet die operativen Funktionen Einkauf, Produktion, Lager, ReWe und Vertrieb an der Basis einer Pyramide als OLTP-Systeme ein – sie unterstützen hochstrukturierte, tägliche Geschäftsprozesse. Auf mittlerer Ebene liegen Personal, Planung/Entwicklung und Finanzen als CSCW-Systeme, die die kooperative Gruppenarbeit unterstützen. An der Spitze steht Controlling, das mit OLAP-Technologie (Online Analytical Processing) arbeitet; hier ist der Grad der Prozessstrukturierung am geringsten. Parallel dazu verläuft die vertikale Integration: operative Daten werden von der OLTP-Ebene über CSCW bis zum Controlling verdichtet und als Entscheidungsgrundlage aufbereitet.',
    },
    {
      title: 'OLTP-Systeme: Funktionen und Datenbank',
      content:
        'ERP-Systeme sind aus funktionaler Sicht OLTP-Systeme (Online Transaction Processing) und unterstützen vorwiegend operative Tätigkeiten wie die Abrechnung von Massendaten oder die Verwaltung von Beständen sowie die Vorbereitung dispositiver Entscheidungen wie Liquiditätsplanung, Mahn- oder Bestellwesen. Ihre typische informationstechnische Struktur besteht aus Datenverwaltung, Verarbeitung und Reporting. Die zugehörige Datenbank ist auf schnelle, exklusive Schreibzugriffe auf Einzelsätze ausgelegt, überschreibt Daten bei Änderungen, archiviert lediglich Altdaten, kennt ihre Reports bereits im Voraus und ist geschäftsprozessorientiert modelliert.',
    },
    {
      title: 'CSCW-Systeme: Gruppenarbeit koordinieren',
      content:
        'CSCW (Computer Supported Cooperative Work) bezeichnet Informationssysteme, die Gruppenarbeit unterstützen und sich auf die Koordination von Arbeitsleistungen bezüglich Inhalt, Menge, Zeit und Ort der Arbeit konzentrieren. Die Klassifikation von CSCW-Systemen basiert auf einer Raum-Zeit-Matrix, die Systeme danach unterscheidet, ob die Beteiligten am gleichen oder unterschiedlichen Ort und zur gleichen oder unterschiedlichen Zeit zusammenarbeiten. Typische Beispiele sind Präsentationssysteme, Sitzungsunterstützungssysteme, Dokumentenmanagementsysteme, Videokonferenzsysteme und Chat-Systeme.',
    },
    {
      title: 'Isolierte vs. integrierte interne Infosysteme',
      content:
        'Isolierte interne betriebliche Infosysteme bearbeiten Funktionen wie Einkauf, Produktion, Lager, Personal, ReWe und Vertrieb jeweils über eine eigene Benutzeroberfläche und eine eigene, getrennte Datenbank – dadurch entstehen redundante Daten, z. B. wird „Material" in der Einkaufs-, der Produktions- und der Lager-Datenbank jeweils separat gehalten. Integrierte interne betriebliche Infosysteme (ERP-Systeme) bearbeiten dieselben zentralen Funktionen dagegen über eine gemeinsame Benutzeroberfläche und eine einzige gemeinsame Datenbank, in der z. B. Lieferant und Kreditor bzw. Kunde und Debitor näherungsweise denselben Datenbestand nutzen. Diese Zusammenführung der operativen Funktionen wird als horizontale Integration bezeichnet.',
    },
    {
      title: 'Klassifikationsdimensionen eines ERP-Systems: Wo, Was, Wer, Wie',
      content:
        'Ein ERP-System lässt sich zusätzlich anhand von vier Dimensionen einordnen. Die organisatorische Dimension („Wo?") umfasst Buchungskreis, Werk, Verkaufs-/Einkaufsorganisation und Lagerort. Die datentypische Dimension („Was?") unterscheidet Stammdaten, Bewegungsdaten, Organisationsdaten und Konfigurationsdaten. Die akteursbezogene Dimension („Wer?") betrifft Person, Kunde, Lieferant und Sachkonto, während die prozessuale Dimension („Wie?") Vorgänge wie Bestellung, Angebot, Kundenauftrag und Transportauftrag beschreibt.',
    },
    {
      title: 'Rechnungswesen: Stammdaten und Integration von externem und internem ReWe',
      content:
        'Im Rechnungswesen sind Sachkonten (Bilanz-/Erfolgskonten) zentrale Stammdaten, die die Wertbewegungen einer Buchungsperiode im Buchungskreis umfassen; sie gliedern sich u. a. in Vermögens-, Verbindlichkeits-, Aufwands- und Erlöskonten. Der Kreditor ist ein Personenkonto für Geschäftspartner, gegenüber denen Verbindlichkeiten bestehen (z. B. Lieferant, Bank), der Debitor eines für Geschäftspartner, gegenüber denen Forderungen bestehen (z. B. Kunde). Die Kostenart klassifiziert Kosten der Leistungserstellung und -verwertung, die Erlösart den operativen Vertrieb, jeweils innerhalb eines Kostenrechnungskreises. Da jede Kosten-/Erlösart einem Erfolgskonto im Kontenplan entspricht, fließen Aufwands- und Erlöskonten aus dem externen ReWe automatisch als Kostenarten und Erlösarten in die Kosten- und Leistungsrechnung des internen ReWe ein – etwa beim Invoice-to-Pay-Prozess (ITP), bei dem Aufwand, Verbindlichkeit und Zahlungsausgang im externen ReWe gebucht werden, während parallel der Ist-Verbrauch im internen ReWe erfasst wird.',
    },
    {
      title: 'Logistik: Stammdaten, Bewegungsdaten und Kernprozesse',
      content:
        'In der Logistik ist der Materialstamm das zentrale Datenobjekt – Material wird gehandelt, gefertigt, verbraucht, eingekauft oder erzeugt; Dienstleistungen gelten dagegen als immateriell und zum Zeitpunkt der Erbringung bereits verbraucht, sie können weder gelagert noch transportiert werden. Im Einkauf durchläuft ein Vorgang typischerweise BANF, Bestellung, externe Einlieferung, Lieferantenrechnung und Auszahlung, im Vertrieb analog Angebot, Kundenauftrag, externe Auslieferung, Faktura und Einzahlung. Bei Procure to Stock (PTS) wird für das Lager beschafft und Bestand gebucht, bei Procure to Pay (PTP) wird für den Verbrauch beschafft und direkt Aufwand gebucht. Bei Order to Cash (OTC) wird aus vorhandenem Lagerbestand verkauft, bei Procure to Order (PTO) wird bei fehlendem Bestand zusätzlich eine Bestellung beim Lieferanten ausgelöst, bevor die Ware ausgeliefert werden kann. Das Cash Management verknüpft Kreditoren-, Debitoren- und Bankbuch, um Forderungen und Verbindlichkeiten kurz- und langfristig abzustimmen.',
    },
    {
      title: 'Personal: Organisationsstruktur und Prozesse',
      content:
        'Die Organisationsstruktur ist ein hierarchisches Gerüst, in dem eine Organisationseinheit (z. B. Einkauf) eine oder mehrere Planstellen enthält (z. B. Einkäufer Trockenware), die wiederum mit einer Person besetzt werden; eine Planstelle kann besetzt, vakant, unbesetzt oder obsolet sein. Der Personalstammsatz ist der zentrale Träger aller für HR-Prozesse notwendigen Informationen und kann Bewerber, Mitarbeiter oder ehemalige Mitarbeiter betreffen. Bei der Zeitwirtschaft unterscheidet man die Negativzeitwirtschaft, bei der nur Fehlzeiten manuell erfasst werden und die Differenz zur Sollarbeitszeit die Anwesenheit ergibt, von der Positivzeitwirtschaft, bei der alle Zeitereignisse i. d. R. automatisch über Zeitterminals erfasst werden. Der Hire-to-Fire/Hire-to-Retire-Prozess (HTF/HTR) beschreibt die Beschaffung von Personal von der Ausschreibung über das Vorstellungsgespräch und die Einstellung bis zur Durchführung der Payroll.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Wofür steht die Abkürzung OLTP?',
        options: [
          'Online Transaction Processing',
          'Online Transformation Process',
          'Operational Task Processing',
          'Object Linked Transaction Protocol',
        ],
        correct: 0,
        explain:
          'OLTP steht für Online Transaction Processing und bezeichnet Systeme, die operative Tätigkeiten und die tägliche Transaktionsabwicklung unterstützen.',
      },
      {
        q: 'Welche betriebliche Funktion steht in der funktionsorientierten Klassifikation an der Spitze der Pyramide?',
        options: ['Vertrieb', 'Personal', 'Controlling', 'Einkauf'],
        correct: 2,
        explain:
          'An der Spitze der Pyramide steht Controlling, das mit OLAP-Technologie arbeitet, während die operativen Funktionen wie Einkauf und Vertrieb die Basis (OLTP) bilden.',
      },
      {
        q: 'Wofür steht die Abkürzung CSCW?',
        options: [
          'Computer Supported Cooperative Work',
          'Central System Control Workflow',
          'Computerized Sales and Customer Workflow',
          'Corporate Software Configuration Wizard',
        ],
        correct: 0,
        explain: 'CSCW steht für Computer Supported Cooperative Work – Informationssysteme, die Gruppenarbeit unterstützen.',
      },
      {
        q: 'Welches Datenobjekt gilt in der Logistik als zentrales Datenobjekt, mit dem gehandelt wird und das gefertigt, verbraucht oder eingekauft wird?',
        options: ['Der Materialstamm', 'Der Kunde', 'Der Kreditor', 'Die Planstelle'],
        correct: 0,
        explain:
          'Der Materialstamm ist laut Vorlesung das zentrale Datenobjekt der Logistik: Mit einem Material wird gehandelt, es wird gefertigt, verbraucht, eingekauft oder erzeugt.',
      },
      {
        q: 'Was ist ein Kreditor?',
        options: [
          'Ein Geschäftspartner, gegenüber dem Forderungen bestehen',
          'Ein Geschäftspartner, gegenüber dem Verbindlichkeiten bestehen',
          'Eine Klassifikation von Kosten innerhalb eines Kostenrechnungskreises',
          'Ein Sachkonto für Erlöse',
        ],
        correct: 1,
        explain:
          'Der Kreditor ist ein Personenkonto für Geschäftspartner, gegenüber denen Verbindlichkeiten bestehen (z. B. Lieferant); der Debitor ist dagegen für Forderungen zuständig (z. B. Kunde).',
      },
      {
        q: 'Wodurch ist die kommunikationsorientierte Klassifikation betrieblicher Infosysteme gekennzeichnet?',
        options: [
          'Sie unterscheidet Systeme nach dem Grad der Prozessstrukturierung',
          'Sie unterscheidet anhand des Informations- und Warenflusses zwischen externen und internen Infosystemen',
          'Sie unterscheidet nach Personal-, Finanz- und Logistiksystemen',
          'Sie unterscheidet nach Stamm- und Bewegungsdaten',
        ],
        correct: 1,
        explain:
          'Die kommunikationsorientierte Klassifikation grenzt anhand des Informations- und Warenflusses externe Infosysteme (Richtung Lieferanten/Kunden) von internen Infosystemen ab; die Einteilung nach Prozessstrukturierung ist dagegen die funktionsorientierte Klassifikation.',
      },
      {
        q: 'Was repräsentiert eine Planstelle?',
        options: [
          'Eine natürliche Person',
          'Eine von einer Person zu besetzende Position im Besetzungsplan einer Organisationseinheit',
          'Ein Sachkonto im Kontenplan',
          'Einen externen Geschäftspartner',
        ],
        correct: 1,
        explain:
          'Die Planstelle repräsentiert eine von einer Person zu besetzende Position im Besetzungsplan einer Organisationseinheit, z. B. Sachbearbeiter; die Person selbst ist ein eigenes Stammdatenobjekt.',
      },
      {
        q: 'Welche zwei Formen der Zeitwirtschaft werden in der Vorlesung unterschieden?',
        options: [
          'Online- und Offline-Zeitwirtschaft',
          'Positiv- und Negativzeitwirtschaft',
          'Interne und externe Zeitwirtschaft',
          'Manuelle und automatische Zeitwirtschaft',
        ],
        correct: 1,
        explain:
          'Bei der Negativzeitwirtschaft werden nur Fehlzeiten manuell erfasst, bei der Positivzeitwirtschaft werden alle Zeitereignisse i. d. R. automatisch über Zeitterminals erfasst.',
      },
    ],
    advanced: [
      {
        q: 'Was ist der wesentliche Unterschied zwischen isolierten und integrierten internen betrieblichen Infosystemen?',
        options: [
          'Isolierte Systeme besitzen je Funktion eine eigene Datenbank, integrierte Systeme (ERP) teilen sich eine gemeinsame Datenbank',
          'Isolierte Systeme unterstützen nur Controlling, integrierte nur OLTP',
          'Integrierte Systeme besitzen keine Benutzeroberfläche',
          'Isolierte Systeme werden ausschließlich im Personalwesen eingesetzt',
        ],
        correct: 0,
        explain:
          'Bei isolierten Systemen hat jede Funktion (Einkauf, Produktion, Lager usw.) eine eigene Benutzeroberfläche UND eine eigene Datenbank mit redundanten Daten; ERP-Systeme führen dies zu einer gemeinsamen Datenbank zusammen.',
      },
      {
        q: 'Welche Aussage zur Datenbank eines OLTP-Systems trifft zu?',
        options: [
          'Daten werden bei Änderungen überschrieben, Schreibzugriffe erfolgen schnell und exklusiv auf Einzelsätze',
          'Die Datenbank speichert ausschließlich historische, mehrdimensional verdichtete Daten',
          'Reports sind grundsätzlich nicht im Voraus bekannt, sondern werden stets ad hoc generiert',
          'Die Datenmodellierung erfolgt unabhängig von den Geschäftsprozessen',
        ],
        correct: 0,
        explain:
          'Laut Vorlesung sind OLTP-Datenbanken auf schnelle, exklusive Schreibzugriffe auf Einzelsätze ausgelegt und überschreiben Daten bei Änderungen; Reports sind im Voraus bekannt, und die Modellierung ist geschäftsprozessorientiert.',
      },
      {
        q: 'Worin unterscheidet sich Procure to Stock (PTS) von Procure to Pay (PTP)?',
        options: [
          'PTS bucht beim Wareneingang direkt Aufwand, PTP bucht Bestand',
          'PTS beschafft für das Lager und bucht Bestand, PTP beschafft für den Verbrauch und bucht direkt Aufwand',
          'PTS und PTP sind identische Prozesse mit unterschiedlichem Namen',
          'PTP kommt ausschließlich im Vertrieb vor',
        ],
        correct: 1,
        explain:
          'Procure to Stock beschafft Material für das Lager, sodass bei Wareneingang Bestand gebucht wird; Procure to Pay beschafft für den direkten Verbrauch, sodass statt Bestand sofort Aufwand gebucht wird.',
      },
      {
        q: 'Worin unterscheidet sich Order to Cash (OTC) von Procure to Order (PTO)?',
        options: [
          'Bei OTC wird aus vorhandenem Lagerbestand verkauft, bei PTO wird bei fehlendem Bestand zusätzlich eine Bestellung beim Lieferanten ausgelöst',
          'OTC betrifft nur den Einkauf, PTO nur den Vertrieb',
          'Bei PTO wird grundsätzlich keine Faktura erstellt',
          'OTC und PTO unterscheiden sich nur in der Zahlungsart',
        ],
        correct: 0,
        explain:
          'Bei Order to Cash ist die Ware bereits auf Lager und wird direkt ausgeliefert; bei Procure to Order prüft der Prozess erst, ob Bestand vorhanden ist, und löst bei Fehlmengen eine zusätzliche Bestellung im Einkauf aus.',
      },
      {
        q: 'Welche zwei Dimensionen bilden die Raum-Zeit-Matrix zur Klassifikation von CSCW-Systemen?',
        options: [
          'Intern/Extern und Stammdaten/Bewegungsdaten',
          'Gleicher/unterschiedlicher Ort und gleiche/unterschiedliche Zeit',
          'Operative und dispositive Entscheidungen',
          'Horizontale und vertikale Integration',
        ],
        correct: 1,
        explain:
          'Die Raum-Zeit-Matrix unterscheidet CSCW-Systeme danach, ob die Beteiligten am gleichen oder unterschiedlichen Ort und zur gleichen oder unterschiedlichen Zeit zusammenarbeiten.',
      },
      {
        q: 'Welche Aussage zur horizontalen und vertikalen Integration in der Pyramide betrieblicher Infosysteme trifft zu?',
        options: [
          'Horizontale Integration verbindet die operativen Funktionen wie Einkauf, Produktion, Lager und Vertrieb auf der OLTP-Ebene; vertikale Integration verdichtet Daten von OLTP über CSCW bis zum Controlling/OLAP',
          'Horizontale Integration verbindet ausschließlich Personal und Finanzen',
          'Vertikale Integration findet ausschließlich innerhalb der Logistik statt',
          'Horizontale und vertikale Integration sind Synonyme für denselben Sachverhalt',
        ],
        correct: 0,
        explain:
          'Horizontale Integration betrifft laut Pyramiden-Grafik die Verknüpfung der operativen Funktionen auf gleicher (OLTP-)Ebene, während vertikale Integration die Verdichtung operativer Daten nach oben bis zum Controlling meint – beide Achsen sind unterschiedliche Konzepte.',
      },
      {
        q: 'Welche Reihenfolge der wichtigsten Bewegungsdaten im Einkauf ist laut Vorlesung korrekt?',
        options: [
          'Bestellung, BANF, Auszahlung, Lieferantenrechnung, Einlieferung',
          'BANF, Bestellung, externe Einlieferung, Lieferantenrechnung, Auszahlung',
          'Einlieferung, BANF, Bestellung, Auszahlung, Lieferantenrechnung',
          'Lieferantenrechnung, BANF, Bestellung, Einlieferung, Auszahlung',
        ],
        correct: 1,
        explain:
          'Der Einkaufsprozess durchläuft laut Vorlesung die Schritte BANF, Bestellung, externe Einlieferung, Lieferantenrechnung und schließlich Auszahlung.',
      },
      {
        q: 'Welche Aussage zu Kostenart und Erlösart trifft zu?',
        options: [
          'Beide klassifizieren identische Vorgänge und sind gegeneinander austauschbar',
          'Die Kostenart klassifiziert Kosten der Leistungserstellung und -verwertung, die Erlösart den operativen Vertrieb, jeweils innerhalb eines Kostenrechnungskreises',
          'Kostenart betrifft nur das externe ReWe, Erlösart nur das interne ReWe',
          'Erlösart ist ein Synonym für Sachkonto',
        ],
        correct: 1,
        explain:
          'Die Kostenart klassifiziert alle Kosten, die bei der Erstellung und Verwertung von Leistungen entstehen, die Erlösart dagegen klassifiziert den operativen Vertrieb – beide jeweils innerhalb eines Kostenrechnungskreises im internen ReWe.',
      },
    ],
    pro: [
      {
        q: 'Welche Aussage zur Pyramide betrieblicher Infosysteme (OLTP/CSCW/Controlling) ist FALSCH?',
        options: [
          'OLTP-Systeme bilden die Basis der Pyramide und unterstützen hochstrukturierte operative Prozesse.',
          'CSCW-Systeme liegen auf mittlerer Ebene und umfassen u. a. Personal, Planung/Entwicklung und Finanzen.',
          'Controlling steht an der Spitze der Pyramide und arbeitet mit OLAP-Technologie.',
          'Horizontale Integration bezeichnet die Verdichtung operativer Daten zu Entscheidungsgrundlagen für das Controlling.',
        ],
        correct: 3,
        explain:
          'Die Verdichtung operativer Daten für Entscheidungen des Controllings ist die vertikale Integration; horizontale Integration bezeichnet dagegen die Verknüpfung der operativen Funktionen (Einkauf, Produktion, Lager, ReWe, Vertrieb) auf derselben OLTP-Ebene.',
      },
      {
        q: 'Für eine Weihnachtsfeier bestellen Sie 250 Flaschen Mineralwasser bei einem Lieferanten, die direkt konsumiert (verbraucht) werden. Der Lieferant liefert in zwei Teillieferungen. Um welchen logistischen Prozess handelt es sich?',
        options: ['Procure to Stock (PTS)', 'Procure to Pay (PTP)', 'Order to Cash (OTC)', 'Procure to Order (PTO)'],
        correct: 1,
        explain:
          'Da die Ware nicht ins Lager eingelagert, sondern direkt verbraucht wird, handelt es sich um Procure to Pay (PTP) – hier wird beim Wareneingang statt Bestand direkt Aufwand gebucht. Procure to Stock (PTS) wäre korrekt, wenn die Flaschen stattdessen ins Lager eingelagert würden.',
      },
      {
        q: 'Welche der folgenden Aussagen zu OLTP-Datenbanken ist korrekt?',
        options: [
          'OLTP-Datenbanken sind auf schnelle, exklusive Schreibzugriffe auf Einzelsätze ausgelegt und ihre Reports sind bereits im Voraus bekannt.',
          'OLTP-Datenbanken überschreiben nie Daten, sondern archivieren jede Änderung als eigene neue Version.',
          'Reports in OLTP-Systemen werden grundsätzlich erst ad hoc zum Abfragezeitpunkt festgelegt.',
          'Die Abrechnung von Massendaten ist eine typische Aufgabe von OLAP-, nicht von OLTP-Systemen.',
        ],
        correct: 0,
        explain:
          'Laut Vorlesung werden Daten bei Änderungen überschrieben (nicht als neue Version archiviert), Reports sind im Voraus bekannt, und die Abrechnung von Massendaten ist gerade eine typische OLTP- und keine OLAP-Aufgabe. Nur die erste Aussage entspricht den Folieninhalten.',
      },
      {
        q: 'Welche Aussage zu den Klassifikationsdimensionen eines ERP-Systems ist FALSCH?',
        options: [
          'Buchungskreis und Lagerort gehören zur organisatorischen Dimension ("Wo?").',
          'Stammdaten und Bewegungsdaten gehören zur datentypischen Dimension ("Was?").',
          'Kundenauftrag und Angebot gehören zur akteursbezogenen Dimension ("Wer?").',
          'Person und Lieferant gehören zur akteursbezogenen Dimension ("Wer?").',
        ],
        correct: 2,
        explain:
          'Kundenauftrag und Angebot sind Vorgänge und gehören daher zur prozessualen Dimension ("Wie?"), nicht zur akteursbezogenen Dimension; Person und Lieferant sind dagegen tatsächlich Beispiele der akteursbezogenen Dimension ("Wer?").',
      },
      {
        q: 'Welche Aussage zur Integration zwischen Materialwirtschaft (Einkauf) und externem Rechnungswesen ist korrekt?',
        options: [
          'Die Materialklasse (z. B. Rohware, Halbfabrikat) wird im externen ReWe zu einer Bilanzposition zusammengefasst, der Material-/Dienstleistungsstammsatz entspricht einem Sachkonto.',
          'Jedes einzelne Material wird 1:1 als eigenes Sachkonto im Kontenplan geführt.',
          'Die Bewegungsart eines Materials (z. B. Bestellung, Verbrauch, Verschrottung) hat keinen Einfluss auf die Verbuchung im externen ReWe.',
          'Materialklassen werden ausschließlich im internen, nie im externen ReWe verwendet.',
        ],
        correct: 0,
        explain:
          'Laut Vorlesung werden verschiedene Materialien einer Materialklasse zu einer Bilanzposition zusammengefasst und der Material-/Dienstleistungsstammsatz einem Sachkonto zugeordnet – es erfolgt also eine Verdichtung und kein 1:1-Mapping einzelner Materialien auf Sachkonten.',
      },
      {
        q: 'Welche Aussage zum Unterschied zwischen isolierten und integrierten internen Infosystemen ist FALSCH?',
        options: [
          'Bei isolierten Systemen hat z. B. der Einkauf eine eigene Datenbank mit Material, Dienstleistung und Lieferant, unabhängig von der Datenbank der Produktion.',
          'Bei integrierten Systemen (ERP) teilen sich alle Funktionsbereiche eine gemeinsame Datenbank und Benutzeroberfläche.',
          'In integrierten Systemen entsprechen sich Lieferant und Kreditor bzw. Kunde und Debitor näherungsweise in derselben Datenbasis.',
          'Isolierte Systeme sind grundsätzlich leistungsfähiger als integrierte Systeme, da jede Funktion ihre Daten exklusiv verwaltet.',
        ],
        correct: 3,
        explain:
          'Die Vorlesung stellt gerade die integrierten (ERP-)Systeme mit gemeinsamer Datenbank als Lösung für die Redundanzprobleme isolierter Einzeldatenbanken dar; eine grundsätzliche Überlegenheit isolierter Systeme wird nicht postuliert.',
      },
    ],
  },
};
