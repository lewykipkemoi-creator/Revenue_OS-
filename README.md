# Lewy AI — Revenue OS

Revenue-focused AI customer-response and sales operations dashboard.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase (auth + Postgres + RLS)

## Local setup
1. `npm install`
2. `cp .env.local.example .env.local` and fill in your Supabase URL/anon key and Gemini key
3. Run `supabase/schema.sql` in the Supabase SQL editor to create tables + RLS policies
4. `npm run dev`

## What's built
- Homepage, auth (login/signup), full onboarding flow (Lewy intro → business
  knowledge → test chat → connect → terms → go-live)
- Dashboard shell (sidebar, Activate/Deactivate toggle, persistent handover banner)
- All 12 dashboard sections from the spec, wired with layout + mock data:
  Overview, Human Takeover, Conversations, Customers, Leads, Products & Media,
  Revenue, Follow-ups, Calendar, Channels, Lewy AI Controls, Settings
- Supabase schema for the full data model (workspaces, customers, conversations,
  messages, leads, products, media, channels, appointments, followups,
  transactions, notifications, audit_log) with row-level security

## Not yet built (next passes)
- Real channel integrations (WhatsApp Business API, Gmail, Instagram, Messenger,
  Telegram, Google Calendar OAuth)
- Gemini-powered AI reply generation wired to real conversations
- Real-time data fetching for dashboard pages (currently mock data)
- Post-payment reconciliation blocking modal
- File upload to Supabase Storage for Products & Media
