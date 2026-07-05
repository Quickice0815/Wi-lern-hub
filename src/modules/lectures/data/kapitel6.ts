import type { LectureChapter } from '../types';

export const kapitel6: LectureChapter = {
  id: 'kapitel6',
  number: 6,
  title: 'Entwicklung der Individualinformationssysteme',
  subtitle:
    'Softwaretypologie, PDCA-Anforderungsanalyse und Phasenablauf/Testen bei der Entwicklung individueller Informationssysteme (IIS)',
  icon: '💻',
  color: 'var(--pap-decision)',
  tutorial: [
    {
      title: 'Was ist Software?',
      content:
        'Software (dt. „weiche Ware") bezeichnet leicht veränderbare Komponenten wie Apps, Applikationen oder Programme. Laut Vorlesung ist Software eine detaillierte, exakte, schrittweise Anleitung an einen Computer, eine Aufgabe zu lösen, und zugleich ein Konglomerat verschiedener, gegenseitig abhängiger Transaktionen und Daten. Trotz ihres Namens ist Software aber nur bedingt änderbar bzw. anpassbar und hat typischerweise lange Entwicklungszeiten.',
    },
    {
      title: 'Softwaretypologie: Einsatzszenario und Beschaffung',
      content:
        'Nach dem Einsatzszenario unterscheidet die Vorlesung Anwendungssoftware (Lösungen für fachliche Probleme, z. B. betriebswirtschaftlich oder medizinisch), Entwicklungssoftware bzw. SDK „Software Development Kit" (damit werden alle anderen Programme entwickelt) und Systemsoftware (Betriebssysteme und Firmware, die grundlegende Dienste wie den Zugriff auf Rechnerplattform und Peripheriegeräte bereitstellen). Nach der Beschaffungsart unterscheidet man Standardsoftware (gekauft oder gemietet, beschränkte Abdeckung der Anforderungen für den anonymen Markt, preiswert, sofort verfügbar) von Individualsoftware (Entwicklung durch die IT-Abteilung oder externe Softwarehäuser, vollständige/maßgeschneiderte Abdeckung der Anforderungen, aber mit enormen Kosten und langen Entwicklungszeiten verbunden). Dieses Kapitel behandelt speziell die Entwicklung von Individualsoftware bzw. Individualinformationssystemen (IIS).',
    },
    {
      title: 'Software ist Complexware und Bugware',
      content:
        'Software wird als „Complexware" bezeichnet, weil große Systeme wie Windows Millionen Lines of Code umfassen (z. B. rund 50 Mio. bei Windows Server 2003) und dafür fast ebenso viele oder sogar mehr Tester als Entwickler benötigt werden. Zugleich ist Software „Bugware": Ein Softwarefehler liegt bereits vor, wenn ein Programm etwas tut, das der Anwender nicht erwartet. Die Fehlerquote unterscheidet sich stark nach Qualitätsanspruch: Standardsoftware hat rund 25 Fehler pro 1.000 Lines of Code, gute Software rund 2, Space-Shuttle-Software weniger als 1.',
    },
    {
      title: 'Entstehung der Software: Algorithmus, Quellcode, Maschinencode',
      content:
        'Software entsteht in drei Schritten. Zuerst wird ein Algorithmus formuliert – eine eindeutige Anweisung zur Lösung eines Problems, also eine abstrakte Beschreibung eines Prozessablaufs durch formale Repräsentation. Daraus wird Quellcode, ein für Menschen lesbarer, in einer Programmiersprache geschriebener Text; dieser wird schließlich in Maschinencode übersetzt, eine Folge von Bytes, die den Prozessor anweisen, bestimmte Operationen auszuführen. Die Vorlesung unterscheidet außerdem einen spezifischen Algorithmus (eine exakte Schritt-für-Schritt-Anleitung für ein konkretes Problem, wie eine feste Wegbeschreibung durch ein Labyrinth) von einem generischen Algorithmus der künstlichen Intelligenz (z. B. der Tiefensuche-Algorithmus „gehe immer parallel zur rechten Wand"), der flexibel auf beliebige Situationen anwendbar ist.',
    },
    {
      title: 'Der PDCA-Zyklus (Demingkreis) als Rahmen der IS-Entwicklung',
      content:
        'Die Phasen der Informationssystem-Entwicklung folgen dem Demingkreis, einem iterativen PDCA-Zyklus mit vier Phasen. Plan entspricht der Anforderungsanalyse (Analyse des aktuellen Zustands, vollständige, widerspruchsfreie Anforderungsspezifikation bzw. IS-Architektur). Do entspricht Entwurf/Programmierung (Definition der zur IS-Architektur passenden IT-Infrastruktur, zügiges Testen des Konzepts mit provisorischen Vorrichtungen). Check entspricht dem Test (Prüfung der Erfüllung von Anforderungen durch Funktions-, Modul- und Integrationstests), und Act entspricht Einsatz/Rollout (Umsetzung auf breiter Front durch dedizierte Technologie, inklusive Schulung und Umstellung der Prozesse).',
    },
    {
      title: 'Anforderungen und Anforderungsanalyse',
      content:
        'Anforderungen sind Eigenschaften (passiv) sowie Fähigkeiten und Fertigkeiten (aktiv), die zur Erreichung eines Ziels bzw. zur Lösung eines Problems notwendig sind. Eine Anforderungsanalyse beschreibt diese Eigenschaften und Fähigkeiten eines Systems präzise und konsistent, u. a. bezüglich Aufbauorganisation, Prozessen/Projekten und Reporting; nur eine Tool-basierte Analyse garantiert dabei eine konsistente Darstellung. Anforderungen an Software lassen sich aus drei Perspektiven betrachten: Anwender (einfach zu erlernen/bedienen, Unterstützung der Rollen und Aufgaben, Personalisierung → kontextsensitive Unterstützung), Business (umfassende Funktionalität, schnelle flexible Adaption, Schnittstellen zum Ökosystem → inkrementelle Business-Adaption) und IT (niedrige Betriebskosten, einfache Administration und Support, schnelle Anpassung an Business-Anforderungen → sichtbare IT).',
    },
    {
      title: 'Ist-Analyse, Soll-Konzeption und Lastenheft',
      content:
        'Die Anforderungsanalyse zur Ermittlung der Projektziele läuft in drei Schritten ab: Erhebung des Ist-Zustandes (z. B. Unterlagenstudium, Checklisten, Fragebogen, Interview, Konferenz), Bewertung des Ist-Zustandes (z. B. Entscheidungsbaum, Delphi-Methode, SWOT, ABC-Analyse, Ishikawa, ERM-Diagramme) und Soll-Konzeption (intellektuelle Leistung der Projektbeteiligten, ERM-Diagramm, Organigramme, Prozessmodelle, Referenzmodelle, Kriterienkatalog). Dabei wird zwischen Soll-Modell (innerhalb von 6–12 Monaten realisierbare künftige Struktur) und Ideal-Modell (bloße Wunschvorstellung bzw. Ziel ohne Realisierungsanspruch) unterschieden. Die Ergebnisse werden in einem Lastenheft (auch Vorstudie, Leistungsverzeichnis, Anforderungskatalog) gebündelt, das die Grundlage für das umzusetzende Konzept definiert und u. a. Unternehmensbeschreibung, Ziele, Ist-Zustand, Anforderungen an das neue System sowie Anforderungen an Einführung/Schulung/Dokumentation enthält.',
    },
    {
      title: 'Vorgehensmodelle: sequentiell, iterativ, agil',
      content:
        'Sequentielle Vorgehensmodelle wie das Wasserfallmodell und das V-Modell streben eine 100 %-Lösung ohne Teil-Lösungen an: Die Phasen (Analyse, Entwurf, Programmierung, Test, Einsatz) sind klar abgegrenzt, es gibt keine bzw. nur kleine Rücksprünge, und sie sind effizient bei stabiler, genauer Spezifikation, aber ungeeignet bei mangelnder Spezifikation. Iterative Vorgehensmodelle wie das Spiralmodell streben dagegen Teil-Lösungen an: Phasenübergänge sind fließend, man erzielt oft eine 80 %-Lösung bei 20 % Aufwand mit Workarounds für ungelöste Aufgaben und benötigt komplexere Planung – dafür sind sie effektiv bei volatiler Spezifikation. Agile Vorgehensmodelle wie Scrum reagieren durch inkrementelle Iteration schnell auf geänderte Spezifikationen: Aus dem Product Backlog (Liste der Anforderungen) wird ein Sprint Backlog (umzusetzende Anforderungen) gebildet, in einem Sprint von 2–4 Wochen mit täglichem Daily Scrum (24 Stunden) umgesetzt und resultiert in einem einsatzfähigen Product Increment (Teillösung).',
    },
    {
      title: 'Softwaretest: Funktions-, Modul- und Integrationstest',
      content:
        'Softwaretest ist der umfassende Prozess zu prüfen, ob ein Informationssystem unter bekannten Bedingungen die gewünschten Ergebnisse erzielt. Der Funktions- bzw. Transaktionstest prüft, ob einzelne Transaktionen innerhalb eines Moduls die bezweckten Datenoperationen entsprechend den Vorgaben ausführen (z. B. „OP anzeigen", „Auszahlung buchen"). Der Modultest prüft, ob Kombinationen von Transaktionen in gekapselten Funktionsbereichen/Modulen adäquate Datenoperationen ausführen (z. B. Abschreibungsmodul, Liquiditätsvorschau). Der Integrationstest schließlich prüft, ob das Informationssystem als Ganzes funktioniert, indem die Schnittstellen zwischen den Funktionsbereichen/Modulen geprüft werden (z. B. zwischen Materialwirtschaft und Finanzbuchhaltung).',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Welche Aussage beschreibt Software laut Vorlesung zutreffend?',
        options: [
          'Software ist eine detaillierte, exakte, schrittweise Anleitung an einen Computer, eine Aufgabe zu lösen.',
          'Software ist beliebig und ohne Aufwand veränderbar.',
          'Software hat grundsätzlich sehr kurze Entwicklungszeiten.',
          'Software besteht aus vollständig unabhängigen, in sich geschlossenen Transaktionen.',
        ],
        correct: 0,
        explain:
          'Laut Folie ist Software eine detaillierte, exakte, schrittweise Anleitung an einen Computer; sie ist dagegen nur bedingt änderbar, hat lange Entwicklungszeiten und besteht aus gegenseitig abhängigen Transaktionen und Daten.',
      },
      {
        q: 'Zu welcher Kategorie der einsatzszenario-orientierten Softwaretypologie zählen Betriebssysteme und Firmware?',
        options: ['Anwendungssoftware', 'Entwicklungssoftware', 'Systemsoftware', 'Individualsoftware'],
        correct: 2,
        explain:
          'Systemsoftware umfasst laut Vorlesung Betriebssysteme und Firmware, die grundlegende Dienste wie den Zugriff auf die Rechnerplattform und Peripheriegeräte bereitstellen.',
      },
      {
        q: 'Wofür steht die Abkürzung SDK im Zusammenhang mit Entwicklungssoftware?',
        options: [
          'Software Development Kit',
          'System Design Konzept',
          'Standard Development Konfiguration',
          'Software Deployment Kernel',
        ],
        correct: 0,
        explain:
          'SDK steht für Software Development Kit; mit der Entwicklungssoftware werden laut Folie alle anderen Programme entwickelt, das SDK unterstützt dabei die zugrunde liegenden Programmiersprachen.',
      },
      {
        q: 'Welche Aussage zur Beschaffungs-orientierten Klassifikation trifft auf Standardsoftware zu?',
        options: [
          'Sie wird durch die IT-Abteilung oder externe Softwarehäuser maßgeschneidert entwickelt.',
          'Sie wird gekauft oder gemietet und deckt Anforderungen nur beschränkt ab, da sie für den anonymen Markt entwickelt wurde.',
          'Ihre Entwicklung ist mit enormen Kosten verbunden.',
          'Sie hat im Vergleich zu Individualsoftware lange Entwicklungszeiten bis zur Verfügbarkeit.',
        ],
        correct: 1,
        explain:
          'Standardsoftware wird gekauft oder gemietet, ist preiswert und sofort verfügbar, deckt Anforderungen aber nur beschränkt ab, da sie eine Lösung für den anonymen Markt darstellt; die anderen Merkmale beschreiben stattdessen Individualsoftware.',
      },
      {
        q: 'In welcher Reihenfolge entsteht Software laut der Folie „Entstehung der Software"?',
        options: [
          'Maschinencode → Quellcode → Algorithmus',
          'Algorithmus → Quellcode → Maschinencode',
          'Quellcode → Algorithmus → Maschinencode',
          'Algorithmus → Maschinencode → Quellcode',
        ],
        correct: 1,
        explain:
          'Software entsteht in der Reihenfolge Algorithmus (abstrakte Beschreibung), Quellcode (für Menschen lesbarer Programmtext) und Maschinencode (Bytefolge für den Prozessor).',
      },
      {
        q: 'Was ist ein Algorithmus laut Vorlesung?',
        options: [
          'Eine für Menschen lesbare, in einer Programmiersprache geschriebene Textform',
          'Eine eindeutige Anweisung zur Lösung eines Problems',
          'Eine Folge von Bytes, die der Prozessor als Operation ausführt',
          'Eine Sammlung von Testfällen für ein fertiges Programm',
        ],
        correct: 1,
        explain:
          'Ein Algorithmus ist laut Vorlesung eine eindeutige Anweisung zur Lösung eines Problems; die lesbare Textform ist der Quellcode, die Bytefolge der Maschinencode.',
      },
      {
        q: 'Wofür stehen die vier Buchstaben des PDCA-Zyklus?',
        options: [
          'Plan, Do, Check, Act',
          'Prepare, Design, Code, Analyze',
          'Plan, Develop, Control, Adjust',
          'Process, Design, Check, Apply',
        ],
        correct: 0,
        explain:
          'PDCA steht für Plan-Do-Check-Act, die vier Phasen des iterativen Demingkreises, dem die IS-Entwicklung folgt.',
      },
      {
        q: 'Wie werden Eigenschaften (passiv) sowie Fähigkeiten und Fertigkeiten (aktiv), die zur Erreichung eines Ziels notwendig sind, in der Vorlesung bezeichnet?',
        options: ['Lastenheft', 'Anforderungen', 'Ist-Zustand', 'Kriterienkatalog'],
        correct: 1,
        explain:
          'Diese Definition beschreibt genau den Begriff „Anforderungen"; das Lastenheft bündelt die ermittelten Anforderungen später in einem Dokument.',
      },
    ],
    advanced: [
      {
        q: 'Vergleichen Sie Standard- und Individualsoftware hinsichtlich des Abdeckungsgrads der Anforderungen. Welche Aussage ist korrekt?',
        options: [
          'Standardsoftware bietet eine maßgeschneiderte, vollständige Abdeckung, Individualsoftware nur eine beschränkte Abdeckung für den anonymen Markt.',
          'Individualsoftware bietet eine vollständige, maßgeschneiderte Abdeckung, Standardsoftware dagegen nur eine beschränkte Abdeckung für den anonymen Markt.',
          'Beide bieten laut Vorlesung eine identische, vollständige Abdeckung der Anforderungen.',
          'Der Abdeckungsgrad hängt laut Vorlesung ausschließlich vom Softwarepreis ab.',
        ],
        correct: 1,
        explain:
          'Laut Vergleichstabelle bietet Individualsoftware eine vollständige, maßgeschneiderte Lösung, während Standardsoftware nur eine beschränkte Abdeckung als Lösung für den anonymen Markt liefert – dafür ist sie preiswerter und sofort verfügbar.',
      },
      {
        q: 'Warum werden laut der Folie „Software ist Complexware" bei der Entwicklung großer Standardsoftware wie Windows fast ebenso viele oder sogar mehr Tester als Entwickler eingesetzt?',
        options: [
          'Weil Tester grundsätzlich günstiger bezahlt werden als Entwickler.',
          'Weil Software aus Millionen Lines of Code besteht und ein Softwarefehler bereits dann vorliegt, wenn das Programm etwas tut, das der Anwender nicht erwartet.',
          'Weil Entwickler laut Vorlesung keine eigenen Tests durchführen dürfen.',
          'Weil Individualsoftware grundsätzlich nicht getestet werden muss.',
        ],
        correct: 1,
        explain:
          'Software gilt als Complexware (Millionen Lines of Code, z. B. rund 50 Mio. bei Windows Server 2003) und als Bugware, da bereits jedes unerwartete Verhalten ein Fehler ist – deshalb ist ein hoher, teils sogar den Entwicklerstand übersteigender Testaufwand nötig.',
      },
      {
        q: 'Welcher Phase des PDCA-Zyklus (Demingkreis) der IS-Entwicklung entspricht „Do"?',
        options: ['Anforderungsanalyse', 'Entwurf/Programmierung', 'Test', 'Einsatz/Rollout'],
        correct: 1,
        explain:
          '„Do" entspricht der Phase Entwurf/Programmierung, in der die zur IS-Architektur passende IT-Infrastruktur definiert und das neue Konzept mit provisorischen Vorrichtungen getestet wird; „Plan" ist die Anforderungsanalyse, „Check" der Test, „Act" Einsatz/Rollout.',
      },
      {
        q: 'Welche Methode ordnet die Vorlesung der Phase „Bewertung des Ist-Zustandes" zu, nicht der vorausgehenden „Erhebung des Ist-Zustandes"?',
        options: ['Interview', 'Fragebogen', 'SWOT-Analyse', 'Checklisten'],
        correct: 2,
        explain:
          'SWOT gehört zur Bewertung des Ist-Zustandes, ebenso wie Entscheidungsbaum, Delphi-Methode, ABC-Analyse und Ishikawa; Interview, Fragebogen und Checklisten dienen dagegen der vorausgehenden Erhebung des Ist-Zustandes.',
      },
      {
        q: 'Was unterscheidet das Soll-Modell vom Ideal-Modell in der Anforderungsanalyse?',
        options: [
          'Das Soll-Modell ist innerhalb von 6–12 Monaten realisierbar, das Ideal-Modell beschreibt eine Wunschvorstellung ohne Realisierungsanspruch.',
          'Das Ideal-Modell ist innerhalb von 6–12 Monaten realisierbar, das Soll-Modell ist eine bloße Wunschvorstellung.',
          'Beide Modelle beschreiben ausschließlich den aktuellen Ist-Zustand.',
          'Das Soll-Modell wird laut Vorlesung nur bei der Beschaffung von Standardsoftware verwendet.',
        ],
        correct: 0,
        explain:
          'Das Soll-Modell bildet die künftigen, innerhalb von 6–12 Monaten realisierbaren Strukturen und Prozesse ab, während das Ideal-Modell eine reine Wunschvorstellung bzw. ein Ziel ohne unmittelbaren Realisierungsanspruch darstellt.',
      },
      {
        q: 'Was unterscheidet sequentielle Vorgehensmodelle (Wasserfallmodell, V-Modell) grundlegend von iterativen Vorgehensmodellen (Spiralmodell)?',
        options: [
          'Sequentielle Modelle streben eine 100 %-Lösung ohne Rücksprünge an; iterative Modelle akzeptieren Teil-Lösungen mit fließenden Phasenübergängen und Weiterentwicklungen.',
          'Iterative Modelle sind laut Vorlesung nur für Standardsoftware, sequentielle nur für Individualsoftware geeignet.',
          'Sequentielle Modelle erlauben beliebig viele Rücksprünge zwischen den Phasen, iterative Modelle keine.',
          'Beide Modelltypen sind bei volatiler Spezifikation gleich gut geeignet.',
        ],
        correct: 0,
        explain:
          'Sequentielle Modelle (Wasserfall, V-Modell) streben 100 %-Lösungen mit klar abgegrenzten Phasen ohne bzw. mit nur kleinen Rücksprüngen an und sind bei stabiler Spezifikation effizient; iterative Modelle wie das Spiralmodell akzeptieren dagegen Teil-Lösungen mit fließenden Phasenübergängen und sind bei volatiler Spezifikation effektiver.',
      },
      {
        q: 'Was entsteht laut dem agilen Vorgehensmodell (Scrum) am Ende eines Sprints von 2–4 Wochen?',
        options: [
          'Ein vollständiges, fehlerfreies Endprodukt',
          'Ein Product Increment als einsatzfähige Teillösung',
          'Ein komplett neues Product Backlog',
          'Ein Lastenheft',
        ],
        correct: 1,
        explain:
          'Am Ende eines Sprints (2–4 Wochen) entsteht laut Scrum-Ablauf ein Product Increment, also eine einsatzfähige Teillösung; das Product Backlog existiert bereits vorher als Liste aller Anforderungen.',
      },
      {
        q: 'Welcher Testtyp prüft, ob das Informationssystem als Ganzes funktioniert, indem die Schnittstellen zwischen den Funktionsbereichen/Modulen geprüft werden?',
        options: ['Funktionstest', 'Modultest', 'Integrationstest', 'Anforderungsanalyse'],
        correct: 2,
        explain:
          'Der Integrationstest prüft das Zusammenspiel des gesamten Informationssystems über die Schnittstellen zwischen Funktionsbereichen/Modulen (z. B. Materialwirtschaft und Finanzbuchhaltung); der Modultest prüft dagegen nur Transaktionskombinationen innerhalb eines einzelnen Moduls.',
      },
    ],
    pro: [
      {
        q: 'Welche Aussage zum Vergleich der Vorgehensmodelle ist FALSCH?',
        options: [
          'Das V-Modell erlaubt Rücksprünge mit kleinen Anpassungen und erfordert Änderungsmanagement.',
          'Das Spiralmodell strebt eine 100 %-Lösung ohne Teil-Lösungen an.',
          'Agile Modelle reagieren durch inkrementelle Iteration schnell auf geänderte Spezifikationen.',
          'Das Wasserfallmodell ist effizient bei stabiler, genauer Spezifikation.',
        ],
        correct: 1,
        explain:
          'Das Spiralmodell ist ein iteratives Modell und strebt gerade keine 100 %-Lösung an, sondern eine 80 %-Lösung bei 20 % Aufwand mit Workarounds für nicht gelöste Aufgaben; die 100 %-Lösung ohne Teil-Lösungen ist Kennzeichen der sequentiellen Modelle (Wasserfall, V-Modell).',
      },
      {
        q: 'Laut der Tabelle zu „Software is Bugware" (Fehler pro 1.000 Lines of Code): Welche Reihenfolge ist bezüglich der Fehlerquote korrekt, von der höchsten zur niedrigsten?',
        options: [
          'Standardsoftware (ca. 25) > gute Software (ca. 2) > Space-Shuttle-Software (<1)',
          'Space-Shuttle-Software (<1) > gute Software (ca. 2) > Standardsoftware (ca. 25)',
          'Gute Software (ca. 2) > Standardsoftware (ca. 25) > Space-Shuttle-Software (<1)',
          'Alle drei Softwarearten haben laut Vorlesung eine identische Fehlerquote.',
        ],
        correct: 0,
        explain:
          'Standardsoftware weist mit rund 25 Fehlern pro 1.000 LOC die höchste Fehlerquote auf, gute Software rund 2, und Space-Shuttle-Software mit unter 1 Fehler pro 1.000 LOC die niedrigste – je höher der Qualitätsanspruch, desto niedriger die Fehlerquote.',
      },
      {
        q: 'In einer Kontrollfrage der Vorlesung wird für ein Modul mit Start (S), drei Entscheidungen (V1, V2, V3 mit je Ja/Nein-Ausgang), sieben Aktivitäten (A1–A7) und Ende (E) gefragt, wie viele Testfälle für einen vollständigen Funktionstest (Test aller möglichen Ablaufpfade) nötig sind. Wie lautet die korrekte Anzahl laut Musterlösung?',
        options: ['2', '4', '6', '7'],
        correct: 2,
        explain:
          'Die Musterlösung zählt 6 vollständige Ausführungspfade vom Start bis zum Ende über alle Kombinationen der drei Ja/Nein-Entscheidungen – ein Funktionstest muss alle diese Ablaufpfade abdecken.',
      },
      {
        q: 'Für dasselbe Modul reichen laut Musterlösung bereits 2 Testfälle aus, um 100 % Zweigabdeckung (Branch Coverage) zu erzielen, bei der jede Bedingung mindestens einmal wahr und einmal falsch geprüft wird. Welchem Testtyp wird diese Zweigabdeckung in der Vorlesung zugeordnet?',
        options: ['Funktionstest', 'Modultest', 'Integrationstest', 'Anforderungsanalyse'],
        correct: 1,
        explain:
          'Modultests beziehen sich typischerweise auf Statement- oder Branch Coverage einzelner Anweisungen bzw. Zweige – dafür genügen bereits 2 Testfälle, während ein vollständiger Funktionstest alle 6 möglichen Ablaufpfade erfordert.',
      },
      {
        q: 'Welche Zuordnung der Anforderungsperspektiven (Anwender, Business, IT) ist korrekt?',
        options: [
          '„Niedrige Betriebskosten" und „einfache Administration" sind IT-Anforderungen, „einfach zu erlernen/zu bedienen" ist eine Anwenderanforderung.',
          '„Umfassende Funktionalität" ist laut Vorlesung eine reine IT-Anforderung.',
          'Die Business-Perspektive fordert laut Vorlesung ausschließlich niedrige Betriebskosten.',
          'Anwender- und IT-Anforderungen sind in der Vorlesung identisch definiert.',
        ],
        correct: 0,
        explain:
          'Anwenderanforderungen betreffen u. a. Erlernbarkeit/Bedienbarkeit (kontextsensitive Unterstützung), IT-Anforderungen niedrige Betriebskosten und einfache Administration (sichtbare IT); umfassende Funktionalität ist dagegen eine Business-Anforderung (inkrementelle Business-Adaption).',
      },
      {
        q: 'Welche Aussage zum Lastenheft ist FALSCH?',
        options: [
          'Es bündelt die Anforderungen eines Projektes und bildet die Grundlage für das umzusetzende Konzept.',
          'Es enthält u. a. eine Beschreibung des Ist-Zustandes sowie die Anforderungen an das zu realisierende System.',
          'Es wird ausschließlich bei der Beschaffung von Standardsoftware benötigt und entfällt komplett bei Individualsoftware.',
          'Es enthält auch Anforderungen im Hinblick auf Einführung, Schulung und Dokumentation.',
        ],
        correct: 2,
        explain:
          'Das Lastenheft dient allgemein der Bündelung von Projektanforderungen und ist Grundlage jeder Anforderungsanalyse – unabhängig davon, ob am Ende Standard- oder Individualsoftware zum Einsatz kommt; die übrigen Aussagen entsprechen der Gliederung aus der Vorlesung (Ist-Zustand, Systemanforderungen, Einführung/Schulung/Dokumentation).',
      },
      {
        q: 'Ein Softwareprojekt hat eine sehr instabile, sich häufig ändernde Spezifikation. Welches Vorgehensmodell ist dafür laut Vorlesung AM WENIGSTEN geeignet?',
        options: [
          'Wasserfallmodell bzw. V-Modell',
          'Spiralmodell',
          'Agiles Modell (Scrum)',
          'Alle Modelle sind dafür gleich gut geeignet',
        ],
        correct: 0,
        explain:
          'Sequentielle Modelle wie Wasserfall- und V-Modell sind laut Vorlesung effizient bei stabiler, genauer Spezifikation, aber ungeeignet bei mangelnder Spezifikation; bei volatiler Spezifikation sind das iterative Spiralmodell und agile Modelle deutlich besser geeignet.',
      },
    ],
  },
};
