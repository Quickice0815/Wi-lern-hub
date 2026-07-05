import type { LectureChapter } from '../types';

export const kapitel5: LectureChapter = {
  id: 'kapitel5',
  number: 5,
  title: 'Datenverarbeitung und -übertragung',
  subtitle: 'Von direkter, halbdirekter und indirekter Dateneingabe über Funktionen, Transaktionen und Programmablaufpläne bis zu Datennetzen und Übertragungskapazität',
  icon: '📡',
  color: 'var(--pap-control)',
  tutorial: [
    {
      title: 'Einordnung: Architektur der Informationssysteme',
      content:
        'Die Architektur eines Informationssystems reicht von der Strategie über die Organisations- und Informationsarchitektur bis zur IKT-Infrastruktur. Diese Vorlesung befasst sich mit zwei Bausteinen der IKT-Infrastruktur: der Datenverarbeitung, die über Transaktionen die Funktionen Erfassen, Ändern, Löschen und Anzeigen realisiert, und der Datenübertragung, die über Datennetze erfolgt. Ergänzt wird dies durch die Dateneingabe als Voraussetzung jeder Datenverarbeitung.',
    },
    {
      title: 'Dateneingabe – drei Grundformen',
      content:
        'Dateneingabe (Datenerfassung) bezeichnet die erstmalige Eingabe kodierter Daten in maschinell lesbarer Form in den Computer. Es werden drei Formen unterschieden: die direkte Dateneingabe ohne Zwischenspeicherung, die halbdirekte Dateneingabe als zweistufiges Verfahren mit Urbelegen, deren Daten zwischenzeitlich auf einem maschinell lesbaren Datenträger liegen, und die indirekte Dateneingabe als dreistufiges Verfahren, bei dem die Daten zwischenzeitlich auf einem nicht maschinell lesbaren Datenträger vorliegen und erst noch in maschinenlesbare Form gebracht werden müssen.',
    },
    {
      title: 'Halbdirekte Dateneingabe im Detail',
      content:
        'Bei der halbdirekten Dateneingabe mit Urbelegen kommen Strichcodes (1D-Codes wie Barcode/EAN, 2D-Codes wie QR-Codes, kodiert über Reihenfolge und Dicke der Striche bzw. Punkte), Markierungen (Bedeutung ergibt sich aus der Position auf dem Formular, wenige Kodierungsmöglichkeiten, abnehmende Bedeutung) sowie maschinell lesbare OCR-Schriften zur Texterkennung zum Einsatz. Bei der halbdirekten Dateneingabe mit Karten unterscheidet man Magnetstreifen (ca. 1.024 Bit auf drei Spuren, billige Herstellung, aber beschränkte Speicherkapazität), RFID (Radiofrequenzidentifikation über Transponder und Lesegerät) und Chips (Schutz der Daten vor Auslesen durch ein Passwort). In allen Fällen sind die Daten zwischenzeitlich bereits maschinell lesbar gespeichert.',
    },
    {
      title: 'Indirekte Dateneingabe im Detail',
      content:
        'Bei der indirekten Dateneingabe liegen die Daten zunächst nicht maschinell lesbar vor (z. B. auf Papier) und müssen in einem dreistufigen Verfahren erst umgewandelt werden. Man unterscheidet die manuelle Variante, bei der ein Mensch die Daten von Hand überträgt (begrenzt durch die menschliche Aufnahmefähigkeit: max. ca. 3 Sekunden, max. 5 Objekte gleichzeitig), und die semi-automatische Variante mittels Texterkennung und lernender Algorithmen (z. B. OCR-Scanning von Dokumenten durch einen Dienstleister). Ein Beispiel aus der Vorlesung zeigt, wie die Formatierung einer IBAN die manuelle Eingabe erleichtert: „DE70790800520009845845" ist fehleranfällig, „DE70 7908 0052 0009 8458 45" mit Leerzeichen ist deutlich weniger fehleranfällig.',
    },
    {
      title: 'Funktionen und Transaktionen',
      content:
        'Funktionen werden aus Aufgaben abgeleitet und sind Tätigkeiten, die den Zustand bzw. die Lage eines Objekts oder Subjekts verändern; eine Funktionsbeschreibung folgt dem Muster Verb + Substantiv + Adjektiv, z. B. „Text schreiben" oder „Fehler korrigieren" als Teilfunktionen der übergeordneten Aufgabe „Diplomarbeit schreiben". Transaktionen sind dagegen die Programmteile, die Daten transformieren und anschließend erfassen (einfügen), ändern, löschen oder anzeigen. Transaktionen müssen dabei die ACID-Eigenschaften erfüllen: atomar, constant, independent und durable, also entweder vollständig oder gar nicht ausgeführt werden, einen konsistenten Zustand hinterlassen, unabhängig von anderen Transaktionen ablaufen und dauerhaft gespeichert bleiben.',
    },
    {
      title: 'Programmablaufplan (DIN 66001)',
      content:
        'Der Programmablaufplan (PAP) ist die grafische Darstellung des Entwurfs eines Algorithmus nach der Norm DIN 66001 und verwendet fünf feste Symbole. Der Kreis ist ein Kontrollpunkt und stellt ein Ereignis dar, formuliert als Aussage. Das Rechteck stellt eine Aktivität dar (eine Transaktion oder einen Prozess), formuliert als Verb plus Substantiv oder als Formel. Die Raute stellt eine Verzweigung bzw. Entscheidung dar, formuliert als geschlossene Frage mit nur Ja- oder Nein-Antwort. Das Parallelogramm stellt Ein- oder Ausgabe von Daten dar, formuliert als Verb plus Daten, und der Pfeil zeigt die Reihenfolge der Schritte an.',
    },
    {
      title: 'IF … THEN … ELSE und Boolesche Algebra',
      content:
        'IF … THEN … ELSE ist die grundlegendste Form der Datenverarbeitung bzw. des Quellcodes: Eine Transaktion und die daraus folgenden Datenoperationen werden nur ausgeführt, wenn eine bestimmte Bedingung erfüllt ist. Bei verschachtelten Bedingungen gilt die Regel: Ein ELSE bezieht sich immer auf das zuletzt davorstehende IF, das noch kein eigenes ELSE hatte. Bedingungen selbst werden mit den booleschen Operatoren UND, ODER und NICHT sowie Variablen formuliert, die entweder WAHR oder FALSCH sind; UND ist nur dann WAHR, wenn beide Seiten WAHR sind, ODER ist bereits WAHR, wenn mindestens eine Seite WAHR ist.',
    },
    {
      title: 'Rechnernetz: Betriebsverfahren und Topologien',
      content:
        'Ein Rechnernetz ist nach ISO eine Anordnung von Knoten (Rechnern, Endgeräten) und Verbindungen (Übertragungsmedien wie Kabel-, Funk- oder optische Verbindung) und generell ein Zusammenschluss selbstständiger, unterschiedlicher elektronischer Geräte. Beim Betriebsverfahren unterscheidet man Simplex (Übertragung nur in eine Richtung), Halbduplex (beide Richtungen möglich, aber nicht gleichzeitig) und Duplex (beide Richtungen gleichzeitig). Bei der physischen Topologie unterscheidet die Vorlesung die Punkt-zu-Punkt-Topologie (grundlegend, störungs- und abhörsicher, kein Routing), die Stern-Topologie (Punkt-zu-Punkt zum zentralen Verteiler; Verteilerausfall = Netzausfall), die Ring-Topologie (Punkt-zu-Punkt zum Nachbarn; Rechnerausfall = Netzausfall, zudem Abhörgefahr), die Bus-Topologie (alle Teilnehmer am gleichen Medium; Mediumausfall = Netzausfall) sowie das vermaschte Netz.',
    },
    {
      title: 'Übertragungskapazität und -geschwindigkeit',
      content:
        'Bei der Datenübertragung zwischen zwei Datenstationen unterscheidet man die Geschwindigkeit (die physikalische Ausbreitung des Signals, ca. 75 % der Lichtgeschwindigkeit, gemessen in km/h) von der Übertragungskapazität (die Datenmenge pro Zeiteinheit, gemessen in kBit/s). Gilder’s Law – als Basis für IoT beschrieben – besagt, dass sich die Anzahl der übertragenen Bits pro Sekunde alle 9 Monate verdoppelt, eine geometrische Reihe mit dem Faktor 2 (Y = a·2^x). Beim logischen Blick auf ein Netz kommen zur physischen Topologie außerdem die logische Topologie (z. B. Peer-to-Peer beim Filesharing), die Übertragungsrate in Bit pro Sekunde, Ausfall- und Abhörsicherheit sowie DNS als „Adressbuch" des Netzes hinzu.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Worin unterscheiden sich direkte, halbdirekte und indirekte Dateneingabe grundlegend voneinander?',
        options: [
          'In der Anzahl der Verfahrensstufen und darin, ob die Daten zwischenzeitlich maschinell lesbar gespeichert sind oder nicht',
          'Nur in der Farbe der verwendeten Eingabegeräte',
          'Direkte Dateneingabe verwendet immer RFID, halbdirekte immer Tastaturen',
          'Es gibt keinen inhaltlichen Unterschied, nur unterschiedliche Fachbegriffe für denselben Vorgang',
        ],
        correct: 0,
        explain:
          'Direkt erfolgt ohne Zwischenspeicherung, halbdirekt ist ein zweistufiges Verfahren mit maschinell lesbarer Zwischenspeicherung (z. B. Barcode), indirekt ein dreistufiges Verfahren, bei dem die Daten zunächst nicht maschinell lesbar vorliegen (z. B. Papier) und erst konvertiert werden müssen.',
      },
      {
        q: 'Welche Beispiele nennt die Vorlesung für halbdirekte Dateneingabe?',
        options: [
          'Handschriftliche Notizen und mündliche Diktate',
          'Strichcodes (z. B. EAN, QR), Markierungen sowie Magnetstreifen, RFID und Chips',
          'Ausschließlich Sprachassistenten',
          'Nur manuell eingetippte Zahlenfolgen',
        ],
        correct: 1,
        explain:
          'Halbdirekte Dateneingabe erfolgt über Urbelege (Strichcodes, Markierungen, OCR-Schrift) oder Karten (Magnetstreifen, RFID, Chip) – die Daten sind dabei zwischenzeitlich bereits maschinell lesbar gespeichert.',
      },
      {
        q: 'Wie definiert die Vorlesung eine Transaktion?',
        options: [
          'Eine Transaktion ist eine Tätigkeit, die den Zustand eines Objekts oder Subjekts verändert',
          'Eine Transaktion ist ein Programmteil, das Daten transformiert und anschließend erfasst, ändert, löscht oder anzeigt',
          'Eine Transaktion ist ein grafisches Symbol im Programmablaufplan',
          'Eine Transaktion ist eine Zwischenspeicherung von Daten auf einem Magnetstreifen',
        ],
        correct: 1,
        explain:
          'Transaktionen sind laut Vorlesung Programmteile, die Daten transformieren und danach einfügen (erfassen), ändern, löschen oder anzeigen. Die erste Option beschreibt stattdessen eine Funktion.',
      },
      {
        q: 'Wofür stehen die vier Buchstaben von ACID bei Transaktionen laut Vorlesung?',
        options: [
          'Atomar, constant, independent, durable',
          'Analog, codiert, indirekt, direkt',
          'Automatisch, complex, isoliert, dauerhaft',
          'Aktiv, connected, integriert, digital',
        ],
        correct: 0,
        explain:
          'Die Folie nennt Transaktionen als ACID: atomar, constant, independent, durable – sie werden vollständig oder gar nicht ausgeführt, hinterlassen einen konsistenten Zustand, laufen unabhängig ab und bleiben dauerhaft gespeichert.',
      },
      {
        q: 'Welches Symbol stellt im Programmablaufplan nach DIN 66001 eine Verzweigung (Entscheidung) dar?',
        options: ['Der Kreis', 'Das Rechteck', 'Die Raute', 'Das Parallelogramm'],
        correct: 2,
        explain:
          'Die Raute stellt eine Verzweigung bzw. Entscheidung dar und wird als geschlossene Frage mit nur Ja- oder Nein-Antwort formuliert; der Kreis steht für Ereignisse, das Rechteck für Aktivitäten und das Parallelogramm für Ein-/Ausgabe.',
      },
      {
        q: 'Was unterscheidet Simplex, Halbduplex und Duplex bei Übertragungsverfahren?',
        options: [
          'Simplex überträgt nur in eine Richtung, Halbduplex in beide Richtungen aber nicht gleichzeitig, Duplex in beide Richtungen gleichzeitig',
          'Simplex ist immer die schnellste Übertragungsart',
          'Halbduplex funktioniert nur mit Glasfaserkabeln',
          'Duplex bedeutet, dass zwei getrennte physische Netze verwendet werden',
        ],
        correct: 0,
        explain:
          'Simplex kennt nur eine Übertragungsrichtung, Halbduplex erlaubt beide Richtungen abwechselnd, Duplex beide Richtungen gleichzeitig.',
      },
      {
        q: 'Was gibt die Übertragungskapazität einer Datenübertragung an?',
        options: [
          'Die Entfernung zwischen zwei Datenstationen in Kilometern',
          'Die Datenmenge pro Zeiteinheit, z. B. in kBit/s',
          'Die Anzahl der Netzknoten in einem Rechnernetz',
          'Die Fehlerquote bei der Übertragung',
        ],
        correct: 1,
        explain:
          'Die Übertragungskapazität beschreibt die Datenmenge pro Zeiteinheit (kBit/s); die physikalische Ausbreitungsgeschwindigkeit des Signals (ca. 75 % der Lichtgeschwindigkeit) ist dagegen die Übertragungsgeschwindigkeit.',
      },
      {
        q: 'Was besagt Gilder’s Law laut Vorlesung?',
        options: [
          'Die Anzahl der übertragenen Bits pro Sekunde verdoppelt sich alle 9 Monate',
          'Die Speicherkapazität von Festplatten verdoppelt sich jährlich',
          'Die Anzahl der Transistoren auf einem Chip verdoppelt sich alle 18 Monate',
          'Die Übertragungsgeschwindigkeit bleibt über die Zeit konstant',
        ],
        correct: 0,
        explain:
          'Gilder’s Law (als Basis für IoT genannt) beschreibt eine geometrische Reihe mit Faktor 2: Die Zahl der übertragenen Bits pro Sekunde verdoppelt sich alle 9 Monate. Die Aussage zu Transistoren beschreibt stattdessen Moore’s Law.',
      },
    ],
    advanced: [
      {
        q: 'Sie lagern die Erfassung eingehender Rechnungen aus: Ein Dienstleister scannt die analogen Belege ein, wandelt sie per Software in codierte Informationen um, und die entstandene Datei wird in Ihr Buchhaltungssystem eingespielt. Um welche Methode der Dateneingabe handelt es sich?',
        options: [
          'Halbdirekte Dateneingabe',
          'Semi-automatische, direkte Dateneingabe',
          'Manuelle, indirekte Dateneingabe',
          'Semi-automatische, indirekte Dateneingabe',
        ],
        correct: 3,
        explain:
          'Die Papierbelege liegen ursprünglich nicht maschinell lesbar vor und müssen erst per Texterkennung (OCR) umgewandelt werden – das macht es indirekt; da diese Umwandlung automatisiert per Scan-Software statt von Hand erfolgt, ist es zudem semi-automatisch, nicht manuell.',
      },
      {
        q: 'Kinotickets werden über eine App bestellt; der Kunde erhält digital einen 8-stelligen Abholcode. An der Kasse tippt die Kassiererin diesen Code manuell in das Kassensystem ein, woraufhin die Tickets gedruckt werden. Um welche Art der Dateneingabe handelt es sich an der Kasse?',
        options: [
          'Halbdirekte Dateneingabe',
          'Manuelle, indirekte Dateneingabe',
          'Semi-automatische, direkte Dateneingabe',
          'Direkte Dateneingabe',
        ],
        correct: 1,
        explain:
          'Der Code liegt zwar schon digital vor, wird an der Kasse aber manuell von der Kassiererin eingetippt statt automatisch übernommen – damit ist es indirekt (keine direkte Übernahme ins System) und manuell (durch einen Menschen eingegeben).',
      },
      {
        q: 'Worin unterscheidet sich eine Funktion von einer Transaktion in der Datenverarbeitung?',
        options: [
          'Eine Funktion ist eine Tätigkeit, die Zustand/Lage eines Objekts verändert (Verb + Substantiv + Adjektiv); eine Transaktion ist ein Programmteil, das Daten transformiert und dann erfasst, ändert, löscht oder anzeigt',
          'Funktionen und Transaktionen sind austauschbare Bezeichnungen für denselben Begriff',
          'Eine Transaktion ist übergeordnet und wird in mehrere Funktionen zerlegt, die ACID-Eigenschaften besitzen',
          'Eine Funktion beschreibt ausschließlich Datenbankoperationen, eine Transaktion ausschließlich Nutzeroberflächen',
        ],
        correct: 0,
        explain:
          'Funktionen werden aus Aufgaben abgeleitet und verändern Zustand/Lage eines Objekts oder Subjekts (z. B. „Fehler korrigieren"), während Transaktionen die konkreten Programmteile sind, die Daten transformieren und dann erfassen, ändern, löschen oder anzeigen – und die ACID-Eigenschaften erfüllen müssen.',
      },
      {
        q: 'Gegeben seien die Variablen A = 9 und B = 7. Welchen Wahrheitswert hat der Ausdruck (A > B) UND (A > 10)?',
        options: ['WAHR', 'FALSCH', 'Nicht bestimmbar ohne weitere Angaben', 'WAHR, aber nur für gerade Zahlen'],
        correct: 1,
        explain:
          '(A > B) ist WAHR, da 9 > 7. (A > 10) ist FALSCH, da 9 nicht größer als 10 ist. Da UND nur dann WAHR ergibt, wenn beide Seiten WAHR sind, ist das Gesamtergebnis FALSCH.',
      },
      {
        q: 'In einem verschachtelten IF … THEN … ELSE ohne Klammerung: Auf welches IF bezieht sich ein ELSE, wenn mehrere IFs ohne eigenes ELSE aufeinanderfolgen?',
        options: [
          'Immer auf das allererste IF im gesamten Programm',
          'Immer auf das zuletzt davorstehende IF, das noch kein eigenes ELSE hatte',
          'Es wird zufällig einem der offenen IFs zugeordnet',
          'Auf gar keines – das ist syntaktisch nicht erlaubt',
        ],
        correct: 1,
        explain:
          'Die Vorlesung nennt explizit die Regel: „ELSE bezieht sich immer auf das letzte davor stehende IF, welches kein ELSE hatte" – bekannt auch als das „Dangling-Else"-Problem.',
      },
      {
        q: 'Welches Symbol wird im Programmablaufplan verwendet, um Ein- oder Ausgabe von Daten darzustellen, formuliert als „Verb plus Daten"?',
        options: ['Der Kreis', 'Das Rechteck', 'Das Parallelogramm', 'Die Raute'],
        correct: 2,
        explain:
          'Das Parallelogramm stellt Ein-/Ausgabe von Daten dar. Der Kreis steht für Ereignisse/Kontrollpunkte, das Rechteck für Aktivitäten/Transaktionen und die Raute für Verzweigungen/Entscheidungen.',
      },
      {
        q: 'Welche Aussage zur Bus-Topologie ist korrekt?',
        options: [
          'Sie ist eine Punkt-zu-Punkt-Verbindung zu einem zentralen Verteiler',
          'Alle Teilnehmer nutzen dasselbe Übertragungsmedium; fällt dieses aus, fällt das gesamte Netz aus',
          'Der Ausfall eines einzelnen Nachbarrechners führt automatisch zum Ausfall des gesamten Netzes',
          'Sie gilt als grundsätzlich sicherer gegen Abhören als die Punkt-zu-Punkt-Topologie',
        ],
        correct: 1,
        explain:
          'Bei der Bus-Topologie teilen sich alle Teilnehmer ein gemeinsames Medium; fällt dieses Medium aus, fällt das gesamte Netz aus. Die Beschreibung „Punkt-zu-Punkt zum Verteiler" trifft auf die Stern-Topologie zu, „Rechnerausfall = Netzausfall" auf die Ring-Topologie, und als besonders abhörsicher gilt laut Vorlesung die Punkt-zu-Punkt-Topologie.',
      },
      {
        q: 'Was unterscheidet einen Rich Client von einem Thin Client im Schichtenmodell der Vorlesung?',
        options: [
          'Beim Rich Client laufen Eingabe, Ausgabe und Verarbeitung lokal beim Nutzer, nur die Speicherung liegt remote; beim Thin Client laufen zusätzlich Verarbeitung und Speicherung remote, lokal bleiben nur Eingabe und Ausgabe',
          'Rich Client und Thin Client unterscheiden sich ausschließlich in der Bildschirmgröße des Endgeräts',
          'Beim Thin Client läuft die gesamte Anwendung inklusive Speicherung lokal auf dem Client',
          'Ein Ultra Thin Client verarbeitet Daten stets lokal, speichert sie aber remote',
        ],
        correct: 0,
        explain:
          'Im Diagramm „Verteilte Systeme" bleibt beim Rich Client nur die Speicherung remote (Eingabe, Verarbeitung, Ausgabe sind lokal), beim Thin Client sind zusätzlich Verarbeitung und Speicherung remote (nur Eingabe/Ausgabe lokal), und beim Ultra Thin Client ist sogar nur noch die Ausgabe lokal.',
      },
    ],
    pro: [
      {
        q: 'Im Mittelalter transportiert eine Taube fünf Pergamentrollen, die beidseitig mit je 25 Zeilen zu je 60 Zeichen beschriftet sind. Wie lange dauert es, diese Informationen ASCII-codiert (1 Zeichen = 8 Bit) über eine Satellitenverbindung mit 128 kBit/s zu übertragen (gerundet)?',
        options: ['Drei Sekunden', 'Fünf Sekunden', 'Eine Minute', 'Eine Sekunde'],
        correct: 3,
        explain:
          '5 Rollen × 2 Seiten = 10 Seiten à 25 × 60 = 1.500 Zeichen, macht 15.000 Zeichen. Mit 8 Bit pro Zeichen (ASCII) ergeben sich 120.000 Bit. Bei 128.000 Bit/s dauert die Übertragung 120.000 / 128.000 ≈ 0,94 Sekunden, gerundet also eine Sekunde.',
      },
      {
        q: 'Ein Unternehmen hat eine DSL-Verbindung mit 6.000 kBit/s. Wie lange dauert es ungefähr, einen 8-GB-Film herunterzuladen (1 Byte = 8 Bit, 1 GB = 1.024 MB, 1 MB = 1.024 KB)?',
        options: ['Eine Stunde', 'Zehn Minuten', '3 Stunden', 'Einen Tag'],
        correct: 2,
        explain:
          '8 GB = 8.192 MB = 8.388.608 KB, mal 8 ergibt 67.108.864 KBit. Bei 6.000 KBit/s dauert der Download 67.108.864 / 6.000 ≈ 11.185 Sekunden, das sind rund 186 Minuten bzw. ca. 3,1 Stunden – also etwa 3 Stunden.',
      },
      {
        q: 'Gegeben seien A = 1, C = 3, B = 3. Welches Ergebnis liefert: IF NOT (A = 1 AND C = 5) AND B = 3 THEN 2 ELSE 5?',
        options: ['2', '5', '1', 'Die Bedingung ist nicht auswertbar'],
        correct: 0,
        explain:
          'A = 1 ist WAHR, C = 5 ist FALSCH (C ist 3) → (A=1 AND C=5) ist FALSCH → NOT davon ist WAHR. WAHR AND (B=3, ebenfalls WAHR) ergibt WAHR, also greift THEN und das Ergebnis ist 2.',
      },
      {
        q: 'Gegeben sei A = 8. Welches Ergebnis liefert folgende Verschachtelung? IF A = 0 THEN P = 0 ELSE IF A > 25 THEN P = 0 ELSE IF A > 9 THEN P = 10 ELSE P = 20',
        options: ['P = 0', 'P = 10', 'P = 20', 'P = 8'],
        correct: 2,
        explain:
          'A = 0 ist FALSCH (A ist 8), also weiter zum nächsten ELSE-Zweig. A > 25 ist FALSCH. A > 9 ist ebenfalls FALSCH (8 ist nicht größer als 9). Damit greift der letzte ELSE-Zweig: P = 20.',
      },
      {
        q: 'Welche der folgenden Aussagen zur Dateneingabe ist FALSCH?',
        options: [
          'Bei der direkten Dateneingabe gibt es keine Zwischenspeicherung auf einem separaten Datenträger',
          'Bei der halbdirekten Dateneingabe liegen die Daten zwischenzeitlich auf einem maschinell lesbaren Datenträger vor, z. B. einem Barcode oder Magnetstreifen',
          'Bei der indirekten Dateneingabe liegen die Daten zwischenzeitlich auf einem nicht maschinell lesbaren Datenträger vor und müssen erst konvertiert werden',
          'RFID-Chips zählen laut Vorlesung zur indirekten Dateneingabe',
        ],
        correct: 3,
        explain:
          'RFID wird in der Vorlesung explizit als halbdirekte Dateneingabe mit Karten eingeordnet, da die Daten auf dem Transponder bereits maschinell lesbar gespeichert sind – nicht als indirekte Dateneingabe. Die übrigen drei Aussagen entsprechen den Definitionen der Folien.',
      },
      {
        q: 'Welche der folgenden Aussagen zum Programmablaufplan nach DIN 66001 ist FALSCH?',
        options: [
          'Die Raute stellt eine Verzweigung dar und wird als geschlossene Frage formuliert',
          'Das Rechteck stellt eine Aktivität bzw. Transaktion dar und wird als Verb plus Substantiv formuliert',
          'Der Kreis stellt Ein-/Ausgabe von Daten dar und wird als Verb plus Daten formuliert',
          'Der Pfeil stellt die Reihenfolge der Schritte dar',
        ],
        correct: 2,
        explain:
          'Der Kreis ist laut Vorlesung ein Kontrollpunkt und stellt ein Ereignis dar, formuliert als Aussage – nicht Ein-/Ausgabe von Daten. Diese Rolle übernimmt tatsächlich das Parallelogramm. Die anderen drei Aussagen entsprechen exakt den Folieninhalten.',
      },
      {
        q: 'Welche der folgenden Aussagen zu den physischen Netz-Topologien ist FALSCH?',
        options: [
          'Bei der Ring-Topologie führt der Ausfall eines Rechners zum Netzausfall',
          'Bei der Stern-Topologie führt ein Ausfall des zentralen Verteilers zum Netzausfall',
          'Die Punkt-zu-Punkt-Topologie gilt laut Vorlesung als grundlegend, aber unsicher gegenüber Abhören',
          'Bei der Bus-Topologie teilen sich alle Teilnehmer dasselbe Übertragungsmedium',
        ],
        correct: 2,
        explain:
          'Die Punkt-zu-Punkt-Topologie wird in der Vorlesung ausdrücklich als „störungs- und abhörsicher" beschrieben, nicht als unsicher gegenüber Abhören – diese Abhörgefahr wird stattdessen der Ring-Topologie zugeschrieben. Die übrigen Aussagen entsprechen den Folien.',
      },
    ],
  },
};
