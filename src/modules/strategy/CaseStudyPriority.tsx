import { useState, type DragEvent } from 'react';
import type { CaseStudy } from './types';

// ============================================================
// Case-Study-Szenario: Ein Führungs-/Strategieproblem wird
// geschildert, die passenden Maßnahmen müssen per Drag&Drop in
// die richtige Zelle einer Prioritäten-Matrix gezogen werden.
// Mehrere Maßnahmen pro Zelle sind erlaubt. Geprüft wird per
// Knopfdruck, korrekt zugeordnete Maßnahmen werden gesperrt und
// ihre Begründung freigeschaltet — falsche können erneut versucht werden.
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
  const [order] = useState(() => shuffle(caseStudy.items.map((it) => it.id)));
  const [placement, setPlacement] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);

  const itemById = (id: string) => caseStudy.items.find((it) => it.id === id)!;
  const pool = order.filter((id) => !placement[id]);

  function place(itemId: string, quadrantId: string) {
    if (checked && status[itemId] === 'correct') return;
    setPlacement((prev) => ({ ...prev, [itemId]: quadrantId }));
    setChecked(false);
    setSelected(null);
  }

  function removeFromQuadrant(itemId: string) {
    if (checked && status[itemId] === 'correct') return;
    setPlacement((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setChecked(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>, quadrantId: string) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) place(id, quadrantId);
  }

  function checkAnswers() {
    if (Object.keys(placement).length < caseStudy.items.length) {
      const missing = caseStudy.items.map((it) => it.id).filter((id) => !placement[id]);
      setShakeId(missing[0] ?? null);
      setTimeout(() => setShakeId(null), 420);
      return;
    }
    const next: Record<string, 'correct' | 'wrong'> = {};
    caseStudy.items.forEach((it) => {
      next[it.id] = placement[it.id] === it.correctQuadrant ? 'correct' : 'wrong';
    });
    setStatus(next);
    setChecked(true);
  }

  function retryWrong() {
    setPlacement((prev) => {
      const next = { ...prev };
      Object.entries(status).forEach(([id, s]) => {
        if (s === 'wrong') delete next[id];
      });
      return next;
    });
    setChecked(false);
  }

  const allCorrect = checked && caseStudy.items.every((it) => status[it.id] === 'correct');

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

      {/* Pool */}
      <div
        className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]"
        style={{ border: '1px dashed var(--line)' }}
        onDragOver={(e) => e.preventDefault()}
      >
        {pool.length === 0 && <p className="text-xs text-sub py-1.5">Alle Maßnahmen zugeordnet ✓</p>}
        {pool.map((id) => {
          const item = itemById(id);
          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', id);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => setSelected((s) => (s === id ? null : id))}
              className={`px-3 py-2 rounded-[10px] max-w-[280px] text-[12.5px] font-medium select-none cursor-grab active:cursor-grabbing transition-colors ${
                shakeId === id ? 'animate-shake' : ''
              }`}
              style={{
                background: 'var(--panel-2)',
                border: `2px solid ${selected === id ? caseStudy.accent : 'var(--line)'}`,
                color: 'var(--ink)',
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>

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
              onClick={() => selected && place(selected, q.area)}
              className="rounded-xl p-2.5 min-h-[110px] flex flex-col gap-1.5 cursor-pointer"
            >
              <p className="text-[12.5px] font-bold text-ink">{q.title}</p>
              <p className="text-[10.5px] text-sub -mt-1">{q.hint}</p>
              <div className="flex flex-col gap-1.5 mt-1">
                {itemsHere.map((id) => {
                  const item = itemById(id);
                  const s = checked ? status[id] : null;
                  const locked = s === 'correct';
                  return (
                    <div
                      key={id}
                      draggable={!locked}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', id);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!locked) removeFromQuadrant(id);
                      }}
                      className={`text-[11.5px] px-2 py-1.5 rounded-lg leading-snug ${
                        locked ? 'cursor-default' : 'cursor-grab'
                      } ${shakeId === id ? 'animate-shake' : ''}`}
                      style={{
                        background:
                          s === 'correct'
                            ? 'color-mix(in srgb, var(--good) 20%, var(--panel))'
                            : s === 'wrong'
                              ? 'color-mix(in srgb, var(--bad) 20%, var(--panel))'
                              : 'var(--panel)',
                        border: `1.5px solid ${
                          s === 'correct' ? 'var(--good)' : s === 'wrong' ? 'var(--bad)' : 'var(--line)'
                        }`,
                        color: 'var(--ink)',
                      }}
                    >
                      {s === 'correct' ? '✓ ' : s === 'wrong' ? '✗ ' : ''}
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {!allCorrect ? (
          <>
            <button className="btn-primary" style={{ background: caseStudy.accent }} onClick={checkAnswers}>
              Prüfen
            </button>
            {checked && <button className="btn-secondary" onClick={retryWrong}>Falsche erneut versuchen</button>}
          </>
        ) : (
          <button className="btn-primary" style={{ background: caseStudy.accent }} onClick={onComplete}>
            Weiter →
          </button>
        )}
      </div>

      {checked && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-wide text-sub">BEGRÜNDUNGEN</p>
          {caseStudy.items.map((it) => {
            const revealed = status[it.id] === 'correct';
            return (
              <div
                key={it.id}
                className="rounded-[10px] p-3 text-[13px] leading-relaxed"
                style={{
                  background: revealed ? 'color-mix(in srgb, var(--good) 8%, transparent)' : 'var(--panel-2)',
                  border: `1px solid ${revealed ? 'color-mix(in srgb, var(--good) 40%, transparent)' : 'var(--line)'}`,
                }}
              >
                <p className="font-bold text-ink mb-0.5">{revealed ? '🔓' : '🔒'} {it.label}</p>
                {revealed ? (
                  <p className="text-ink/85 animate-fade-in-up">{it.explanation}</p>
                ) : (
                  <p className="text-sub italic">Erst nach korrekter Zuordnung sichtbar.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
