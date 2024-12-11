-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text,
    email text,
    primary key (id)
);

-- Create qr_codes table
create table public.qr_codes (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users on delete cascade not null,
    type text check (type in ('vcard', 'dynamic')) not null,
    content text not null,
    title text not null,
    views integer default 0 not null
);

-- Create function to increment views
create or replace function public.increment_qr_views(qr_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.qr_codes
  set views = views + 1,
      updated_at = now()
  where id = qr_id;
end;
$$;

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.qr_codes enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Users can view own QR codes"
  on public.qr_codes for select
  using ( auth.uid() = user_id );

create policy "Users can insert own QR codes"
  on public.qr_codes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own QR codes"
  on public.qr_codes for update
  using ( auth.uid() = user_id );

create policy "Users can delete own QR codes"
  on public.qr_codes for delete
  using ( auth.uid() = user_id );

-- Create indexes
create index qr_codes_user_id_idx on public.qr_codes(user_id);
create index qr_codes_type_idx on public.qr_codes(type);