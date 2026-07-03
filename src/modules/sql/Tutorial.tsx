import { useEffect, useState } from 'react';
import { SqlTutorialContent, type SqlTutorialStep } from './data';
import { SqlScreenshot } from './DataTable';
import { PrimaryButton } from '../../components/ui';

// ============================================================
// SQL-TRAINER — Tutorial (Portiert aus SqlModeAndTutorialView.swift)
// Fünf Schritte, jeder mit Erklärung + Mini-Frage. Erst bei
// richtiger Antwort geht es weiter.
// ============================================================

function TutorialStepView({
  step,
  stepIndex,
  totalSteps,
  onNext,
}: {
  step: SqlTutorialStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === step.correctIndex;

  useEffect(() => {
    setSelected(null);
  }, [step.key]);

  const paddedFields = step.fieldsDemo
    ? [
        ...step.fieldsDemo,
        ...Array.from({ length: Math.max(0, 4 - step.fieldsDemo.length) }, () => ({
          label: '—',
          chips: [],
        })),
      ]
    : null;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-[3px]"
            style={{ backgroundColor: i <= stepIndex ? '#22d3ee' : 'var(--panel-2)' }}
          />
        ))}
      </div>
      <p className="text-sql-cyan text-[11px] font-bold">
        TUTORIAL {stepIndex + 1} / {totalSteps}
      </p>
      <h2 className="text-ink font-bold text-xl">{step.title}</h2>
      <p className="text-ink/90 text-sm leading-relaxed">{step.explain}</p>

      {step.demoTable && (
        <div className="rounded-[10px] border border-line overflow-hidden">
          <div className="flex bg-panel-2">
            {step.demoTable.headers.map((h) => (
              <span key={h} className="flex-1 p-2 text-ink text-[11px] font-semibold">
                {h}
              </span>
            ))}
          </div>
          {step.demoTable.rows.map((row, ri) => (
            <div key={ri} className="flex border-t border-line">
              {row.map((cell, ci) => (
                <span key={ci} className="flex-1 p-2 text-ink text-xs">
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {step.blocksDemo && (
        <div className="rounded-[10px] border border-line p-4 flex flex-col gap-0.5" style={{ backgroundColor: '#0d1117' }}>
          {step.blocksDemo.map((b, i) => (
            <span key={i} className="font-mono text-[13px]" style={{ color: '#6ee7b7' }}>
              {b}
            </span>
          ))}
        </div>
      )}

      {paddedFields && <SqlScreenshot fields={paddedFields} />}

      <div className="rounded-[10px] border border-line bg-bg p-4 flex flex-col gap-3">
        <p className="text-ink text-sm font-semibold">{step.question}</p>
        <div className="flex flex-col gap-2">
          {step.options.map((opt, i) => {
            const isSelected = selected === i;
            const showCorrectness = selected !== null;
            const isCorrectOpt = i === step.correctIndex;
            const stateColor = isCorrectOpt ? '#6ee7b7' : '#fca5a5';
            const stateBg = isCorrectOpt ? 'rgba(6,78,59,0.4)' : 'rgba(127,29,29,0.4)';
            const stateBorder = isCorrectOpt ? '#10b981' : '#f43f5e';
            return (
              <button
                key={i}
                disabled={correct}
                onClick={() => {
                  if (selected === null || !correct) setSelected(i);
                }}
                className="text-left px-3 py-2.5 rounded-lg font-mono text-[13.5px] transition-colors"
                style={{
                  color: showCorrectness && isSelected ? stateColor : 'var(--ink)',
                  backgroundColor: showCorrectness && isSelected ? stateBg : 'var(--panel-2)',
                  border: `1px solid ${showCorrectness && isSelected ? stateBorder : 'transparent'}`,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && !correct && (
          <p className="text-[12px]" style={{ color: '#fca5a5' }}>
            Nicht ganz — schau dir die Erklärung oben noch einmal an und versuch es erneut.
          </p>
        )}
        {correct && (
          <p
            className="text-[13px] px-3 py-2 rounded-md"
            style={{ color: '#6ee7b7', backgroundColor: 'rgba(6,78,59,0.3)', border: '1px solid rgba(16,185,129,0.4)' }}
          >
            ✓ {step.afterCorrect}
          </p>
        )}
      </div>

      {correct && (
        <PrimaryButton color="#22d3ee" textColor="#06210f" onClick={onNext}>
          {stepIndex === totalSteps - 1 ? 'Tutorial abschließen → Level 1' : 'Weiter'}
        </PrimaryButton>
      )}
    </div>
  );
}

export function SqlTutorial({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const step = SqlTutorialContent.steps[idx];

  function next() {
    if (idx < SqlTutorialContent.steps.length - 1) setIdx(idx + 1);
    else onDone();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-ink font-bold text-[21px]">Willkommen beim SQL-Trainer</h1>
        <p className="text-sub text-[13px]">
          Kurzes Tutorial, bevor es losgeht — fünf Schritte, jeder mit einer Mini-Frage.
        </p>
      </div>
      <div className="card p-[18px]">
        <TutorialStepView step={step} stepIndex={idx} totalSteps={SqlTutorialContent.steps.length} onNext={next} />
      </div>
    </div>
  );
}
