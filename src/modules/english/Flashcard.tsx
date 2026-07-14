// ============================================================
// KARTEIKARTE — 3D-Flip-Karte: Klick/Tap dreht von Vorder- zu
// Rückseite. Generisch für Vokabeln (kurze Wörter) UND Redemittel
// (längere Satzbausteine) nutzbar — Schriftgröße passt sich an die
// Textlänge an, Höhe ist fest statt seitenverhältnisbasiert, damit
// auch längere Sätze sauber ins Kartenformat passen.
// ============================================================

export interface CardFace {
  eyebrow: string;
  text: string;
  hint: string;
}

const COLOR = 'var(--english)';

function sizeClass(text: string): string {
  if (text.length > 90) return 'text-sm sm:text-base';
  if (text.length > 50) return 'text-base sm:text-lg';
  if (text.length > 25) return 'text-lg sm:text-xl';
  return 'text-2xl sm:text-3xl';
}

export function Flashcard({
  front,
  back,
  flipped,
  onFlip,
}: {
  front: CardFace;
  back: CardFace;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Karte umdrehen, um die Vorderseite zu sehen' : 'Karte umdrehen, um die Rückseite zu sehen'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip();
        }
      }}
      className="relative w-full h-[240px] sm:h-[280px] cursor-pointer select-none"
      style={{ perspective: '1400px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <FaceSide {...front} />
        <FaceSide {...back} back />
      </div>
    </div>
  );
}

function FaceSide({ eyebrow, text, hint, back = false }: CardFace & { back?: boolean }) {
  return (
    <div
      className="absolute inset-0 card flex flex-col items-center justify-start gap-3 px-6 py-6 text-center overflow-auto"
      style={{
        backfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
        borderColor: `color-mix(in srgb, ${COLOR} 35%, var(--line))`,
      }}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: COLOR }}>
        {eyebrow}
      </span>
      <span className={`text-ink font-extrabold leading-snug break-words ${sizeClass(text)}`}>{text}</span>
      <span className="text-sub text-xs mt-2">{hint}</span>
    </div>
  );
}
