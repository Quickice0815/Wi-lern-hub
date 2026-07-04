import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../lib/auth';
import { PrimaryButton, SecondaryButton } from './ui';

export function AuthWidget() {
  const { loading, username, configured, signOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!configured || loading) return null;

  if (username) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="text-sub text-sm hidden sm:inline">
          Angemeldet als <span className="text-ink font-semibold">{username}</span>
        </span>
        <SecondaryButton onClick={() => signOut()} className="!py-2 !px-3.5 text-xs">
          Abmelden
        </SecondaryButton>
      </div>
    );
  }

  return (
    <>
      <SecondaryButton onClick={() => setModalOpen(true)} className="!py-2 !px-3.5 text-xs">
        Anmelden
      </SecondaryButton>
      {modalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function AuthModal({ onClose }: { onClose: () => void }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const err = mode === 'login' ? await signIn(username, password) : await signUp(username, password);
    setBusy(false);
    if (err) {
      setError(err);
    } else {
      onClose();
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="card w-full max-w-sm p-6 flex flex-col gap-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex gap-2">
          <button
            className={`flex-1 text-sm font-bold py-2 rounded-lg transition-colors ${
              mode === 'login' ? 'bg-entity text-white' : 'bg-panel-2 text-sub'
            }`}
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            type="button"
          >
            Anmelden
          </button>
          <button
            className={`flex-1 text-sm font-bold py-2 rounded-lg transition-colors ${
              mode === 'register' ? 'bg-entity text-white' : 'bg-panel-2 text-sub'
            }`}
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            type="button"
          >
            Registrieren
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-sub">Benutzername</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              minLength={3}
              maxLength={20}
              className="bg-panel-2 border border-line rounded-lg px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-entity"
              placeholder="z.B. max_mustermann"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-sub">Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-panel-2 border border-line rounded-lg px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-entity"
              placeholder="mindestens 6 Zeichen"
            />
          </label>

          {error && <p className="text-bad text-xs">{error}</p>}

          <PrimaryButton type="submit" disabled={busy} className="w-full justify-center mt-1">
            {busy ? 'Einen Moment…' : mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </PrimaryButton>
          <button type="button" onClick={onClose} className="text-sub text-xs hover:text-ink">
            Abbrechen
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
