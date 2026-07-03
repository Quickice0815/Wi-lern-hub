import { NavigatorProvider, useNavigator, type Route } from './lib/navigation';
import { HomePage } from './Home';
import { ArticleMenu, ArticleSummary, Quiz, WorkedExample } from './modules/articles';
import { ErmMenu, ErmFlow } from './modules/erm';
import { NumbersGame } from './modules/numbers';
import { PapQuest } from './modules/pap';
import { SqlTrainer } from './modules/sql';

function RouteOutlet({ route }: { route: Route }) {
  switch (route.name) {
    case 'articleMenu':
      return <ArticleMenu />;
    case 'summary':
      return <ArticleSummary articleId={route.articleId} />;
    case 'quiz':
      return <Quiz articleId={route.articleId} />;
    case 'worked':
      return <WorkedExample exampleKey={route.key} backToArticleId={route.backToArticleId} />;
    case 'ermMenu':
      return <ErmMenu />;
    case 'ermFlow':
      return <ErmFlow startWithTutorial={route.startTutorial} />;
    case 'numbers':
      return <NumbersGame />;
    case 'papQuest':
      return <PapQuest />;
    case 'sqlTrainer':
      return <SqlTrainer />;
  }
}

function AppShell() {
  const { path } = useNavigator();
  if (path.length === 0) return <HomePage />;
  return <RouteOutlet route={path[path.length - 1]} />;
}

export default function App() {
  return (
    <NavigatorProvider>
      <AppShell />
    </NavigatorProvider>
  );
}
