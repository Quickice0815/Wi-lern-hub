import type { ButtonHTMLAttributes, ReactNode } from 'react';

// ============================================================
// Shared UI primitives — Pendant zu den Helfern in Theme.swift
// (cardStyle, TagPill, PrimaryButtonStyle, SecondaryButtonStyle)
// ============================================================

export function Card({
  children,
  className = '',
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`card ${className}`}
      style={accent ? { borderColor: accent } : undefined}
    >
      {children}
    </div>
  );
}

export function TagPill({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="pill"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
    >
      {text}
    </span>
  );
}

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  textColor?: string;
}

export function PrimaryButton({
  color = 'var(--entity)',
  textColor = '#fff',
  className = '',
  style,
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className={`btn-primary disabled:opacity-40 disabled:pointer-events-none ${className}`}
      style={{ backgroundColor: color, color: textColor, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn-secondary disabled:opacity-40 disabled:pointer-events-none ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function BackBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack: () => void;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sub hover:text-ink transition-colors text-sm font-semibold shrink-0"
      >
        <span aria-hidden>←</span> Zurück
      </button>
      <h1 className="text-ink font-bold text-[17px] text-center flex-1 truncate">{title}</h1>
      <div className="shrink-0 min-w-[64px] flex justify-end">{right}</div>
    </div>
  );
}

export function ProgressBar({ value, color = 'var(--entity)' }: { value: number; color?: string }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="h-1.5 w-full rounded-full bg-panel-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-3xl px-5 py-6 pb-16">{children}</div>
    </div>
  );
}

// Multiple-Choice-Option mit Richtig/Falsch-Färbung nach Beantwortung —
// gemeinsam genutzt von Artikel-Quiz und Vorlesungs-Übungen.
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

// Farbige Erklärungs-Box nach dem Beantworten einer Frage.
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
