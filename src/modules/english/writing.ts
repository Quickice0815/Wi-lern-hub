export interface WritingExample {
  id: string;
  title: string;
  en: string;
  de: string;
}

// ============================================================
// SCHREIBTRAINING — Klausur-Format: die deutschen Informationen
// sind vorgegeben, daraus soll die englische E-Mail bzw. der
// englische Report entstehen. Beim Üben bleibt die deutsche
// Vorlage sichtbar, die englische Musterlösung wird erst nach
// einem eigenen Schreibversuch aufgedeckt.
// ============================================================

const EMAIL_TEXTS: Omit<WritingExample, 'id'>[] = [
  {
    title: 'Kostenvoranschlag anfragen',
    de: `Hallo Frau Smith,

ich schreibe bezüglich der Dienstleistungen, die wir besprochen haben. Könnten Sie mir bitte bis zum 18. März einen Kostenvoranschlag schicken, einschließlich Lieferzeit und Zahlungsbedingungen? Falls Sie weitere Informationen benötigen, geben Sie mir bitte Bescheid; ich sende sie umgehend.

Vielen Dank für Ihre Unterstützung.

Mit freundlichen Grüßen
Steffen`,
    en: `Hello Ms Smith,

I'm writing regarding the services we discussed. Could you please send an estimate of your costs by 18 March, including delivery time and payment terms? If you require any additional information, please let me know and I will provide it immediately.

Thanks for your help.

Kind regards,
Steffen`,
  },
  {
    title: 'Korrigierte Rechnung senden',
    de: `Hallo Herr Brown,

ich entschuldige mich für die falsche Rechnung, die ich gestern gesendet habe. Anbei finden Sie die korrigierte Version. Könnten Sie bitte bestätigen, dass Sie sie erhalten haben und dass der aktualisierte Betrag für Sie in Ordnung ist? Falls es Fragen gibt, kläre ich die Details gern.

Vielen Dank im Voraus.

Mit freundlichen Grüßen
Steffen`,
    en: `Hello Mr Brown,

I do apologise for the incorrect invoice sent yesterday. Please find the corrected version attached. Could you please confirm that you have received it and that the updated amount is acceptable? If there are any questions, I would be happy to clarify the details.

Thank you in advance.

Kind regards,
Steffen`,
  },
  {
    title: 'Seminartermin verschieben',
    de: `Hallo Frau Smith,

ich schreibe bezüglich des Seminars „Effective Staff Appraisals“ am 18. März. Leider habe ich eine Überschneidung im Stundenplan und kann daher vormittags nicht teilnehmen. Wäre es möglich, meine Teilnahme auf einen Termin am Nachmittag zu verschieben oder einen Alternativtermin in der nächsten Woche anzubieten? Bitte geben Sie mir Bescheid, was möglich ist.

Mit freundlichen Grüßen
Steffen`,
    en: `Hello Ms Smith,

I'm writing regarding the "Effective Staff Appraisals" seminar on 18 March. Unfortunately, I have a timetable conflict and I am therefore unable to attend in the morning. Would it be possible to move my participation to an afternoon session, or to an alternative date next week? Please let me know what is available.

Kind regards,
Steffen`,
  },
  {
    title: 'Kursort bestätigen lassen',
    de: `Hallo Frau Miller,

vielen Dank für die Information zum Kurs. Ich habe zur Kenntnis genommen, dass der Veranstaltungsort aufgrund der hohen Nachfrage in eine größere Location verlegt wurde. Könnten Sie bitte die vollständige Adresse und die Startzeit bestätigen, damit ich meine Anreise entsprechend planen kann?

Vielen Dank für Ihre Hilfe.

Mit freundlichen Grüßen
Steffen`,
    en: `Hello Ms Miller,

Thank you for the update regarding the course. I have noted that, due to high demand, the venue has been changed to a larger location. Could you please confirm the full address and the start time, so I can plan my travel accordingly?

Thanks for your help.

Kind regards,
Steffen`,
  },
  {
    title: 'Follow-up nach einem Meeting',
    de: `Hallo Herr Brown,

bezugnehmend auf unser Treffen Anfang dieser Woche finden Sie anbei die von Ihnen angeforderten Informationen. Könnten Sie bitte bestätigen, ob die vorgeschlagenen nächsten Schritte für Sie in Ordnung sind, und mir einen passenden Zeitpunkt für ein kurzes Folgegespräch nennen? Wenn Sie möchten, kann ich Ihnen auch meine Verfügbarkeit für nächste Woche senden.

Mit freundlichen Grüßen
Steffen`,
    en: `Hello Mr Brown,

Referring to our meeting earlier this week, please find attached the information you requested. Could you please confirm whether the proposed next steps are acceptable and advise on a suitable time for a short follow-up call? If you prefer, I can share my availability for next week.

Kind regards,
Steffen`,
  },
];

const REPORT_TEXTS: Omit<WritingExample, 'id'>[] = [
  {
    title: 'Bericht zur Büro-Modernisierung',
    de: `Einleitung
Ziel dieses Berichts ist es, das Feedback der Mitarbeitenden zur Büro-Modernisierung zusammenzufassen und Empfehlungen für das Management abzuleiten. Die Ergebnisse basieren auf einer Umfrage zu Büroaufteilung, Umzugspräferenzen und Beleuchtung am Arbeitsplatz.

Ergebnisse
52% der Mitarbeitenden bevorzugen Großraumbüros, während 20% Einzelbüros vorziehen. Weitere 15% wünschen Einzelbüros für das Management, und 13% haben keine Präferenz. Das deutet darauf hin, dass Zusammenarbeit wichtig ist, aber ruhige Bereiche weiterhin benötigt werden.

Beim Thema Umzug unterstützen 46% neue Räumlichkeiten in der gleichen Gegend, während 27% die Innenstadt bevorzugen. Nur 23% würden die bestehenden Büros modernisieren. Insgesamt spricht dies für einen Neustart mit möglichst wenig Störung der Pendelwege.

Eine deutliche Mehrheit (90%) hält natürliches Licht für alle Arbeitsplätze für wichtig. Allerdings ist es möglicherweise nicht für jeden Schreibtisch umsetzbar.

Empfehlungen
1. Es wird empfohlen, in neue Räumlichkeiten in der gleichen Gegend umzuziehen, da diese Option die höchste Zustimmung hat und die Störung gering halten sollte.
2. Zudem sollten Großraumbüros mit Ruhezonen und kleinen Besprechungsräumen umgesetzt werden, um Teamarbeit und Privatsphäre auszubalancieren.
3. Da es eventuell nicht möglich ist, jedem Arbeitsplatz natürliches Licht zu bieten, sollte eine Alternative geprüft werden: tageslichtähnliche LED-Beleuchtung und eine Sitzordnung, die Fensterplätze für konzentrierte Tätigkeiten priorisiert.`,
    en: `Report on Office Modernisation

Introduction
The purpose of this report is to summarise employee feedback on office modernisation and to make recommendations for management. The findings are based on survey results covering office layout, relocation preferences and workplace lighting.

Findings
The results show that 52% of employees prefer open-plan offices, while 20% favour single offices. A further 15% selected single offices for management, and the remaining 13% reported no preference. This suggests that collaboration is valued, but quiet areas are still needed.

With regard to relocation, 46% support moving to new premises in the same area, while 27% prefer the city centre. Only 23% would modernise the existing offices. Overall, employees appear to favour a fresh start with limited disruption to commuting patterns.

A clear majority (90%) stated that natural light is essential for all workstations. However, it may not be possible to guarantee this for every desk.

Recommendations
1. It is recommended that the company relocates to new premises in the same area, because this has the strongest support and should minimise disruption.
2. Furthermore, open-plan working should be implemented with quiet zones and small meeting rooms in order to balance teamwork and privacy.
3. Finally, as it may not be possible to provide natural light for every workstation, an alternative should be considered: daylight LED solutions and a seating policy that prioritises window areas for tasks requiring high concentration.`,
  },
  {
    title: 'Bericht zum Werbebudget für Turbodrinks',
    de: `Einleitung
Ziel dieses Berichts ist es, die vorliegenden Budgetzahlen zusammenzufassen und Empfehlungen für die Verteilung im nächsten Jahr zu geben. Betrachtet werden Werbung, Gratisproben und Messen.

Ergebnisse
Die Ausgaben für Anzeigen in Sportmagazinen stiegen von 300.000 AUD auf 450.000 AUD. Das deutet auf einen stärkeren Fokus auf Reichweite und Markenbekanntheit hin.

Die Ausgaben für Gratisproben bei Sportevents erhöhten sich deutlich von 50.000 AUD auf 200.000 AUD. Das spricht für eine Strategie, die auf Produkttests und direkte Kundenerfahrung setzt.

Im Gegensatz dazu blieben die Messeausgaben stabil bei 100.000 AUD, was darauf hindeutet, dass dieser Kanal gehalten, aber nicht ausgebaut wird.

Insgesamt stieg das Gesamtbudget von 450.000 AUD auf 750.000 AUD. Die Prognose für nächstes Jahr liegt bei etwa 800.000 AUD, also weiterem Wachstum, jedoch langsamer.

Empfehlungen
1. Es wird empfohlen, Sampling weiterhin zu priorisieren, da es Produkttests und Wiederkäufe direkt unterstützt.
2. Außerdem sollten die Werbeausgaben überprüft werden, um die relevanteste Zielgruppe besser zu erreichen und die Kosteneffizienz zu steigern.
3. Da eine starke Erhöhung des Gesamtbudgets ggf. nicht möglich ist, sollte eine Alternative geprüft werden: einen kleinen Teil der Messeausgaben in messbare digitale Kampagnen umzuschichten.`,
    en: `Report on the Promotional Budget for Turbodrinks

Introduction
The purpose of this report is to summarise the promotional budget figures provided and to make recommendations for next year's allocation. The findings cover advertising, free samples and trade fairs.

Findings
Spending on sports magazine advertising increased from AUD 300,000 to AUD 450,000. This indicates a stronger focus on broad awareness and brand visibility.

Expenditure on free samples at sports events rose sharply from AUD 50,000 to AUD 200,000. This suggests a strategy focused on product trial and immediate consumer experience.

In contrast, trade fair spending remained stable at AUD 100,000, indicating that this channel is being maintained rather than expanded.

Overall, the total budget rose from AUD 450,000 to AUD 750,000. The forecast for next year is approximately AUD 800,000, which suggests continued growth but at a slower rate.

Recommendations
1. It is recommended that sampling remains a priority, because it directly supports product trial and repeat purchase.
2. Furthermore, advertising spend should be reviewed to ensure it targets the most relevant audience, in order to improve cost-effectiveness.
3. Finally, as it may not be possible to increase the total budget significantly, an alternative should be considered: reallocating a small portion of trade fair spending to measurable digital campaigns.`,
  },
  {
    title: 'Bericht zur Verbesserung von Mitarbeiterbeurteilungen',
    de: `Einleitung
Ziel dieses Berichts ist es, zentrale Probleme bei Mitarbeiterbeurteilungen darzustellen und Empfehlungen zur Verbesserung der Wirksamkeit zu geben. Die Erkenntnisse basieren auf typischen Problemen, die von Mitarbeitenden und Vorgesetzten berichtet werden.

Ergebnisse
Leistungsbeurteilungen werden häufig als subjektiv wahrgenommen. Das kann ehrliche Kommunikation hemmen und die Motivation senken, besonders wenn Mitarbeitende den Eindruck haben, dass persönliche Voreingenommenheit die Bewertungen beeinflusst.

Außerdem zeigt sich, dass einige Mitarbeitende in Beurteilungsgesprächen nicht offen sagen, was sie denken. Dadurch werden Schwächen und Entwicklungsbedarfe möglicherweise nicht früh genug angesprochen.

Zusätzlich sind Vorgesetzte mitunter nicht ausreichend sensibilisiert, wie ihr Feedback ankommt. Das kann zu Missverständnissen und mangelnder Verbindlichkeit bei vereinbarten Maßnahmen führen.

Empfehlungen
1. Es wird empfohlen, ein standardisiertes Beurteilungsraster einzuführen, da dies Konsistenz erhöht und Subjektivität reduziert.
2. Zudem sollten Vorgesetzte im Geben von konstruktivem Feedback geschult werden, um Kommunikation und Motivation zu verbessern.
3. Da sich Bias nicht vollständig ausschließen lässt, sollte eine Alternative geprüft werden: Managerfeedback mit Selbsteinschätzung und klaren, messbaren Zielen zu kombinieren.`,
    en: `Report on Improving Staff Appraisals

Introduction
The purpose of this report is to outline key issues with staff appraisals and to make recommendations to improve their effectiveness. The findings are based on typical problems reported by employees and supervisors.

Findings
Performance reviews are often perceived as subjective. This can discourage honest communication and may reduce motivation, particularly if employees feel that personal bias affects evaluations.

It can also be seen that some employees do not speak their minds during appraisal meetings. As a result, weaknesses and development needs may not be addressed early enough.

In addition, supervisors may be unaware of how their feedback is received. This can lead to misunderstandings and a lack of commitment to agreed actions.

Recommendations
1. It is recommended that a standard appraisal framework is introduced, because this will increase consistency and reduce subjectivity.
2. Furthermore, supervisors should receive training on giving constructive feedback in order to improve communication and motivation.
3. Finally, as it may not be possible to remove all bias, an alternative should be considered: combining manager feedback with self-assessment and clear, measurable objectives.`,
  },
  {
    title: 'Bericht zur Senkung der Personalfluktuation',
    de: `Einleitung
Ziel dieses Berichts ist es, mögliche Ursachen für Personalfluktuation zu identifizieren und Maßnahmen zur besseren Bindung von Mitarbeitenden zu empfehlen. Betrachtet werden Arbeitsbedingungen, Recruiting-Praktiken und Entwicklungsmöglichkeiten.

Ergebnisse
Hohe Fluktuation hängt oft mit falschen Erwartungen im Recruiting zusammen. Wenn Aufgaben, Anforderungen und Arbeitsbedingungen nicht klar kommuniziert werden, verlassen Mitarbeitende das Unternehmen möglicherweise frühzeitig.

Zudem kann fehlende Weiterbildung die Bindung schwächen. Mitarbeitende mit hoher Qualifikation erwarten häufig klare Entwicklungspfade und Unterstützung.

Schließlich können Gehalt und Arbeitsbelastung zu Unzufriedenheit beitragen, insbesondere wenn Verantwortung nicht mit Anerkennung einhergeht.

Empfehlungen
1. Es wird empfohlen, im Recruiting klarere Rollenbeschreibungen und strukturierte Auswahlkriterien zu nutzen, da dies die Passung erhöht und frühe Abgänge reduziert.
2. Außerdem sollte ein Weiterbildungs- und Entwicklungsplan umgesetzt werden, um Leistung und Motivation zu stärken.
3. Da deutliche Gehaltserhöhungen ggf. nicht möglich sind, sollte eine Alternative geprüft werden: mehr Flexibilität, Anerkennung und Karrierepfade.`,
    en: `Report on Reducing Staff Turnover

Introduction
The purpose of this report is to identify possible causes of staff turnover and to recommend measures to improve retention. The findings consider working conditions, recruitment practices and development opportunities.

Findings
High staff turnover is often linked to mismatched expectations during the recruitment process. If job requirements and working conditions are not communicated clearly, employees may leave early.

In addition, limited training and development can reduce engagement. Employees with strong professional qualifications may expect clear progression and support.

Finally, pay and workload may contribute to dissatisfaction, particularly if employees feel that responsibilities are not matched by recognition.

Recommendations
1. It is recommended that the recruitment process includes clearer role descriptions and structured selection criteria, because this will improve fit and reduce early exits.
2. Furthermore, a staff training and development plan should be implemented in order to support performance and motivation.
3. Finally, as it may not be possible to increase salaries significantly, an alternative should be considered: improving flexibility, recognition and career pathways.`,
  },
  {
    title: 'Bericht zur organisatorischen Restrukturierung',
    de: `Einleitung
Ziel dieses Berichts ist es, Restrukturierungsoptionen zu bewerten und Empfehlungen zur Effizienzsteigerung zu geben. Betrachtet werden Ebenenabbau, Rechenschaftspflichten und mögliche Auswirkungen auf Mitarbeitende.

Ergebnisse
Ein Ebenenabbau kann die Effizienz erhöhen, indem Entscheidungswege verkürzt und Verantwortlichkeiten klarer werden. Er kann jedoch auch Unsicherheit erzeugen und zu Stellenabbau führen.

Zudem erfordert Restrukturierung häufig eine sorgfältige Mittelzuweisung, da kurzfristige Kosten durch Schulungen, Umzüge oder Systemänderungen steigen können.

Außerdem muss die Rechenschaftspflicht gegenüber dem Management klar geregelt werden, um Unklarheiten in Zuständigkeiten zu vermeiden.

Empfehlungen
1. Es wird empfohlen, die Restrukturierung auf vereinfachte Berichtslinien zu fokussieren, da dies Entscheidungsgeschwindigkeit und Verantwortlichkeit verbessert.
2. Zudem sollte die Change-Kommunikation gestärkt werden, um Unsicherheit zu reduzieren und Motivation zu schützen.
3. Da sich Stellenabbau ggf. nicht vollständig vermeiden lässt, sollte eine Alternative geprüft werden: interne Versetzungen und gezielte Schulungen, um Schlüsselkompetenzen zu halten.`,
    en: `Report on Organisational Restructuring

Introduction
The purpose of this report is to assess restructuring options and to make recommendations to improve efficiency. The findings consider delayering, accountability and potential impacts on staff.

Findings
Delayering may increase efficiency by reducing decision-making time and clarifying accountability. However, it can also create uncertainty and may result in redundancies.

It can be seen that restructuring often requires careful allocation of funds, as short-term costs may increase due to training, relocation or system changes.

In addition, accountability to senior management must be clearly defined to avoid confusion about responsibilities.

Recommendations
1. It is recommended that restructuring focuses on simplifying reporting lines, because this will improve decision speed and accountability.
2. Furthermore, change communication should be strengthened in order to reduce uncertainty and protect motivation.
3. Finally, as it may not be possible to avoid redundancies completely, an alternative should be considered: redeployment and targeted training to retain key skills.`,
  },
];

function build(prefix: string, items: Omit<WritingExample, 'id'>[]): WritingExample[] {
  return items.map((item, i) => ({ ...item, id: `${prefix}-${i + 1}` }));
}

export const EMAIL_EXAMPLES: WritingExample[] = build('email-ex', EMAIL_TEXTS);
export const REPORT_EXAMPLES: WritingExample[] = build('report-ex', REPORT_TEXTS);
