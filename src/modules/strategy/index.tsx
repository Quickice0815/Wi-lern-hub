import { useState } from 'react';
import { useCloudProgress } from '../../lib/progress';
import { AuthWidget } from '../../components/AuthWidget';
import { ProgressBar } from '../../components/ui';
import { DIAGRAMS, CASE_STUDIES, TERM_MATCH_SETS } from './data';
import { StrategyTutorial } from './Tutorial';
import { DiagramLabeling } from './DiagramLabeling';
import { CaseStudyPriority } from './CaseStudyPriority';
import { TermMatch } from './TermMatch';

// ============================================================
// STRATEGIE UND FÜHRUNG — eigenständige Lern-App (kein Teil des
// WI-Lern-Hub-Navigators). Eigene Startseite/Branding, der gesamte
// Ablauf lebt als lokaler State in dieser einen Komponente.
// ============================================================

type ExerciseKind = 'diagram' | 'case' | 'term';
type View = { kind: 'menu' } | { kind: ExerciseKind; index: number } | { kind: 'done'; exercise: ExerciseKind };

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
    desc: 'BCG-Matrix, Five-Forces & Reifegradmodell: Achsen und Felder per Drag & Drop richtig platzieren.',
  },
  case: {
    icon: '🧭',
    title: 'Fallstudien priorisieren',
    desc: 'Ein Führungsproblem lösen: Maßnahmen per Drag & Drop in die richtige Matrix-Zelle einsortieren.',
  },
  term: {
    icon: '✏️',
    title: 'Lückentext-Matching',
    desc: 'Fachbegriffe aktiv in Definitionstexte einsetzen statt nur zu lesen.',
  },
};

function listFor(kind: ExerciseKind) {
  return kind === 'diagram' ? DIAGRAMS : kind === 'case' ? CASE_STUDIES : TERM_MATCH_SETS;
}

export function StrategyApp() {
  const [progress, setProgress] = useCloudProgress<StrategyProgress>('strategy', initialProgress);
  const [view, setView] = useState<View>({ kind: 'menu' });
  const [showTutorial, setShowTutorial] = useState(!progress.onboardingSeen);

  function finishOnboarding() {
    setShowTutorial(false);
    setProgress((p) => ({ ...p, onboardingSeen: true }));
  }

  function startExercise(kind: ExerciseKind) {
    setView({ kind, index: 0 });
  }

  function markCompleted(kind: ExerciseKind, id: string) {
    setProgress((p) => {
      const key = kind === 'diagram' ? 'completedDiagrams' : kind === 'case' ? 'completedCases' : 'completedTerms';
      const list = p[key];
      return list.includes(id) ? p : { ...p, [key]: [...list, id] };
    });
  }

  function advance(kind: ExerciseKind) {
    const items = listFor(kind);
    const current = view.kind === kind ? (view as { index: number }).index : 0;
    markCompleted(kind, (items[current] as { id: string }).id);
    if (current + 1 < items.length) {
      setView({ kind, index: current + 1 });
    } else {
      setView({ kind: 'done', exercise: kind });
    }
  }

  const totalDone = progress.completedDiagrams.length + progress.completedCases.length + progress.completedTerms.length;
  const totalAll = DIAGRAMS.length + CASE_STUDIES.length + TERM_MATCH_SETS.length;
  const onMenu = view.kind === 'menu';

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-bg/85 border-b border-line">
        <div className="mx-auto max-w-3xl px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center font-extrabold text-white text-sm shrink-0"
              style={{ background: 'var(--strategy)' }}
            >
              S
            </div>
            <span className="font-bold text-ink tracking-tight">Strategie und Führung</span>
          </div>
          <AuthWidget />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-6 pb-16">
        {showTutorial && <StrategyTutorial onDone={finishOnboarding} />}

        {onMenu ? (
          <>
            <section className="pt-4 pb-2">
              <p className="font-bold text-xs tracking-[0.08em] mb-3" style={{ color: 'var(--strategy)' }}>
                STRATEGIE &amp; FÜHRUNG · KLAUSURVORBEREITUNG
              </p>
              <h1 className="text-ink font-extrabold leading-[1.08] text-[32px] sm:text-[40px]">
                Strategie und Führung anwenden statt auswendig lernen.
              </h1>
              <p className="text-sub text-[15px] sm:text-base mt-4 leading-relaxed">
                Statt Definitionen zu pauken, wendest du hier Strategie- und Führungsmodelle aktiv an: Diagramme
                selbst beschriften, Fallstudien lösen und Fachbegriffe im Kontext einsetzen.
              </p>
            </section>

            <div className="card p-5 flex flex-col gap-2 animate-fade-in-up mt-4">
              <div className="flex items-center gap-2">
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

            <div className="grid grid-cols-1 gap-3.5 mt-4">
              {(Object.keys(EXERCISE_INFO) as ExerciseKind[]).map((kind) => {
                const info = EXERCISE_INFO[kind];
                const items = listFor(kind);
                const doneList =
                  kind === 'diagram'
                    ? progress.completedDiagrams
                    : kind === 'case'
                      ? progress.completedCases
                      : progress.completedTerms;
                return (
                  <button
                    key={kind}
                    onClick={() => startExercise(kind)}
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
          </>
        ) : (
          <>
            <button
              onClick={() => setView({ kind: 'menu' })}
              className="flex items-center gap-1.5 text-sub hover:text-ink transition-colors text-sm font-semibold mb-5"
            >
              <span aria-hidden>←</span> Übungstypen
            </button>

            {(view.kind === 'diagram' || view.kind === 'case' || view.kind === 'term') && (
              <ExerciseRunner view={view as { kind: ExerciseKind; index: number }} onAdvance={advance} />
            )}

            {view.kind === 'done' && (
              <DoneView
                exercise={view.exercise}
                onRestart={() => setView({ kind: view.exercise, index: 0 })}
                onHome={() => setView({ kind: 'menu' })}
              />
            )}
          </>
        )}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center">
          <p className="text-sub text-xs">© {new Date().getFullYear()} Strategie und Führung</p>
        </div>
      </footer>
    </div>
  );
}

function ExerciseRunner({
  view,
  onAdvance,
}: {
  view: { kind: ExerciseKind; index: number };
  onAdvance: (kind: ExerciseKind) => void;
}) {
  const items = listFor(view.kind);
  const info = EXERCISE_INFO[view.kind];

  return (
    <div className="flex flex-col gap-3.5 animate-fade-in-up">
      <p className="text-[11px] font-semibold text-sub">
        {info.icon} {info.title.toUpperCase()} · {view.index + 1}/{items.length}
      </p>
      <ProgressBar value={(view.index + 1) / items.length} color="var(--strategy)" />

      {view.kind === 'diagram' && (
        <div key={DIAGRAMS[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-1">{DIAGRAMS[view.index].title}</h2>
          <p className="text-sub text-[13px] mb-4">{DIAGRAMS[view.index].subtitle}</p>
          <DiagramLabeling diagram={DIAGRAMS[view.index]} onComplete={() => onAdvance('diagram')} />
        </div>
      )}

      {view.kind === 'case' && (
        <div key={CASE_STUDIES[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-3">{CASE_STUDIES[view.index].title}</h2>
          <CaseStudyPriority caseStudy={CASE_STUDIES[view.index]} onComplete={() => onAdvance('case')} />
        </div>
      )}

      {view.kind === 'term' && (
        <div key={TERM_MATCH_SETS[view.index].id} className="card p-5">
          <h2 className="text-ink font-bold text-lg mb-3">{TERM_MATCH_SETS[view.index].title}</h2>
          <TermMatch set={TERM_MATCH_SETS[view.index]} onComplete={() => onAdvance('term')} />
        </div>
      )}
    </div>
  );
}

function DoneView({
  exercise,
  onRestart,
  onHome,
}: {
  exercise: ExerciseKind;
  onRestart: () => void;
  onHome: () => void;
}) {
  const info = EXERCISE_INFO[exercise];
  return (
    <div
      className="flex flex-col items-center gap-3.5 p-7 rounded-2xl text-center animate-fade-in-up"
      style={{
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--strategy) 15%, transparent), transparent)',
        border: '1px solid color-mix(in srgb, var(--strategy) 45%, transparent)',
      }}
    >
      <span className="text-[44px] leading-none">🏆</span>
      <h2 className="text-[22px] font-bold text-ink">{info.title} abgeschlossen!</h2>
      <p className="text-sm text-ink/85 max-w-md leading-relaxed">
        Du hast alle Übungen in diesem Bereich gemeistert. Wiederhole sie jederzeit oder wähle einen anderen Übungstyp.
      </p>
      <div className="flex flex-wrap gap-2.5 justify-center pt-1">
        <button className="btn-primary" style={{ background: 'var(--strategy)' }} onClick={onRestart}>
          Nochmal üben 🔁
        </button>
        <button className="btn-secondary" onClick={onHome}>
          ← Übungstypen
        </button>
      </div>
    </div>
  );
}
