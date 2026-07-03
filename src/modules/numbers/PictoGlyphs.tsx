import type { CSSProperties, ReactNode } from 'react';
import type { NumSystemID } from './data';

// ============================================================
// PIKTOGRAMME für ägyptische Hieroglyphen & babylonische Keilschrift.
//
// Warum: Diese beiden Unicode-Blöcke (Egyptian Hieroglyphs U+13000ff,
// Cuneiform U+12000ff) sind auf so gut wie keinem System vorinstalliert
// (auch nicht auf frischen Windows/macOS/Linux-Installationen) — ohne
// Sonderfont zeigen Browser nur leere Kästchen ("Tofu"). Deshalb werden
// hier die exakt neun betroffenen Zeichen durch handgezeichnete SVG-
// Icons ersetzt. Die Konvertierungs-LOGIK in data.ts bleibt unverändert
// bei den echten Unicode-Zeichen (1:1 Port von NumbersData.swift) — nur
// diese Digrafik-Schicht übersetzt sie fürs Rendering in verlässliche
// Vektorgrafik. Alle anderen Zeichen (lateinische Buchstaben, Ziffern,
// „|“, Leerzeichen, Maya-Symbole •▬𝟘) sind auf jedem System darstellbar
// und werden unverändert als Text durchgereicht.
// ============================================================

interface IconProps {
  size?: number;
  color?: string;
}

function svg(viewBox: string, children: ReactNode, { size = 18, color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      style={{ color, flexShrink: 0 }}
      aria-hidden
    >
      {children}
    </svg>
  );
}

// ---- Ägyptisch (Basis 10, additiv) ----------------------------------

export function EgyStroke(p: IconProps) {
  // 𓏤 = 1: einfacher senkrechter Strich
  return svg(
    '0 0 10 24',
    <rect x="3" y="1" width="4" height="22" rx="2" fill="currentColor" />,
    p,
  );
}

export function EgyHeel(p: IconProps) {
  // 𓎆 = 10: Fersenknochen / Henkel (Bogenform)
  return svg(
    '0 0 24 24',
    <path
      d="M5 21 C5 7 19 7 19 21"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />,
    p,
  );
}

export function EgyCoil(p: IconProps) {
  // 𓆱 = 100: gerolltes Seil (Spirale)
  return svg(
    '0 0 24 24',
    <path
      d="M12 3.5a8.5 8.5 0 1 1 -6.2 14.3M5.8 17.8a4.6 4.6 0 1 1 3.4 -7.7"
      stroke="currentColor"
      strokeWidth="2.3"
      fill="none"
      strokeLinecap="round"
    />,
    p,
  );
}

export function EgyLotus(p: IconProps) {
  // 𓆼 = 1.000: Lotusblüte auf Stiel
  return svg(
    '0 0 24 24',
    <>
      <path
        d="M12 5c3 0 5.5 2 5.5 4.6 0 2.6 -2.7 3.6 -5.5 3.6s-5.5 -1 -5.5 -3.6C6.5 7 9 5 12 5Z"
        fill="currentColor"
      />
      <path d="M12 13v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>,
    p,
  );
}

export function EgyFinger(p: IconProps) {
  // 𓂭 = 10.000: gebeugter Finger (Haken)
  return svg(
    '0 0 24 24',
    <path
      d="M9 3v11a5 5 0 0 0 10 0v-3"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />,
    p,
  );
}

export function EgyTadpole(p: IconProps) {
  // 𓆐 = 100.000: Kaulquappe (Kopf mit Schwanz)
  return svg(
    '0 0 24 24',
    <>
      <circle cx="9" cy="9" r="5.2" fill="currentColor" />
      <path
        d="M13 12.5C17.5 14.5 20 18 20 21.5"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </>,
    p,
  );
}

export function EgyHeh(p: IconProps) {
  // 𓁨 = 1.000.000: kniender Gott Heh mit erhobenen Armen
  return svg(
    '0 0 24 24',
    <>
      <circle cx="12" cy="4.2" r="2.4" fill="currentColor" />
      <path d="M12 7v7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M12 9.5 4.8 4.2M12 9.5 19.2 4.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 14.5 6.8 21.5M12 14.5 17.2 21.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </>,
    p,
  );
}

export function EgyEye(p: IconProps) {
  // 𓂀 = Symbol/„Flagge“ des Systems: Auge des Horus (vereinfacht)
  return svg(
    '0 0 32 20',
    <>
      <path
        d="M2 10c6 -8 22 -8 28 0 -6 8 -22 8 -28 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="10" r="3.4" fill="currentColor" />
      <path d="M14 13.5 11 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>,
    p,
  );
}

// ---- Babylonisch (Basis 60, positionell, Keilschrift) ----------------

export function CuneiformOne(p: IconProps) {
  // 𒁹 = 1: senkrechter Keil
  return svg('0 0 10 24', <polygon points="1,2 9,2 6,22 4,22" fill="currentColor" />, p);
}

export function CuneiformTen(p: IconProps) {
  // 𒌋 = 10: liegender Winkelkeil
  return svg('0 0 24 12', <polygon points="2,1 2,11 22,6" fill="currentColor" />, p);
}

// ============================================================
// Zeichen → Icon-Zuordnung + GlyphText: ersetzt in einem beliebigen
// String genau die neun problematischen Unicode-Zeichen durch die
// obigen SVGs; alles andere (Ziffern, Leerzeichen, „|“, lateinische
// Buchstaben, Maya-Symbole) bleibt normaler, durchsuchbarer Text.
// ============================================================

const GLYPH_ICON: Record<string, (p: IconProps) => ReactNode> = {
  '𓏤': EgyStroke,
  '𓎆': EgyHeel,
  '𓆱': EgyCoil,
  '𓆼': EgyLotus,
  '𓂭': EgyFinger,
  '𓆐': EgyTadpole,
  '𓁨': EgyHeh,
  '𓂀': EgyEye,
  '𒁹': CuneiformOne,
  '𒌋': CuneiformTen,
};

export function GlyphText({
  text,
  size = 18,
  color = 'currentColor',
  gap = 2,
  style,
}: {
  text: string;
  size?: number;
  color?: string;
  gap?: number;
  style?: CSSProperties;
}) {
  const nodes: ReactNode[] = [];
  let buf = '';
  let key = 0;
  const flush = () => {
    if (buf) {
      nodes.push(<span key={key++}>{buf}</span>);
      buf = '';
    }
  };
  for (const ch of Array.from(text)) {
    const Icon = GLYPH_ICON[ch];
    if (Icon) {
      flush();
      nodes.push(
        <span key={key++} style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
          <Icon size={size} color={color} />
        </span>,
      );
    } else {
      buf += ch;
    }
  }
  flush();
  return (
    <span
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        columnGap: gap,
        rowGap: gap,
        ...style,
      }}
    >
      {nodes}
    </span>
  );
}

// Klein-Icon fürs "Flaggen"-Symbol je System (Header/Auswahlkarten). Für
// Systeme ohne Darstellungsrisiko (Emoji) wird der Originaltext genutzt.
export function SysFlag({
  id,
  flag,
  size = 24,
}: {
  id: NumSystemID;
  flag: string;
  size?: number;
}) {
  if (id === 'egyptian') return <EgyEye size={size * 1.15} color="var(--ink)" />;
  if (id === 'babylonian') return <CuneiformOne size={size * 0.8} color="var(--ink)" />;
  return <span style={{ fontSize: size, lineHeight: 1 }}>{flag}</span>;
}
