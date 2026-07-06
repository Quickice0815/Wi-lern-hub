// ============================================================
// VORLESUNGEN — Datentypen. Jedes Kapitel hat ein kurzes Tutorial
// (Lernkarten mit den Kernaussagen der Folien) und drei Übungsstufen
// (leicht / fortgeschritten / profi) mit je eigenen Multiple-Choice-
// Fragen — analog zum SQL-Trainer-Modusprinzip.
// ============================================================

export interface LectureQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface LectureTutorialStep {
  title: string;
  content: string;
}

export type LectureDifficulty = 'easy' | 'advanced' | 'pro';

// ============================================================
// SAP-PRAXIS — optionale vierte Übungsart für einzelne Kapitel:
// ein vereinfachter Nachbau eines SAP-Fiori-Bildschirms, den man
// ausfüllen muss ("Formular"), sowie kurze Fehlermeldungs-Fälle,
// bei denen man die Art der programmierten Kontrolle erkennen muss.
// ============================================================

export interface SapFormField {
  id: string;
  label: string;
  kind: 'text' | 'select';
  options?: string[];
  /** Erwarteter Wert bzw. akzeptierte Varianten (case-insensitive verglichen) — null heißt: Feld muss LEER bleiben. */
  expected: string | string[] | null;
  group: string;
}

export interface SapGivenField {
  label: string;
  value: string;
}

export interface SapFormButton {
  id: string;
  label: string;
}

export interface SapOpenItemChoice {
  id: string;
  label: string;
  correct: boolean;
}

export interface SapFormChallenge {
  id: string;
  title: string;
  screenTitle: string;
  scenario: string;
  instructions: string;
  givenFields: SapGivenField[];
  fields: SapFormField[];
  openItemsLabel?: string;
  openItemChoices?: SapOpenItemChoice[];
  buttons: SapFormButton[];
  explanation: string;
}

export type PruefungsartId = 'format' | 'ausschluss' | 'plausibilitaet' | 'vollstaendigkeit';

export const PRUEFUNGSART_LABELS: Record<PruefungsartId, { label: string; desc: string }> = {
  format: { label: 'Formatprüfung', desc: 'Prüft, ob eine Eingabe dem vorgeschriebenen Format entspricht (z. B. Stellenzahl, Zeichentyp).' },
  ausschluss: { label: 'Ausschlussprüfung', desc: 'Prüft, ob der eingegebene Wert (z. B. ein Konto) im System überhaupt existiert/vorgesehen ist.' },
  plausibilitaet: { label: 'Plausibilitätsprüfung', desc: 'Prüft, ob eine Eingabe inhaltlich sinnvoll ist (z. B. ein realistisches Datum, ein sinnvoller Betrag).' },
  vollstaendigkeit: { label: 'Vollständigkeitsprüfung', desc: 'Prüft, ob alle Pflichtfelder ausgefüllt sind.' },
};

export interface SapBelegLine {
  konto: string;
  soll: string;
  haben: string;
  highlight?: boolean;
}

export interface SapErrorCase {
  id: string;
  title: string;
  scenario: string;
  screenTitle: string;
  belegLines: SapBelegLine[];
  errorMessage: string;
  correctPruefungsart: PruefungsartId;
  explanation: string;
}

export interface LecturePractice {
  intro: string;
  formChallenges: SapFormChallenge[];
  errorCases: SapErrorCase[];
}

export interface LectureChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  tutorial: LectureTutorialStep[];
  exercises: Record<LectureDifficulty, LectureQuestion[]>;
  practice?: LecturePractice;
}

export const DIFFICULTY_LABELS: Record<LectureDifficulty, string> = {
  easy: 'Einfach',
  advanced: 'Fortgeschritten',
  pro: 'Profi',
};

export type LecturesProgress = Record<
  string,
  Partial<Record<LectureDifficulty, { bestScore: number; total: number }>> & { tutorialDone?: boolean }
>;
