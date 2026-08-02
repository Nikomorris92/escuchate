-- Run this in the Supabase SQL editor

-- User profiles
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  quiz_completed boolean default false,
  area_order text[] default '{}',
  current_level integer default 0,
  total_score integer default 0,
  advanced_unlocked boolean default false,
  created_at timestamptz default now()
);

-- Level progress (one row per user per area, immutable once written)
create table public.level_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  area text not null,
  reflection_text text not null,
  word_count integer not null,
  score integer not null,
  completed_at timestamptz default now(),
  unique (user_id, area)
);

-- RLS: each user can only see and write their own data
alter table public.user_profiles enable row level security;
alter table public.level_progress enable row level security;

create policy "Users see own profile" on public.user_profiles
  for all using (auth.uid() = id);

create policy "Users see own progress" on public.level_progress
  for all using (auth.uid() = user_id);

-- Function to increment score atomically
create or replace function increment_score(user_id_param uuid, amount integer)
returns void language plpgsql security definer as $$
declare
  new_score integer;
begin
  update public.user_profiles
  set total_score = total_score + amount
  where id = user_id_param
  returning total_score into new_score;

  -- Unlock advanced journey at 300 pts
  if new_score >= 300 then
    update public.user_profiles
    set advanced_unlocked = true
    where id = user_id_param;
  end if;
end;
$$;
