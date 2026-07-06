import { useMemo, useState, type DragEvent } from 'react';
import type { DiagramDef } from './types';

// ============================================================
// Diagramm-Beschriftung: Achsen und Quadranten/Boxen werden
// Schritt für Schritt an die richtige Stelle gezogen — immer ist
// nur ein Ziel aktiv, alle anderen sind noch gesperrt (🔒) und
// werden nach und nach freigeschaltet. Jede korrekte Platzierung
// schaltet sofort die Erklärung frei; ein falscher Versuch lässt
// den Chip mit einer kurzen Wackel-Animation zurückspringen.
// ============================================================

interface StepDef {
  zoneId: string;
  area: string;
  kind: 'axis' | 'slot';
  text: string;
  explanation: string;
  zoneTitle: string;
  distractors: string[];
}

interface PoolChip {
  id: string;
  text: string;
  isCorrect: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSteps(diagram: DiagramDef): StepDef[] {
  const axisSteps: StepDef[] = diagram.axisTerms.map((t) => ({
    zoneId: t.axis === 'y' ? 'yaxis' : 'xaxis',
    area: t.axis === 'y' ? 'yaxis' : 'xaxis',
    kind: 'axis',
    text: t.label,
    explanation: t.explanation,
    zoneTitle: t.axis === 'y' ? 'Y-Achse' : 'X-Achse',
    distractors: diagram.axisDistractors ?? [],
  }));
  const slotSteps: StepDef[] = diagram.slots.map((s) => ({
    zoneId: s.id,
    area: s.area,
    kind: 'slot',
    text: s.label,
    explanation: s.explanation,
    zoneTitle: s.label,
    distractors: diagram.slotDistractors ?? [],
  }));
  return [...axisSteps, ...slotSteps];
}

export function DiagramLabeling({ diagram, onComplete }: { diagram: DiagramDef; onComplete: () => void }) {
  const steps = useMemo(() => buildSteps(diagram), [diagram]);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeChip, setShakeChip] = useState<string | null>(null);
  const [flashZone, setFlashZone] = useState(false);

  const totalSteps = steps.length;
  const done = stepIndex >= totalSteps;
  const current = !done ? steps[stepIndex] : null;

  const pool: PoolChip[] = useMemo(() => {
    if (!current) return [];
    return shuffle([
      { id: 'correct', text: current.text, isCorrect: true },
      ...current.distractors.map((d, i) => ({ id: `d${i}`, text: d, isCorrect: false })),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, diagram]);

  function attemptPlace(chipId: string) {
    const chip = pool.find((c) => c.id === chipId);
    if (!chip) return;
    if (chip.isCorrect) {
      setStepIndex((i) => i + 1);
      setSelected(null);
    } else {
      setShakeChip(chipId);
      setFlashZone(true);
      setTimeout(() => setShakeChip(null), 420);
      setTimeout(() => setFlashZone(false), 420);
      setSelected(null);
    }
  }

  function reset() {
    setStepIndex(0);
    setSelected(null);
  }

  function onZoneDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const chipId = e.dataTransfer.getData('text/plain');
    if (chipId) attemptPlace(chipId);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: diagram.columns,
    gridTemplateRows: diagram.rows,
    gridTemplateAreas: diagram.areas.map((row) => `"${row}"`).join(' '),
    gap: 8,
  };

  function zoneBoxStyle(status: 'solved' | 'active' | 'locked') {
    if (status === 'solved') {
      return {
        border: '2px dashed var(--good)',
        background: 'color-mix(in srgb, var(--good) 14%, var(--panel-2))',
      };
    }
    if (status === 'active') {
      return {
        border: `2px dashed ${flashZone ? 'var(--bad)' : diagram.accent}`,
        background: flashZone ? 'color-mix(in srgb, var(--bad) 14%, var(--panel-2))' : 'var(--panel-2)',
      };
    }
    return { border: '2px dashed var(--line)', background: 'var(--panel-2)', opacity: 0.5 };
  }

  function renderStepZone(step: StepDef, idx: number) {
    const status: 'solved' | 'active' | 'locked' = idx < stepIndex ? 'solved' : idx === stepIndex ? 'active' : 'locked';
    const isAxisY = step.kind === 'axis' && step.area === 'yaxis';
    const isAxisX = step.kind === 'axis' && step.area === 'xaxis';

    let content: React.ReactNode;
    if (status === 'solved') {
      content = (
        <span
          className={`flex items-center gap-1.5 font-bold text-ink leading-tight animate-pop ${isAxisY ? 'text-[11.5px] whitespace-nowrap' : 'text-[13px]'}`}
          style={isAxisY ? { writingMode: 'vertical-rl', transform: 'rotate(180deg)' } : undefined}
        >
          ✓ {step.text}
        </span>
      );
    } else if (status === 'active') {
      content = isAxisY ? (
        <span className="text-[11.5px] font-bold text-ink whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {isAxisX ? 'X' : 'Y'} ?
        </span>
      ) : isAxisX ? (
        <span className="text-[12px] font-bold text-ink">X ?</span>
      ) : (
        <span className="text-[11.5px] text-sub">? hier ablegen</span>
      );
    } else {
      content = <span className="text-lg" aria-hidden>🔒</span>;
    }

    return (
      <div
        key={step.zoneId}
        onDragOver={(e) => status === 'active' && e.preventDefault()}
        onDrop={status === 'active' ? onZoneDrop : undefined}
        onClick={() => status === 'active' && selected && attemptPlace(selected)}
        className={`flex items-center justify-center text-center rounded-xl p-2 min-h-[64px] transition-colors ${
          status === 'active' ? 'cursor-pointer' : 'cursor-default'
        } ${status === 'active' && flashZone ? 'animate-shake' : ''}`}
        style={{ gridArea: step.area, ...zoneBoxStyle(status) }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{diagram.intro}</p>

      {!done && (
        <p className="text-[12.5px] font-bold" style={{ color: diagram.accent }}>
          Schritt {stepIndex + 1} von {totalSteps}: Ordne „{current!.zoneTitle}“ der richtigen Stelle zu.
        </p>
      )}

      {/* Diagramm-Grid */}
      <div style={gridStyle} className="w-full">
        {steps.map((s, i) => renderStepZone(s, i))}

        {diagram.fixedBoxes?.map((f) => (
          <div
            key={f.area}
            style={{ gridArea: f.area, background: diagram.accent }}
            className="flex items-center justify-center text-center rounded-xl p-2 text-[12.5px] font-bold text-white leading-tight"
          >
            {f.label}
          </div>
        ))}
      </div>

      {/* Chip-Pool (nur der aktuelle Schritt) */}
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
                border: `2px solid ${selected === chip.id ? diagram.accent : 'var(--line)'}`,
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
          {Math.min(stepIndex, totalSteps)} / {totalSteps} richtig platziert
        </span>
        <button className="btn-secondary text-xs px-3 py-2" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      {/* Erklärungen */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold tracking-wide text-sub">ERKLÄRUNGEN</p>
        {steps.map((step, i) => {
          const revealed = i < stepIndex;
          return (
            <div
              key={step.zoneId}
              className="rounded-[10px] p-3 text-[13px] leading-relaxed transition-colors"
              style={{
                background: revealed ? 'color-mix(in srgb, var(--good) 8%, transparent)' : 'var(--panel-2)',
                border: `1px solid ${revealed ? 'color-mix(in srgb, var(--good) 40%, transparent)' : 'var(--line)'}`,
              }}
            >
              <p className="font-bold text-ink mb-0.5">
                {revealed ? '🔓' : '🔒'} {step.zoneTitle}
              </p>
              {revealed ? (
                <p className="text-ink/85 animate-fade-in-up">{step.explanation}</p>
              ) : (
                <p className="text-sub italic">Erst nach korrekter Platzierung sichtbar.</p>
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl p-4 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--good) 15%, transparent), transparent)',
            border: '1px solid color-mix(in srgb, var(--good) 45%, transparent)',
          }}
        >
          <p className="text-sm font-bold text-ink">🎉 Alles richtig zugeordnet — stark gemacht!</p>
          <button className="btn-primary" style={{ background: diagram.accent }} onClick={onComplete}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}
