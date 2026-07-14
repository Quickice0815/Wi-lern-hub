import { useState } from 'react';

// ============================================================
// Onboarding: 3 kurze Schritte, die die Kern-Interaktionen der
// App erklären, bevor die erste Lernsession startet.
// ============================================================

const STEPS = [
  {
    icon: '🖐️',
    title: 'Ziehen & Ablegen',
    body:
      'Fast überall in dieser App ziehst du Begriffe oder Karten per Drag & Drop an die richtige Stelle. ' +
      'Auf dem Smartphone geht es genauso: Begriff antippen (er leuchtet auf), dann das Ziel antippen.',
  },
  {
    icon: '📊',
    title: 'Achsen & Quadranten',
    body:
      'Bei den Diagrammen ziehst du zuerst die X- und Y-Achsenbegriffe an ihre Position, danach die passenden ' +
      'Felder in die richtigen Quadranten — genau wie bei der BCG-Matrix, Porters Five Forces oder dem Reifegradmodell der Führung.',
  },
  {
    icon: '✅',
    title: 'Sofort-Feedback',
    body:
      'Ein korrekter Drop wird grün markiert und schaltet sofort die Erklärung dazu frei. Ein falscher Versuch ' +
      'springt kurz zurück in den Pool — einfach nochmal versuchen, es gibt keine Strafe.',
  },
];

export function StrategyTutorial({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm">
      <div className="card w-full max-w-md p-6 flex flex-col gap-4 animate-fade-in-up">
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === step ? 22 : 8,
                background: i === step ? 'var(--strategy)' : 'var(--line)',
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center text-center gap-2 py-2">
          <span className="text-4xl leading-none">{s.icon}</span>
          <h2 className="text-ink font-bold text-lg">{s.title}</h2>
          <p className="text-sub text-[13.5px] leading-relaxed">{s.body}</p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <button className="text-xs font-semibold text-sub hover:text-ink transition-colors" onClick={onDone}>
            Überspringen
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button className="btn-secondary text-sm" onClick={() => setStep((x) => x - 1)}>
                Zurück
              </button>
            )}
            <button
              className="btn-primary text-sm"
              style={{ background: 'var(--strategy)' }}
              onClick={() => (isLast ? onDone() : setStep((x) => x + 1))}
            >
              {isLast ? "Los geht's" : 'Weiter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
