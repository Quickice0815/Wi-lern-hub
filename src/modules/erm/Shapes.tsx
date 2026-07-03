import type { ERMNodeType } from './data';
import { nodeTypeColorVar } from './data';

// ============================================================
// Mini-Baustein-Formen — Pendant zu ERMShapeView / ERMTutorialVisual
// aus ERMTutorialView.swift. Rechteck = Entität, Raute = Beziehung,
// Oval = Attribut, unterstrichenes Oval = Primärschlüssel.
// ============================================================

export function ErmShape({
  type,
  label,
  big = false,
  underline = false,
}: {
  type: ERMNodeType;
  label: string;
  big?: boolean;
  underline?: boolean;
}) {
  const color = nodeTypeColorVar[type];
  const fontSize = big ? 15 : 13;

  if (type === 'relation') {
    return (
      <span
        className="inline-flex items-center justify-center font-bold text-white text-center"
        style={{
          fontSize,
          padding: big ? '14px 19px' : '12px 16px',
          background: `color-mix(in srgb, ${color} 35%, transparent)`,
          border: `2px solid ${color}`,
          borderRadius: 2,
          transform: 'rotate(45deg)',
          margin: 10,
        }}
      >
        <span style={{ transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>{label}</span>
      </span>
    );
  }

  if (type === 'attr' || (type === 'pk' && !underline)) {
    return (
      <span
        className="inline-flex items-center justify-center font-bold text-white whitespace-nowrap"
        style={{
          fontSize,
          padding: big ? '11px 17px' : '9px 14px',
          background: `color-mix(in srgb, ${nodeTypeColorVar.attr} 35%, transparent)`,
          border: `2px solid ${color}`,
          borderRadius: 999,
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center font-bold text-white whitespace-nowrap"
      style={{
        fontSize,
        padding: big ? '12px 19px' : '10px 16px',
        background: `color-mix(in srgb, ${nodeTypeColorVar.entity} 35%, transparent)`,
        border: `2px solid ${color}`,
        borderRadius: 6,
      }}
    >
      {label}
    </span>
  );
}

export function ErmTutorialVisual({ kind }: { kind: 'overview' | 'entity' | 'relation' | 'attr' | 'pk' | 'card' }) {
  switch (kind) {
    case 'overview':
      return (
        <div className="flex items-center gap-1 flex-wrap justify-center">
          <ErmShape type="entity" label="Kunde" />
          <ErmShape type="relation" label="kauft" />
          <ErmShape type="entity" label="Artikel" />
        </div>
      );
    case 'entity':
      return (
        <div className="flex items-center gap-3.5 flex-wrap justify-center">
          <ErmShape type="entity" label="Kunde" big />
          <ErmShape type="entity" label="Artikel" big />
          <ErmShape type="entity" label="Tier" big />
        </div>
      );
    case 'relation':
      return (
        <div className="flex items-center gap-1 flex-wrap justify-center">
          <ErmShape type="entity" label="Kunde" />
          <span className="text-sub">—</span>
          <ErmShape type="relation" label="kauft" big />
          <span className="text-sub">—</span>
          <ErmShape type="entity" label="Artikel" />
        </div>
      );
    case 'attr':
      return (
        <div className="flex flex-col items-center gap-0">
          <ErmShape type="entity" label="Kunde" big />
          <div className="w-0.5 bg-sub" style={{ height: 18 }} />
          <div className="flex items-center gap-2">
            <ErmShape type="attr" label="Name" />
            <ErmShape type="attr" label="Wohnort" />
          </div>
        </div>
      );
    case 'pk':
      return (
        <div className="flex flex-col items-center gap-1.5">
          <ErmShape type="entity" label="Kunde" big />
          <div className="w-0.5 bg-sub" style={{ height: 14 }} />
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span
              className="inline-flex items-center justify-center font-bold text-white underline whitespace-nowrap"
              style={{
                fontSize: 13,
                padding: '9px 14px',
                background: `color-mix(in srgb, ${nodeTypeColorVar.attr} 35%, transparent)`,
                border: `2px solid ${nodeTypeColorVar.pk}`,
                borderRadius: 999,
              }}
            >
              Kundennummer
            </span>
            <ErmShape type="attr" label="Name" />
          </div>
          <span className="text-pk font-semibold" style={{ fontSize: 11 }}>
            ↑ unterstrichen = Primärschlüssel
          </span>
        </div>
      );
    case 'card':
      return (
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <ErmShape type="entity" label="Hersteller" />
          <span className="text-relation font-bold" style={{ fontSize: 16 }}>
            1
          </span>
          <span className="text-sub">—</span>
          <ErmShape type="relation" label="stellt her" />
          <span className="text-sub">—</span>
          <span className="text-relation font-bold" style={{ fontSize: 16 }}>
            N
          </span>
          <ErmShape type="entity" label="Artikel" />
        </div>
      );
  }
}
