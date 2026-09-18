-- Lewy AI — core schema
-- Run in Supabase SQL editor, or via `supabase db push`.

create extension if not exists "uuid-ossp";

create table if not exists workspaces (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete cascade unique,
  business_type text,
  brand_voice text,
  has_location boolean,
  location_name text,
  address text,
  description text,
  knowledge_answers jsonb default '{}',
  onboarding_completed_at timestamptz,
  ai_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text,
  phone text,
  email text,
  channels text[],
  lifetime_revenue numeric default 0,
  last_interaction_at timestamptz,
  notes text,
  created_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  channel text not null,
  status text default 'ai_handling', -- ai_handling | human_takeover_required | human_active | resolved
  escalation_reason text, -- complaint | payment_discussion | price_negotiation | other
  opportunity_value numeric,
  owner text default 'ai', -- ai | human
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender text not null, -- customer | ai | human
  body text,
  media_url text,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  product_service text,
  intent text,
  estimated_value numeric,
  lead_score int,
  stage text default 'new', -- new | qualified | interested | negotiating | won | lost
  assigned_agent uuid references auth.users(id),
  next_action text,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text not null,
  description text,
  price numeric,
  sku text,
  variations jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text not null,
  type text, -- image | video | pdf | catalogue | price_list | size_chart
  storage_path text,
  created_at timestamptz default now()
);

create table if not exists channels (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  type text not null, -- whatsapp | instagram | gmail | messenger | telegram | website_chat | google_calendar
  status text default 'disconnected', -- connected | disconnected | needs_attention
  credentials jsonb,
  connected_at timestamptz
);

create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  title text,
  starts_at timestamptz,
  ends_at timestamptz,
  status text default 'confirmed', -- confirmed | rescheduled | cancelled
  google_event_id text
);

create table if not exists followups (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  due_at timestamptz,
  owner text default 'ai', -- ai | human
  status text default 'scheduled' -- scheduled | due | overdue | completed | failed
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  lead_id uuid references leads(id),
  invoice_amount numeric,
  payment_status text, -- paid | no_payment_made
  confirmed_by uuid references auth.users(id),
  confirmed_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  type text, -- human_needed | high_value_lead | overdue_followup | channel_issue | appointment_upcoming | payment_confirmation_required
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists audit_log (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  actor text, -- ai | human
  action text,
  target_type text,
  target_id uuid,
  created_at timestamptz default now()
);

-- Row Level Security: each owner only sees their own workspace and its children.
alter table workspaces enable row level security;
create policy "owner reads own workspace" on workspaces for select using (auth.uid() = owner_id);
create policy "owner writes own workspace" on workspaces for all using (auth.uid() = owner_id);

alter table customers enable row level security;
create policy "owner scoped customers" on customers for all using (
  workspace_id in (select id from workspaces where owner_id = auth.uid())
);

alter table conversations enable row level security;
create policy "owner scoped conversations" on conversations for all using (
  workspace_id in (select id from workspaces where owner_id = auth.uid())
);

alter table leads enable row level security;
create policy "owner scoped leads" on leads for all using (
  workspace_id in (select id from workspaces where owner_id = auth.uid())
);

alter table products enable row level security;
create policy "owner scoped products" on products for all using (
  workspace_id in (select id from workspaces where owner_id = auth.uid())
);

alter table transactions enable row level security;
create policy "owner scoped transactions" on transactions for all using (
  workspace_id in (select id from workspaces where owner_id = auth.uid())
);
