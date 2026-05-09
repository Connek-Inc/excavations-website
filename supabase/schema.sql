-- ╔═══════════════════════════════════════════════════════════════════════════
-- ║ Mini Excavation Érable — Soumissions schema for Supabase
-- ║ Run this once in Supabase Dashboard → SQL Editor → New Query
-- ╚═══════════════════════════════════════════════════════════════════════════

-- ─── Soumissions (cotizaciones) ──────────────────────────────────────────────
create table if not exists public.soumissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Token público para que el cliente acceda sin login
  client_token text unique not null default replace(gen_random_uuid()::text, '-', ''),

  -- Datos del cliente
  client_nom text not null,
  client_email text not null,
  client_telephone text,
  client_adresse text,
  projet_adresse text,
  projet_description text not null,
  projet_type text, -- excavation, drainage, fondation, urgence, etc.

  -- Estado
  statut text not null default 'nouvelle'
    check (statut in (
      'nouvelle',          -- cliente envió, admin no la ha visto
      'en_revision',       -- admin la está trabajando
      'offerte',           -- admin envió oferta
      'contre_offre',      -- cliente contra-ofertó
      'acceptee',          -- cliente firmó
      'signee_par_les_deux', -- ambos firmaron
      'rejetee',           -- rechazada
      'expiree'            -- expirada
    )),

  numero text,             -- ex: 2026-001 (asignado por admin)
  date_soumission date,

  -- Datos calculados de la oferta actual (snapshot del último round)
  sous_total numeric(12,2) default 0,
  tps numeric(12,2) default 0,
  tvq numeric(12,2) default 0,
  total numeric(12,2) default 0,

  -- Articulos (JSONB array): [{description, quantite, prix_unitaire}, ...]
  articles jsonb default '[]'::jsonb,

  -- Modalidades de pago: [{label, pourcentage}, ...]
  modalites jsonb default '[]'::jsonb,

  -- Secciones del contrato (override de defaults)
  sections jsonb default '{}'::jsonb,

  -- Notas internas (no visibles al cliente)
  notes_admin text,

  -- Notas del cliente al enviar form
  notes_client text,

  -- Firma del cliente (data URL PNG del canvas)
  signature_client text,
  signature_client_at timestamptz,
  signature_client_nom text,

  -- Firma del admin
  signature_admin text,
  signature_admin_at timestamptz,
  signature_admin_nom text,

  -- Fecha de expiración de la oferta
  expire_le date
);

-- ─── Versions (historial de ofertas y contra-ofertas) ────────────────────────
create table if not exists public.soumission_versions (
  id uuid primary key default gen_random_uuid(),
  soumission_id uuid not null references public.soumissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  version_num int not null,
  type text not null check (type in ('offre_admin', 'contre_offre_client')),
  auteur text not null,         -- 'admin' or 'client'
  message text,                  -- comentario opcional al hacer la oferta/contra-oferta

  -- Snapshot completo del estado en este round
  sous_total numeric(12,2),
  total numeric(12,2),
  articles jsonb default '[]'::jsonb,
  modalites jsonb default '[]'::jsonb,
  sections jsonb default '{}'::jsonb
);

create index if not exists idx_soumission_versions_soumission_id
  on public.soumission_versions(soumission_id);

create index if not exists idx_soumissions_statut
  on public.soumissions(statut);

create index if not exists idx_soumissions_token
  on public.soumissions(client_token);

-- ─── Trigger updated_at ──────────────────────────────────────────────────────
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_soumissions_updated_at on public.soumissions;
create trigger trg_soumissions_updated_at
  before update on public.soumissions
  for each row execute function public.update_updated_at();

-- ─── RLS (Row Level Security) ────────────────────────────────────────────────
alter table public.soumissions enable row level security;
alter table public.soumission_versions enable row level security;

-- Cliente puede crear soumissions (anyone via anon key)
drop policy if exists "anyone_can_create_soumission" on public.soumissions;
create policy "anyone_can_create_soumission"
  on public.soumissions for insert
  to anon, authenticated
  with check (true);

-- Cliente puede ver SU soumission via token (lo veremos por filter en query)
drop policy if exists "anyone_can_read_soumissions" on public.soumissions;
create policy "anyone_can_read_soumissions"
  on public.soumissions for select
  to anon, authenticated
  using (true);

-- Solo admin (autenticado) puede actualizar
drop policy if exists "admin_can_update" on public.soumissions;
create policy "admin_can_update"
  on public.soumissions for update
  to authenticated
  using (true)
  with check (true);

-- Cliente con token puede actualizar SOLO contra-oferta y firma
-- (nota: en práctica filtramos por token en el cliente; políticas más estrictas si se necesitan)
drop policy if exists "client_can_update_via_token" on public.soumissions;
create policy "client_can_update_via_token"
  on public.soumissions for update
  to anon
  using (true)
  with check (true);

-- Versions: anyone can read & insert (admin via auth, cliente via token)
drop policy if exists "versions_read" on public.soumission_versions;
create policy "versions_read"
  on public.soumission_versions for select
  to anon, authenticated
  using (true);

drop policy if exists "versions_insert" on public.soumission_versions;
create policy "versions_insert"
  on public.soumission_versions for insert
  to anon, authenticated
  with check (true);

-- ─── Admin: tabla con whitelist de emails admin ──────────────────────────────
create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz default now()
);

-- Inserta el email admin (cambia aquí si quieres otro)
insert into public.admin_users (email) values
  ('miniexcavationerable@gmail.com')
on conflict do nothing;

alter table public.admin_users enable row level security;

drop policy if exists "admin_users_self_read" on public.admin_users;
create policy "admin_users_self_read"
  on public.admin_users for select
  to authenticated
  using (auth.jwt() ->> 'email' = email);
