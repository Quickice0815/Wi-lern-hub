import { useMemo, useState } from 'react';
import {
  BackBar,
  Card,
  FeedbackBox,
  OptionButton,
  PrimaryButton,
  ProgressBar,
  SecondaryButton,
} from '../../components/ui';
import { DIFFICULTY_LABELS, type LectureDifficulty, type LectureQuestion } from './types';

interface AnswerRecord {
  correct: boolean;
}

/** Zufällige Reihenfolge der Options-Indizes, damit die richtige Antwort nicht immer auf Position A/B liegt. */
function shuffledOrder(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// Multiple-Choice-Übungsrunde für eine Schwierigkeitsstufe — eine Frage
// nach der anderen mit direkter Rückmeldung, danach Ergebnisseite.
export function LectureExercises({
  questions,
  difficulty,
  color,
  onFinish,
  onBack,
}: {
  questions: LectureQuestion[];
  difficulty: LectureDifficulty;
  color: string;
  onFinish: (score: number, total: number) => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const answered = picked !== null;
  const isCorrect = answered && picked === question.correct;
  const order = useMemo(() => shuffledOrder(question.options.length), [index, question]);

  function choose(oi: number) {
    if (answered) return;
    setPicked(oi);
    setAnswers((a) => [...a, { correct: oi === question.correct }]);
  }

  function goNext() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      setDone(true);
      onFinish(answers.filter((a) => a.correct).length, questions.length);
    }
  }

  if (done) {
    const score = answers.filter((a) => a.correct).length;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col gap-[18px]">
        <div className="card p-[22px] flex flex-col items-center gap-2 text-center">
          <span className="font-bold" style={{ fontSize: 44, color: pct >= 70 ? 'var(--good)' : 'var(--warn)' }}>
            {score} / {questions.length}
          </span>
          <span className="text-sub text-sm">{DIFFICULTY_LABELS[difficulty]} abgeschlossen — {pct}% richtig</span>
        </div>
        <div className="flex gap-2.5">
          <SecondaryButton onClick={onBack}>← Stufen-Übersicht</SecondaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <BackBar title={DIFFICULTY_LABELS[difficulty]} onBack={onBack} />
      <ProgressBar value={(index + (answered ? 1 : 0)) / questions.length} color={color} />
      <span className="text-sub text-xs -mt-2">
        Frage {index + 1} / {questions.length}
      </span>

      <Card className="p-[22px] flex flex-col gap-4">
        <p className="text-ink font-bold text-[17px] leading-snug">{question.q}</p>
        <div className="flex flex-col gap-[9px]">
          {order.map((oi, displayPos) => (
            <OptionButton
              key={oi}
              index={displayPos}
              label={question.options[oi]}
              answered={answered}
              isCorrectOption={oi === question.correct}
              isPicked={picked === oi}
              onClick={() => choose(oi)}
            />
          ))}
        </div>
        {answered && (
          <FeedbackBox
            isCorrect={isCorrect}
            correctLabel="Richtig!"
            wrongLabel="Leider falsch"
            explanation={question.explain}
          />
        )}
      </Card>

      {answered && (
        <div className="flex justify-end">
          <PrimaryButton color={color} onClick={goNext}>
            {index + 1 < questions.length ? 'Nächste Frage →' : 'Ergebnis anzeigen →'}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
