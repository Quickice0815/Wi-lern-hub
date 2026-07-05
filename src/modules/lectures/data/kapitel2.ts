import type { LectureChapter } from '../types';

export const kapitel2: LectureChapter = {
  id: 'kapitel2',
  number: 2,
  title: 'Daten, Informationen, Wissen',
  subtitle: 'Vom Signal über Daten und Informationen zu Wissen – codierte und nicht codierte Information',
  icon: '🔤',
  color: 'var(--relation)',
  tutorial: [
    {
      title: 'Die Pyramide: Signale, Daten, Informationen, Wissen',
      content:
        'Die Vorlesung ordnet vier Begriffe hierarchisch an: Auf der technischen Basis liegen Signale und Zeichen, darüber Daten, darüber Informationen und an der Spitze Wissen. Maschinen verarbeiten Daten, doch nur Menschen verstehen Informationen und bilden daraus zweckorientiertes Wissen. Wissen wiederum führt zur Vorbereitung und Durchführung von Entscheidungen und Handlungen. Ein Beispiel aus der Vorlesung: Die Zahl „-2" ist zunächst nur ein Datum; erst als Preiselastizität der Nachfrage interpretiert wird sie zur Information, und die daraus abgeleitete Handlungsempfehlung „Preise senken" ist das resultierende Wissen.',
    },
    {
      title: 'Zeichen und Signale: die technische Basis',
      content:
        'Ein Zeichen ist eine für Menschen wahrnehmbare Darbietungsform von Information, etwa ein Buchstabe, eine Ziffer, ein Icon, ein Bild oder ein Ton. Ein Signal dagegen ist die rein physikalisch-technische Übertragungsform, zum Beispiel ein elektrischer Spannungsimpuls oder eine Folge aus Nullen und Einsen. Ein und derselbe Inhalt lässt sich in völlig unterschiedlichen Zeichensystemen darstellen, etwa „2 Zitronen", „two lemons" oder „2 лимона" – die Bedeutung bleibt gleich, nur die Zeichen ändern sich. Zeichen und Signale bilden gemeinsam die technische Basis, auf der Daten aufbauen.',
    },
    {
      title: 'Codierte Information: Was ist ein Code?',
      content:
        'Ein Code ordnet die Zeichen eines Zeichenvorrats den Zeichen eines anderen Zeichenvorrats zu – bekanntestes historisches Beispiel ist der Stein von Rosette, auf dem derselbe Text in drei verschiedenen Schriftsystemen steht. Codierte Information (CI) entsteht, wenn Information mithilfe eines solchen Codes in Zeichen umgesetzt wird, z. B. in Ziffern, Buchstaben oder Bitmuster. Diese Codierung ist die Voraussetzung dafür, dass Maschinen Information überhaupt als Daten verarbeiten können.',
    },
    {
      title: 'Zahlensysteme: additiv-subtraktiv vs. Stellenwertsystem',
      content:
        'Beim additiv-subtraktiven System, z. B. dem römischen Zahlensystem, hat ein Symbol immer denselben Wert unabhängig von seiner Position – das Symbol X bedeutet immer 10. Zusätzliche Regeln legen fest, wie Symbole kombiniert werden dürfen: I, X, C und M dürfen maximal dreimal nebeneinander stehen (III = 3), und eine Voranstellung bedeutet Subtraktion (IV = 4, CD = 400). Beim Stellenwertsystem dagegen leitet sich der Wert einer Ziffer aus ihrer Position innerhalb der Zahl ab; Beispiele sind das Dezimalsystem (Basis 10, Ziffern 0–9), das Dualsystem (Basis 2, Ziffern 0–1) und das Hexadezimalsystem (Basis 16, Ziffern 0–9 sowie A–F).',
    },
    {
      title: 'Zeichencodierung in Rechnern: ASCII, EBCDI, Unicode',
      content:
        'Damit Rechner Buchstaben, Ziffern und Icons verarbeiten können, werden diese über feste Codes in Bitfolgen übersetzt. ASCII (American Standard Code for Information Interchange) nutzt 7 Bit, EBCDI (Extended Binary Coded Decimals Interchange) nutzt 8 Bit. Unicode 1.0 verwendet 16 Bit und deckt europäische, nahöstliche und indische Schriften ab, Unicode 2.0 erweitert dies mit 32 Bit um ostasiatische Schriften. Ein und dasselbe Zeichen hat in jedem dieser Codes eine andere Bitfolge.',
    },
    {
      title: 'Strukturierte vs. unstrukturierte codierte Information',
      content:
        'Codierte Information kann strukturiert oder unstrukturiert sein. Strukturierte codierte Information folgt einer formalisierten bzw. genormten Struktur, etwa einer Attribut-Ausprägungs-Tabelle mit festen Feldern wie Obstart, Herkunft, Preis und Farbe. Unstrukturierte codierte Information dagegen hat keine solche feste Form – derselbe Sachverhalt kann in freiem Fließtext mit unterschiedlicher Wortwahl und Reihenfolge beschrieben werden, bleibt inhaltlich aber gleich.',
    },
    {
      title: 'Nicht codierte Information: statische Bilder',
      content:
        'Nicht codierte Information (NCI) liegt direkt als Bild, Ton oder Video vor, ohne über einen Zeichencode dargestellt zu werden; ihre statische Variante sind Grafiken. Vektorgrafiken bestehen aus mathematisch beschriebenen Grundelementen (Linien, Kurven, Polygone), benötigen wenig Speicherplatz, lassen sich verlustfrei vergrößern und eignen sich für Logos, Diagramme oder Landkarten – aber nicht für gescannte Fotos. Pixelgrafiken bestehen dagegen aus einzelnen Bildpunkten; ihre Auflösung gibt die Anzahl der Pixel an, ihre Farbtiefe die Anzahl möglicher Farben je Pixel. Wichtige Dateiformate sind TIFF (verlustfrei, gute Druckqualität), JPEG (verlustbehaftet, viele Farbverläufe), GIF (256 Farben, verlustfrei, Animation) und PNG (verlustfrei, vielseitig einsetzbar).',
    },
    {
      title: 'Nicht codierte Information: dynamische Inhalte',
      content:
        'Dynamische nicht codierte Information sind bewegte Inhalte wie Videos und Tonfolgen. Videos können verlustfrei (z. B. Huffyuv, CorePNG) oder verlustbehaftet (z. B. MPEG-1, MPEG-2, MPEG-4) codiert sein und eignen sich z. B. dafür, implizites Wissen wie das Binden einer Krawatte darzustellen. Bei Tonfolgen nimmt der Mensch Frequenzen über etwa 20 kHz nicht mehr wahr; die Abtastrate wird in Samples per Second (SPS, z. B. ca. 44 kHz bei einer Audio-CD) und die Datenrate in Bits per Second (BPS, z. B. MP3 mit rund 192 kBit/s) angegeben.',
    },
  ],
  exercises: {
    easy: [
      {
        q: "Welche Aussage beschreibt die Basis der Pyramide „Daten, Informationen, Wissen\" laut Vorlesung am treffendsten?",
        options: [
          'Maschinen verarbeiten Daten, Menschen verstehen Informationen.',
          'Menschen verarbeiten Daten, Maschinen verstehen Informationen.',
          'Wissen wird direkt aus Signalen erzeugt, ohne Umweg über Daten.',
          'Daten und Wissen sind laut Vorlesung dasselbe.',
        ],
        correct: 0,
        explain:
          'Laut Folie verarbeiten Maschinen Daten, während Menschen Informationen verstehen; Daten repräsentieren Informationen, Informationen bilden zweckorientiertes Wissen.',
      },
      {
        q: 'Was führt laut Vorlesung zur Vorbereitung und Durchführung von Entscheidungen und Handlungen?',
        options: ['Daten', 'Signale', 'Wissen', 'Zeichen'],
        correct: 2,
        explain:
          'Wissen steht in der Pyramide ganz oben und ermöglicht laut Folie die Vorbereitung und Durchführung von Entscheidungen und Handlungen.',
      },
      {
        q: "Wie ist ein „Code\" im Sinne der Vorlesung definiert?",
        options: [
          'Ein Geheimtext, der nur mit einem Schlüssel entschlüsselt werden kann',
          'Eine Zuordnung von Zeichen eines Zeichenvorrats zu den Zeichen eines anderen Zeichenvorrats',
          'Eine Software zur Bildkomprimierung',
          'Eine Vorschrift zur Bewertung von Wissen',
        ],
        correct: 1,
        explain:
          'Der Code ordnet Zeichen aus einem Zeichenvorrat (z. B. Ziffern) Zeichen eines anderen Zeichenvorrats zu, wie am Beispiel des Steins von Rosette gezeigt.',
      },
      {
        q: 'Wofür steht die Abkürzung ASCII?',
        options: [
          'Automated System for Coded Icon Interchange',
          'American Standard Code for Information Interchange',
          'Advanced Symbolic Coding for Internet Information',
          'Applied Standard for Character Image Identification',
        ],
        correct: 1,
        explain: 'ASCII steht für American Standard Code for Information Interchange, einen 7-Bit-Zeichencode.',
      },
      {
        q: 'In welche zwei Hauptkategorien wird Information laut der Übersichtsfolie eingeteilt?',
        options: [
          'Statische und dynamische Information',
          'Strukturierte und unstrukturierte Information',
          'Codierte und nicht codierte Information',
          'Digitale und analoge Information',
        ],
        correct: 2,
        explain:
          'Die oberste Unterteilung erfolgt in codierte Information (CI) und nicht codierte Information (NCI); strukturiert/unstrukturiert und statisch/dynamisch sind jeweils Unterkategorien davon.',
      },
      {
        q: 'In welche zwei Unterkategorien wird die nicht codierte Information (NCI) unterteilt?',
        options: [
          'Strukturierte und unstrukturierte Information',
          'Statische und dynamische Information',
          'Codierte und unkodierte Signale',
          'Pixel- und Vektorinformation',
        ],
        correct: 1,
        explain: 'NCI gliedert sich laut Übersichtsfolie in statische Information (z. B. Bilder) und dynamische Information (z. B. Video, Ton).',
      },
      {
        q: 'Was gibt die Auflösung bei einer Pixelgrafik an?',
        options: [
          'Die Anzahl der Farben, die ein Pixel annehmen kann',
          'Die Anzahl der Bildpunkte (Pixel), aus denen die Grafik besteht',
          'Die Kompressionsrate des Dateiformats',
          'Die Punktdichte beim Drucken in Zoll',
        ],
        correct: 1,
        explain:
          'Auflösung misst die Zahl der Bildpunkte (z. B. horizontal x vertikal oder als Gesamtzahl in Megapixel); wie viele Farben ein Pixel annehmen kann, beschreibt dagegen die Farbtiefe.',
      },
      {
        q: 'Was beschreibt die Farbtiefe einer Pixelgrafik?',
        options: [
          'Wie viele unterschiedliche Farben ein Pixel annehmen kann',
          'Wie viele Pixel ein Bild insgesamt enthält',
          'Wie stark ein Bild beim Speichern komprimiert wird',
          'Wie viele Zoll ein ausgedrucktes Bild misst',
        ],
        correct: 0,
        explain: 'Die Farbtiefe gibt an, wie viele unterschiedliche Farben bzw. Graustufen ein einzelnes Pixel annehmen kann.',
      },
    ],
    advanced: [
      {
        q: "Was unterscheidet ein „Zeichen\" von einem „Signal\" in der Vorlesungsterminologie?",
        options: [
          'Ein Zeichen ist die für Menschen wahrnehmbare Darbietungsform (z. B. Buchstabe, Ziffer, Bild, Ton), ein Signal ist die rein technische, physikalische Basis (z. B. Spannungsimpuls, Bitmuster)',
          'Ein Zeichen ist immer binär codiert, ein Signal ist immer dezimal codiert',
          'Zeichen und Signal sind in der Vorlesung synonym verwendete Begriffe',
          'Ein Signal entsteht erst, nachdem ein Mensch die Information verstanden hat',
        ],
        correct: 0,
        explain:
          'Zeichen (Buchstaben, Ziffern, Icons, Bilder, Töne) sind für Menschen interpretierbare Darbietungsformen, während Signale die technische Basis bilden (z. B. elektrische Impulse oder Bitfolgen), auf der Daten letztlich beruhen.',
      },
      {
        q: "In einem Beispiel der Vorlesung wird die Zahl „η = -2\" als Information und die Handlungsempfehlung „Preise senken\" als Wissen eingeordnet. Welcher Ebene entspricht dann die bloße Zahl „-2\" ohne jeden Kontext?",
        options: ['Wissen', 'Information', 'Daten', 'Signal'],
        correct: 2,
        explain:
          'Die reine Zahl -2 ohne inhaltliche Einordnung ist noch unverarbeitetes Datum; erst die Interpretation als Preiselastizität macht sie zur Information, die Handlungsableitung „Preise senken" ist das daraus entstehende Wissen.',
      },
      {
        q: 'Welche Aussage trifft auf ein additiv-subtraktives Zahlensystem wie das römische Zahlensystem zu?',
        options: [
          'Der Wert einer Ziffer hängt von ihrer Position innerhalb der Zahl ab',
          'Der Wert eines Symbols ist immer gleich, unabhängig von seiner Position',
          'Es kennt nur die Symbole 0 und 1',
          'Es wird ausschließlich zur rechnerinternen Zeichendarstellung verwendet',
        ],
        correct: 1,
        explain:
          'Beim additiv-subtraktiven System (römische Zahlen) hat ein Symbol wie X immer den Wert 10, unabhängig von seiner Stellung; beim Stellenwertsystem (Dezimal, Dual, Hex) hängt der Wert einer Ziffer dagegen von ihrer Position ab.',
      },
      {
        q: 'Welche der folgenden römischen Zahlen verstößt gegen die im Kurs genannten Regeln (u. a. max. 3x dieselbe Ziffer nebeneinander, I nur direkt neben V oder X)?',
        options: ['III', 'XIV', 'IIII', 'CD'],
        correct: 2,
        explain:
          'Regel 4 besagt, dass I, X, C und M maximal 3-mal nebeneinander stehen dürfen; „IIII" (vier I in Folge) verstößt dagegen – korrekt wäre „IV".',
      },
      {
        q: 'Welches Beispiel zeigt codierte STRUKTURIERTE Information im Gegensatz zu unstrukturierter?',
        options: [
          'Ein Fließtext: „Rote Äpfel kommen aus Spanien und kosten 1,20 € je Kilo!"',
          'Eine Attribut-Ausprägungs-Tabelle mit den Zeilen Obstart, Herkunft, Preis je Kg, Farbe und Währung',
          'Ein handgezeichnetes Bild eines Apfels',
          'Eine gesprochene Beschreibung des Apfels in einem Video',
        ],
        correct: 1,
        explain:
          'Strukturierte codierte Information folgt einer formalisierten/genormten Struktur wie einer Attribut-Ausprägungs-Tabelle; derselbe Inhalt als freier Fließtext ist dagegen unstrukturiert, da Wortwahl und Reihenfolge variieren können.',
      },
      {
        q: 'Welche Aussage über Vektorgrafiken trifft laut Vorlesung zu?',
        options: [
          'Sie eignen sich besonders gut für gescannte Fotografien',
          'Sie werden durch Formeln (Linien, Kurven, Polygone) beschrieben und lassen sich verlustfrei vergrößern',
          'Sie benötigen grundsätzlich mehr Speicherplatz als Pixelgrafiken',
          'Ihre Bildqualität hängt von der Farbtiefe in Bit pro Pixel ab',
        ],
        correct: 1,
        explain:
          'Vektorgrafiken bestehen aus mathematisch beschriebenen Grundelementen und lassen sich verlustfrei skalieren; sie benötigen wenig Speicherplatz, sind aber gerade nicht für gescannte Bilder/Fotografien geeignet – dafür sind Pixelgrafiken zuständig.',
      },
      {
        q: 'Berechnen Sie: 00110011 + 01010100 (binär). Welches Ergebnis ist korrekt?',
        options: ['11100011', '11010110', '10000111', '134'],
        correct: 2,
        explain: '00110011 entspricht dezimal 51, 01010100 entspricht 84; 51 + 84 = 135, was binär 10000111 entspricht.',
      },
      {
        q: 'Stellen Sie die Dezimalzahl 128 als Hexadezimalzahl dar.',
        options: ['80', '7F', '90', '8F'],
        correct: 0,
        explain: '128 = 8 × 16 + 0, also im Hexadezimalsystem „80"; 7F entspricht dagegen der Dezimalzahl 127.',
      },
    ],
    pro: [
      {
        q: "Welche der folgenden Aussagen zur Pyramide „Daten, Informationen, Wissen\" ist FALSCH?",
        options: [
          'Daten repräsentieren Informationen.',
          'Informationen bilden zweckorientiertes Wissen.',
          'Wissen ist die technische Basis, auf der Signale und Zeichen aufbauen.',
          'Menschen verstehen Informationen, Maschinen verarbeiten Daten.',
        ],
        correct: 2,
        explain:
          'Tatsächlich bilden Signale und Zeichen die technische Basis, auf der Daten aufbauen – nicht umgekehrt; Wissen steht an der Spitze der Pyramide, nicht an ihrer Basis. Die anderen drei Aussagen entsprechen exakt den Folieninhalten.',
      },
      {
        q: 'Für eine Matrikulationsliste mit 7-stelliger Matrikelnummer für 100 Studierende soll mit ASCII-Code (1 Byte pro Zeichen) gespeichert werden. Wie groß ist der Speicherbedarf?',
        options: ['300 Bits', '800 Bytes', '5.600 Bytes', '5.600 Bits'],
        correct: 3,
        explain:
          '7 Ziffern × 100 Studierende = 700 Zeichen; bei 1 Byte (= 8 Bit) pro Zeichen ergeben sich 700 Byte = 5.600 Bit. 5.600 Byte wäre um den Faktor 8 zu groß.',
      },
      {
        q: 'Eine Digitalkamera mit 1 GB Speicher erstellt Fotos mit 3 Megapixel (2.048 × 1.536) und einer Farbtiefe von 16 Mio. Farben (24 Bit = 3 Byte/Pixel), unkomprimiert gespeichert. Wie viele Fotos passen ungefähr auf die Karte?',
        options: ['106', '31', '53', '318'],
        correct: 0,
        explain:
          'Ein Foto benötigt 2.048 × 1.536 × 3 Byte ≈ 9,44 MB; bei 1 GB (= 1.000.000.000 Byte) Speicher passen rund 1.000.000.000 / 9.437.184 ≈ 106 Fotos darauf.',
      },
      {
        q: 'Ein 10cm × 10cm großes Bild soll mit 300 DPI gedruckt werden, mit nur 16 Graustufen (4 Bit Farbtiefe). Laut der Farbtiefe-Tabelle der Vorlesung wird auch bei 4 Bit stets 1 Byte pro Pixel gespeichert. Wie groß ist der minimale unkomprimierte Speicherbedarf?',
        options: ['1,4 MB', '0,5 MB', '14 MB', '14 GB'],
        correct: 0,
        explain:
          '10 cm ≈ 3,94 Zoll; bei 300 DPI ergeben sich ca. 1.181 × 1.181 ≈ 1,39 Mio. Pixel. Da laut Tabelle auch 4 Bit Farbtiefe auf 1 ganzes Byte pro Pixel aufgerundet wird, ergibt sich ein Speicherbedarf von rund 1,39 Mio. Byte ≈ 1,4 MB.',
      },
      {
        q: "Ein Fließtext wie „Rote Äpfel kommen aus Spanien und kosten 1,20 € je Kilo!\" ist auf einem Computer als ASCII-Zeichenfolge gespeichert. Wie ist dieser Text korrekt einzuordnen?",
        options: [
          'Nicht codierte, dynamische Information',
          'Codierte, unstrukturierte Information',
          'Codierte, strukturierte Information',
          'Nicht codierte, statische Information',
        ],
        correct: 1,
        explain:
          'Der Text besteht aus codierten Zeichen (ASCII), hat aber keine formalisierte/genormte Struktur wie eine Attribut-Ausprägungs-Tabelle – er ist daher codiert, aber unstrukturiert. Dieselben Fakten in einer Attributtabelle wären dagegen codiert UND strukturiert.',
      },
      {
        q: 'Ein Firmenlogo wird als SVG-Datei (Vektorgrafik) gespeichert. Welcher Kategorie ist dies laut der Einteilung der Vorlesung zuzuordnen?',
        options: [
          'Codierte, strukturierte Information',
          'Codierte, unstrukturierte Information',
          'Nicht codierte, statische Information',
          'Nicht codierte, dynamische Information',
        ],
        correct: 2,
        explain:
          'Grafiken (Pixel- wie Vektorgrafiken) zählt die Vorlesung zur nicht codierten Information; da es sich um ein unbewegtes Bild handelt, ist es statische (nicht dynamische) Information – dynamisch wären etwa Videos oder Tonfolgen.',
      },
      {
        q: 'Welche Aussage zu Zahlensystemen ist FALSCH?',
        options: [
          'Im Dualsystem leitet sich der Wert einer Ziffer aus ihrer Stelle innerhalb der Zahl ab.',
          'Im römischen Zahlensystem hat das Symbol X unabhängig von seiner Position immer den Wert 10.',
          'Das Hexadezimalsystem verwendet 16 Symbole, darunter die Buchstaben A bis F.',
          'Sowohl das Dezimalsystem als auch das römische Zahlensystem sind Stellenwertsysteme.',
        ],
        correct: 3,
        explain:
          'Nur Dezimal-, Dual- und Hexadezimalsystem sind Stellenwertsysteme, bei denen die Position die Bedeutung einer Ziffer bestimmt; das römische Zahlensystem ist dagegen additiv-subtraktiv, dort ist der Wert eines Symbols stellenunabhängig immer gleich.',
      },
    ],
  },
};
