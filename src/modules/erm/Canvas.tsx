import { useCallback, useMemo, useRef, useState } from 'react';
import {
  makeId,
  nodeTypeColorVar,
  normERM,
  tokenizeERM,
  type ERMCanvasEdge,
  type ERMCanvasNode,
  type ERMNodeType,
  type ERMTask,
} from './data';
import { PrimaryButton, SecondaryButton } from '../../components/ui';

// ============================================================
// Modellieren — Pendant zu ERMCanvasView.swift.
//
// Interaktion (Web-Übersetzung des SwiftUI DragGesture/TapGesture-Musters):
//  - Bausteine aus der Palette anklicken → Knoten wird aufs Feld gesetzt.
//  - Knoten per Maus/Touch ziehen (Pointer Events + setPointerCapture)
//    verschiebt ihn frei auf dem Feld (Positionen sind fraktional, 0..1,
//    damit das Layout bei jeder Bildschirmgröße stimmt).
//  - Ein Klick ohne Ziehen auf einen Knoten startet den "Verbinden"-Modus;
//    ein Klick auf einen zweiten Knoten zieht eine Kante; nochmal auf den
//    Startknoten klicken bricht ab (exakt wie im Original).
//  - An den Kanten kann die Kardinalität (1/N/M) durchgeklickt werden.
// ============================================================

const DRAG_THRESHOLD = 5;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function ErmCanvas({
  task,
  labels,
  nodes,
  setNodes,
  edges,
  setEdges,
  onCheck,
  onBackToSelect,
}: {
  task: ERMTask;
  labels: Record<number, ERMNodeType>;
  nodes: ERMCanvasNode[];
  setNodes: (n: ERMCanvasNode[] | ((prev: ERMCanvasNode[]) => ERMCanvasNode[])) => void;
  edges: ERMCanvasEdge[];
  setEdges: (e: ERMCanvasEdge[] | ((prev: ERMCanvasEdge[]) => ERMCanvasEdge[])) => void;
  onCheck: () => void;
  onBackToSelect: () => void;
}) {
  const tokens = useMemo(() => tokenizeERM(task.text), [task.text]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [linkingFrom, setLinkingFrom] = useState<string | null>(null);

  const palette = useMemo(() => {
    const seen = new Set<string>();
    const result: { label: string; type: ERMNodeType }[] = [];
    const placedNorm = new Set(nodes.map((n) => normERM(n.label)));
    const ids = Object.keys(labels)
      .map(Number)
      .sort((a, b) => a - b);
    for (const i of ids) {
      const type = labels[i];
      const word = tokens.find((t) => t.id === i)?.word;
      if (!word) continue;
      const key = normERM(word) + type;
      if (seen.has(key)) continue;
      seen.add(key);
      if (type === 'attr' || !placedNorm.has(normERM(word))) {
        result.push({ label: word, type });
      }
    }
    return result;
  }, [labels, tokens, nodes]);

  const addNode = useCallback(
    (label: string, type: ERMNodeType) => {
      setNodes((prev) => {
        const idx = prev.length;
        const col = idx % 4;
        const row = Math.floor(idx / 4);
        const jitterX = (Math.random() - 0.5) * 0.05;
        const jitterY = (Math.random() - 0.5) * 0.05;
        const x = clamp(0.14 + col * 0.22 + jitterX, 0.08, 0.92);
        const y = clamp(0.16 + row * 0.24 + jitterY, 0.1, 0.9);
        return [...prev, { id: makeId('node'), label, type, position: { x, y } }];
      });
    },
    [setNodes],
  );

  const removeNode = useCallback(
    (id: string) => {
      setNodes((prev) => prev.filter((n) => n.id !== id));
      setEdges((prev) => prev.filter((e) => e.fromNodeID !== id && e.toNodeID !== id));
      setLinkingFrom((cur) => (cur === id ? null : cur));
    },
    [setNodes, setEdges],
  );

  const handleTap = useCallback(
    (id: string) => {
      if (linkingFrom == null) {
        setLinkingFrom(id);
        return;
      }
      if (linkingFrom === id) {
        setLinkingFrom(null);
        return;
      }
      const from = linkingFrom;
      setEdges((prev) => {
        const exists = prev.some(
          (e) => (e.fromNodeID === from && e.toNodeID === id) || (e.fromNodeID === id && e.toNodeID === from),
        );
        if (exists) return prev;
        return [...prev, { id: makeId('edge'), fromNodeID: from, toNodeID: id, cardFrom: '1', cardTo: 'N' }];
      });
      setLinkingFrom(null);
    },
    [setEdges, linkingFrom],
  );

  const cycleCard = useCallback(
    (edgeId: string, side: 'cardFrom' | 'cardTo') => {
      const cycle = ['1', 'N', 'M'];
      setEdges((prev) =>
        prev.map((e) => {
          if (e.id !== edgeId) return e;
          const curIdx = cycle.indexOf(e[side]);
          const next = cycle[(curIdx + 1) % cycle.length];
          return { ...e, [side]: next };
        }),
      );
    },
    [setEdges],
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      setEdges((prev) => prev.filter((e) => e.id !== edgeId));
    },
    [setEdges],
  );

  // ---------- Dragging ----------
  const dragRef = useRef<{ id: string; moved: boolean; startX: number; startY: number } | null>(null);

  function onNodePointerDown(e: React.PointerEvent, id: string) {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragRef.current = { id, moved: false, startX: e.clientX, startY: e.clientY };
  }

  function onNodePointerMove(e: React.PointerEvent, id: string) {
    const drag = dragRef.current;
    if (!drag || drag.id !== id) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    drag.moved = true;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = clamp((e.clientX - rect.left) / rect.width, 0.03, 0.97);
    const fy = clamp((e.clientY - rect.top) / rect.height, 0.05, 0.95);
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, position: { x: fx, y: fy } } : n)));
  }

  function onNodePointerUp(e: React.PointerEvent, id: string) {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag && drag.id === id && !drag.moved) {
      handleTap(id);
    }
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Palette */}
      <div className="bg-panel rounded-t-2xl">
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5">
          {palette.map((item, i) => (
            <button
              key={`${item.label}-${item.type}-${i}`}
              onClick={() => addNode(item.label, item.type)}
              className="shrink-0 font-semibold text-white rounded-[7px] px-3 py-2 whitespace-nowrap"
              style={{
                fontSize: 13,
                background: `color-mix(in srgb, ${nodeTypeColorVar[item.type]} 30%, transparent)`,
                border: `1.2px solid ${nodeTypeColorVar[item.type]}`,
              }}
            >
              {item.label}
            </button>
          ))}
          {palette.length === 0 && <span className="text-sub text-xs py-2">Alles platziert ✓</span>}
        </div>
      </div>

      <p
        className="px-4 pt-2 pb-2 text-left"
        style={{ fontSize: 12, fontWeight: linkingFrom ? 700 : 400, color: linkingFrom ? 'var(--relation)' : 'var(--sub)' }}
      >
        {linkingFrom
          ? '↔ Ziel-Knoten anklicken (oder Quelle erneut zum Abbrechen)'
          : 'Tipp: Knoten anklicken, dann Ziel anklicken, dann Kardinalität an der Linie wechseln. Zum Verschieben ziehen.'}
      </p>

      {/* Canvas surface */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ minHeight: 420, background: 'var(--bg)', border: '1px solid var(--line)', touchAction: 'none' }}
      >
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
            <span className="text-sub text-[13px]">Klicke Bausteine oben an, um sie aufs Feld zu setzen</span>
          </div>
        )}

        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map((edge) => {
            const a = nodes.find((n) => n.id === edge.fromNodeID);
            const b = nodes.find((n) => n.id === edge.toNodeID);
            if (!a || !b) return null;
            return (
              <line
                key={edge.id}
                x1={a.position.x * 100}
                y1={a.position.y * 100}
                x2={b.position.x * 100}
                y2={b.position.y * 100}
                stroke="var(--sub)"
                strokeWidth={0.35}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* Edge controls (cardinality + delete) */}
        {edges.map((edge) => {
          const a = nodes.find((n) => n.id === edge.fromNodeID);
          const b = nodes.find((n) => n.id === edge.toNodeID);
          if (!a || !b) return null;
          const isStructural =
            (a.type === 'entity' || a.type === 'relation') && (b.type === 'entity' || b.type === 'relation');
          const mid = { x: (a.position.x + b.position.x) / 2, y: (a.position.y + b.position.y) / 2 };
          const nearA = { x: a.position.x * 0.72 + b.position.x * 0.28, y: a.position.y * 0.72 + b.position.y * 0.28 };
          const nearB = { x: a.position.x * 0.28 + b.position.x * 0.72, y: a.position.y * 0.28 + b.position.y * 0.72 };
          return (
            <div key={edge.id}>
              {isStructural && (
                <>
                  <CardinalityLabel point={nearA} value={edge.cardFrom} onClick={() => cycleCard(edge.id, 'cardFrom')} />
                  <CardinalityLabel point={nearB} value={edge.cardTo} onClick={() => cycleCard(edge.id, 'cardTo')} />
                </>
              )}
              <button
                onClick={() => removeEdge(edge.id)}
                aria-label="Verbindung löschen"
                className="absolute flex items-center justify-center rounded-full text-white font-bold"
                style={{
                  left: `${mid.x * 100}%`,
                  top: `${mid.y * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  background: 'var(--bad)',
                }}
              >
                ×
              </button>
            </div>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{ left: `${node.position.x * 100}%`, top: `${node.position.y * 100}%`, transform: 'translate(-50%, -50%)' }}
            onPointerDown={(e) => onNodePointerDown(e, node.id)}
            onPointerMove={(e) => onNodePointerMove(e, node.id)}
            onPointerUp={(e) => onNodePointerUp(e, node.id)}
          >
            <ErmCanvasNodeView node={node} isLinking={linkingFrom === node.id} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Knoten löschen"
              className="absolute flex items-center justify-center rounded-full font-bold"
              style={{
                top: -8,
                right: -8,
                width: 18,
                height: 18,
                fontSize: 11,
                color: 'var(--bad)',
                background: '#fff',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 py-4">
        <SecondaryButton onClick={onBackToSelect}>← Andere Aufgabe</SecondaryButton>
        <PrimaryButton color="var(--good)" textColor="#06210f" onClick={onCheck}>
          Auswerten ✓
        </PrimaryButton>
      </div>
    </div>
  );
}

function CardinalityLabel({ point, value, onClick }: { point: { x: number; y: number }; value: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center justify-center font-bold rounded-md"
      style={{
        left: `${point.x * 100}%`,
        top: `${point.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: 26,
        height: 26,
        fontSize: 13,
        color: 'var(--relation)',
        background: 'var(--panel)',
        border: '1.5px solid var(--relation)',
      }}
    >
      {value}
    </button>
  );
}

function ErmCanvasNodeView({ node, isLinking }: { node: ERMCanvasNode; isLinking: boolean }) {
  const ringStyle: React.CSSProperties = isLinking
    ? { outline: '2px solid var(--relation)', outlineOffset: 4, borderRadius: 10 }
    : {};

  if (node.type === 'relation') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: 76, height: 54, ...ringStyle, boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
      >
        <div
          className="flex items-center justify-center text-white font-semibold text-center"
          style={{
            width: 62,
            height: 44,
            background: `color-mix(in srgb, ${nodeTypeColorVar.relation} 50%, transparent)`,
            border: `2px solid ${nodeTypeColorVar.relation}`,
            borderRadius: 2,
            transform: 'rotate(45deg)',
          }}
        >
          <span style={{ transform: 'rotate(-45deg)', fontSize: 11.5, padding: 4, wordBreak: 'break-word' }}>
            {node.label}
          </span>
        </div>
      </div>
    );
  }

  if (node.type === 'attr' || node.type === 'pk') {
    return (
      <div
        className="flex items-center justify-center text-white font-semibold text-center px-3 py-2"
        style={{
          minWidth: 70,
          minHeight: 44,
          fontSize: 12,
          textDecoration: node.type === 'pk' ? 'underline' : 'none',
          background: `color-mix(in srgb, ${nodeTypeColorVar.attr} 50%, transparent)`,
          border: `2px solid ${node.type === 'pk' ? nodeTypeColorVar.pk : nodeTypeColorVar.attr}`,
          borderRadius: 999,
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
          ...ringStyle,
        }}
      >
        {node.label}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center text-white font-semibold text-center px-2.5 py-2.5"
      style={{
        minWidth: 90,
        minHeight: 44,
        fontSize: 12.5,
        background: `color-mix(in srgb, ${nodeTypeColorVar.entity} 50%, transparent)`,
        border: `2px solid ${nodeTypeColorVar.entity}`,
        borderRadius: 6,
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        ...ringStyle,
      }}
    >
      {node.label}
    </div>
  );
}
