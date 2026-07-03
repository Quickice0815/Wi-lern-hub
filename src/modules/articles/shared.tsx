// Gemeinsame kleine Bausteine für Quiz.tsx und WorkedExample.tsx —
// Multiple-Choice-Option mit Richtig/Falsch-Färbung sowie die
// farbige Erklärungs-Box nach dem Beantworten.

export function OptionButton({
  index,
  label,
  answered,
  isCorrectOption,
  isPicked,
  onClick,
}: {
  index: number;
  label: string;
  answered: boolean;
  isCorrectOption: boolean;
  isPicked: boolean;
  onClick: () => void;
}) {
  const showCorrect = answered && isCorrectOption;
  const showWrong = answered && isPicked && !isCorrectOption;
  const letter = String.fromCharCode(65 + index);

  return (
    <button
      onClick={onClick}
      disabled={answered}
      className="flex items-center gap-3 rounded-[10px] p-[13px] text-left transition-colors disabled:cursor-default"
      style={{
        backgroundColor: showCorrect
          ? 'color-mix(in srgb, var(--good) 15%, transparent)'
          : showWrong
            ? 'color-mix(in srgb, var(--bad) 15%, transparent)'
            : 'var(--panel-2)',
        border: `1.5px solid ${showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'transparent'}`,
      }}
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full text-white text-[12px] font-bold shrink-0"
        style={{ backgroundColor: showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'var(--bg)' }}
      >
        {showCorrect ? '✓' : showWrong ? '×' : letter}
      </span>
      <span className="text-ink text-[14.5px] leading-snug">{label}</span>
    </button>
  );
}

export function FeedbackBox({
  isCorrect,
  correctLabel = 'Richtig!',
  wrongLabel = 'Erklärung',
  explanation,
}: {
  isCorrect: boolean;
  correctLabel?: string;
  wrongLabel?: string;
  explanation: string;
}) {
  const color = isCorrect ? 'var(--good)' : 'var(--warn)';
  return (
    <div className="relative rounded-lg p-3.5" style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)` }}>
      <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg" style={{ backgroundColor: color }} aria-hidden />
      <div className="pl-2 flex flex-col gap-1">
        <span className="text-[14px] font-bold" style={{ color }}>
          {isCorrect ? correctLabel : wrongLabel}
        </span>
        <span className="text-ink text-[14px] leading-relaxed whitespace-pre-line">{explanation}</span>
      </div>
    </div>
  );
}
