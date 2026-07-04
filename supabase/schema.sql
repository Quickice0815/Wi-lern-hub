-- WI-Lern-Hub — Supabase-Schema für Benutzerkonten + geräteübergreifenden
-- Lernfortschritt. Im Supabase-Dashboard unter "SQL Editor" einmalig
-- komplett ausführen.

-- ============================================================
-- profiles: öffentlicher Benutzername je Konto (Auth verwendet intern eine
-- synthetische E-Mail, angezeigt wird nur der Benutzername).
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================================
-- progress: ein JSON-Blob pro Nutzer und Lernmodul (artikel, erm, numbers,
-- pap, sql). Jedes Modul entscheidet selbst über die Form seines JSONs.
-- ============================================================
create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, module)
);

alter table public.progress enable row level security;

drop policy if exists "Users can view their own progress" on public.progress;
create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.progress;
create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.progress;
create policy "Users can update their own progress"
  on public.progress for update
  using (auth.uid() = user_id);

-- ============================================================
-- Bei Registrierung automatisch ein profiles-Eintrag mit dem gewählten
-- Benutzernamen anlegen (kommt aus den Signup-Metadaten mit).
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
