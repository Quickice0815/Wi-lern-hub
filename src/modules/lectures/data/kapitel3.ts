import type { LectureChapter } from '../types';

export const kapitel3: LectureChapter = {
  id: 'kapitel3',
  number: 3,
  title: 'Datenorganisation',
  subtitle: 'Datenklassifikationen, das ERM-Diagramm und das relationale Datenbankmodell',
  icon: '🗂️',
  color: 'var(--attribute)',
  tutorial: [
    {
      title: 'Datenpunkte, Eigenschaften und Beziehungen',
      content:
        'Datenpunkte sind Träger von Informationen und besitzen Eigenschaften, Dimensionen bzw. Attribute – bei einem Netflix-User etwa Name, Adresse, Geschlecht oder Alter, bei einem Netflix-Film dagegen Name, Art und Jahr. Datenpunkte stehen zudem in Beziehung zueinander, z. B. „User schaut Film". Diese Grundidee – Objekte mit Eigenschaften, die über Beziehungen miteinander verbunden sind – ist die Basis für die spätere Modellierung von Datenbanken.',
    },
    {
      title: 'Klassifikation nach Änderungs- und Entstehungshäufigkeit',
      content:
        'Daten lassen sich zunächst in Zustandsdaten und Ereignisdaten einteilen. Zustandsdaten gliedern sich weiter in Stammdaten (sachliche Informationen über betriebliche Entitytypen bzw. Objekte/Subjekte, geringe Änderungshäufigkeit) und Bestandsdaten (Bestandswerte wie Menge oder Wert über diese Entitytypen). Ereignisdaten gliedern sich in Änderungsdaten (Informationen über Veränderung von Stamm- und Bewegungsdaten) und Bewegungsdaten (Informationen über Veränderung von Bestandsdaten, hohe Entstehungshäufigkeit). Am Beispiel eines Kontoauszugs sind Anfangs- und Endbestand Bestandsdaten, während einzelne Buchungen wie Miete oder Kartenzahlung Bewegungsdaten sind.',
    },
    {
      title: 'Klassifikation nach der Rolle im ERP-System',
      content:
        'In einem ERP-System werden Daten danach unterschieden, welche Frage sie beantworten. Organisationsdaten beantworten „Wo?" (z. B. Buchungskreis, Werk, Lagerort, Verkaufs- oder Einkaufsorganisation). Stammdaten beantworten „Was?"/„Wer?" (z. B. Person, Material, Kunde, Lieferant, Sachkonto). Bewegungsdaten beantworten „Wieviel? Wo? Warum? Wann?" (z. B. Bestellung, Rechnung, Angebot, Kundenauftrag, Transportauftrag). Konfigurationsdaten schließlich beantworten „Womit? Wie?" (z. B. Zahlweg, Steuerschlüssel, Belegart, Stornogrund, Transportart).',
    },
    {
      title: 'Klassifikation aus betriebswirtschaftlicher Sicht',
      content:
        'Aus betriebswirtschaftlicher Sicht unterscheidet man operative Daten und strategische Daten. Operative Daten – auch Rohdaten genannt – entstehen oder werden benötigt im Zuge der Abwicklung von Geschäftsprozessen; sie liegen auf einer niedrigen Hierarchiestufe mit geringer Aggregation. Strategische Daten – auch veredelte Daten genannt – werden dagegen durch Aggregation (Summe, Durchschnitt, Zählen etc.) aus den operativen Daten abgeleitet und liegen auf einer hohen Hierarchiestufe mit hoher Aggregation.',
    },
    {
      title: 'Datenoperationen (Datentransaktionen)',
      content:
        'Die Vorlesung nennt vier grundlegende Arten der Datenbearbeitung: Anzeigen (bestehende Daten suchen, anzeigen, auswerten), Einfügen (neue Daten erfassen), Ändern (Daten korrigieren, aktualisieren, sperren, modifizieren) und Löschen (obsolete Daten entfernen, reorganisieren). Jede Interaktion mit einer Datenbank lässt sich einer dieser vier Operationen zuordnen.',
    },
    {
      title: 'Drei Ebenen der Datenorganisation und das semantische Datenmodell',
      content:
        'Die Datenorganisation gliedert sich in drei Ebenen: Das semantische Datenmodell ist eine generelle, graphische Beschreibung von Abhängigkeiten zwischen Objekten, z. B. als ERM. Das logische Datenbankmodell ergänzt dies um Feldformate und Primärschlüssel im Kontext eines konkreten Datenbankmodells, z. B. dem relationalen Modell. Das physische Datenbankmodell schließlich ist die Umsetzung mit einem bestimmten Datenbankmanagementsystem (DBMS) wie Access, Oracle oder HANA. Ein semantisches Datenmodell entsteht, indem alle relevanten Datenobjekte sowie die Beziehungen zwischen ihnen erfasst und als Abbild der Realität in einem Modell dargestellt werden.',
    },
    {
      title: 'Notation des Entity-Relationship-Modells (ERM)',
      content:
        'Das ERM ist die graphische Beschreibungssprache des semantischen Datenmodells und verwendet vier Grundelemente: Der Entitytyp (Rechteck) steht für ein Objekt oder Subjekt aus der realen Welt und wird als Substantiv beschrieben. Der Beziehungstyp (Raute) beschreibt Beziehungen zwischen Objekten oder Subjekten als Verb. Das Attribut (Ellipse) beschreibt Eigenschaften von Objekten, Subjekten und Beziehungen als Substantiv im Singular; unterstrichene Attribute sind Primärschlüssel. Kardinalitäten (1:N, N:1, N:M) geben schließlich das Mengenverhältnis zwischen den Entitytypen an.',
    },
    {
      title: 'Maximal- und Minimalkardinalität',
      content:
        'Die Maximalkardinalität beschreibt das Mengenverhältnis zwischen zwei Entitytypen: 1:1, 1:N, N:1 oder N:M. Die Minimalkardinalität gibt dagegen an, ob eine Entität ohne diese Beziehung vorkommen kann oder nicht: Eine Muss-Beziehung (dargestellt durch eine doppelte Linie) bedeutet, dass jede Entität mindestens einmal an der Beziehung teilnehmen muss; eine Kann-Beziehung (einfache Linie) erlaubt auch Entitäten ohne diese Beziehung. So macht es einen Unterschied, ob ein Entitytyp „Kunde" (muss schon gekauft haben) oder „Interessent" (kann, muss aber noch nicht gekauft haben) genannt wird.',
    },
    {
      title: 'Relationales Datenbankmodell und Transformation des ERM',
      content:
        'Eine „Datenbank" ist eine möglichst redundanzfreie Sammlung von Daten, die so strukturiert sind, dass sie von mehreren Benutzern und Anwendungen gleichzeitig und effizient genutzt, ausgewertet und verknüpft werden können. Das relationale Datenbankmodell speichert Informationen in Tabellen (Relationen): Eine Zeile ist ein Tupel bzw. Datensatz (eine Entität), eine Spalte ist ein Attribut, und ein Feld enthält die konkrete Attributsausprägung bzw. den Datenwert. Um ein ERM in Tabellen zu überführen, gelten drei Transformationsregeln: (1) Jeder Entitytyp sowie jede N:M-Beziehung wird zu einer eigenen Tabelle mit Primärschlüssel, wobei die Primärschlüssel beider beteiligter Entitytypen zu Fremdschlüsseln werden. (2) Eine 1:N-Beziehung ohne eigene Attribute wird abgebildet, indem der Primärschlüssel des 1-Entitytyps zum Fremdschlüssel im N-Entitytyp wird. (3) Bei einer 1:1-Beziehung ohne eigene Attribute wird der Primärschlüssel eines der beiden Entitytypen zum Fremdschlüssel im anderen. Ist ein Datenbestand nicht normalisiert, drohen Einfüge-, Änderungs- und Löschanomalien sowie Redundanz, etwa wenn gleiche Realweltobjekte mehrfach mit denselben (unter Umständen fehlerhaften) Werten gespeichert werden. Feldformate (z. B. Integer, Decimal, Date, Time, Character, Währung, Text, BLOB) legen zusätzlich fest, welche Daten in ein Feld eingegeben werden dürfen, und werden durch Format-, Ausschluss-, Plausibilitäts- und Vollständigkeitsprüfungen abgesichert.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Welche zwei Hauptkategorien ergeben sich bei der Klassifikation der Daten nach Änderungs- und Entstehungshäufigkeit?',
        options: [
          'Zustandsdaten und Ereignisdaten',
          'Stammdaten und Bewegungsdaten',
          'Strategische und operative Daten',
          'Organisationsdaten und Konfigurationsdaten',
        ],
        correct: 0,
        explain:
          'Die oberste Unterteilung erfolgt in Zustandsdaten (weiter unterteilt in Stamm- und Bestandsdaten) und Ereignisdaten (weiter unterteilt in Änderungs- und Bewegungsdaten).',
      },
      {
        q: 'Wie sind Stammdaten laut Vorlesung definiert?',
        options: [
          'Sachliche Informationen über betriebliche Entitytypen bzw. Objekte/Subjekte',
          'Bestandswerte (Menge, Wert) über betriebliche Entitytypen bzw. Objekte/Subjekte',
          'Informationen über Veränderung von Bestandsdaten',
          'Informationen über Veränderung von Stamm- und Bewegungsdaten',
        ],
        correct: 0,
        explain:
          'Stammdaten sind sachliche Informationen über Entitytypen bzw. Objekte/Subjekte mit geringer Änderungshäufigkeit; die anderen Definitionen beschreiben Bestands-, Bewegungs- bzw. Änderungsdaten.',
      },
      {
        q: 'Wie sind Bewegungsdaten laut Vorlesung definiert?',
        options: [
          'Informationen über Veränderung von Bestandsdaten',
          'Sachliche Informationen über betriebliche Entitytypen',
          'Bestandswerte (Menge, Wert) über Objekte/Subjekte',
          'Informationen über Veränderung von Stammdaten',
        ],
        correct: 0,
        explain:
          'Bewegungsdaten sind Informationen über die Veränderung von Bestandsdaten und entstehen mit hoher Entstehungshäufigkeit, z. B. einzelne Buchungen auf einem Konto.',
      },
      {
        q: 'Welche vier Datenoperationen (Art der Datenbearbeitung) nennt die Vorlesung?',
        options: [
          'Anzeigen, Einfügen, Ändern, Löschen',
          'Erstellen, Lesen, Aktualisieren, Archivieren',
          'Suchen, Sortieren, Filtern, Exportieren',
          'Speichern, Kopieren, Verschieben, Vernichten',
        ],
        correct: 0,
        explain:
          'Die Vorlesung nennt genau diese vier Datentransaktionen: Anzeigen (suchen/auswerten), Einfügen (neu erfassen), Ändern (korrigieren/aktualisieren) und Löschen (obsolete Daten entfernen).',
      },
      {
        q: 'Wofür steht die Abkürzung ERM?',
        options: [
          'Entity-Relationship-Modell',
          'Enterprise-Resource-Management',
          'Extended-Relational-Mapping',
          'Entity-Record-Management',
        ],
        correct: 0,
        explain: 'ERM steht für Entity-Relationship-Modell, die graphische Beschreibungssprache des semantischen Datenmodells.',
      },
      {
        q: 'Wie werden Primärschlüssel in einem ERM-Diagramm gekennzeichnet?',
        options: [
          'Durch Unterstreichung des Attributnamens',
          'Durch Fettdruck des Attributnamens',
          'Durch ein Sternchen (*) vor dem Attributnamen',
          'Durch Großschreibung des Attributnamens',
        ],
        correct: 0,
        explain: 'Laut ERM-Notation sind unterstrichene Attribute Primärschlüssel.',
      },
      {
        q: 'Wie wird ein Entitytyp im ERM grafisch dargestellt?',
        options: ['Als Rechteck', 'Als Raute (Diamant)', 'Als Ellipse (Oval)', 'Als Dreieck'],
        correct: 0,
        explain:
          'Der Entitytyp wird als Rechteck dargestellt, der Beziehungstyp als Raute und das Attribut als Ellipse.',
      },
      {
        q: 'Was versteht man unter einer „Relation" im relationalen Datenbankmodell?',
        options: [
          'Eine Tabelle, in der strukturierte Informationen als Datensätze gespeichert sind',
          'Eine einzelne Zeile einer Tabelle',
          'Eine Beziehung zwischen zwei Feldern innerhalb derselben Zeile',
          'Ein Diagramm zur Visualisierung von Kardinalitäten',
        ],
        correct: 0,
        explain:
          'Relation ist der Fachbegriff für eine Tabelle; eine Zeile der Tabelle nennt man Tupel bzw. Datensatz, eine Spalte Attribut.',
      },
    ],
    advanced: [
      {
        q: 'Auf einem Kontoauszug ist der Kontostand (Anfangs-/Endbestand) angegeben. Welcher Datenkategorie ist der Kontostand zuzuordnen?',
        options: ['Bestandsdaten', 'Stammdaten', 'Bewegungsdaten', 'Änderungsdaten'],
        correct: 0,
        explain:
          'Der Kontostand ist ein Bestandswert (Menge/Wert) über ein Objekt zu einem bestimmten Zeitpunkt – genau wie im Kontoauszug-Beispiel der Vorlesung, wo Anfangs- und Endbestand als Bestandsdaten gelten.',
      },
      {
        q: 'Auf demselben Kontoauszug steht eine einzelne Buchung „Kartenzahlung -200,00 €". Welcher Datenkategorie ist diese Buchung zuzuordnen?',
        options: ['Bewegungsdaten', 'Bestandsdaten', 'Stammdaten', 'Organisationsdaten'],
        correct: 0,
        explain:
          'Einzelne Buchungen sind Ereignisse, die den Bestand verändern, und zählen daher zu den Bewegungsdaten – im Gegensatz zum Kontostand selbst, der Bestandsdaten sind.',
      },
      {
        q: 'Im ERP-Datenmodell der Vorlesung: Zu welcher Kategorie gehört „Buchungskreis"?',
        options: ['Organisationsdaten', 'Stammdaten', 'Bewegungsdaten', 'Konfigurationsdaten'],
        correct: 0,
        explain:
          'Buchungskreis beantwortet die Frage „Wo?" und zählt damit zu den Organisationsdaten, ebenso wie Werk, Lagerort oder Verkaufsorganisation.',
      },
      {
        q: 'Im ERP-Datenmodell der Vorlesung: Zu welcher Kategorie gehört „Zahlweg"?',
        options: ['Konfigurationsdaten', 'Organisationsdaten', 'Stammdaten', 'Bewegungsdaten'],
        correct: 0,
        explain:
          'Zahlweg beantwortet die Frage „Womit?/Wie?" und zählt damit zu den Konfigurationsdaten, ebenso wie Steuerschlüssel, Belegart oder Stornogrund.',
      },
      {
        q: 'Welches der folgenden Beispiele ist ein strategisches (aggregiertes) Datum im Sinne der betriebswirtschaftlichen Datenklassifikation?',
        options: [
          'Der durchschnittliche Tagesumsatz einer Filiale, berechnet aus allen Einzelverkäufen',
          'Der Verkaufspreis eines einzelnen Artikels',
          'Eine einzelne Rechnung an einen Kunden',
          'Die Bestellung eines bestimmten Kunden vom 5. Juli',
        ],
        correct: 0,
        explain:
          'Strategische bzw. veredelte Daten entstehen durch Aggregation (Summe, Durchschnitt, Zählen) aus operativen Rohdaten; die anderen Beispiele sind selbst einzelne, nicht aggregierte operative Daten.',
      },
      {
        q: 'Im ERM-Diagramm ist „Kunde -1- hat gekauft -N- Artikel" dargestellt. Wie ist diese Kardinalität korrekt zu lesen?',
        options: [
          'Ein Kunde kann mehrere Artikel gekauft haben, ein Artikel wurde jeweils nur von einem Kunden gekauft',
          'Ein Kunde kann nur einen Artikel kaufen, ein Artikel kann von vielen Kunden gekauft werden',
          'Kunde und Artikel stehen in dieser Darstellung in einer N:M-Beziehung',
          'Jeder Kunde hat automatisch alle vorhandenen Artikel gekauft',
        ],
        correct: 0,
        explain:
          'Die „1" bei Kunde und „N" bei Artikel bedeuten: Ein Kunde kann mit N Artikeln in Beziehung stehen (mehrere Artikel gekauft haben), während ein Artikel jeweils nur einem (1) Kunden in dieser Beziehung zugeordnet ist.',
      },
      {
        q: 'Was zeigt eine doppelte Linie zwischen Entitytyp und Beziehungstyp im ERM, im Gegensatz zu einer einfachen Linie?',
        options: [
          'Eine Muss-Beziehung – die Entität muss an der Beziehung teilnehmen',
          'Eine Kann-Beziehung – die Entität muss nicht an der Beziehung teilnehmen',
          'Eine 1:1-Kardinalität zwischen den Entitytypen',
          'Eine N:M-Kardinalität zwischen den Entitytypen',
        ],
        correct: 0,
        explain:
          'Die doppelte Linie steht für eine Muss-Beziehung (Minimalkardinalität mindestens 1); die einfache Linie steht dagegen für eine Kann-Beziehung, bei der eine Entität auch ohne diese Beziehung vorkommen darf.',
      },
      {
        q: 'Laut Transformationsregel 2 wird eine 1:N-Beziehung ohne eigene Attribute wie im relationalen Modell abgebildet?',
        options: [
          'Der Primärschlüssel des 1-Entitytyps wird zum Fremdschlüssel im N-Entitytyp',
          'Der Primärschlüssel des N-Entitytyps wird zum Fremdschlüssel im 1-Entitytyp',
          'Es entsteht immer eine dritte, eigenständige Tabelle für die Beziehung',
          'Beide Entitytypen werden in einer einzigen gemeinsamen Tabelle zusammengeführt',
        ],
        correct: 0,
        explain:
          'Bei einer 1:N-Beziehung ohne eigene Attribute wird der Primärschlüssel des 1-Entitytyps (z. B. Lieferant-Nr) als Fremdschlüssel in die Tabelle des N-Entitytyps (z. B. Artikel) übernommen.',
      },
    ],
    pro: [
      {
        q: 'Gegeben ist ein ER-Diagramm: Ort -1- zugeordnet -N- Baustelle -1- arbeitet -N- Arbeiter. Baustelle besitzt die Attribute Name und Bezeichnung (keines davon unterstrichen), Arbeiter besitzt PersNr (unterstrichen), Wohnort und Name. Welche der folgenden Aussagen ist auf Basis dieses Diagramms RICHTIG?',
        options: [
          'Auf einer Baustelle in Potsdam können 50 Arbeiter beschäftigt sein',
          'Arbeiter Hansen kann gleichzeitig auf Baustellen in Potsdam und in Dresden arbeiten',
          'Von jeder Baustelle ist bekannt, welcher Arbeiter sie leitet',
          'Die Baustelle kann eindeutig anhand ihres Namens identifiziert werden',
        ],
        correct: 0,
        explain:
          'Da eine Baustelle (1-Seite) mit beliebig vielen (N) Arbeitern in Beziehung stehen kann, sind 50 Arbeiter auf einer Baustelle möglich. Da ein Arbeiter aber nur der 1-Seite der Beziehung „arbeitet" zugeordnet ist, kann er nicht gleichzeitig auf zwei Baustellen arbeiten; eine „leitet"-Beziehung existiert im Diagramm nicht; und „Name" ist bei Baustelle nicht unterstrichen, also kein Primärschlüssel, mit dem sich die Baustelle eindeutig identifizieren ließe.',
      },
      {
        q: 'Wie viele Bits werden mindestens benötigt, um die Dezimalzahl 304 als Dualzahl darzustellen?',
        options: ['9 Bits', '8 Bits', '7 Bits', '6 Bits'],
        correct: 0,
        explain:
          'Mit 8 Bit lassen sich maximal 255 (= 2⁸−1) verschiedene Werte darstellen; da 304 größer ist, werden mindestens 9 Bit benötigt (2⁹−1 = 511 ≥ 304).',
      },
      {
        q: 'Welche der folgenden Veränderungen betrifft laut Vorlesung AUSSCHLIESSLICH das logische Schema eines Datenbanksystems?',
        options: [
          'Veränderung des Feldformats eines Attributs von Integer nach Währung',
          'Veränderung des für einen Benutzer sichtbaren Ausschnitts der Datenbank',
          'Erteilen einer Zugriffsberechtigung für einen neuen Benutzer',
          'Einfügen eines neuen Datensatzes in die Datenbank',
        ],
        correct: 0,
        explain:
          'Nur die Änderung eines Feldformats verändert die logische Struktur der Datenbank selbst. Die sichtbare Nutzersicht betrifft die externe Ebene, Zugriffsrechte die Benutzerverwaltung, und das Einfügen eines Datensatzes ändert nur den Dateninhalt, nicht das Schema.',
      },
      {
        q: 'In welchem der folgenden Fälle liegt laut Vorlesung Redundanz vor?',
        options: [
          'Wenn gleiche Realweltobjekte mehrfach mit denselben (auch fehlerhaften) Werten gespeichert werden',
          'Wenn Datenbestände aus Sicherheitsgründen auf mehrere Speichereinheiten verteilt sind',
          'Wenn Daten in herkömmlichen Dateien statt in einer Datenbank gespeichert sind',
          'Wenn Daten sequenziell statt wahlfrei gespeichert werden',
        ],
        correct: 0,
        explain:
          'Redundanz bedeutet die mehrfache Speicherung derselben Information über dasselbe Realweltobjekt, selbst wenn diese Werte fehlerhaft sind. Verteilte Sicherungskopien, Dateiablage oder sequenzielle Speicherung an sich erzeugen dagegen laut Vorlesung keine Redundanz.',
      },
      {
        q: 'Welche der folgenden Aussagen zu Kardinalitäten im ERM ist FALSCH?',
        options: [
          'Die Minimalkardinalität gibt an, wie viele Entitytypen insgesamt in der Datenbank existieren',
          'Die Maximalkardinalität beschreibt das Mengenverhältnis zwischen den Entitytypen (z. B. 1:N, N:M)',
          'Eine Muss-Beziehung wird durch eine doppelte Linie dargestellt',
          'Eine Kann-Beziehung bedeutet, dass eine Entität ohne diese Beziehung vorkommen kann',
        ],
        correct: 0,
        explain:
          'Die Minimalkardinalität gibt an, ob eine einzelne Entität OHNE diese Beziehung vorkommen kann oder nicht (Muss-/Kann-Beziehung) – sie sagt nichts über die Gesamtzahl existierender Entitytypen aus. Die übrigen drei Aussagen entsprechen den Folieninhalten.',
      },
      {
        q: 'Für eine Fahrzeugverwaltung gilt: Jedes Fahrzeug gehört zu höchstens einer Abteilung, jede Abteilung besitzt aber mindestens ein Fahrzeug. Welche Kardinalität beschreibt die Beziehung „Fahrzeug gehört Abteilung" korrekt (Reihenfolge Fahrzeug:Abteilung)?',
        options: ['N:1', '1:N', 'N:M', '1:1'],
        correct: 0,
        explain:
          'Da viele (N) Fahrzeuge zu einer (1) Abteilung gehören können, jedes Fahrzeug aber nur genau einer Abteilung zugeordnet ist, ergibt sich für die Beziehung Fahrzeug:Abteilung die Kardinalität N:1.',
      },
    ],
  },
};
