import type { LectureChapter } from '../types';

export const kapitel11: LectureChapter = {
  id: 'kapitel11',
  number: 11,
  title: 'Informationssicherheit',
  subtitle: 'IT-Sicherheit, Datenschutz und Datensicherheit, Schutzziele der EU-DSGVO sowie Archivierung und Backup',
  icon: '🔒',
  color: 'var(--numbers)',
  tutorial: [
    {
      title: 'Drei Begriffe, die oft verwechselt werden',
      content:
        'In der Wirtschaftsinformatik werden drei Sicherheitsbegriffe häufig durcheinandergebracht, obwohl sie unterschiedliche Schutzobjekte haben. IT-Sicherheit bewahrt die IT-Systeme selbst (Hardware, Software, Netze) vor Zerstörung oder Beeinträchtigung. Datensicherheit schützt die Daten vor Verlust, Verfälschung oder unbefugtem Zugriff, etwa durch Archivierung und Backup. Datenschutz dagegen schützt weder Systeme noch Daten an sich, sondern die schutzwürdigen Belange der von den Daten betroffenen Personen vor Beeinträchtigung und Verbreitung – geregelt durch die EU-DSGVO.',
    },
    {
      title: 'Regelungsebenen der IT-Sicherheit',
      content:
        'Maßnahmen zur IT-Sicherheit lassen sich in drei Ebenen einteilen. Allgemeine Regelungen betreffen z. B. das Speichern eigener Daten sowie die Einhaltung von BDSG/EU-DSGVO und anderen Gesetzen wie dem Jugendschutz. Persönliche Regelungen behandeln die private Nutzung von Firmenressourcen, regelmäßige Schulungen sowie den Umgang mit Social Media und BYOD. IT-orientierte Regelungen umfassen technische Maßnahmen wie die Nutzung von Verschlüsselung, Archivierung/Backup und die Sicherstellung der Software- und Hardwareaktualität.',
    },
    {
      title: 'Datenschutz nach EU-DSGVO',
      content:
        'Datenschutz bewahrt die schutzwürdigen Belange der Betroffenen vor Verlust, Verfälschung und Missbrauch ihrer Daten. Personenbezogene Daten sind alle Daten, die sich eindeutig – auch nur indirekt – einer bestimmten natürlichen Person zuordnen lassen. Eine Sonderkategorie bilden besonders schützenswerte Daten wie rassische/ethnische Herkunft, politische Meinung, religiöse Überzeugung, Gewerkschaftszugehörigkeit, Gesundheit oder Sexualleben. Deren Verarbeitung ist nur in Ausnahmefällen zulässig und muss besonders sorgsam erfolgen.',
    },
    {
      title: 'Grundsätze der Datenverarbeitung',
      content:
        'Personenbezogene Daten dürfen ohne Ausnahme nur erhoben und verarbeitet werden, wenn eine Rechtfertigung vorliegt: Gesetz, Wahrnehmung öffentlicher Interessen, Vertrag oder Einwilligung. Die betroffene Person muss bei der Erhebung sofort informiert werden. Die Zweckbindung besagt zusätzlich, dass Daten nur für den Zweck verwendet und nur so lange gespeichert werden dürfen, wie es zur Erfüllung dieses Zwecks nötig ist. Das Berechtigungskonzept ergänzt dies technisch: Das Need-to-Know-Prinzip erlaubt nur das Anzeigen benötigter Daten, das Need-to-Do-Prinzip erlaubt Ändern, Einfügen oder Löschen nur, soweit es zur Aufgabenerfüllung nötig ist.',
    },
    {
      title: 'Pseudonymisierung und Anonymisierung',
      content:
        'Bei der Pseudonymisierung wird der Name oder ein anderes Identifikationsmerkmal durch ein Pseudonym (z. B. eine Kundennummer) ersetzt. Dabei bleiben Bezüge zwischen Datensätzen erhalten, die auf dieselbe Weise pseudonymisiert wurden – mit Zusatzwissen ist die Person weiterhin identifizierbar. Anonymisierung geht weiter: Der Datensatz wird so verändert, dass ohne Zusatzwissen ein Rückschluss auf eine natürliche Person nicht mehr möglich ist. Nicht-personenbezogene, aggregierte, anonymisierte und pseudonymisierte Daten unterliegen deshalb einem eingeschränkten Datenschutz gegenüber vollständig personenbezogenen Daten.',
    },
    {
      title: 'Die vier Schutzziele digitaler Geschäfte',
      content:
        'Damit digitale Geschäfte sicher ablaufen können, müssen vier Schutzziele erfüllt sein. Vertraulichkeit schützt den Inhalt übertragener Informationen vor dem Zugriff Unbefugter – Unbefugte dürfen nicht lesen. Integrität schützt vor der Änderung durch Unbefugte – Unbefugte dürfen nicht ändern. Authentizität ist der Nachweis der Identität des Absenders gegenüber dem Empfänger, Verbindlichkeit bedeutet, dass der Empfänger beweisen kann, dass der Inhalt tatsächlich vom Sender stammt – Leugnen ist zwecklos.',
    },
    {
      title: 'Verschlüsselung: symmetrisch vs. asymmetrisch',
      content:
        'Bei der symmetrischen Verschlüsselung wird mit demselben Schlüssel chiffriert und dechiffriert (Standards: DES, AES). Sie zielt primär auf Vertraulichkeit und Integrität, hat aber den Nachteil, dass keine spontane Kommunikation möglich ist und die Schlüsselweitergabe komplex ist. Bei der asymmetrischen Verschlüsselung (z. B. RSA, basierend auf Primzahlen) gibt es zwei Schlüssel: Mit dem öffentlichen Schlüssel wird verschlüsselt, mit dem privaten Schlüssel entschlüsselt. Klassische symmetrische Verfahren sind die Transposition (z. B. die Skytale von Sparta, Veränderung der Zeichenreihenfolge) und die Substitution (z. B. die Cäsar-Verschlüsselung, Ersetzung der Zeichen durch Verschiebung des Alphabets).',
    },
    {
      title: 'Integrität durch Hashfunktionen, Authentizität in der Praxis',
      content:
        'Integrität wird technisch durch Hashfunktionen sichergestellt: Sie erzeugen aus einer Zeichenfolge einen numerischen, nicht umkehrbaren und kollisionsfreien "digitalen Fingerabdruck" (z. B. mit SHA1, SHA256, SHA512 oder MD5). Authentizität wird über Wissen (Passwort, TAN), Besitz (RFID-Karte, Ausweis) oder Biometrie (Fingerabdruck, Gesichtserkennung) nachgewiesen, häufig als hybride Kombination wie Karte plus PIN am Geldautomaten. Da die Dauer einer Brute-Force-Attacke mit Passwortlänge und Zeichenvielfalt (Alphabet, Groß-/Kleinschreibung, Zahlen, Sonderzeichen) stark ansteigt, sollten Passwörter lang und komplex sein. Beim Speichern wird zusätzlich zum Hash ein Salt (Zufallswort) verwendet, damit identische Passwörter nicht denselben Hashwert ergeben.',
    },
    {
      title: 'Datensicherung: Archivierungsarten und Backup/RAID',
      content:
        'Datenarchivierung/-sicherung bedeutet, Datenbestände in festen Zeitabständen auf externe Speichermedien zu kopieren – für viele Unternehmen gesetzlich vorgeschrieben (HGB, GDPdU, GoB). Die Vollarchivierung überträgt alle Daten (zeit- und speicherintensiv, aber schnelle Wiederherstellung), die kumulative Archivierung nur die seit der letzten Vollarchivierung geänderten Daten, und die inkrementelle Archivierung nur die seit der letzten beliebigen Archivierung geänderten Daten (am sparsamsten, aber mit der komplexesten Wiederherstellung). Bei Backups unterscheidet man Online-/Hot-Backup (permanent, "fast" aktuelle Daten) von Offline-/Cold-Backup (nur bei inaktivem System, "etwas" veraltete Daten) sowie RAID als Echtzeitsicherung ohne Zeitverzögerung. RAID 1 spiegelt Daten für schnelle Wiederherstellung (z. B. Kassensysteme, Geldautomaten), RAID 3/5 verteilen Daten und Parität auf mindestens drei Platten für Sicherheit plus schnellen Zugriff (z. B. Datenbankserver).',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Wie ist IT-Sicherheit in der Vorlesung definiert?',
        options: [
          'Bewahrung der IT-Systeme vor Zerstörung oder Beeinträchtigung',
          'Bewahrung der schutzwürdigen Belange der Betroffenen vor Missbrauch ihrer Daten',
          'Regelmäßige Sicherung von Daten auf externen Speichermedien',
          'Verschlüsselung aller personenbezogenen Daten',
        ],
        correct: 0,
        explain:
          'IT-Sicherheit bezieht sich laut Definition auf den Schutz der IT-Systeme selbst vor Zerstörung oder Beeinträchtigung – nicht auf den Schutz der betroffenen Personen (das ist Datenschutz) oder auf Sicherungsmaßnahmen für Daten (Datensicherheit).',
      },
      {
        q: 'Wie ist Datenschutz laut EU-DSGVO in der Vorlesung definiert?',
        options: [
          'Bewahrung der IT-Systeme vor Zerstörung oder Beeinträchtigung',
          'Bewahrung der schutzwürdigen Belange der Betroffenen vor Beeinträchtigung und Verbreitung (Verlust, Verfälschung, Missbrauch)',
          'Kopieren von Datenbeständen auf externe Speichermedien in festen Zeitabständen',
          'Verschlüsselung von Nachrichten mit einem öffentlichen Schlüssel',
        ],
        correct: 1,
        explain:
          'Datenschutz schützt laut Vorlesung die Betroffenen selbst vor Missbrauch ihrer Daten – im Unterschied zur IT-Sicherheit, die die technischen Systeme schützt.',
      },
      {
        q: 'Was sind personenbezogene Daten?',
        options: [
          'Nur Daten, die einen Namen enthalten',
          'Ausschließlich Gesundheits- und Religionsdaten',
          'Alle Daten, die eindeutig – auch nur indirekt – einer bestimmten natürlichen Person zugeordnet werden können',
          'Daten, die bereits anonymisiert wurden',
        ],
        correct: 2,
        explain:
          'Personenbezogene Daten sind per Definition alle Daten, die sich – auch nur indirekt – eindeutig einer natürlichen Person zuordnen lassen.',
      },
      {
        q: "Welche der folgenden Kategorien zählt laut Vorlesung zu den 'besonders schützenswerten Daten'?",
        options: ['Postleitzahl', 'Gesundheitsdaten', 'Kundennummer', 'Umsatz eines Kunden'],
        correct: 1,
        explain:
          'Gesundheitsdaten zählen laut Vorlesung explizit zu den besonders schützenswerten Daten, deren Verarbeitung nur in Ausnahmefällen zulässig ist. Postleitzahl, Kundennummer und Umsatz sind zwar ggf. personenbezogen, aber nicht in dieser besonderen Schutzkategorie.',
      },
      {
        q: 'Was beschreibt das Schutzziel Vertraulichkeit?',
        options: [
          'Schutz des Inhalts übertragener Informationen vor dem Zugriff Unbefugter',
          'Nachweis der Identität des Absenders gegenüber dem Empfänger',
          'Schutz vor Änderung des Inhalts durch Unbefugte',
          'Der Empfänger kann beweisen, dass der Inhalt vom Sender stammt',
        ],
        correct: 0,
        explain: 'Vertraulichkeit bedeutet konkret, dass Unbefugte übertragene Informationen nicht lesen dürfen.',
      },
      {
        q: 'Was beschreibt das Schutzziel Integrität?',
        options: [
          'Schutz des Inhalts übertragener Informationen vor dem Zugriff Unbefugter',
          'Schutz des Inhalts übertragener Informationen vor der Änderung durch Unbefugte',
          'Nachweis der Identität des Absenders',
          'Unmöglichkeit, den Empfang einer Nachricht zu leugnen',
        ],
        correct: 1,
        explain:
          'Integrität bedeutet, dass Unbefugte den Inhalt einer Nachricht nicht verändern dürfen – im Unterschied zur Vertraulichkeit, bei der es ums Lesen geht.',
      },
      {
        q: 'Was bedeutet Verbindlichkeit als Schutzziel?',
        options: [
          'Unbefugte dürfen die Nachricht nicht lesen',
          'Unbefugte dürfen die Nachricht nicht ändern',
          'Der Empfänger kann beweisen, dass der Inhalt der Nachricht vom Sender stammt – Leugnen ist zwecklos',
          'Der Absender verschlüsselt die Nachricht mit einem öffentlichen Schlüssel',
        ],
        correct: 2,
        explain:
          'Verbindlichkeit stellt sicher, dass der Empfänger nachweisen kann, dass eine Nachricht tatsächlich vom angegebenen Sender stammt, sodass dieser die Urheberschaft nicht abstreiten kann.',
      },
      {
        q: 'Was passiert bei einer Vollarchivierung?',
        options: [
          'Es werden nur die seit der letzten Sicherung geänderten Daten übertragen',
          'Es werden alle zu sichernden Daten auf das Speichermedium übertragen',
          'Es wird nur ein Hashwert der Daten gespeichert',
          'Die Daten werden ausschließlich verschlüsselt, aber nicht kopiert',
        ],
        correct: 1,
        explain:
          'Eine Vollarchivierung überträgt den kompletten zu sichernden Datenbestand auf das Speichermedium – das macht sie zeit- und speicherintensiv, ermöglicht aber die schnellste Wiederherstellung.',
      },
    ],
    advanced: [
      {
        q: 'Ein Unternehmen verschlüsselt seine Server-Festplatten und schult Mitarbeitende regelmäßig zum sicheren Umgang mit IT-Ressourcen. Welchem Begriff sind diese Maßnahmen am ehesten zuzuordnen?',
        options: ['Datenschutz', 'IT-Sicherheit', 'Zweckbindung', 'Berechtigungskonzept'],
        correct: 1,
        explain:
          'Verschlüsselung und Schulungen sind IT-orientierte bzw. persönliche Regelungen der IT-Sicherheit, die die IT-Systeme vor Beeinträchtigung schützen sollen. Datenschutz beträfe dagegen die Rechte der von den Daten betroffenen Personen, nicht die Systeme.',
      },
      {
        q: "Zu welcher Regelungsebene der IT-Sicherheit gehört die 'Nutzung der Verschlüsselung'?",
        options: ['Allgemeine Regelungen', 'Persönliche Regelungen', 'IT-orientierte Regelungen', 'Datenschutzrechtliche Regelungen'],
        correct: 2,
        explain:
          'Verschlüsselung ist eine technische Maßnahme und zählt damit zu den IT-orientierten Regelungen, ebenso wie Archivierung/Backup und die Aktualität von Software und Hardware.',
      },
      {
        q: "Zu welcher Regelungsebene gehört der 'regelmäßige Besuch von Schulungsveranstaltungen'?",
        options: ['Allgemeine Regelungen', 'Persönliche Regelungen', 'IT-orientierte Regelungen', 'Rechtfertigung zur Datenverarbeitung'],
        correct: 1,
        explain:
          'Schulungen betreffen das Verhalten der Mitarbeitenden im Umgang mit IT-Ressourcen und zählen daher zu den persönlichen Regelungen, nicht zu den technischen (IT-orientierten) Maßnahmen.',
      },
      {
        q: 'Worin liegt der zentrale Unterschied zwischen Pseudonymisierung und Anonymisierung?',
        options: [
          'Bei der Pseudonymisierung bleiben Bezüge zwischen gleich pseudonymisierten Datensätzen erhalten, bei der Anonymisierung ist ein Rückschluss auf die Person ohne Zusatzwissen nicht mehr möglich',
          'Pseudonymisierung betrifft nur Zahlen, Anonymisierung nur Texte',
          'Anonymisierte Daten dürfen ohne Einschränkung veröffentlicht werden, pseudonymisierte nicht',
          'Es gibt keinen Unterschied, beide Begriffe meinen dasselbe Verfahren',
        ],
        correct: 0,
        explain:
          'Bei der Pseudonymisierung bleibt über das Pseudonym ein Bezug zum ursprünglichen Datensatz erhalten, sodass mit Zusatzwissen eine Re-Identifizierung möglich ist. Bei der Anonymisierung ist genau das nicht mehr möglich.',
      },
      {
        q: 'Wann dürfen personenbezogene Daten laut Vorlesung erhoben und verarbeitet werden?',
        options: [
          'Immer, sofern das Unternehmen ein berechtigtes Geschäftsinteresse hat',
          'Nur wenn eine Rechtfertigung vorliegt: Gesetz, Wahrnehmung öffentlicher Interessen, Vertrag oder Einwilligung',
          'Nur mit schriftlicher Genehmigung einer Aufsichtsbehörde',
          'Immer, solange die Daten anschließend archiviert werden',
        ],
        correct: 1,
        explain:
          'Die Vorlesung nennt vier mögliche Rechtfertigungsgründe: Gesetz, Wahrnehmung öffentlicher Interessen, Vertrag oder Einwilligung. Ohne einen dieser Gründe ist eine Verarbeitung personenbezogener Daten unzulässig, unabhängig vom Geschäftsinteresse des Unternehmens.',
      },
      {
        q: 'Was besagt das Need-to-Know-Prinzip im Berechtigungskonzept?',
        options: [
          'Mitarbeitende dürfen nur die Daten anzeigen, die sie zur Erfüllung ihrer Aufgaben benötigen',
          'Mitarbeitende dürfen Daten nur ändern, wenn es zur Aufgabenerfüllung nötig ist',
          'Alle Mitarbeitenden dürfen alle Daten des Unternehmens einsehen',
          'Daten dürfen nur nach vorheriger Anonymisierung angezeigt werden',
        ],
        correct: 0,
        explain:
          'Need-to-Know erlaubt nur das Anzeigen benötigter Daten. Das Ändern, Einfügen oder Löschen regelt dagegen das Need-to-Do-Prinzip – die zweite Aussage beschreibt das falsche Prinzip.',
      },
      {
        q: 'Was ist der wesentliche Nachteil der symmetrischen gegenüber der asymmetrischen Verschlüsselung?',
        options: [
          'Sie bietet keine Integrität, nur Vertraulichkeit',
          'Sie ermöglicht keine spontane Kommunikation und erfordert eine komplexe Schlüsselweitergabe, da beide Seiten denselben Schlüssel benötigen',
          'Sie basiert nicht auf anerkannten Standards wie DES oder AES',
          'Sie kann nicht zur Verschlüsselung von Text verwendet werden',
        ],
        correct: 1,
        explain:
          'Da symmetrische Verschlüsselung denselben Schlüssel zum Ver- und Entschlüsseln nutzt, muss dieser vorab sicher ausgetauscht werden, was spontane Kommunikation erschwert. Asymmetrische Verfahren umgehen dieses Problem durch getrennte öffentliche und private Schlüssel.',
      },
      {
        q: 'Warum wird beim Speichern von Passwörtern zusätzlich zum Hash ein Salt verwendet?',
        options: [
          'Damit Passwörter überhaupt gespeichert werden können',
          'Damit gleiche Passwörter nicht denselben Hashwert ergeben und so schwerer über vorberechnete Tabellen zu knacken sind',
          'Damit der Hashwert kürzer wird',
          'Damit die Wiederherstellung des Klartext-Passworts möglich wird',
        ],
        correct: 1,
        explain:
          'Ein Salt sorgt dafür, dass identische Passwörter unterschiedliche Hashwerte ergeben, was Angriffe mit vorberechneten Tabellen (Rainbow Tables) deutlich erschwert.',
      },
    ],
    pro: [
      {
        q: 'Welche Aussage zu RAID 1 (Spiegelung/Mirroring) ist FALSCH?',
        options: [
          'RAID 1 ermöglicht eine schnelle Wiederherstellung von Daten',
          'RAID 1 beschleunigt das Schreiben und Lesen von Daten',
          'RAID 1 eignet sich für Systeme mit hohem Verfügbarkeitsbedarf wie Kassensysteme oder Geldautomaten',
          'Bei RAID 1 werden Daten auf mindestens zwei Massenspeicher gespiegelt',
        ],
        correct: 1,
        explain:
          'Laut Vorlesung beschleunigt RAID 1 gerade NICHT das Schreiben und Lesen – der Vorteil liegt in der schnellen Wiederherstellung durch die gespiegelten Daten, nicht in höherer Zugriffsgeschwindigkeit.',
      },
      {
        q: 'Ein Supermarkt archiviert die Preisdaten seines Kassenservers täglich abends; eine Wiederherstellung aus dem Archiv dauert bis zu 10 Stunden. Welches Verfahren ist am besten geeignet, um einen unterbrechungsfreien Kassenbetrieb sicherzustellen?',
        options: ['RAID 0', 'RAID 1', 'Kumulative Archivierung', 'Inkrementelle Archivierung'],
        correct: 1,
        explain:
          'RAID 1 spiegelt die Daten in Echtzeit auf einen zweiten Massenspeicher und ermöglicht dadurch eine sofortige, sehr schnelle Wiederherstellung – für Kassensysteme mit hohem Verfügbarkeitsbedarf wird RAID 1 in der Vorlesung genannt. Eine tägliche Archivierung mit 10 Stunden Wiederherstellungszeit reicht für unterbrechungsfreien Betrieb nicht aus.',
      },
      {
        q: "Ein Kundendatensatz wird so verändert, dass Name und E-Mail-Adresse durch die Kundennummer '222' ersetzt werden, alle übrigen Felder (PLZ, Geburtsdatum, Umsatz etc.) aber unverändert bleiben. Um welches Verfahren handelt es sich?",
        options: [
          'Anonymisierung, da die Person nicht mehr identifizierbar ist',
          'Pseudonymisierung, da über die Kundennummer weiterhin ein Bezug zum ursprünglichen Datensatz herstellbar ist',
          'Verschlüsselung, da ein Schlüssel verwendet wird',
          'Aggregation, da mehrere Datensätze zusammengefasst werden',
        ],
        correct: 1,
        explain:
          'Weil das Identifikationsmerkmal nur durch ein Pseudonym (Kundennummer) ersetzt wird und die übrigen, teils indirekt identifizierenden Merkmale erhalten bleiben, ist eine Re-Identifizierung mit Zusatzwissen möglich – das ist per Definition Pseudonymisierung, keine Anonymisierung.',
      },
      {
        q: "Welche Aussage zum 'eingeschränkten Datenschutz' ist FALSCH?",
        options: [
          'Nicht-personenbezogene Daten unterliegen nicht den vollen Anforderungen der EU-DSGVO',
          'Aggregierte und anonymisierte Daten unterliegen einem eingeschränkten Datenschutz',
          'Besonders schützenswerte personenbezogene Daten unterliegen den strengsten Anforderungen der EU-DSGVO',
          'Anonymisierte Daten müssen genauso streng geschützt werden wie besonders schützenswerte personenbezogene Daten',
        ],
        correct: 3,
        explain:
          'Anonymisierte Daten fallen laut Vorlesung unter den eingeschränkten Datenschutz, gerade weil sie – anders als besonders schützenswerte personenbezogene Daten – keinen (einfachen) Rückschluss auf eine Person mehr zulassen. Die vierte Aussage kehrt diese Abstufung fälschlich um.',
      },
      {
        q: 'Welche Aussage zum Vergleich von kumulativer und inkrementeller Archivierung ist FALSCH?',
        options: [
          'Die kumulative Archivierung sichert alle Änderungen seit der letzten Vollarchivierung',
          'Die inkrementelle Archivierung sichert nur die Änderungen seit der letzten beliebigen Archivierung',
          'Die Wiederherstellung ist bei der inkrementellen Archivierung einfacher als bei der kumulativen, weil weniger Archive benötigt werden',
          'Beide Verfahren benötigen weniger Speicherplatz als eine Vollarchivierung',
        ],
        correct: 2,
        explain:
          'Tatsächlich ist die Wiederherstellung bei der inkrementellen Archivierung laut Vorlesung sehr komplex, da die Vollarchivierung und ALLE nachfolgenden inkrementellen Archive der Reihe nach eingespielt werden müssen – das ist komplexer, nicht einfacher, als bei der kumulativen Archivierung.',
      },
      {
        q: 'Ein Onlinehändler sichert Kundendaten regelmäßig per Backup, um sie vor Verlust zu schützen, und informiert Kunden zugleich per Einwilligungserklärung über die Verwendung ihrer Daten. Welche Zuordnung ist korrekt?',
        options: [
          'Beide Maßnahmen sind Datenschutz, da beide personenbezogene Daten betreffen',
          'Das Backup dient der Datensicherheit (Schutz der Daten vor Verlust), die Einwilligungserklärung dem Datenschutz (Schutz der Rechte der Betroffenen)',
          'Beide Maßnahmen sind IT-Sicherheit, da beide technische Systeme betreffen',
          'Das Backup dient dem Datenschutz, die Einwilligungserklärung der IT-Sicherheit',
        ],
        correct: 1,
        explain:
          'Das Backup schützt die Daten selbst vor Verlust (Datensicherheit), während die Einwilligungserklärung die Rechtfertigung zur Verarbeitung personenbezogener Daten sicherstellt und damit die Betroffenenrechte wahrt (Datenschutz). Beide Begriffe beziehen sich auf unterschiedliche Schutzobjekte, auch wenn beide mit denselben Kundendaten zu tun haben.',
      },
    ],
  },
};
