import { useMemo, useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, Card, PageShell, PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import { CEFR_LEVELS, VOCAB, type CefrLevel, type VocabEntry } from './data';
import { gradeCard, isDue, newCardState, previewIntervals, type CardState, type EnglishProgress, type Grade } from './srs';
import { Flashcard } from './Flashcard';

// ============================================================
// ENGLISCH-VOKABELTRAINER — eigenständiger Bereich im Hauptmenü.
// Karteikarten mit Spaced-Repetition (SM-2-artig): Level wählen →
// fällige Karten + eine begrenzte Anzahl neuer Karten werden
// abgefragt → Selbsteinschätzung steuert das nächste Intervall.
// Der Fortschritt pro Vokabel liegt in localStorage (useCloudProgress).
// ============================================================

const COLOR = 'var(--english)';
const NEW_CARDS_PER_SESSION = 20;

type Phase = 'select' | 'session';

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface LevelStats {
  total: number;
  due: number;
  learned: number;
}

function computeStats(progress: EnglishProgress, now: number): Record<CefrLevel | 'all', LevelStats> {
  const byLevel = {} as Record<CefrLevel | 'all', LevelStats>;
  for (const level of CEFR_LEVELS) byLevel[level] = { total: 0, due: 0, learned: 0 };
  byLevel.all = { total: 0, due: 0, learned: 0 };

  for (const entry of VOCAB) {
    const state = progress[entry.id];
    const due = isDue(state, now);
    const learned = !!state && state.repetitions > 0;
    for (const key of [entry.level, 'all'] as const) {
      byLevel[key].total += 1;
      if (due) byLevel[key].due += 1;
      if (learned) byLevel[key].learned += 1;
    }
  }
  return byLevel;
}

export function EnglishTrainer() {
  const nav = useNavigator();
  const [progress, setProgress] = useCloudProgress<EnglishProgress>('english', {});
  const [phase, setPhase] = useState<Phase>('select');
  const [levelFilter, setLevelFilter] = useState<CefrLevel | 'all'>('all');
  const [queue, setQueue] = useState<VocabEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [graded, setGraded] = useState(0);

  const stats = useMemo(() => computeStats(progress, Date.now()), [progress]);

  function startSession(level: CefrLevel | 'all') {
    const now = Date.now();
    const pool = level === 'all' ? VOCAB : VOCAB.filter((v) => v.level === level);
    const due = pool.filter((v) => isDue(progress[v.id], now));
    const reviewCards = due.filter((v) => !!progress[v.id]);
    const newCards = shuffled(due.filter((v) => !progress[v.id])).slice(0, NEW_CARDS_PER_SESSION);

    setLevelFilter(level);
    setQueue(shuffled([...reviewCards, ...newCards]));
    setIdx(0);
    setFlipped(false);
    setGraded(0);
    setPhase('session');
  }

  function grade(g: Grade) {
    const entry = queue[idx];
    if (!entry) return;
    setProgress((prev) => ({ ...prev, [entry.id]: gradeCard(prev[entry.id] ?? newCardState(), g) }));
    setGraded((c) => c + 1);
    setFlipped(false);
    setIdx((i) => i + 1);
  }

  const current = queue[idx];
  const finished = phase === 'session' && idx >= queue.length;

  return (
    <PageShell>
      <BackBar
        title="Englisch-Vokabeltrainer"
        onBack={() => (phase === 'session' ? setPhase('select') : nav.popToRoot())}
      />

      {phase === 'select' && <LevelSelect stats={stats} onSelect={startSession} />}

      {phase === 'session' && !finished && current && (
        <SessionView
          entry={current}
          state={progress[current.id]}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onGrade={grade}
          index={idx}
          total={queue.length}
        />
      )}

      {phase === 'session' && finished && (
        <SessionDone
          graded={graded}
          hadCards={queue.length > 0}
          onMenu={() => setPhase('select')}
          onRepeat={() => startSession(levelFilter)}
        />
      )}
    </PageShell>
  );
}

function LevelSelect({
  stats,
  onSelect,
}: {
  stats: Record<CefrLevel | 'all', LevelStats>;
  onSelect: (level: CefrLevel | 'all') => void;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.08em]" style={{ color: COLOR }}>
          ENGLISCH · KARTEIKARTEN
        </span>
        <h1 className="text-ink text-2xl font-bold">Business-English-Vokabeltrainer</h1>
        <p className="text-sub text-sm leading-relaxed">
          {stats.all.total} Vokabeln von Niveau A1 bis C1. Wähle ein Level oder trainiere alle fälligen
          Karten zusammen. Nach jeder Karte schätzt du selbst ein, wie gut du sie kanntest — davon hängt
          ab, wann sie dir wieder gezeigt wird.
        </p>
      </div>

      <button
        onClick={() => onSelect('all')}
        className="relative text-left card pl-6 pr-4 py-4 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm" style={{ background: COLOR }} aria-hidden />
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-ink font-bold text-base">Alle Level</span>
            <span className="text-sub text-xs">
              {stats.all.due} fällig · {stats.all.learned} gelernt von {stats.all.total}
            </span>
          </div>
          <span className="font-bold text-[13px] shrink-0" style={{ color: COLOR }}>
            Starten →
          </span>
        </div>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {CEFR_LEVELS.map((level) => {
          const s = stats[level];
          return (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className="relative text-left card pl-6 pr-4 py-4 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm"
                style={{ background: COLOR }}
                aria-hidden
              />
              <div className="flex flex-col gap-1.5 items-start">
                <div className="flex items-center justify-between w-full">
                  <span className="text-ink font-bold text-base">Level {level}</span>
                  {s.due > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ color: COLOR, backgroundColor: `color-mix(in srgb, ${COLOR} 15%, transparent)` }}>
                      {s.due} fällig
                    </span>
                  )}
                </div>
                <span className="text-sub text-xs">
                  {s.learned} von {s.total} Vokabeln gelernt
                </span>
                <div className="w-full mt-1">
                  <ProgressBar value={s.total ? s.learned / s.total : 0} color={COLOR} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SessionView({
  entry,
  state,
  flipped,
  onFlip,
  onGrade,
  index,
  total,
}: {
  entry: VocabEntry;
  state: CardState | undefined;
  flipped: boolean;
  onFlip: () => void;
  onGrade: (g: Grade) => void;
  index: number;
  total: number;
}) {
  const previews = useMemo(() => previewIntervals(state ?? newCardState()), [state]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={index / total} color={COLOR} />
        </div>
        <span className="text-sub text-[13px] font-semibold shrink-0">
          {index + 1} / {total}
        </span>
      </div>

      <Flashcard entry={entry} flipped={flipped} onFlip={onFlip} />

      {!flipped && (
        <SecondaryButton onClick={onFlip} className="self-center">
          Umdrehen
        </SecondaryButton>
      )}

      {flipped && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <GradeButton label="Nochmal" hint={previews.again} color="var(--bad)" onClick={() => onGrade('again')} />
          <GradeButton label="Schwer" hint={previews.hard} color="var(--warn)" onClick={() => onGrade('hard')} />
          <GradeButton label="Gut" hint={previews.good} color={COLOR} onClick={() => onGrade('good')} />
          <GradeButton label="Einfach" hint={previews.easy} color="var(--good)" onClick={() => onGrade('easy')} />
        </div>
      )}
    </div>
  );
}

function GradeButton({
  label,
  hint,
  color,
  onClick,
}: {
  label: string;
  hint: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 rounded-[10px] py-3 text-center transition-transform duration-150 active:scale-95"
      style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, border: `1.5px solid ${color}` }}
    >
      <span className="font-bold text-[14px]" style={{ color }}>
        {label}
      </span>
      <span className="text-sub text-[11px]">{hint}</span>
    </button>
  );
}

function SessionDone({
  graded,
  hadCards,
  onMenu,
  onRepeat,
}: {
  graded: number;
  hadCards: boolean;
  onMenu: () => void;
  onRepeat: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Card className="p-7 flex flex-col items-center gap-2.5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: COLOR }}>
          {hadCards ? 'Session abgeschlossen' : 'Nichts zu tun'}
        </span>
        <span className="text-4xl" aria-hidden>
          {hadCards ? '🎉' : '✅'}
        </span>
        <span className="text-ink text-[18px] font-bold">
          {hadCards ? `${graded} Karte${graded === 1 ? '' : 'n'} wiederholt` : 'Keine fälligen Karten mehr'}
        </span>
        <span className="text-sub text-[14px]">
          {hadCards
            ? 'Dein Fortschritt wurde gespeichert. Neue Karten werden fällig, sobald ihr Intervall abgelaufen ist.'
            : 'In diesem Level gibt es aktuell nichts zu wiederholen. Schau später wieder vorbei, oder wähle ein anderes Level.'}
        </span>
      </Card>
      <div className="flex flex-col gap-2.5">
        {hadCards && (
          <PrimaryButton color={COLOR} onClick={onRepeat}>
            Nochmal fällige Karten prüfen
          </PrimaryButton>
        )}
        <SecondaryButton onClick={onMenu}>Zurück zur Levelauswahl</SecondaryButton>
      </div>
    </div>
  );
}
