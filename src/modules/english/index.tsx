import { useMemo, useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, Card, PageShell, PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import { CEFR_LEVELS, VOCAB, type CefrLevel, type VocabEntry } from './data';
import { EMAIL_PHRASES, REPORT_PHRASES, type PhraseEntry } from './phrases';
import { EMAIL_EXAMPLES, REPORT_EXAMPLES, type WritingExample } from './writing';
import { gradeCard, isDue, newCardState, previewIntervals, type CardState, type EnglishProgress, type Grade } from './srs';
import { Flashcard, type CardFace } from './Flashcard';
import { WritingCard } from './WritingCard';

// ============================================================
// ENGLISCH-VOKABELTRAINER — eigenständiger Bereich im Hauptmenü.
// Drei Übungsformen, alle mit demselben SM-2-artigen Spaced-
// Repetition-System (srs.ts) und einem gemeinsamen localStorage-
// Fortschritt ('english', ids sind pro Deck eindeutig präfixiert):
//  1) Vokabel-Karteikarten (Englisch -> Deutsch, nach CEFR-Level)
//  2) Redemittel-Karteikarten für E-Mails/Reports (Deutsch -> Englisch,
//     weil in der Klausur die deutsche Vorgabe gegeben ist)
//  3) Schreibtraining: deutsche Vorlage bleibt sichtbar, eigener
//     Entwurf, dann englische Musterlösung aufdecken
// ============================================================

const COLOR = 'var(--english)';
const NEW_CARDS_PER_SESSION = 20;

type Phase = 'select' | 'session';
type ActiveKind = 'flip' | 'writing';

type Selection =
  | { kind: 'vocab'; level: CefrLevel | 'all' }
  | { kind: 'phrases'; which: 'email' | 'report' }
  | { kind: 'writing'; which: 'email' | 'report' };

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function vocabToFace(v: VocabEntry): { front: CardFace; back: CardFace; id: string } {
  return {
    id: v.id,
    front: { eyebrow: `Level ${v.level} · Englisch`, text: v.en, hint: 'Tippen, um die Übersetzung zu sehen' },
    back: { eyebrow: 'Deutsch', text: v.de, hint: 'Tippen, um zurückzudrehen' },
  };
}

function phraseToFace(p: PhraseEntry): { front: CardFace; back: CardFace; id: string } {
  return {
    id: p.id,
    front: { eyebrow: `${p.category} · Deutsch`, text: p.de, hint: 'Tippen, um den englischen Baustein zu sehen' },
    back: { eyebrow: 'Englisch', text: p.en, hint: 'Tippen, um zurückzudrehen' },
  };
}

interface DeckStats {
  total: number;
  due: number;
  learned: number;
}

function deckStats(ids: string[], progress: EnglishProgress, now: number): DeckStats {
  let due = 0;
  let learned = 0;
  for (const id of ids) {
    const state = progress[id];
    if (isDue(state, now)) due += 1;
    if (state && state.repetitions > 0) learned += 1;
  }
  return { total: ids.length, due, learned };
}

export function EnglishTrainer() {
  const nav = useNavigator();
  const [progress, setProgress] = useCloudProgress<EnglishProgress>('english', {});
  const [phase, setPhase] = useState<Phase>('select');
  const [selection, setSelection] = useState<Selection | null>(null);
  const [activeKind, setActiveKind] = useState<ActiveKind>('flip');
  const [flipQueue, setFlipQueue] = useState<ReturnType<typeof vocabToFace>[]>([]);
  const [writingQueue, setWritingQueue] = useState<WritingExample[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState(0);

  const now = Date.now();
  const vocabStatsByLevel = useMemo(() => {
    const byLevel = {} as Record<CefrLevel | 'all', DeckStats>;
    for (const level of CEFR_LEVELS) byLevel[level] = deckStats(VOCAB.filter((v) => v.level === level).map((v) => v.id), progress, now);
    byLevel.all = deckStats(VOCAB.map((v) => v.id), progress, now);
    return byLevel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const emailPhraseStats = useMemo(() => deckStats(EMAIL_PHRASES.map((p) => p.id), progress, now), [progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const reportPhraseStats = useMemo(() => deckStats(REPORT_PHRASES.map((p) => p.id), progress, now), [progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const emailWritingStats = useMemo(() => deckStats(EMAIL_EXAMPLES.map((w) => w.id), progress, now), [progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const reportWritingStats = useMemo(() => deckStats(REPORT_EXAMPLES.map((w) => w.id), progress, now), [progress]); // eslint-disable-line react-hooks/exhaustive-deps

  function startVocab(level: CefrLevel | 'all') {
    const pool = level === 'all' ? VOCAB : VOCAB.filter((v) => v.level === level);
    const due = pool.filter((v) => isDue(progress[v.id], now));
    const reviewCards = due.filter((v) => !!progress[v.id]);
    const newCards = shuffled(due.filter((v) => !progress[v.id])).slice(0, NEW_CARDS_PER_SESSION);

    setSelection({ kind: 'vocab', level });
    setActiveKind('flip');
    setFlipQueue(shuffled([...reviewCards, ...newCards]).map(vocabToFace));
    setIdx(0);
    setRevealed(false);
    setGraded(0);
    setPhase('session');
  }

  function startPhrases(which: 'email' | 'report') {
    const pool = which === 'email' ? EMAIL_PHRASES : REPORT_PHRASES;
    const due = pool.filter((p) => isDue(progress[p.id], now));

    setSelection({ kind: 'phrases', which });
    setActiveKind('flip');
    setFlipQueue(shuffled(due).map(phraseToFace));
    setIdx(0);
    setRevealed(false);
    setGraded(0);
    setPhase('session');
  }

  function startWriting(which: 'email' | 'report') {
    const pool = which === 'email' ? EMAIL_EXAMPLES : REPORT_EXAMPLES;
    const due = pool.filter((w) => isDue(progress[w.id], now));

    setSelection({ kind: 'writing', which });
    setActiveKind('writing');
    setWritingQueue(shuffled(due));
    setIdx(0);
    setRevealed(false);
    setGraded(0);
    setPhase('session');
  }

  function repeatSelection() {
    if (!selection) return;
    if (selection.kind === 'vocab') startVocab(selection.level);
    else if (selection.kind === 'phrases') startPhrases(selection.which);
    else startWriting(selection.which);
  }

  const currentId = activeKind === 'flip' ? flipQueue[idx]?.id : writingQueue[idx]?.id;
  const queueLength = activeKind === 'flip' ? flipQueue.length : writingQueue.length;
  const finished = phase === 'session' && idx >= queueLength;

  function grade(g: Grade) {
    if (!currentId) return;
    setProgress((prev) => ({ ...prev, [currentId]: gradeCard(prev[currentId] ?? newCardState(), g) }));
    setGraded((c) => c + 1);
    setRevealed(false);
    setIdx((i) => i + 1);
  }

  return (
    <PageShell>
      <BackBar
        title="Englisch-Vokabeltrainer"
        onBack={() => (phase === 'session' ? setPhase('select') : nav.popToRoot())}
      />

      {phase === 'select' && (
        <LevelSelect
          vocabStats={vocabStatsByLevel}
          emailPhraseStats={emailPhraseStats}
          reportPhraseStats={reportPhraseStats}
          emailWritingStats={emailWritingStats}
          reportWritingStats={reportWritingStats}
          onSelectVocab={startVocab}
          onSelectPhrases={startPhrases}
          onSelectWriting={startWriting}
        />
      )}

      {phase === 'session' && !finished && activeKind === 'flip' && flipQueue[idx] && (
        <FlipSessionView
          face={flipQueue[idx]}
          state={progress[flipQueue[idx].id]}
          revealed={revealed}
          onToggle={() => setRevealed((f) => !f)}
          onGrade={grade}
          index={idx}
          total={queueLength}
        />
      )}

      {phase === 'session' && !finished && activeKind === 'writing' && writingQueue[idx] && (
        <WritingSessionView
          item={writingQueue[idx]}
          eyebrow={selection?.kind === 'writing' && selection.which === 'email' ? 'E-Mail schreiben' : 'Report schreiben'}
          state={progress[writingQueue[idx].id]}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onGrade={grade}
          index={idx}
          total={queueLength}
        />
      )}

      {phase === 'session' && finished && (
        <SessionDone
          graded={graded}
          hadCards={queueLength > 0}
          onMenu={() => setPhase('select')}
          onRepeat={repeatSelection}
        />
      )}
    </PageShell>
  );
}

function DeckButton({
  title,
  subtitle,
  stats,
  onClick,
}: {
  title: string;
  subtitle: string;
  stats: DeckStats;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative text-left card pl-6 pr-4 py-4 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm" style={{ background: COLOR }} aria-hidden />
      <div className="flex flex-col gap-1.5 items-start">
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-ink font-bold text-base">{title}</span>
          {stats.due > 0 && (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ color: COLOR, backgroundColor: `color-mix(in srgb, ${COLOR} 15%, transparent)` }}
            >
              {stats.due} fällig
            </span>
          )}
        </div>
        <span className="text-sub text-xs">{subtitle}</span>
        <span className="text-sub text-xs">
          {stats.learned} von {stats.total} gelernt
        </span>
        <div className="w-full mt-1">
          <ProgressBar value={stats.total ? stats.learned / stats.total : 0} color={COLOR} />
        </div>
      </div>
    </button>
  );
}

function LevelSelect({
  vocabStats,
  emailPhraseStats,
  reportPhraseStats,
  emailWritingStats,
  reportWritingStats,
  onSelectVocab,
  onSelectPhrases,
  onSelectWriting,
}: {
  vocabStats: Record<CefrLevel | 'all', DeckStats>;
  emailPhraseStats: DeckStats;
  reportPhraseStats: DeckStats;
  emailWritingStats: DeckStats;
  reportWritingStats: DeckStats;
  onSelectVocab: (level: CefrLevel | 'all') => void;
  onSelectPhrases: (which: 'email' | 'report') => void;
  onSelectWriting: (which: 'email' | 'report') => void;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.08em]" style={{ color: COLOR }}>
          ENGLISCH · KARTEIKARTEN & SCHREIBTRAINING
        </span>
        <h1 className="text-ink text-2xl font-bold">Business-English-Vokabeltrainer</h1>
        <p className="text-sub text-sm leading-relaxed">
          {vocabStats.all.total} Vokabeln von Niveau A1 bis C1, dazu Redemittel und Schreibtraining im
          Klausurformat für E-Mails und Reports. Nach jeder Karte schätzt du selbst ein, wie gut du sie
          kanntest — davon hängt ab, wann sie dir wieder gezeigt wird.
        </p>
      </div>

      <button
        onClick={() => onSelectVocab('all')}
        className="relative text-left card pl-6 pr-4 py-4 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm" style={{ background: COLOR }} aria-hidden />
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-ink font-bold text-base">Alle Level</span>
            <span className="text-sub text-xs">
              {vocabStats.all.due} fällig · {vocabStats.all.learned} gelernt von {vocabStats.all.total}
            </span>
          </div>
          <span className="font-bold text-[13px] shrink-0" style={{ color: COLOR }}>
            Starten →
          </span>
        </div>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {CEFR_LEVELS.map((level) => {
          const s = vocabStats[level];
          return (
            <button
              key={level}
              onClick={() => onSelectVocab(level)}
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
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: COLOR, backgroundColor: `color-mix(in srgb, ${COLOR} 15%, transparent)` }}
                    >
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

      <div className="flex flex-col gap-1.5 pt-3">
        <h2 className="text-ink text-lg font-bold">Redemittel & Schreibtraining</h2>
        <p className="text-sub text-sm leading-relaxed">
          Klausurformat: Business-E-Mails und -Reports. Zuerst die Satzbausteine (Deutsch → Englisch), dann
          ganze Beispiele — die deutsche Vorlage bleibt sichtbar, du schreibst deine eigene englische
          Version und deckst danach die Musterlösung auf.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <DeckButton
          title="E-Mail-Bausteine"
          subtitle="12 Redemittel: Opening, Request, Alternative, Close …"
          stats={emailPhraseStats}
          onClick={() => onSelectPhrases('email')}
        />
        <DeckButton
          title="Report-Bausteine"
          subtitle="20 Redemittel: Findings, Vergleich, Empfehlungen …"
          stats={reportPhraseStats}
          onClick={() => onSelectPhrases('report')}
        />
        <DeckButton
          title="E-Mail schreiben üben"
          subtitle="5 Klausur-Szenarien mit Musterlösung"
          stats={emailWritingStats}
          onClick={() => onSelectWriting('email')}
        />
        <DeckButton
          title="Report schreiben üben"
          subtitle="5 Klausur-Reports mit Musterlösung"
          stats={reportWritingStats}
          onClick={() => onSelectWriting('report')}
        />
      </div>
    </div>
  );
}

function SessionProgress({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <ProgressBar value={index / total} color={COLOR} />
      </div>
      <span className="text-sub text-[13px] font-semibold shrink-0">
        {index + 1} / {total}
      </span>
    </div>
  );
}

function GradeRow({ state, onGrade }: { state: CardState | undefined; onGrade: (g: Grade) => void }) {
  const previews = useMemo(() => previewIntervals(state ?? newCardState()), [state]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <GradeButton label="Nochmal" hint={previews.again} color="var(--bad)" onClick={() => onGrade('again')} />
      <GradeButton label="Schwer" hint={previews.hard} color="var(--warn)" onClick={() => onGrade('hard')} />
      <GradeButton label="Gut" hint={previews.good} color={COLOR} onClick={() => onGrade('good')} />
      <GradeButton label="Einfach" hint={previews.easy} color="var(--good)" onClick={() => onGrade('easy')} />
    </div>
  );
}

function FlipSessionView({
  face,
  state,
  revealed,
  onToggle,
  onGrade,
  index,
  total,
}: {
  face: { front: CardFace; back: CardFace; id: string };
  state: CardState | undefined;
  revealed: boolean;
  onToggle: () => void;
  onGrade: (g: Grade) => void;
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SessionProgress index={index} total={total} />

      <Flashcard front={face.front} back={face.back} flipped={revealed} onFlip={onToggle} />

      {!revealed && (
        <SecondaryButton onClick={onToggle} className="self-center">
          Umdrehen
        </SecondaryButton>
      )}

      {revealed && <GradeRow state={state} onGrade={onGrade} />}
    </div>
  );
}

function WritingSessionView({
  item,
  eyebrow,
  state,
  revealed,
  onReveal,
  onGrade,
  index,
  total,
}: {
  item: WritingExample;
  eyebrow: string;
  state: CardState | undefined;
  revealed: boolean;
  onReveal: () => void;
  onGrade: (g: Grade) => void;
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SessionProgress index={index} total={total} />
      <WritingCard item={item} eyebrow={eyebrow} revealed={revealed} onReveal={onReveal} />
      {revealed && <GradeRow state={state} onGrade={onGrade} />}
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
            : 'In diesem Deck gibt es aktuell nichts zu wiederholen. Schau später wieder vorbei, oder wähle ein anderes Deck.'}
        </span>
      </Card>
      <div className="flex flex-col gap-2.5">
        {hadCards && (
          <PrimaryButton color={COLOR} onClick={onRepeat}>
            Nochmal fällige Karten prüfen
          </PrimaryButton>
        )}
        <SecondaryButton onClick={onMenu}>Zurück zur Übersicht</SecondaryButton>
      </div>
    </div>
  );
}
