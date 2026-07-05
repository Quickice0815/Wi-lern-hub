import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, PageShell } from '../../components/ui';
import { ERM_TASKS, type ERMCanvasEdge, type ERMCanvasNode, type ERMNodeType, type ERMTask } from './data';
import { ErmTutorial } from './Tutorial';
import { ErmTaskSelect } from './TaskSelect';
import { ErmClassify } from './Classify';
import { ErmCanvas } from './Canvas';
import { ErmResult } from './Result';

// ============================================================
// ERM-TRAINER — Einstiegspunkte.
// Pendant zu ERMMenuView.swift (Menü) und ERMFlowView (interner
// Schritt-Automat: Tutorial -> Auswahl -> Markieren -> Modellieren ->
// Auswertung). Der ganze Ablauf läuft, wie im Original, innerhalb
// EINER gepushten Route über lokalen React-State — es werden keine
// weiteren globalen Routes für die Zwischenschritte erzeugt.
// ============================================================

export function ErmMenu() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="ERM-Trainer" onBack={() => nav.popToRoot()} />

      <div className="flex flex-col gap-2 mb-7">
        <h1 className="text-ink font-bold text-[27px] leading-tight">ERM-Trainer</h1>
        <p className="text-sub text-[15px] leading-relaxed">
          Erst die Bausteine spielerisch lernen, dann aus echten Aufgabentexten ein ER-Modell bauen und automatisch
          bewerten lassen.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <button
          onClick={() => nav.push({ name: 'ermFlow', startTutorial: true })}
          className="card text-left p-[18px] flex flex-col gap-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
        >
          <span className="text-[26px] leading-none">🎓</span>
          <span className="text-ink font-bold text-[17px]">Lernkarten + Übungen</span>
          <span className="text-sub text-[13px] leading-relaxed">
            Tutorial zu Entität, Beziehung, Attribut, Primärschlüssel, Kardinalität — dann die Aufgaben.
          </span>
          <span className="text-relation font-bold text-[13px] mt-1">Von vorne starten →</span>
        </button>

        <button
          onClick={() => nav.push({ name: 'ermFlow', startTutorial: false })}
          className="card text-left p-[18px] flex flex-col gap-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
        >
          <span className="text-[26px] leading-none">⚡</span>
          <span className="text-ink font-bold text-[17px]">Direkt zu den Aufgaben</span>
          <span className="text-sub text-[13px] leading-relaxed">
            Tutorial überspringen und gleich mit einer der {ERM_TASKS.length} Aufgaben (oder eigenem Text) loslegen.
          </span>
          <span className="text-entity font-bold text-[13px] mt-1">Aufgaben öffnen →</span>
        </button>
      </div>
    </PageShell>
  );
}

type ERMStep = 'tutorial' | 'select' | 'classify' | 'canvas' | 'result';

const STEP_TITLES: Record<ERMStep, string> = {
  tutorial: 'Lernkarten',
  select: 'ERM-Trainer',
  classify: 'Markieren',
  canvas: 'Modellieren',
  result: 'Auswertung',
};

export function ErmFlow({ startWithTutorial }: { startWithTutorial: boolean }) {
  const nav = useNavigator();
  const [step, setStep] = useState<ERMStep>(startWithTutorial ? 'tutorial' : 'select');
  const [taskIndex, setTaskIndex] = useState(0);
  const [useCustomText, setUseCustomText] = useState(false);
  const [customText, setCustomText] = useState('');
  const [bestScores, setBestScores] = useCloudProgress<Record<string, number>>('erm', {});

  const [labels, setLabels] = useState<Record<number, ERMNodeType>>({});
  const [nodes, setNodes] = useState<ERMCanvasNode[]>([]);
  const [edges, setEdges] = useState<ERMCanvasEdge[]>([]);

  const currentTask: ERMTask = useCustomText
    ? { id: 'custom', title: 'Eigener Text', text: customText, solution: { entities: [], relations: [] } }
    : ERM_TASKS[taskIndex];

  function resetWork() {
    setLabels({});
    setNodes([]);
    setEdges([]);
  }

  return (
    <PageShell>
      <BackBar title={STEP_TITLES[step]} onBack={() => nav.pop()} />

      {step === 'tutorial' && <ErmTutorial onDone={() => setStep('select')} />}

      {step === 'select' && (
        <ErmTaskSelect
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
          useCustomText={useCustomText}
          setUseCustomText={setUseCustomText}
          customText={customText}
          setCustomText={setCustomText}
          bestScores={bestScores}
          onStart={() => {
            resetWork();
            setStep('classify');
          }}
          onTutorial={() => setStep('tutorial')}
          onExit={() => nav.pop()}
        />
      )}

      {step === 'classify' && (
        <ErmClassify task={currentTask} labels={labels} setLabels={setLabels} onNext={() => setStep('canvas')} />
      )}

      {step === 'canvas' && (
        <ErmCanvas
          task={currentTask}
          labels={labels}
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          onCheck={() => setStep('result')}
          onBackToSelect={() => setStep('select')}
        />
      )}

      {step === 'result' && (
        <ErmResult
          task={currentTask}
          nodes={nodes}
          edges={edges}
          onRetry={() => setStep('canvas')}
          onMenu={() => {
            resetWork();
            setStep('select');
          }}
          onScored={(pct) => {
            if (currentTask.id === 'custom') return;
            setBestScores((prev) => ({ ...prev, [currentTask.id]: Math.max(prev[currentTask.id] ?? 0, pct) }));
          }}
        />
      )}
    </PageShell>
  );
}
