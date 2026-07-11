import { useMemo, useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, Card, FeedbackBox, OptionButton, PageShell, PrimaryButton, SecondaryButton } from '../../components/ui';
import { WorkedExamples } from './data';
import type { ArticlesProgress } from './progressTypes';
import { ShingleLab } from './ShingleLab';

type Phase = 'learn' | 'practice' | 'exercise';

/** Zufällige Reihenfolge der Options-Indizes, damit die richtige Antwort nicht immer auf Position A/B liegt. */
function shuffledOrder(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// Pendant zu WorkedExampleView.swift — zwei Phasen: erst die
// Schritt-für-Schritt-Erklärung ("So funktioniert's"), dann eine
// eigene Kontrollaufgabe ("Selbst prüfen").
export function WorkedExample({ exampleKey, backToArticleId }: { exampleKey: string; backToArticleId: string }) {
  const nav = useNavigator();
  const data = WorkedExamples[exampleKey];

  const [phase, setPhase] = useState<Phase>('learn');
  const [picked, setPicked] = useState<number | null>(null);
  const [, setProgress] = useCloudProgress<ArticlesProgress>('articles', {});

  if (!data) {
    return (
      <PageShell>
        <BackBar title="Anwendung" onBack={() => nav.pop()} />
        <p className="text-sub">Anwendungsaufgabe nicht gefunden.</p>
      </PageShell>
    );
  }

  const answered = picked !== null;
  const correct = answered && picked === data.exercise.correct;

  const backToQuiz = () => nav.replaceTop({ name: 'quiz', articleId: backToArticleId });

  return (
    <PageShell>
      <BackBar title="Anwendung" onBack={() => nav.pop()} />

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <PhaseTab label="1 · So funktioniert's" active={phase === 'learn'} color={data.color} onClick={() => setPhase('learn')} />
          {data.practiceSet && data.practiceSet.length > 0 && (
            <PhaseTab label="2 · Selbst üben" active={phase === 'practice'} color={data.color} onClick={() => setPhase('practice')} />
          )}
          <PhaseTab
            label={data.practiceSet ? '3 · Quizfrage' : '2 · Selbst prüfen'}
            active={phase === 'exercise'}
            color={data.color}
            onClick={() => setPhase('exercise')}
          />
        </div>

        <Card className="p-[22px] flex flex-col gap-4">
          <h1 className="text-ink text-[20px] font-bold leading-snug">{data.title}</h1>

          {phase === 'learn' ? (
            <LearnContent
              steps={data.steps}
              color={data.color}
              continueLabel={data.practiceSet ? "Verstanden — jetzt selbst üben →" : "Verstanden — jetzt selbst prüfen →"}
              onContinue={() => setPhase(data.practiceSet ? 'practice' : 'exercise')}
            />
          ) : phase === 'practice' && data.practiceSet && data.practiceSet.length > 0 ? (
            <ShingleLab rounds={data.practiceSet} color={data.color} onDone={() => setPhase('exercise')} />
          ) : (
            <ExerciseContent
              intro={data.exercise.intro}
              question={data.exercise.q}
              options={data.exercise.options}
              correctIndex={data.exercise.correct}
              explain={data.exercise.explain}
              picked={picked}
              answered={answered}
              correct={correct}
              onPick={(oi) => {
                if (answered) return;
                setPicked(oi);
                if (oi === data.exercise.correct) {
                  setProgress((prev) => ({
                    ...prev,
                    [backToArticleId]: { ...prev[backToArticleId], bestScore: prev[backToArticleId]?.bestScore ?? 0, total: prev[backToArticleId]?.total ?? 0, workedDone: true },
                  }));
                }
              }}
            />
          )}
        </Card>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <SecondaryButton onClick={backToQuiz}>← Zurück zum Quiz</SecondaryButton>
          {phase === 'exercise' && answered && (
            <PrimaryButton
              color={data.color}
              onClick={() => {
                setPicked(null);
                setPhase('learn');
              }}
            >
              Erklärung nochmal ansehen
            </PrimaryButton>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function PhaseTab({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg py-2.5 text-[13px] font-bold transition-colors"
      style={{
        backgroundColor: active ? color : 'var(--panel-2)',
        color: active ? '#fff' : 'var(--sub)',
      }}
    >
      {label}
    </button>
  );
}

function LearnContent({
  steps,
  color,
  continueLabel,
  onContinue,
}: {
  steps: { h: string; t: string }[];
  color: string;
  continueLabel: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3.5">
          <span
            className="flex items-center justify-center w-[26px] h-[26px] rounded-full text-[13px] font-bold shrink-0"
            style={{ backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`, color }}
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-ink text-[15px] font-bold">{step.h}</span>
            <span className="text-sub text-[14px] leading-relaxed whitespace-pre-line">{step.t}</span>
          </div>
        </div>
      ))}
      <PrimaryButton color={color} onClick={onContinue} className="mt-1.5 self-start">
        {continueLabel}
      </PrimaryButton>
    </div>
  );
}

function ExerciseContent({
  intro,
  question,
  options,
  correctIndex,
  explain,
  picked,
  answered,
  correct,
  onPick,
}: {
  intro: string;
  question: string;
  options: string[];
  correctIndex: number;
  explain: string;
  picked: number | null;
  answered: boolean;
  correct: boolean;
  onPick: (oi: number) => void;
}) {
  const order = useMemo(() => shuffledOrder(options.length), [options]);

  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-warn text-[13px] font-bold">{intro}</span>
      <h2 className="text-ink text-[16.5px] font-bold leading-snug">{question}</h2>

      <div className="flex flex-col gap-2.5">
        {order.map((oi, displayPos) => (
          <OptionButton
            key={oi}
            index={displayPos}
            label={options[oi]}
            answered={answered}
            isCorrectOption={oi === correctIndex}
            isPicked={oi === picked}
            onClick={() => onPick(oi)}
          />
        ))}
      </div>

      {answered && (
        <FeedbackBox isCorrect={correct} correctLabel="Richtig gerechnet!" wrongLabel="Schau nochmal:" explanation={explain} />
      )}
    </div>
  );
}
