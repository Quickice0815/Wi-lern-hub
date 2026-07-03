import type { NumSystem } from './data';
import { GlyphText } from './PictoGlyphs';

// ============================================================
// MAYA-ZIFFERN-GRAFIK — Pendant zu MayaDigitView / MayaNumberView
// (NumbersGameView.swift). Echte gestapelte Balken statt Fließtext:
// Jede Ziffer (0–19) zeigt bis zu 3 klar getrennte Balken (je 5)
// und darüber die Punkte (je 1), damit 1/2/3 Balken eindeutig
// 5/10/15 bleiben.
// ============================================================

export function MayaDigitView({
  value,
  color = 'var(--ink)',
  scale = 1,
}: {
  value: number; // 0...19
  color?: string;
  scale?: number;
}) {
  const bars = Math.floor(value / 5);
  const dots = value % 5;

  if (value === 0) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: 60 * scale }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 30 * scale,
            height: 22 * scale,
            borderRadius: 8 * scale,
            border: `${2 * scale}px solid ${color}`,
          }}
        >
          <span style={{ fontSize: 11 * scale, fontWeight: 700, color }}>0</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ gap: 5 * scale, minHeight: 60 * scale }}
    >
      {dots > 0 && (
        <div className="flex items-center" style={{ gap: 5 * scale }}>
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 7 * scale,
                height: 7 * scale,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
              }}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center" style={{ gap: 4 * scale }}>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 34 * scale,
              height: 6 * scale,
              borderRadius: 2.5 * scale,
              background: color,
              display: 'block',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Eine vollständige Maya-Zahl: eine oder mehrere Stellenwert-Ziffergruppen,
// getrennt durch eine vertikale Trennlinie.
export function MayaNumberView({
  digits,
  color = 'var(--ink)',
  scale = 1,
}: {
  digits: number[];
  color?: string;
  scale?: number;
}) {
  return (
    <div className="flex items-end justify-center" style={{ gap: 14 * scale }}>
      {digits.map((d, i) => (
        <div key={i} className="flex items-end" style={{ gap: 14 * scale }}>
          {i > 0 && (
            <span
              style={{
                width: 1.5,
                height: 50 * scale,
                background: color,
                opacity: 0.4,
                display: 'inline-block',
              }}
            />
          )}
          <MayaDigitView value={d} color={color} scale={scale} />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// SYMBOL-LEGENDE — immer sichtbare Erinnerung an die Werte, damit
// man sich während des Quiz nichts merken muss.
// ============================================================
export function SymbolLegend({ sys }: { sys: NumSystem }) {
  if (sys.legend.length === 0) return null;
  return (
    <div className="overflow-x-auto rounded-[10px] border border-line bg-panel">
      <div className="flex items-center gap-2 px-3.5 py-2.5 whitespace-nowrap">
        <span className="text-[11px] font-bold text-sub pr-0.5 shrink-0">LEGENDE</span>
        {sys.legend.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 rounded-[7px] px-2.5 py-1.5 bg-bg shrink-0"
            style={{ border: `1px solid color-mix(in srgb, ${sys.color} 35%, transparent)` }}
          >
            <GlyphText
              text={item.sym}
              size={15}
              color="var(--ink)"
              style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}
            />
            <span className="text-xs font-bold" style={{ color: sys.color }}>
              =
            </span>
            <span className="text-[13px] font-semibold text-ink">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
