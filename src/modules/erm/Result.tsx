import { useEffect } from 'react';
import { normERM, type ERMCanvasEdge, type ERMCanvasNode, type ERMTask } from './data';
import { PrimaryButton, SecondaryButton } from '../../components/ui';

// ============================================================
// Auswertung — Pendant zu ERMResultView.swift.
// Bei eigenem Text (keine Musterlösung) gibt es eine reine Übersicht,
// sonst eine Bewertung mit Prozentscore und Detail-Feedback je Kategorie.
// ============================================================

interface CheckItem {
  ok: boolean;
  text: string;
  note?: string;
}

export function ErmResult({
  task,
  nodes,
  edges,
  onRetry,
  onMenu,
  onScored,
}: {
  task: ERMTask;
  nodes: ERMCanvasNode[];
  edges: ERMCanvasEdge[];
  onRetry: () => void;
  onMenu: () => void;
  onScored?: (pct: number) => void;
}) {
  const userEntities = nodes.filter((n) => n.type === 'entity').map((n) => n.label);
  const userRelations = nodes.filter((n) => n.type === 'relation').map((n) => n.label);
  const userAttrs = nodes.filter((n) => n.type === 'attr').map((n) => n.label);
  const hasSolution = task.solution.entities.length > 0;
  const sol = task.solution;

  const entRes: CheckItem[] = sol.entities.map((e) => ({
    ok: userEntities.some((u) => normERM(u) === normERM(e.name)),
    text: e.name,
  }));

  const pkRes: CheckItem[] = sol.entities.map((e) => ({
    ok: nodes.some((n) => normERM(n.label) === normERM(e.pk)),
    text: `${e.pk} (${e.name})`,
  }));

  const relRes: CheckItem[] = sol.relations.map((r) => ({
    ok: userRelations.some((rel) => {
      const a = normERM(rel);
      const b = normERM(r.name);
      return a.includes(b.slice(0, 5)) || b.includes(a.slice(0, 5));
    }),
    text: r.name,
  }));

  const allSolAttrs: string[] = [];
  sol.entities.forEach((e) => allSolAttrs.push(...e.attrs));
  sol.relations.forEach((r) => allSolAttrs.push(...r.relAttrs));
  const attrRes: CheckItem[] = allSolAttrs.map((a) => ({
    ok: userAttrs.some((u) => normERM(u) === normERM(a)),
    text: a,
  }));

  function normCard(arr: string[]): string {
    return arr
      .map((c) => (c === 'M' ? 'N' : c))
      .slice()
      .sort()
      .join('');
  }

  const cardRes: CheckItem[] = sol.relations.map((r) => {
    const relNode = nodes.find(
      (n) =>
        n.type === 'relation' &&
        (normERM(n.label).includes(normERM(r.name).slice(0, 5)) || normERM(r.name).includes(normERM(n.label).slice(0, 5))),
    );
    if (!relNode) {
      return { ok: false, text: `${r.name}: ${r.card}`, note: 'Beziehung fehlt' };
    }
    const relEdges = edges.filter((e) => e.fromNodeID === relNode.id || e.toNodeID === relNode.id);
    const cardsOnRel = relEdges.map((e) => (e.fromNodeID === relNode.id ? e.cardFrom : e.cardTo));
    const expected = r.card.split(':');
    const ok = relEdges.length >= 2 && normCard(cardsOnRel.slice(0, 2)) === normCard(expected);
    return {
      ok,
      text: `${r.name}: ${r.card}`,
      note: ok ? undefined : relEdges.length < 2 ? 'Beziehung nicht beidseitig verbunden' : `erwartet ${r.card}`,
    };
  });

  const gotTotal =
    [entRes, pkRes, relRes, cardRes].reduce((sum, arr) => sum + arr.filter((i) => i.ok).length, 0) +
    attrRes.filter((i) => i.ok).length;
  const maxTotal = sol.entities.length * 2 + sol.relations.length * 2 + allSolAttrs.length;
  const pct = hasSolution && maxTotal > 0 ? Math.round((gotTotal / maxTotal) * 100) : 0;
  const gradeColor = pct >= 75 ? 'var(--good)' : pct >= 45 ? 'var(--warn)' : 'var(--bad)';
  const grade =
    pct >= 90 ? 'Sehr gut' : pct >= 75 ? 'Gut' : pct >= 60 ? 'Befriedigend' : pct >= 45 ? 'Ausreichend' : 'Nochmal üben';

  useEffect(() => {
    if (hasSolution) onScored?.(pct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSolution, pct]);

  if (!hasSolution) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-ink font-bold text-xl">Freies Üben — keine automatische Bewertung</h2>
        <p className="text-sub text-sm leading-relaxed">
          Für eigenen Text gibt es keine hinterlegte Musterlösung. Hier ist deine Übersicht zur Selbstkontrolle:
        </p>
        <div className="bg-bg rounded-[10px] p-4 flex flex-col gap-2.5">
          <SummaryRow label="Entitäten" items={userEntities} color="var(--entity)" />
          <SummaryRow label="Beziehungen" items={userRelations} color="var(--relation)" />
          <SummaryRow label="Attribute" items={userAttrs} color="var(--attribute)" />
          <span className="text-sub text-[13px]">{edges.length} Verbindung(en) gezeichnet</span>
        </div>
        <div className="flex gap-2.5">
          <PrimaryButton color="var(--entity)" onClick={onRetry}>
            Zurück zum Modell
          </PrimaryButton>
          <SecondaryButton onClick={onMenu}>Menü</SecondaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="card p-[22px] flex flex-col items-center gap-2 text-center">
        <span className="font-bold" style={{ fontSize: 48, color: gradeColor }}>
          {pct}%
        </span>
        <span className="font-bold text-base" style={{ color: gradeColor }}>
          {grade}
        </span>
        <span className="text-sub text-[13px]">
          {gotTotal} / {maxTotal} Punkte
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        <FeedbackCard title="Entitäten" color="var(--entity)" items={entRes} />
        <FeedbackCard title="Primärschlüssel" color="var(--pk)" items={pkRes} />
        <FeedbackCard title="Beziehungen" color="var(--relation)" items={relRes} />
        <FeedbackCard title="Kardinalitäten" color="#9333ea" items={cardRes} />
        <FeedbackCard title="Attribute" color="var(--attribute)" items={attrRes} />
      </div>

      <div className="flex gap-2.5">
        <PrimaryButton color="var(--entity)" onClick={onRetry}>
          Modell verbessern
        </PrimaryButton>
        <SecondaryButton onClick={onMenu}>Neue Aufgabe</SecondaryButton>
      </div>
    </div>
  );
}

function SummaryRow({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="flex items-start gap-1.5">
      <span className="font-bold text-[13px] shrink-0" style={{ color }}>
        {label}:
      </span>
      <span className="text-ink text-[13px]">{items.length === 0 ? '—' : items.join(', ')}</span>
    </div>
  );
}

function FeedbackCard({ title, color, items }: { title: string; color: string; items: CheckItem[] }) {
  return (
    <div className="card p-4 flex flex-col gap-2.5">
      <span className="font-bold uppercase tracking-wide" style={{ fontSize: 12, color }}>
        {title}
      </span>
      <div className="flex flex-col gap-1.5">
        {items.length === 0 && <span className="text-sub text-[13px]">—</span>}
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span
              className="flex items-center justify-center rounded-full font-bold text-white shrink-0"
              style={{ width: 18, height: 18, fontSize: 10, background: item.ok ? 'var(--good)' : 'var(--bad)', marginTop: 1 }}
            >
              {item.ok ? '✓' : '×'}
            </span>
            <div className="flex flex-col">
              <span style={{ fontSize: 13.5, color: item.ok ? 'var(--ink)' : 'var(--sub)' }}>{item.text}</span>
              {item.note && (
                <span className="text-warn" style={{ fontSize: 11 }}>
                  — {item.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
