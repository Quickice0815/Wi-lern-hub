import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, PageShell } from '../../components/ui';
import { LECTURE_CHAPTERS } from './data';
import type { LecturesProgress } from './types';

// Übersicht aller Vorlesungskapitel — Einstiegspunkt des Moduls.
export function LectureMenu() {
  const nav = useNavigator();
  const [progress] = useCloudProgress<LecturesProgress>('lectures', {});

  return (
    <PageShell>
      <BackBar title="Vorlesungen" onBack={() => nav.popToRoot()} />

      <div className="flex flex-col gap-1.5 mb-5">
        <h1 className="text-ink text-[26px] font-bold">Vorlesungen</h1>
        <p className="text-sub text-[14.5px]">
          Die Kapitel der Vorlesung „Einführung in die Wirtschaftsinformatik". Jedes Kapitel: kurzes
          Tutorial, dann Übungen in drei Schwierigkeitsstufen.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {LECTURE_CHAPTERS.map((ch) => {
          const chProg = progress[ch.id];
          const doneTiers = chProg
            ? (['easy', 'advanced', 'pro'] as const).filter((d) => chProg[d]).length
            : 0;
          return (
            <button
              key={ch.id}
              onClick={() => nav.push({ name: 'lectureFlow', chapterId: ch.id })}
              className="relative flex items-center gap-4 rounded-[14px] bg-panel border border-line p-4 text-left transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[14px]"
                style={{ backgroundColor: ch.color }}
                aria-hidden
              />
              <div
                className="flex items-center justify-center w-[38px] h-[38px] rounded-[9px] shrink-0 ml-1 text-[18px]"
                style={{ backgroundColor: `color-mix(in srgb, ${ch.color} 18%, transparent)` }}
              >
                {ch.icon}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span
                  className="text-[10.5px] font-bold uppercase tracking-wide"
                  style={{ color: ch.color }}
                >
                  Vorlesung {ch.number}
                </span>
                <h3 className="text-ink text-[16px] font-bold leading-snug">{ch.title}</h3>
                <p className="text-sub text-[12.5px] leading-snug">{ch.subtitle}</p>
              </div>
              <span className="text-sub text-[12.5px] font-semibold shrink-0 hidden sm:block">
                {doneTiers > 0 ? `${doneTiers}/3 Stufen ✓` : 'Starten →'}
              </span>
            </button>
          );
        })}
      </div>
    </PageShell>
  );
}
