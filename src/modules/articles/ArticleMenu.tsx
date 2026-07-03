import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell, TagPill } from '../../components/ui';
import { Articles } from './data';

// Pendant zu ArticleMenuView.swift — Liste der 5 Artikel.
export function ArticleMenu() {
  const nav = useNavigator();

  return (
    <PageShell>
      <BackBar title="Artikel" onBack={() => nav.popToRoot()} />

      <div className="flex flex-col gap-1.5 mb-5">
        <h1 className="text-ink text-[26px] font-bold">Die 5 Artikel</h1>
        <p className="text-sub text-[14.5px]">
          Wähle einen Artikel, um die Zusammenfassung oder das Quiz zu starten.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {Articles.map((article, idx) => (
          <button
            key={article.id}
            onClick={() => nav.push({ name: 'summary', articleId: article.id })}
            className="relative flex items-center gap-4 rounded-[14px] bg-panel border border-line p-4 text-left transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[14px]"
              style={{ backgroundColor: article.color }}
              aria-hidden
            />
            <div
              className="flex items-center justify-center w-[38px] h-[38px] rounded-[9px] shrink-0 ml-1"
              style={{ backgroundColor: `color-mix(in srgb, ${article.color} 18%, transparent)` }}
            >
              <span className="text-[16px] font-bold" style={{ color: article.color }}>
                {idx + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <TagPill text={article.tag} color={article.color} />
                {article.hasWorked && (
                  <span className="text-warn text-[10.5px] font-semibold">★ mit Anwendungstraining</span>
                )}
              </div>
              <h3 className="text-ink text-[16px] font-bold leading-snug">{article.title}</h3>
              <p className="text-sub text-[12.5px] leading-snug">{article.subtitle}</p>
            </div>
            <span className="text-sub text-[12.5px] font-semibold shrink-0 hidden sm:block">
              {article.questions.length} Fragen →
            </span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}
