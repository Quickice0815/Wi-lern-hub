import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';

/* ============================================================
   RASTER-TRAINER  v4
   Lernspiel zum Rasterdiagramm (Vorlesung WI Kap. 5)

   ZWEI ÜBUNGSTYPEN:
   1) "cards" — fertige Funktionskarten direkt ins Raster ziehen
   2) "text"  — Prozessbeschreibung lesen, passende Bausteine aus
      einem Pool (inkl. Ablenkern) auswählen, Position UND
      Abteilung selbst aus dem Text erschließen

   3 Schwierigkeitsgrade je Übungstyp. AB "Fortgeschritten" müssen
   zusätzlich die Abteilungs-Köpfe (Spaltenüberschriften) selbst
   per Drag & Drop in die richtige Spalte gezogen werden — bei
   "Anfänger" stehen sie noch fest da.
   ============================================================ */

// ---------- Szenario-Daten: Übungstyp "Karten zuordnen" -------

const CARD_SCENARIOS = {
  anfaenger: [
    {
      id: 'schadenmeldung',
      title: 'Schadensbearbeitung (Versicherung)',
      stellen: ['Poststelle', 'Sachbearbeiter', 'Leiter', 'Buchhalter'],
      functions: [
        { id: 'f1', order: 1, text: 'Schadenmeldung annehmen', stelle: 'Poststelle' },
        { id: 'f2', order: 2, text: 'Meldung prüfen', stelle: 'Sachbearbeiter' },
        { id: 'f3', order: 3, text: 'Zahlbetrag ermitteln', stelle: 'Sachbearbeiter' },
        { id: 'f4', order: 4, text: 'Zahlbetrag genehmigen', stelle: 'Leiter' },
        { id: 'f5', order: 5, text: 'Mitteilung erstellen', stelle: 'Sachbearbeiter' },
        { id: 'f6', order: 6, text: 'Mitteilung versenden', stelle: 'Poststelle' },
        { id: 'f7', order: 7, text: 'Zahlbetrag auszahlen', stelle: 'Buchhalter' },
      ],
      distractors: [],
    },
    {
      id: 'bibliothek',
      title: 'Buchausleihe (Bibliothek)',
      stellen: ['Leser', 'Bibliothekar', 'Lager'],
      functions: [
        { id: 'bi1', order: 1, text: 'Buchwunsch äußern', stelle: 'Leser' },
        { id: 'bi2', order: 2, text: 'Verfügbarkeit prüfen', stelle: 'Bibliothekar' },
        { id: 'bi3', order: 3, text: 'Buch aus Lager holen', stelle: 'Lager' },
        { id: 'bi4', order: 4, text: 'Buch ausleihen', stelle: 'Bibliothekar' },
        { id: 'bi5', order: 5, text: 'Rückgabetermin notieren', stelle: 'Bibliothekar' },
      ],
      distractors: [],
    },
    {
      id: 'werkstatt',
      title: 'Kfz-Reparaturauftrag (Werkstatt)',
      stellen: ['Kunde', 'Werkstattmeister', 'Mechaniker', 'Kasse'],
      functions: [
        { id: 'wk1', order: 1, text: 'Fahrzeug abgeben', stelle: 'Kunde' },
        { id: 'wk2', order: 2, text: 'Schaden begutachten', stelle: 'Werkstattmeister' },
        { id: 'wk3', order: 3, text: 'Reparatur durchführen', stelle: 'Mechaniker' },
        { id: 'wk4', order: 4, text: 'Rechnung erstellen', stelle: 'Kasse' },
        { id: 'wk5', order: 5, text: 'Fahrzeug abholen', stelle: 'Kunde' },
      ],
      distractors: [],
    },
  ],
  fortgeschritten: [
    {
      id: 'bestellabwicklung',
      title: 'Bestellabwicklung',
      stellen: ['Vertrieb', 'Lager', 'Versand', 'Buchhaltung'],
      functions: [
        { id: 'b1', order: 1, text: 'Bestellung entgegennehmen', stelle: 'Vertrieb' },
        { id: 'b2', order: 2, text: 'Verfügbarkeit prüfen', stelle: 'Lager' },
        { id: 'b3', order: 3, text: 'Ware kommissionieren', stelle: 'Lager' },
        { id: 'b4', order: 4, text: 'Lieferschein erstellen', stelle: 'Versand' },
        { id: 'b5', order: 5, text: 'Ware versenden', stelle: 'Versand' },
        { id: 'b6', order: 6, text: 'Rechnung erstellen', stelle: 'Buchhaltung' },
        { id: 'b7', order: 7, text: 'Zahlungseingang prüfen', stelle: 'Buchhaltung' },
      ],
      distractors: [],
    },
    {
      id: 'urlaubsantrag',
      title: 'Urlaubsantrag',
      stellen: ['Mitarbeiter', 'Vorgesetzter', 'Personalabteilung'],
      functions: [
        { id: 'u1', order: 1, text: 'Urlaubsantrag stellen', stelle: 'Mitarbeiter' },
        { id: 'u2', order: 2, text: 'Antrag prüfen', stelle: 'Vorgesetzter' },
        { id: 'u3', order: 3, text: 'Antrag genehmigen', stelle: 'Vorgesetzter' },
        { id: 'u4', order: 4, text: 'Urlaub im System erfassen', stelle: 'Personalabteilung' },
        { id: 'u5', order: 5, text: 'Bestätigung versenden', stelle: 'Personalabteilung' },
      ],
      distractors: [],
    },
    {
      id: 'rechnungseingang',
      title: 'Rechnungseingang',
      stellen: ['Poststelle', 'Einkauf', 'Rechnungsprüfung', 'Buchhaltung'],
      functions: [
        { id: 're1', order: 1, text: 'Rechnung empfangen', stelle: 'Poststelle' },
        { id: 're2', order: 2, text: 'Rechnung an Einkauf weiterleiten', stelle: 'Poststelle' },
        { id: 're3', order: 3, text: 'Bestellung abgleichen', stelle: 'Einkauf' },
        { id: 're4', order: 4, text: 'Rechnung sachlich prüfen', stelle: 'Rechnungsprüfung' },
        { id: 're5', order: 5, text: 'Rechnung rechnerisch prüfen', stelle: 'Rechnungsprüfung' },
        { id: 're6', order: 6, text: 'Zahlung anweisen', stelle: 'Buchhaltung' },
        { id: 're7', order: 7, text: 'Zahlung verbuchen', stelle: 'Buchhaltung' },
      ],
      distractors: [],
    },
    {
      id: 'stellenausschreibung',
      title: 'Personalbeschaffung',
      stellen: ['Personalabteilung', 'Fachabteilung', 'Geschäftsführung', 'Bewerber'],
      functions: [
        { id: 'sa1', order: 1, text: 'Stellenausschreibung erstellen', stelle: 'Personalabteilung' },
        { id: 'sa2', order: 2, text: 'Bewerbungen sichten', stelle: 'Fachabteilung' },
        { id: 'sa3', order: 3, text: 'Vorstellungsgespräch führen', stelle: 'Fachabteilung' },
        { id: 'sa4', order: 4, text: 'Einstellung genehmigen', stelle: 'Geschäftsführung' },
        { id: 'sa5', order: 5, text: 'Arbeitsvertrag erstellen', stelle: 'Personalabteilung' },
        { id: 'sa6', order: 6, text: 'Vertrag unterschreiben', stelle: 'Bewerber' },
      ],
      distractors: [],
    },
  ],
  profi: [
    {
      id: 'reklamation',
      title: 'Reklamationsbearbeitung',
      stellen: ['Kundenservice', 'Qualitätsabteilung', 'Lager', 'Buchhaltung'],
      functions: [
        { id: 'r1', order: 1, text: 'Reklamation entgegennehmen', stelle: 'Kundenservice' },
        { id: 'r2', order: 2, text: 'Reklamation prüfen', stelle: 'Qualitätsabteilung' },
        { id: 'r3', order: 3, text: 'Ersatzlieferung veranlassen', stelle: 'Lager' },
        { id: 'r4', order: 4, text: 'Gutschrift erstellen', stelle: 'Buchhaltung' },
        { id: 'r5', order: 5, text: 'Kunde informieren', stelle: 'Kundenservice' },
      ],
      distractors: [
        { id: 'rd1', text: 'Marketingkampagne planen' },
        { id: 'rd2', text: 'Jahresabschluss erstellen' },
      ],
    },
    {
      id: 'zahlungsfreigabe',
      title: 'Zahlungsfreigabe',
      stellen: ['Einkauf', 'Wareneingang', 'Buchhaltung', 'Geschäftsführung'],
      functions: [
        { id: 'p1', order: 1, text: 'Bestellung auslösen', stelle: 'Einkauf' },
        { id: 'p2', order: 2, text: 'Wareneingang kontrollieren', stelle: 'Wareneingang' },
        { id: 'p3', order: 3, text: 'Rechnung mit Bestellung abgleichen', stelle: 'Buchhaltung' },
        { id: 'p4', order: 4, text: 'Zahlung freigeben', stelle: 'Geschäftsführung' },
        { id: 'p5', order: 5, text: 'Zahlung ausführen', stelle: 'Buchhaltung' },
      ],
      distractors: [{ id: 'pd1', text: 'Mitarbeitergespräch führen' }],
    },
    {
      id: 'fertigungsauftrag',
      title: 'Fertigungsauftrag',
      stellen: ['Vertrieb', 'Arbeitsvorbereitung', 'Fertigung', 'Qualitätssicherung', 'Versand'],
      functions: [
        { id: 'fa1', order: 1, text: 'Kundenauftrag erfassen', stelle: 'Vertrieb' },
        { id: 'fa2', order: 2, text: 'Fertigungsauftrag anlegen', stelle: 'Arbeitsvorbereitung' },
        { id: 'fa3', order: 3, text: 'Material bereitstellen', stelle: 'Arbeitsvorbereitung' },
        { id: 'fa4', order: 4, text: 'Bauteil fertigen', stelle: 'Fertigung' },
        { id: 'fa5', order: 5, text: 'Qualität prüfen', stelle: 'Qualitätssicherung' },
        { id: 'fa6', order: 6, text: 'Versandbereit melden', stelle: 'Fertigung' },
        { id: 'fa7', order: 7, text: 'Ware versenden', stelle: 'Versand' },
      ],
      distractors: [
        { id: 'fad1', text: 'Marktanalyse durchführen' },
        { id: 'fad2', text: 'Mitarbeiterschulung planen' },
      ],
    },
    {
      id: 'produktrueckruf',
      title: 'Produktrückruf (Qualitätsmanagement)',
      stellen: ['Qualitätsmanagement', 'Produktion', 'Rechtsabteilung', 'Kundenservice', 'Logistik'],
      functions: [
        { id: 'pr1', order: 1, text: 'Mangel feststellen', stelle: 'Qualitätsmanagement' },
        { id: 'pr2', order: 2, text: 'Ursache analysieren', stelle: 'Produktion' },
        { id: 'pr3', order: 3, text: 'Rückruf rechtlich prüfen', stelle: 'Rechtsabteilung' },
        { id: 'pr4', order: 4, text: 'Kunden informieren', stelle: 'Kundenservice' },
        { id: 'pr5', order: 5, text: 'Rückholung organisieren', stelle: 'Logistik' },
        { id: 'pr6', order: 6, text: 'Abschlussbericht erstellen', stelle: 'Qualitätsmanagement' },
      ],
      distractors: [
        { id: 'prd1', text: 'Werbekampagne stoppen' },
        { id: 'prd2', text: 'Aktionärsversammlung einberufen' },
        { id: 'prd3', text: 'Mitarbeiterumfrage starten' },
      ],
    },
  ],
};

// ---------- Szenario-Daten: Übungstyp "Aus Text erschließen" --

const TEXT_SCENARIOS = {
  anfaenger: [
    {
      id: 'schadenmeldung-text',
      title: 'Schadensbearbeitung (Versicherung)',
      text:
        'Ein Versicherungsnehmer schickt eine Schadensmeldung an seine Versicherung. ' +
        'Die Poststelle nimmt die Meldung entgegen. Der zuständige Sachbearbeiter prüft ' +
        'die Meldung und ermittelt anschließend den Zahlbetrag. Bevor etwas ausgezahlt ' +
        'werden darf, muss der Leiter den ermittelten Betrag genehmigen. Danach erstellt ' +
        'der Sachbearbeiter eine Mitteilung für den Kunden, die von der Poststelle ' +
        'versendet wird. Zum Schluss zahlt der Buchhalter den genehmigten Betrag aus.',
      stellen: ['Poststelle', 'Sachbearbeiter', 'Leiter', 'Buchhalter'],
      functions: [
        { id: 'tf1', order: 1, text: 'Schadenmeldung annehmen', stelle: 'Poststelle' },
        { id: 'tf2', order: 2, text: 'Meldung prüfen', stelle: 'Sachbearbeiter' },
        { id: 'tf3', order: 3, text: 'Zahlbetrag ermitteln', stelle: 'Sachbearbeiter' },
        { id: 'tf4', order: 4, text: 'Zahlbetrag genehmigen', stelle: 'Leiter' },
        { id: 'tf5', order: 5, text: 'Mitteilung erstellen', stelle: 'Sachbearbeiter' },
        { id: 'tf6', order: 6, text: 'Mitteilung versenden', stelle: 'Poststelle' },
        { id: 'tf7', order: 7, text: 'Zahlbetrag auszahlen', stelle: 'Buchhalter' },
      ],
      distractors: [],
    },
    {
      id: 'bibliothek-text',
      title: 'Buchausleihe (Bibliothek)',
      text:
        'Ein Leser möchte ein bestimmtes Buch ausleihen und äußert seinen Wunsch an der ' +
        'Theke. Der Bibliothekar prüft zunächst, ob das Buch verfügbar ist. Ist es ' +
        'vorrätig, holt das Lager das Buch aus dem Bestand. Anschließend leiht der ' +
        'Bibliothekar das Buch an den Leser aus und notiert sich den Rückgabetermin.',
      stellen: ['Leser', 'Bibliothekar', 'Lager'],
      functions: [
        { id: 'bt1', order: 1, text: 'Buchwunsch äußern', stelle: 'Leser' },
        { id: 'bt2', order: 2, text: 'Verfügbarkeit prüfen', stelle: 'Bibliothekar' },
        { id: 'bt3', order: 3, text: 'Buch aus Lager holen', stelle: 'Lager' },
        { id: 'bt4', order: 4, text: 'Buch ausleihen', stelle: 'Bibliothekar' },
        { id: 'bt5', order: 5, text: 'Rückgabetermin notieren', stelle: 'Bibliothekar' },
      ],
      distractors: [],
    },
  ],
  fortgeschritten: [
    {
      id: 'wareneinkauf-text',
      title: 'Bestellabwicklung im Großhandel',
      text:
        'Die Vertriebsabteilung eines Unternehmens erhält eine Bestellung von einem Kunden ' +
        'und nimmt diese entgegen. Bevor die Bestellung bearbeitet werden kann, kontrolliert ' +
        'das Lager, ob die gewünschten Artikel noch vorrätig sind. Ist das der Fall, stellt ' +
        'das Lager die Ware für den Versand bereit. Die Versandabteilung erstellt daraufhin ' +
        'einen Lieferschein und schickt das Paket auf den Weg zum Kunden. Nachdem die Ware ' +
        'versendet wurde, stellt die Buchhaltung dem Kunden eine Rechnung aus und überwacht ' +
        'später den Zahlungseingang.',
      stellen: ['Vertrieb', 'Lager', 'Versand', 'Buchhaltung'],
      functions: [
        { id: 'wf1', order: 1, text: 'Bestellung entgegennehmen', stelle: 'Vertrieb' },
        { id: 'wf2', order: 2, text: 'Verfügbarkeit der Artikel prüfen', stelle: 'Lager' },
        { id: 'wf3', order: 3, text: 'Ware für Versand bereitstellen', stelle: 'Lager' },
        { id: 'wf4', order: 4, text: 'Lieferschein erstellen', stelle: 'Versand' },
        { id: 'wf5', order: 5, text: 'Paket versenden', stelle: 'Versand' },
        { id: 'wf6', order: 6, text: 'Rechnung ausstellen', stelle: 'Buchhaltung' },
        { id: 'wf7', order: 7, text: 'Zahlungseingang überwachen', stelle: 'Buchhaltung' },
      ],
      distractors: [
        { id: 'wd1', text: 'Retoure bearbeiten' },
        { id: 'wd2', text: 'Lagerbestand inventarisieren' },
      ],
    },
    {
      id: 'dienstreise-text',
      title: 'Dienstreiseantrag',
      text:
        'Ein Mitarbeiter stellt online einen Antrag auf eine Dienstreise. Der direkte ' +
        'Vorgesetzte prüft den Antrag und gibt ihn frei, sofern das Budget ausreicht. ' +
        'Anschließend bucht die Reisestelle die notwendigen Flüge und Hotels. Nach der ' +
        'Rückkehr reicht der Mitarbeiter seine Reisekostenabrechnung bei der Buchhaltung ' +
        'ein, welche die Belege prüft und die Erstattung auszahlt.',
      stellen: ['Mitarbeiter', 'Vorgesetzter', 'Reisestelle', 'Buchhaltung'],
      functions: [
        { id: 'df1', order: 1, text: 'Dienstreiseantrag stellen', stelle: 'Mitarbeiter' },
        { id: 'df2', order: 2, text: 'Antrag prüfen und freigeben', stelle: 'Vorgesetzter' },
        { id: 'df3', order: 3, text: 'Flüge und Hotels buchen', stelle: 'Reisestelle' },
        { id: 'df4', order: 4, text: 'Reisekostenabrechnung einreichen', stelle: 'Mitarbeiter' },
        { id: 'df5', order: 5, text: 'Belege prüfen', stelle: 'Buchhaltung' },
        { id: 'df6', order: 6, text: 'Erstattung auszahlen', stelle: 'Buchhaltung' },
      ],
      distractors: [
        { id: 'dd1', text: 'Dienstwagen reservieren' },
        { id: 'dd2', text: 'Auslandskrankenversicherung abschließen' },
      ],
    },
    {
      id: 'stellenausschreibung-text',
      title: 'Personalbeschaffung',
      text:
        'Die Personalabteilung erstellt eine Stellenausschreibung für eine offene Position ' +
        'und veröffentlicht sie. Die Fachabteilung sichtet die eingehenden Bewerbungen und ' +
        'lädt passende Kandidaten zu einem Vorstellungsgespräch ein, das sie selbst führt. ' +
        'Bevor jemand eingestellt werden darf, muss die Geschäftsführung die Einstellung ' +
        'genehmigen. Danach erstellt die Personalabteilung den Arbeitsvertrag, den der ' +
        'Bewerber abschließend unterschreibt.',
      stellen: ['Personalabteilung', 'Fachabteilung', 'Geschäftsführung', 'Bewerber'],
      functions: [
        { id: 'sat1', order: 1, text: 'Stellenausschreibung erstellen', stelle: 'Personalabteilung' },
        { id: 'sat2', order: 2, text: 'Bewerbungen sichten', stelle: 'Fachabteilung' },
        { id: 'sat3', order: 3, text: 'Vorstellungsgespräch führen', stelle: 'Fachabteilung' },
        { id: 'sat4', order: 4, text: 'Einstellung genehmigen', stelle: 'Geschäftsführung' },
        { id: 'sat5', order: 5, text: 'Arbeitsvertrag erstellen', stelle: 'Personalabteilung' },
        { id: 'sat6', order: 6, text: 'Vertrag unterschreiben', stelle: 'Bewerber' },
      ],
      distractors: [
        { id: 'satd1', text: 'Zeugnis ausstellen' },
        { id: 'satd2', text: 'Probezeitgespräch führen' },
      ],
    },
  ],
  profi: [
    {
      id: 'kreditvergabe-text',
      title: 'Kreditvergabe bei einer Bank',
      text:
        'Bei der Kreditvergabe lief Folgendes ab: Nachdem die Filiale den Kreditantrag ' +
        'eines Kunden entgegengenommen hatte, wurde dieser zur Bonitätsprüfung an die ' +
        'Risikoabteilung weitergeleitet. Dort wurde die Kreditwürdigkeit des Kunden anhand ' +
        'verschiedener Kennzahlen bewertet. Erst danach traf der Kreditausschuss die ' +
        'endgültige Entscheidung über die Vergabe. War der Kredit bewilligt, kümmerte sich ' +
        'die Vertragsabteilung um die Erstellung der Kreditverträge. Zuvor jedoch hatte die ' +
        'Filiale dem Kunden die grundsätzlichen Konditionen erläutert — noch bevor überhaupt ' +
        'ein Antrag gestellt wurde. Abschließend zahlte die Kasse den bewilligten ' +
        'Kreditbetrag an den Kunden aus.',
      stellen: ['Filiale', 'Risikoabteilung', 'Kreditausschuss', 'Vertragsabteilung', 'Kasse'],
      functions: [
        { id: 'kf1', order: 1, text: 'Konditionen erläutern', stelle: 'Filiale' },
        { id: 'kf2', order: 2, text: 'Kreditantrag entgegennehmen', stelle: 'Filiale' },
        { id: 'kf3', order: 3, text: 'Bonität prüfen', stelle: 'Risikoabteilung' },
        { id: 'kf4', order: 4, text: 'Vergabeentscheidung treffen', stelle: 'Kreditausschuss' },
        { id: 'kf5', order: 5, text: 'Kreditvertrag erstellen', stelle: 'Vertragsabteilung' },
        { id: 'kf6', order: 6, text: 'Kreditbetrag auszahlen', stelle: 'Kasse' },
      ],
      distractors: [
        { id: 'kd1', text: 'Kunden-Newsletter versenden' },
        { id: 'kd2', text: 'Filialleiter informieren' },
        { id: 'kd3', text: 'Kreditkarte sperren' },
      ],
    },
    {
      id: 'reklamation-text',
      title: 'Reklamationsbearbeitung im Onlinehandel',
      text:
        'Ein Kunde meldet sich beim Kundenbetreuer, weil ein gelieferter Artikel defekt ' +
        'ist. Bereits zu Beginn hatte der Kundenbetreuer die Reklamation im System ' +
        'dokumentiert, noch bevor er sie weiterleitete. Anschließend leitet der ' +
        'Kundenbetreuer die Reklamation an die Qualitätsabteilung weiter, die den Defekt ' +
        'begutachtet. Bestätigt sich der Mangel, veranlasst das Lager den Versand eines ' +
        'Ersatzartikels. Danach erstellt die Buchhaltung eine Gutschrift über einen ' +
        'Teilbetrag als Entschädigung. Zum Abschluss informiert der Kundenbetreuer den ' +
        'Kunden über das weitere Vorgehen.',
      stellen: ['Kundenservice', 'Qualitätsabteilung', 'Lager', 'Buchhaltung'],
      functions: [
        { id: 'ktf1', order: 1, text: 'Reklamation dokumentieren', stelle: 'Kundenservice' },
        { id: 'ktf2', order: 2, text: 'Reklamation weiterleiten', stelle: 'Kundenservice' },
        { id: 'ktf3', order: 3, text: 'Defekt begutachten', stelle: 'Qualitätsabteilung' },
        { id: 'ktf4', order: 4, text: 'Ersatzartikel versenden', stelle: 'Lager' },
        { id: 'ktf5', order: 5, text: 'Gutschrift erstellen', stelle: 'Buchhaltung' },
        { id: 'ktf6', order: 6, text: 'Kunde informieren', stelle: 'Kundenservice' },
      ],
      distractors: [
        { id: 'ktd1', text: 'Lieferantenbewertung aktualisieren' },
        { id: 'ktd2', text: 'Marketingaktion starten' },
        { id: 'ktd3', text: 'Inventur durchführen' },
      ],
    },
    {
      id: 'produktrueckruf-text',
      title: 'Produktrückruf',
      text:
        'Im Qualitätsmanagement war aufgefallen, dass ein Bauteil fehlerhaft sein könnte — ' +
        'ausgelöst durch mehrere Kundenbeschwerden, die zuvor beim Kundenservice eingegangen ' +
        'waren. Die Produktion untersuchte daraufhin die Ursache des Mangels. Da sich der ' +
        'Verdacht bestätigte, prüfte die Rechtsabteilung, ob ein Rückruf notwendig ist. Der ' +
        'Kundenservice informierte anschließend die betroffenen Kunden, während die Logistik ' +
        'die Rückholung der Geräte organisierte. Zum Abschluss verfasste das ' +
        'Qualitätsmanagement einen Bericht über den gesamten Vorfall.',
      stellen: ['Qualitätsmanagement', 'Produktion', 'Rechtsabteilung', 'Kundenservice', 'Logistik'],
      functions: [
        { id: 'prt1', order: 1, text: 'Mangel feststellen', stelle: 'Qualitätsmanagement' },
        { id: 'prt2', order: 2, text: 'Ursache analysieren', stelle: 'Produktion' },
        { id: 'prt3', order: 3, text: 'Rückruf rechtlich prüfen', stelle: 'Rechtsabteilung' },
        { id: 'prt4', order: 4, text: 'Kunden informieren', stelle: 'Kundenservice' },
        { id: 'prt5', order: 5, text: 'Rückholung organisieren', stelle: 'Logistik' },
        { id: 'prt6', order: 6, text: 'Abschlussbericht erstellen', stelle: 'Qualitätsmanagement' },
      ],
      distractors: [
        { id: 'prtd1', text: 'Werbekampagne stoppen' },
        { id: 'prtd2', text: 'Aktionärsversammlung einberufen' },
        { id: 'prtd3', text: 'Mitarbeiterumfrage starten' },
      ],
    },
  ],
};

const TYPE_INFO: Record<string, { label: string; desc: string }> = {
  cards: {
    label: '📋 Karten direkt zuordnen',
    desc: 'Fertige Funktionskarten ins Raster ziehen.',
  },
  text: {
    label: '📝 Aus Text erschließen',
    desc: 'Prozessbeschreibung lesen, passende Bausteine auswählen und einsortieren — inkl. Abteilung.',
  },
};

const MODE_LABELS: Record<string, Record<string, { label: string; desc: string }>> = {
  cards: {
    anfaenger: { label: 'Anfänger', desc: '3 Szenarien · Nummer + Hinweis & Tutorial · Abteilungen vorgegeben' },
    fortgeschritten: { label: 'Fortgeschritten', desc: '4 Szenarien · nur Nummer · Abteilungen selbst einsortieren' },
    profi: { label: 'Profi', desc: '4 Szenarien · keine Nummer + Ablenker · Abteilungen selbst einsortieren' },
  },
  text: {
    anfaenger: { label: 'Anfänger', desc: '2 Texte · Reihenfolge nummeriert · Abteilungen vorgegeben' },
    fortgeschritten: { label: 'Fortgeschritten', desc: '3 Texte · Reihenfolge & Abteilungen selbst erschließen' },
    profi: { label: 'Profi', desc: '3 Texte · nicht-lineare Erzählung, Rollen statt Abteilungsnamen, mehr Ablenker' },
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// displayMode: 'numbered+hint' | 'numbered' | 'plain'
function cardLabel(card: any, displayMode: string) {
  if (card.isDistractor) return { main: card.text, hint: null };
  if (displayMode === 'numbered+hint') return { main: `${card.order}. ${card.text}`, hint: card.stelle };
  if (displayMode === 'numbered') return { main: `${card.order}. ${card.text}`, hint: null };
  return { main: card.text, hint: null };
}

// ---------- Tutorial Overlay ---------------------------------

function Tutorial({ steps, onDone }: { steps: { title: string; body: string }[]; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const s = steps[step];
  return (
    <div style={styles.overlayBg}>
      <div style={styles.tutorialCard}>
        <div style={styles.tutorialStepDots}>
          {steps.map((_, i) => (
            <span key={i} style={{ ...styles.dot, background: i === step ? 'var(--entity)' : 'var(--line)' }} />
          ))}
        </div>
        <h2 style={styles.tutorialTitle}>{s.title}</h2>
        <p style={styles.tutorialBody}>{s.body}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {step > 0 && (
            <button style={styles.btnGhost} onClick={() => setStep((x) => x - 1)}>
              Zurück
            </button>
          )}
          {step < steps.length - 1 ? (
            <button style={styles.btnPrimary} onClick={() => setStep((x) => x + 1)}>
              Weiter
            </button>
          ) : (
            <button style={styles.btnPrimary} onClick={onDone}>
              Los geht's
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const CARD_TUTORIAL_STEPS = [
  {
    title: 'Was ist ein Rasterdiagramm?',
    body: 'Ein Rasterdiagramm ist eine Tabelle: Die Spalten sind die Stellen (Organisationseinheiten), die Zeilen sind die Funktionen (Arbeitsschritte) in ihrer Reihenfolge. Jede Funktion steht in genau einer Zelle — bei der Spalte ihrer zuständigen Stelle.',
  },
  {
    title: 'Beispiel',
    body: 'Schritt 1 „Schadenmeldung annehmen“ steht in Zeile 1, Spalte „Poststelle“. Schritt 2 „Meldung prüfen“ steht in Zeile 2, Spalte „Sachbearbeiter“ — usw. Verbindungspfeile zeigen den Ablauf zwischen den Zellen.',
  },
  {
    title: 'So spielst du',
    body: 'Ziehe jede Karte in die richtige Zelle des Rasters (richtige Zeile + richtige Spalte). Klicke danach auf „Prüfen“. Richtige Zellen werden grün, falsche rot. Ist alles richtig, erscheinen die Pfeile wie im Original! Ab „Fortgeschritten“ ziehst du zusätzlich die Abteilungsnamen selbst in die Kopfzeile.',
  },
];

const TEXT_TUTORIAL_STEPS = [
  {
    title: 'Aus Text erschließen',
    body: 'Hier bekommst du keine fertige Liste, sondern einen Fließtext, der einen Geschäftsprozess beschreibt — so wie es in der Klausur vorkommen kann.',
  },
  {
    title: 'Bausteine auswählen',
    body: 'Unter dem Text liegt ein Pool aus Bausteinen. Manche beschreiben echte Schritte aus dem Text, manche sind Ablenker, die gar nicht vorkommen. Du musst selbst entscheiden, welche dazugehören.',
  },
  {
    title: 'Position UND Abteilung erschließen',
    body: 'Lies genau, wer was macht und in welcher Reihenfolge — und ziehe jeden echten Baustein in die richtige Zelle (Zeile = Reihenfolge, Spalte = zuständige Abteilung). Ablenker kommen in die Box „Gehört nicht zum Text“. Ab „Fortgeschritten“ ziehst du auch die Abteilungsnamen selbst in die Kopfzeile.',
  },
];

// ---------- Hauptkomponente -----------------------------------

export function RasterTrainer() {
  const [exerciseType, setExerciseType] = useState<string | null>(null); // 'cards' | 'text'
  const [mode, setMode] = useState<string | null>(null);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  const [pool, setPool] = useState<any[]>([]);
  const [cellMap, setCellMap] = useState<Record<string, any>>({});
  const [distractorPlaced, setDistractorPlaced] = useState<any[]>([]);
  const [headerPool, setHeaderPool] = useState<any[]>([]);
  const [headerMap, setHeaderMap] = useState<Record<string, any>>({}); // colIdx -> chip

  const [checked, setChecked] = useState(false);
  const [cellStatus, setCellStatus] = useState<Record<string, string>>({});
  const [distractorStatus, setDistractorStatus] = useState<Record<string, string>>({});
  const [headerStatus, setHeaderStatus] = useState<Record<string, string>>({});

  const [totalScore, setTotalScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [arrowPaths, setArrowPaths] = useState<string[]>([]);

  const scenarios: any[] = mode && exerciseType ? (exerciseType === 'cards' ? CARD_SCENARIOS : TEXT_SCENARIOS)[mode as keyof typeof CARD_SCENARIOS] : [];
  const scenario = scenarios[scenarioIdx];

  const needsHeaderDrag = mode === 'fortgeschritten' || mode === 'profi';

  const displayMode =
    exerciseType === 'cards'
      ? mode === 'anfaenger'
        ? 'numbered+hint'
        : mode === 'fortgeschritten'
          ? 'numbered'
          : 'plain'
      : mode === 'anfaenger'
        ? 'numbered'
        : 'plain';

  const showDistractorZone = scenario ? scenario.distractors.length > 0 : false;

  // drag state
  const [dragCard, setDragCard] = useState<any>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const distractorRef = useRef<HTMLDivElement | null>(null);
  const headerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const gridWrapRef = useRef<HTMLDivElement | null>(null);

  const loadScenario = useCallback((type: string, m: string, idx: number) => {
    const sc = (type === 'cards' ? CARD_SCENARIOS : TEXT_SCENARIOS)[m as keyof typeof CARD_SCENARIOS][idx];
    const allCards = [
      ...sc.functions.map((f) => ({ ...f, isDistractor: false })),
      ...sc.distractors.map((d) => ({ ...d, isDistractor: true })),
    ];
    setPool(shuffle(allCards));
    setCellMap({});
    setDistractorPlaced([]);
    setChecked(false);
    setCellStatus({});
    setDistractorStatus({});
    setHeaderStatus({});
    setShowArrows(false);
    setArrowPaths([]);
    cellRefs.current = {};
    headerRefs.current = {};

    const needsHeaders = m === 'fortgeschritten' || m === 'profi';
    if (needsHeaders) {
      setHeaderPool(shuffle(sc.stellen.map((name) => ({ id: `stelle-${name}`, name, isStelle: true }))));
      setHeaderMap({});
    } else {
      setHeaderPool([]);
      const fixed: Record<string, any> = {};
      sc.stellen.forEach((name, i) => (fixed[i] = { id: `fixed-${name}`, name, isStelle: true }));
      setHeaderMap(fixed);
    }
  }, []);

  function startMode(type: string, m: string) {
    setExerciseType(type);
    setMode(m);
    setScenarioIdx(0);
    setTotalScore({ correct: 0, total: 0 });
    setFinished(false);
    loadScenario(type, m, 0);
    if (m === 'anfaenger') setShowTutorial(true);
  }

  function backToTypeMenu() {
    setExerciseType(null);
    setMode(null);
    setDragCard(null);
  }

  function backToModeMenu() {
    setMode(null);
    setDragCard(null);
  }

  // ---- Drag handlers ----
  function onPointerDownCard(e: React.PointerEvent, card: any) {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    setDragCard(card);
  }

  useEffect(() => {
    if (!dragCard) return;

    function onMove(e: PointerEvent) {
      setDragPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }

    function onUp(e: PointerEvent) {
      const x = e.clientX;
      const y = e.clientY;

      if (dragCard.isStelle) {
        let targetCol: string | null = null;
        for (const [colIdx, ref] of Object.entries(headerRefs.current)) {
          if (!ref) continue;
          const r = ref.getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
            targetCol = colIdx;
            break;
          }
        }
        if (targetCol !== null) {
          let bumped: any = null;
          setHeaderMap((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((k) => {
              if (next[k]?.id === dragCard.id) delete next[k];
            });
            if (next[targetCol!] && next[targetCol!].id !== dragCard.id) bumped = next[targetCol!];
            next[targetCol!] = dragCard;
            return next;
          });
          setHeaderPool((p) => {
            let next = p.filter((c) => c.id !== dragCard.id);
            if (bumped) next = [...next, bumped];
            return next;
          });
          setChecked(false);
          setShowArrows(false);
        }
        setDragCard(null);
        return;
      }

      // function / distractor cards
      let target: { type: string; key?: string } | null = null;
      for (const [key, ref] of Object.entries(cellRefs.current)) {
        if (!ref) continue;
        const r = ref.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          target = { type: 'cell', key };
          break;
        }
      }
      if (!target && showDistractorZone && distractorRef.current) {
        const r = distractorRef.current.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) target = { type: 'distractor' };
      }

      if (target) {
        let bumpedBack: any = null;
        setCellMap((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((k) => {
            if (next[k]?.id === dragCard.id) delete next[k];
          });
          if (target!.type === 'cell') {
            if (next[target!.key!] && next[target!.key!].id !== dragCard.id) bumpedBack = next[target!.key!];
            next[target!.key!] = dragCard;
          }
          return next;
        });
        setDistractorPlaced((prev) => {
          let next = prev.filter((c) => c.id !== dragCard.id);
          if (target!.type === 'distractor') next = [...next, dragCard];
          return next;
        });
        setPool((p) => {
          let next = p.filter((c) => c.id !== dragCard.id);
          if (bumpedBack) next = [...next, bumpedBack];
          return next;
        });
        setChecked(false);
        setShowArrows(false);
      }
      setDragCard(null);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragCard, showDistractorZone]);

  // ---- Check answers ----
  function checkAnswers() {
    const cStatus: Record<string, string> = {};
    const dStatus: Record<string, string> = {};
    const hStatus: Record<string, string> = {};
    let correctCount = 0;
    let total = scenario.functions.length + scenario.distractors.length;

    scenario.functions.forEach((f: any) => {
      const key = `${f.order - 1}_${scenario.stellen.indexOf(f.stelle)}`;
      const placedCard = cellMap[key];
      const ok = placedCard && placedCard.id === f.id;
      cStatus[key] = ok ? 'correct' : cellMap[key] ? 'wrong' : 'empty';
      if (ok) correctCount++;
    });
    Object.entries(cellMap).forEach(([key, card]: [string, any]) => {
      if (card.isDistractor) {
        cStatus[key] = 'wrong';
        return;
      }
      const targetKey = `${card.order - 1}_${scenario.stellen.indexOf(card.stelle)}`;
      if (targetKey !== key) cStatus[key] = 'wrong';
    });

    distractorPlaced.forEach((card) => {
      const ok = !!card.isDistractor;
      dStatus[card.id] = ok ? 'correct' : 'wrong';
      if (ok) correctCount++;
    });

    if (needsHeaderDrag) {
      scenario.stellen.forEach((name: string, idx: number) => {
        const chip = headerMap[idx];
        const ok = chip && chip.name === name;
        hStatus[idx] = ok ? 'correct' : chip ? 'wrong' : 'empty';
        if (ok) correctCount++;
      });
      total += scenario.stellen.length;
    }

    setCellStatus(cStatus);
    setDistractorStatus(dStatus);
    setHeaderStatus(hStatus);
    setChecked(true);

    const allCorrect = correctCount === total && pool.length === 0 && (!needsHeaderDrag || headerPool.length === 0);
    if (allCorrect) setTimeout(() => setShowArrows(true), 200);
  }

  function retryWrong() {
    const backToPool: any[] = [];
    const backToHeaderPool: any[] = [];

    setCellMap((prev) => {
      const next: Record<string, any> = {};
      Object.entries(prev).forEach(([key, card]) => {
        if (cellStatus[key] === 'correct') next[key] = card;
        else backToPool.push(card);
      });
      return next;
    });
    setDistractorPlaced((prev) => {
      const keep: any[] = [];
      prev.forEach((card) => {
        if (distractorStatus[card.id] === 'correct') keep.push(card);
        else backToPool.push(card);
      });
      return keep;
    });
    if (needsHeaderDrag) {
      setHeaderMap((prev) => {
        const next: Record<string, any> = {};
        Object.entries(prev).forEach(([idx, chip]) => {
          if (headerStatus[idx] === 'correct') next[idx] = chip;
          else backToHeaderPool.push(chip);
        });
        return next;
      });
    }

    setPool((p) => [...p, ...backToPool]);
    setHeaderPool((p) => [...p, ...backToHeaderPool]);
    setChecked(false);
    setCellStatus({});
    setDistractorStatus({});
    setHeaderStatus({});
  }

  function nextScenario() {
    const total = scenario.functions.length + scenario.distractors.length + (needsHeaderDrag ? scenario.stellen.length : 0);
    const correctCount =
      Object.values(cellStatus).filter((s) => s === 'correct').length +
      Object.values(distractorStatus).filter((s) => s === 'correct').length +
      Object.values(headerStatus).filter((s) => s === 'correct').length;
    setTotalScore((s) => ({ correct: s.correct + correctCount, total: s.total + total }));

    if (scenarioIdx + 1 < scenarios.length) {
      const nextIdx = scenarioIdx + 1;
      setScenarioIdx(nextIdx);
      loadScenario(exerciseType!, mode!, nextIdx);
    } else {
      setFinished(true);
    }
  }

  const totalCorrectNow =
    Object.values(cellStatus).filter((s) => s === 'correct').length +
    Object.values(distractorStatus).filter((s) => s === 'correct').length +
    Object.values(headerStatus).filter((s) => s === 'correct').length;
  const totalCount = scenario
    ? scenario.functions.length + scenario.distractors.length + (needsHeaderDrag ? scenario.stellen.length : 0)
    : 0;
  const allPoolsEmpty = pool.length === 0 && (!needsHeaderDrag || headerPool.length === 0);
  const allPlacedCorrectly = checked && allPoolsEmpty && totalCorrectNow === totalCount;

  // ---- Arrow drawing once solved ----
  useLayoutEffect(() => {
    if (!showArrows || !scenario) return;
    const wrap = gridWrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const paths: string[] = [];
    for (let i = 0; i < scenario.functions.length - 1; i++) {
      const a = scenario.functions[i];
      const b = scenario.functions[i + 1];
      const keyA = `${a.order - 1}_${scenario.stellen.indexOf(a.stelle)}`;
      const keyB = `${b.order - 1}_${scenario.stellen.indexOf(b.stelle)}`;
      const refA = cellRefs.current[keyA];
      const refB = cellRefs.current[keyB];
      if (!refA || !refB) continue;
      const rA = refA.getBoundingClientRect();
      const rB = refB.getBoundingClientRect();
      const x1 = rA.left + rA.width / 2 - wrapRect.left;
      const y1 = rA.bottom - wrapRect.top;
      const x2 = rB.left + rB.width / 2 - wrapRect.left;
      const y2 = rB.top - wrapRect.top;
      const ym = y1 + (y2 - y1) / 2;
      paths.push(`M ${x1} ${y1} L ${x1} ${ym} L ${x2} ${ym} L ${x2} ${y2 - 6}`);
    }
    setArrowPaths(paths);
  }, [showArrows, scenario]);

  // =========================== RENDER ===========================

  if (!exerciseType) {
    return (
      <div style={styles.page}>
        <h1 style={styles.h1}>🗂️ Raster-Trainer</h1>
        <p style={styles.subtitle}>Wähle deinen Übungstyp.</p>
        <div style={styles.modeGrid}>
          {Object.entries(TYPE_INFO).map(([key, info]) => (
            <button key={key} style={styles.modeCard} onClick={() => setExerciseType(key)}>
              <div style={styles.modeLabel}>{info.label}</div>
              <div style={styles.modeDesc}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!mode) {
    return (
      <div style={styles.page}>
        <div style={styles.topBar}>
          <button style={styles.btnGhost} onClick={backToTypeMenu}>
            ← Übungstyp wählen
          </button>
        </div>
        <h1 style={styles.h1}>{TYPE_INFO[exerciseType].label}</h1>
        <p style={styles.subtitle}>Wähle deinen Schwierigkeitsgrad.</p>
        <div style={styles.modeGrid}>
          {Object.entries(MODE_LABELS[exerciseType]).map(([key, info]) => (
            <button key={key} style={styles.modeCard} onClick={() => startMode(exerciseType, key)}>
              <div style={styles.modeLabel}>{info.label}</div>
              <div style={styles.modeDesc}>{info.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={styles.page}>
        <h1 style={styles.h1}>🎉 Geschafft!</h1>
        <p style={styles.subtitle}>
          {TYPE_INFO[exerciseType].label} · Modus „{MODE_LABELS[exerciseType][mode].label}“ abgeschlossen.
        </p>
        <div style={styles.scoreBox}>
          {totalScore.correct} / {totalScore.total} richtig zugeordnet
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={styles.btnPrimary} onClick={() => startMode(exerciseType, mode)}>
            Nochmal spielen
          </button>
          <button style={styles.btnGhost} onClick={backToModeMenu}>
            Anderen Schwierigkeitsgrad wählen
          </button>
        </div>
      </div>
    );
  }

  const rowCount = scenario.functions.length;
  const colCount = scenario.stellen.length;

  return (
    <div style={styles.page}>
      {showTutorial && (
        <Tutorial
          steps={exerciseType === 'cards' ? CARD_TUTORIAL_STEPS : TEXT_TUTORIAL_STEPS}
          onDone={() => setShowTutorial(false)}
        />
      )}

      <div style={styles.topBar}>
        <button style={styles.btnGhost} onClick={backToModeMenu}>
          ← Schwierigkeit wählen
        </button>
        <div style={styles.progressLabel}>
          {TYPE_INFO[exerciseType].label.replace(/^[^\s]+\s/, '')} · {MODE_LABELS[exerciseType][mode].label} · Szenario{' '}
          {scenarioIdx + 1}/{scenarios.length}
        </div>
      </div>

      <h2 style={styles.scenarioTitle}>{scenario.title}</h2>

      {exerciseType === 'text' && <div style={styles.textBox}>{scenario.text}</div>}

      <p style={styles.instructions}>
        {exerciseType === 'text'
          ? 'Lies den Text genau. Ziehe die passenden Bausteine in die richtige Zelle (Zeile = Reihenfolge, Spalte = Abteilung).'
          : 'Ziehe jede Karte in die richtige Zelle (Zeile = Schritt, Spalte = Stelle).'}
        {showDistractorZone && ' Manche Bausteine gehören nicht dazu — die ziehst du in die Box rechts.'}
        {needsHeaderDrag && ' Auch die Abteilungsnamen oben in der Kopfzeile musst du selbst in die richtige Spalte ziehen.'}
      </p>

      {/* Abteilungen-Pool (nur ab Fortgeschritten) */}
      {needsHeaderDrag && (
        <div style={styles.headerPoolBox}>
          <div style={styles.headerPoolLabel}>Abteilungen — zieh sie in die Kopfzeile</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {headerPool.length === 0 && <div style={styles.poolEmpty}>Alle Abteilungen platziert ✓</div>}
            {headerPool.map((chip) => (
              <div
                key={chip.id}
                onPointerDown={(e) => onPointerDownCard(e, chip)}
                style={{ ...styles.stelleChip, opacity: dragCard?.id === chip.id ? 0.3 : 1, touchAction: 'none' }}
              >
                {chip.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funktionen / Bausteine Pool */}
      <div style={styles.poolBox}>
        {pool.length === 0 && <div style={styles.poolEmpty}>Alle Karten platziert ✓</div>}
        {pool.map((card) => {
          const label = cardLabel(card, displayMode);
          return (
            <div
              key={card.id}
              onPointerDown={(e) => onPointerDownCard(e, card)}
              style={{ ...styles.card, opacity: dragCard?.id === card.id ? 0.3 : 1, touchAction: 'none' }}
            >
              <div>{label.main}</div>
              {label.hint && <div style={styles.hintText}>Hinweis: {label.hint}</div>}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Grid */}
        <div style={{ position: 'relative', flex: '1 1 auto', minWidth: 320 }} ref={gridWrapRef}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `48px repeat(${colCount}, minmax(110px, 1fr))`,
              gap: 4,
            }}
          >
            <div />
            {scenario.stellen.map((_: string, colIdx: number) => {
              if (!needsHeaderDrag) {
                return (
                  <div key={colIdx} style={styles.colHeader}>
                    {scenario.stellen[colIdx]}
                  </div>
                );
              }
              const chip = headerMap[colIdx];
              const status = checked ? headerStatus[colIdx] : null;
              return (
                <div
                  key={colIdx}
                  ref={(el) => { headerRefs.current[colIdx] = el; }}
                  style={{
                    ...styles.headerSlot,
                    borderColor: status === 'correct' ? 'var(--good)' : status === 'wrong' ? 'var(--bad)' : 'var(--entity)',
                    background:
                      status === 'correct'
                        ? 'color-mix(in srgb, var(--good) 18%, var(--panel-2))'
                        : status === 'wrong'
                          ? 'color-mix(in srgb, var(--bad) 18%, var(--panel-2))'
                          : 'color-mix(in srgb, var(--entity) 10%, var(--panel-2))',
                  }}
                >
                  {chip ? (
                    <div
                      onPointerDown={(e) => onPointerDownCard(e, chip)}
                      style={{
                        ...styles.stelleChip,
                        opacity: dragCard?.id === chip.id ? 0.3 : 1,
                        touchAction: 'none',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      {chip.name}
                    </div>
                  ) : (
                    <span style={styles.headerPlaceholder}>?</span>
                  )}
                </div>
              );
            })}

            {Array.from({ length: rowCount }).map((_, rowIdx) => (
              <React.Fragment key={rowIdx}>
                <div style={styles.rowLabel}>{rowIdx + 1}</div>
                {scenario.stellen.map((_: string, colIdx: number) => {
                  const key = `${rowIdx}_${colIdx}`;
                  const card = cellMap[key];
                  const status = checked ? cellStatus[key] : null;
                  const label = card ? cardLabel(card, displayMode) : null;
                  return (
                    <div
                      key={key}
                      ref={(el) => { cellRefs.current[key] = el; }}
                      style={{
                        ...styles.cell,
                        borderColor: status === 'correct' ? 'var(--good)' : status === 'wrong' ? 'var(--bad)' : 'var(--line)',
                        background:
                          status === 'correct'
                            ? 'color-mix(in srgb, var(--good) 15%, var(--panel-2))'
                            : status === 'wrong'
                              ? 'color-mix(in srgb, var(--bad) 15%, var(--panel-2))'
                              : 'var(--panel-2)',
                      }}
                    >
                      {card && (
                        <div
                          onPointerDown={(e) => onPointerDownCard(e, card)}
                          style={{ ...styles.cardInCell, opacity: dragCard?.id === card.id ? 0.3 : 1, touchAction: 'none' }}
                        >
                          {label!.main}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {showArrows && arrowPaths.length > 0 && (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="var(--entity)" />
                </marker>
              </defs>
              {arrowPaths.map((d, i) => (
                <path key={i} d={d} stroke="var(--entity)" strokeWidth={2.5} fill="none" markerEnd="url(#arrowhead)" />
              ))}
            </svg>
          )}
        </div>

        {showDistractorZone && (
          <div ref={distractorRef} style={styles.distractorBox}>
            <div style={styles.distractorHeader}>Gehört nicht zum {exerciseType === 'text' ? 'Text' : 'Prozess'}</div>
            {distractorPlaced.map((card) => {
              const status = checked ? distractorStatus[card.id] : null;
              return (
                <div
                  key={card.id}
                  onPointerDown={(e) => onPointerDownCard(e, card)}
                  style={{
                    ...styles.card,
                    width: '100%',
                    marginBottom: 8,
                    opacity: dragCard?.id === card.id ? 0.3 : 1,
                    borderColor: status === 'correct' ? 'var(--good)' : status === 'wrong' ? 'var(--bad)' : 'var(--line)',
                    background:
                      status === 'correct'
                        ? 'color-mix(in srgb, var(--good) 15%, var(--panel-2))'
                        : status === 'wrong'
                          ? 'color-mix(in srgb, var(--bad) 15%, var(--panel-2))'
                          : 'var(--panel-2)',
                    touchAction: 'none',
                  }}
                >
                  {card.text}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        {!checked && (
          <button
            style={{ ...styles.btnPrimary, opacity: allPoolsEmpty ? 1 : 0.5, cursor: allPoolsEmpty ? 'pointer' : 'not-allowed' }}
            disabled={!allPoolsEmpty}
            onClick={checkAnswers}
          >
            Prüfen
          </button>
        )}
        {checked && (
          <>
            <div style={styles.resultText}>
              {totalCorrectNow} / {totalCount} richtig
            </div>
            {allPlacedCorrectly ? (
              <button style={styles.btnPrimary} onClick={nextScenario}>
                {scenarioIdx + 1 < scenarios.length ? 'Nächstes Szenario →' : 'Fertig 🎉'}
              </button>
            ) : (
              <button style={styles.btnPrimary} onClick={retryWrong}>
                Falsche erneut versuchen
              </button>
            )}
          </>
        )}
      </div>

      {dragCard && (
        <div
          style={{
            ...(dragCard.isStelle ? styles.stelleChip : styles.card),
            position: 'fixed',
            left: dragPos.x,
            top: dragPos.y,
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            transform: 'rotate(-2deg) scale(1.05)',
          }}
        >
          {dragCard.isStelle ? dragCard.name : cardLabel(dragCard, displayMode).main}
        </div>
      )}
    </div>
  );
}

// ---------------------- Styles (dunkles Theme) ------------------

const styles: Record<string, React.CSSProperties> = {
  page: { fontFamily: 'inherit', maxWidth: 1100, margin: '0 auto', color: 'var(--ink)' },
  h1: { fontSize: 26, margin: '0 0 6px', color: 'var(--ink)' },
  subtitle: { color: 'var(--sub)', marginBottom: 24 },
  modeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  modeCard: {
    border: '2px solid var(--line)',
    borderRadius: 12,
    padding: '20px 16px',
    background: 'var(--panel)',
    cursor: 'pointer',
    textAlign: 'left',
    color: 'var(--ink)',
  },
  modeLabel: { fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--ink)' },
  modeDesc: { color: 'var(--sub)', fontSize: 14 },

  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 },
  progressLabel: { color: 'var(--sub)', fontSize: 14, fontWeight: 600 },

  scenarioTitle: { fontSize: 21, margin: '12px 0 4px', color: 'var(--ink)' },
  textBox: {
    background: 'color-mix(in srgb, var(--warn) 10%, var(--panel))',
    border: '2px solid var(--warn)',
    borderRadius: 12,
    padding: '16px 18px',
    fontSize: 15,
    lineHeight: 1.6,
    color: 'var(--ink)',
    marginBottom: 16,
  },
  instructions: { color: 'var(--sub)', marginBottom: 18, fontSize: 14 },

  headerPoolBox: {
    padding: 12,
    background: 'color-mix(in srgb, var(--sql-cyan) 10%, var(--panel))',
    borderRadius: 12,
    marginBottom: 14,
    border: '2px dashed var(--sql-cyan)',
  },
  headerPoolLabel: {
    fontSize: 12.5,
    fontWeight: 700,
    color: 'var(--sql-cyan)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  stelleChip: {
    background: 'color-mix(in srgb, var(--sql-cyan) 22%, var(--panel-2))',
    border: '2px solid var(--sql-cyan)',
    color: 'var(--ink)',
    borderRadius: 999,
    padding: '6px 16px',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'grab',
    userSelect: 'none',
  },

  poolBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    minHeight: 64,
    padding: 12,
    background: 'var(--panel-2)',
    borderRadius: 12,
    marginBottom: 20,
    border: '2px dashed var(--line)',
  },
  poolEmpty: { color: 'var(--sub)', fontStyle: 'italic', padding: 8 },

  card: {
    background: 'var(--panel-2)',
    border: '2px solid var(--line)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13.5,
    fontWeight: 500,
    cursor: 'grab',
    userSelect: 'none',
    minWidth: 140,
    maxWidth: 240,
    color: 'var(--ink)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
  },
  hintText: { fontSize: 11, color: 'var(--entity)', marginTop: 4, fontStyle: 'italic' },

  colHeader: { background: 'var(--entity)', color: '#fff', padding: '8px 6px', fontWeight: 700, fontSize: 12.5, textAlign: 'center', borderRadius: 6 },
  headerSlot: { border: '2px dashed var(--entity)', borderRadius: 6, minHeight: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 },
  headerPlaceholder: { color: 'var(--sub)', fontWeight: 700, fontSize: 16 },
  rowLabel: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--sub)', fontSize: 13 },
  cell: { border: '2px solid var(--line)', borderRadius: 8, minHeight: 64, padding: 4, background: 'var(--panel-2)', display: 'flex', alignItems: 'stretch' },
  cardInCell: {
    background: 'color-mix(in srgb, var(--entity) 18%, var(--panel-2))',
    border: '1px solid var(--entity)',
    borderRadius: 6,
    padding: '6px 8px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'grab',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    touchAction: 'none',
    color: 'var(--ink)',
  },

  distractorBox: { width: 220, border: '2px dashed var(--line)', borderRadius: 12, padding: 10, background: 'var(--panel)', minHeight: 200 },
  distractorHeader: { fontWeight: 700, fontSize: 13, color: 'var(--sub)', marginBottom: 10, textAlign: 'center' },

  footer: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 22 },
  resultText: { fontWeight: 700, fontSize: 16, color: 'var(--ink)' },

  btnPrimary: { background: 'var(--entity)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--entity)', border: '2px solid var(--entity)', borderRadius: 8, padding: '8px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },

  scoreBox: {
    fontSize: 22,
    fontWeight: 700,
    background: 'color-mix(in srgb, var(--good) 15%, var(--panel))',
    border: '2px solid var(--good)',
    color: 'var(--good)',
    padding: '16px 24px',
    borderRadius: 12,
    display: 'inline-block',
  },

  overlayBg: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: 16,
  },
  tutorialCard: {
    background: 'var(--panel)',
    border: '1px solid var(--line)',
    borderRadius: 16,
    padding: 28,
    maxWidth: 460,
    width: '100%',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
  },
  tutorialStepDots: { display: 'flex', gap: 6, marginBottom: 16 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  tutorialTitle: { fontSize: 20, margin: '0 0 10px', color: 'var(--ink)' },
  tutorialBody: { color: 'var(--sub)', lineHeight: 1.5, marginBottom: 22, fontSize: 14.5 },
};
