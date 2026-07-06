import { useNavigator } from './lib/navigation';
import { AuthWidget } from './components/AuthWidget';

// ============================================================
// HAUPTMENÜ — echte Startseite der App. Bündelt zwei eigenständige
// Bereiche: Wirtschaftsinformatik (die bisherigen 7 Module hinter
// einem Untermenü) und Strategie & Führung (eigener Bereich).
// ============================================================

interface AreaDef {
  icon: string;
  title: string;
  subtitle: string;
  meta: string;
  actionLabel: string;
  color: string;
  onOpen: () => void;
}

export function MainMenu() {
  const nav = useNavigator();

  const areas: AreaDef[] = [
    {
      icon: '💻',
      title: 'Wirtschaftsinformatik',
      subtitle:
        'Fachartikel mit Quiz, ERM-Trainer, Zahlensysteme, PAP-Quest, SQL-Trainer, Vorlesungskapitel und Raster-Trainer.',
      meta: '7 Programme',
      actionLabel: 'Themengebiete öffnen',
      color: 'var(--entity)',
      onOpen: () => nav.push({ name: 'wiHub' }),
    },
    {
      icon: '🧩',
      title: 'Strategie & Führung',
      subtitle:
        'BCG-Matrix, Five-Forces und das Reifegradmodell der Führung selbst beschriften, Fallstudien per Drag & Drop priorisieren und Fachbegriffe im Lückentext einsetzen.',
      meta: 'Onboarding inklusive',
      actionLabel: 'Öffnen',
      color: 'var(--strategy)',
      onOpen: () => nav.push({ name: 'strategyHub' }),
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-bg/85 border-b border-line">
        <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-entity flex items-center justify-center font-extrabold text-white text-sm shrink-0">
              L
            </div>
            <span className="font-bold text-ink tracking-tight">Lern-Hub</span>
          </div>
          <AuthWidget />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5">
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-10">
          <p className="text-relation font-bold text-xs tracking-[0.08em] mb-3">HOCHSCHULE · KLAUSURVORBEREITUNG</p>
          <h1 className="text-ink font-extrabold leading-[1.08] text-[34px] sm:text-[46px] max-w-2xl">
            Wähle deinen Lernbereich.
          </h1>
          <p className="text-sub text-[15.5px] sm:text-base mt-4 max-w-xl leading-relaxed">
            Zwei eigenständige Bereiche, ein Zugang: Wirtschaftsinformatik mit sieben interaktiven
            Lernprogrammen und Strategie & Führung mit Diagrammen, Fallstudien und Lückentext-Matching.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
          {areas.map((a, i) => (
            <AreaCard key={a.title} {...a} index={i} />
          ))}
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="text-sub text-xs">© {new Date().getFullYear()} Lern-Hub</p>
        </div>
      </footer>
    </div>
  );
}

function AreaCard({ icon, title, subtitle, meta, actionLabel, color, onOpen, index }: AreaDef & { index: number }) {
  return (
    <button
      onClick={onOpen}
      style={{ animationDelay: `${index * 60}ms` }}
      className="animate-fade-in-up card text-left p-6 flex flex-col gap-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl leading-none">{icon}</span>
        <span
          className="pill shrink-0"
          style={{ color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          {meta}
        </span>
      </div>
      <div>
        <h2 className="text-ink font-bold text-xl leading-snug">{title}</h2>
        <p className="text-sub text-sm leading-relaxed mt-2">{subtitle}</p>
      </div>
      <div className="mt-auto pt-1 font-bold text-sm flex items-center gap-1" style={{ color }}>
        {actionLabel} <span aria-hidden>→</span>
      </div>
    </button>
  );
}
