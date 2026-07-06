import { useState, type DragEvent } from 'react';
import type { TermMatchSet } from './types';

// ============================================================
// Kontextbasiertes Lückentext-Matching: Fachbegriffe müssen aktiv
// in die richtige Lücke eines zusammenhängenden Definitionstextes
// gezogen werden. Enthält bewusst ein bis zwei Ablenker-Begriffe,
// die nirgendwo hineingehören.
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
  const [pool] = useState(() =>
    shuffle([
      ...set.terms.map((t) => ({ id: t.id, text: t.text })),
      ...(set.distractors ?? []).map((t) => ({ id: t.id, text: t.text })),
    ]),
  );
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeChip, setShakeChip] = useState<string | null>(null);
  const [flashBlank, setFlashBlank] = useState<string | null>(null);

  const placedTermIds = new Set(Object.values(placed));
  const remainingPool = pool.filter((c) => !placedTermIds.has(c.id));
  const allSolved = Object.keys(placed).length === set.blanks.length;

  function attemptPlace(blankId: string, termId: string) {
    if (placed[blankId]) return;
    const blank = set.blanks.find((b) => b.id === blankId)!;
    if (blank.correctTermId === termId) {
      setPlaced((prev) => ({ ...prev, [blankId]: termId }));
    } else {
      setShakeChip(termId);
      setFlashBlank(blankId);
      setTimeout(() => setShakeChip(null), 420);
      setTimeout(() => setFlashBlank(null), 420);
    }
    setSelected(null);
  }

  function reset() {
    setPlaced({});
    setSelected(null);
  }

  function termText(id: string) {
    return [...set.terms, ...(set.distractors ?? [])].find((t) => t.id === id)?.text ?? '';
  }

  function Blank({ blankId }: { blankId: string }) {
    const termId = placed[blankId];
    const isFlashing = flashBlank === blankId;
    return (
      <span
        onDragOver={(e) => !termId && e.preventDefault()}
        onDrop={(e: DragEvent<HTMLSpanElement>) => {
          e.preventDefault();
          const id = e.dataTransfer.getData('text/plain');
          if (id) attemptPlace(blankId, id);
        }}
        onClick={() => {
          if (!termId && selected) attemptPlace(blankId, selected);
        }}
        className={`inline-flex items-center justify-center mx-1 px-2.5 py-0.5 rounded-lg text-[13px] font-bold cursor-pointer align-baseline ${
          isFlashing ? 'animate-shake' : ''
        }`}
        style={{
          minWidth: 90,
          border: `2px dashed ${termId ? 'var(--good)' : isFlashing ? 'var(--bad)' : set.accent}`,
          background: termId
            ? 'color-mix(in srgb, var(--good) 16%, transparent)'
            : isFlashing
              ? 'color-mix(in srgb, var(--bad) 16%, transparent)'
              : 'color-mix(in srgb, var(--panel-2) 60%, transparent)',
          color: termId ? 'var(--ink)' : 'var(--sub)',
        }}
      >
        {termId ? <span className="animate-pop">✓ {termText(termId)}</span> : '……'}
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-sub">{set.intro}</p>

      <div
        className="rounded-2xl p-4 text-[14.5px] text-ink leading-[2] border"
        style={{ borderColor: 'var(--line)', background: 'var(--panel-2)' }}
      >
        {set.blanks.map((b) => (
          <span key={b.id}>
            {b.before}
            <Blank blankId={b.id} />
          </span>
        ))}
        {set.tail}
      </div>

      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]"
        style={{ border: '1px dashed var(--line)' }}
        onDragOver={(e) => e.preventDefault()}
      >
        {remainingPool.length === 0 && <p className="text-xs text-sub py-1.5">Alle Begriffe verwendet ✓</p>}
        {remainingPool.map((chip) => (
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

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-sub">
          {Object.keys(placed).length} / {set.blanks.length} Lücken gefüllt
        </span>
        <button className="btn-secondary text-xs px-3 py-2" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      {allSolved && (
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
