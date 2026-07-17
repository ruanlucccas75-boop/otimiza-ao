import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    supabase = null;
  }
}

export { supabase };

export type OptimizationState = {
  id: string;
  category: string;
  enabled: boolean;
  updated_at: string;
};

export type ActivityEntry = {
  id: string;
  action: string;
  category: string;
  detail: string | null;
  created_at: string;
};

export type AppSettings = {
  id: number;
  theme: string;
  accent: string;
  auto_apply: boolean;
  updated_at: string;
};
