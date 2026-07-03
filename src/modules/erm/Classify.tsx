import { useMemo, useState } from 'react';
import {
  ERM_NODE_TYPES,
  nodeTypeColorVar,
  nodeTypeDesc,
  nodeTypeLabel,
  tokenizeERM,
  type ERMNodeType,
  type ERMTask,
} from './data';
import { PrimaryButton } from '../../components/ui';

// ============================================================
// Markieren — Pendant zu ERMClassifyView.swift.
// Statt SwiftUI-Tap-Gesten auf einem Custom-WrapLayout: klickbare
// <span>-Wörter in einem flex-wrap-Absatz. Nochmal klicken entfernt
// die Markierung (gleiches Verhalten wie im Original).
// ============================================================

function shapeIndicator(type: ERMNodeType) {
  const color = nodeTypeColorVar[type];
  if (type === 'relation') {
    return <span className="inline-block" style={{ width: 10, height: 10, background: color, transform: 'rotate(45deg)' }} />;
  }
  if (type === 'attr') {
    return <span className="inline-block rounded-full" style={{ width: 11, height: 11, background: color }} />;
  }
  return <span className="inline-block rounded-[2px]" style={{ width: 11, height: 11, background: color }} />;
}

export function ErmClassify({
  task,
  labels,
  setLabels,
  onNext,
}: {
  task: ERMTask;
  labels: Record<number, ERMNodeType>;
  setLabels: (l: Record<number, ERMNodeType>) => void;
  onNext: () => void;
}) {
  const [activeType, setActiveType] = useState<ERMNodeType>('entity');
  const tokens = useMemo(() => tokenizeERM(task.text), [task.text]);

  const counts = useMemo(() => {
    const c: Partial<Record<ERMNodeType, number>> = {};
    for (const v of Object.values(labels)) c[v] = (c[v] ?? 0) + 1;
    return c;
  }, [labels]);

  function toggle(id: number) {
    const next = { ...labels };
    if (next[id] === activeType) {
      delete next[id];
    } else {
      next[id] = activeType;
    }
    setLabels(next);
  }

  const labelCount = Object.keys(labels).length;
  const entityCount = counts.entity ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {ERM_NODE_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className="flex items-center gap-1.5 font-semibold rounded-[9px] px-3 py-2.5 transition-colors"
            style={{
              fontSize: 13,
              color: activeType === t ? '#fff' : 'var(--ink)',
              background: activeType === t ? nodeTypeColorVar[t] : 'var(--panel-2)',
            }}
          >
            {shapeIndicator(t)}
            {nodeTypeLabel[t]}
            <span className="opacity-70">{counts[t] ?? 0}</span>
          </button>
        ))}
      </div>

      <p className="text-sub" style={{ fontSize: 12.5 }}>
        Aktiv: {nodeTypeLabel[activeType]} — {nodeTypeDesc[activeType]}. Klicke Wörter an (nochmal klicken = entfernen).
      </p>

      <div className="card p-[18px]" style={{ minHeight: 220 }}>
        <div className="flex flex-wrap items-baseline" style={{ gap: '2px 2px', rowGap: 6 }}>
          {tokens.map((token) => {
            if (!token.isWord) {
              return (
                <span key={token.id} className="text-ink whitespace-pre" style={{ fontSize: 16 }}>
                  {token.word}
                </span>
              );
            }
            const lab = labels[token.id];
            const color = lab ? nodeTypeColorVar[lab] : undefined;
            return (
              <button
                key={token.id}
                onClick={() => toggle(token.id)}
                className="rounded transition-colors"
                style={{
                  fontSize: 16,
                  fontWeight: lab ? 600 : 400,
                  color: color ? '#fff' : 'var(--ink)',
                  background: color ? `color-mix(in srgb, ${color} 35%, transparent)` : 'transparent',
                  border: `1.2px solid ${color ?? 'transparent'}`,
                  padding: '2px 4px',
                }}
              >
                {token.word}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sub" style={{ fontSize: 12.5 }}>
          {labelCount} Wörter markiert
        </span>
        <PrimaryButton
          color={entityCount > 0 ? 'var(--relation)' : 'var(--panel-2)'}
          textColor={entityCount > 0 ? '#fff' : 'var(--sub)'}
          disabled={entityCount === 0}
          onClick={onNext}
        >
          Weiter zum Modell →
        </PrimaryButton>
      </div>
    </div>
  );
}
