import { useNavigator } from './lib/navigation';
import { AuthWidget } from './components/AuthWidget';

// ============================================================
// HAUPTMENÜ — echte Startseite der App. Bündelt zwei eigenständige
// Bereiche: Wirtschaftsinformatik (die bisherigen 8 Module hinter
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
        'Fachartikel mit Quiz, ERM-Trainer, Zahlensysteme, PAP-Quest, SQL-Trainer, Vorlesungskapitel, Raster-Trainer und Richtig-oder-Falsch-Trainer.',
      meta: '8 Programme',
      actionLabel: 'Themengebiete öffnen',
      color: 'var(--entity)',
      onOpen: () => nav.push({ name: 'wiHub' }),
    },
    {
      icon: '🧩',
      title: 'Strategie & Führung',
      subtitle:
        'Lerninhalte zu Führung (Kommunikation, Führungsstile, Change Management) und Strategie (Frameworks & Case-Study-Methodik) mit Prüf-Modus-Quiz zu jedem Themenblock.',
      meta: `${13 + 9} Themenblöcke`,
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
            Zwei eigenständige Bereiche, ein Zugang: Wirtschaftsinformatik mit acht interaktiven
            Lernprogrammen und Strategie & Führung mit Themenblöcken und Prüf-Modus-Quiz zu jedem Thema.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
          {areas.map((a, i) => (
            <AreaCard key={a.title} {...a} index={i} />
          ))}
        </section>

        <section className="pb-16">
          <WhatsAppCommunityCard />
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

function WhatsAppCommunityCard() {
  const color = '#25D366';
  return (
    <div className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderColor: `color-mix(in srgb, ${color} 40%, var(--line))` }}>
      <span className="text-3xl leading-none shrink-0">💬</span>
      <div className="flex-1">
        <h2 className="text-ink font-bold text-base leading-snug">Fragen oder Fehler gefunden?</h2>
        <p className="text-sub text-sm leading-relaxed mt-1">
          Tritt der WhatsApp-Community bei — dort könnt ihr euch gegenseitig helfen, Fehler melden und Fragen zu
          den Lerninhalten stellen.
        </p>
      </div>
      <a
        href="https://chat.whatsapp.com/DBN4PF4DhzRBKqr3PfufXg"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 font-bold text-sm rounded-[9px] px-4 py-2.5 text-center text-white transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: color }}
      >
        WhatsApp-Community beitreten →
      </a>
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
