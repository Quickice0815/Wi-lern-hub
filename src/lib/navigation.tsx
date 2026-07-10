import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// ============================================================
// ROUTING — Pendant zum Route-Enum / Navigator aus RootView.swift.
// Kein Seitenwechsel: der Stack wird als App-State gehalten, die
// URL bleibt gleich (Single Page App, "bleibt im Programm").
// ============================================================
export type Route =
  | { name: 'wiHub' }
  | { name: 'articleMenu' }
  | { name: 'summary'; articleId: string }
  | { name: 'quiz'; articleId: string }
  | { name: 'worked'; key: string; backToArticleId: string }
  | { name: 'ermMenu' }
  | { name: 'ermFlow'; startTutorial: boolean }
  | { name: 'numbers' }
  | { name: 'papQuest' }
  | { name: 'sqlTrainer' }
  | { name: 'lectureMenu' }
  | { name: 'lectureFlow'; chapterId: string }
  | { name: 'rasterTrainer' }
  | { name: 'strategyHub' }
  | { name: 'trueFalse' };

interface NavigatorState {
  path: Route[];
  push: (route: Route) => void;
  pop: () => void;
  popToRoot: () => void;
  replaceTop: (route: Route) => void;
}

const NavigatorContext = createContext<NavigatorState | null>(null);

export function NavigatorProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<Route[]>([]);

  const push = useCallback((route: Route) => {
    setPath((p) => [...p, route]);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const pop = useCallback(() => {
    setPath((p) => (p.length ? p.slice(0, -1) : p));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const popToRoot = useCallback(() => {
    setPath([]);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const replaceTop = useCallback((route: Route) => {
    setPath((p) => (p.length ? [...p.slice(0, -1), route] : [route]));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const value = useMemo(
    () => ({ path, push, pop, popToRoot, replaceTop }),
    [path, push, pop, popToRoot, replaceTop],
  );

  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
}

export function useNavigator(): NavigatorState {
  const ctx = useContext(NavigatorContext);
  if (!ctx) throw new Error('useNavigator must be used within a NavigatorProvider');
  return ctx;
}
