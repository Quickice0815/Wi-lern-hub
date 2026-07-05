import type { LectureChapter } from '../types';

export const kapitel9: LectureChapter = {
  id: 'kapitel9',
  number: 9,
  title: 'Externe Informationssysteme',
  subtitle: 'CSCW & Raum-Zeit-Matrix, E-Business/EDI (M2M) sowie Produktkatalog, E-Procurement und CRM (P2M)',
  icon: '🌐',
  color: 'var(--pap-io)',
  tutorial: [
    {
      title: 'Drei Arten externer Informationssysteme',
      content:
        'Externe Informationssysteme verbinden ein Unternehmen mit Akteuren außerhalb seiner Grenzen. Die Vorlesung unterscheidet drei Typen: P2P-Kollaborative Informationssysteme (CSCW, Zusammenarbeit zwischen Personen), M2M-Außenwirksame Informationssysteme (Maschine-zu-Maschine, z. B. E-Business und Datenaustauschformate) und P2M-Außenwirksame Informationssysteme (Person-zu-Maschine, z. B. Produktkatalog, E-Procurement und CRM). Diese Einteilung zieht sich als roter Faden durch das gesamte Kapitel.',
    },
    {
      title: 'CSCW – Computer Supported Cooperative Work',
      content:
        'CSCW steht für Computer Supported Cooperative Work und bezeichnet die computergestützte Unterstützung der Gruppenarbeit (P2P) bei arbeitsteiligen Prozessen. Betrachtet werden dabei vier Dimensionen der zu erbringenden Arbeitsleistung: Inhalt, Menge, Zeit und Ort. Besonders Zeit und Ort sind entscheidend dafür, welche Art von System für eine Gruppe sinnvoll ist – daraus entsteht die Raum-Zeit-Matrix.',
    },
    {
      title: 'Die Raum-Zeit-Matrix zur Klassifikation der CSCW-Systeme',
      content:
        'Die Raum-Zeit-Matrix klassifiziert CSCW-Systeme anhand von Ort (gleicher vs. unterschiedlicher Ort/Unternehmen) und Zeit (gleiche vs. unterschiedliche Zeit). Gleicher Ort und gleiche Zeit: Präsentationssysteme und Sitzungsunterstützungssysteme. Gleicher Ort, unterschiedliche Zeiten: elektronisches schwarzes Brett, Dokumentenmanagement- und Workflow-Managementsysteme. Unterschiedliche Orte, gleiche Zeit: Audio-/Videokonferenzsysteme, Computerkonferenz, Chat und Instant-Messaging. Unterschiedliche Orte, unterschiedliche Zeiten: E-Mail-Systeme, Wikis, Diskussionsforen und Groupware-Systeme.',
    },
    {
      title: 'Groupware vs. Workflow-Managementsystem',
      content:
        'Groupware sind Kommunikations- und Kollaborationssysteme für Teams, die gemeinsame Arbeit über verschiedene Kanäle unterstützen – Beispiele sind E-Mail, Chat, Videokonferenzen, Wikis und Diskussionsforen. Ein Workflow-Managementsystem dagegen fokussiert strukturierte Geschäftsprozesse: Es automatisiert und optimiert betriebliche Arbeitsabläufe und ermöglicht eine systematische Prozesssteuerung und -dokumentation. Einsatzbereiche für solche Informationssysteme sind unter anderem Projektmanagement, Aufgabenorganisation, Prozessoptimierung und die Unterstützung der Aufbauorganisation.',
    },
    {
      title: 'Transformationskette der Unternehmenstätigkeit',
      content:
        'Ein Unternehmen transformiert Informationen und Waren zwischen Beschaffungsmarkt (Lieferanten) und Absatzmarkt (Kunden). An beiden Enden dieser Kette stehen externe Informationssysteme: Bestellungen und Einlieferungen zum Beschaffungsmarkt sowie Kundenaufträge und Auslieferungen zum Absatzmarkt. Der Informationsfluss an diesen Schnittstellen läuft sowohl über Maschine-zu-Maschine- (M2M) als auch über Person-zu-Maschine-Kommunikation (P2M), während intern die internen Informationssysteme die Transformation steuern.',
    },
    {
      title: 'E-Business und die vier Phasen des Gütertausches',
      content:
        'E-Business ist die digitale Abwicklung aller Phasen des Gütertausches bzw. einer Transaktion; E-Commerce bezeichnet dabei den digitalen Handel im engeren Sinne. Die Transaktion gliedert sich in vier Phasen: die Informationsphase (Informationsbeschaffung, Vergleich, Entscheidung, Anbahnung), die Vereinbarungsphase (Aushandeln der Vertrags- und Lieferbedingungen, Vertragsabschluss), die Abwicklungsphase (Lieferung, Zahlung, Abnahme, Änderungen) und die After-Sales-Phase (technischer Support, Kundenbindung, Reklamations- und Retourenabwicklung).',
    },
    {
      title: 'Kategorien des E-Commerce',
      content:
        'E-Commerce-Beziehungen werden nach den beteiligten Akteuren kategorisiert: B2B (Business-to-Business, z. B. Großhändler-Einzelhändler), B2C (Business-to-Consumer, z. B. Einzelhändler-Verbraucher), C2C (Consumer-to-Consumer, Verbraucher untereinander) sowie B2A und C2A (Business/Consumer-to-Administration, Schnittstelle zur öffentlichen Verwaltung bzw. zu Banken). Diese Kategorien beschreiben, wer mit wem auf dem elektronischen Markt Handel treibt.',
    },
    {
      title: 'M2M-Kommunikation und Electronic Data Interchange (EDI)',
      content:
        'M2M-Kommunikation ist die Interaktion zwischen betrieblichen Anwendungssystemen zur Übermittlung geschäftsrelevanter Daten und deren automatischer Weiterverarbeitung – ganz ohne manuelle Eingabe. Das zentrale Verfahren dafür ist EDI (Electronic Data Interchange): Sechs Nachrichtentypen – Angebotsanfragen, Bestellungen, Bestellungsänderungen, Lieferscheine, Empfangsbestätigungen und Rechnungen – machen bereits 85 % der zwischenbetrieblichen Kommunikation aus. Übertragen werden sie in standardisierten Austauschformaten wie EDIFACT, xCBL, SWIFT, VDA oder ANSI X.12, damit unterschiedliche ERP-Systeme (z. B. SAP und Oracle) automatisch miteinander kommunizieren können.',
    },
    {
      title: 'P2M-Kommunikation, dedizierte Informationssysteme und Produktkataloge',
      content:
        'P2M-Kommunikation ist die Interaktion zwischen Mensch und Computer zur Eingabe geschäftsrelevanter Daten und deren automatischer Weiterverarbeitung; die Aufbereitung muss dabei menschengerecht (barrierefrei, verständlich) erfolgen. Dedizierte Informationssysteme für P2M richten sich an unternehmensexterne Personen und gliedern sich in Information Self-Services (Unternehmensportale, Dienstportale, Suchdienste), Self Procurement (Produktkataloge/-konfiguratoren, Auktions- und Ausschreibungssysteme, elektronische Märkte) und CRM/Absatz (Produktkataloge, Internetshop, Angebotssysteme, Multi-Channel-CRM). Ein Produktkatalog kategorisiert Standardprodukte hierarchisch und überbrückt die P2M-Schnittstelle; unterschieden werden Buy-Side- (vom Käufer betrieben, fest ins ERP integriert), Sell-Side- (vom Verkäufer betriebener Online-Shop) und Intermediary-Side-Kataloge (Marktplatzlösungen Dritter wie eBay oder Mercateo). Der Produktkonfigurator ergänzt dies für individuell zusammengesetzte Produkte, und bei elektronischen Auktionen unterscheidet man Vorwärtsauktionen (steigender Preis, Höchstbietender gewinnt) von Rückwärtsauktionen (fallender Preis, niedrigstes Gebot gewinnt).',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Wofür steht die Abkürzung CSCW?',
        options: [
          'Computer Supported Cooperative Work',
          'Central System for Corporate Workflows',
          'Customer Service Communication Workflow',
          'Computer System for Cooperative Warehousing',
        ],
        correct: 0,
        explain:
          'CSCW steht für Computer Supported Cooperative Work – die computergestützte Unterstützung der Gruppenarbeit (P2P) bei arbeitsteiligen Prozessen.',
      },
      {
        q: 'Welche drei Interaktionsarten werden bei externen Informationssystemen in der Vorlesung unterschieden?',
        options: [
          'P2P, M2M, P2M',
          'B2B, B2C, C2C',
          'EDI, XML, JSON',
          'CRM, ERP, SCM',
        ],
        correct: 0,
        explain:
          'Die Vorlesung gliedert externe Informationssysteme in P2P-Kollaborative (CSCW), M2M-Außenwirksame (E-Business) und P2M-Außenwirksame Informationssysteme (Produktkatalog, E-Procurement, CRM).',
      },
      {
        q: 'Wofür steht die Abkürzung EDI?',
        options: [
          'Electronic Data Interchange',
          'Electronic Document Information',
          'External Data Integration',
          'Enterprise Data Infrastructure',
        ],
        correct: 0,
        explain: 'EDI (Electronic Data Interchange) bezeichnet den elektronischen Nachrichtenaustausch zwischen Unternehmen im Rahmen der M2M-Kommunikation.',
      },
      {
        q: 'Was ist ein Produktkatalog laut Vorlesung?',
        options: [
          'Eine inhaltliche, hierarchische Kategorisierung von Standardprodukten',
          'Ein System zur automatischen Lohnabrechnung',
          'Eine Datenbank ausschließlich für interne Mitarbeiterdaten',
          'Ein Modul zur Berechnung von Abschreibungen',
        ],
        correct: 0,
        explain: 'Der Produktkatalog kategorisiert Standardprodukte hierarchisch, verwaltet ihre Darstellung und überbrückt die P2M-Schnittstelle auf Beschaffungs- und Absatzmarkt.',
      },
      {
        q: 'Welche vier Phasen umfasst der digitale Gütertausch im E-Business?',
        options: [
          'Informationsphase, Vereinbarungsphase, Abwicklungsphase, After-Sales-Phase',
          'Planung, Analyse, Design, Implementierung',
          'Beschaffung, Produktion, Lager, Vertrieb',
          'Angebot, Nachfrage, Preisbildung, Vertragsschluss',
        ],
        correct: 0,
        explain: 'Die Transaktion im E-Business gliedert sich in Informations-, Vereinbarungs-, Abwicklungs- und After-Sales-Phase.',
      },
      {
        q: 'Was kennzeichnet die M2M-Kommunikation?',
        options: [
          'Automatisierte Interaktion zwischen betrieblichen Anwendungssystemen ohne manuelle Eingabe',
          'Eingabe geschäftsrelevanter Daten durch einen Menschen am Computer',
          'Persönliche Beratung durch einen Kundenservice-Mitarbeiter',
          'Manuelle Übertragung von Papierdokumenten per Post',
        ],
        correct: 0,
        explain: 'M2M (Maschine zu Maschine) beschreibt die automatische Übermittlung und Weiterverarbeitung geschäftsrelevanter Daten zwischen Anwendungssystemen, ganz ohne menschliches Eingreifen.',
      },
      {
        q: 'Wofür steht CRM im Kontext der dedizierten P2M-Informationssysteme?',
        options: [
          'Customer Relationship Management',
          'Central Resource Management',
          'Corporate Risk Monitoring',
          'Client Retrieval Module',
        ],
        correct: 0,
        explain: 'CRM (Customer Relationship Management) ist der Bereich der dedizierten P2M-Systeme, der den Absatz gegenüber Kunden unterstützt, z. B. über Internetshop und Multi-Channel-CRM.',
      },
      {
        q: 'Welches Beispiel gehört laut Vorlesung zu den "Information Self-Services"?',
        options: [
          'Unternehmensportale',
          'Auktionssysteme',
          'Produktkonfiguratoren',
          'Multi-Channel-CRM',
        ],
        correct: 0,
        explain: 'Information Self-Services umfassen Unternehmensportale, Dienstportale und Suchdienste. Auktionssysteme gehören zum Bereich Self Procurement, Produktkonfiguratoren und Multi-Channel-CRM zum Bereich Absatz/CRM.',
      },
    ],
    advanced: [
      {
        q: 'In welches Feld der Raum-Zeit-Matrix gehört ein Videokonferenzsystem?',
        options: [
          'Gleicher Ort, gleiche Zeit',
          'Gleicher Ort, unterschiedliche Zeiten',
          'Unterschiedliche Orte, gleiche Zeit',
          'Unterschiedliche Orte, unterschiedliche Zeiten',
        ],
        correct: 2,
        explain: 'Videokonferenzsysteme ermöglichen synchrone Kommunikation zwischen Personen an unterschiedlichen Orten – also "unterschiedliche Orte, gleiche Zeit".',
      },
      {
        q: 'Wie wird ein Wiki in der Raum-Zeit-Matrix der CSCW-Systeme eingeordnet?',
        options: [
          'Gleicher Ort, gleiche Zeit',
          'Gleicher Ort, unterschiedliche Zeiten',
          'Unterschiedliche Orte, gleiche Zeit',
          'Unterschiedliche Orte, unterschiedliche Zeiten',
        ],
        correct: 3,
        explain: 'Ein Wiki wird orts- und zeitunabhängig von verschiedenen Personen asynchron bearbeitet, daher zählt es zu "unterschiedliche Orte, unterschiedliche Zeiten" (zusammen mit E-Mail, Diskussionsforen, Groupware).',
      },
      {
        q: 'Welches System gehört laut Raum-Zeit-Matrix zum Quadranten "Gleicher Ort, unterschiedliche Zeiten"?',
        options: [
          'Workflow-Managementsystem',
          'Präsentationssystem',
          'Audiokonferenzsystem',
          'E-Mail-System',
        ],
        correct: 0,
        explain: 'Workflow-Managementsysteme stehen im Quadranten "gleicher Ort/Unternehmen, unterschiedliche Zeiten" (neben elektronischem schwarzen Brett und Dokumentenmanagementsystemen). Präsentationssysteme gehören zu "gleicher Ort, gleiche Zeit", Audiokonferenzsysteme zu "unterschiedliche Orte, gleiche Zeit", E-Mail zu "unterschiedliche Orte, unterschiedliche Zeiten".',
      },
      {
        q: 'Worin unterscheidet sich eine Groupware grundsätzlich von einem Workflow-Managementsystem?',
        options: [
          'Groupware unterstützt allgemeine Kommunikation und Zusammenarbeit, während ein Workflow-Managementsystem strukturierte Geschäftsprozesse automatisiert',
          'Groupware ist ausschließlich für M2M-Kommunikation geeignet, Workflow-Systeme nur für P2M',
          'Ein Workflow-Managementsystem dient ausschließlich der externen Kundenkommunikation',
          'Groupware benötigt zwingend eine Internetverbindung, ein Workflow-Managementsystem nicht',
        ],
        correct: 0,
        explain: 'Groupware ist ein Kommunikations- und Kollaborationssystem für Teams (E-Mail, Chat, Wikis etc.), während ein Workflow-Managementsystem strukturierte Geschäftsprozesse automatisiert, steuert und dokumentiert.',
      },
      {
        q: 'Warum tauchen externe Informationssysteme in der Transformationskette der Unternehmenstätigkeit an zwei Stellen auf?',
        options: [
          'Weil sowohl der Informationsfluss zum Beschaffungsmarkt (Lieferanten) als auch zum Absatzmarkt (Kunden) über M2M- und P2M-Kommunikation abgewickelt wird',
          'Weil jedes Unternehmen zwingend zwei parallele ERP-Systeme betreiben muss',
          'Weil interne Informationssysteme keine Datenspeicherung erlauben',
          'Weil gesetzlich zwei redundante Systeme vorgeschrieben sind',
        ],
        correct: 0,
        explain: 'Die Transformationskette zeigt externe Informationssysteme sowohl an der Schnittstelle zu Lieferanten (Bestellung/Einlieferung) als auch zu Kunden (Kundenauftrag/Auslieferung) – jeweils über M2M- und P2M-Kommunikation.',
      },
      {
        q: 'Ein Unternehmen tauscht mit einem Lieferanten automatisiert Bestellungen und Rechnungen im EDIFACT-Format aus, ohne dass ein Mitarbeiter die Daten manuell eintippt. Um welche Kommunikationsart handelt es sich?',
        options: [
          'M2M-Kommunikation',
          'P2M-Kommunikation',
          'CSCW',
          'Workflow-Management ohne IS-Bezug',
        ],
        correct: 0,
        explain: 'Der automatisierte, zwischenbetriebliche Austausch geschäftsrelevanter Daten zwischen Anwendungssystemen ohne menschliches Eingreifen ist M2M-Kommunikation; EDIFACT ist eines der dafür genutzten Austauschformate.',
      },
      {
        q: 'Welche Aussage zu den Kategorien des E-Commerce trifft zu?',
        options: [
          'B2B beschreibt den Handel zwischen Unternehmen, B2C den Handel zwischen Unternehmen und Verbrauchern',
          'B2A beschreibt ausschließlich den Handel zwischen zwei Verbrauchern',
          'C2C steht für die Kommunikation zwischen Unternehmen und Banken',
          'B2B findet ausschließlich über elektronische Marktplätze statt',
        ],
        correct: 0,
        explain: 'B2B (Business-to-Business) ist der Handel zwischen Unternehmen, B2C (Business-to-Consumer) zwischen Unternehmen und Verbrauchern. C2C ist Verbraucher-zu-Verbraucher, B2A/C2A betreffen die Schnittstelle zur öffentlichen Verwaltung bzw. zu Banken.',
      },
      {
        q: 'Ein einkaufendes Unternehmen betreibt einen Katalog, in den mehrere Lieferanten ihre Produkte einstellen; der Katalog ist zwingend mit dem ERP-System des Käufers integriert. Um welche Katalogart handelt es sich?',
        options: [
          'Buy-Side-Katalog',
          'Sell-Side-Katalog',
          'Intermediary-Side-Katalog',
          'Self-Procurement-Katalog',
        ],
        correct: 0,
        explain: 'Ein Buy-Side-Katalog wird vom einkaufenden Unternehmen eingerichtet und ist zwingend mit dessen ERP-System integriert. Sell-Side-Kataloge werden von Verkäufern betrieben (Online-Shop), Intermediary-Kataloge sind Marktplatzlösungen Dritter wie eBay oder Mercateo.',
      },
    ],
    pro: [
      {
        q: 'Welche der folgenden Zuordnungen zur Raum-Zeit-Matrix ist FALSCH?',
        options: [
          'Elektronische schwarze Bretter gehören zum Quadranten "gleicher Ort, unterschiedliche Zeiten"',
          'Chat und Instant-Messaging gehören zum Quadranten "unterschiedliche Orte, gleiche Zeit"',
          'Diskussionsforen gehören zum Quadranten "gleicher Ort, gleiche Zeit"',
          'E-Mail-Systeme gehören zum Quadranten "unterschiedliche Orte, unterschiedliche Zeiten"',
        ],
        correct: 2,
        explain: 'Diskussionsforen sind laut Matrix im Quadranten "unterschiedliche Orte, unterschiedliche Zeiten" einsortiert (zusammen mit E-Mail, Wikis, Groupware) – nicht im Quadranten "gleicher Ort, gleiche Zeit", wo Präsentations- und Sitzungsunterstützungssysteme stehen.',
      },
      {
        q: 'Eine ABC-Analyse zeigt einen sehr hohen mengenmäßigen Anteil an C-Gütern. Welche Lösung zur Rationalisierung der Beschaffung schlägt die Vorlesung vor, und warum?',
        options: [
          'Einführung eines Self-Procurement-Systems, da C-Güter hohe Prozesskosten bei geringem Warenwert verursachen und standardisierte Bestellungen automatisiert werden können',
          'Bündelung der Beschaffung im ERP-System, da dies für alle Güterklassen gleich effizient ist',
          'Einführung eines SCM-Systems, da C-Güter komplexe, strategische Lieferketten erfordern',
          'Beschaffung ausschließlich über elektronische Marktplätze, da dort die geringsten Prüf- und Genehmigungsaufwände entstehen',
        ],
        correct: 0,
        explain: 'C-Güter haben geringen Wert, aber hohe Mengen und damit hohe Prozesskosten im Verhältnis zum Warenwert. Ein Self-Procurement-System automatisiert die Bestellung standardisierter Güter direkt durch die Fachabteilungen und senkt so die Prozesskosten am stärksten.',
      },
      {
        q: 'Welche der folgenden Aussagen zu M2M- und P2M-Kommunikation ist FALSCH?',
        options: [
          'M2M-Kommunikation erfolgt automatisiert zwischen Anwendungssystemen, ohne dass ein Mensch die Daten eingibt',
          'P2M-Kommunikation bezeichnet die Interaktion zwischen zwei Maschinen ohne menschliche Eingabe',
          'EDI-Nachrichten wie im EDIFACT-Format sind ein Beispiel für M2M-Kommunikation',
          'Produktkataloge zählen zu den P2M-Systemen, da sie eine menschengerechte Aufbereitung von Informationen ermöglichen',
        ],
        correct: 1,
        explain: 'P2M steht für Person zu Maschine – die Interaktion zwischen Mensch und Computer zur Eingabe von Daten. Die Beschreibung "zwischen zwei Maschinen ohne menschliche Eingabe" trifft dagegen auf M2M zu, nicht auf P2M.',
      },
      {
        q: 'Bei einer Rückwärtsauktion (Reverse Auction) gilt:',
        options: [
          'Der Käufer fragt ein Produkt nach, der Preis fällt im Zeitverlauf, und der Anbieter mit dem niedrigsten Gebot gewinnt',
          'Der Verkäufer bietet ein Produkt an, der Preis steigt im Zeitverlauf, und der Höchstbietende gewinnt',
          'Mehrere Käufer bieten gleichzeitig denselben Startpreis, ohne dass sich der Preis verändert',
          'Diese Auktionsform wird ausschließlich im B2C-Bereich eingesetzt',
        ],
        correct: 0,
        explain: 'Bei der Rückwärtsauktion fragt der Käufer ein Produkt nach; der Preis fällt schrittweise, und der Anbieter mit dem niedrigsten Gebot gewinnt. Die zweite Option beschreibt stattdessen die Vorwärtsauktion.',
      },
      {
        q: 'Welche Aussage zum Fernabsatzgesetz ist FALSCH?',
        options: [
          'Für alle Fernabsatzverträge besteht ausnahmslos ein zweiwöchiges Widerrufsrecht, auch bei nach Kundenspezifikation angefertigten Waren',
          'Verbraucher haben bei Fernabsatzverträgen grundsätzlich ein Widerrufs- und Rückgaberecht innerhalb von zwei Wochen',
          'Bei Lieferung von nach Kundenspezifikation angefertigten Waren besteht kein gesetzliches Widerrufsrecht',
          'Das Unternehmen unterliegt bei Fernabsatzverträgen strengen Informationspflichten',
        ],
        correct: 0,
        explain: 'Das Fernabsatzgesetz sieht ausdrücklich Ausnahmen vom Widerrufsrecht vor, etwa bei kundenspezifisch angefertigten Waren, entsiegelten Audio-/Videoaufzeichnungen oder Software sowie bei Versteigerungen – ein ausnahmsloses Widerrufsrecht besteht also gerade nicht.',
      },
      {
        q: 'Welche Zuordnung zu den "Dedizierten Informationssystemen für P2M" ist korrekt?',
        options: [
          'Auktionssysteme gehören zum Bereich Beschaffung/Self Procurement, nicht zu Absatz/CRM',
          'Auktionssysteme gehören ausschließlich zum Bereich Information Self-Services',
          'Produktkataloge werden ausschließlich im Bereich Absatz/CRM eingesetzt, nicht in der Beschaffung',
          'Unternehmensportale gehören zum Bereich Beschaffung/Self Procurement',
        ],
        correct: 0,
        explain: 'Laut Folie sind Auktionssysteme dem Bereich Beschaffung/Self Procurement zugeordnet (neben Ausschreibungssystemen und elektronischen Märkten). Produktkataloge/-konfiguratoren erscheinen sowohl bei Beschaffung als auch bei Absatz, Unternehmensportale gehören zu Information Self-Services.',
      },
      {
        q: 'Ein Online-Shop tauscht Bestelldaten automatisiert mit seinem ERP-System aus, während Kunden ihre Bestellungen manuell über die Weboberfläche eingeben. Welche Aussage trifft zu?',
        options: [
          'Die Eingabe der Kunden über die Weboberfläche ist P2M-Kommunikation, der automatisierte Datenaustausch mit dem ERP-System ist M2M-Kommunikation',
          'Beide Vorgänge sind M2M-Kommunikation, da beide Systeme elektronisch kommunizieren',
          'Beide Vorgänge sind P2M-Kommunikation, da am Ende ein Mensch die Ware erhält',
          'Die Kundeninteraktion ist M2M-Kommunikation, da der Webserver die Anfrage automatisch verarbeitet',
        ],
        correct: 0,
        explain: 'Die manuelle Eingabe durch den Kunden ist Person-zu-Maschine-Kommunikation (P2M), während der automatisierte, menschenlose Datenaustausch zwischen Shop- und ERP-System Maschine-zu-Maschine-Kommunikation (M2M) ist.',
      },
    ],
  },
};
