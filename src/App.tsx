import { NavigatorProvider, useNavigator, type Route } from './lib/navigation';
import { AuthProvider } from './lib/auth';
import { HomePage } from './Home';
import { ArticleMenu, ArticleSummary, Quiz, WorkedExample } from './modules/articles';
import { ErmMenu, ErmFlow } from './modules/erm';
import { NumbersGame } from './modules/numbers';
import { PapQuest } from './modules/pap';
import { SqlTrainer } from './modules/sql';
import { LectureMenu, LectureFlow } from './modules/lectures';

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
    case 'lectureMenu':
      return <LectureMenu />;
    case 'lectureFlow':
      return <LectureFlow chapterId={route.chapterId} />;
  }
}

function AppShell() {
  const { path } = useNavigator();
  if (path.length === 0) return <HomePage />;
  return <RouteOutlet route={path[path.length - 1]} />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigatorProvider>
        <AppShell />
      </NavigatorProvider>
    </AuthProvider>
  );
}
