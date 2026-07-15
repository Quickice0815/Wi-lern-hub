// ============================================================
// DIAGRAMME für Report-Klausuraufgaben — reine CSS-Charts (conic-
// gradient für Kreisdiagramme, Balken für Vorjahr/Aktuell-Vergleiche),
// keine externe Chart-Bibliothek nötig.
// ============================================================

const PALETTE = ['#60a5fa', '#f87171', '#4ade80', '#c084fc', '#fbbf24', '#22d3ee'];

export interface PieSlice {
  label: string;
  value: number;
}

export function PieChart({ title, data }: { title: string; data: PieSlice[] }) {
  let cumulative = 0;
  const stops = data
    .map((d, i) => {
      const start = cumulative;
      cumulative += d.value;
      return `${PALETTE[i % PALETTE.length]} ${start}% ${cumulative}%`;
    })
    .join(', ');

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-ink font-bold text-sm">{title}</h4>
      <div className="flex items-center gap-4 flex-wrap">
        <div
          className="w-28 h-28 rounded-full shrink-0"
          style={{ background: `conic-gradient(${stops})` }}
          role="img"
          aria-label={title}
        />
        <ul className="flex flex-col gap-1.5 text-xs flex-1 min-w-[140px]">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: PALETTE[i % PALETTE.length] }}
                aria-hidden
              />
              <span className="text-ink">{d.label}</span>
              <span className="text-sub font-semibold ml-auto shrink-0">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export interface BarGroup {
  label: string;
  oldValue: number;
  newValue: number;
}

export function BarChart({
  title,
  unit,
  oldLabel,
  newLabel,
  data,
}: {
  title: string;
  unit: string;
  oldLabel: string;
  newLabel: string;
  data: BarGroup[];
}) {
  const max = Math.max(...data.flatMap((d) => [d.oldValue, d.newValue]));
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-ink font-bold text-sm">{title}</h4>
      <div className="flex flex-col gap-3.5">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col gap-1">
            <span className="text-ink text-xs font-semibold">{d.label}</span>
            <BarRow label={oldLabel} value={d.oldValue} max={max} color="var(--sub)" unit={unit} />
            <BarRow label={newLabel} value={d.newValue} max={max} color="var(--english)" unit={unit} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  color,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  unit: string;
}) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-16 text-sub shrink-0">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-panel-2 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="w-24 text-right text-ink font-semibold shrink-0">
        {unit}
        {value.toLocaleString('de-DE')}
      </span>
    </div>
  );
}
