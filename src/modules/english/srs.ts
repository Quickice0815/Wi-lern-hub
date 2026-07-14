// ============================================================
// SPACED REPETITION — SM-2-inspiriertes Intervall-System (wie
// Anki/SuperMemo-2), gesteuert über 4 Selbsteinschätzungs-Stufen.
// Der Fortschritt pro Vokabel-id wird über useCloudProgress in
// localStorage (und optional Supabase) persistiert.
// ============================================================

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface CardState {
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: number;
  lastGrade?: Grade;
}

export type EnglishProgress = Record<string, CardState>;

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

export function newCardState(): CardState {
  return { repetitions: 0, easeFactor: DEFAULT_EASE, intervalDays: 0, dueAt: 0 };
}

// Nächstes Intervall & Fälligkeitsdatum nach Selbsteinschätzung berechnen.
export function gradeCard(prev: CardState, grade: Grade, now: number = Date.now()): CardState {
  const ease = prev.easeFactor || DEFAULT_EASE;

  if (grade === 'again') {
    return {
      repetitions: 0,
      easeFactor: Math.max(MIN_EASE, ease - 0.2),
      intervalDays: 0,
      dueAt: now + 2 * MINUTE,
      lastGrade: grade,
    };
  }

  if (grade === 'hard') {
    const intervalDays = prev.repetitions === 0 ? 1 : Math.max(1, Math.round(prev.intervalDays * 1.2));
    return {
      repetitions: prev.repetitions,
      easeFactor: Math.max(MIN_EASE, ease - 0.15),
      intervalDays,
      dueAt: now + intervalDays * DAY,
      lastGrade: grade,
    };
  }

  // good / easy: reguläre SM-2-Progression
  let intervalDays: number;
  if (prev.repetitions === 0) intervalDays = 1;
  else if (prev.repetitions === 1) intervalDays = 6;
  else intervalDays = Math.round(prev.intervalDays * ease);

  if (grade === 'easy') {
    intervalDays = Math.round(intervalDays * 1.3);
  }

  return {
    repetitions: prev.repetitions + 1,
    easeFactor: grade === 'easy' ? Math.min(3.2, ease + 0.15) : ease,
    intervalDays,
    dueAt: now + intervalDays * DAY,
    lastGrade: grade,
  };
}

export function isDue(state: CardState | undefined, now: number = Date.now()): boolean {
  if (!state) return true;
  return state.dueAt <= now;
}

export function formatInterval(days: number): string {
  if (days < 1) return '< 1 Tag';
  if (days === 1) return '1 Tag';
  if (days < 30) return `${days} Tage`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return months === 1 ? '1 Monat' : `${months} Monate`;
  }
  const years = Math.round((days / 365) * 10) / 10;
  return `${years} Jahre`;
}

// Vorschau-Intervalle für die 4 Buttons (Anzeige unter "Nochmal/Schwer/Gut/Einfach").
export function previewIntervals(prev: CardState, now: number = Date.now()): Record<Grade, string> {
  const grades: Grade[] = ['again', 'hard', 'good', 'easy'];
  const out = {} as Record<Grade, string>;
  for (const g of grades) {
    const next = gradeCard(prev, g, now);
    out[g] = next.intervalDays < 1 ? '<10 Min' : formatInterval(next.intervalDays);
  }
  return out;
}
