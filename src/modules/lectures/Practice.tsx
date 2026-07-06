import { useState } from 'react';
import { BackBar, SecondaryButton, ProgressBar } from '../../components/ui';
import { SapFormFill } from './sap/SapFormFill';
import { SapErrorCase } from './sap/SapErrorCase';
import type { LecturePractice } from './types';

// ============================================================
// SAP-PRAXIS — Abfolge aus Formular-Übungen ("Bildschirm ausfüllen")
// und Fehlermeldungs-Fällen ("welche Prüfungsart?"), eine Aufgabe
// nach der anderen, analog zum Ablauf der Multiple-Choice-Übungen.
// ============================================================

export function LecturePractice({
  practice,
  color,
  title,
  onBack,
}: {
  practice: LecturePractice;
  color: string;
  title: string;
  onBack: () => void;
}) {
  const items = [
    ...practice.formChallenges.map((c) => ({ type: 'form' as const, challenge: c })),
    ...practice.errorCases.map((c) => ({ type: 'error' as const, errorCase: c })),
  ];
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  function next() {
    if (index + 1 < items.length) {
      setIndex((i) => i + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setIndex(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="flex flex-col gap-4">
        <BackBar title="SAP-Praxis" onBack={onBack} />
        <div
          className="flex flex-col items-center gap-3.5 p-7 rounded-2xl text-center animate-fade-in-up"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${color} 15%, transparent), transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
          }}
        >
          <span className="text-[44px] leading-none">🏆</span>
          <h2 className="text-[22px] font-bold text-ink">SAP-Praxis abgeschlossen!</h2>
          <p className="text-sm text-ink/85 max-w-md leading-relaxed">
            Du hast alle {items.length} Praxis-Aufgaben zu „{title}" gemeistert.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center pt-1">
            <button className="btn-primary" style={{ background: color }} onClick={restart}>
              Nochmal üben 🔁
            </button>
            <SecondaryButton onClick={onBack}>← Stufen-Übersicht</SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  const current = items[index];

  return (
    <div className="flex flex-col gap-4">
      <BackBar title="SAP-Praxis" onBack={onBack} />
      <ProgressBar value={(index + 1) / items.length} color={color} />
      <p className="text-sub text-xs -mt-2">
        Aufgabe {index + 1} / {items.length}
      </p>

      <div className="card p-5">
        <h2 className="text-ink font-bold text-lg mb-3">
          {current.type === 'form' ? current.challenge.title : current.errorCase.title}
        </h2>
        {current.type === 'form' ? (
          <SapFormFill key={current.challenge.id} challenge={current.challenge} color={color} onComplete={next} />
        ) : (
          <SapErrorCase key={current.errorCase.id} errorCase={current.errorCase} color={color} onComplete={next} />
        )}
      </div>
    </div>
  );
}
