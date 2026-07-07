import type { ReactNode } from 'react';
import { COLORS, type SummaryVisualKind } from './data';

// ============================================================
// GRAFIKEN für die Artikel-Zusammenfassungen — Pendant zu
// SummaryVisuals.swift. Statt Canvas/Shapes werden hier reine
// CSS-/SVG-Elemente im gleichen dunklen Theme verwendet.
// ============================================================

export function SummaryVisualView({ kind, accent = COLORS.entity }: { kind: SummaryVisualKind; accent?: string }) {
  return (
    <div className="p-3.5 w-full bg-bg border border-line rounded-xl overflow-x-auto">
      <div className="min-w-[280px]">{renderVisual(kind, accent)}</div>
    </div>
  );
}

function renderVisual(kind: SummaryVisualKind, _accent: string): ReactNode {
  switch (kind) {
    case 'verdichtung':
      return <VerdichtungFlow />;
    case 'skalen':
      return <SkalenCards />;
    case 'wuerfel':
      return <DimensionCube />;
    case 'oltpluecke':
      return <OltpLueckeCompare />;
    case 'dimensionshierarchien':
      return <DimensionsHierarchien />;
    case 'pivotprogression':
      return <PivotProgression />;
    case 'stammbewegung':
      return <StammBewegungBoxes />;
    case 'passquote':
      return <PassquoteCompare />;
    case 'revolutions':
      return <RevolutionsTimeline />;
    case 'taetigkeiten':
      return <TaetigkeitenLadder />;
    case 'berichtswesen':
      return <BerichtswesenFlow />;
    case 'duplicate':
      return <DuplicateDiagram />;
    case 'suchprozess':
      return <SuchprozessFlow />;
    case 'shingles':
      return <ShinglesStack />;
    case 'jaccard':
      return <JaccardVenn />;
    case 'originalkriterien':
      return <OriginalkriterienList />;
    case 'duplikatsgrad':
      return <DuplikatsgradBar />;
    case 'pyramide':
      return <InfoPyramid />;
    case 'gedaechtnis':
      return <GedaechtnisFlow />;
    case 'faces':
      return <ChernoffFacesRow />;
    default:
      return null;
  }
}

// ---------- Kleine Bausteine ----------
function LabeledBox({
  title,
  subtitle,
  detail,
  color,
  width,
}: {
  title: string;
  subtitle?: string;
  detail?: string | null;
  color: string;
  width?: number;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 rounded-lg bg-panel px-2.5 py-2.5 text-center"
      style={{ border: `1.5px solid ${color}`, width, minHeight: 64, flex: width ? undefined : '1 1 0' }}
    >
      <span className="text-ink text-[13px] font-bold">{title}</span>
      {subtitle && <span className="text-sub text-[10.5px]">{subtitle}</span>}
      {detail && <span className="text-sub text-[10.5px]">{detail}</span>}
    </div>
  );
}

function ArrowRight({ color = 'var(--sub)', label }: { color?: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 shrink-0 px-1">
      {label && <span className="text-sub text-[9.5px] whitespace-nowrap">{label}</span>}
      <span className="text-[16px] font-bold leading-none" style={{ color }}>
        →
      </span>
    </div>
  );
}

// ---------- MULTIDIM ----------
function VerdichtungFlow() {
  return (
    <div className="flex items-center gap-2">
      <LabeledBox title="Operative Daten" subtitle="viele Zeilen," detail="„atomar“" color={COLORS.entity} />
      <ArrowRight color={COLORS.entity} label="verdichten" />
      <LabeledBox title="Kennzahl" subtitle="1 Wert" detail="(Σ, ø, Modus…)" color={COLORS.attribute} />
      <ArrowRight color={COLORS.attribute} label="+ Dimension" />
      <LabeledBox title="Wissen" subtitle="Entscheidung" color={COLORS.pk} />
    </div>
  );
}

function SkalenCards() {
  const cards: { title: string; sub: string; ex: string; allowed: string; color: string }[] = [
    { title: 'NOMINAL', sub: 'Kategorien, kein Rang', ex: 'z. B. SO / TA / KM', allowed: 'nur Modus', color: COLORS.red },
    { title: 'ORDINAL', sub: 'Rang, ungl. Abstände', ex: 'z. B. Profitstufe 1–4', allowed: '+ Median', color: COLORS.relation },
    { title: 'KARDINAL', sub: 'gleiche Abstände', ex: 'z. B. Umsatz in €', allowed: '+ Σ / Durchschnitt', color: COLORS.attribute },
  ];
  return (
    <div className="flex gap-2">
      {cards.map((c) => (
        <div
          key={c.title}
          className="flex-1 flex flex-col items-center gap-1.5 rounded-[10px] bg-panel px-2.5 py-2.5 text-center min-h-[130px]"
          style={{ border: `1.5px solid ${c.color}` }}
        >
          <span className="text-[12px] font-bold" style={{ color: c.color }}>
            {c.title}
          </span>
          <span className="text-sub text-[9.5px]">{c.sub}</span>
          <span className="text-ink text-[10.5px] pt-0.5">{c.ex}</span>
          <div className="flex-1" />
          <span className="text-sub text-[9px]">erlaubt:</span>
          <span className="text-ink text-[11px] font-bold">{c.allowed}</span>
        </div>
      ))}
    </div>
  );
}

function DimensionCube() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-sub text-[11px]">Eine Kennzahl, mehrere Dimensionen</span>
      <div className="relative w-full h-[100px] flex items-center justify-center">
        <svg viewBox="0 0 160 110" width="160" height="110">
          <polygon points="55,35 105,35 105,85 55,85" fill={`color-mix(in srgb, ${COLORS.entity} 30%, transparent)`} stroke={COLORS.entity} strokeWidth="1.5" />
          <polygon points="55,35 73,17 123,17 105,35" fill={`color-mix(in srgb, ${COLORS.entity} 40%, transparent)`} stroke={COLORS.entity} strokeWidth="1.5" />
          <polygon points="105,35 123,17 123,67 105,85" fill={`color-mix(in srgb, ${COLORS.entity} 25%, transparent)`} stroke={COLORS.entity} strokeWidth="1.5" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <span className="text-[11px] font-bold" style={{ color: COLORS.pk }}>
            Raum
          </span>
          <span className="text-[11px] font-bold" style={{ color: COLORS.red }}>
            Sache
          </span>
        </div>
      </div>
      <span className="text-[11px] font-bold" style={{ color: COLORS.attribute }}>
        Zeit
      </span>
    </div>
  );
}

function OltpLueckeCompare() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 flex flex-col items-center gap-1.5">
        <span className="text-[12px] font-bold" style={{ color: COLORS.red }}>
          1 Kassenbon
        </span>
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-panel px-2.5 py-2.5" style={{ border: `1.5px solid ${COLORS.red}` }}>
          <span className="text-ink text-[12.5px] font-bold">Ein Kaufvorgang</span>
          <span className="text-sub text-[10.5px]">reicht für die Kasse</span>
        </div>
      </div>
      <ArrowRight label="+ 999 andere" />
      <div className="flex-1 flex flex-col items-center gap-1.5">
        <span className="text-[12px] font-bold" style={{ color: COLORS.attribute }}>
          Tausend Bons
        </span>
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-panel px-2.5 py-2.5" style={{ border: `1.5px solid ${COLORS.attribute}` }}>
          <span className="text-ink text-[12.5px] font-bold">Zusammenfassung</span>
          <span className="text-sub text-[10.5px]">„Wie läuft der Laden?“</span>
        </div>
      </div>
    </div>
  );
}

function DimensionsHierarchien() {
  const rows = [
    { dim: 'Raum', chain: 'Filiale → Stadt → Bezirk → Bundesland → Land', color: COLORS.pk },
    { dim: 'Mitarbeiter', chain: 'Mitarbeiter → Abteilung → Filiale', color: COLORS.attribute },
    { dim: 'Kunde', chain: 'Ansprechpartner → Abteilung → Firma', color: COLORS.entity },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r) => (
        <div key={r.dim} className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2.5 rounded-lg bg-panel px-3 py-2" style={{ border: `1.5px solid ${r.color}` }}>
          <span className="text-[12.5px] font-bold text-ink shrink-0 w-[90px]" style={{ color: r.color }}>
            {r.dim}
          </span>
          <span className="text-sub text-[10.5px]">{r.chain}</span>
        </div>
      ))}
    </div>
  );
}

function PivotProgression() {
  const steps: { title: string; sub: string }[] = [
    { title: '1 Dimension', sub: 'Umsatz je Mitarbeiter' },
    { title: '2 Dimensionen', sub: '+ Auftragsart (wer macht was)' },
    { title: '3 Dimensionen', sub: '+ Zeit-Filter (wer war wann aktiv)' },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.title} className="flex items-center gap-1.5 shrink-0">
          <LabeledBox title={s.title} subtitle={s.sub} color={COLORS.entity} width={128} />
          {i < steps.length - 1 && <ArrowRight color={COLORS.entity} />}
        </div>
      ))}
    </div>
  );
}

// ---------- FUSSBALL ----------
function StammBewegungBoxes() {
  return (
    <div className="flex gap-2.5">
      <LabeledBox title="STAMMDATEN" subtitle="dauerhaft, unveränderlich" detail="Spieler · Team · Position" color={COLORS.entity} />
      <LabeledBox title="BEWEGUNGSDATEN" subtitle="je Spiel neu" detail="Pass · Distanz · Tempo" color={COLORS.attribute} />
    </div>
  );
}

function PassquoteCompare() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 flex flex-col items-center gap-1.5">
        <span className="text-[12px] font-bold" style={{ color: COLORS.red }}>
          Eindimensional
        </span>
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-panel px-2.5 py-2.5" style={{ border: `1.5px solid ${COLORS.red}` }}>
          <span className="text-ink text-[14px] font-bold">Passquote 95 %</span>
          <span className="text-sub text-[10.5px]">→ sagt wenig aus</span>
        </div>
      </div>
      <ArrowRight />
      <div className="flex-1 flex flex-col items-center gap-1.5">
        <span className="text-[12px] font-bold" style={{ color: COLORS.attribute }}>
          Multidimensional
        </span>
        <div className="flex flex-col items-start gap-0.5 rounded-lg bg-panel px-2.5 py-2.5 w-full" style={{ border: `1.5px solid ${COLORS.attribute}` }}>
          <span className="text-ink text-[12px] font-bold">Passquote 95 %</span>
          <span className="text-sub text-[10px]">+ Entfernung (50 m)</span>
          <span className="text-sub text-[10px]">+ Tempo (50 km/h)</span>
          <span className="text-sub text-[10px]">+ Ort (am Tor)</span>
          <span className="text-[11px] font-bold pt-0.5" style={{ color: COLORS.attribute }}>
            → wertvoller Pass!
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- FABRIK ----------
function RevolutionsTimeline() {
  const items: [string, string, string][] = [
    ['1', 'Dampf', COLORS.red],
    ['2', 'Strom', COLORS.relation],
    ['3', 'Mikrochip', COLORS.entity],
    ['4', 'Smart', COLORS.purple],
  ];
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-1">
        {items.map(([num, label, color]) => (
          <div key={num} className="flex-1 flex flex-col items-center gap-1 rounded-lg bg-panel px-1.5 py-2" style={{ border: `1.5px solid ${color}` }}>
            <span className="text-[11px] font-bold" style={{ color }}>
              {num}. Rev.
            </span>
            <span className="text-ink text-[10.5px]">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sub">→</span>
        <span className="text-sub text-[10.5px]">körperliche → geistige Arbeit wandert zur Maschine</span>
      </div>
    </div>
  );
}

function TaetigkeitenLadder() {
  const items: [string, string, string][] = [
    ['1. exekutiv', 'ausführen (bohren)', COLORS.red],
    ['2. administrativ', 'nach Plan anweisen', COLORS.relation],
    ['3. dispositiv', 'überwachen', COLORS.entity],
    ['4. kreativ', 'Neues gestalten', COLORS.purple],
  ];
  return (
    <div className="flex flex-col gap-2">
      {items.map(([label, sub, color]) => (
        <div key={label} className="flex items-center justify-between rounded-lg bg-panel px-3.5 py-2.5" style={{ border: `1.5px solid ${color}` }}>
          <span className="text-[13px] font-bold" style={{ color }}>
            {label}
          </span>
          <span className="text-sub text-[11px]">{sub}</span>
        </div>
      ))}
      <div className="flex justify-end">
        <span className="text-sub text-[10px]">steigende Komplexität ↑</span>
      </div>
    </div>
  );
}

function BerichtswesenFlow() {
  const items: [string, string, string, string][] = [
    ['Reporting / Analysis', 'Was ist / warum?', 'Vergangenheit', COLORS.entity],
    ['Monitoring', 'Was passiert gerade?', 'Gegenwart', COLORS.attribute],
    ['Prediction', 'Was wird passieren?', 'Zukunft', COLORS.purple],
  ];
  return (
    <div className="flex gap-2">
      {items.map(([title, sub, era, color]) => (
        <div
          key={title}
          className="flex-1 flex flex-col items-center gap-1 text-center rounded-lg bg-panel px-2 py-2 min-h-[80px] justify-center"
          style={{ border: `1.5px solid ${color}` }}
        >
          <span className="text-[11.5px] font-bold" style={{ color }}>
            {title}
          </span>
          <span className="text-ink text-[10px]">{sub}</span>
          <span className="text-sub text-[10px] pt-1">{era}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- SHINGLE ----------
function DuplicateDiagram() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <LabeledBox title="gleicher Text" subtitle="Artikel X" color={COLORS.entity} />
      <span className="text-sub">↳</span>
      <div className="flex gap-1.5 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center text-center rounded-md bg-panel px-2 py-2 text-sub text-[10px]"
            style={{ border: `1.2px solid ${COLORS.red}` }}
          >
            URL {i}
            <br />
            (Duplikat)
          </div>
        ))}
      </div>
      <span className="text-[11px] font-bold" style={{ color: COLORS.red }}>
        Suchmaschine zeigt nur 1×
      </span>
    </div>
  );
}

function ShinglesStack() {
  const shingles = ['Content ist das', 'ist das Gegenteil', 'das Gegenteil von', 'Gegenteil von Unique'];
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sub text-[11px]">Text: „Content ist das Gegenteil von Unique Content“</span>
      {shingles.map((s, i) => (
        <div
          key={s}
          className="rounded-md bg-panel px-3 py-1.5 text-ink text-[12px]"
          style={{ border: `1px solid ${COLORS.entity}`, marginLeft: i * 10 }}
        >
          {s}
        </div>
      ))}
      <span className="text-[10.5px] font-bold" style={{ color: COLORS.entity }}>
        überlappend, wie Schindeln (Shingle-Länge 3)
      </span>
    </div>
  );
}

function JaccardVenn() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-ink text-[12px] font-bold">Jaccard = Schnittmenge / Vereinigungsmenge</span>
      <div className="relative w-full h-[130px] flex items-center justify-center">
        <svg viewBox="0 0 220 130" width="220" height="130">
          <circle cx="90" cy="65" r="55" fill={`color-mix(in srgb, ${COLORS.entity} 20%, transparent)`} stroke={COLORS.entity} strokeWidth="2" />
          <circle cx="140" cy="65" r="55" fill={`color-mix(in srgb, ${COLORS.attribute} 20%, transparent)`} stroke={COLORS.attribute} strokeWidth="2" />
          <text x="115" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill="var(--ink)">
            ∩
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-2 text-sub text-[11px]">
          <span>nur A</span>
          <span>nur B</span>
        </div>
      </div>
      <span className="text-sub text-[11.5px]">Beispiel: 3 / 9 = 33 %</span>
    </div>
  );
}

function SuchprozessFlow() {
  const steps: { title: string; sub: string }[] = [
    { title: 'Crawlen', sub: 'Googlebot folgt Links' },
    { title: 'Indexieren', sub: 'Wörter → Index-Tabelle' },
    { title: 'Suche', sub: 'Keyword → Treffer filtern' },
    { title: 'Ranking', sub: 'Algorithmus sortiert' },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.title} className="flex items-center gap-1.5 shrink-0">
          <LabeledBox title={`${i + 1}. ${s.title}`} subtitle={s.sub} color={COLORS.purple} width={104} />
          {i < steps.length - 1 && <ArrowRight color={COLORS.purple} />}
        </div>
      ))}
    </div>
  );
}

function OriginalkriterienList() {
  const items = [
    { title: 'Indexierungsdatum', sub: 'wer zuerst indexiert wurde, gilt als Original' },
    { title: 'Reputation', sub: 'etablierte Seiten werden seltener verdächtigt' },
    { title: 'Eingehende Quellverweise', sub: 'die Seite, auf die andere verlinken' },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((it) => (
        <div
          key={it.title}
          className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2.5 rounded-lg bg-panel px-3 py-2"
          style={{ border: `1.5px solid ${COLORS.purple}` }}
        >
          <span className="text-[12.5px] font-bold text-ink shrink-0">{it.title}</span>
          <span className="text-sub text-[10.5px]">{it.sub}</span>
        </div>
      ))}
    </div>
  );
}

function DuplikatsgradBar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full h-9 rounded-lg overflow-hidden" style={{ border: `1.5px solid ${COLORS.purple}` }}>
        <div
          className="flex items-center justify-center text-[10px] font-bold text-ink"
          style={{ width: '40%', background: `color-mix(in srgb, ${COLORS.attribute} 25%, transparent)` }}
        >
          0–40 %
        </div>
        <div
          className="flex items-center justify-center text-[10px] font-bold text-ink"
          style={{ width: '20%', background: `color-mix(in srgb, ${COLORS.relation} 35%, transparent)` }}
        >
          40–60 %
        </div>
        <div
          className="flex items-center justify-center text-[10px] font-bold text-ink"
          style={{ width: '40%', background: `color-mix(in srgb, ${COLORS.red} 25%, transparent)` }}
        >
          &gt; 60 %
        </div>
      </div>
      <div className="flex text-[9.5px] text-sub text-center">
        <span style={{ width: '40%' }}>beide Seiten geranked</span>
        <span style={{ width: '20%' }}>Grauzone</span>
        <span style={{ width: '40%' }}>Original wird unklar</span>
      </div>
    </div>
  );
}

// ---------- CHERNOFF ----------
function InfoPyramid() {
  const levels: [string, string, number][] = [
    ['Wissen', COLORS.pk, 0.4],
    ['Informationen', COLORS.attribute, 0.55],
    ['Daten', COLORS.entity, 0.72],
    ['Signale / Zeichen', COLORS.purple, 0.9],
  ];
  return (
    <div className="flex flex-col items-center gap-1">
      {levels.map(([label, color, w]) => (
        <div
          key={label}
          className="flex items-center justify-center text-ink text-[12px] font-bold rounded"
          style={{
            width: `${w * 100}%`,
            maxWidth: 280,
            height: 32,
            backgroundColor: `color-mix(in srgb, ${color} 30%, transparent)`,
            border: `1.5px solid ${color}`,
          }}
        >
          {label}
        </div>
      ))}
      <div className="flex justify-between w-full max-w-[280px] pt-0.5">
        <span className="text-sub text-[9.5px]">Mensch</span>
        <span className="text-sub text-[9.5px]">Maschine</span>
      </div>
    </div>
  );
}

function GedaechtnisFlow() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <LabeledBox title="ikonisches" subtitle="Gedächtnis" color={COLORS.entity} width={100} />
        <ArrowRight />
        <LabeledBox title="Arbeits-" subtitle="gedächtnis" detail="nur 3–5 Dinge!" color={COLORS.attribute} width={110} />
        <ArrowRight color={COLORS.red} />
        <LabeledBox title="Balanced" subtitle="Scorecard ≫ 5" color={COLORS.red} width={100} />
      </div>
      <span className="text-sub text-[10.5px] text-center">
        Mehr Kennzahlen als der Mensch fassen kann → Visualisierung nötig
      </span>
    </div>
  );
}

function ChernoffFace({ mouthCurve, color, label }: { mouthCurve: number; color: string; label: string }) {
  // mouthCurve: positive = Lächeln, negative = Stirnrunzeln
  const midY = 22;
  const controlY = midY + mouthCurve;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 84 100" width="84" height="100">
        <ellipse cx="42" cy="50" rx="40" ry="48" fill="var(--panel)" stroke={color} strokeWidth="2" />
        <circle cx="28" cy="32" r="3.5" fill="var(--ink)" />
        <circle cx="56" cy="32" r="3.5" fill="var(--ink)" />
        <path d={`M 24 ${midY + 50} Q 42 ${controlY + 50} 60 ${midY + 50}`} fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      </svg>
      <span className="text-sub text-[10.5px]">{label}</span>
    </div>
  );
}

function ChernoffFacesRow() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-sub text-[11.5px] text-center">
        Jede Kennzahl steuert ein Merkmal — Mundwinkel = wichtigste
      </span>
      <div className="flex items-start gap-4">
        <ChernoffFace mouthCurve={6} color={COLORS.attribute} label="gute Werte" />
        <ChernoffFace mouthCurve={0} color={COLORS.relation} label="neutral" />
        <ChernoffFace mouthCurve={-6} color={COLORS.red} label="Achtung!" />
      </div>
    </div>
  );
}
