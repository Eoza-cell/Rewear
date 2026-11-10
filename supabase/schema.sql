-- REWEAR: schema initial Supabase/PostgreSQL
create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check (char_length(display_name) between 1 and 80),
 city text,
 account_type text not null default 'individual' check (account_type in ('individual','shop')),
 created_at timestamptz not null default now()
);
create table if not exists public.listings (
 id uuid primary key default gen_random_uuid(),
 seller_id uuid not null references public.profiles(id) on delete cascade,
 title text not null check (char_length(title) between 3 and 120),
 description text not null check (char_length(description) between 5 and 2500),
 category text not null,
 condition text not null check (condition in ('Neuf','Très bon état','Bon état','État correct')),
 price_xof integer not null check (price_xof > 0),
 city text,
 image_paths text[] not null default '{}',
 status text not null default 'active' check (status in ('active','reserved','sold','hidden')),
 created_at timestamptz not null default now()
);
create table if not exists public.favorites (
 user_id uuid not null references public.profiles(id) on delete cascade,
 listing_id uuid not null references public.listings(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,listing_id)
);
create table if not exists public.conversations (
 id uuid primary key default gen_random_uuid(),
 listing_id uuid references public.listings(id) on delete set null,
 buyer_id uuid not null references public.profiles(id) on delete cascade,
 seller_id uuid not null references public.profiles(id) on delete cascade,
 created_at timestamptz not null default now(),
 check (buyer_id <> seller_id)
);
create table if not exists public.messages (
 id uuid primary key default gen_random_uuid(),
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 sender_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check (char_length(body) between 1 and 3000),
 created_at timestamptz not null default now()
);
create table if not exists public.subscriptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 plan_code text not null check (plan_code in ('free','plus','pro','business')),
 status text not null default 'pending' check (status in ('pending','active','expired','cancelled')),
 starts_at timestamptz, ends_at timestamptz, provider_reference text,
 created_at timestamptz not null default now()
);
create table if not exists public.reports (
 id uuid primary key default gen_random_uuid(),
 reporter_id uuid not null references public.profiles(id) on delete cascade,
 listing_id uuid references public.listings(id) on delete cascade,
 reported_user_id uuid references public.profiles(id) on delete cascade,
 reason text not null, details text,
 status text not null default 'open' check (status in ('open','reviewing','closed')),
 created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.reports enable row level security;

create policy "profiles select authenticated" on public.profiles for select to authenticated using (true);
create policy "profile insert own" on public.profiles for insert to authenticated with check (auth.uid()=id);
create policy "profile update own" on public.profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);
create policy "listings visible active or own" on public.listings for select to authenticated using (status='active' or seller_id=auth.uid());
create policy "listing insert own" on public.listings for insert to authenticated with check (seller_id=auth.uid());
create policy "listing update own" on public.listings for update to authenticated using (seller_id=auth.uid()) with check (seller_id=auth.uid());
create policy "listing delete own" on public.listings for delete to authenticated using (seller_id=auth.uid());
create policy "favorites own" on public.favorites for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "conversation participants read" on public.conversations for select to authenticated using (buyer_id=auth.uid() or seller_id=auth.uid());
create policy "buyer creates conversation" on public.conversations for insert to authenticated with check (buyer_id=auth.uid());
create policy "message participants read" on public.messages for select to authenticated using (exists(select 1 from public.conversations c where c.id=conversation_id and (c.buyer_id=auth.uid() or c.seller_id=auth.uid())));
create policy "participant sends message" on public.messages for insert to authenticated with check (sender_id=auth.uid() and exists(select 1 from public.conversations c where c.id=conversation_id and (c.buyer_id=auth.uid() or c.seller_id=auth.uid())));
create policy "subscription own read" on public.subscriptions for select to authenticated using (user_id=auth.uid());
create policy "subscription request own" on public.subscriptions for insert to authenticated with check (user_id=auth.uid());
create policy "report own insert" on public.reports for insert to authenticated with check (reporter_id=auth.uid());
create policy "report own read" on public.reports for select to authenticated using (reporter_id=auth.uid());

-- Avant production : activer les abonnements uniquement depuis un webhook de paiement vérifié.
-- Ajouter limites de débit, modération, blocage, validation d'images et tests RLS.
-- Ne jamais exposer les numéros privés ni les adresses personnelles.
