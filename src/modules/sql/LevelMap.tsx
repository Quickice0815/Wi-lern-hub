import { SqlLevels, SqlModes, type SqlProgressState } from './data';
import { Card, SecondaryButton } from '../../components/ui';

// ============================================================
// SQL-TRAINER — Level-Übersicht (Portiert aus SqlLevelMapView.swift)
// ============================================================
export function SqlLevelMap({
  progress,
  onSelect,
  onTutorial,
  onChangeMode,
  onHome,
}: {
  progress: SqlProgressState;
  onSelect: (id: number) => void;
  onTutorial: () => void;
  onChangeMode: () => void;
  onHome: () => void;
}) {
  const totalStars = Object.values(progress.levels).reduce(
    (sum, lp) => sum + lp.starsBlocks + lp.starsFreitext,
    0,
  );
  const modeInfo = SqlModes.all.find((m) => m.id === progress.mode);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-ink font-bold text-[21px]">SQL-Filterung trainieren</h1>
          <p className="text-sub text-[12.5px]">SAP S/4HANA · Geschäftspartner verwalten</p>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span className="text-sql-cyan text-[26px] font-bold leading-none">{progress.points}</span>
          <span className="text-sub text-[10px] font-semibold">PUNKTE</span>
        </div>
      </div>

      {modeInfo && (
        <div className="flex items-center gap-2">
          <span className="text-sub text-xs">
            Modus: <span className="text-ink font-semibold">{modeInfo.emoji} {modeInfo.title}</span>
          </span>
          <div className="flex-1" />
          <button onClick={onChangeMode} className="text-sql-cyan text-xs font-semibold hover:underline">
            Modus wechseln
          </button>
        </div>
      )}

      {progress.mode !== 'pro' && (
        <button
          onClick={onTutorial}
          className="text-left rounded-[10px] p-4"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--sql-cyan) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--sql-cyan) 50%, transparent)',
          }}
        >
          <p className="text-sql-cyan text-[11px] font-bold">
            {progress.tutorialDone ? 'TUTORIAL ERNEUT ANSEHEN' : 'HIER STARTEN, FALLS DU NOCH KEINE AHNUNG HAST'}
          </p>
          <p className="text-ink text-[15px] font-bold mt-1">📘 Tutorial: SQL von Null auf</p>
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SqlLevels.all.map((lvl) => {
          const lp = progress.levels[lvl.id];
          return (
            <button key={lvl.id} onClick={() => onSelect(lvl.id)} className="text-left">
              <Card className="p-3.5 flex flex-col gap-1 h-full hover:border-sql-cyan/50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-sql-cyan text-[11px] font-bold">LEVEL {lvl.id}</span>
                  {lp?.completed && (
                    <>
                      <div className="flex-1" />
                      <span className="text-[13px]" style={{ color: '#6ee7b7' }}>
                        ✓ {lp.starsBlocks + lp.starsFreitext}★
                      </span>
                    </>
                  )}
                </div>
                <p className="text-ink font-bold text-sm">{lvl.title}</p>
                <p className="text-sub text-[11.5px]">{lvl.subtitle}</p>
              </Card>
            </button>
          );
        })}
      </div>

      <p className="text-sub text-xs">
        Gesamtfortschritt: {totalStars} / {SqlLevels.all.length * 6} ★
      </p>

      <SecondaryButton onClick={onHome} className="self-start">
        ← Hauptmenü
      </SecondaryButton>
    </div>
  );
}
