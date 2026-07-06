import { useMemo, useState, type DragEvent } from 'react';
import type { TermMatchSet } from './types';

// ============================================================
// Kontextbasiertes Lückentext-Matching: Der Text wird Satzstück
// für Satzstück aufgedeckt — immer ist nur eine Lücke aktiv, der
// Rest des Textes kommt erst danach. Enthält bewusst ein bis zwei
// Ablenker-Begriffe, die nirgendwo hineingehören.
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TermMatch({ set, onComplete }: { set: TermMatchSet; onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeChip, setShakeChip] = useState<string | null>(null);
  const [flashBlank, setFlashBlank] = useState(false);

  const totalSteps = set.blanks.length;
  const done = stepIndex >= totalSteps;
  const currentBlank = !done ? set.blanks[stepIndex] : null;

  function termText(id: string) {
    return [...set.terms, ...(set.distractors ?? [])].find((t) => t.id === id)?.text ?? '';
  }

  const pool = useMemo(() => {
    if (!currentBlank) return [];
    return shuffle([
      { id: currentBlank.correctTermId, text: termText(currentBlank.correctTermId), isCorrect: true },
      ...(set.distractors ?? []).map((d) => ({ id: d.id, text: d.text, isCorrect: false })),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, set]);

  function attemptPlace(termId: string) {
    if (!currentBlank) return;
    if (termId === currentBlank.correctTermId) {
      setStepIndex((i) => i + 1);
      setSelected(null);
    } else {
      setShakeChip(termId);
      setFlashBlank(true);
      setTimeout(() => setShakeChip(null), 420);
      setTimeout(() => setFlashBlank(false), 420);
      setSelected(null);
    }
  }

  function reset() {
    setStepIndex(0);
    setSelected(null);
  }

  const visibleBlankCount = done ? totalSteps : stepIndex + 1;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-sub">{set.intro}</p>

      {!done && (
        <p className="text-[12.5px] font-bold" style={{ color: set.accent }}>
          Schritt {stepIndex + 1} von {totalSteps}: Welcher Begriff passt in die markierte Lücke?
        </p>
      )}

      <div
        className="rounded-2xl p-4 text-[14.5px] text-ink leading-[2] border"
        style={{ borderColor: 'var(--line)', background: 'var(--panel-2)' }}
      >
        {set.blanks.slice(0, visibleBlankCount).map((b, i) => (
          <span key={b.id}>
            {b.before}
            <BlankSolved isActive={i === stepIndex} text={termText(b.correctTermId)} accent={set.accent} flashing={i === stepIndex && flashBlank} onActiveClick={() => selected && attemptPlace(selected)} onActiveDrop={(id) => attemptPlace(id)} />
          </span>
        ))}
        {done && set.tail}
      </div>

      {!done && (
        <div
          className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]"
          style={{ border: '1px dashed var(--line)' }}
          onDragOver={(e) => e.preventDefault()}
        >
          {pool.map((chip) => (
            <div
              key={chip.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', chip.id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => setSelected((s) => (s === chip.id ? null : chip.id))}
              className={`px-3 py-2 rounded-[10px] text-[12.5px] font-semibold select-none cursor-grab active:cursor-grabbing transition-colors ${
                shakeChip === chip.id ? 'animate-shake' : ''
              }`}
              style={{
                background: 'var(--panel-2)',
                border: `2px solid ${selected === chip.id ? set.accent : 'var(--line)'}`,
                color: 'var(--ink)',
              }}
            >
              {chip.text}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-sub">
          {Math.min(stepIndex, totalSteps)} / {totalSteps} Lücken gefüllt
        </span>
        <button className="btn-secondary text-xs px-3 py-2" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      {done && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--good) 15%, transparent), transparent)',
            border: '1px solid color-mix(in srgb, var(--good) 45%, transparent)',
          }}
        >
          <p className="text-sm font-bold text-ink">🎉 Alle Begriffe richtig eingesetzt!</p>
          <button className="btn-primary" style={{ background: set.accent }} onClick={onComplete}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}

function BlankSolved({
  isActive,
  text,
  accent,
  flashing,
  onActiveClick,
  onActiveDrop,
}: {
  isActive: boolean;
  text: string;
  accent: string;
  flashing: boolean;
  onActiveClick: () => void;
  onActiveDrop: (id: string) => void;
}) {
  return (
    <span
      onDragOver={(e) => isActive && e.preventDefault()}
      onDrop={(e: DragEvent<HTMLSpanElement>) => {
        if (!isActive) return;
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        if (id) onActiveDrop(id);
      }}
      onClick={() => isActive && onActiveClick()}
      className={`inline-flex items-center justify-center mx-1 px-2.5 py-0.5 rounded-lg text-[13px] font-bold align-baseline ${
        isActive ? 'cursor-pointer' : ''
      } ${isActive && flashing ? 'animate-shake' : ''}`}
      style={{
        minWidth: 90,
        border: `2px dashed ${isActive ? (flashing ? 'var(--bad)' : accent) : 'var(--good)'}`,
        background: isActive
          ? flashing
            ? 'color-mix(in srgb, var(--bad) 16%, transparent)'
            : 'color-mix(in srgb, var(--panel-2) 60%, transparent)'
          : 'color-mix(in srgb, var(--good) 16%, transparent)',
        color: isActive ? 'var(--sub)' : 'var(--ink)',
      }}
    >
      {isActive ? '……' : <span className="animate-pop">✓ {text}</span>}
    </span>
  );
}
