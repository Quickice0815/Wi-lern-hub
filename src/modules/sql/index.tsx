import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';
import { SqlLevels, initialSqlProgress, type SqlLevel, type SqlMode, type SqlProgressState } from './data';
import { SqlModeSelect } from './ModeSelect';
import { SqlTutorial } from './Tutorial';
import { SqlLevelMap } from './LevelMap';
import { SqlScreenshot } from './DataTable';
import { SqlBlockBuilder, SqlFreitextEditor, SqlSolutionReveal } from './BlockAndFreitext';

// ============================================================
// SQL-TRAINER — Hauptspiel (Portiert aus SqlTrainerGameView.swift)
// Der gesamte Ablauf (Modus wählen → Tutorial → Level-Karte →
// Baustein-/Freitext-Phase → Lösung → nächstes Level) lebt als
// lokaler State in dieser einen Komponente, genau wie im
// Original SqlTrainerGameView alle Phasen über ein view2-Enum
// orchestriert.
// ============================================================

type View2 = 'mode' | 'map' | 'tutorial' | 'blocks' | 'freitext' | 'solution';

export function SqlTrainer() {
  const nav = useNavigator();

  const [progress, setProgress] = useState<SqlProgressState>(initialSqlProgress);
  const [view2, setView2] = useState<View2>('mode');
  const [activeLevelID, setActiveLevelID] = useState<number | null>(null);
  const [pendingBlocksStars, setPendingBlocksStars] = useState(0);
  const [pendingFreitextStars, setPendingFreitextStars] = useState(0);

  const activeLevel: SqlLevel | undefined = SqlLevels.all.find((l) => l.id === activeLevelID);
  const isPro = progress.mode === 'pro';

  function chooseMode(modeID: SqlMode['id']) {
    setProgress((p) => ({ ...p, mode: modeID }));
    setView2('map');
  }

  function startLevel(id: number) {
    setActiveLevelID(id);
    setPendingFreitextStars(0);
    if (progress.mode === 'beginner') {
      setPendingBlocksStars(0);
      setView2('blocks');
    } else {
      setPendingBlocksStars(3);
      setView2('freitext');
    }
  }

  function finishBlocks(stars: number) {
    setPendingBlocksStars(stars);
    setView2('freitext');
  }

  function finishFreitext(stars: number) {
    setPendingFreitextStars(stars);
    const id = activeLevelID;
    if (id == null) return;
    const pointsEarned = (pendingBlocksStars + stars) * 50;
    setProgress((p) => {
      const prevLp = p.levels[id];
      return {
        ...p,
        points: p.points + pointsEarned,
        levels: {
          ...p.levels,
          [id]: {
            completed: true,
            starsBlocks: Math.max(pendingBlocksStars, prevLp?.starsBlocks ?? 0),
            starsFreitext: Math.max(stars, prevLp?.starsFreitext ?? 0),
          },
        },
      };
    });
    setView2('solution');
  }

  function finishTutorial() {
    setProgress((p) => ({ ...p, tutorialDone: true }));
    startLevel(SqlLevels.all[0].id);
  }

  function goNext() {
    const idx = SqlLevels.all.findIndex((l) => l.id === activeLevelID);
    if (idx === -1) return;
    if (idx < SqlLevels.all.length - 1) {
      startLevel(SqlLevels.all[idx + 1].id);
    } else {
      setView2('map');
    }
  }

  function handleOuterBack() {
    if (view2 === 'mode' || view2 === 'map') {
      nav.popToRoot();
    } else {
      setView2('map');
    }
  }

  return (
    <PageShell>
      <BackBar title="SQL-Trainer" onBack={handleOuterBack} />

      {view2 === 'mode' && <SqlModeSelect onChoose={chooseMode} />}

      {view2 === 'map' && (
        <SqlLevelMap
          progress={progress}
          onSelect={startLevel}
          onTutorial={() => setView2('tutorial')}
          onChangeMode={() => setView2('mode')}
          onHome={() => nav.popToRoot()}
        />
      )}

      {view2 === 'tutorial' && (
        <div className="flex flex-col gap-3.5">
          <button onClick={() => setView2('map')} className="text-sub text-[13px] self-start hover:text-ink transition-colors">
            ← Übersicht
          </button>
          <SqlTutorial onDone={finishTutorial} />
        </div>
      )}

      {(view2 === 'blocks' || view2 === 'freitext' || view2 === 'solution') && activeLevel && (
        <LevelContent
          level={activeLevel}
          view2={view2}
          isPro={isPro}
          mode={progress.mode}
          pendingBlocksStars={pendingBlocksStars}
          pendingFreitextStars={pendingFreitextStars}
          onBackToMap={() => setView2('map')}
          onFinishBlocks={finishBlocks}
          onFinishFreitext={finishFreitext}
          onNext={goNext}
        />
      )}
    </PageShell>
  );
}

function LevelContent({
  level,
  view2,
  isPro,
  mode,
  pendingBlocksStars,
  pendingFreitextStars,
  onBackToMap,
  onFinishBlocks,
  onFinishFreitext,
  onNext,
}: {
  level: SqlLevel;
  view2: Extract<View2, 'blocks' | 'freitext' | 'solution'>;
  isPro: boolean;
  mode: SqlMode['id'] | null;
  pendingBlocksStars: number;
  pendingFreitextStars: number;
  onBackToMap: () => void;
  onFinishBlocks: (stars: number) => void;
  onFinishFreitext: (stars: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBackToMap} className="text-sub text-[13px] self-start hover:text-ink transition-colors">
        ← Übersicht
      </button>

      <div className="flex flex-col gap-2.5">
        <p className="text-sql-cyan text-[11px] font-bold">
          LEVEL {level.id} · {level.title.toUpperCase()}
        </p>
        <p className={isPro ? 'text-sub text-xs' : 'text-ink text-sm'}>{level.task}</p>
        <SqlScreenshot fields={level.fields} />
      </div>

      <div className="card p-[18px] flex flex-col gap-4">
        {!isPro && (
          <div className="flex items-center gap-2 flex-wrap">
            {mode === 'beginner' && <PhaseTag label="1. Bausteine" active={view2 === 'blocks'} />}
            <PhaseTag label={mode === 'beginner' ? '2. Freitext' : 'SQL eingeben'} active={view2 === 'freitext'} />
            <PhaseTag label={mode === 'beginner' ? '3. Lösung' : 'Lösung'} active={view2 === 'solution'} />
          </div>
        )}

        {view2 === 'blocks' && <SqlBlockBuilder level={level} onComplete={onFinishBlocks} />}
        {view2 === 'freitext' && (
          <SqlFreitextEditor level={level} onComplete={onFinishFreitext} hideHints={isPro} />
        )}
        {view2 === 'solution' && (
          <SqlSolutionReveal
            level={level}
            starsBlocks={pendingBlocksStars}
            starsFreitext={pendingFreitextStars}
            onNext={onNext}
            isLast={level.id === SqlLevels.all[SqlLevels.all.length - 1].id}
          />
        )}
      </div>
    </div>
  );
}

function PhaseTag({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className="text-[11px] font-semibold px-2 py-1 rounded"
      style={{
        color: active ? '#06210f' : 'var(--sub)',
        backgroundColor: active ? '#22d3ee' : 'var(--panel-2)',
      }}
    >
      {label}
    </span>
  );
}
