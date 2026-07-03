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
