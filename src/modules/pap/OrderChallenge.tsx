import { useState, type DragEvent } from 'react';
import type { PapLevel, PapOrderItem } from './data';
import { PapFeedbackAndControls, type PapFeedback } from './FeedbackControls';

// ============================================================
// PAP-QUEST — Order/Build-Challenge (Bausteine in Reihenfolge ziehen)
// Portiert aus PapOrderChallengeView.swift. Statt .draggable()/
// .dropDestination() (SwiftUI) wird natives HTML5-Drag&Drop
// verwendet; zusätzlich Tap-zum-Platzieren als Touch-Fallback
// (Baustein antippen, dann Ziel-Slot antippen).
// ============================================================

export function PapOrderChallenge({ level, onComplete }: { level: PapLevel; onComplete: () => void }) {
  const pool = level.orderItems ?? [];
  const correctOrder = level.correctOrder ?? [];

  const [sequence, setSequence] = useState<(string | null)[]>(() => Array(correctOrder.length).fill(null));
  const [feedback, setFeedback] = useState<PapFeedback>(null);
  const [showHint, setShowHint] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const placedIds = new Set(sequence.filter((v): v is string => v !== null));
  const remaining = pool.filter((item) => !placedIds.has(item.id));

  function placeAt(idx: number, itemId: string) {
    setSequence((seq) => seq.map((v, i) => (v === itemId ? null : i === idx ? itemId : v)));
    setFeedback(null);
  }

  function removeFromSequence(itemId: string) {
    setSequence((seq) => seq.map((v) => (v === itemId ? null : v)));
    setFeedback(null);
  }

  function checkAnswer() {
    if (sequence.some((v) => v === null)) {
      setFeedback('incomplete');
      return;
    }
    const correct = sequence.every((v, i) => v === correctOrder[i]);
    setFeedback(correct ? 'correct' : 'wrong');
  }

  function reset() {
    setSequence(Array(correctOrder.length).fill(null));
    setFeedback(null);
    setSelected(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {level.scenario && (
        <p
          className="text-[13px] italic text-ink rounded-[10px] p-3"
          style={{
            background: 'color-mix(in srgb, var(--pap-control) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--pap-control) 40%, transparent)',
          }}
        >
          {level.scenario}
        </p>
      )}

      <p className="text-[13.5px] text-ink/85">
        🖐️ Ziehe die Bausteine in die richtige Reihenfolge (oder tippe Baustein, dann Position an). Slot 1 = Start.
      </p>

      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg"
        style={{ border: '1px dashed var(--line)' }}
        onDragOver={(e) => e.preventDefault()}
      >
        {remaining.map((item) => (
          <OrderChip
            key={item.id}
            item={item}
            selected={selected === item.id}
            onClick={() => setSelected((s) => (s === item.id ? null : item.id))}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', item.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
          />
        ))}
        {remaining.length === 0 && <p className="text-xs text-sub py-1.5">Alle Bausteine platziert ✓</p>}
      </div>

      <p className="text-[11px] font-bold text-sub tracking-wide">REIHENFOLGE</p>

      <div className="flex flex-col gap-2">
        {sequence.map((itemId, idx) => {
          const item = itemId ? pool.find((p) => p.id === itemId) ?? null : null;
          return (
            <SequenceSlotRow
              key={idx}
              idx={idx}
              item={item}
              isTargeted={dragOverIdx === idx}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverIdx(idx);
              }}
              onDragLeave={() => setDragOverIdx((d) => (d === idx ? null : d))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                if (id) placeAt(idx, id);
                setDragOverIdx(null);
              }}
              onTapSlot={() => {
                if (selected) {
                  placeAt(idx, selected);
                  setSelected(null);
                }
              }}
              onClear={() => item && removeFromSequence(item.id)}
            />
          );
        })}
      </div>

      <PapFeedbackAndControls
        feedback={feedback}
        showHint={showHint}
        onToggleHint={() => setShowHint((v) => !v)}
        hint={level.hint}
        onCheck={checkAnswer}
        onContinue={onComplete}
        onReset={reset}
      />
    </div>
  );
}

function OrderChip({
  item,
  selected,
  onClick,
  onDragStart,
}: {
  item: PapOrderItem;
  selected: boolean;
  onClick: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="flex items-start gap-1.5 px-3 py-[10px] rounded-[10px] max-w-[280px] select-none cursor-grab active:cursor-grabbing bg-panel-2 transition-colors"
      style={{ border: `2px solid ${selected ? 'var(--pap-control)' : 'var(--line)'}` }}
    >
      <span className="text-xs font-bold shrink-0" style={{ color: 'var(--pap-decision)' }}>
        {item.id}
      </span>
      <span className="text-[12.5px] text-ink whitespace-pre-wrap leading-snug">{item.label}</span>
    </div>
  );
}

function SequenceSlotRow({
  idx,
  item,
  isTargeted,
  onDragOver,
  onDragLeave,
  onDrop,
  onTapSlot,
  onClear,
}: {
  idx: number;
  item: PapOrderItem | null;
  isTargeted: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onTapSlot: () => void;
  onClear: () => void;
}) {
  const borderColor = isTargeted
    ? 'var(--pap-decision)'
    : item
      ? 'color-mix(in srgb, var(--pap-action) 60%, transparent)'
      : 'var(--line)';
  const bg = isTargeted
    ? 'color-mix(in srgb, var(--pap-decision) 12%, transparent)'
    : item
      ? 'color-mix(in srgb, var(--pap-action) 6%, transparent)'
      : 'var(--bg)';

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onTapSlot}
      className="flex items-start gap-2.5 px-3.5 py-[10px] rounded-[10px] cursor-pointer transition-colors"
      style={{ background: bg, border: `2px dashed ${borderColor}` }}
    >
      <span
        className="flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-extrabold shrink-0"
        style={{ background: item ? 'var(--pap-action)' : 'var(--panel-2)', color: item ? '#0F1419' : 'var(--sub)' }}
      >
        {idx + 1}
      </span>
      {item ? (
        <div
          className="flex flex-col gap-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <span className="text-xs font-bold" style={{ color: 'var(--pap-decision)' }}>
            {item.id}
          </span>
          <span className="text-[12.5px] text-ink whitespace-pre-wrap leading-snug">{item.label}</span>
        </div>
      ) : (
        <span className="text-[11.5px] text-sub">hier ablegen</span>
      )}
    </div>
  );
}
