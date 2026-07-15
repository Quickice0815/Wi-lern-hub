import type { BarGroup, PieSlice } from './charts';

export interface EmailTask {
  id: string;
  scenario: string;
  instruction: string;
  bullets: string[];
  wordCount?: string;
  modelEmail: string;
}

export type ReportChart =
  | { type: 'pie'; title: string; data: PieSlice[] }
  | { type: 'bar'; title: string; unit: string; oldLabel: string; newLabel: string; data: BarGroup[] };

export interface ReportTask {
  id: string;
  scenario: string;
  charts: ReportChart[];
  hints: string[];
  minWords: number;
  modelReport: string;
}

// ============================================================
// SCHREIBTRAINING — Klausur-Format.
//
// E-Mails: die Klausur gibt eine kurze deutsche Situation plus
// 3-4 Stichpunkte vor, was die E-Mail enthalten muss (kein
// fertiger deutscher Text).
//
// Reports: die Klausur gibt eine kurze deutsche Situation plus
// ein oder mehrere Diagramme (Umfrageergebnisse) vor, aus denen
// der englische Bericht entstehen soll — genau dieses Format wird
// hier geübt. Zwei der Aufgaben (Büro-Modernisierung, Mitarbeiter-
// bewertungssystem) sind 1:1 aus echtem Klausurmaterial übernommen;
// die übrigen drei wurden mit plausiblen Umfragezahlen auf dasselbe
// Format gebracht.
// ============================================================

const EMAIL_TASKS: Omit<EmailTask, 'id'>[] = [
  {
    scenario:
      'Sie arbeiten als freiberufliche(r) Unternehmensberater:in. Sie sind von einem lokalen Unternehmen gebeten worden, für das Management der Firma eine Schulung durchzuführen zu dem Thema: „Erfolgreiches Gestalten von Personalgesprächen". Der Schulungstermin ist für Februar 2024 geplant.',
    instruction: 'Schreiben Sie eine E-Mail an Ihre Kontaktperson:',
    bullets: [
      'Bekunden Sie Ihr Interesse an der Durchführung des Seminars;',
      'teilen Sie mit, warum es Ihnen nicht möglich ist, das Seminar in der vorgeschlagenen Zeit zu halten;',
      'nennen Sie einen Alternativtermin.',
    ],
    wordCount: '40-50 Wörter',
    modelEmail: `Hello Ms Taylor,

Thank you for asking me to run the seminar "Successfully Conducting Staff Appraisals" for your management team. I would be delighted to deliver this training.

Unfortunately, I am unable to hold the seminar in February, as I already have a prior commitment. However, I could deliver it in March instead.

Kind regards,
Steffen`,
  },
  {
    scenario:
      'Sie haben bereits ein Hotel für eine Geschäftsreise gebucht. Ein weiterer Kollege wird an der Reise teilnehmen, und Ihr Team benötigt außerdem einen großen Besprechungsraum für eine Konferenz.',
    instruction: 'Schreiben Sie eine E-Mail an das Hotel:',
    bullets: [
      'erklären Sie, warum Sie schreiben;',
      'bitten Sie um einen großen Besprechungsraum;',
      'teilen Sie mit, dass ein weiterer Kollege kommt und ein zusätzliches Zimmer benötigt wird;',
      'bitten Sie um eine Bestätigung der Änderungen.',
    ],
    wordCount: 'etwa 60 Wörter',
    modelEmail: `Hello,

I'm writing regarding our booking for 14-16 March under the name Steffen Friedrich. I would like to make a few changes to the reservation.

Could you please provide a large meeting room for a conference during our stay? In addition, a colleague will be joining the trip, so we will need one additional room.

Could you please confirm these changes at your earliest convenience?

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie haben nächste Woche ein Meeting mit einem Kunden.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['entschuldigen Sie sich', 'nennen Sie den Grund', 'schlagen Sie einen neuen Termin vor'],
    modelEmail: `Hello Mr Brown,

I'm afraid I need to reschedule our meeting next week. Unfortunately, I have a scheduling conflict due to an urgent client matter that requires my attention.

Would it be possible to meet on Thursday instead? Please let me know if that works for you.

Kind regards,
Steffen`,
  },
  {
    scenario: 'Ihre Firma möchte neue Büromöbel kaufen.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['erklären Sie, was Sie benötigen', 'bitten Sie um ein Angebot', 'fragen Sie nach Lieferzeit'],
    modelEmail: `Hello,

I'm writing on behalf of my company, as we are planning to purchase new office furniture, including desks, chairs and storage units for around 20 employees.

Could you please send us a quote for these items? I would also appreciate it if you could let me know the expected delivery time.

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie haben ein Hotelzimmer gebucht.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['bestätigen Sie die Buchung', 'fragen Sie nach einem frühen Check-in', 'erkundigen Sie sich nach Parkplätzen'],
    modelEmail: `Hello,

I would like to confirm my booking for 5-7 April under the reference SF-2201.

As my flight arrives early in the morning, would it be possible to check in earlier than the standard time? I would also like to ask whether parking is available on site.

Thank you for your help.

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie waren in einem Hotel.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['beschweren Sie sich', 'nennen Sie zwei Probleme', 'bitten Sie um eine Lösung'],
    modelEmail: `Hello,

I recently stayed at your hotel from 2 to 4 May, and unfortunately I was not satisfied with my stay.

Firstly, the room was not properly cleaned on arrival. Secondly, the air conditioning did not work throughout my stay, despite reporting it to reception.

Could you please let me know how you intend to resolve this matter?

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie möchten sich für ein Praktikum bewerben.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['sagen Sie, warum Sie sich bewerben', 'nennen Sie Ihre Qualifikationen', 'bitten Sie um ein Vorstellungsgespräch'],
    modelEmail: `Hello,

I am writing to apply for the internship position in your marketing department, as advertised on your website. I am currently studying business informatics and am very interested in gaining practical experience in your company.

I have strong skills in data analysis and have completed several relevant projects during my studies.

Would it be possible to arrange an interview at a convenient time?

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie warten auf eine Bestellung.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['sagen Sie, welche Bestellung gemeint ist', 'erklären Sie das Problem', 'bitten Sie um Informationen'],
    modelEmail: `Hello,

I'm writing regarding my order #4471, placed on 3 June. According to the confirmation, it should have arrived by now, but I have not yet received it.

Could you please check the status of my order and let me know when I can expect delivery?

Thanks for your help.

Kind regards,
Steffen`,
  },
  {
    scenario: 'Sie wurden zu einer Firmenveranstaltung eingeladen.',
    instruction: 'Schreiben Sie eine E-Mail.',
    bullets: ['bedanken Sie sich', 'sagen Sie ab', 'wünschen Sie eine erfolgreiche Veranstaltung'],
    modelEmail: `Hello,

Thank you very much for inviting me to the company event on 20 June. I really appreciate the invitation.

Unfortunately, I am unable to attend due to a prior commitment on that day.

I wish you a very successful event.

Kind regards,
Steffen`,
  },
  {
    scenario:
      'Sie arbeiten als Einkäufer:in in einem Unternehmen. Eine Lieferfirma hat angekündigt, Ihre Bestellung Anfang Mai 2024 zu liefern. Zu diesem Zeitpunkt kann Ihre Firma die Lieferung jedoch nicht annehmen.',
    instruction: 'Schreiben Sie eine E-Mail an Ihre Kontaktperson:',
    bullets: [
      'bedanken Sie sich für die Information;',
      'erklären Sie, warum die Lieferung nicht angenommen werden kann;',
      'nennen Sie einen Alternativtermin für die Lieferung.',
    ],
    wordCount: '40-60 Wörter',
    modelEmail: `Hello Mr Brown,

Thank you for letting me know that our order is scheduled for delivery in early May. Unfortunately, we are unable to accept the delivery at that time, as our warehouse will be closed for renovation work.

Would it be possible to deliver the order in the following week instead?

Kind regards,
Steffen`,
  },
];

const REPORT_TASKS: Omit<ReportTask, 'id'>[] = [
  {
    scenario:
      'Die Büros Ihres Unternehmens wurden vor dreißig Jahren gebaut und bedürfen dringend einer Modernisierung. Sie wurden gebeten, eine Mitarbeiterbefragung durchzuführen und einen Bericht für das Management zu verfassen. Schauen Sie sich die Diagramme unten an.',
    charts: [
      {
        type: 'pie',
        title: 'Welchen Büroplan präferieren Sie?',
        data: [
          { label: 'Großraumbüros', value: 52 },
          { label: 'Einzelbüros', value: 20 },
          { label: 'Einzelbüros fürs Management', value: 15 },
          { label: 'Egal', value: 13 },
        ],
      },
      {
        type: 'pie',
        title: 'Wie sollten wir die Büroräume verändern?',
        data: [
          { label: 'Modernisierung der bestehenden Räume', value: 23 },
          { label: 'Neue Räumlichkeiten in der gleichen Gegend', value: 46 },
          { label: 'Neue Räumlichkeiten im Stadtzentrum', value: 27 },
          { label: 'Keine Meinung', value: 4 },
        ],
      },
      {
        type: 'pie',
        title: 'Stört Sie das Arbeiten bei künstlichem Licht?',
        data: [
          { label: 'Alle Arbeitsplätze sollen natürliches Licht bekommen', value: 90 },
          { label: 'Egal', value: 10 },
        ],
      },
    ],
    hints: [
      'Begründen Sie den Wunsch des Managements nach Einzelbüros.',
      'Empfehlen Sie eine der Umzugsoptionen und erklären Sie, warum.',
      'Erklären Sie, warum nicht jeder Arbeitsplatz natürliches Licht bekommen kann, und schlagen Sie eine Alternative vor.',
    ],
    minWords: 180,
    modelReport: `Report on Office Modernisation

Introduction
The purpose of this report is to summarise employee feedback on office modernisation and to make recommendations for management. The findings are based on a staff survey covering office layout, relocation preferences and workplace lighting.

Findings
The results show that 52% of employees prefer open-plan offices, while 20% favour single offices. A further 15% selected single offices for management, and the remaining 13% reported no preference. This suggests that collaboration is valued, but quiet areas are still needed.

With regard to relocation, 46% support moving to new premises in the same area, while 27% prefer the city centre. Only 23% would modernise the existing offices, and the remaining 4% expressed no clear preference. Overall, employees appear to favour a fresh start with limited disruption to commuting patterns.

A clear majority (90%) stated that natural light is essential for all workstations, while the remaining 10% had no preference. However, it may not be possible to guarantee natural light for every desk.

Recommendations
1. It is recommended that the company relocates to new premises in the same area, because this has the strongest support and should minimise disruption.
2. Furthermore, open-plan working should be implemented with quiet zones and small meeting rooms in order to balance teamwork and privacy.
3. Finally, as it may not be possible to provide natural light for every workstation, an alternative should be considered: daylight LED solutions and a seating policy that prioritises window areas for tasks requiring high concentration.`,
  },
  {
    scenario:
      'Bei BrightFuture Marketing Ltd. wurde eine Mitarbeiter- und Führungskräftebefragung zum aktuellen Mitarbeiterbewertungssystem durchgeführt. Insgesamt nahmen 25 Mitarbeitende und 5 Führungskräfte teil. Sie wurden von Ihrer Vorgesetzten gebeten, die Ergebnisse zusammenzufassen und Verbesserungsmöglichkeiten zu identifizieren.',
    charts: [
      {
        type: 'pie',
        title: 'Mitarbeiter',
        data: [
          { label: 'Positive Einstellung', value: 68 },
          { label: 'Beklagen fehlendes konstruktives Feedback', value: 24 },
          { label: 'Keine Meinung', value: 8 },
        ],
      },
      {
        type: 'pie',
        title: 'Beurteilung des Tools durch Management',
        data: [
          { label: 'Positives', value: 80 },
          { label: 'Negatives', value: 20 },
        ],
      },
    ],
    hints: [
      'Erklären Sie anhand von zwei Beispielen, warum die Mitarbeitenden das System positiv bzw. negativ wahrnehmen.',
      'Erklären Sie, warum das Management das Tool überwiegend positiv bzw. teilweise negativ bewertet.',
    ],
    minWords: 180,
    modelReport: `Report on Staff Appraisal Survey Results

Introduction
The purpose of this report is to summarise the results of a survey on the current staff appraisal system at BrightFuture Marketing Ltd. In total, 25 employees and 5 managers took part, with the aim of identifying possible improvements.

Findings – Employees
The results show that 68% of employees have a positive attitude towards the appraisal system, for example because they feel it gives them a clear overview of their performance and helps them plan their development. However, 24% complain about a lack of constructive feedback, saying that comments from appraisers are often too general to be genuinely useful. The remaining 8% reported no clear opinion.

Findings – Management
With regard to management, a clear majority (80%) rated the tool positively, highlighting its usefulness for tracking team performance and identifying training needs early. In contrast, 20% viewed it negatively, mainly due to the amount of time required to complete each appraisal properly.

Conclusion and Recommendations
Overall, the appraisal system is well received, but there is clear room for improvement on both sides.
1. It is recommended that appraisers receive training on giving more specific, constructive feedback, because this will directly address the main employee complaint.
2. Furthermore, the appraisal process should be simplified in order to reduce the time burden reported by management.
3. Finally, as it may not be possible to satisfy every employee, an alternative should be considered: introducing a short mid-year check-in to complement the annual appraisal.`,
  },
  {
    scenario:
      'Ihr Unternehmen hat das Werbebudget für Turbodrinks überarbeitet. Sie wurden gebeten, die Budgetzahlen zusammenzufassen und Empfehlungen für die Verteilung im nächsten Jahr zu geben. Schauen Sie sich das Diagramm unten an.',
    charts: [
      {
        type: 'bar',
        title: 'Werbebudget: Vorjahr vs. dieses Jahr (in AUD)',
        unit: 'AUD ',
        oldLabel: 'Vorjahr',
        newLabel: 'Aktuell',
        data: [
          { label: 'Anzeigen (Sportmagazine)', oldValue: 300000, newValue: 450000 },
          { label: 'Gratisproben (Sportevents)', oldValue: 50000, newValue: 200000 },
          { label: 'Messen', oldValue: 100000, newValue: 100000 },
        ],
      },
    ],
    hints: [
      'Erklären Sie, was der Anstieg bzw. die Stabilität bei jeder Kategorie über die Strategie des Unternehmens aussagt.',
      'Empfehlen Sie eine Priorität für das nächste Jahr und begründen Sie, warum.',
    ],
    minWords: 180,
    modelReport: `Report on the Promotional Budget for Turbodrinks

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
    scenario:
      'Ihr Unternehmen hat eine auffällig hohe Personalfluktuation. Die Personalabteilung hat kürzlich ausgeschiedene Mitarbeitende befragt, warum sie das Unternehmen verlassen haben. Sie wurden gebeten, die Ergebnisse zusammenzufassen und Maßnahmen zur besseren Bindung von Mitarbeitenden zu empfehlen. Schauen Sie sich das Diagramm unten an.',
    charts: [
      {
        type: 'pie',
        title: 'Warum haben Sie das Unternehmen verlassen? (ehemalige Mitarbeitende)',
        data: [
          { label: 'Erwartungen im Recruiting nicht erfüllt', value: 45 },
          { label: 'Fehlende Weiterbildung/Entwicklung', value: 30 },
          { label: 'Gehalt/Arbeitsbelastung', value: 25 },
        ],
      },
    ],
    hints: [
      'Gehen Sie auf den größten Grund ein und was das Unternehmen dagegen tun kann.',
      'Erwähnen Sie auch die beiden kleineren Gründe.',
    ],
    minWords: 180,
    modelReport: `Report on Reducing Staff Turnover

Introduction
The purpose of this report is to identify possible causes of staff turnover and to recommend measures to improve retention. The findings are based on a survey of employees who recently left the company.

Findings
The results show that 45% of respondents left because their expectations set during recruitment were not met, for example regarding job requirements and working conditions that were not communicated clearly.

A further 30% cited limited training and development opportunities. Employees with strong professional qualifications reported expecting clear progression and support that was not provided.

The remaining 25% pointed to pay and workload, particularly feeling that their responsibilities were not matched by adequate recognition.

Recommendations
1. It is recommended that the recruitment process includes clearer role descriptions and structured selection criteria, because this will improve fit and directly address the largest group of leavers.
2. Furthermore, a staff training and development plan should be implemented in order to support performance and motivation.
3. Finally, as it may not be possible to increase salaries significantly, an alternative should be considered: improving flexibility, recognition and career pathways.`,
  },
  {
    scenario:
      'Ihr Unternehmen plant eine organisatorische Restrukturierung mit Ebenenabbau. Vor der Umsetzung wurden die Mitarbeitenden zu ihren größten Bedenken befragt. Sie wurden gebeten, die Ergebnisse zusammenzufassen und Empfehlungen für das Management zu geben. Schauen Sie sich das Diagramm unten an.',
    charts: [
      {
        type: 'pie',
        title: 'Was ist Ihre größte Sorge bei der geplanten Restrukturierung?',
        data: [
          { label: 'Unsicherer Arbeitsplatz', value: 50 },
          { label: 'Unklare Zuständigkeiten', value: 30 },
          { label: 'Mehr Arbeitsbelastung während der Umstellung', value: 20 },
        ],
      },
    ],
    hints: [
      'Gehen Sie auf die größte Sorge der Mitarbeitenden ein und wie das Management sie ansprechen kann.',
      'Erwähnen Sie auch die beiden anderen Bedenken.',
    ],
    minWords: 180,
    modelReport: `Report on Organisational Restructuring

Introduction
The purpose of this report is to assess employee concerns about the planned restructuring and to make recommendations to improve efficiency while protecting staff wellbeing. The findings are based on a survey conducted before implementation.

Findings
The results show that 50% of employees are most concerned about job security, fearing that delayering may result in redundancies. A further 30% are worried about unclear responsibilities once reporting lines change, while the remaining 20% expect an increased workload during the transition period.

It can be seen that restructuring often requires careful allocation of funds, as short-term costs may increase due to training, relocation or system changes. In addition, accountability to senior management must be clearly defined to avoid confusion about responsibilities.

Recommendations
1. It is recommended that restructuring focuses on simplifying reporting lines, because this will directly address the concern about unclear responsibilities.
2. Furthermore, change communication should be strengthened in order to reduce uncertainty about job security and protect motivation.
3. Finally, as it may not be possible to avoid redundancies completely, an alternative should be considered: redeployment and targeted training to retain key skills, easing concerns about increased workload during the transition.`,
  },
];

function withIds<T extends object>(prefix: string, items: T[]): (T & { id: string })[] {
  return items.map((item, i) => ({ ...item, id: `${prefix}-${i + 1}` }));
}

export const EMAIL_EXAMPLES: EmailTask[] = withIds('email-ex', EMAIL_TASKS);
export const REPORT_EXAMPLES: ReportTask[] = withIds('report-ex', REPORT_TASKS);
