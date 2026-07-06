import { useMemo, useState, type DragEvent } from 'react';
import type { CaseStudy } from './types';

// ============================================================
// Case-Study-Szenario: Ein Führungs-/Strategieproblem wird
// geschildert, die passenden Maßnahmen müssen per Drag&Drop in
// die richtige Zelle einer Matrix gezogen werden. Die Zellen
// stehen von Anfang an fest — die Maßnahmen selbst werden aber
// Schritt für Schritt freigegeben (immer nur eine aktiv), damit
// man sich nicht von einem großen Pool erschlagen fühlt.
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CaseStudyPriority({ caseStudy, onComplete }: { caseStudy: CaseStudy; onComplete: () => void }) {
  const order = useMemo(() => shuffle(caseStudy.items.map((it) => it.id)), [caseStudy]);
  const [stepIndex, setStepIndex] = useState(0);
  const [placement, setPlacement] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState(false);
  const [shake, setShake] = useState(false);

  const itemById = (id: string) => caseStudy.items.find((it) => it.id === id)!;
  const totalSteps = order.length;
  const done = stepIndex >= totalSteps;
  const currentId = !done ? order[stepIndex] : null;
  const currentItem = currentId ? itemById(currentId) : null;

  function attemptPlace(quadrantArea: string) {
    if (!currentItem) return;
    if (quadrantArea === currentItem.correctQuadrant) {
      setPlacement((prev) => ({ ...prev, [currentItem.id]: quadrantArea }));
      setStepIndex((i) => i + 1);
      setSelected(false);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setSelected(false);
    }
  }

  function reset() {
    setStepIndex(0);
    setPlacement({});
    setSelected(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>, quadrantArea: string) {
    e.preventDefault();
    if (e.dataTransfer.getData('text/plain')) attemptPlace(quadrantArea);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: caseStudy.columns,
    gridTemplateRows: caseStudy.rows,
    gridTemplateAreas: caseStudy.areas.map((row) => `"${row}"`).join(' '),
    gap: 10,
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{caseStudy.scenario}</p>
      <p className="text-[12.5px] font-semibold" style={{ color: caseStudy.accent }}>
        {caseStudy.instructions}
      </p>

      {!done && (
        <p className="text-[12.5px] font-bold" style={{ color: caseStudy.accent }}>
          Schritt {stepIndex + 1} von {totalSteps}: Wohin gehört diese Aussage?
        </p>
      )}

      {/* Aktuelles Item */}
      {!done && (
        <div
          className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]"
          style={{ border: '1px dashed var(--line)' }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', currentItem!.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onClick={() => setSelected((s) => !s)}
            className={`px-3 py-2 rounded-[10px] max-w-[420px] text-[12.5px] font-medium select-none cursor-grab active:cursor-grabbing transition-colors ${
              shake ? 'animate-shake' : ''
            }`}
            style={{
              background: 'var(--panel-2)',
              border: `2px solid ${selected ? caseStudy.accent : 'var(--line)'}`,
              color: 'var(--ink)',
            }}
          >
            {currentItem!.label}
          </div>
        </div>
      )}

      {/* Matrix */}
      <div style={gridStyle}>
        {caseStudy.quadrants.map((q) => {
          const itemsHere = order.filter((id) => placement[id] === q.area);
          return (
            <div
              key={q.id}
              style={{ gridArea: q.area, border: `2px dashed ${caseStudy.accent}`, background: 'var(--panel-2)' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, q.area)}
              onClick={() => selected && attemptPlace(q.area)}
              className="rounded-xl p-2.5 min-h-[110px] flex flex-col gap-1.5 cursor-pointer"
            >
              <p className="text-[12.5px] font-bold text-ink">{q.title}</p>
              <p className="text-[10.5px] text-sub -mt-1">{q.hint}</p>
              <div className="flex flex-col gap-1.5 mt-1">
                {itemsHere.map((id) => (
                  <div
                    key={id}
                    className="text-[11.5px] px-2 py-1.5 rounded-lg leading-snug animate-pop"
                    style={{
                      background: 'color-mix(in srgb, var(--good) 20%, var(--panel))',
                      border: '1.5px solid var(--good)',
                      color: 'var(--ink)',
                    }}
                  >
                    ✓ {itemById(id).label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-sub">
          {Math.min(stepIndex, totalSteps)} / {totalSteps} richtig zugeordnet
        </span>
        <button className="btn-secondary text-xs px-3 py-2" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      {done && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-wide text-sub">BEGRÜNDUNGEN</p>
          {order.map((id) => {
            const it = itemById(id);
            return (
              <div
                key={id}
                className="rounded-[10px] p-3 text-[13px] leading-relaxed"
                style={{
                  background: 'color-mix(in srgb, var(--good) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--good) 40%, transparent)',
                }}
              >
                <p className="font-bold text-ink mb-0.5">🔓 {it.label}</p>
                <p className="text-ink/85">{it.explanation}</p>
              </div>
            );
          })}
        </div>
      )}

      {done && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--good) 15%, transparent), transparent)',
            border: '1px solid color-mix(in srgb, var(--good) 45%, transparent)',
          }}
        >
          <p className="text-sm font-bold text-ink">🎉 Alles richtig zugeordnet — stark gemacht!</p>
          <button className="btn-primary" style={{ background: caseStudy.accent }} onClick={onComplete}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}
