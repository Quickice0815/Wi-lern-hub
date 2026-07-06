import { useState, type DragEvent } from 'react';
import type { DiagramDef } from './types';

// ============================================================
// Diagramm-Beschriftung: Achsen und Quadranten/Boxen werden per
// Drag&Drop (nativ, mit Tap-Fallback fürs Touch-Gerät) an die
// richtige Stelle gezogen. Jede korrekte Platzierung schaltet
// sofort die zugehörige Erklärung frei — ein falscher Drop lässt
// den Chip mit einer kurzen Wackel-Animation in den Pool zurückspringen.
// ============================================================

interface Chip {
  id: string;
  text: string;
  targetZone: string;
  explanation: string;
  zoneTitle: string;
  kind: 'axis' | 'slot';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChips(diagram: DiagramDef): Chip[] {
  const axisChips: Chip[] = diagram.axisTerms.map((t) => ({
    id: t.id,
    text: t.label,
    targetZone: t.axis === 'y' ? 'yaxis' : 'xaxis',
    explanation: t.explanation,
    zoneTitle: t.axis === 'y' ? 'Y-Achse' : 'X-Achse',
    kind: 'axis',
  }));
  const slotChips: Chip[] = diagram.slots.map((s) => ({
    id: s.id,
    text: s.label,
    targetZone: s.id,
    explanation: s.explanation,
    zoneTitle: s.label,
    kind: 'slot',
  }));
  return shuffle([...axisChips, ...slotChips]);
}

export function DiagramLabeling({ diagram, onComplete }: { diagram: DiagramDef; onComplete: () => void }) {
  const [chips] = useState<Chip[]>(() => buildChips(diagram));
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeChip, setShakeChip] = useState<string | null>(null);
  const [flashZone, setFlashZone] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const placedChipIds = new Set(Object.values(placed));
  const pool = chips.filter((c) => !placedChipIds.has(c.id));
  const totalZones = chips.length;
  const solvedCount = Object.keys(placed).length;
  const allSolved = solvedCount === totalZones;

  function attemptPlace(zoneId: string, chipId: string) {
    const chip = chips.find((c) => c.id === chipId);
    if (!chip || placed[zoneId]) return;

    if (chip.targetZone === zoneId) {
      setPlaced((prev) => {
        const next = { ...prev, [zoneId]: chipId };
        if (Object.keys(next).length === totalZones) setTimeout(() => setDone(true), 250);
        return next;
      });
    } else {
      setShakeChip(chipId);
      setFlashZone(zoneId);
      setTimeout(() => setShakeChip(null), 420);
      setTimeout(() => setFlashZone(null), 420);
    }
    setSelected(null);
  }

  function reset() {
    setPlaced({});
    setSelected(null);
    setDone(false);
  }

  function onZoneDrop(e: DragEvent<HTMLDivElement>, zoneId: string) {
    e.preventDefault();
    const chipId = e.dataTransfer.getData('text/plain');
    if (chipId) attemptPlace(zoneId, chipId);
  }

  function onZoneClick(zoneId: string) {
    if (placed[zoneId]) return;
    if (selected) attemptPlace(zoneId, selected);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: diagram.columns,
    gridTemplateRows: diagram.rows,
    gridTemplateAreas: diagram.areas.map((row) => `"${row}"`).join(' '),
    gap: 8,
  };

  function renderZone(zoneId: string, area: string) {
    const chipId = placed[zoneId];
    const chip = chipId ? chips.find((c) => c.id === chipId) : null;
    const isFlashing = flashZone === zoneId;
    return (
      <div
        key={zoneId}
        onDragOver={(e) => !chip && e.preventDefault()}
        onDrop={(e) => onZoneDrop(e, zoneId)}
        onClick={() => onZoneClick(zoneId)}
        className={`flex items-center justify-center text-center rounded-xl p-2 min-h-[64px] transition-colors ${
          chip ? 'cursor-default' : 'cursor-pointer'
        } ${isFlashing ? 'animate-shake' : ''}`}
        style={{
          gridArea: area,
          border: `2px dashed ${chip ? 'var(--good)' : isFlashing ? 'var(--bad)' : diagram.accent}`,
          background: chip
            ? 'color-mix(in srgb, var(--good) 14%, var(--panel-2))'
            : isFlashing
              ? 'color-mix(in srgb, var(--bad) 14%, var(--panel-2))'
              : 'var(--panel-2)',
        }}
      >
        {chip ? (
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-ink leading-tight animate-pop">
            <span aria-hidden>✓</span> {chip.text}
          </span>
        ) : (
          <span className="text-[11.5px] text-sub">? hier ablegen</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{diagram.intro}</p>

      {/* Diagramm-Grid */}
      <div style={gridStyle} className="w-full">
        {diagram.axisTerms.some((t) => t.axis === 'y') &&
          (() => {
            const chipId = placed['yaxis'];
            const chip = chipId ? chips.find((c) => c.id === chipId) : null;
            const isFlashing = flashZone === 'yaxis';
            return (
              <div
                onDragOver={(e) => !chip && e.preventDefault()}
                onDrop={(e) => onZoneDrop(e, 'yaxis')}
                onClick={() => onZoneClick('yaxis')}
                className={`flex items-center justify-center rounded-xl transition-colors ${
                  chip ? 'cursor-default' : 'cursor-pointer'
                } ${isFlashing ? 'animate-shake' : ''}`}
                style={{
                  gridArea: 'yaxis',
                  border: `2px dashed ${chip ? 'var(--good)' : isFlashing ? 'var(--bad)' : diagram.accent}`,
                  background: chip
                    ? 'color-mix(in srgb, var(--good) 14%, var(--panel-2))'
                    : isFlashing
                      ? 'color-mix(in srgb, var(--bad) 14%, var(--panel-2))'
                      : 'var(--panel-2)',
                }}
              >
                <span
                  className="text-[11.5px] font-bold text-ink whitespace-nowrap animate-pop"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {chip ? `✓ ${chip.text}` : 'Y ?'}
                </span>
              </div>
            );
          })()}

        {diagram.slots.map((s) => renderZone(s.id, s.area))}

        {diagram.fixedBoxes?.map((f) => (
          <div
            key={f.area}
            style={{ gridArea: f.area, background: diagram.accent }}
            className="flex items-center justify-center text-center rounded-xl p-2 text-[12.5px] font-bold text-white leading-tight"
          >
            {f.label}
          </div>
        ))}

        {diagram.axisTerms.some((t) => t.axis === 'x') &&
          (() => {
            const chipId = placed['xaxis'];
            const chip = chipId ? chips.find((c) => c.id === chipId) : null;
            const isFlashing = flashZone === 'xaxis';
            return (
              <div
                onDragOver={(e) => !chip && e.preventDefault()}
                onDrop={(e) => onZoneDrop(e, 'xaxis')}
                onClick={() => onZoneClick('xaxis')}
                className={`flex items-center justify-center rounded-xl transition-colors ${
                  chip ? 'cursor-default' : 'cursor-pointer'
                } ${isFlashing ? 'animate-shake' : ''}`}
                style={{
                  gridArea: 'xaxis',
                  border: `2px dashed ${chip ? 'var(--good)' : isFlashing ? 'var(--bad)' : diagram.accent}`,
                  background: chip
                    ? 'color-mix(in srgb, var(--good) 14%, var(--panel-2))'
                    : isFlashing
                      ? 'color-mix(in srgb, var(--bad) 14%, var(--panel-2))'
                      : 'var(--panel-2)',
                }}
              >
                <span className="text-[12px] font-bold text-ink animate-pop">
                  {chip ? `✓ ${chip.text}` : 'X ?'}
                </span>
              </div>
            );
          })()}
      </div>

      {/* Chip-Pool */}
      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]"
        style={{ border: '1px dashed var(--line)' }}
        onDragOver={(e) => e.preventDefault()}
      >
        {pool.length === 0 && <p className="text-xs text-sub py-1.5">Alle Begriffe platziert ✓</p>}
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
              border: `2px solid ${selected === chip.id ? diagram.accent : 'var(--line)'}`,
              color: 'var(--ink)',
            }}
          >
            {chip.kind === 'axis' ? '↕ ' : ''}
            {chip.text}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-sub">
          {solvedCount} / {totalZones} richtig platziert
        </span>
        <button className="btn-secondary text-xs px-3 py-2" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      {/* Erklärungen */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold tracking-wide text-sub">ERKLÄRUNGEN</p>
        {chips.map((chip) => {
          const revealed = placed[chip.targetZone] === chip.id;
          return (
            <div
              key={chip.id}
              className="rounded-[10px] p-3 text-[13px] leading-relaxed transition-colors"
              style={{
                background: revealed
                  ? 'color-mix(in srgb, var(--good) 8%, transparent)'
                  : 'var(--panel-2)',
                border: `1px solid ${revealed ? 'color-mix(in srgb, var(--good) 40%, transparent)' : 'var(--line)'}`,
              }}
            >
              <p className="font-bold text-ink mb-0.5">
                {revealed ? '🔓' : '🔒'} {chip.zoneTitle}
              </p>
              {revealed ? (
                <p className="text-ink/85 animate-fade-in-up">{chip.explanation}</p>
              ) : (
                <p className="text-sub italic">Erst nach korrekter Platzierung sichtbar.</p>
              )}
            </div>
          );
        })}
      </div>

      {allSolved && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--good) 15%, transparent), transparent)',
            border: '1px solid color-mix(in srgb, var(--good) 45%, transparent)',
          }}
        >
          <p className="text-sm font-bold text-ink">🎉 Alles richtig zugeordnet — stark gemacht!</p>
          <button className="btn-primary" style={{ background: diagram.accent }} onClick={onComplete} disabled={!done}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}
