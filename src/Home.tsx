import { useNavigator } from './lib/navigation';
import { AuthWidget } from './components/AuthWidget';
import { Articles } from './modules/articles/data';
import { ERM_TASKS } from './modules/erm/data';
import { NUM_SYSTEMS } from './modules/numbers/data';
import { PAP_LEVELS } from './modules/pap/data';
import { SqlLevels } from './modules/sql/data';
import { LECTURE_CHAPTERS } from './modules/lectures/data';

// ============================================================
// STARTSEITE — professionelle Landingpage. Jede Karte führt per
// Klick direkt in das jeweilige interaktive Programm (kein
// externer Link, sondern ein Wechsel der App-Ansicht). Die
// Kennzahlen werden aus den echten, portierten Modul-Daten
// berechnet statt hartkodiert zu sein.
// ============================================================

const totalQuestions = Articles.reduce((sum, a) => sum + a.questions.length, 0);
const articlesWithWorked = Articles.filter((a) => a.hasWorked).length;
const ermTaskCount = ERM_TASKS.length;
const numSystemCount = NUM_SYSTEMS.length;
const papLevelCount = PAP_LEVELS.length;
const sqlLevelCount = SqlLevels.all.length;
const lectureChapterCount = LECTURE_CHAPTERS.length;

interface ModuleDef {
  icon: string;
  title: string;
  subtitle: string;
  meta: string;
  actionLabel: string;
  color: string;
  onOpen: () => void;
}

export function HomePage() {
  const nav = useNavigator();

  const modules: ModuleDef[] = [
    {
      icon: '📚',
      title: 'Die 5 Artikel',
      subtitle:
        'Fünf Fachartikel mit je 11–13 Fragen. Anwendungsthemen werden erst erklärt, dann mit einer eigenen Aufgabe geprüft.',
      meta: `${totalQuestions} Fragen · ${articlesWithWorked} Anwendungsaufgaben`,
      actionLabel: 'Öffnen',
      color: 'var(--entity)',
      onOpen: () => nav.push({ name: 'articleMenu' }),
    },
    {
      icon: '🔗',
      title: 'ERM-Trainer',
      subtitle:
        'Aus Text ein ER-Modell bauen: Entitäten, Beziehungen, Attribute und Kardinalitäten markieren, modellieren und auswerten lassen.',
      meta: `${ermTaskCount} Aufgaben · Tutorial inklusive`,
      actionLabel: 'Öffnen',
      color: 'var(--relation)',
      onOpen: () => nav.push({ name: 'ermMenu' }),
    },
    {
      icon: '🔢',
      title: 'Historische Zahlensysteme',
      subtitle:
        'Römisch, Ägyptisch, Babylonisch (Basis 60) und Maya (Basis 20): Tutorial je System, dann ein Endlos-Quiz.',
      meta: `${numSystemCount} Zahlensysteme · Endlos-Quiz`,
      actionLabel: 'Spielen',
      color: 'var(--numbers)',
      onOpen: () => nav.push({ name: 'numbers' }),
    },
    {
      icon: '🧙‍♂️',
      title: 'PAP-Quest: Die Logik-Odyssee',
      subtitle:
        'Programmablaufpläne & Kontrollstrukturen: 6 Level von den 5 PAP-Symbolen über IF-THEN-ELSE bis zum Online-Shop-Endboss.',
      meta: `${papLevelCount} Level · Punkte & Belohnungen`,
      actionLabel: 'Quest starten',
      color: 'var(--pap-action)',
      onOpen: () => nav.push({ name: 'papQuest' }),
    },
    {
      icon: '🗄️',
      title: 'SQL-Filterung trainieren',
      subtitle:
        'SAP S/4HANA Geschäftspartner verwalten: 10 Level zu WHERE, AND/OR, LIKE/NOT LIKE und Datumsbereichen, mit Tutorial und 3 Schwierigkeitsmodi.',
      meta: `${sqlLevelCount} Level · 3 Schwierigkeitsmodi`,
      actionLabel: 'Trainieren',
      color: 'var(--sql-cyan)',
      onOpen: () => nav.push({ name: 'sqlTrainer' }),
    },
    {
      icon: '📖',
      title: 'Vorlesungen',
      subtitle:
        'Die Kapitel der Vorlesung „Einführung in die Wirtschaftsinformatik": kurzes Tutorial je Kapitel, dann Übungen in drei Schwierigkeitsstufen.',
      meta: `${lectureChapterCount} Kapitel · 3 Stufen`,
      actionLabel: 'Öffnen',
      color: 'var(--attribute)',
      onOpen: () => nav.push({ name: 'lectureMenu' }),
    },
    {
      icon: '🗂️',
      title: 'Raster-Trainer',
      subtitle:
        'Funktionen per Drag & Drop im Rasterdiagramm den richtigen Abteilungen zuordnen — 2 Übungstypen, 3 Schwierigkeitsgrade.',
      meta: '2 Übungstypen · 3 Stufen',
      actionLabel: 'Spielen',
      color: 'var(--pap-control)',
      onOpen: () => nav.push({ name: 'rasterTrainer' }),
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <Hero />
      <main className="mx-auto max-w-5xl px-5">
        <section id="module" className="pb-6">
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 className="text-ink text-xl sm:text-2xl font-bold">Themengebiete</h2>
            <span className="text-sub text-sm hidden sm:block">Auswählen &amp; direkt loslegen</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <ModuleCard key={m.title} {...m} index={i} />
            ))}
          </div>
        </section>

        <StatsBar />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-bg/85 border-b border-line">
      <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-entity flex items-center justify-center font-extrabold text-white text-sm shrink-0">
            W
          </div>
          <span className="font-bold text-ink tracking-tight">WI · Lern-Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#module"
            className="text-sm font-semibold text-sub hover:text-ink transition-colors hidden sm:inline"
          >
            Themengebiete
          </a>
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 sm:pt-16 sm:pb-10">
      <p className="text-relation font-bold text-xs tracking-[0.08em] mb-3">
        WIRTSCHAFTSINFORMATIK · PROF. DR. EDUARD GERHARDT
      </p>
      <h1 className="text-ink font-extrabold leading-[1.08] text-[34px] sm:text-[46px] max-w-2xl">
        Wirtschaftsinformatik verstehen, nicht nur auswendig lernen.
      </h1>
      <p className="text-sub text-[15.5px] sm:text-base mt-4 max-w-xl leading-relaxed">
        Sieben interaktive Lernprogramme in einem Hub: Fachartikel mit Quiz, ein ERM-Trainer, ein
        Zahlensysteme-Spiel, eine PAP-Quest, ein SQL-Trainer, die Vorlesungskapitel und der
        Raster-Trainer. Ein Klick auf ein Themengebiet öffnet direkt das passende Programm — ganz
        ohne Umweg.
      </p>
      <div className="flex flex-wrap gap-3 mt-7">
        <a href="#module" className="btn-primary inline-block">
          Themengebiet wählen ↓
        </a>
      </div>
    </section>
  );
}

function ModuleCard({
  icon,
  title,
  subtitle,
  meta,
  actionLabel,
  color,
  onOpen,
  index,
}: ModuleDef & { index: number }) {
  return (
    <button
      onClick={onOpen}
      style={{ animationDelay: `${index * 45}ms` }}
      className="animate-fade-in-up card text-left p-5 flex flex-col gap-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl leading-none">{icon}</span>
        <span
          className="pill shrink-0"
          style={{ color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          {meta}
        </span>
      </div>
      <div>
        <h3 className="text-ink font-bold text-lg leading-snug">{title}</h3>
        <p className="text-sub text-[13.5px] leading-relaxed mt-1.5">{subtitle}</p>
      </div>
      <div className="mt-auto pt-1 font-bold text-sm flex items-center gap-1" style={{ color }}>
        {actionLabel} <span aria-hidden>→</span>
      </div>
    </button>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1 py-3">
      <span className="text-ink text-2xl font-extrabold">{value}</span>
      <span className="text-sub text-xs">{label}</span>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="card px-4 py-2 mb-12 grid grid-cols-2 sm:grid-cols-6 divide-x divide-line">
      <StatCard value="7" label="Programme" />
      <StatCard value={`${totalQuestions}+`} label="Quizfragen" />
      <StatCard value={String(sqlLevelCount)} label="SQL-Level" />
      <StatCard value={String(papLevelCount)} label="PAP-Level" />
      <StatCard value={String(numSystemCount)} label="Zahlensysteme" />
      <StatCard value={String(lectureChapterCount)} label="Vorlesungen" />
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sub text-xs">© {new Date().getFullYear()} WI-Lern-Hub · Wirtschaftsinformatik</p>
        <p className="text-sub text-xs">Prof. Dr. Eduard Gerhardt</p>
      </div>
    </footer>
  );
}
