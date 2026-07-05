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

export interface LectureChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  tutorial: LectureTutorialStep[];
  exercises: Record<LectureDifficulty, LectureQuestion[]>;
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
