import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';
import { getSystem, type NumSystemID } from './data';
import { SystemSelect } from './SystemSelect';
import { Tutorial } from './Tutorial';
import { Quiz } from './Quiz';

// ============================================================
// HISTORISCHE ZAHLENSYSTEME — Pendant zu NumbersGameView.swift.
// Eine einzige Route ("numbers"), die intern drei Phasen verwaltet:
// Systemauswahl → Tutorial → Endlos-Quiz. Genau wie im Original hält
// diese Komponente den gesamten Ablauf als lokalen State.
// ============================================================

type Phase = 'select' | 'tutorial' | 'quiz';

export function NumbersGame() {
  const nav = useNavigator();
  const [phase, setPhase] = useState<Phase>('select');
  const [sysID, setSysID] = useState<NumSystemID | null>(null);
  const sys = sysID ? getSystem(sysID) : null;

  return (
    <PageShell>
      <BackBar
        title="Historische Zahlensysteme"
        onBack={() => (phase === 'select' ? nav.popToRoot() : setPhase('select'))}
      />

      {phase === 'select' && (
        <SystemSelect
          onSelect={(id) => {
            setSysID(id);
            setPhase('tutorial');
          }}
        />
      )}

      {phase === 'tutorial' && sys && (
        <Tutorial sys={sys} onStart={() => setPhase('quiz')} onBack={() => setPhase('select')} />
      )}

      {phase === 'quiz' && sys && <Quiz sys={sys} onMenu={() => setPhase('select')} />}
    </PageShell>
  );
}
