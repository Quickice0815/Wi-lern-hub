import { useNavigator } from '../../lib/navigation';
import { BackBar, PageShell } from '../../components/ui';

// TODO(agent): ersetzt durch vollständige Portierung von PapQuestData.swift,
// PapQuestView.swift, PapOrderChallengeView.swift, PapMatchChallengeView.swift,
// PapShapeIcon.swift, PapFeedbackControls.swift.

export function PapQuest() {
  const nav = useNavigator();
  return (
    <PageShell>
      <BackBar title="PAP-Quest" onBack={() => nav.popToRoot()} />
      <p className="text-sub">Wird geladen…</p>
    </PageShell>
  );
}
