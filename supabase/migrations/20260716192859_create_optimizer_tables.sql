/*
# Create Optimizer tables (single-tenant, no auth)

This is a web-based replica of hellzerg/optimizer. There is no sign-in screen,
so all policies are scoped to anon + authenticated (single-tenant, shared data).

1. New Tables
- `optimization_states` — tracks which optimizations are toggled on/off.
  - `id` (text, primary key): stable key like "disable_telemetry"
  - `category` (text): "privacy" | "performance" | "system" | "network" | "ui" | "security" | "updates"
  - `enabled` (boolean, default false): whether the tweak is applied
  - `updated_at` (timestamptz)
- `activity_log` — records user actions (cleaning runs, tweaks applied, etc.).
  - `id` (uuid, primary key)
  - `action` (text): short action label e.g. "Applied 12 tweaks"
  - `category` (text): the panel/category it came from
  - `detail` (text): longer description / item counts
  - `created_at` (timestamptz)
- `settings` — single row of app preferences.
  - `id` (int, primary key, always 1): singleton row
  - `theme` (text): "dark" | "midnight" | "carbon"
  - `accent` (text): accent color key
  - `auto_apply` (boolean, default false)
  - `updated_at` (timestamptz)

2. Security
- Enable RLS on all three tables.
- All tables are intentionally public/shared (single-tenant, no sign-in):
  SELECT/INSERT/UPDATE/DELETE scoped to `anon, authenticated` with `USING (true)`.
*/

CREATE TABLE IF NOT EXISTS optimization_states (
  id text PRIMARY KEY,
  category text NOT NULL,
  enabled boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE optimization_states ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_opt_states" ON optimization_states;
CREATE POLICY "anon_select_opt_states" ON optimization_states
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_opt_states" ON optimization_states;
CREATE POLICY "anon_insert_opt_states" ON optimization_states
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_opt_states" ON optimization_states;
CREATE POLICY "anon_update_opt_states" ON optimization_states
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_opt_states" ON optimization_states;
CREATE POLICY "anon_delete_opt_states" ON optimization_states
  FOR DELETE TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  category text NOT NULL,
  detail text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_activity" ON activity_log;
CREATE POLICY "anon_select_activity" ON activity_log
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_activity" ON activity_log;
CREATE POLICY "anon_insert_activity" ON activity_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_activity" ON activity_log;
CREATE POLICY "anon_delete_activity" ON activity_log
  FOR DELETE TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS settings (
  id int PRIMARY KEY DEFAULT 1,
  theme text NOT NULL DEFAULT 'dark',
  accent text NOT NULL DEFAULT 'blue',
  auto_apply boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON settings;
CREATE POLICY "anon_select_settings" ON settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_settings" ON settings;
CREATE POLICY "anon_insert_settings" ON settings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_settings" ON settings;
CREATE POLICY "anon_update_settings" ON settings
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Seed singleton settings row if missing
INSERT INTO settings (id, theme, accent, auto_apply)
VALUES (1, 'dark', 'blue', false)
ON CONFLICT (id) DO NOTHING;
