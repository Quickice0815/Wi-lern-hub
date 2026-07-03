import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { BackBar, Card, PageShell, PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import { getArticle } from './data';
import { FeedbackBox, OptionButton } from './shared';

interface AnswerRecord {
  correct: boolean;
}

// Pendant zu QuizView.swift — eine Frage nach der anderen, direkte
// Rückmeldung nach jeder Antwort, Ergebnisseite am Ende.
export function Quiz({ articleId }: { articleId: string }) {
  const nav = useNavigator();
  const article = getArticle(articleId);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [done, setDone] = useState(false);

  if (!article) {
    return (
      <PageShell>
        <BackBar title="Quiz" onBack={() => nav.pop()} />
        <p className="text-sub">Artikel nicht gefunden.</p>
      </PageShell>
    );
  }

  const question = article.questions[index];
  const answered = picked !== null;
  const isCorrect = answered && picked === question.correct;

  function choose(oi: number) {
    if (answered) return;
    setPicked(oi);
    setAnswers((a) => [...a, { correct: oi === question.correct }]);
  }

  function goNext() {
    if (index + 1 < article!.questions.length) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  }

  const goOtherArticles = () => {
    nav.popToRoot();
    nav.push({ name: 'articleMenu' });
  };

  return (
    <PageShell>
      <BackBar title={article.tag} onBack={() => nav.pop()} />

      {done ? (
        <ResultView
          score={answers.filter((a) => a.correct).length}
          total={article.questions.length}
          tag={article.tag}
          color={article.color}
          answers={answers}
          hasWorked={article.hasWorked}
          workedKey={article.workedKey}
          onRestart={restart}
          onWorked={(key) => nav.push({ name: 'worked', key, backToArticleId: article.id })}
          onOtherArticles={goOtherArticles}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar value={index / article.questions.length} color={article.color} />
            </div>
            <span className="text-sub text-[13px] font-semibold shrink-0">
              {index + 1} / {article.questions.length}
            </span>
          </div>

          {article.hasWorked && index === 0 && article.workedKey && (
            <button
              onClick={() => nav.push({ name: 'worked', key: article.workedKey!, backToArticleId: article.id })}
              className="text-left rounded-[10px] p-3 text-warn text-[13px] font-semibold leading-relaxed"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--warn) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--warn) 40%, transparent)',
              }}
            >
              ★ Dieser Artikel hat ein Anwendungstraining — erst „wie es geht“ lernen, dann selbst rechnen. Hier öffnen →
            </button>
          )}

          <Card className="p-5 flex flex-col gap-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.06em]"
              style={{ color: article.color }}
            >
              Frage {index + 1}
            </span>
            <h2 className="text-ink text-[18px] font-bold leading-snug">{question.q}</h2>

            <div className="flex flex-col gap-2.5">
              {question.options.map((opt, oi) => (
                <OptionButton
                  key={oi}
                  index={oi}
                  label={opt}
                  answered={answered}
                  isCorrectOption={oi === question.correct}
                  isPicked={oi === picked}
                  onClick={() => choose(oi)}
                />
              ))}
            </div>

            {answered && (
              <FeedbackBox isCorrect={isCorrect} explanation={question.explain} />
            )}
          </Card>

          {answered && (
            <div className="flex justify-end">
              <PrimaryButton color={article.color} onClick={goNext}>
                {index + 1 < article.questions.length ? 'Nächste Frage →' : 'Ergebnis anzeigen →'}
              </PrimaryButton>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}

function ResultView({
  score,
  total,
  tag,
  color,
  answers,
  hasWorked,
  workedKey,
  onRestart,
  onWorked,
  onOtherArticles,
}: {
  score: number;
  total: number;
  tag: string;
  color: string;
  answers: AnswerRecord[];
  hasWorked: boolean;
  workedKey: string | null;
  onRestart: () => void;
  onWorked: (key: string) => void;
  onOtherArticles: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const gradeColor = pct >= 75 ? 'var(--good)' : pct >= 45 ? 'var(--warn)' : 'var(--bad)';
  const grade =
    pct >= 90 ? 'Sehr gut' : pct >= 75 ? 'Gut' : pct >= 60 ? 'Befriedigend' : pct >= 45 ? 'Ausreichend' : 'Nochmal üben';

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-7 flex flex-col items-center gap-2.5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color }}>
          {tag}
        </span>
        <span className="text-[56px] font-bold leading-none" style={{ color: gradeColor }}>
          {pct}%
        </span>
        <span className="text-[18px] font-bold" style={{ color: gradeColor }}>
          {grade}
        </span>
        <span className="text-sub text-[14px]">
          {score} von {total} Fragen richtig
        </span>
        <div className="flex flex-wrap justify-center gap-1 pt-1.5">
          {answers.map((a, i) => (
            <span
              key={i}
              className="flex items-center justify-center w-5 h-5 rounded-[5px] text-white text-[11px]"
              style={{ backgroundColor: a.correct ? 'var(--good)' : 'var(--bad)' }}
            >
              {a.correct ? '✓' : '×'}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-2.5">
        <PrimaryButton color={color} onClick={onRestart}>
          Nochmal
        </PrimaryButton>
        {hasWorked && workedKey && (
          <PrimaryButton color="var(--warn)" textColor="#3d2c00" onClick={() => onWorked(workedKey)}>
            ★ Anwendungstraining
          </PrimaryButton>
        )}
        <SecondaryButton onClick={onOtherArticles}>Andere Artikel</SecondaryButton>
      </div>
    </div>
  );
}
