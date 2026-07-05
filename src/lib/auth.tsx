import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { isSupabaseConfigured, isValidUsername, supabase, usernameToEmail } from './supabase';

interface AuthState {
  loading: boolean;
  userId: string | null;
  username: string | null;
  configured: boolean;
  signUp: (username: string, password: string) => Promise<string | null>;
  signIn: (username: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function friendlyAuthError(message: string): string {
  if (message.includes('already registered') || message.includes('already exists')) {
    return 'Dieser Benutzername ist schon vergeben. Bitte wähle einen anderen.';
  }
  if (message.includes('Invalid login credentials')) {
    return 'Benutzername oder Passwort ist falsch.';
  }
  if (message.includes('Password should be at least')) {
    return 'Das Passwort muss mindestens 6 Zeichen lang sein.';
  }
  return 'Das hat leider nicht geklappt. Bitte versuch es erneut.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    async function loadProfile(uid: string) {
      const { data } = await supabase!.from('profiles').select('username').eq('id', uid).single();
      setUsername(data?.username ?? null);
    }

    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user ?? null;
      setUserId(user?.id ?? null);
      if (user) loadProfile(user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setUserId(user?.id ?? null);
      if (user) {
        loadProfile(user.id);
      } else {
        setUsername(null);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      loading,
      userId,
      username,
      configured: isSupabaseConfigured,
      async signUp(rawUsername, password) {
        if (!supabase) return 'Anmeldung ist auf dieser Seite nicht eingerichtet.';
        const uname = rawUsername.trim();
        if (!isValidUsername(uname)) {
          return 'Benutzername: 3–20 Zeichen, nur Buchstaben, Zahlen und _.';
        }
        const { data: existing } = await supabase
          .from('profiles')
          .select('username')
          .ilike('username', uname)
          .maybeSingle();
        if (existing) return 'Dieser Benutzername ist schon vergeben. Bitte wähle einen anderen.';

        const { error } = await supabase.auth.signUp({
          email: usernameToEmail(uname),
          password,
          options: { data: { username: uname } },
        });
        return error ? friendlyAuthError(error.message) : null;
      },
      async signIn(rawUsername, password) {
        if (!supabase) return 'Anmeldung ist auf dieser Seite nicht eingerichtet.';
        const uname = rawUsername.trim();
        const { error } = await supabase.auth.signInWithPassword({
          email: usernameToEmail(uname),
          password,
        });
        return error ? friendlyAuthError(error.message) : null;
      },
      async signOut() {
        await supabase?.auth.signOut();
      },
    }),
    [loading, userId, username],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
