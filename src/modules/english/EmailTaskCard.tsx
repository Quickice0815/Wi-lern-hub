import { useState } from 'react';
import { PrimaryButton } from '../../components/ui';
import type { EmailTask } from './writing';

// ============================================================
// E-MAIL-KLAUSURAUFGABE — exaktes Klausurformat: kurze deutsche
// Situation + Stichpunkte, was die E-Mail enthalten muss, plus
// Wortzahl-Vorgabe. Kein fertiger deutscher Text zum Übersetzen —
// genau wie in der echten Prüfung. Entwurfsfeld ist optional und
// wird nicht gespeichert; die englische Musterlösung wird erst
// nach eigenem Versuch aufgedeckt.
// ============================================================

const COLOR = 'var(--english)';

export function EmailTaskCard({
  task,
  revealed,
  onReveal,
}: {
  task: EmailTask;
  revealed: boolean;
  onReveal: () => void;
}) {
  const [draft, setDraft] = useState('');

  return (
    <div className="card p-5 flex flex-col gap-4">
      <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: COLOR }}>
        E-Mail schreiben · Klausuraufgabe
      </span>

      <div className="rounded-lg p-4 bg-panel-2 text-ink text-[14.5px] leading-relaxed flex flex-col gap-3">
        <p>{task.scenario}</p>
        <p className="font-bold">{task.instruction}</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          {task.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {task.wordCount && <p className="text-sub text-xs">Schreiben Sie {task.wordCount}.</p>}
      </div>

      {!revealed && (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Schreibe hier deine englische E-Mail (optional, wird nicht gespeichert) …"
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
          {task.modelEmail}
        </div>
      )}
    </div>
  );
}
