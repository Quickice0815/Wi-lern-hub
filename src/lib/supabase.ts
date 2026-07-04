import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

// Login/Registrierung läuft nur mit Benutzername + Passwort. Supabase Auth
// braucht intern trotzdem eine E-Mail-Adresse, die Nutzer bekommen davon
// nichts mit — wir konstruieren eine synthetische, nie versendete Adresse.
export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@users.wi-lern-hub.local`;
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username.trim());
}
