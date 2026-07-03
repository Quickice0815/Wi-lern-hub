import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell, SecondaryButton } from '../../components/ui';
import { PAP_LEVELS, POINTS_PER_LEVEL, type PapLevel } from './data';
import { PapShapeIcon, PapProgressSegments, PapBadge, PapActionButton } from './ShapeIcon';
import { PapExplainCard } from './FeedbackControls';
import { PapOrderChallenge } from './OrderChallenge';
import { PapMatchChallenge } from './MatchChallenge';

// ============================================================
// PAP-QUEST: DIE LOGIK-ODYSSEE — Hauptspiel-View
// Portiert aus PapQuestView.swift (intro -> level -> victory).
// Die gesamte Quest lebt als lokaler React-State in dieser einen
// Komponente — genau wie RootView.swift, das nur eine .papQuest-
// Route hat, hinter der PapQuestView() intern alles steuert.
// ============================================================

type PapStage = 'intro' | 'level' | 'victory';

export function PapQuest() {
  const nav = useNavigator();
  const [stage, setStage] = useState<PapStage>('intro');
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);

  const level = PAP_LEVELS[levelIndex];

  function completeLevel() {
    setScore((s) => s + POINTS_PER_LEVEL);
    if (levelIndex + 1 < PAP_LEVELS.length) {
      setLevelIndex((i) => i + 1);
    } else {
      setStage('victory');
    }
  }

  function restart() {
    setStage('intro');
    setLevelIndex(0);
    setScore(0);
  }

  return (
    <PageShell>
      <BackBar
        title="PAP-Quest"
        onBack={() => nav.popToRoot()}
        right={<PapBadge text={`⭐ ${score} PUNKTE`} color="var(--pap-io)" />}
      />

      <div className="flex flex-col gap-[18px]">
        {stage === 'intro' && <IntroView onStart={() => setStage('level')} />}
        {stage === 'level' && (
          <LevelView level={level} levelIndex={levelIndex} onComplete={completeLevel} />
        )}
        {stage === 'victory' && <VictoryView score={score} onRestart={restart} onHome={() => nav.popToRoot()} />}
      </div>
    </PageShell>
  );
}

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="card flex flex-col items-center gap-[18px] p-7 text-center animate-fade-in-up">
      <div className="flex items-center gap-3.5">
        <PapShapeIcon type="circle" size={34} color="var(--pap-control)" />
        <PapShapeIcon type="rect" size={34} color="var(--pap-action)" />
        <PapShapeIcon type="diamond" size={34} color="var(--pap-decision)" />
        <PapShapeIcon type="parallelogram" size={34} color="var(--pap-io)" />
        <PapShapeIcon type="arrow" size={34} color="var(--ink)" />
      </div>
      <h2 className="text-[22px] font-bold text-ink leading-snug">Bereit für 6 Level voller PAP-Logik? 🧙‍♂️</h2>
      <p className="text-sm text-sub max-w-md leading-relaxed">
        Von den 5 Grundsymbolen über IF-THEN-ELSE bis zum Online-Shop-Endboss. Jeder Level: kurze Erklärung +
        Challenge. Kein Weiterkommen ohne Lösung!
      </p>
      <PapActionButton label="Quest starten 🚀" primary glow onClick={onStart} />
    </div>
  );
}

function LevelView({
  level,
  levelIndex,
  onComplete,
}: {
  level: PapLevel;
  levelIndex: number;
  onComplete: () => void;
}) {
  return (
    <div key={level.id} className="flex flex-col gap-3.5 animate-fade-in-up">
      <PapProgressSegments current={levelIndex} total={PAP_LEVELS.length} />
      <p className="text-[11px] font-semibold text-sub">
        LEVEL {level.id} / {PAP_LEVELS.length}
      </p>

      <h2 className="text-[22px] font-bold text-ink leading-snug">{level.title}</h2>
      <p className="text-[13px] -mt-2" style={{ color: 'var(--pap-action)' }}>
        {level.subtitle}
      </p>

      <PapExplainCard level={level} />

      <div className="card flex flex-col gap-3.5 p-5">
        <p className="text-[11px] font-bold tracking-wide" style={{ color: 'var(--pap-decision)' }}>
          ⚔️ CHALLENGE
        </p>
        {level.type === 'match' ? (
          <PapMatchChallenge level={level} onComplete={onComplete} />
        ) : (
          <PapOrderChallenge level={level} onComplete={onComplete} />
        )}
      </div>
    </div>
  );
}

function VictoryView({
  score,
  onRestart,
  onHome,
}: {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3.5 p-7 rounded-2xl text-center animate-fade-in-up"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--pap-action) 12%, transparent), color-mix(in srgb, var(--pap-control) 8%, transparent))',
        border: '1px solid color-mix(in srgb, var(--pap-action) 50%, transparent)',
      }}
    >
      <span className="text-[44px] leading-none">🏆</span>
      <h2 className="text-[22px] font-bold text-ink">Quest abgeschlossen!</h2>
      <p className="text-sm text-ink/85 max-w-md leading-relaxed">
        Du hast alle {PAP_LEVELS.length} Level gemeistert und {score} Punkte gesammelt. Vom PAP-Symbol bis zum
        Online-Shop-Login — du beherrschst die Logik! 🎓
      </p>
      <div className="flex flex-wrap gap-2.5 justify-center pt-1">
        <PapActionButton label="Nochmal von vorne spielen 🔁" primary onClick={onRestart} />
        <SecondaryButton onClick={onHome}>← Hauptmenü</SecondaryButton>
      </div>
    </div>
  );
}
