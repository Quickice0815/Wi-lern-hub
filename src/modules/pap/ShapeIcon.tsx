import type { ButtonHTMLAttributes } from 'react';
import type { PapShapeType } from './data';

// ============================================================
// PAP-QUEST — Symbol-Icons (Kreis, Rechteck, Raute, Parallelogramm,
// Pfeil) + kleine Spiel-Chrome-Bausteine.
// Portiert aus PapShapeIcon.swift (dort in derselben Datei:
// PapShapeIcon, PapProgressBar, PapBadge, PapActionButton).
// ============================================================

export function PapShapeIcon({
  type,
  size = 28,
  color = 'var(--ink)',
  className,
}: {
  type: PapShapeType;
  size?: number;
  color?: string;
  className?: string;
}) {
  const w = size;
  const h = size;
  const sw = 2.2;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {type === 'circle' && (
        <circle cx={w / 2} cy={h / 2} r={w * 0.42} fill="none" stroke={color} strokeWidth={sw} />
      )}
      {type === 'rect' && (
        <rect
          x={w * 0.1}
          y={h * 0.22}
          width={w * 0.8}
          height={h * 0.56}
          fill="none"
          stroke={color}
          strokeWidth={sw}
        />
      )}
      {type === 'diamond' && (
        <polygon
          points={`${w * 0.5},${h * 0.08} ${w * 0.92},${h * 0.5} ${w * 0.5},${h * 0.92} ${w * 0.08},${h * 0.5}`}
          fill="none"
          stroke={color}
          strokeWidth={sw}
        />
      )}
      {type === 'parallelogram' && (
        <polygon
          points={`${w * 0.28},${h * 0.22} ${w * 0.9},${h * 0.22} ${w * 0.72},${h * 0.78} ${w * 0.1},${h * 0.78}`}
          fill="none"
          stroke={color}
          strokeWidth={sw}
        />
      )}
      {type === 'arrow' && (
        <>
          <line x1={w * 0.5} y1={h * 0.1} x2={w * 0.5} y2={h * 0.72} stroke={color} strokeWidth={sw} />
          <polygon
            points={`${w * 0.32},${h * 0.68} ${w * 0.68},${h * 0.68} ${w * 0.5},${h * 0.92}`}
            fill={color}
          />
        </>
      )}
    </svg>
  );
}

export function PapProgressSegments({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-[3px] transition-colors"
          style={{ background: i < current ? 'var(--pap-action)' : 'var(--panel-2)' }}
        />
      ))}
    </div>
  );
}

export function PapBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="text-xs font-bold px-2.5 py-[5px] rounded-full whitespace-nowrap"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
      }}
    >
      {text}
    </span>
  );
}

interface PapActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  primary?: boolean;
  glow?: boolean;
}

export function PapActionButton({ label, primary = false, glow = false, className = '', style, ...rest }: PapActionButtonProps) {
  return (
    <button
      className={`text-sm font-bold rounded-[10px] px-[18px] py-[11px] transition-transform duration-100 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none ${className}`}
      style={{
        color: primary ? '#0F1419' : 'var(--ink)',
        background: primary ? 'var(--pap-action)' : 'transparent',
        border: primary ? 'none' : '1px solid var(--line)',
        boxShadow: glow ? '0 0 14px 3px color-mix(in srgb, var(--pap-action) 50%, transparent)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {label}
    </button>
  );
}
