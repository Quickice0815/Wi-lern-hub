import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';

// TODO(agent): ersetzt durch vollständige Portierung von SqlTrainerData.swift,
// SqlLevelsData.swift, SqlLevelMapView.swift, SqlModeAndTutorialView.swift,
// SqlTrainerGameView.swift, SqlBlockAndFreitextView.swift, SqlScreenshotView.swift.

export function SqlTrainer() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="SQL-Trainer" onBack={() => nav.popToRoot()} />
      <p className="text-sub">Wird geladen…</p>
    </PageShell>
  );
}
