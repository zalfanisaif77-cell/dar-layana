-- Dar Layana V2. Run once in a fresh Supabase SQL Editor project.
create extension if not exists pgcrypto;
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.admin_users where user_id = (select auth.uid())); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table public.rooms (
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(name) between 1 and 160),
 description text not null default '',
 image_url text not null default '',
 price_from numeric(12,3) check(price_from is null or price_from>=0),
 capacity integer check(capacity is null or capacity>=1),
 category text,
 sort_order integer not null default 10,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.services (like public.rooms including all);

create table public.booking_requests (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 guest_name text not null check(char_length(guest_name) between 1 and 120),
 email text not null check(char_length(email) between 3 and 200),
 phone text not null check(char_length(phone) between 2 and 40),
 offer_name text not null check(char_length(offer_name) between 1 and 160),
 arrival_date date,
 departure_date date,
 guests integer not null default 2 check(guests between 1 and 30),
 message text check(char_length(message)<=3000),
 status text not null default 'pending' check(status in ('pending','contacted','confirmed','cancelled')),
 admin_notes text,
 constraint valid_stay check (
  (arrival_date is null and departure_date is null)
  or (arrival_date is not null and departure_date is not null and departure_date>arrival_date)
 )
);
create index booking_requests_date_idx on public.booking_requests(created_at desc);
create table public.contact_messages (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check(char_length(name) between 1 and 120),
 email text not null check(char_length(email) between 3 and 200),
 message text not null check(char_length(message) between 1 and 3000),
 status text not null default 'new' check(status in ('new','handled'))
);
alter table public.admin_users enable row level security;
alter table public.rooms enable row level security;
alter table public.services enable row level security;
alter table public.booking_requests enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public sees published rooms" on public.rooms for select to anon,authenticated
using (active or (select public.is_admin()));
create policy "Admins manage rooms" on public.rooms for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Public sees published services" on public.services for select to anon,authenticated
using (active or (select public.is_admin()));
create policy "Admins manage services" on public.services for all to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Public submits pending requests" on public.booking_requests for insert to anon,authenticated
with check (status='pending' and admin_notes is null and created_at between now()-interval '5 minutes' and now()+interval '5 minutes');
create policy "Admins see booking requests" on public.booking_requests for select to authenticated
using ((select public.is_admin()));
create policy "Admins update booking requests" on public.booking_requests for update to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Public submits contact messages" on public.contact_messages for insert to anon,authenticated
with check(status='new' and created_at between now()-interval '5 minutes' and now()+interval '5 minutes');
create policy "Admins read messages" on public.contact_messages for select to authenticated
using ((select public.is_admin()));
create policy "Admins update messages" on public.contact_messages for update to authenticated
using ((select public.is_admin())) with check ((select public.is_admin()));

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('dar-layana-images','dar-layana-images',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
create policy "Public sees Dar Layana imagery" on storage.objects for select to anon,authenticated
using(bucket_id='dar-layana-images');
create policy "Admin adds Dar Layana imagery" on storage.objects for insert to authenticated
with check(bucket_id='dar-layana-images' and (select public.is_admin()));
create policy "Admin edits Dar Layana imagery" on storage.objects for update to authenticated
using(bucket_id='dar-layana-images' and (select public.is_admin()))
with check(bucket_id='dar-layana-images' and (select public.is_admin()));
create policy "Admin removes Dar Layana imagery" on storage.objects for delete to authenticated
using(bucket_id='dar-layana-images' and (select public.is_admin()));

-- Offer data is illustrative and can be replaced from the back-office.
insert into public.rooms (name,description,image_url,category,sort_order) values
 ('Séjour à Dar Layana','Un séjour intimiste à Hammamet, à organiser sur demande.','https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80','Séjour',1),
 ('Espaces de repos','Différentes possibilités d’hébergement à découvrir auprès de l’équipe.','https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80','Séjour',2);
insert into public.services (name,description,image_url,category,sort_order) values
 ('Séjours & détente','Une parenthèse pour ralentir et partager des moments de qualité.','https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80','Séjour',1),
 ('La table de Dar Layana','Des expériences culinaires à organiser sur demande.','https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80','Gastronomie',2),
 ('Événements privés','Un cadre pour vos célébrations et moments importants.','https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80','Événement',3),
 ('Rencontres & corporate','Imaginer une rencontre professionnelle différente.','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80','Entreprise',4);
