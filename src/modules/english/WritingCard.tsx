import { useState } from 'react';
import { PrimaryButton } from '../../components/ui';
import type { WritingExample } from './writing';

// ============================================================
// SCHREIBTRAINING-KARTE — die deutsche Vorlage bleibt sichtbar
// (das sind die "gegebenen Informationen" wie in der Klausur),
// darunter ein Entwurfsfeld (nicht gespeichert, nur zum Selbst-
// Formulieren) und ein Button, der die englische Musterlösung
// aufdeckt. Die Selbsteinschätzung danach steuert wie bei den
// Karteikarten das nächste Wiederholungsintervall.
// ============================================================

const COLOR = 'var(--english)';

export function WritingCard({
  item,
  eyebrow,
  revealed,
  onReveal,
}: {
  item: WritingExample;
  eyebrow: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  const [draft, setDraft] = useState('');

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: COLOR }}>
          {eyebrow}
        </span>
        <h3 className="text-ink font-bold text-lg leading-snug">{item.title}</h3>
      </div>

      <div className="rounded-lg p-4 bg-panel-2 text-ink text-[14.5px] leading-relaxed whitespace-pre-line">
        {item.de}
      </div>

      {!revealed && (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Schreibe hier deine englische Version (optional, wird nicht gespeichert) …"
            rows={7}
            className="rounded-lg p-3 bg-bg border text-ink text-[14px] leading-relaxed resize-y focus:outline-none"
            style={{ borderColor: 'var(--line)' }}
          />
          <PrimaryButton color={COLOR} onClick={onReveal} className="self-start">
            Musterlösung anzeigen
          </PrimaryButton>
        </>
      )}

      {revealed && (
        <div
          className="rounded-lg p-4 text-ink text-[14.5px] leading-relaxed whitespace-pre-line"
          style={{ backgroundColor: `color-mix(in srgb, ${COLOR} 12%, transparent)`, border: `1px solid ${COLOR}` }}
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: COLOR }}>
            Musterlösung · Englisch
          </span>
          {item.en}
        </div>
      )}
    </div>
  );
}
