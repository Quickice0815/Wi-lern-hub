import { useState, type DragEvent } from 'react';
import type { PapLevel, PapMatchItem, PapMatchSlot } from './data';
import { PapShapeIcon } from './ShapeIcon';
import { PapFeedbackAndControls, type PapFeedback } from './FeedbackControls';

// ============================================================
// PAP-QUEST — Match-Challenge (Symbol auf passenden Slot ziehen)
// Portiert aus PapMatchChallengeView.swift. Statt .draggable()/
// .dropDestination() (SwiftUI) wird natives HTML5-Drag&Drop
// verwendet; zusätzlich Tap-zum-Platzieren als Touch-Fallback
// (Slot antippen, dann Symbol antippen).
// ============================================================

export function PapMatchChallenge({ level, onComplete }: { level: PapLevel; onComplete: () => void }) {
  const items = level.matchItems ?? [];
  const slots = level.matchSlots ?? [];

  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<PapFeedback>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);

  const usedItemIds = new Set(Object.values(assignments));

  function assign(itemId: string, slotId: number) {
    setAssignments((prev) => {
      const next: Record<number, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (v !== itemId) next[Number(k)] = v;
      }
      next[slotId] = itemId;
      return next;
    });
    setFeedback(null);
  }

  function clearSlot(slotId: number) {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
    setFeedback(null);
  }

  function checkAnswer() {
    const allFilled = slots.every((s) => assignments[s.id] != null);
    if (!allFilled) {
      setFeedback('incomplete');
      return;
    }
    const allCorrect = slots.every((s) => assignments[s.id] === s.answer);
    setFeedback(allCorrect ? 'correct' : 'wrong');
  }

  function reset() {
    setAssignments({});
    setFeedback(null);
    setSelectedSlot(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85">
        🖐️ Ziehe die Symbole unten auf den passenden Slot (oder tippe Slot, dann Symbol an).
      </p>

      <div
        className="flex flex-wrap gap-2.5 p-2.5 rounded-xl bg-bg"
        style={{ border: '1px dashed var(--line)' }}
        onDragOver={(e) => e.preventDefault()}
      >
        {items.map((item) => {
          const used = usedItemIds.has(item.id);
          return (
            <ItemChip
              key={item.id}
              item={item}
              dimmed={used}
              draggable={!used}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', item.id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => {
                if (used) return;
                if (selectedSlot != null) {
                  assign(item.id, selectedSlot);
                  setSelectedSlot(null);
                }
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        {slots.map((slot, idx) => {
          const placedItem = items.find((it) => it.id === assignments[slot.id]) ?? null;
          return (
            <MatchSlotRow
              key={slot.id}
              slot={slot}
              idx={idx}
              placedItem={placedItem}
              isSelected={selectedSlot === slot.id}
              isTargeted={dragOverSlot === slot.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverSlot(slot.id);
              }}
              onDragLeave={() => setDragOverSlot((d) => (d === slot.id ? null : d))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                if (id) assign(id, slot.id);
                setDragOverSlot(null);
              }}
              onTapSlot={() => setSelectedSlot((s) => (s === slot.id ? null : slot.id))}
              onClear={() => clearSlot(slot.id)}
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

function ItemChip({
  item,
  dimmed,
  draggable,
  onDragStart,
  onClick,
}: {
  item: PapMatchItem;
  dimmed: boolean;
  draggable: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-[10px] select-none transition-opacity ${
        draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      }`}
      style={{
        opacity: dimmed ? 0.35 : 1,
        background: dimmed ? 'var(--bg)' : 'var(--panel-2)',
        border: '2px solid var(--line)',
      }}
    >
      <span
        className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold shrink-0"
        style={{ background: 'var(--panel-2)', color: dimmed ? 'var(--sub)' : 'var(--ink)' }}
      >
        {item.id}
      </span>
      <PapShapeIcon type={item.shape} size={20} color={dimmed ? 'var(--sub)' : 'var(--ink)'} />
      <span className="text-[13px] font-semibold" style={{ color: dimmed ? 'var(--sub)' : 'var(--ink)' }}>
        {item.label}
      </span>
    </div>
  );
}

function MatchSlotRow({
  slot,
  idx,
  placedItem,
  isSelected,
  isTargeted,
  onDragOver,
  onDragLeave,
  onDrop,
  onTapSlot,
  onClear,
}: {
  slot: PapMatchSlot;
  idx: number;
  placedItem: PapMatchItem | null;
  isSelected: boolean;
  isTargeted: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onTapSlot: () => void;
  onClear: () => void;
}) {
  const borderColor = isTargeted
    ? 'var(--pap-decision)'
    : isSelected
      ? 'var(--pap-control)'
      : placedItem
        ? 'var(--pap-action)'
        : 'var(--line)';
  const bg = isTargeted
    ? 'color-mix(in srgb, var(--pap-decision) 12%, transparent)'
    : placedItem
      ? 'color-mix(in srgb, var(--pap-action) 8%, transparent)'
      : 'var(--bg)';

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onTapSlot}
      className="flex items-center gap-3 px-3.5 py-[11px] rounded-[10px] cursor-pointer transition-colors"
      style={{ background: bg, border: `2px dashed ${borderColor}` }}
    >
      <span className="text-xs font-semibold text-sub w-14 shrink-0">Slot {idx + 1}</span>
      <span className="text-[13.5px] text-ink flex-1">{slot.label}</span>
      {placedItem ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="flex items-center gap-1.5 shrink-0"
        >
          <span className="text-xs font-bold" style={{ color: 'var(--pap-action)' }}>
            {placedItem.id}
          </span>
          <PapShapeIcon type={placedItem.shape} size={16} color="var(--pap-action)" />
          <span className="text-[11px]" style={{ color: 'var(--pap-action)' }}>
            ✕
          </span>
        </button>
      ) : (
        <span className="text-[11px] text-sub shrink-0">hier ablegen</span>
      )}
    </div>
  );
}
