import { useState } from 'react';
import { PrimaryButton } from '../../components/ui';
import type { ReportTask } from './writing';
import { PieChart, BarChart } from './charts';

// ============================================================
// REPORT-KLAUSURAUFGABE — exaktes Klausurformat: kurze deutsche
// Situation + ein oder mehrere Diagramme (Umfrageergebnisse), aus
// denen der englische Report entstehen soll. Kein deutscher
// Fließtext mit den Ergebnissen — die Diagramme SIND die
// Information, genau wie in der echten Prüfung.
// ============================================================

const COLOR = 'var(--english)';

export function ReportTaskCard({
  task,
  revealed,
  onReveal,
}: {
  task: ReportTask;
  revealed: boolean;
  onReveal: () => void;
}) {
  const [draft, setDraft] = useState('');

  return (
    <div className="card p-5 flex flex-col gap-4">
      <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: COLOR }}>
        Report schreiben · Klausuraufgabe
      </span>

      <div className="rounded-lg p-4 bg-panel-2 text-ink text-[14.5px] leading-relaxed flex flex-col gap-4">
        <p>{task.scenario}</p>

        <div className="flex flex-col gap-5">
          {task.charts.map((chart, i) =>
            chart.type === 'pie' ? (
              <PieChart key={i} title={chart.title} data={chart.data} />
            ) : (
              <BarChart
                key={i}
                title={chart.title}
                unit={chart.unit}
                oldLabel={chart.oldLabel}
                newLabel={chart.newLabel}
                data={chart.data}
              />
            ),
          )}
        </div>

        <ul className="list-disc pl-5 flex flex-col gap-1 text-sub">
          {task.hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <p className="text-sub text-xs">Verfassen Sie Ihren Bericht (mindestens {task.minWords} Wörter).</p>
      </div>

      {!revealed && (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Schreibe hier deinen englischen Report (optional, wird nicht gespeichert) …"
            rows={9}
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
          {task.modelReport}
        </div>
      )}
    </div>
  );
}
