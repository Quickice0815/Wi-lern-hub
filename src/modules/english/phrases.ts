export interface PhraseEntry {
  id: string;
  category: string;
  en: string;
  de: string;
}

// ============================================================
// REDEMITTEL — Standard-Satzbausteine für Business-E-Mails und
// -Reports, wie sie in der Klausur verlangt werden. Übung läuft
// Deutsch -> Englisch (nicht wie beim Wortschatz Englisch -> Deutsch),
// weil in der Klausur die deutschen Vorgaben gegeben sind und der
// englische Baustein produziert werden muss.
// ============================================================

const EMAIL_BLOCKS: Omit<PhraseEntry, 'id'>[] = [
  { category: 'Opening', en: 'Hello [Name],', de: 'Hallo [Name],' },
  {
    category: 'Purpose',
    en: 'Thank you for your email regarding [topic].',
    de: 'Vielen Dank für Ihre E-Mail bezüglich [topic].',
  },
  { category: 'Purpose', en: "I'm writing regarding [topic].", de: 'Ich schreibe bezüglich [topic].' },
  {
    category: 'Purpose',
    en: "I'm writing to request [information/confirmation] about [topic].",
    de: 'Ich schreibe, um [Informationen/eine Bestätigung] zu [topic] zu erbitten.',
  },
  {
    category: 'Request',
    en: 'Could you please [action] by [date]?',
    de: 'Könnten Sie bitte bis [date] [action]?',
  },
  {
    category: 'Request',
    en: 'I would appreciate it if you could [action].',
    de: 'Ich würde es sehr schätzen, wenn Sie [action] könnten.',
  },
  { category: 'Request', en: 'Would it be possible to [request]?', de: 'Wäre es möglich, [request]?' },
  {
    category: 'Problem / Constraint',
    en: 'Unfortunately, I am unable to [action] on [date].',
    de: 'Leider kann ich am [date] nicht [action].',
  },
  {
    category: 'Problem / Constraint',
    en: 'I have a scheduling conflict and I am therefore unable to [action].',
    de: 'Ich habe eine terminliche Überschneidung und kann daher nicht [action].',
  },
  {
    category: 'Alternative',
    en: 'However, I could [alternative] on [date/time].',
    de: 'Ich könnte jedoch [alternative] am [date/time].',
  },
  {
    category: 'Alternative',
    en: 'If that is not possible, I could [option 2].',
    de: 'Falls das nicht möglich ist, könnte ich [option 2].',
  },
  {
    category: 'Close',
    en: 'Thanks for your help. Kind regards, [Your name]',
    de: 'Vielen Dank für Ihre Hilfe. Mit freundlichen Grüßen, [Ihr Name]',
  },
];

const REPORT_BLOCKS: Omit<PhraseEntry, 'id'>[] = [
  { category: 'Title', en: 'Report on [topic]', de: 'Bericht zu [topic]' },
  {
    category: 'Introduction',
    en: 'The purpose of this report is to summarise [source] and to make recommendations for [goal].',
    de: 'Der Zweck dieses Berichts ist es, [source] zusammenzufassen und Empfehlungen für [goal] zu geben.',
  },
  {
    category: 'Introduction',
    en: 'The findings are based on [charts/survey] covering [criteria].',
    de: 'Die Ergebnisse basieren auf [charts/survey] zu [criteria].',
  },
  { category: 'Findings – Starter', en: 'The results show that …', de: 'Die Ergebnisse zeigen, dass …' },
  { category: 'Findings – Starter', en: 'It can be seen that …', de: 'Es lässt sich erkennen, dass …' },
  {
    category: 'Findings – Starter',
    en: 'Overall, the data indicates that …',
    de: 'Insgesamt deuten die Daten darauf hin, dass …',
  },
  {
    category: 'Findings – Prozent',
    en: 'X% of respondents [verb] A, while Y% [verb] B.',
    de: 'X% der Befragten [verb] A, während Y% B [verb].',
  },
  {
    category: 'Findings – Prozent',
    en: 'A further Z% selected C, and the remaining W% reported no preference.',
    de: 'Weitere Z% wählten C, und die restlichen W% hatten keine Präferenz.',
  },
  {
    category: 'Findings – Prozent',
    en: 'A clear majority (X%) stated that …',
    de: 'Eine deutliche Mehrheit (X%) gab an, dass …',
  },
  {
    category: 'Findings – Prozent',
    en: 'A significant minority (X%) reported that …',
    de: 'Eine bedeutende Minderheit (X%) berichtete, dass …',
  },
  {
    category: 'Findings – Zahlen/Geld/Forecast',
    en: 'Spending on [item] increased from [old] to [new].',
    de: 'Die Ausgaben für [item] stiegen von [old] auf [new].',
  },
  {
    category: 'Findings – Zahlen/Geld/Forecast',
    en: 'Expenditure on [item] remained stable at [figure].',
    de: 'Die Ausgaben für [item] blieben stabil bei [figure].',
  },
  {
    category: 'Findings – Zahlen/Geld/Forecast',
    en: 'The total budget rose from [old] to [new].',
    de: 'Das Gesamtbudget stieg von [old] auf [new].',
  },
  {
    category: 'Findings – Zahlen/Geld/Forecast',
    en: 'The forecast for next year is approximately [figure].',
    de: 'Die Prognose für nächstes Jahr liegt bei etwa [figure].',
  },
  {
    category: 'Comparison',
    en: 'While A offers [advantage], B provides [advantage].',
    de: 'Während A [advantage] bietet, bietet B [advantage].',
  },
  {
    category: 'Comparison',
    en: 'In contrast, B is more [adjective] than A.',
    de: 'Im Gegensatz dazu ist B [adjective]er als A.',
  },
  {
    category: 'Interpretation',
    en: 'This suggests that [interpretation].',
    de: 'Das deutet darauf hin, dass [interpretation].',
  },
  {
    category: 'Recommendations',
    en: 'It is recommended that [action], because this will [benefit].',
    de: 'Es wird empfohlen, [action], da dies [benefit] wird.',
  },
  {
    category: 'Recommendations',
    en: 'Furthermore, [action] should be implemented in order to [benefit].',
    de: 'Außerdem sollte [action] umgesetzt werden, um [benefit] zu erreichen.',
  },
  {
    category: 'Recommendations',
    en: 'Finally, as it may not be possible to [constraint], an alternative should be considered: [alternative].',
    de: 'Schließlich sollte, da [constraint] eventuell nicht möglich ist, eine Alternative in Betracht gezogen werden: [alternative].',
  },
];

function build(prefix: string, items: Omit<PhraseEntry, 'id'>[]): PhraseEntry[] {
  return items.map((item, i) => ({ ...item, id: `${prefix}-${i + 1}` }));
}

export const EMAIL_PHRASES: PhraseEntry[] = build('email-block', EMAIL_BLOCKS);
export const REPORT_PHRASES: PhraseEntry[] = build('report-block', REPORT_BLOCKS);
