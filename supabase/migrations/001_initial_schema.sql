create extension if not exists "uuid-ossp";

-- 포트폴리오
create table public.work (
  id              uuid default uuid_generate_v4() primary key,
  slug            text unique not null,
  title           text not null,
  category        text,
  thumbnail_url   text,
  thumbnail_color text default '#e5e5e5',
  blocks          jsonb default '[]'::jsonb,
  meta_title      text,
  meta_description text,
  is_published    boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now()
);

-- 블로그
create table public.blog (
  id              uuid default uuid_generate_v4() primary key,
  slug            text unique not null,
  title           text not null,
  category        text check (category in ('Story', 'Download')) default 'Story',
  thumbnail_url   text,
  blocks          jsonb default '[]'::jsonb,
  file_url        text,
  meta_title      text,
  meta_description text,
  is_published    boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now()
);

-- FAQ
create table public.faq (
  id          uuid default uuid_generate_v4() primary key,
  question    text not null,
  answer      text not null,
  sort_order  integer default 0,
  is_published boolean default false
);

-- 사이트 설정
create table public.settings (
  key   text primary key,
  value text
);

-- 초기 설정값
insert into public.settings (key, value) values
  ('company_name', '디자인스튜디오 바이너스프레드'),
  ('company_name_en', 'VINUSPREAD'),
  ('address', '서울 강서구 공항대로 227'),
  ('tel', '02-3661-1907'),
  ('email', 'contact@vinus.co.kr'),
  ('instagram', 'https://www.instagram.com/vinuspread/'),
  ('pinterest', 'https://www.pinterest.co.kr/vinuspread/'),
  ('we_intro', '웹 개발 및 디자인 전문 스튜디오');

-- RLS 활성화
alter table public.work enable row level security;
alter table public.blog enable row level security;
alter table public.faq enable row level security;
alter table public.settings enable row level security;

-- 공개 읽기 정책
create policy "public read published work" on public.work
  for select using (is_published = true);

create policy "public read published blog" on public.blog
  for select using (is_published = true);

create policy "public read published faq" on public.faq
  for select using (is_published = true);

create policy "public read settings" on public.settings
  for select using (true);

-- 인증 사용자 전체 권한
create policy "auth full access work" on public.work
  for all using (auth.role() = 'authenticated');

create policy "auth full access blog" on public.blog
  for all using (auth.role() = 'authenticated');

create policy "auth full access faq" on public.faq
  for all using (auth.role() = 'authenticated');

create policy "auth full access settings" on public.settings
  for all using (auth.role() = 'authenticated');
