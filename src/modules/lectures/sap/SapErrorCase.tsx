import { useState } from 'react';
import { PRUEFUNGSART_LABELS, type PruefungsartId, type SapErrorCase as SapErrorCaseType } from '../types';

// ============================================================
// Fehlermeldungs-Fall: Ein SAP-Beleg mit Fehlermeldung wird
// gezeigt (wie im echten Screenshot), der Nutzer muss erkennen,
// um welche der vier programmierten Kontrollen es sich handelt.
// ============================================================

const OPTIONS: PruefungsartId[] = ['format', 'ausschluss', 'plausibilitaet', 'vollstaendigkeit'];

export function SapErrorCase({
  errorCase,
  color,
  onComplete,
}: {
  errorCase: SapErrorCaseType;
  color: string;
  onComplete: () => void;
}) {
  const [picked, setPicked] = useState<PruefungsartId | null>(null);
  const answered = picked !== null;
  const isCorrect = picked === errorCase.correctPruefungsart;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{errorCase.scenario}</p>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--line)' }}>
        <div className="px-4 py-2.5 flex items-center gap-2 text-white text-[13px] font-bold" style={{ background: color }}>
          <span className="opacity-80">SAP</span>
          <span>{errorCase.screenTitle}</span>
        </div>
        <div className="p-4 flex flex-col gap-3 bg-bg">
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--line)' }}>
            <div className="grid grid-cols-3 text-[11px] font-bold text-sub bg-panel px-3 py-2">
              <span>Sachkonto</span>
              <span className="text-right">Soll</span>
              <span className="text-right">Haben</span>
            </div>
            {errorCase.belegLines.map((line, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-[13px] px-3 py-2 border-t"
                style={{
                  borderColor: 'var(--line)',
                  background: line.highlight ? 'color-mix(in srgb, var(--bad) 12%, var(--panel-2))' : 'var(--panel-2)',
                  color: 'var(--ink)',
                }}
              >
                <span className="font-semibold">{line.konto}</span>
                <span className="text-right">{line.soll}</span>
                <span className="text-right">{line.haben}</span>
              </div>
            ))}
          </div>

          <div
            className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-[12.5px]"
            style={{ background: 'color-mix(in srgb, var(--bad) 12%, var(--panel-2))', border: '1px solid var(--bad)' }}
          >
            <span aria-hidden>❌</span>
            <span className="text-ink">{errorCase.errorMessage}</span>
          </div>
        </div>
      </div>

      <p className="text-[12.5px] font-semibold" style={{ color }}>
        Um welche Art der programmierten Kontrolle handelt es sich hierbei?
      </p>

      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => {
          const info = PRUEFUNGSART_LABELS[opt];
          const showCorrect = answered && opt === errorCase.correctPruefungsart;
          const showWrong = answered && picked === opt && opt !== errorCase.correctPruefungsart;
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setPicked(opt)}
              className="text-left px-3.5 py-2.5 rounded-lg text-[13.5px] border transition-colors disabled:cursor-default"
              style={{
                borderColor: showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'var(--line)',
                background: showCorrect
                  ? 'color-mix(in srgb, var(--good) 12%, var(--panel-2))'
                  : showWrong
                    ? 'color-mix(in srgb, var(--bad) 12%, var(--panel-2))'
                    : 'var(--panel-2)',
                color: 'var(--ink)',
              }}
            >
              <span className="font-bold">{info.label}</span>
              {answered && (showCorrect || showWrong) && <span className="block text-[12px] text-sub mt-0.5">{info.desc}</span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className="rounded-[10px] p-3.5 text-[13px] leading-relaxed animate-fade-in-up"
          style={{
            background: isCorrect ? 'color-mix(in srgb, var(--good) 10%, transparent)' : 'color-mix(in srgb, var(--warn) 10%, transparent)',
            border: `1px solid color-mix(in srgb, ${isCorrect ? 'var(--good)' : 'var(--warn)'} 40%, transparent)`,
          }}
        >
          <p className="font-bold text-ink mb-1">{isCorrect ? '✅ Richtig!' : '💡 Erklärung'}</p>
          <p className="text-ink/85">{errorCase.explanation}</p>
        </div>
      )}

      {answered && (
        <button className="btn-primary self-start" style={{ background: color }} onClick={onComplete}>
          Weiter →
        </button>
      )}
    </div>
  );
}
