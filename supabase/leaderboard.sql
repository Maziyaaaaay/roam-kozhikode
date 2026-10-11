-- Shared weekend board. Run once in your Supabase project's SQL editor (after multiplayer.sql).
-- Scores are written and read only through the two functions below; the table itself has no client policies.
create table if not exists public.roam_scores (
 id uuid not null references auth.users on delete cascade,
 week text not null check (week ~ '^\d{4}-\d{2}-\d{2}$'),
 name text not null check (length(name) between 1 and 24),
 points integer not null check (points between 0 and 10000),
 updated_at timestamptz not null default now(),
 primary key (id, week)
);
alter table public.roam_scores enable row level security;

-- Save the signed-in player's weekly points. Keeps the higher value so two devices on one account never lower a score.
create or replace function public.roam_submit_score(p_week text, p_points integer)
returns void language plpgsql security definer set search_path=public as $$
declare player_name text;
begin
 if auth.uid() is null then raise exception 'Sign in to post a score'; end if;
 select coalesce(nullif(trim(raw_user_meta_data->>'display_name'),''),'Traveller') into player_name from auth.users where id=auth.uid();
 insert into roam_scores(id,week,name,points) values(auth.uid(),p_week,left(player_name,24),greatest(0,least(p_points,10000)))
 on conflict (id,week) do update set points=greatest(roam_scores.points,excluded.points),name=excluded.name,updated_at=now();
end $$;

-- Top players for a week. Returns names and points only; user ids are never exposed.
create or replace function public.roam_weekly_board(p_week text)
returns table(name text, points integer, is_me boolean)
language sql security definer set search_path=public as $$
 select s.name,s.points,s.id=auth.uid() from roam_scores s where s.week=p_week order by s.points desc,s.updated_at asc limit 25;
$$;

revoke all on function public.roam_submit_score(text,integer),public.roam_weekly_board(text) from public,anon;
grant execute on function public.roam_submit_score(text,integer),public.roam_weekly_board(text) to authenticated;
