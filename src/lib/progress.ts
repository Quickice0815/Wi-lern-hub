import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from './auth';

// ============================================================
// Fortschritt pro Lernmodul: sofort aus localStorage (funktioniert auch
// ausgeloggt/offline), zusätzlich mit Supabase synchronisiert sobald ein
// Nutzer eingeloggt ist — dadurch ist der Fortschritt geräteübergreifend
// verfügbar. Bei Login lädt/überschreibt die Cloud-Version den lokalen
// Stand (bzw. schiebt den lokalen Stand hoch, falls in der Cloud noch
// nichts existiert).
// ============================================================

function storageKey(moduleKey: string) {
  return `lernhub:progress:${moduleKey}`;
}

function readLocal<T>(moduleKey: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey(moduleKey));
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(moduleKey: string, value: T) {
  try {
    localStorage.setItem(storageKey(moduleKey), JSON.stringify(value));
  } catch {
    // Storage kann in seltenen Fällen (privater Modus, voll) fehlschlagen — kein Problem, Cloud-Sync bleibt Fallback.
  }
}

export function useCloudProgress<T extends object>(
  moduleKey: string,
  defaultValue: T,
): [T, (updater: T | ((prev: T) => T)) => void, { syncing: boolean }] {
  const { userId } = useAuth();
  const [value, setValueState] = useState<T>(() => readLocal(moduleKey, defaultValue));
  const [syncing, setSyncing] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLoadedUser = useRef<string | null>(null);

  // Beim Login (oder Seitenladen mit bestehender Session) einmalig mit der Cloud abgleichen.
  useEffect(() => {
    const client = supabase;
    if (!client || !userId || lastLoadedUser.current === userId) return;
    lastLoadedUser.current = userId;

    let cancelled = false;
    setSyncing(true);
    client
      .from('progress')
      .select('data')
      .eq('user_id', userId)
      .eq('module', moduleKey)
      .maybeSingle()
      .then(async ({ data }) => {
        if (cancelled) return;
        if (data?.data) {
          const merged = { ...defaultValue, ...(data.data as T) };
          setValueState(merged);
          writeLocal(moduleKey, merged);
        } else {
          // Noch kein Cloud-Stand vorhanden — lokalen Stand als Startwert hochladen.
          await client
            .from('progress')
            .upsert({ user_id: userId, module: moduleKey, data: value }, { onConflict: 'user_id,module' });
        }
        setSyncing(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, moduleKey]);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const next = typeof updater === 'function' ? (updater as (p: T) => T)(prev) : updater;
        writeLocal(moduleKey, next);

        if (supabase && userId) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setSyncing(true);
            supabase!
              .from('progress')
              .upsert(
                { user_id: userId, module: moduleKey, data: next, updated_at: new Date().toISOString() },
                { onConflict: 'user_id,module' },
              )
              .then(() => setSyncing(false));
          }, 600);
        }

        return next;
      });
    },
    [moduleKey, userId],
  );

  return [value, setValue, { syncing }];
}
