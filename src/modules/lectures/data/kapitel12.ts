import type { LectureChapter } from '../types';

export const kapitel12: LectureChapter = {
  id: 'kapitel12',
  number: 12,
  title: 'SAP S/4HANA: Daten, Apps und Prüfungen',
  subtitle: 'Datenarten, App-Typen, Organisationseinheiten, Belegprinzip und programmierte Kontrollen',
  icon: '🖥️',
  color: 'var(--erp)',
  tutorial: [
    {
      title: 'Die vier Datenarten in S/4HANA',
      content:
        'SAP S/4HANA unterscheidet vier Datenarten. Organisationsdaten bilden die Struktur eines Unternehmens ab, z. B. Buchungskreis, Werk, Lagerort, Vertriebsweg oder Einkaufsorganisation — sie ändern sich sehr selten. Stammdaten beschreiben Objekte, die über einen längeren Zeitraum unverändert genutzt werden, z. B. Person, Material, Kunde, Lieferant, Kondition oder Sachkonto (inklusive Hauptbuchkonten sowie Debitoren-/Kreditorenkonten). Bewegungsdaten entstehen bei jedem Geschäftsvorfall neu, z. B. Bestellung, Rechnung, Angebot, Kundenauftrag oder Transportauftrag. Konfigurationsdaten steuern schließlich, wie das System einen Vorgang behandelt, z. B. Zahlweg, Zahlungsbedingung, Belegart, Stornogrund, Transportart, Umrechnungsdatum oder Buchungsdatum.',
    },
    {
      title: 'Datenarten unterscheiden — Faustregel',
      content:
        'Eine einfache Eselsbrücke: Wer/Was macht mit? → das sind meist Stammdaten (Kunde, Lieferant, Material). Wo/In welcher Struktur? → Organisationsdaten (Buchungskreis, Werk). Was ist konkret passiert? → Bewegungsdaten (Bestellung, Rechnung). Wie soll das System den Vorgang behandeln? → Konfigurationsdaten (Zahlweg, Belegart). Bei derselben Buchung können mehrere Datenarten gleichzeitig vorkommen, z. B. bei einer Zahlungsbuchung: Buchungskreis und Buchungsperiode (Organisationsdaten), Buchungsbelegart und Buchungsdatum (Konfigurationsdaten) sowie Sachkonto und Kreditorenkonto (Stammdaten).',
    },
    {
      title: 'Die drei App-Typen in S/4HANA (Fiori)',
      content:
        'S/4HANA unterscheidet drei App-Typen. Transaktions-Apps ermöglichen den Zugang zu klassischen Transaktionen wie Erstellen, Ändern oder Anzeigen mit einer geführten Navigation durch mehrere Bildschirmschritte. Analytische Apps (Analysen) bieten einen visuellen und grafischen Überblick über Geschäftsdaten, etwa in Form von Kacheln, Diagrammen und KPIs. Factsheet-Apps (Reports) liefern essenzielle Informationen über ein Objekt und ermöglichen die Navigation zwischen verwandten Apps — z. B. von einem Kunden-Factsheet direkt zu dessen offenen Rechnungen.',
    },
    {
      title: 'Datenoperationen: Welche App kann was?',
      content:
        'Die vier Datenoperationen lauten Anzeigen, Erfassen, Ändern und Löschen. Nicht jeder App-Typ unterstützt jede Operation: Anzeigen ist in allen drei App-Typen möglich (Transaktions-, Analytische und Factsheet-Apps). Erfassen ist in Transaktions-Apps und Factsheet-Apps möglich, nicht aber in rein Analytischen Apps. Ändern und Löschen sind dagegen ausschließlich in Transaktions-Apps möglich — Analytische Apps und Factsheet-Apps dienen primär der Information und Navigation, nicht der Datenpflege.',
    },
    {
      title: 'Organisationseinheiten: Buchungskreis, Kreditkontrollbereich, Geschäftsbereich',
      content:
        'Der Buchungskreis ist die kleinste Organisationseinheit des externen Rechnungswesens, für die eine vollständige, in sich abgeschlossene Buchhaltung abgebildet werden kann (z. B. eine eigene Gewinn- und Verlustrechnung sowie Bilanz). Der Kreditkontrollbereich ist die Organisationseinheit, über die Kreditlinien für Kunden gewährt und überwacht werden — er kann mehrere Buchungskreise umfassen. Der Geschäftsbereich ist eine Organisationseinheit, die einen separaten Bereich der Geschäftstätigkeit innerhalb einer Organisation darstellt; Wertveränderungen in diesem Bereich werden gesondert in der Finanzbuchhaltung (FI) erfasst.',
    },
    {
      title: 'Das Belegprinzip',
      content:
        'Bei jedem Geschäftsvorfall, der eine Auswirkung auf das Finanzwesen (FI) hat, wird automatisch ein eindeutiger Beleg erstellt — das ist das Belegprinzip. Jeder Beleg erhält eine eindeutige Belegnummer, über die er später jederzeit wiedergefunden und nachvollzogen werden kann (Prinzip „Keine Buchung ohne Beleg"). Das Belegprinzip ist die Grundlage für die Nachvollziehbarkeit (Revisionssicherheit) aller Buchungen in S/4HANA.',
    },
    {
      title: 'Programmierte Kontrollen: die vier Prüfungsarten',
      content:
        'Beim Erfassen von Belegen führt S/4HANA automatisch programmierte Kontrollen durch, bevor gebucht werden kann. Es gibt vier Arten: Die Formatprüfung kontrolliert, ob eine Eingabe dem vorgeschriebenen Format entspricht, z. B. ob eine Kontonummer die richtige Stellenzahl hat. Die Ausschlussprüfung (auch Existenzprüfung) kontrolliert, ob der eingegebene Wert im System überhaupt vorgesehen bzw. angelegt ist, z. B. ob ein Sachkonto im verwendeten Kontenplan existiert. Die Plausibilitätsprüfung kontrolliert, ob eine Eingabe inhaltlich sinnvoll ist, z. B. ob ein Buchungsdatum in einem realistischen Bereich liegt (ein Beleg mit Buchungsjahr „1899" wäre unplausibel). Die Vollständigkeitsprüfung kontrolliert schließlich, ob alle Pflichtfelder eines Belegs ausgefüllt wurden.',
    },
    {
      title: 'Beispiel aus der Klausur: „Sachkonto 1809989 ist im Kontenplan GL00 nicht vorgesehen"',
      content:
        'Diese Fehlermeldung erscheint, wenn beim Buchen eines Hauptbuchbelegs ein Sachkonto eingegeben wird, das im verwendeten Kontenplan gar nicht existiert. Geprüft wird hier nicht das Format der Kontonummer (das wäre eine Formatprüfung) und auch nicht, ob das Datum plausibel ist — sondern schlicht, ob es das Konto im System überhaupt gibt. Das ist deshalb eine Ausschlussprüfung: Das System schließt ungültige, nicht angelegte Werte konsequent aus, bevor ein Beleg gebucht werden kann.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Zu welcher Datenart gehört der „Buchungskreis"?',
        options: ['Stammdaten', 'Organisationsdaten', 'Bewegungsdaten', 'Konfigurationsdaten'],
        correct: 1,
        explain: 'Der Buchungskreis bildet die Unternehmensstruktur ab und ändert sich sehr selten — er zählt zu den Organisationsdaten.',
      },
      {
        q: 'Zu welcher Datenart gehört eine „Rechnung"?',
        options: ['Organisationsdaten', 'Stammdaten', 'Bewegungsdaten', 'Konfigurationsdaten'],
        correct: 2,
        explain: 'Eine Rechnung entsteht bei jedem Geschäftsvorfall neu — sie ist ein klassisches Beispiel für Bewegungsdaten.',
      },
      {
        q: 'Zu welcher Datenart gehört ein „Kunde" als Objekt im System?',
        options: ['Stammdaten', 'Bewegungsdaten', 'Konfigurationsdaten', 'Organisationsdaten'],
        correct: 0,
        explain: 'Ein Kunde wird einmal angelegt und über einen längeren Zeitraum unverändert genutzt — das ist typisch für Stammdaten.',
      },
      {
        q: 'Zu welcher Datenart gehört der „Zahlweg" (z. B. Überweisung, Lastschrift)?',
        options: ['Stammdaten', 'Organisationsdaten', 'Bewegungsdaten', 'Konfigurationsdaten'],
        correct: 3,
        explain: 'Der Zahlweg steuert, wie das System einen Vorgang behandelt — das ist ein Beispiel für Konfigurationsdaten.',
      },
      {
        q: 'Welche der folgenden Datenoperationen gibt es in S/4HANA?',
        options: [
          'Anzeigen, Erfassen, Ändern, Löschen',
          'Erstellen, Kopieren, Verschieben, Archivieren',
          'Lesen, Schreiben, Ausführen, Verweigern',
          'Buchen, Stornieren, Simulieren, Drucken',
        ],
        correct: 0,
        explain: 'Die vier Datenoperationen in S/4HANA lauten Anzeigen, Erfassen, Ändern und Löschen.',
      },
      {
        q: 'Welche App liefert einen visuellen, grafischen Überblick über Geschäftsdaten (z. B. Kacheln, KPIs)?',
        options: ['Transaktions-App', 'Analytische App', 'Factsheet-App', 'Keine der genannten'],
        correct: 1,
        explain: 'Analytische Apps (Analysen) bieten einen visuellen und grafischen Überblick über Geschäftsdaten.',
      },
      {
        q: 'Was besagt das Belegprinzip?',
        options: [
          'Belege werden nur einmal im Jahr erstellt.',
          'Bei jedem Geschäftsvorfall mit Auswirkung auf das FI wird ein eindeutiger Beleg erstellt.',
          'Belege können beliebig gelöscht werden.',
          'Nur Rechnungen erhalten einen Beleg, alle anderen Vorgänge nicht.',
        ],
        correct: 1,
        explain: 'Das Belegprinzip besagt: Jeder Geschäftsvorfall mit Auswirkung auf das Finanzwesen erzeugt einen eindeutigen, über seine Belegnummer wiederauffindbaren Beleg.',
      },
    ],
    advanced: [
      {
        q: 'In welchen App-Typen ist die Datenoperation „Ändern" möglich?',
        options: ['In allen drei App-Typen', 'Nur in Transaktions-Apps', 'Nur in Analytischen Apps', 'Nur in Factsheet-Apps'],
        correct: 1,
        explain: '„Ändern" (und ebenso „Löschen") ist ausschließlich in Transaktions-Apps möglich — Analytische Apps und Factsheet-Apps dienen der Information, nicht der Datenpflege.',
      },
      {
        q: 'In welchen App-Typen ist die Datenoperation „Erfassen" möglich?',
        options: [
          'Nur in Analytischen Apps',
          'In Transaktions-Apps und Factsheet-Apps',
          'In allen drei App-Typen gleichermaßen',
          'Nur in Transaktions-Apps',
        ],
        correct: 1,
        explain: '„Erfassen" ist sowohl in Transaktions-Apps als auch in Factsheet-Apps möglich, nicht aber in rein Analytischen Apps.',
      },
      {
        q: 'Was unterscheidet den Kreditkontrollbereich vom Buchungskreis?',
        options: [
          'Der Kreditkontrollbereich ist identisch mit dem Buchungskreis.',
          'Der Kreditkontrollbereich dient der Gewährung/Überwachung von Kreditlinien für Kunden und kann mehrere Buchungskreise umfassen.',
          'Der Buchungskreis überwacht ausschließlich Kreditlinien, der Kreditkontrollbereich die Buchhaltung.',
          'Der Kreditkontrollbereich existiert nur in analytischen Apps.',
        ],
        correct: 1,
        explain: 'Der Kreditkontrollbereich gewährt und überwacht Kreditlinien für Kunden und kann organisatorisch mehrere Buchungskreise umfassen, während der Buchungskreis die kleinste abgeschlossene Buchhaltungseinheit ist.',
      },
      {
        q: 'Ein Sachkonto existiert nicht im verwendeten Kontenplan und das Buchen wird mit einer Fehlermeldung abgelehnt. Um welche programmierte Kontrolle handelt es sich?',
        options: ['Formatprüfung', 'Ausschlussprüfung', 'Plausibilitätsprüfung', 'Vollständigkeitsprüfung'],
        correct: 1,
        explain: 'Da geprüft wird, ob das Konto im System überhaupt existiert/vorgesehen ist, handelt es sich um eine Ausschlussprüfung (auch Existenzprüfung genannt).',
      },
      {
        q: 'Eine Kontonummer wird mit 12 Stellen statt der vorgeschriebenen 10 Stellen eingegeben und abgelehnt. Um welche Kontrolle handelt es sich?',
        options: ['Formatprüfung', 'Ausschlussprüfung', 'Plausibilitätsprüfung', 'Vollständigkeitsprüfung'],
        correct: 0,
        explain: 'Hier wird nur das Format (die Stellenzahl) der Eingabe geprüft, unabhängig davon, ob das Konto existiert — das ist eine Formatprüfung.',
      },
      {
        q: 'Welche Aussage zur Ausgangssituation eines Buchungskreises trifft zu?',
        options: [
          'Ein Buchungskreis kann keine eigene Bilanz haben.',
          'Der Buchungskreis ist die kleinste Organisationseinheit, für die eine vollständige, abgeschlossene Buchhaltung abgebildet werden kann.',
          'Ein Buchungskreis besteht immer aus mehreren Konzernen.',
          'Buchungskreise werden ausschließlich für Analytische Apps benötigt.',
        ],
        correct: 1,
        explain: 'Der Buchungskreis ist die kleinste Organisationseinheit des externen Rechnungswesens mit eigener, abgeschlossener Buchhaltung (z. B. eigene GuV und Bilanz).',
      },
      {
        q: 'Zu welcher Datenart zählt das „Umrechnungsdatum" bei einer Zahlungsbuchung?',
        options: ['Stammdaten', 'Organisationsdaten', 'Bewegungsdaten', 'Konfigurationsdaten'],
        correct: 3,
        explain: 'Das Umrechnungsdatum steuert, welcher Wechselkurs für die Buchung herangezogen wird — es zählt zu den Konfigurationsdaten.',
      },
    ],
    pro: [
      {
        q: 'Bei der Buchung eines Zahlungsausgangs kommen u. a. Buchungskreis, Buchungsbelegart, Sachkonto und Kreditorenkonto vor. Welche Zuordnung der Datenarten ist korrekt?',
        options: [
          'Buchungskreis = Konfigurationsdaten, Buchungsbelegart = Organisationsdaten, Sachkonto = Bewegungsdaten, Kreditorenkonto = Stammdaten',
          'Buchungskreis = Organisationsdaten, Buchungsbelegart = Konfigurationsdaten, Sachkonto = Stammdaten, Kreditorenkonto = Stammdaten',
          'Buchungskreis = Stammdaten, Buchungsbelegart = Bewegungsdaten, Sachkonto = Organisationsdaten, Kreditorenkonto = Konfigurationsdaten',
          'Alle vier genannten Felder zählen zu den Bewegungsdaten, da sie Teil einer konkreten Buchung sind.',
        ],
        correct: 1,
        explain: 'Buchungskreis ist Organisationsdaten, Buchungsbelegart ist Konfigurationsdaten, Sachkonto und Kreditorenkonto sind beides Stammdaten (Kontenstammsätze).',
      },
      {
        q: 'Ein Beleg wird abgelehnt, weil das Pflichtfeld „Buchungsdatum" leer gelassen wurde. Welche Kontrolle greift hier — und wie unterscheidet sie sich von einer Plausibilitätsprüfung?',
        options: [
          'Vollständigkeitsprüfung — sie kontrolliert nur, ob Pflichtfelder gefüllt sind, nicht ob der eingegebene Wert inhaltlich sinnvoll ist.',
          'Plausibilitätsprüfung — sie ist identisch mit der Vollständigkeitsprüfung.',
          'Formatprüfung — da ein leeres Feld kein gültiges Datumsformat hat.',
          'Ausschlussprüfung — da das Feld im System nicht existiert.',
        ],
        correct: 0,
        explain: 'Die Vollständigkeitsprüfung stellt nur fest, ob ein Pflichtfeld überhaupt einen Wert enthält. Ob dieser Wert inhaltlich sinnvoll ist (z. B. ein realistisches Datum), prüft erst die nachgelagerte Plausibilitätsprüfung.',
      },
      {
        q: 'Warum kann derselbe Datensatz (z. B. ein Sachkonto) sowohl als Stammdatum als auch Teil von Konfigurationsdaten relevant sein?',
        options: [
          'Weil Sachkonten grundsätzlich keine feste Datenart haben.',
          'Weil das Sachkonto selbst Stammdatum ist (dauerhaftes Objekt), aber z. B. der zugehörige Buchungsbeleg-Typ oder das Buchungsdatum, die den Buchungsvorgang steuern, Konfigurationsdaten sind.',
          'Weil Stammdaten und Konfigurationsdaten technisch identisch gespeichert werden.',
          'Weil ein Sachkonto nach jeder Buchung neu angelegt werden muss.',
        ],
        correct: 1,
        explain: 'Das Sachkonto selbst ist ein dauerhaftes Objekt (Stammdatum), während begleitende Steuerungsinformationen desselben Buchungsvorgangs (z. B. Buchungsbelegart, Buchungsdatum) zu den Konfigurationsdaten zählen. Beides tritt bei derselben Buchung gemeinsam auf, ohne dass sich die Datenart des Sachkontos dadurch ändert.',
      },
      {
        q: 'Welche Aussage zum Zusammenspiel von App-Typ und Datenoperation ist FALSCH?',
        options: [
          'Anzeigen ist in allen drei App-Typen möglich.',
          'Erfassen ist sowohl in Transaktions- als auch in Factsheet-Apps möglich.',
          'Löschen ist in Analytischen Apps genauso möglich wie in Transaktions-Apps.',
          'Ändern ist ausschließlich in Transaktions-Apps möglich.',
        ],
        correct: 2,
        explain: 'Löschen ist ausschließlich in Transaktions-Apps möglich, nicht in Analytischen Apps — diese dienen rein der Auswertung/Übersicht, nicht der Datenpflege.',
      },
      {
        q: 'Ein Unternehmen möchte für zwei rechtlich unterschiedliche Landesgesellschaften jeweils eine eigene Bilanz und GuV führen. Welche Organisationseinheit muss dafür zweimal angelegt werden?',
        options: ['Kreditkontrollbereich', 'Geschäftsbereich', 'Buchungskreis', 'Werk'],
        correct: 2,
        explain: 'Da der Buchungskreis die kleinste Einheit mit vollständiger, abgeschlossener Buchhaltung (eigene Bilanz/GuV) ist, benötigt jede rechtlich eigenständige Landesgesellschaft einen eigenen Buchungskreis.',
      },
    ],
  },
  practice: {
    intro:
      'Wende das Gelernte praktisch an: Fülle einen SAP-Bildschirm so aus wie in der echten Klausuraufgabe, und erkenne bei vier Fehlermeldungen jeweils die passende Prüfungsart.',
    formChallenges: [
      {
        id: 'zahlungsausgang',
        title: 'Zahlungsausgang buchen',
        screenTitle: 'Zahlung',
        scenario:
          'Sie müssen heute einen Zahlungsausgang in Höhe von 2.546,00 EUR buchen. Grundlage ist eine Aufwandsbuchung auf dem ' +
          'Kreditorenkonto 211999 (Power Supply) und dem Aufwandskonto 6000000. Der Zahlungsausgang soll in der ' +
          'Buchhaltungsperiode Mai ausgewiesen und auf dem Bankkonto 1800000 gebucht werden.',
        instructions: 'Füllen Sie den Bildschirm nur mit den relevanten Feldern aus. Nicht benötigte Felder bleiben leer.',
        givenFields: [
          { label: 'Buchungskreis', value: 'DE00' },
          { label: 'Buchungsbelegart', value: 'KZ' },
        ],
        fields: [
          { id: 'buchungsdatum', label: 'Buchungsdatum', kind: 'text', expected: ['31.05.2024', '31.5.2024'], group: 'Allgemeine Informationen' },
          { id: 'valutadatum', label: 'Valutadatum', kind: 'text', expected: null, group: 'Allgemeine Informationen' },
          { id: 'referenz', label: 'Referenz', kind: 'text', expected: null, group: 'Allgemeine Informationen' },
          { id: 'kopftext', label: 'Kopftext', kind: 'text', expected: null, group: 'Allgemeine Informationen' },
          { id: 'sachkonto', label: 'Sachkonto (Bankkonto)', kind: 'text', expected: '1800000', group: 'Bankdaten' },
          { id: 'betrag', label: 'Betrag', kind: 'text', expected: ['2546,00', '2546', '2.546,00'], group: 'Bankdaten' },
          { id: 'gebuehren', label: 'Gebühren', kind: 'text', expected: null, group: 'Bankdaten' },
          {
            id: 'kontoart',
            label: 'Kontoart/Konto-ID',
            kind: 'select',
            options: ['Debitor', 'Kreditor', 'Sachkonto'],
            expected: 'Kreditor',
            group: 'Auswahl offener Posten',
          },
          { id: 'kontoid', label: 'Konto-ID', kind: 'text', expected: '211999', group: 'Auswahl offener Posten' },
        ],
        openItemsLabel: 'Offenen Posten auswählen',
        openItemChoices: [
          { id: 'p1', label: '1900000002 · -2.546,00 EUR', correct: true },
          { id: 'p2', label: '5105600274 · -3.029,74 EUR', correct: false },
          { id: 'p3', label: '5105600284 · -3.029,74 EUR', correct: false },
        ],
        buttons: [
          { id: 'posten', label: 'Posten anzeigen' },
          { id: 'buchen', label: 'Buchen' },
        ],
        explanation:
          'Nur die tatsächlich benötigten Felder wurden ausgefüllt: Buchungsdatum (im Mai, damit die Periode passt), das Bankkonto ' +
          'als Sachkonto, der Betrag sowie Kontoart „Kreditor" mit der Konto-ID 211999. Über „Posten anzeigen" werden die offenen ' +
          'Posten geladen, der zum Betrag passende Posten (-2.546,00 EUR) wird ausgeglichen, danach wird gebucht.',
      },
    ],
    errorCases: [
      {
        id: 'ausschluss-sachkonto',
        title: 'Fehlermeldung 1: Unbekanntes Sachkonto',
        screenTitle: 'Hauptbuchbelege buchen',
        scenario: 'Beim Buchen eines Hauptbuchbelegs kommt es zu folgender Fehlermeldung.',
        belegLines: [
          { konto: '1809989', soll: '0,00', haben: '600,00', highlight: true },
          { konto: '6000000', soll: '600,00', haben: '0,00' },
        ],
        errorMessage: 'Seite 1 Einzelposten 1: Sachkonto 1809989 ist im Kontenplan GL00 nicht vorgesehen.',
        correctPruefungsart: 'ausschluss',
        explanation:
          'Es wird geprüft, ob das Sachkonto im verwendeten Kontenplan überhaupt existiert — nicht sein Format und nicht der ' +
          'Buchungsvorgang an sich. Das ist eine Ausschlussprüfung: Nicht angelegte, ungültige Konten werden konsequent ausgeschlossen.',
      },
      {
        id: 'format-kontonummer',
        title: 'Fehlermeldung 2: Ungültiges Kontoformat',
        screenTitle: 'Hauptbuchbelege buchen',
        scenario: 'Ein Sachbearbeiter versucht, einen Beleg mit folgender Kontonummer zu buchen.',
        belegLines: [
          { konto: '18099890000', soll: '0,00', haben: '600,00', highlight: true },
          { konto: '6000000', soll: '600,00', haben: '0,00' },
        ],
        errorMessage: 'Feld Sachkonto: Eingabe „18099890000" hat 11 Stellen — erwartet werden genau 10 Stellen.',
        correctPruefungsart: 'format',
        explanation:
          'Hier wird ausschließlich das Format der Eingabe geprüft (die vorgeschriebene Stellenzahl), unabhängig davon, ob ein ' +
          'passendes Konto überhaupt existiert. Das ist eine Formatprüfung.',
      },
      {
        id: 'plausibilitaet-datum',
        title: 'Fehlermeldung 3: Unplausibles Buchungsdatum',
        screenTitle: 'Hauptbuchbelege buchen',
        scenario: 'Ein Beleg soll mit folgendem Buchungsdatum erfasst werden.',
        belegLines: [
          { konto: '1000000', soll: '600,00', haben: '0,00', highlight: true },
          { konto: '6000000', soll: '0,00', haben: '600,00' },
        ],
        errorMessage: 'Buchungsdatum 01.01.1899 liegt außerhalb des zulässigen Buchungszeitraums.',
        correctPruefungsart: 'plausibilitaet',
        explanation:
          'Das Datumsformat selbst ist korrekt und das Konto existiert — geprüft wird, ob der Wert inhaltlich sinnvoll (plausibel) ' +
          'ist. Ein Buchungsjahr 1899 ist unplausibel für einen heutigen Geschäftsvorfall. Das ist eine Plausibilitätsprüfung.',
      },
      {
        id: 'vollstaendigkeit-pflichtfeld',
        title: 'Fehlermeldung 4: Fehlendes Pflichtfeld',
        screenTitle: 'Hauptbuchbelege buchen',
        scenario: 'Beim Versuch, einen Beleg zu buchen, wurde ein Pflichtfeld nicht ausgefüllt.',
        belegLines: [
          { konto: '(leer)', soll: '0,00', haben: '600,00', highlight: true },
          { konto: '6000000', soll: '600,00', haben: '0,00' },
        ],
        errorMessage: 'Feld Sachkonto ist ein Pflichtfeld und muss ausgefüllt werden.',
        correctPruefungsart: 'vollstaendigkeit',
        explanation:
          'Es wird nur festgestellt, dass das Pflichtfeld leer geblieben ist — nicht, ob ein eingetragener Wert korrekt formatiert ' +
          'oder plausibel wäre. Das ist eine Vollständigkeitsprüfung.',
      },
    ],
  },
};
