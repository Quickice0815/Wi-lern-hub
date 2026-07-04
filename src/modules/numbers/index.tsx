import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, PageShell } from '../../components/ui';
import { getSystem, type NumSystemID } from './data';
import { SystemSelect, type NumbersStats } from './SystemSelect';
import { Tutorial } from './Tutorial';
import { Quiz } from './Quiz';

// ============================================================
// HISTORISCHE ZAHLENSYSTEME — Pendant zu NumbersGameView.swift.
// Eine einzige Route ("numbers"), die intern drei Phasen verwaltet:
// Systemauswahl → Tutorial → Endlos-Quiz. Genau wie im Original hält
// diese Komponente den gesamten Ablauf als lokalen State. Bestwerte
// (Streak, richtige Antworten) je System werden zusätzlich persistiert.
// ============================================================

type Phase = 'select' | 'tutorial' | 'quiz';

export function NumbersGame() {
  const nav = useNavigator();
  const [phase, setPhase] = useState<Phase>('select');
  const [sysID, setSysID] = useState<NumSystemID | null>(null);
  const [stats, setStats] = useCloudProgress<NumbersStats>('numbers', {});
  const sys = sysID ? getSystem(sysID) : null;

  function recordAnswer(correct: boolean, streakAfter: number) {
    if (!sysID) return;
    setStats((prev) => {
      const prevStat = prev[sysID] ?? { bestStreak: 0, totalCorrect: 0, totalAnswered: 0 };
      return {
        ...prev,
        [sysID]: {
          bestStreak: Math.max(prevStat.bestStreak, streakAfter),
          totalCorrect: prevStat.totalCorrect + (correct ? 1 : 0),
          totalAnswered: prevStat.totalAnswered + 1,
        },
      };
    });
  }

  return (
    <PageShell>
      <BackBar
        title="Historische Zahlensysteme"
        onBack={() => (phase === 'select' ? nav.popToRoot() : setPhase('select'))}
      />

      {phase === 'select' && (
        <SystemSelect
          stats={stats}
          onSelect={(id) => {
            setSysID(id);
            setPhase('tutorial');
          }}
        />
      )}

      {phase === 'tutorial' && sys && (
        <Tutorial sys={sys} onStart={() => setPhase('quiz')} onBack={() => setPhase('select')} />
      )}

      {phase === 'quiz' && sys && (
        <Quiz sys={sys} onMenu={() => setPhase('select')} onAnswer={recordAnswer} />
      )}
    </PageShell>
  );
}
