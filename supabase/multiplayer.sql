-- Run once in your Supabase project's SQL editor. No service key belongs in the browser.
create table public.roam_presence (
 id uuid primary key references auth.users on delete cascade,
 name text not null check (length(name) between 1 and 24),
 lat double precision not null check(lat between -90 and 90),
 lng double precision not null check(lng between -180 and 180),
 updated_at timestamptz not null default now() check(updated_at <= now() + interval '5 seconds')
);
create table public.roam_chats (
 id uuid primary key default gen_random_uuid(),
 sender uuid not null references auth.users on delete cascade,
 recipient uuid not null references auth.users on delete cascade,
 status text not null default 'pending' check(status in ('pending','accepted','declined','ended')),
 created_at timestamptz not null default now(), check(sender <> recipient)
);
create table public.roam_messages (
 id bigint generated always as identity primary key,
 chat_id uuid not null references public.roam_chats on delete cascade,
 sender uuid not null references auth.users on delete cascade,
 body text not null check(length(body) between 1 and 500),
 created_at timestamptz not null default now()
);
alter table public.roam_presence enable row level security;
alter table public.roam_chats enable row level security;
alter table public.roam_messages enable row level security;
-- Raw coordinates are never readable through the client API.
create policy own_presence on public.roam_presence for all to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy own_chats on public.roam_chats for select to authenticated using(auth.uid() in (sender,recipient));
create policy own_messages on public.roam_messages for select to authenticated using(exists(select 1 from public.roam_chats c where c.id=chat_id and auth.uid() in (c.sender,c.recipient)));
create or replace function public.roam_nearby()
returns table(id uuid,name text,meters double precision,east double precision,north double precision)
language sql security definer set search_path=public as $$
 select p.id,p.name,sqrt(d.e*d.e+d.n*d.n),round(d.e/5)*5,round(d.n/5)*5
 from roam_presence p join roam_presence me on me.id=auth.uid()
 cross join lateral(select (p.lng-me.lng)*111320*cos(radians(me.lat)) e,(p.lat-me.lat)*111320 n) d
 where p.id<>auth.uid() and p.updated_at>now()-interval '30 seconds' and me.updated_at>now()-interval '30 seconds' and d.e*d.e+d.n*d.n<=6400 limit 30;
$$;
create or replace function public.roam_invite(target uuid) returns uuid
language plpgsql security definer set search_path=public as $$
declare result uuid;
begin
 if not exists(select 1 from roam_nearby() where id=target) then raise exception 'Player is no longer nearby'; end if;
 if exists(select 1 from roam_chats where sender=auth.uid() and created_at>now()-interval '5 seconds') then raise exception 'Wait before inviting again'; end if;
 select id into result from roam_chats where status in ('pending','accepted') and ((sender=auth.uid() and recipient=target) or (recipient=auth.uid() and sender=target)) and created_at>now()-interval '10 minutes' limit 1;
 if result is null then insert into roam_chats(sender,recipient) values(auth.uid(),target) returning id into result; end if;
 return result;
end $$;
create or replace function public.roam_reply(chat uuid,answer text) returns void
language plpgsql security definer set search_path=public as $$
begin
 if answer not in ('accepted','declined','ended') then raise exception 'Invalid response'; end if;
 update roam_chats set status=answer where id=chat and ((recipient=auth.uid() and status='pending' and answer in ('accepted','declined')) or (auth.uid() in(sender,recipient) and answer='ended'));
end $$;
create or replace function public.roam_send(chat uuid,message text) returns void
language plpgsql security definer set search_path=public as $$
declare other uuid;
begin
 select case when sender=auth.uid() then recipient else sender end into other from roam_chats where id=chat and status='accepted' and auth.uid() in(sender,recipient);
 if other is null or not exists(select 1 from roam_nearby() where id=other) then raise exception 'Chat requires both players nearby and visible'; end if;
 if exists(select 1 from roam_messages where sender=auth.uid() and created_at>now()-interval '1 second') then raise exception 'Give your message a moment'; end if;
 insert into roam_messages(chat_id,sender,body) values(chat,auth.uid(),trim(message));
end $$;
revoke all on function public.roam_nearby(),public.roam_invite(uuid),public.roam_reply(uuid,text),public.roam_send(uuid,text) from public,anon;
grant execute on function public.roam_nearby(),public.roam_invite(uuid),public.roam_reply(uuid,text),public.roam_send(uuid,text) to authenticated;
