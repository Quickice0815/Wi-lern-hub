export interface TrueFalseStatement {
  id: number;
  text: string;
  correct: boolean;
  explain: string;
}

// ============================================================
// RICHTIG-ODER-FALSCH-TRAINER — 47 Klausur-Behauptungen aus der
// Vorlesung "Einführung in die Wirtschaftsinformatik". Nutzer
// klickt nur Ja/Nein, die Begründung liefert die App.
// ============================================================

export const STATEMENTS: TrueFalseStatement[] = [
  {
    id: 1,
    text: 'Bei einem Barcode-Code stellen schwarze und weiße Linien unterschiedlicher Dicke Zeichen eines Zeichenvorrats dar. Arabische Ziffern stellen Zeichen eines anderen Zeichenvorrats dar.',
    correct: true,
    explain:
      'Ein Code ordnet Zeichen eines Zeichenvorrats den Zeichen eines anderen Zeichenvorrats zu. Beim Barcode ist das Strichmuster ein eigener Zeichenvorrat, die darunter gedruckten arabischen Ziffern (für Menschen lesbar) ein zweiter, unabhängiger Zeichenvorrat für denselben Inhalt.',
  },
  {
    id: 2,
    text: 'Durch die Kompilation wird der Algorithmus in Maschinencode umgewandelt.',
    correct: false,
    explain:
      'Kompiliert wird der Quellcode/Programmcode (ein Algorithmus, formuliert in einer konkreten Programmiersprache), nicht der Algorithmus selbst. Der Algorithmus ist die abstrakte, sprachunabhängige Beschreibung der Lösung — er muss erst als Quellcode implementiert werden, bevor er kompiliert werden kann.',
  },
  {
    id: 3,
    text: 'Die Zentrale verlangt von der Filiale, dass die Umsatzdaten jeden Tag nach Abschluss des Arbeitstages übermittelt werden. Hierbei handelt es sich um On-Demand-Kommunikation zwischen den Servern der Filiale und der Zentrale.',
    correct: false,
    explain:
      'Eine feste, täglich wiederkehrende Übermittlung nach Geschäftsschluss ist eine periodische (geplante) Übertragung, kein On-Demand-Abruf. On-Demand bedeutet, dass die Daten gezielt auf Anfrage abgerufen werden — nicht automatisch nach einem festen Zeitplan.',
  },
  {
    id: 4,
    text: 'Bei dem Term www.hs-coburg.de handelt es sich um eine URL-Adresse.',
    correct: true,
    explain:
      'www.hs-coburg.de identifiziert die Adresse eines Webservers im Internet und wird im Sprachgebrauch der Vorlesung als URL-Adresse (Domain/Adresse einer Ressource) bezeichnet.',
  },
  {
    id: 5,
    text: 'Der Begriff Line of Codes (LoC) beschreibt die Anzahl der Zeilen im Maschinencode.',
    correct: false,
    explain:
      'LoC zählt die Zeilen im Quellcode/Programmcode (dem für Menschen lesbaren, in einer Programmiersprache geschriebenen Code) — nicht im binären Maschinencode, den ein Compiler daraus erzeugt.',
  },
  {
    id: 6,
    text: 'Die Adaptionsart 4 bei einer Standardsoftware kann mit dem Betriebsmodell On-Premise kombiniert werden.',
    correct: true,
    explain:
      'Adaptionsart 4 (Individualentwicklung — eigene Programmierung zusätzlicher Funktionen) passt zur Standardsoftware, für die das Adaptionskonzept gedacht ist, und lässt sich sinnvoll mit On-Premise kombinieren, da dort die volle Kontrolle über Code und Infrastruktur besteht — bei On-Demand/SaaS sind tiefe Individualentwicklungen dagegen meist eingeschränkt.',
  },
  {
    id: 7,
    text: 'Die hexadezimale Zahl FF entspricht der Dezimalzahl 4.095.',
    correct: false,
    explain:
      'FF₁₆ = 15·16 + 15 = 255₁₀, nicht 4.095. Die Dezimalzahl 4.095 entspräche FFF₁₆ (15·256 + 15·16 + 15).',
  },
  {
    id: 8,
    text: 'Je größer die Farbtiefe, desto größer ist der Speicherbedarf eines Bildes.',
    correct: false,
    explain:
      'Als allgemeine, unqualifizierte Aussage stimmt das nicht für jedes Bild: Bei Vektorgrafiken bestimmt die Farbtiefe den Speicherbedarf gar nicht erst, da sie mathematisch (nicht pixelweise) beschrieben werden. Nur bei Pixelgrafiken hängt der unkomprimierte Speicherbedarf von Auflösung × Farbtiefe ab.',
  },
  {
    id: 9,
    text: 'Bei der automatischen Erfassung von Autokennzeichen auf den Bayerischen Autobahnen mit einem Lesegerät handelt es sich um halbdirekte Dateneingabe.',
    correct: true,
    explain:
      'Das Kennzeichen selbst ist der Urbeleg, der per optischer Texterkennung (OCR) maschinell gelesen wird — genau das ist die Definition der halbdirekten Dateneingabe (zweistufiges Verfahren über einen maschinell lesbaren Zwischenträger).',
  },
  {
    id: 10,
    text: 'Bei offenen Posten auf einem Kreditorenkonto im Wert von 5.000 Euro handelt es sich um Bestandsdaten.',
    correct: false,
    explain:
      'Offene Posten sind einzelne, noch nicht ausgeglichene Buchungen (Ereignisse) — das sind Bewegungsdaten. Bestandsdaten wären dagegen ein aggregierter Zustand zu einem Zeitpunkt, z. B. der Saldo/Kontostand am Ende des Tages.',
  },
  {
    id: 11,
    text: 'Es spielt keine Rolle, wo sich Programmcode befindet (im Hauptspeicher oder auf der Festplatte), um von der CPU ausgeführt zu werden.',
    correct: false,
    explain:
      'Nach der Von-Neumann-Architektur kann die CPU nur Programme ausführen, die im Hauptspeicher (RAM) liegen. Code auf der Festplatte muss erst in den Hauptspeicher geladen werden, bevor der Prozessor ihn ausführen kann — der Ort spielt also sehr wohl eine Rolle.',
  },
  {
    id: 12,
    text: 'Mit ERM-Diagrammen lässt sich das logische Datenbankmodell graphisch beschreiben.',
    correct: false,
    explain:
      'Das ERM ist die graphische Beschreibungssprache des semantischen Datenmodells (Objekte, Beziehungen, Attribute) — nicht des logischen Datenbankmodells, das zusätzlich Feldformate und Primärschlüssel im Kontext eines konkreten Datenbankmodells (z. B. dem relationalen Modell) festlegt.',
  },
  {
    id: 13,
    text: 'Bei einem PTP-Prozess wird die eingegangene Ware direkt auf die Aufwandskonten gebucht.',
    correct: true,
    explain:
      'Procure to Pay (PTP) beschafft für den Verbrauch — der Wareneingang wird direkt als Aufwand gebucht, ohne den Umweg über einen Bestand. Bei Procure to Stock (PTS) wird dagegen für das Lager beschafft und Bestand gebucht.',
  },
  {
    id: 14,
    text: 'Bei der Passquote von 95 % von Toni Kroos handelt es sich um eine dimensionslose Kennzahl.',
    correct: true,
    explain:
      'Die Passquote ist ein Quotient (erfolgreiche Pässe ÷ gespielte Pässe) und wird als Prozentwert ausgedrückt — ein reines Verhältnis ohne physikalische Einheit, also dimensionslos.',
  },
  {
    id: 15,
    text: 'Das Mooresche Gesetz verliert seine Gültigkeit nicht, auch wenn die Transistoren bzw. integrierten Schaltungen die Größe eines Atoms erreichen.',
    correct: false,
    explain:
      'Moore’s Law beschreibt die Verdopplung der Schaltkreisdichte pro Fläche alle zwei Jahre. Das setzt physikalisch voraus, dass Transistoren immer weiter verkleinert werden können — erreichen sie Atomgröße, ist diese physikalische Grenze erreicht, und das Gesetz verliert seine Gültigkeit.',
  },
  {
    id: 16,
    text: 'Ein Fremdschlüssel ist ein Attribut einer Tabelle, das in einer anderen Tabelle ein Primärschlüssel ist.',
    correct: true,
    explain:
      'Das ist genau die Definition: Bei der Überführung eines ERM in Tabellen wird z. B. bei einer 1:N-Beziehung der Primärschlüssel des 1-Entitytyps als Fremdschlüssel in die Tabelle des N-Entitytyps übernommen.',
  },
  {
    id: 17,
    text: 'Im relationalen Datenbankmodell können zwei wertgleiche Tupel nicht vorkommen.',
    correct: true,
    explain:
      'Eine Relation (Tabelle) ist mathematisch eine Menge von Tupeln — und eine Menge enthält per Definition keine doppelten (wertgleichen) Elemente. Zwei Zeilen mit exakt denselben Attributwerten dürfen daher nicht vorkommen.',
  },
  {
    id: 18,
    text: 'Für die Analyse der Anbieter von neuartigen Informationstechnologien liefert die Methode Gartner Hype Cycle wertvolle Informationen.',
    correct: false,
    explain:
      'Der Gartner Hype Cycle bewertet den Nutzen bzw. Reifegrad einer Technologie über die Zeit — nicht die Anbieter/Dienstleister dahinter. Die Bewertung von Anbietern übernimmt stattdessen der Gartner Magic Quadrant.',
  },
  {
    id: 19,
    text: 'Für ein Standardbuchhaltungsprogramm soll aufgrund der verbindlichen Anforderungen des Bundesfinanzministeriums eine Schnittstelle für die E-Bilanz entwickelt werden. Der Softwarehersteller stellt hierfür ein Update bereit. Es handelt sich hierbei um adaptive Wartung.',
    correct: true,
    explain:
      'Adaptive Wartung passt Software an geänderte äußere/gesetzliche Rahmenbedingungen an — genau das trifft auf eine gesetzlich vorgeschriebene E-Bilanz-Schnittstelle zu, unabhängig davon, ob sie als Update oder Upgrade ausgeliefert wird.',
  },
  {
    id: 20,
    text: 'Durch die Einführung von RFID-Chips können Barcodes und QR-Codes vollständig ersetzt werden.',
    correct: true,
    explain:
      'RFID-Chips übernehmen dieselbe Funktion (maschinenlesbare Identifikation über einen Urbeleg) wie Barcode/QR-Code, benötigen dabei aber keine optische Sichtlinie und keinen gedruckten Code — technisch können sie deren Funktion vollständig übernehmen.',
  },
  {
    id: 21,
    text: 'Bei einem QR-Code stellen schwarze und weiße Vierecke Zeichen eines Zeichenvorrats dar. Internationale Zeichen und Ziffern sind Zeichen eines anderen Zeichenvorrats.',
    correct: true,
    explain:
      'Wie beim Barcode gilt: Das 2D-Punktmuster ist ein eigener Zeichenvorrat, die für Menschen lesbaren internationalen Zeichen/Ziffern ein zweiter, unabhängiger Zeichenvorrat für denselben Inhalt.',
  },
  {
    id: 22,
    text: 'Durch die Kompilation wird Maschinencode in Quellcode umgewandelt.',
    correct: false,
    explain:
      'Die Kompilation läuft in die entgegengesetzte Richtung: Quellcode wird in Maschinencode übersetzt. Die Rückrichtung (Maschinencode → Quellcode) wäre eine Dekompilation.',
  },
  {
    id: 23,
    text: 'Mit Line of Codes (LoC) lässt sich der Softwareumfang treffend beschreiben.',
    correct: true,
    explain:
      'LoC ist eine gängige, wenn auch grobe Kennzahl zur Beschreibung des Umfangs einer Software (z. B. auch zur Einordnung von Fehlerquoten pro 1.000 LoC) und wird in der Vorlesung entsprechend genutzt.',
  },
  {
    id: 24,
    text: 'Die Adaptionsart 2 bei einer Individualsoftware kann mit dem Betriebsmodell On-Demand kombiniert werden.',
    correct: false,
    explain:
      'Adaptionsarten (wie Customizing = Adaptionsart 2) beschreiben, wie man vorgefertigte Standardsoftware an den eigenen Bedarf anpasst. Individualsoftware wird dagegen von Grund auf maßgeschneidert entwickelt — der Begriff „Adaptionsart" passt hier gar nicht, unabhängig vom Betriebsmodell.',
  },
  {
    id: 25,
    text: 'Bei einem Saldo am Ende des Arbeitstages in Höhe von 5.000 Schrauben handelt es sich um Bestandsdaten.',
    correct: true,
    explain:
      'Ein Saldo/Bestand zu einem bestimmten Zeitpunkt (hier: Tagesende) ist ein Bestandswert über ein Objekt — genau die Definition von Bestandsdaten, analog zum Kontostand-Beispiel aus der Vorlesung.',
  },
  {
    id: 26,
    text: 'Gilders Law besagt, dass sich die Übertragungsgeschwindigkeit im Netz alle 9 Monate verdoppelt.',
    correct: false,
    explain:
      'Gilder’s Law bezieht sich auf die Übertragungskapazität (Anzahl übertragener Bits pro Sekunde), nicht auf die Übertragungsgeschwindigkeit (physikalische Ausbreitung des Signals). Diese beiden Größen sind in der Vorlesung explizit unterschieden.',
  },
  {
    id: 27,
    text: 'Mit einem Programmablaufplan lässt sich ein Algorithmus graphisch beschreiben.',
    correct: true,
    explain:
      'Der Programmablaufplan (PAP) ist genau dafür da: eine graphische Beschreibungssprache für Algorithmen mit standardisierten Symbolen für Start/Ende, Verarbeitung, Verzweigung usw.',
  },
  {
    id: 28,
    text: 'Bei einem PTS-Prozess wird die eingegangene Ware direkt auf die Bestandskonten gebucht.',
    correct: true,
    explain:
      'Procure to Stock (PTS) beschafft für das Lager — die eingehende Ware wird auf Bestand gebucht. Bei Procure to Pay (PTP) wird dagegen für den Verbrauch beschafft und direkt Aufwand gebucht.',
  },
  {
    id: 29,
    text: 'Das Akronym PaaS steht für Platform as a Service. Dabei handelt es sich um die Bereitstellung von Hardware-Komponenten auf Mietbasis.',
    correct: false,
    explain:
      'Die Abkürzung stimmt, die Beschreibung aber nicht: Die reine Vermietung von Hardware-Komponenten ist Infrastructure as a Service (IaaS). PaaS stellt zusätzlich eine komplette Entwicklungs-/Laufzeitplattform (Betriebssystem, Middleware) bereit.',
  },
  {
    id: 30,
    text: 'Mit Dokumentenmanagementsystemen lassen sich kodierte, nicht strukturierte Daten verwalten.',
    correct: true,
    explain:
      'Dokumente (Texte, Scans, PDFs) sind zeichencodiert, aber im Gegensatz zu Datenbanktabellen nicht strukturiert — genau dafür sind Dokumentenmanagementsysteme gedacht.',
  },
  {
    id: 31,
    text: 'Bei der Transformation eines ERM-Modells in ein relationales Datenbankmodell werden Entitytypen in Tabellen überführt. Relationshiptypen dagegen nicht.',
    correct: false,
    explain:
      'Auch Relationshiptypen können eine eigene Tabelle erhalten: Jede N:M-Beziehung wird zu einer eigenen Tabelle mit eigenem Primärschlüssel. Nur bei 1:N- und 1:1-Beziehungen ohne eigene Attribute entfällt die eigene Tabelle zugunsten eines Fremdschlüssels.',
  },
  {
    id: 32,
    text: 'Mit Managementinformationssystemen wird die vertikale Integration der Informationsverarbeitung umgesetzt.',
    correct: true,
    explain:
      'Die vertikale Integration verdichtet operative Daten von der OLTP-Ebene über CSCW bis zum Controlling (OLAP) — genau diese Verdichtung entlang der Managementpyramide leisten Managementinformationssysteme.',
  },
  {
    id: 33,
    text: 'Bei einem System zur elektronischen Übermittlung des Lagerbestandes von einer Produktionsstätte in Deutschland an eine firmeneigene Produktionsstätte in Indien handelt es sich um ein außenwirksames betriebliches Informationssystem.',
    correct: false,
    explain:
      'Außenwirksame Informationssysteme verbinden ein Unternehmen mit Akteuren AUSSERHALB seiner Grenzen. Zwei Produktionsstätten desselben Unternehmens auszutauschen ist dagegen unternehmensintern — auch über Landesgrenzen hinweg bleibt es ein internes (kein außenwirksames) System.',
  },
  {
    id: 34,
    text: 'Wenn in einem Netzwerk, welches auf der Bus-Topologie basiert, ein Server ausfällt, dann fällt das ganze Netzwerk aus.',
    correct: false,
    explain:
      'Bei der Bus-Topologie teilen sich alle Teilnehmer ein gemeinsames Übertragungsmedium — fällt DIESES Medium aus, fällt das Netz aus, nicht wenn ein einzelner Teilnehmer (Server) ausfällt. Rechnerausfall = Netzausfall gilt dagegen für die Ring-Topologie, Verteilerausfall = Netzausfall für die Stern-Topologie.',
  },
  {
    id: 35,
    text: 'Zur Speicherung einer Vektorgrafik mit 128 möglichen Farben wird ein Byte pro Pixel benötigt.',
    correct: false,
    explain:
      '„Byte pro Pixel" ist ein Konzept der Pixelgrafik. Vektorgrafiken bestehen aus mathematisch beschriebenen Grundelementen (Linien, Kurven, Polygone) und haben gar keine Pixel, auf die sich eine Farbtiefe pro Bildpunkt anwenden ließe.',
  },
  {
    id: 36,
    text: 'Antianforderungen können mit K.O.-Anforderungen gleichgesetzt werden.',
    correct: false,
    explain:
      'Beides sind zwar Ausschlusskriterien bei der Bewertung von Alternativen, aber unterschiedlicher Natur: K.O.-Anforderungen sind zwingende Muss-Kriterien, deren Fehlen zum Ausschluss führt; Antianforderungen beschreiben dagegen, was explizit NICHT vorhanden sein darf. Die beiden Konzepte sind nicht identisch und dürfen nicht gleichgesetzt werden.',
  },
  {
    id: 37,
    text: 'Die Visualisierungsmethode „Chernoff Faces" kann fürs Monitoring des betrieblichen Geschehens eingesetzt werden.',
    correct: true,
    explain:
      'Monitoring beantwortet die Frage „Was passiert gerade?". Chernoff Faces zeigen mehrere aktuelle Kennzahlen gleichzeitig als Gesichtsausdruck — damit lässt sich der aktuelle Zustand mehrerer Objekte (z. B. Filialen) auf einen Blick überwachen.',
  },
  {
    id: 38,
    text: 'Die Binärzahl 1 entspricht der Dezimalzahl 1.',
    correct: true,
    explain:
      'Die einstellige Binärzahl 1 hat denselben Wert wie im Dezimalsystem: 1·2⁰ = 1.',
  },
  {
    id: 39,
    text: 'Der Begriff Line of Codes (LoC) beschreibt die Anzahl der Zeilen im Algorithmus.',
    correct: false,
    explain:
      'LoC zählt Zeilen im Quellcode/Programmcode — also in der konkreten, in einer Programmiersprache geschriebenen Implementierung. Der Algorithmus selbst ist die abstrakte, sprachunabhängige Beschreibung und hat keine „Zeilen" im LoC-Sinn.',
  },
  {
    id: 40,
    text: 'Die Adaptionsart 1 bei einer Individualsoftware kann mit dem Betriebsmodell On-Premise kombiniert werden.',
    correct: false,
    explain:
      'Adaptionsart 1 (Auswahl aus der Softwarebibliothek) setzt eine Bibliothek vorgefertigter Module voraus, wie sie nur Standardsoftware-Anbieter haben. Individualsoftware wird komplett neu entwickelt — der Begriff „Adaptionsart" ist hier unabhängig vom Betriebsmodell nicht anwendbar.',
  },
  {
    id: 41,
    text: 'Beim Übergang der Farbtiefe von 24 Bit zu 32 Bit steigt der Speicherbedarf eines Bildes im JPEG-Format automatisch.',
    correct: true,
    explain:
      'Bei einem konkreten Pixelbild erhöht mehr Farbtiefe die pro Pixel zu speichernde Rohdatenmenge (Auflösung × Farbtiefe) — diese zusätzliche Information muss auch nach der Kompression noch codiert werden, der Speicherbedarf steigt also mit.',
  },
  {
    id: 42,
    text: 'Es spielt keine Rolle, wo sich Programmcode befindet (im Hauptspeicher oder auf der Festplatte), um von der CPU ausgeführt zu werden.',
    correct: false,
    explain:
      'Wie schon nach der Von-Neumann-Architektur festgelegt: Nur Code im Hauptspeicher kann direkt vom Prozessor ausgeführt werden. Code auf der Festplatte muss zuerst geladen werden.',
  },
  {
    id: 43,
    text: 'Das Gesetz von Gilder verliert seine Gültigkeit, wenn die Transistoren bzw. integrierten Schaltungen die Größe eines Atoms erreichen.',
    correct: false,
    explain:
      'Diese physikalische Grenze betrifft die Transistordichte auf einem Chip — also Moore’s Law, nicht Gilder’s Law. Gilder’s Law beschreibt die Verdopplung der Datenübertragungsrate im Netz und ist nicht direkt an die physische Transistorgröße gekoppelt.',
  },
  {
    id: 44,
    text: 'Je größer die Übertragungsgeschwindigkeit bei gleicher Übertragungskapazität, desto schneller können Daten transportiert werden.',
    correct: true,
    explain:
      'Übertragungsgeschwindigkeit (physikalische Ausbreitung des Signals) und Übertragungskapazität (Datenmenge pro Zeiteinheit) sind unterschiedliche Größen. Steigt die Geschwindigkeit bei gleichbleibender Kapazität, kommen einzelne Datenpakete schneller an — die Übertragung wird also schneller.',
  },
  {
    id: 45,
    text: 'Im relationalen Datenbankmodell können zwei wertgleiche Entitytypen nicht vorkommen.',
    correct: false,
    explain:
      'Die Eindeutigkeitsregel gilt für TUPEL (Zeilen/Datensätze), nicht für Entitytypen. Ein Entitytyp ist eine Struktur/Klasse (z. B. „Kunde"), keine einzelne Zeile — die Formulierung verwechselt die Ebenen.',
  },
  {
    id: 46,
    text: 'Für ein Standardbuchhaltungsprogramm soll aufgrund der verbindlichen Anforderungen des Bundesfinanzministeriums eine Schnittstelle für die E-Bilanz entwickelt werden. Der Softwarehersteller stellt hierfür eine neue Transaktion per Upgrade bereit. Es handelt sich hierbei um enhasive Wartung.',
    correct: false,
    explain:
      'Entscheidend für die Einordnung ist der AUSLÖSER, nicht die Verpackung: Eine gesetzlich vorgeschriebene Anpassung an geänderte äußere Rahmenbedingungen ist adaptive Wartung — unabhängig davon, ob sie als Update oder (wie hier) als Upgrade mit neuer Transaktion ausgeliefert wird. Enhasive Wartung wäre es, wenn der Fachbereich selbst neue Funktionen wünscht.',
  },
  {
    id: 47,
    text: 'Bei offenen Posten auf einem Kreditorenkonto im Wert von 6.000 Euro handelt es sich um Bewegungsdaten.',
    correct: true,
    explain:
      'Offene Posten sind einzelne, noch nicht ausgeglichene Buchungen (Ereignisse), die den Bestand verändern — das ist die Definition von Bewegungsdaten. Der aggregierte Saldo/Kontostand selbst wäre dagegen Bestandsdaten.',
  },
];
