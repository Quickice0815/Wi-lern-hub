import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';

// TODO(agent): ersetzt durch vollständige Portierung von NumbersData.swift,
// NumbersGameView.swift, NumQuizView.swift.

export function NumbersGame() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="Historische Zahlensysteme" onBack={() => nav.popToRoot()} />
      <p className="text-sub">Wird geladen…</p>
    </PageShell>
  );
}
