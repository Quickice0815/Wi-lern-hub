import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';

// TODO(agent): ersetzt durch vollständige Portierung von
// ArticleData.swift, ArticleMenuView.swift, ArticleSummaryView.swift,
// SummaryData.swift, SummaryVisuals.swift, QuizView.swift,
// WorkedExampleData.swift, WorkedExampleView.swift.

export function ArticleMenu() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="Die 5 Artikel" onBack={() => nav.popToRoot()} />
      <p className="text-sub">Wird geladen…</p>
    </PageShell>
  );
}

export function ArticleSummary({ articleId }: { articleId: string }) {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="Zusammenfassung" onBack={() => nav.pop()} />
      <p className="text-sub">Artikel: {articleId}</p>
    </PageShell>
  );
}

export function Quiz({ articleId }: { articleId: string }) {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="Quiz" onBack={() => nav.pop()} />
      <p className="text-sub">Artikel: {articleId}</p>
    </PageShell>
  );
}

export function WorkedExample({
  exampleKey,
  backToArticleId,
}: {
  exampleKey: string;
  backToArticleId: string;
}) {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="Anwendungsaufgabe" onBack={() => nav.pop()} />
      <p className="text-sub">
        {exampleKey} / zurück zu {backToArticleId}
      </p>
    </PageShell>
  );
}
