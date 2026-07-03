import type { PapLevel } from './data';
import { PapActionButton, PapShapeIcon } from './ShapeIcon';

// ============================================================
// PAP-QUEST — Gemeinsames Feedback & Steuerung
// Portiert aus PapFeedbackControls.swift (PapFeedback, PapPill,
// PapFeedbackAndControls, PapExplainCard).
// ============================================================

export type PapFeedback = 'incomplete' | 'wrong' | 'correct' | null;

export function PapPill({ text, color }: { text: string; color: string }) {
  return (
    <div
      className="text-[13.5px] font-semibold rounded-[10px] px-3.5 py-[10px]"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 50%, transparent)`,
      }}
    >
      {text}
    </div>
  );
}

export function PapFeedbackAndControls({
  feedback,
  showHint,
  onToggleHint,
  hint,
  onCheck,
  onContinue,
  onReset,
}: {
  feedback: PapFeedback;
  showHint: boolean;
  onToggleHint: () => void;
  hint: string;
  onCheck: () => void;
  onContinue: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 pt-1">
      {feedback === 'incomplete' && (
        <PapPill text="⚠️ Noch nicht alle Felder gefüllt!" color="var(--pap-decision)" />
      )}
      {feedback === 'wrong' && (
        <PapPill text="❌ Noch nicht ganz richtig. Schau dir den Tipp an und versuch's nochmal!" color="#F87171" />
      )}
      {feedback === 'correct' && (
        <PapPill text="✅ Korrekt! Du hast den Level gemeistert." color="var(--pap-action)" />
      )}

      {showHint && feedback !== 'correct' && (
        <div
          className="text-[13px] text-ink rounded-[10px] px-3.5 py-[10px]"
          style={{
            background: 'color-mix(in srgb, var(--pap-decision) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--pap-decision) 40%, transparent)',
          }}
        >
          💡 {hint}
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        {feedback !== 'correct' ? (
          <>
            <PapActionButton label="Prüfen" primary onClick={onCheck} />
            <PapActionButton label="Zurücksetzen" onClick={onReset} />
            <PapActionButton label={showHint ? 'Tipp verbergen' : 'Tipp anzeigen 💡'} onClick={onToggleHint} />
          </>
        ) : (
          <PapActionButton label="Weiter zum nächsten Level →" primary glow onClick={onContinue} />
        )}
      </div>
    </div>
  );
}

export function PapExplainCard({ level }: { level: PapLevel }) {
  return (
    <div
      className="rounded-2xl p-[18px] border border-line"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--pap-control) 8%, transparent), color-mix(in srgb, var(--pap-action) 5%, transparent))',
      }}
    >
      <p className="text-sm text-ink leading-relaxed">{level.explain}</p>

      {level.table && (
        <div className="flex flex-col gap-2 mt-3.5">
          {level.table.map((row, i) => (
            <div key={i} className="flex items-center gap-3 px-2.5 py-2 rounded-lg bg-bg">
              <PapShapeIcon type={row.shape} size={26} color="var(--ink)" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-ink">{row.name}</span>
                <span className="text-[11.5px] text-sub">{row.rule}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
