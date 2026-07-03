import { useState } from 'react';
import { ERM_TUTORIAL_CARDS, type ERMTutorialQuiz } from './data';
import { PrimaryButton, SecondaryButton } from '../../components/ui';
import { ErmTutorialVisual } from './Shapes';

// ============================================================
// Tutorial-Flow — Pendant zu ERMTutorialView.swift.
// Lernkarten mit Mini-Quiz, Fortschrittspunkten oben, Navigation unten.
// ============================================================

export function ErmTutorial({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const card = ERM_TUTORIAL_CARDS[index];
  const isLast = index === ERM_TUTORIAL_CARDS.length - 1;
  const hasQuiz = card.quiz != null;
  const answered = picked !== null;
  const correct = answered && card.quiz != null && picked === card.quiz.correct;

  function goTo(i: number) {
    setIndex(i);
    setPicked(null);
  }

  function next() {
    setPicked(null);
    setIndex((i) => i + 1);
  }

  function back() {
    setPicked(null);
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1.5 justify-center flex-wrap">
        {ERM_TUTORIAL_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Karte ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: i === index ? 26 : 9,
              height: 9,
              background:
                i === index
                  ? 'var(--relation)'
                  : i < index
                    ? 'color-mix(in srgb, var(--entity) 50%, transparent)'
                    : 'var(--panel-2)',
            }}
          />
        ))}
      </div>

      <div className="card p-[22px] flex flex-col gap-3.5">
        <span className="text-relation font-bold text-[11px] uppercase tracking-wide">{card.badge}</span>
        <h2 className="text-ink font-bold text-[21px] leading-snug">{card.title}</h2>

        <div className="flex justify-center py-[18px] bg-bg rounded-xl">
          <ErmTutorialVisual kind={card.visual} />
        </div>

        <p className="text-ink text-[15px] leading-relaxed">{card.body}</p>

        {card.why && (
          <p
            className="text-ink text-[13.5px] leading-relaxed p-3 rounded-lg"
            style={{
              background: 'color-mix(in srgb, var(--relation) 15%, transparent)',
              borderLeft: '3px solid var(--relation)',
            }}
          >
            {card.why}
          </p>
        )}

        {card.quiz && (
          <QuizBlock quiz={card.quiz} picked={picked} answered={answered} correct={correct} onPick={setPicked} />
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <SecondaryButton onClick={back} disabled={index === 0} className={index === 0 ? 'opacity-50' : ''}>
          ← Zurück
        </SecondaryButton>

        <button onClick={onDone} className="text-sub hover:text-ink transition-colors text-[13px]">
          Überspringen
        </button>

        {isLast ? (
          <PrimaryButton color="var(--good)" textColor="#06210f" onClick={onDone}>
            Los geht's →
          </PrimaryButton>
        ) : (
          <PrimaryButton
            color={hasQuiz && !answered ? 'var(--panel-2)' : 'var(--relation)'}
            textColor={hasQuiz && !answered ? 'var(--sub)' : '#fff'}
            onClick={next}
            disabled={hasQuiz && !answered}
          >
            {hasQuiz && !answered ? 'Erst antworten' : 'Weiter →'}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

function QuizBlock({
  quiz,
  picked,
  answered,
  correct,
  onPick,
}: {
  quiz: ERMTutorialQuiz;
  picked: number | null;
  answered: boolean;
  correct: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-ink font-bold text-sm">Mini-Check: {quiz.q}</p>
      <div className="flex flex-col gap-2">
        {quiz.options.map((opt, oi) => {
          const isCorrectOpt = oi === quiz.correct;
          const show = answered && (oi === picked || isCorrectOpt);
          const bg = !answered ? 'var(--panel-2)' : show ? (isCorrectOpt ? 'var(--good)' : 'var(--bad)') : 'var(--panel-2)';
          const textColor = !answered ? 'var(--ink)' : show ? '#fff' : 'var(--sub)';
          return (
            <button
              key={oi}
              onClick={() => !answered && onPick(oi)}
              disabled={answered}
              className="flex items-center gap-1 font-semibold text-sm rounded-[9px] px-3.5 py-[11px] text-left transition-opacity"
              style={{ background: bg, color: textColor, opacity: answered && !show ? 0.5 : 1 }}
            >
              {answered && isCorrectOpt ? '✓ ' : answered && oi === picked ? '× ' : ''}
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="text-[13.5px] leading-relaxed" style={{ color: correct ? 'var(--good)' : 'var(--warn)' }}>
          {(correct ? 'Richtig! ' : 'Nicht ganz. ') + quiz.explain}
        </p>
      )}
    </div>
  );
}
