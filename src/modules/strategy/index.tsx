import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, PageShell, ProgressBar } from '../../components/ui';
import { DIAGRAMS, CASE_STUDIES, TERM_MATCH_SETS } from './data';
import type { Difficulty } from './types';
import { DIFFICULTY_INFO } from './types';
import { StrategyTutorial } from './Tutorial';
import { DiagramLabeling } from './DiagramLabeling';
import { CaseStudyPriority } from './CaseStudyPriority';
import { TermMatch } from './TermMatch';

// ============================================================
// STRATEGIE & FÜHRUNG — Menü → Schwierigkeitsstufe → Übungen.
// Analog zu PapQuest/RasterTrainer lebt der gesamte Ablauf als
// lokaler State hinter genau einer Route ('strategyHub').
// ============================================================

type ExerciseKind = 'diagram' | 'case' | 'term';
type View =
  | { kind: 'menu' }
  | { kind: 'levelSelect'; exercise: ExerciseKind }
  | { kind: ExerciseKind; difficulty: Difficulty; index: number }
  | { kind: 'done'; exercise: ExerciseKind; difficulty: Difficulty };

interface StrategyProgress {
  onboardingSeen: boolean;
  completedDiagrams: string[];
  completedCases: string[];
  completedTerms: string[];
}

const initialProgress: StrategyProgress = {
  onboardingSeen: false,
  completedDiagrams: [],
  completedCases: [],
  completedTerms: [],
};

const EXERCISE_INFO: Record<ExerciseKind, { icon: string; title: string; desc: string }> = {
  diagram: {
    icon: '📊',
    title: 'Diagramme beschriften',
    desc: 'BCG-Matrix, Ansoff, Five-Forces, Reifegradmodell, Johari-Fenster u. v. m.: Achsen und Felder Schritt für Schritt richtig platzieren.',
  },
  case: {
    icon: '🧭',
    title: 'Fallstudien anwenden',
    desc: 'Modelle auf konkrete, leicht verständliche Beispiele anwenden: Beobachtungen per Drag & Drop in die richtige Zelle einsortieren.',
  },
  term: {
    icon: '✏️',
    title: 'Lückentext-Matching',
    desc: 'Fachbegriffe aktiv in Definitionstexte einsetzen statt nur zu lesen.',
  },
};

const DIFFICULTY_ORDER: Difficulty[] = ['anfaenger', 'fortgeschritten', 'profi'];

function listFor(kind: ExerciseKind) {
  return kind === 'diagram' ? DIAGRAMS : kind === 'case' ? CASE_STUDIES : TERM_MATCH_SETS;
}

function listForLevel(kind: ExerciseKind, difficulty: Difficulty) {
  return listFor(kind).filter((item) => item.difficulty === difficulty);
}

export function StrategyHub() {
  const nav = useNavigator();
  const [progress, setProgress] = useCloudProgress<StrategyProgress>('strategy', initialProgress);
  const [view, setView] = useState<View>({ kind: 'menu' });
  const [showTutorial, setShowTutorial] = useState(!progress.onboardingSeen);

  function finishOnboarding() {
    setShowTutorial(false);
    setProgress((p) => ({ ...p, onboardingSeen: true }));
  }

  function markCompleted(kind: ExerciseKind, id: string) {
    setProgress((p) => {
      const key = kind === 'diagram' ? 'completedDiagrams' : kind === 'case' ? 'completedCases' : 'completedTerms';
      const list = p[key];
      return list.includes(id) ? p : { ...p, [key]: [...list, id] };
    });
  }

  function advance(kind: ExerciseKind, difficulty: Difficulty) {
    const items = listForLevel(kind, difficulty);
    const current = view.kind === kind ? (view as { index: number }).index : 0;
    markCompleted(kind, (items[current] as { id: string }).id);
    if (current + 1 < items.length) {
      setView({ kind, difficulty, index: current + 1 });
    } else {
      setView({ kind: 'done', exercise: kind, difficulty });
    }
  }

  const doneListFor = (kind: ExerciseKind) =>
    kind === 'diagram' ? progress.completedDiagrams : kind === 'case' ? progress.completedCases : progress.completedTerms;

  const totalDone = progress.completedDiagrams.length + progress.completedCases.length + progress.completedTerms.length;
  const totalAll = DIAGRAMS.length + CASE_STUDIES.length + TERM_MATCH_SETS.length;

  function goBack() {
    if (view.kind === 'menu') {
      nav.popToRoot();
    } else if (view.kind === 'levelSelect') {
      setView({ kind: 'menu' });
    } else {
      const exercise = view.kind === 'done' ? view.exercise : view.kind;
      setView({ kind: 'levelSelect', exercise });
    }
  }

  return (
    <PageShell>
      <BackBar title="Strategie & Führung" onBack={goBack} />

      {showTutorial && <StrategyTutorial onDone={finishOnboarding} />}

      {view.kind === 'menu' && (
        <div className="flex flex-col gap-4">
          <div className="card p-5 flex flex-col gap-2 animate-fade-in-up">
            <p className="text-ink text-[15px] leading-relaxed">
              Statt Definitionen auswendig zu lernen, wendest du hier Strategie- und Führungsmodelle aktiv an:
              Diagramme Schritt für Schritt beschriften, Modelle auf Beispiele anwenden und Fachbegriffe im Kontext
              einsetzen — von Anfänger bis Profi.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <ProgressBar value={totalAll ? totalDone / totalAll : 0} color="var(--strategy)" />
              <span className="text-xs font-semibold text-sub shrink-0">
                {totalDone}/{totalAll}
              </span>
            </div>
            <button
              className="text-xs font-semibold text-left mt-1 w-fit hover:underline"
              style={{ color: 'var(--strategy)' }}
              onClick={() => setShowTutorial(true)}
            >
              ↻ Tutorial erneut ansehen
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {(Object.keys(EXERCISE_INFO) as ExerciseKind[]).map((kind) => {
              const info = EXERCISE_INFO[kind];
              const items = listFor(kind);
              const doneList = doneListFor(kind);
              return (
                <button
                  key={kind}
                  onClick={() => setView({ kind: 'levelSelect', exercise: kind })}
                  className="card text-left p-5 flex flex-col gap-2.5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-3xl leading-none">{info.icon}</span>
                    <span
                      className="pill shrink-0"
                      style={{ color: 'var(--strategy)', background: 'color-mix(in srgb, var(--strategy) 15%, transparent)' }}
                    >
                      {doneList.length}/{items.length}
                    </span>
                  </div>
                  <h3 className="text-ink font-bold text-lg">{info.title}</h3>
                  <p className="text-sub text-[13.5px] leading-relaxed">{info.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {view.kind === 'levelSelect' && (
        <LevelSelect
          exercise={view.exercise}
          doneIds={doneListFor(view.exercise)}
          onPick={(difficulty) => setView({ kind: view.exercise, difficulty, index: 0 })}
        />
      )}

      {(view.kind === 'diagram' || view.kind === 'case' || view.kind === 'term') && (
        <ExerciseRunner view={view} onAdvance={() => advance(view.kind, view.difficulty)} />
      )}

      {view.kind === 'done' && (
        <DoneView
          exercise={view.exercise}
          difficulty={view.difficulty}
          onRestart={() => setView({ kind: view.exercise, difficulty: view.difficulty, index: 0 })}
          onNextLevel={(difficulty) => setView({ kind: view.exercise, difficulty, index: 0 })}
          onLevelSelect={() => setView({ kind: 'levelSelect', exercise: view.exercise })}
        />
      )}
    </PageShell>
  );
}

function LevelSelect({
  exercise,
  doneIds,
  onPick,
}: {
  exercise: ExerciseKind;
  doneIds: string[];
  onPick: (difficulty: Difficulty) => void;
}) {
  const info = EXERCISE_INFO[exercise];
  return (
    <div className="flex flex-col gap-3.5 animate-fade-in-up">
      <h1 className="text-ink font-bold text-xl">
        {info.icon} {info.title}
      </h1>
      <p className="text-sub text-[13.5px]">Wähle deine Schwierigkeitsstufe.</p>
      <div className="grid grid-cols-1 gap-3">
        {DIFFICULTY_ORDER.map((difficulty) => {
          const items = listForLevel(exercise, difficulty);
          if (items.length === 0) return null;
          const doneCount = items.filter((it) => doneIds.includes(it.id)).length;
          const d = DIFFICULTY_INFO[difficulty];
          return (
            <button
              key={difficulty}
              onClick={() => onPick(difficulty)}
              className="card text-left p-5 flex flex-col gap-1.5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-ink font-bold text-lg">{d.label}</h3>
                <span
                  className="pill shrink-0"
                  style={{ color: 'var(--strategy)', background: 'color-mix(in srgb, var(--strategy) 15%, transparent)' }}
                >
                  {doneCount}/{items.length}
                </span>
              </div>
              <p className="text-sub text-[13.5px] leading-relaxed">{d.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ExerciseRunner({
  view,
  onAdvance,
}: {
  view: { kind: ExerciseKind; difficulty: Difficulty; index: number };
  onAdvance: () => void;
}) {
  const items = listForLevel(view.kind, view.difficulty);
  const info = EXERCISE_INFO[view.kind];
  const d = DIFFICULTY_INFO[view.difficulty];

  return (
    <div className="flex flex-col gap-3.5 animate-fade-in-up">
      <p className="text-[11px] font-semibold text-sub">
        {info.icon} {info.title.toUpperCase()} · {d.label} · {view.index + 1}/{items.length}
      </p>
      <ProgressBar value={(view.index + 1) / items.length} color="var(--strategy)" />

      {view.kind === 'diagram' && (
        <div key={items[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-1">{items[view.index].title}</h2>
          <p className="text-sub text-[13px] mb-4">{(items[view.index] as (typeof DIAGRAMS)[number]).subtitle}</p>
          <DiagramLabeling diagram={items[view.index] as (typeof DIAGRAMS)[number]} onComplete={onAdvance} />
        </div>
      )}

      {view.kind === 'case' && (
        <div key={items[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-3">{items[view.index].title}</h2>
          <CaseStudyPriority caseStudy={items[view.index] as (typeof CASE_STUDIES)[number]} onComplete={onAdvance} />
        </div>
      )}

      {view.kind === 'term' && (
        <div key={items[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-3">{items[view.index].title}</h2>
          <TermMatch set={items[view.index] as (typeof TERM_MATCH_SETS)[number]} onComplete={onAdvance} />
        </div>
      )}
    </div>
  );
}

function DoneView({
  exercise,
  difficulty,
  onRestart,
  onNextLevel,
  onLevelSelect,
}: {
  exercise: ExerciseKind;
  difficulty: Difficulty;
  onRestart: () => void;
  onNextLevel: (difficulty: Difficulty) => void;
  onLevelSelect: () => void;
}) {
  const info = EXERCISE_INFO[exercise];
  const d = DIFFICULTY_INFO[difficulty];
  const nextDifficulty = DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(difficulty) + 1];
  const hasNext = nextDifficulty && listForLevel(exercise, nextDifficulty).length > 0;

  return (
    <div
      className="flex flex-col items-center gap-3.5 p-7 rounded-2xl text-center animate-fade-in-up"
      style={{
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--strategy) 15%, transparent), transparent)',
        border: '1px solid color-mix(in srgb, var(--strategy) 45%, transparent)',
      }}
    >
      <span className="text-[44px] leading-none">🏆</span>
      <h2 className="text-[22px] font-bold text-ink">
        {info.title} — {d.label} abgeschlossen!
      </h2>
      <p className="text-sm text-ink/85 max-w-md leading-relaxed">
        Du hast alle Übungen dieser Stufe gemeistert. Wiederhole sie jederzeit oder steig eine Stufe höher ein.
      </p>
      <div className="flex flex-wrap gap-2.5 justify-center pt-1">
        {hasNext && (
          <button className="btn-primary" style={{ background: 'var(--strategy)' }} onClick={() => onNextLevel(nextDifficulty)}>
            {DIFFICULTY_INFO[nextDifficulty].label} ausprobieren →
          </button>
        )}
        <button className="btn-secondary" onClick={onRestart}>
          Nochmal üben 🔁
        </button>
        <button className="btn-secondary" onClick={onLevelSelect}>
          ← Schwierigkeit wählen
        </button>
      </div>
    </div>
  );
}
