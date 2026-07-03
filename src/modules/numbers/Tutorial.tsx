import { useEffect, useState } from 'react';
import type { NumSystem } from './data';
import { PrimaryButton, SecondaryButton } from '../../components/ui';
import { GlyphText, SysFlag } from './PictoGlyphs';

// ============================================================
// TUTORIAL — Pendant zu NumTutorialView (NumbersGameView.swift).
// Ein kurzer, überspringbarer Erklär-Schritt pro System, danach
// startet das Endlos-Quiz.
// ============================================================
export function Tutorial({
  sys,
  onStart,
  onBack,
}: {
  sys: NumSystem;
  onStart: () => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const card = sys.tutorial[index];
  const isLast = index === sys.tutorial.length - 1;

  // Pendant zu .onKeyPress("s") { onStart() } im Original.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') onStart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStart]);

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-center gap-3">
        <span className="leading-none shrink-0 h-[26px] flex items-center">
          <SysFlag id={sys.id} flag={sys.flag} size={26} />
        </span>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="text-ink font-bold text-lg truncate">{sys.name}</span>
          <span className="text-sub text-xs">{sys.baseDesc}</span>
        </div>
        <PrimaryButton
          color={sys.color}
          onClick={onStart}
          className="shrink-0 whitespace-nowrap !px-4 !py-2.5 !text-[13px]"
        >
          Tutorial überspringen →
        </PrimaryButton>
      </div>

      <div className="flex gap-1.5">
        {sys.tutorial.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Zu Schritt ${i + 1}`}
            className="h-[7px] flex-1 rounded"
            style={{
              background:
                i === index
                  ? sys.color
                  : i < index
                    ? `color-mix(in srgb, ${sys.color} 40%, transparent)`
                    : 'var(--panel-2)',
            }}
          />
        ))}
      </div>

      <div className="card p-[22px] min-h-[160px] flex flex-col gap-3 justify-start">
        <span className="text-[11px] font-bold" style={{ color: sys.color }}>
          SCHRITT {index + 1} VON {sys.tutorial.length}
        </span>
        <h2 className="text-ink text-xl font-bold">{card.h}</h2>
        <GlyphText
          text={card.t}
          size={15}
          color="var(--ink)"
          gap={3}
          style={{ color: 'var(--ink)', fontSize: 15.5, lineHeight: 1.6 }}
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SecondaryButton onClick={onBack}>← Andere Systeme</SecondaryButton>
        <div className="flex-1" />
        {index > 0 && <SecondaryButton onClick={() => setIndex(index - 1)}>Zurück</SecondaryButton>}
        {!isLast ? (
          <PrimaryButton color={sys.color} onClick={() => setIndex(index + 1)}>
            Weiter →
          </PrimaryButton>
        ) : (
          <PrimaryButton color="var(--good)" textColor="#06210f" onClick={onStart}>
            Quiz starten →
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
