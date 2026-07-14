import type { VocabEntry } from './data';

// ============================================================
// KARTEIKARTE — 3D-Flip-Karte: Klick/Tap dreht von Englisch (Vorderseite)
// zu Deutsch (Rückseite). Reine CSS-Transform-Animation, kein State hier —
// der Elternkomponente gehört "flipped".
// ============================================================

const COLOR = 'var(--english)';

export function Flashcard({
  entry,
  flipped,
  onFlip,
}: {
  entry: VocabEntry;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Karte umdrehen, um Englisch zu sehen' : 'Karte umdrehen, um Übersetzung zu sehen'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip();
        }
      }}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] cursor-pointer select-none"
      style={{ perspective: '1400px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <FaceSide
          eyebrow={`Level ${entry.level} · Englisch`}
          text={entry.en}
          hint="Tippen, um die Übersetzung zu sehen"
        />
        <FaceSide
          back
          eyebrow="Deutsch"
          text={entry.de}
          hint="Tippen, um zurückzudrehen"
        />
      </div>
    </div>
  );
}

function FaceSide({
  eyebrow,
  text,
  hint,
  back = false,
}: {
  eyebrow: string;
  text: string;
  hint: string;
  back?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 card flex flex-col items-center justify-center gap-3 px-6 py-8 text-center"
      style={{
        backfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
        borderColor: `color-mix(in srgb, ${COLOR} 35%, var(--line))`,
      }}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: COLOR }}>
        {eyebrow}
      </span>
      <span className="text-ink font-extrabold leading-snug text-2xl sm:text-3xl break-words">{text}</span>
      <span className="text-sub text-xs mt-2">{hint}</span>
    </div>
  );
}
