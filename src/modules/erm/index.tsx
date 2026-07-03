import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';

// TODO(agent): ersetzt durch vollständige Portierung von ERMData.swift,
// ERMMenuView.swift, ERMTutorialView.swift, ERMCanvasView.swift,
// ERMClassifyView.swift, ERMResultView.swift.

export function ErmMenu() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="ERM-Trainer" onBack={() => nav.popToRoot()} />
      <p className="text-sub">Wird geladen…</p>
    </PageShell>
  );
}

export function ErmFlow({ startWithTutorial }: { startWithTutorial: boolean }) {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="ERM-Trainer" onBack={() => nav.pop()} />
      <p className="text-sub">Start mit Tutorial: {String(startWithTutorial)}</p>
    </PageShell>
  );
}
