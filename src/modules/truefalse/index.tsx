import { useMemo, useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, Card, FeedbackBox, PageShell, PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import { STATEMENTS, type TrueFalseStatement } from './data';

// ============================================================
// RICHTIG-ODER-FALSCH-TRAINER — eigenständiges Programm im
// Themenbereich Wirtschaftsinformatik. Nutzer klickt pro
// Behauptung nur Ja oder Nein; die Begründung liefert die App
// direkt danach, unabhängig davon ob richtig oder falsch
// geklickt wurde.
// ============================================================

const COLOR = 'var(--truefalse)';

interface AnswerRecord {
  statement: TrueFalseStatement;
  picked: boolean;
  isCorrect: boolean;
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface ReasonOption {
  text: string;
  correct: boolean;
}

// reasons[0] ist per Konvention (siehe data.ts) immer die richtige Begründung.
function shuffledReasons(reasons: string[]): ReasonOption[] {
  return shuffled(reasons.map((text, i) => ({ text, correct: i === 0 })));
}

type Phase = 'intro' | 'quiz' | 'done';

interface TrueFalseProgress {
  bestScore?: number;
  total?: number;
}

export function TrueFalseTrainer() {
  const nav = useNavigator();
  const [phase, setPhase] = useState<Phase>('intro');
  const [order, setOrder] = useState<TrueFalseStatement[]>(() => shuffled(STATEMENTS));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [reasonPicked, setReasonPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [, setProgress] = useCloudProgress<TrueFalseProgress>('truefalse', {});

  function start() {
    setOrder(shuffled(STATEMENTS));
    setIndex(0);
    setPicked(null);
    setReasonPicked(null);
    setAnswers([]);
    setPhase('quiz');
  }

  function choose(value: boolean) {
    if (picked !== null) return;
    setPicked(value);
    const statement = order[index];
    setAnswers((a) => [...a, { statement, picked: value, isCorrect: value === statement.correct }]);
  }

  function goNext() {
    if (index + 1 < order.length) {
      setIndex((i) => i + 1);
      setPicked(null);
      setReasonPicked(null);
    } else {
      const finalScore = answers.filter((a) => a.isCorrect).length;
      setProgress((prev) => ({
        bestScore: Math.max(prev.bestScore ?? 0, finalScore),
        total: order.length,
      }));
      setPhase('done');
    }
  }

  const statement = order[index];
  const answered = picked !== null;
  const isCorrect = answered && picked === statement.correct;
  // Nur wenn die Aussage falsch ist UND der Nutzer korrekt "Nein" geklickt hat,
  // fragt die App zusätzlich nach der Begründung.
  const showReasonPicker = answered && picked === false && !statement.correct && !!statement.reasons;
  const reasonOptions = useMemo(
    () => (statement.reasons ? shuffledReasons(statement.reasons) : null),
    [statement.reasons],
  );
  const readyForNext = answered && (!showReasonPicker || reasonPicked !== null);

  return (
    <PageShell>
      <BackBar
        title="Richtig oder Falsch?"
        onBack={() => (phase === 'quiz' ? setPhase('intro') : nav.popToRoot())}
      />

      {phase === 'intro' && <Intro onStart={start} />}

      {phase === 'quiz' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar value={index / order.length} color={COLOR} />
            </div>
            <span className="text-sub text-[13px] font-semibold shrink-0">
              {index + 1} / {order.length}
            </span>
          </div>

          <Card className="p-5 flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: COLOR }}>
              Behauptung {statement.id}
            </span>
            <h2 className="text-ink text-[17px] font-bold leading-snug">{statement.text}</h2>

            <div className="grid grid-cols-2 gap-3">
              <JaNeinButton label="✓ Ja" value={true} picked={picked} answered={answered} correct={statement.correct} onClick={() => choose(true)} />
              <JaNeinButton label="✗ Nein" value={false} picked={picked} answered={answered} correct={statement.correct} onClick={() => choose(false)} />
            </div>

            {answered && showReasonPicker && reasonOptions && (
              <ReasonPicker
                options={reasonOptions}
                picked={reasonPicked}
                onPick={setReasonPicked}
              />
            )}

            {answered && !showReasonPicker && (
              <FeedbackBox
                isCorrect={isCorrect}
                correctLabel="Richtig erkannt!"
                wrongLabel={`Begründung — richtig wäre „${statement.correct ? 'Ja' : 'Nein'}"`}
                explanation={statement.explain}
              />
            )}
          </Card>

          {readyForNext && (
            <div className="flex justify-end">
              <PrimaryButton color={COLOR} onClick={goNext}>
                {index + 1 < order.length ? 'Nächste Behauptung →' : 'Ergebnis anzeigen →'}
              </PrimaryButton>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <ResultView
          answers={answers}
          onRestart={start}
          onMenu={() => nav.popToRoot()}
        />
      )}
    </PageShell>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <Card className="p-6 flex flex-col gap-3.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: COLOR }}>
          47 Klausur-Behauptungen
        </span>
        <h2 className="text-ink text-xl font-bold leading-snug">Wahr oder Falsch?</h2>
        <p className="text-sub text-[14px] leading-relaxed">
          Du bekommst 47 Behauptungen aus der gesamten Vorlesung — von Zahlensystemen über Netzwerke und
          Datenbanken bis zu SAP-Buchungen. Klicke einfach <b className="text-ink">Ja</b> oder{' '}
          <b className="text-ink">Nein</b>. Liegst du bei „Nein" richtig, fragt dich die App zusätzlich,
          welche von drei Begründungen zutrifft. In jedem Fall zeigt sie dir direkt danach, warum die
          Aussage stimmt oder nicht.
        </p>
        <p className="text-sub text-[14px] leading-relaxed">
          Bei jedem Durchlauf werden die Behauptungen neu gemischt.
        </p>
      </Card>
      <PrimaryButton color={COLOR} onClick={onStart}>
        Los geht's →
      </PrimaryButton>
    </div>
  );
}

function JaNeinButton({
  label,
  value,
  picked,
  answered,
  correct,
  onClick,
}: {
  label: string;
  value: boolean;
  picked: boolean | null;
  answered: boolean;
  correct: boolean;
  onClick: () => void;
}) {
  const isPicked = picked === value;
  const isCorrectOption = value === correct;
  const showCorrect = answered && isCorrectOption;
  const showWrong = answered && isPicked && !isCorrectOption;

  return (
    <button
      onClick={onClick}
      disabled={answered}
      className="flex items-center justify-center gap-2 rounded-[10px] py-4 text-center font-bold text-[16px] transition-colors disabled:cursor-default"
      style={{
        backgroundColor: showCorrect
          ? 'color-mix(in srgb, var(--good) 15%, transparent)'
          : showWrong
            ? 'color-mix(in srgb, var(--bad) 15%, transparent)'
            : 'var(--panel-2)',
        border: `1.5px solid ${showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'transparent'}`,
        color: 'var(--ink)',
      }}
    >
      {label}
    </button>
  );
}

function ReasonPicker({
  options,
  picked,
  onPick,
}: {
  options: ReasonOption[];
  picked: number | null;
  onPick: (index: number) => void;
}) {
  const answered = picked !== null;
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[13px] font-bold" style={{ color: 'var(--warn)' }}>
        Richtig erkannt — Nein! Aber warum?
      </span>
      <p className="text-sub text-[13px]">Wähle die richtige Begründung aus:</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const showCorrect = answered && opt.correct;
          const showWrong = answered && isPicked && !opt.correct;
          return (
            <button
              key={i}
              onClick={() => !answered && onPick(i)}
              disabled={answered}
              className="text-left rounded-[10px] p-3 text-[13.5px] leading-snug transition-colors disabled:cursor-default"
              style={{
                backgroundColor: showCorrect
                  ? 'color-mix(in srgb, var(--good) 15%, transparent)'
                  : showWrong
                    ? 'color-mix(in srgb, var(--bad) 15%, transparent)'
                    : 'var(--panel-2)',
                border: `1.5px solid ${showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'transparent'}`,
                color: 'var(--ink)',
              }}
            >
              {showCorrect ? '✓ ' : showWrong ? '× ' : ''}
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultView({
  answers,
  onRestart,
  onMenu,
}: {
  answers: AnswerRecord[];
  onRestart: () => void;
  onMenu: () => void;
}) {
  const score = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const pct = Math.round((score / total) * 100);
  const gradeColor = pct >= 75 ? 'var(--good)' : pct >= 45 ? 'var(--warn)' : 'var(--bad)';
  const grade =
    pct >= 90 ? 'Sehr gut' : pct >= 75 ? 'Gut' : pct >= 60 ? 'Befriedigend' : pct >= 45 ? 'Ausreichend' : 'Nochmal üben';

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-7 flex flex-col items-center gap-2.5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: COLOR }}>
          Ergebnis
        </span>
        <span className="text-[56px] font-bold leading-none" style={{ color: gradeColor }}>
          {pct}%
        </span>
        <span className="text-[18px] font-bold" style={{ color: gradeColor }}>
          {grade}
        </span>
        <span className="text-sub text-[14px]">
          {score} von {total} Behauptungen richtig eingeschätzt
        </span>
        <div className="flex flex-wrap justify-center gap-1 pt-1.5">
          {answers.map((a, i) => (
            <span
              key={i}
              className="flex items-center justify-center w-5 h-5 rounded-[5px] text-white text-[11px]"
              style={{ backgroundColor: a.isCorrect ? 'var(--good)' : 'var(--bad)' }}
              title={`Behauptung ${a.statement.id}`}
            >
              {a.isCorrect ? '✓' : '×'}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-2.5">
        <PrimaryButton color={COLOR} onClick={onRestart}>
          Nochmal (neu gemischt)
        </PrimaryButton>
        <SecondaryButton onClick={onMenu}>Zurück zum Menü</SecondaryButton>
      </div>
    </div>
  );
}
