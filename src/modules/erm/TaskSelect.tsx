import { ERM_TASKS } from './data';
import { PrimaryButton, SecondaryButton } from '../../components/ui';

// ============================================================
// Aufgaben-Auswahl — Pendant zu ERMTaskSelectView (in ERMMenuView.swift).
// ============================================================

export function ErmTaskSelect({
  taskIndex,
  setTaskIndex,
  useCustomText,
  setUseCustomText,
  customText,
  setCustomText,
  onStart,
  onTutorial,
  onExit,
}: {
  taskIndex: number;
  setTaskIndex: (i: number) => void;
  useCustomText: boolean;
  setUseCustomText: (b: boolean) => void;
  customText: string;
  setCustomText: (s: string) => void;
  onStart: () => void;
  onTutorial: () => void;
  onExit: () => void;
}) {
  const customLongEnough = customText.trim().length >= 20;

  return (
    <div className="flex flex-col gap-[18px]">
      <div>
        <h2 className="text-ink font-bold text-2xl mb-1.5">Aus Text wird ER-Modell</h2>
        <p className="text-sub text-[13px] leading-relaxed">
          Lies die Aufgabe, markiere Entitäten, Beziehungen, Attribute und Primärschlüssel, zieh die Bausteine aufs
          Feld und verbinde sie.
        </p>
      </div>

      <div className="flex gap-2">
        <SecondaryButton onClick={onExit}>← ERM-Menü</SecondaryButton>
        <SecondaryButton onClick={onTutorial}>↻ Lernkarten</SecondaryButton>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {ERM_TASKS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              setUseCustomText(false);
              setTaskIndex(i);
            }}
            className="shrink-0 font-semibold text-white rounded-[9px] px-3.5 py-2.5 whitespace-nowrap transition-colors"
            style={{ fontSize: 13, background: !useCustomText && taskIndex === i ? 'var(--entity)' : 'var(--panel-2)' }}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="card p-[18px] flex flex-col gap-2.5">
        <span className="text-sub font-bold text-[11px] uppercase tracking-wide">Aufgabentext</span>
        <p className="text-ink leading-relaxed" style={{ fontSize: 14.5 }}>
          {ERM_TASKS[taskIndex].text}
        </p>
        <div className="pt-1.5">
          <PrimaryButton
            color="var(--relation)"
            onClick={() => {
              setUseCustomText(false);
              onStart();
            }}
          >
            Diese Aufgabe starten →
          </PrimaryButton>
        </div>
      </div>

      <div className="card p-[18px] flex flex-col gap-2.5">
        <span className="text-sub font-bold text-[11px] uppercase tracking-wide">Eigener Text</span>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Eigenen Aufgabentext hier einfügen …"
          className="w-full rounded-[10px] p-2 text-ink outline-none resize-none"
          style={{ height: 110, background: 'var(--bg)', border: '1px solid var(--line)' }}
        />
        <div>
          <PrimaryButton
            color={customLongEnough ? 'var(--entity)' : 'var(--panel-2)'}
            textColor={customLongEnough ? '#fff' : 'var(--sub)'}
            disabled={!customLongEnough}
            onClick={() => {
              setUseCustomText(true);
              onStart();
            }}
          >
            Eigenen Text üben →
          </PrimaryButton>
        </div>
        <p className="text-sub" style={{ fontSize: 11.5 }}>
          Hinweis: Bei eigenem Text gibt es freies Üben ohne automatische Musterlösung.
        </p>
      </div>
    </div>
  );
}
