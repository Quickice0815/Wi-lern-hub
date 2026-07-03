import { SqlModes, type SqlMode } from './data';
import { Card } from '../../components/ui';

// ============================================================
// SQL-TRAINER — Modus-Auswahl (Portiert aus SqlModeSelectView)
// ============================================================
export function SqlModeSelect({ onChoose }: { onChoose: (id: SqlMode['id']) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-ink font-bold text-[22px]">SQL-Filterung trainieren</h1>
        <p className="text-sub text-[13px]">SAP S/4HANA · Geschäftspartner verwalten</p>
      </div>
      <p className="text-ink text-sm">Wie gut kennst du dich mit SQL-Filterung schon aus?</p>

      <div className="flex flex-col gap-3">
        {SqlModes.all.map((mode) => (
          <button key={mode.id} onClick={() => onChoose(mode.id)} className="text-left">
            <Card className="p-[18px] flex flex-col gap-1.5 transition-transform active:scale-[0.99] hover:border-sql-cyan/50">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl leading-none">{mode.emoji}</span>
                <span className="text-ink font-bold text-base">{mode.title}</span>
              </div>
              <p className="text-ink/90 text-[13.5px]">{mode.desc}</p>
              <p className="text-sub text-xs">{mode.detail}</p>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
