import type { SqlField } from './data';

// ============================================================
// SQL-TRAINER — SAP-Selektionsbildschirm-Mockup
// Portiert aus SqlScreenshotView.swift. Zeigt keine Ergebniszeilen
// (die Original-App hat keinen Datensatz-Datenbestand für diesen
// Trainer), sondern exakt das, wonach im Level gefiltert wird: den
// SAP-Selektionsbildschirm "Geschäftspartner verwalten" mit den
// Filterfeldern und den darin gesetzten Werte-Chips. Aus genau
// diesen Chips leitet man die WHERE-Bedingung ab.
// ============================================================

export function SqlScreenshot({ fields }: { fields: SqlField[] }) {
  return (
    <div className="rounded-lg overflow-hidden border border-line">
      <div className="flex items-center gap-2.5 px-4 py-2" style={{ backgroundColor: '#354a5f' }}>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] bg-white"
          style={{ color: '#354a5f' }}
        >
          SAP
        </span>
        <span className="text-white text-[13px] font-semibold">Geschäftspartner verwalten</span>
        <div className="flex-1" />
        <div
          className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#10b981' }}
        >
          <span className="text-white text-[9px] font-bold">LL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4" style={{ backgroundColor: '#ffffff' }}>
        {fields.map((f, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[11px]" style={{ color: '#64748b' }}>
              {f.label}:
            </span>
            <div
              className="flex items-center gap-1 flex-wrap px-1.5 py-1 rounded-[4px]"
              style={{ minHeight: 26, border: '1px solid #94a3b8' }}
            >
              {f.chips.length === 0 ? (
                <span className="text-[11px]" style={{ color: '#cbd5e1' }}>
                  —
                </span>
              ) : (
                f.chips.map((c, ci) => (
                  <span
                    key={ci}
                    className="text-[10px] px-1.5 py-0.5 rounded-[4px]"
                    style={{ color: '#334155', backgroundColor: '#f1f5f9' }}
                  >
                    {c}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
