import { useNavigator } from '../../lib/navigation';
import { SecondaryButton } from '../../components/ui';
import { DIFFICULTY_LABELS, type LectureChapter, type LectureDifficulty, type LecturesProgress } from './types';

const TIER_DESC: Record<LectureDifficulty, string> = {
  easy: 'Grundbegriffe und einfache Wiederholungsfragen.',
  advanced: 'Zusammenhänge erkennen und anwenden.',
  pro: 'Knifflige Fragen wie in einer Klausur.',
};

const TIER_ICON: Record<LectureDifficulty, string> = { easy: '🌱', advanced: '📈', pro: '🎯' };

// Schwierigkeitsauswahl je Kapitel — analog zum Modus-Bildschirm des SQL-Trainers.
export function LectureDifficultySelect({
  chapter,
  progress,
  onChoose,
  onTutorial,
  onExit,
}: {
  chapter: LectureChapter;
  progress: LecturesProgress[string] | undefined;
  onChoose: (d: LectureDifficulty) => void;
  onTutorial: () => void;
  onExit: () => void;
}) {
  const nav = useNavigator();
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex gap-2">
        <SecondaryButton onClick={onExit}>← Vorlesungen</SecondaryButton>
        <SecondaryButton onClick={onTutorial}>↻ Lernkarten</SecondaryButton>
      </div>

      {chapter.id === 'kapitel5' && (
        <button
          onClick={() => nav.push({ name: 'rasterTrainer' })}
          className="card text-left p-[18px] flex flex-col gap-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
          style={{ borderColor: chapter.color }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[24px] leading-none">🗂️</span>
            <span className="text-sub text-xs font-bold">Bonus-Lernspiel</span>
          </div>
          <span className="text-ink font-bold text-[17px]">Raster-Trainer</span>
          <span className="text-sub text-[13px] leading-relaxed">
            Funktionen per Drag &amp; Drop im Rasterdiagramm den richtigen Abteilungen zuordnen — 2 Übungstypen,
            3 Schwierigkeitsgrade.
          </span>
          <span className="font-bold text-[13px] mt-1" style={{ color: chapter.color }}>
            Spielen →
          </span>
        </button>
      )}

      <div>
        <h2 className="text-ink text-2xl font-bold mb-1.5">Übungsstufe wählen</h2>
        <p className="text-sub text-sm leading-relaxed">
          Wähle eine Schwierigkeitsstufe für „{chapter.title}".
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {(['easy', 'advanced', 'pro'] as const).map((tier) => {
          const best = progress?.[tier];
          return (
            <button
              key={tier}
              onClick={() => onChoose(tier)}
              className="card text-left p-[18px] flex flex-col gap-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[24px] leading-none">{TIER_ICON[tier]}</span>
                {best && (
                  <span className="text-good text-xs font-bold">
                    ✓ {best.bestScore}/{best.total}
                  </span>
                )}
              </div>
              <span className="text-ink font-bold text-[17px]">{DIFFICULTY_LABELS[tier]}</span>
              <span className="text-sub text-[13px] leading-relaxed">{TIER_DESC[tier]}</span>
              <span className="font-bold text-[13px] mt-1" style={{ color: chapter.color }}>
                {best ? 'Nochmal üben' : 'Starten'} →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
