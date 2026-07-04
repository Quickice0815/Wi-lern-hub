import { NUM_SYSTEMS, type NumSystemID } from './data';
import { SysFlag } from './PictoGlyphs';

// ============================================================
// SYSTEMAUSWAHL — Pendant zu NumSelectView (NumbersGameView.swift).
// ============================================================

export type NumbersStats = Partial<
  Record<NumSystemID, { bestStreak: number; totalCorrect: number; totalAnswered: number }>
>;

export function SystemSelect({
  onSelect,
  stats = {},
}: {
  onSelect: (id: NumSystemID) => void;
  stats?: NumbersStats;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.08em] text-relation">
          MATHEMATIK · SPIEL
        </span>
        <h1 className="text-ink text-2xl font-bold">Historische Zahlensysteme</h1>
        <p className="text-sub text-sm leading-relaxed">
          Wähle ein Zahlensystem. Jedes startet mit einem kurzen Tutorial (überspringbar), danach
          folgt ein Endlos-Quiz mit Konvertierung, Rückrechnung und Logikfragen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {NUM_SYSTEMS.map((sys) => {
          const stat = stats[sys.id];
          return (
            <button
              key={sys.id}
              onClick={() => onSelect(sys.id)}
              className="relative text-left card pl-6 pr-4 py-4 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm"
                style={{ background: sys.color }}
                aria-hidden
              />
              <div className="flex flex-col gap-1.5 items-start">
                <div className="flex items-center justify-between w-full">
                  <span className="leading-none h-[26px] flex items-center">
                    <SysFlag id={sys.id} flag={sys.flag} size={26} />
                  </span>
                  {stat && stat.bestStreak > 0 && (
                    <span className="text-good text-xs font-semibold">🔥 Bestwert {stat.bestStreak}</span>
                  )}
                </div>
                <span className="text-ink font-bold text-base">{sys.name}</span>
                <span className="text-sub text-xs">{sys.baseDesc}</span>
                <span className="font-bold text-[13px] mt-1" style={{ color: sys.color }}>
                  Starten →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
