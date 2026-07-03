import { useEffect } from 'react';
import { useNavigator } from '../../lib/navigation';
import { BackBar, Card, PageShell, PrimaryButton, SecondaryButton } from '../../components/ui';
import { getArticle, Summaries, type SummaryBlock } from './data';
import { SummaryVisualView } from './visuals';

// Pendant zu ArticleSummaryView.swift — Lesezusammenfassung vor dem Quiz.
export function ArticleSummary({ articleId }: { articleId: string }) {
  const nav = useNavigator();
  const article = getArticle(articleId);
  const summary = article ? Summaries[article.id] : undefined;

  // Kein Zusammenfassungs-Inhalt vorhanden → direkt zum Quiz springen.
  useEffect(() => {
    if (article && !summary) {
      nav.replaceTop({ name: 'quiz', articleId: article.id });
    }
  }, [article, summary, nav]);

  if (!article) {
    return (
      <PageShell>
        <BackBar title="Zusammenfassung" onBack={() => nav.pop()} />
        <p className="text-sub">Artikel nicht gefunden.</p>
      </PageShell>
    );
  }

  if (!summary) {
    return null;
  }

  const goToQuiz = () => nav.replaceTop({ name: 'quiz', articleId: article.id });
  const goToOtherArticles = () => {
    nav.popToRoot();
    nav.push({ name: 'articleMenu' });
  };

  return (
    <PageShell>
      <BackBar title={article.tag} onBack={() => nav.pop()} />

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold" style={{ color: article.color }}>
              {article.tag.toUpperCase()} · {summary.title.toUpperCase()}
            </span>
            <h1 className="text-ink text-[23px] font-bold leading-tight">{article.title}</h1>
          </div>
          <PrimaryButton color={article.color} onClick={goToQuiz} className="shrink-0">
            Direkt zum Quiz →
          </PrimaryButton>
        </div>

        <p className="text-sub text-[12.5px]">
          Kurze Auffrischung mit Grafiken, damit die Quizfragen leichter fallen. Schon fit? Überspring sie oben.
        </p>

        <div className="flex flex-col gap-4">
          {summary.blocks.map((block, i) => (
            <BlockView key={i} block={block} accent={article.color} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
          <SecondaryButton onClick={goToOtherArticles}>← Andere Artikel</SecondaryButton>
          <PrimaryButton color="var(--good)" textColor="#06210f" onClick={goToQuiz}>
            Verstanden — Quiz starten →
          </PrimaryButton>
        </div>
      </div>
    </PageShell>
  );
}

function BlockView({ block, accent }: { block: SummaryBlock; accent: string }) {
  switch (block.kind) {
    case 'lead':
      return (
        <div
          className="relative rounded-lg p-3.5 text-ink text-[15px] leading-relaxed"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)` }}
        >
          <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg" style={{ backgroundColor: accent }} aria-hidden />
          <span className="pl-2 block">{block.text}</span>
        </div>
      );
    case 'text':
      return (
        <div className="flex flex-col gap-1.5">
          {block.heading && <h3 className="text-ink text-[15.5px] font-bold">{block.heading}</h3>}
          <p className="text-sub text-[14px] leading-relaxed whitespace-pre-line">{block.body}</p>
        </div>
      );
    case 'visual':
      return <SummaryVisualView kind={block.visual} accent={accent} />;
    case 'keypoints':
      return (
        <Card className="p-4" accent={`color-mix(in srgb, ${accent} 50%, transparent)`}>
          <div className="flex flex-col gap-2.5">
            <span className="text-[12.5px] font-bold" style={{ color: accent }}>
              ★ {block.title}
            </span>
            <div className="flex flex-col gap-2">
              {block.points.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[14px] font-black leading-[1.4]" style={{ color: accent }}>
                    ›
                  </span>
                  <span className="text-ink text-[13.5px] leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      );
    default:
      return null;
  }
}
