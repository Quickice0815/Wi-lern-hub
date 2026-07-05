import type { LectureChapter } from '../types';

export const kapitel7: LectureChapter = {
  id: 'kapitel7',
  number: 7,
  title: 'Adaption der Standardinformationssysteme',
  subtitle: 'Auswahl, Anpassungsarten und Lizenzierung von Standardsoftware (SIS) – On-Premise vs. On-Demand',
  icon: '🧩',
  color: 'var(--pap-action)',
  tutorial: [
    {
      title: 'Softwaretypologie: Standard- vs. Individualsoftware',
      content:
        'Die beschaffungsorientierte Klassifikation unterscheidet Standardsoftware und Individualsoftware anhand mehrerer Kriterien. Standardsoftware wird gekauft oder gemietet und ist sofort „out of the box" verfügbar, deckt die Anforderungen aber nur beschränkt ab, da sie als Lösung für den anonymen Markt entwickelt wurde – dafür ist sie preiswert und verursacht keine Reproduktionskosten. Individualsoftware wird dagegen durch die eigene IT-Abteilung oder externe Softwarehäuser entwickelt, deckt die Anforderungen vollständig und maßgeschneidert ab, ist jedoch mit enormen Kosten und langen Entwicklungszeiten verbunden. Dieser Kontrast bildet den Ausgangspunkt für das gesamte Kapitel, das sich mit der Standardsoftware (SIS) befasst.',
    },
    {
      title: 'Die sechs Phasen der SIS-Adaption',
      content:
        'Die Adaption eines Standardinformationssystems durchläuft einen festen Phasenablauf: Anforderungsanalyse, Softwarewahl, Implementiererwahl, Entwurf/Anpassung, Rollout und Going Live. Im Anschluss an Going Live folgt die Phase Continuous Improvement, die den Kreislauf im Sinne des PDCA-Zyklus (Plan – Do – Check – Act) fortlaufend schließt und erneut anstößt. Dieser Ablauf gilt spezifisch für die Adaption von Standardsoftware und darf nicht mit der Entwicklung von Individualsoftware verwechselt werden, bei der es z. B. keine Softwarewahl am Markt gibt.',
    },
    {
      title: 'Standardsoftware als Softwarebibliothek – „Buy and Complete"',
      content:
        'Standardsoftware wird nach dem Prinzip „Buy and Complete" eingeführt: Man kauft die Software und vervollständigt sie anschließend durch Adaption an die eigenen Prozesse. Sie bietet einen breiten Funktionsumfang mit systematischer Anbindung von Büro- und Kommunikationssoftware sowie Adaptionswerkzeugen für Anforderungsanalyse und Anpassung im laufenden Betrieb. Dass dieser breite Funktionsumfang in der Praxis oft nur teilweise genutzt wird, zeigt ein SAP-ERP-Beispiel: Im Finanzwesen stehen 4.356 Transaktionen zur Verfügung, im Schnitt werden aber nur 348 davon genutzt – eine Nutzungsquote von lediglich 8 %. Am höchsten ist die Nutzungsquote in der Instandhaltung mit 19 %, am niedrigsten im Treasury mit 5 %.',
    },
    {
      title: 'Softwareauswahl: Von der Vorauswahl bis zur Implementiererwahl',
      content:
        'Die Softwareauswahl verläuft in drei Stufen. Bei der Technologie-/Softwarewahl werden für kleine, mittlere und große Betriebe 5 bis 20 Anbieter identifiziert, wobei der Markt u. a. von SAP, Oracle, Microsoft, Google und Sage dominiert wird. In der Vorauswahl/Endauswahl wird die Lösung mit der besten Abdeckung der Anforderungen unter Berücksichtigung von Anschaffungs- und Folgekosten bestimmt. Optional folgt die Implementiererwahl, wenn die Implementierung nicht aus eigener Kraft erfolgt; hier dominieren Dienstleister wie Deloitte, IBM und Accenture. Zur Bewertung nutzt man den Gartner Hype Cycle (Bewertung des Nutzens neuartiger Technologien über die Zeit) sowie die Gartner Magic Quadrants (Bewertung von Softwarelieferanten/Dienstleistern anhand von Ability to Execute und Completeness of Vision, mit den Kategorien Leaders, Visionäre, Nischen-Spieler und Herausforderer).',
    },
    {
      title: 'Adaption und ihre fünf Arten',
      content:
        'Adaption ist der Prozess der systematischen und kontinuierlichen Auswahl von betriebswirtschaftlichen Transaktionen und Daten aus einer Softwarebibliothek sowie ihrer Ergänzung und Anpassung an den aktuellen betrieblichen Aufgabenprozess. Die Vorlesung unterscheidet fünf Adaptionsarten: (1) Auswahl aus der Softwarebibliothek – Auswahl und Installation vorhandener Module; (2) Anpassung im vordefinierten Raum, auch Customizing genannt – Belegung von Parametern innerhalb eines vom Entwickler festgelegten Alternativenraums; (3) Anpassung durch Third-Party-Produkte, also Zukauf von Zusatzlösungen; (4) Anpassung durch Individualentwicklung, also eigene Programmierung von Funktionen, die kein Modul der Bibliothek abdeckt; sowie (5) Anpassung von Aufbau und Ablauf an die Software – hier passt sich nicht die Software, sondern die eigene Organisation an die Standardlösung an.',
    },
    {
      title: 'Projektrealität: Implementierungsprojekte dauern und kosten mehr als geplant',
      content:
        'Laut Vorlesung dauern Implementierungsprojekte von ERP-Systemen im Schnitt rund 30 % länger als geplant: Die Plan-Dauer liegt bei durchschnittlich 14 Monaten, die Ist-Dauer bei rund 18 Monaten. Bei den Kosten fällt die Abweichung deutlich geringer aus – geplante 2,0 Mio. € stehen tatsächlichen Kosten von rund 2,1 Mio. € gegenüber, die Projekte werden also nur unwesentlich teurer als geplant.',
    },
    {
      title: 'Betriebsmodelle: On-Premise, Off-Premise und On-Demand',
      content:
        'Beim On-Premise-Betrieb betreibt das Unternehmen die Server selbst vor Ort, sofern genügend personelle Ressourcen vorhanden sind. Beim Off-Premise-Betrieb läuft der Fremdbetrieb der Server/Software außerhalb der Firma, etwa durch Serverhosting oder Application Service Providing. Beim On-Demand-Betrieb mietet das Unternehmen Server/Software und lagert den gesamten Betrieb an einen Dienstleister aus, typischerweise als SaaS, PaaS oder IaaS. On-Premise bietet volle Datenkontrolle und bessere Integrationsmöglichkeiten, dafür hohe Anfangsinvestitionen und lange Implementierungszeiten; On-Demand punktet mit schneller, vorkonfigurierter Implementierung und monatlichen statt hohen Anfangskosten, hat aber Einschränkungen bei Datenschutz und Anpassungsmöglichkeiten. SAP positioniert dazu passend S4/HANA on Premise für große Unternehmen im Eigenbetrieb, S4/HANA on Demand für große Unternehmen in der Cloud, Business One für KMU on Premise und ByDesign für KMU on Demand.',
    },
    {
      title: 'Softwarelizenzen: Lizenzart und Lizenzklasse',
      content:
        'Eine Softwarelizenz (EULA, End User License Agreement) ist das Entgelt für die Nutzung von Standardanwendungssoftware. Proprietäre Software räumt ein Nutzungsrecht ein und gliedert sich in Freeware und kommerzielle Software, während Open-Source-Software ein Quellcode-Veränderungsrecht gewährt. Bei der Lizenzklasse wird zwischen Vollversion (keine Vorversion nötig), Upgrade (Vorversion erforderlich, neue Funktionen), Update (Fehlerkorrektur/Ergänzung innerhalb einer Version) und AddOn (Zusatzkomponente) sowie Kombinationen dieser Klassen unterschieden. Nach Lientz/Swanson entfällt der größte Wartungsaufwand auf enhasive Wartung (41 %), gefolgt von adaptiver (25 %), korrektiver (22 %) und perfektiver Wartung (12 %) – rund ein Viertel des Aufwands geht damit allein in Fehlerkorrekturen: „Software is a Bugware!"',
    },
    {
      title: 'Lizenztyp und Systemverfügbarkeit',
      content:
        'Der Lizenztyp bestimmt die Art der Preisberechnung: nach Gerät (pro Installation, pro benannter Maschine/OEM, pro Prozessor, pro Netz), nach Nutzer (Named-User-License NUL mit fester Anzahl namentlich bekannter Nutzer, oder Concurrent-User-License CUL mit fester Anzahl gleichzeitig angemeldeter Nutzer), nach Zeit (Dauer, Periode, Flat Rate) oder nach Nutzungsvorgang (Session, Pay per Use, Datenvolumen). Die Systemverfügbarkeit V berechnet sich als (effektive Betriebszeit minus Summe der Ausfallzeiten) geteilt durch die effektive Betriebszeit, mal 100 %. Bei seriell angeordneten Systemteilen multiplizieren sich die Einzelverfügbarkeiten (V = V1 × V2 × V3), wodurch die Gesamtverfügbarkeit sinkt; bei paralleler Anordnung genügt ein funktionierender Teil, wodurch die Gesamtverfügbarkeit steigt (V = 1 − (1−V1)×(1−V2)×(1−V3)).',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Wodurch unterscheidet sich Standardsoftware laut Vorlesung von Individualsoftware bei der Verfügbarkeit?',
        options: [
          'Standardsoftware ist sofort einsatzbereit ("out of the box"), Individualsoftware benötigt lange Entwicklungszeiten',
          'Beide sind sofort nach dem Kauf einsatzbereit',
          'Individualsoftware ist immer schneller verfügbar, da sie passgenau entwickelt wird',
          'Verfügbarkeit unterscheidet sich laut Vorlesung nicht zwischen beiden Softwarearten',
        ],
        correct: 0,
        explain:
          'Laut Softwaretypologie-Folie ist Standardsoftware sofort out of the box verfügbar, während Individualsoftware wegen der Eigenentwicklung lange Entwicklungszeiten benötigt.',
      },
      {
        q: 'Wie viele Phasen durchläuft laut Vorlesung die Adaption eines Standardinformationssystems, bevor die Continuous-Improvement-Phase beginnt?',
        options: ['4', '5', '6', '7'],
        correct: 2,
        explain:
          'Die sechs Phasen sind Anforderungsanalyse, Softwarewahl, Implementiererwahl, Entwurf/Anpassung, Rollout und Going Live; danach schließt Continuous Improvement den PDCA-Zyklus.',
      },
      {
        q: 'Was beschreibt das Prinzip „Buy and Complete" bei der Standardsoftware-Einführung?',
        options: [
          'Die Software wird komplett neu programmiert und danach gekauft',
          'Die Software wird gekauft und anschließend durch Adaption an die betrieblichen Anforderungen vervollständigt',
          'Der Anbieter vervollständigt automatisch alle betrieblichen Prozesse ohne jede Anpassung',
          'Es werden nur Testversionen erworben, bis zufällig die passende gefunden wird',
        ],
        correct: 1,
        explain:
          'Die Softwarebibliothek-Folie beschreibt die Softwareeinführung explizit nach dem Prinzip „Buy and Complete": kaufen und durch Adaption vervollständigen.',
      },
      {
        q: 'Wofür wird der Gartner Hype Cycle laut Vorlesung eingesetzt?',
        options: [
          'Zur Bewertung des Nutzens neuartiger Technologien',
          'Zur Bewertung von Softwarelieferanten und Dienstleistern',
          'Zur Berechnung der Systemverfügbarkeit',
          'Zur Einteilung von Lizenzklassen',
        ],
        correct: 0,
        explain:
          'Der Gartner Hype Cycle ist laut Folie eine „Methode zur Bewertung des Nutzens neuartiger Technologien"; die Bewertung von Anbietern übernimmt dagegen der Gartner Magic Quadrant.',
      },
      {
        q: 'Wofür werden Gartner Magic Quadrants laut Vorlesung eingesetzt?',
        options: [
          'Zur Bewertung des Nutzens neuartiger Technologien im Zeitverlauf',
          'Zur Bewertung von Softwarelieferanten/Dienstleistern für neuartige Technologien',
          'Zur Berechnung der Nutzungsquote einer Software',
          'Zur Klassifikation von Lizenztypen',
        ],
        correct: 1,
        explain:
          'Gartner Magic Quadrants sind laut Folie eine „Methode zur Bewertung der Softwarelieferanten/Dienstleister für neuartige Technologien", mit den Kategorien Leaders, Visionäre, Nischen-Spieler und Herausforderer.',
      },
      {
        q: 'Was versteht die Vorlesung unter „Customizing"?',
        options: [
          'Die Integration einer Zusatzlösung eines Drittanbieters',
          'Die Ausprägung von Elementen der Softwarebibliothek durch Belegung von Parametern innerhalb eines vom Entwickler festgelegten Alternativenraums',
          'Die komplette Neuprogrammierung einer fehlenden Funktion',
          'Die Anpassung des eigenen Unternehmensprozesses an die Software',
        ],
        correct: 1,
        explain:
          '„Anpassung im vordefinierten Raum" bzw. Customizing bedeutet, Elemente der Softwarebibliothek durch individuelle Parameterwerte innerhalb eines vom Entwickler vorgegebenen Alternativenraums auszuprägen.',
      },
      {
        q: 'In welche zwei Hauptkategorien werden Softwarelizenzen laut Vorlesung eingeteilt?',
        options: [
          'Freeware und kommerzielle Software',
          'Proprietäre Software und Open Source Software',
          'On-Premise-Lizenzen und On-Demand-Lizenzen',
          'Vollversion und Update',
        ],
        correct: 1,
        explain:
          'Die oberste Unterteilung der Lizenzen erfolgt in proprietäre Software (mit Nutzungsrecht, weiter unterteilt in Freeware/kommerzielle Software) und Open Source Software (mit Quellcode-Veränderungsrecht).',
      },
      {
        q: 'Welches Betriebsmodell beschreibt laut Vorlesung die Miete von Server/Software inklusive Outsourcing des Betriebs an einen Dienstleister, z. B. als SaaS, PaaS oder IaaS?',
        options: ['On-Premise', 'On-Demand', 'Off-Premise', 'Serverhosting durch die eigene IT-Abteilung'],
        correct: 1,
        explain:
          'On-Demand steht laut Hosting-Folie für die „Miete der Server/Software" mit vollständigem Outsourcing des Betriebs, konkretisiert durch SaaS, PaaS und IaaS.',
      },
    ],
    advanced: [
      {
        q: 'Welche Aussage zum Unterschied zwischen On-Premise und On-Demand bei der Datenkontrolle trifft laut Vorlesung zu?',
        options: [
          'Bei On-Premise liegt die physische Datenhaltung im eigenen Einflussbereich mit vollständiger Kontrolle, bei On-Demand beim Anbieter mit möglichen Problemen bei Datenschutz und Verfügbarkeit',
          'Bei On-Demand liegt die physische Datenhaltung im eigenen Einflussbereich, bei On-Premise beim Anbieter',
          'Beide Modelle bieten laut Vorlesung identische Datenkontrolle',
          'On-Demand bietet grundsätzlich bessere Datenschutzgarantien als On-Premise',
        ],
        correct: 0,
        explain:
          'Laut Vergleichstabelle bedeutet On-Premise physische Datenhaltung im eigenen Einflussbereich mit voller Kontrolle, während On-Demand die Datenhaltung beim Anbieter ansiedelt, was Probleme mit Datenschutz und Verfügbarkeit mit sich bringen kann.',
      },
      {
        q: 'Warum ist die Implementierung bei On-Demand-Lösungen laut Vorlesung tendenziell schneller als bei On-Premise?',
        options: [
          'Weil On-Demand-Lösungen bereits vorkonfiguriert sind und der Anbieter Erfahrung mit der eigenen Technik hat',
          'Weil On-Demand-Systeme grundsätzlich keine Implementierung benötigen',
          'Weil bei On-Premise grundsätzlich keinerlei Erfahrung mit der eingesetzten Technik vorliegt',
          'Weil On-Demand-Systeme immer einen kleineren Funktionsumfang als On-Premise-Systeme haben',
        ],
        correct: 0,
        explain:
          'Laut Vergleichstabelle ist die Implementierung bei On-Demand schnell, weil pre-konfigurierte Lösungen und die Erfahrung des Anbieters mit der eigenen Technik genutzt werden; bei On-Premise ist die Implementierung dagegen wegen der Neuartigkeit der IT-Projekte lang.',
      },
      {
        q: 'Was unterscheidet eine Named-User-License (NUL) von einer Concurrent-User-License (CUL)?',
        options: [
          'NUL legt eine maximale Anzahl namentlich bekannter Nutzer fest, CUL eine maximale Anzahl zeitgleich angemeldeter Nutzer',
          'NUL gilt nur für Server, CUL nur für Endgeräte',
          'NUL ist unabhängig von der Nutzerzahl immer teurer als CUL',
          'CUL legt eine maximale Anzahl namentlich bekannter Nutzer fest, NUL eine maximale Anzahl zeitgleich angemeldeter Nutzer',
        ],
        correct: 0,
        explain:
          'Die NUL (Named-User-License) begrenzt die Anzahl namentlich bekannter, zur Nutzung berechtigter Personen, während die CUL (Concurrent-User-License) die Anzahl der Nutzer begrenzt, die gleichzeitig angemeldet sein dürfen – unabhängig davon, wie viele Personen insgesamt einen Zugang besitzen.',
      },
      {
        q: 'Welche Wartungsart hat laut der Aufwandsverteilung der Vorlesung (Lientz/Swanson) den größten Anteil am Entwicklungsaufwand für Standardsoftware?',
        options: ['Korrektiv (22 %)', 'Adaptiv (25 %)', 'Enhasiv (41 %)', 'Perfektiv (12 %)'],
        correct: 2,
        explain:
          'Mit 41 % entfällt der größte Anteil des Wartungsaufwands auf enhasive Wartung, gefolgt von adaptiver (25 %), korrektiver (22 %) und perfektiver Wartung (12 %).',
      },
      {
        q: 'Warum sollte laut den Kontrollfragen der Vorlesung Standardsoftware im Regelfall der Individualsoftware vorgezogen werden?',
        options: [
          'Weil sich organisatorische und formale Rahmenbedingungen oft schneller ändern, als eine Individuallösung modifiziert werden kann',
          'Weil Individualsoftware grundsätzlich weniger Funktionen bietet als Standardsoftware',
          'Weil Standardsoftware in der Wartung immer günstiger ist als in der Anschaffung',
          'Weil für Individualsoftware keinerlei Lizenzgebühren anfallen',
        ],
        correct: 0,
        explain:
          'Die Kontrollfrage bejaht diese Aussage: Da sich betriebliche Rahmenbedingungen schneller ändern können, als eine Individuallösung neu programmiert werden kann, ist die über Customizing schneller anpassbare Standardsoftware im Regelfall vorzuziehen.',
      },
      {
        q: 'Welches SAP-Produkt/Betriebsmodell ist laut Vorlesung für große Unternehmen im On-Premise-Betrieb vorgesehen?',
        options: ['ByDesign', 'Business One', 'S4/HANA on Premise', 'S4/HANA on Demand'],
        correct: 2,
        explain:
          'Laut der SAP-Positionierungsmatrix ist S4/HANA on Premise für große Unternehmen im Eigenbetrieb gedacht; ByDesign und Business One richten sich an KMU (on Demand bzw. on Premise), S4/HANA on Demand an große Unternehmen in der Cloud.',
      },
      {
        q: 'Ein System besteht aus drei seriell angeordneten Teilsystemen mit den Einzelverfügbarkeiten 80 %, 85 % und 85 %. Wie hoch ist die Gesamtverfügbarkeit V = V1 × V2 × V3 näherungsweise?',
        options: ['250 %', '83,3 %', '57,8 %', '99,55 %'],
        correct: 2,
        explain:
          'Bei serieller Anordnung multiplizieren sich die Einzelverfügbarkeiten: 0,80 × 0,85 × 0,85 ≈ 0,578, also rund 57,8 %. Bei paralleler Anordnung derselben Werte ergäbe sich dagegen eine deutlich höhere Verfügbarkeit von rund 99,55 %.',
      },
      {
        q: 'Welche Aussage zu den Adaptionsphasen ist laut Vorlesung korrekt?',
        options: [
          'Der Phasenablauf mit Anforderungsanalyse, Softwarewahl, Implementiererwahl, Entwurf/Anpassung, Rollout und Going Live beschreibt die Adaption eines Standardinformationssystems (SIS), nicht die Entwicklung einer Individualsoftware',
          'Der Phasenablauf gilt laut Vorlesung ausschließlich für die Entwicklung von Individualsoftware',
          'Softwarewahl und Implementiererwahl sind laut Vorlesung auch bei Individualsoftware zwingend erforderlich, da diese ebenfalls am Markt eingekauft wird',
          'Individualsoftware benötigt laut Vorlesung exakt denselben Phasenablauf wie ein SIS',
        ],
        correct: 0,
        explain:
          'Die Kontrollfrage stellt klar, dass dieser Phasenablauf für die Adaption eines SIS gilt; bei Individualsoftware entfallen u. a. Softwarewahl und Implementiererwahl, da hier keine Marktauswahl stattfindet, sondern selbst entwickelt wird.',
      },
    ],
    pro: [
      {
        q: 'Ein Kunde benötigt automatisierten Auslandszahlungsverkehr, den sein Standard-ERP-System nicht unterstützt (nur wenige Lieferanten sind betroffen). Warum fallen laut Vorlesung „Auswahl aus der Softwarebibliothek" und „Customizing" als Adaptionsarten hier weg?',
        options: [
          'Weil diese Funktionalität in keinem Modul der Softwarebibliothek existiert und daher weder ausgewählt noch durch Parametrierung aktiviert werden kann',
          'Weil Auswahl und Customizing grundsätzlich nur bei Individualsoftware anwendbar sind',
          'Weil beide Adaptionsarten generell zu teuer sind',
          'Weil der Kunde für diese beiden Adaptionsarten keine gültige Lizenz besitzt',
        ],
        correct: 0,
        explain:
          'Auswahl und Customizing setzen voraus, dass die gewünschte Funktion bereits (in einer Ausprägung) in der Softwarebibliothek vorhanden ist. Da die automatisierte Auslandszahlung dort gar nicht existiert, kann sie weder ausgewählt noch parametriert werden – diese beiden Adaptionsarten fallen deshalb weg.',
      },
      {
        q: 'Im selben Fall (automatisierter Auslandszahlungsverkehr für wenige Lieferanten) ordnet die Musterlösung die verbleibenden Adaptionsarten nach absteigender Relevanz als „Anpassung von Aufbau und Ablauf an die Software, Zukauf, Individualprogrammierung". Warum landet die Individualprogrammierung auf dem letzten Platz?',
        options: [
          'Weil sie im Verhältnis zum geringen Nutzen (nur wenige betroffene Lieferanten) zu lange dauert und zu teuer ist',
          'Weil Individualprogrammierung bei Standardsoftware technisch grundsätzlich nicht möglich ist',
          'Weil Individualprogrammierung rechtlich für Standardsoftware verboten ist',
          'Weil sie automatisch durch Customizing ersetzt werden kann',
        ],
        correct: 0,
        explain:
          'Die handschriftliche Musterlösung begründet den letzten Platz der Individualprogrammierung explizit damit, dass sie „zu lange und zu teuer" wäre – unverhältnismäßig für einen Sonderfall, der nur wenige Lieferanten betrifft. Eine organisatorische Lösung oder ein zugekauftes Zusatzmodul sind hier wirtschaftlicher.',
      },
      {
        q: 'Wie ist die Aussage „Die Nutzungsquote einer Individualsoftware ist tendenziell größer als die der Standardsoftware" laut den Kontrollfragen der Vorlesung zu bewerten?',
        options: [
          'Sie ist falsch, da Standardsoftware durch ihren breiten Funktionsumfang immer eine höhere Nutzungsquote erreicht',
          'Sie ist richtig, da Individualsoftware maßgeschneidert für den tatsächlichen Bedarf entwickelt wird, während bei Standardsoftware (z. B. im SAP-Beispiel mit 5–19 % Nutzungsquote je Fachbereich) viele Funktionen für den anonymen Markt ungenutzt bleiben',
          'Sie ist falsch, da Nutzungsquoten laut Vorlesung nur bei Lizenztypen eine Rolle spielen',
          'Sie ist richtig, weil Individualsoftware grundsätzlich teurer in der Anschaffung ist',
        ],
        correct: 1,
        explain:
          'Die Kontrollfrage bejaht diese Aussage: Individualsoftware ist maßgeschneidert, während Standardsoftware für den breiten, anonymen Markt entwickelt wird und daher – wie das SAP-ERP-Beispiel mit Nutzungsquoten zwischen 5 % (Treasury) und 19 % (Instandhaltung) zeigt – viele Funktionen ungenutzt lässt.',
      },
      {
        q: 'Welche der folgenden Aussagen zum Betriebsmodellvergleich On-Premise vs. On-Demand ist FALSCH?',
        options: [
          'On-Premise ermöglicht durch Kontrolle der gesamten Hard- und Software eine bessere Integration der Geschäftsprozesse',
          'On-Demand verursacht in der Regel monatliche Kosten statt hoher Anfangsinvestitionen',
          'On-Demand bietet aufgrund der Standardisierung mehr Anpassungsmöglichkeiten als On-Premise',
          'On-Premise erfordert eigene Infrastruktur und Know-how sowie ggf. Abhängigkeiten von externen Faktoren wie dem Internet',
        ],
        correct: 2,
        explain:
          'Laut Vergleichstabelle ist es umgekehrt: On-Demand bietet aufgrund der Standardisierung und des fehlenden Softwareeigentums gerade WENIG Anpassungsmöglichkeiten, während On-Premise durch volle Kontrolle der Hard- und Software bessere Integration erlaubt. Die übrigen drei Aussagen entsprechen den Folieninhalten.',
      },
      {
        q: 'Welche Aussage zum Lizenztyp ist FALSCH?',
        options: [
          'Eine Named-User-License legt eine maximale Anzahl namentlich bekannter Nutzer fest',
          'Eine Flat Rate ist ein Beispiel für einen zeitbasierten Lizenztyp',
          '„Pay per Use" ist ein Beispiel für einen geräte-basierten Lizenztyp',
          '„Pro Prozessor" ist ein Beispiel für einen geräte-basierten Lizenztyp',
        ],
        correct: 2,
        explain:
          '„Pay per Use" ist laut Vorlesung ein nutzungsvorgangsbasierter Lizenztyp (Abrechnung pro Vorgang), kein geräte-basierter; geräte-basierte Lizenztypen sind z. B. „Pro Installation", „Pro benannter Maschine (OEM)", „Pro Prozessor" oder „Pro Netz".',
      },
      {
        q: 'Welche Lizenztyp-Kategorie eignet sich am wenigsten für ein On-Demand-Betriebsmodell, bei dem der Kunde keine eigene Hardware betreibt?',
        options: [
          'Nutzerbasierte Lizenzen (z. B. Named-User- oder Concurrent-User-License)',
          'Geräte-basierte Lizenzen wie „Pro Prozessor" oder „Pro benannter Maschine", da der Kunde die zugrunde liegende Hardware im On-Demand-Modell nicht selbst besitzt oder kontrolliert',
          'Zeitbasierte Lizenzen wie Flat Rate',
          'Nutzungsvorgang-basierte Lizenzen wie „Pay per Use"',
        ],
        correct: 1,
        explain:
          'On-Demand bedeutet laut Hosting-Folie Miete der Server/Software ohne eigene Infrastruktur beim Kunden. Geräte-basierte Lizenzmodelle setzen jedoch voraus, dass eine konkrete, dem Kunden bekannte Maschine oder ein Prozessor gezählt werden kann – das passt nicht zum Modell, in dem der Anbieter Hard- und Software betreibt.',
      },
    ],
  },
};
