/**
 * FirmVault AI — Supabase Client
 * ---------------------------------------------------------------
 * This module exposes a singleton Supabase client used by the
 * service layer (src/services/*). Until Supabase is connected, the
 * client will be `null` and services will transparently fall back
 * to mock data via `src/utils/dataSource.ts`.
 *
 * Required environment variables (set in your Lovable Cloud /
 * Supabase project — never commit secrets to source):
 *   - VITE_SUPABASE_URL        → e.g. https://xyzcompany.supabase.co
 *   - VITE_SUPABASE_ANON_KEY   → the PUBLIC anon/publishable key
 *
 * SECURITY NOTES
 *   - Only the ANON key may be used in frontend code. It is safe
 *     to ship to the browser because access is gated by Row Level
 *     Security (RLS) policies in the database.
 *   - NEVER expose the `service_role` key to the frontend. It
 *     bypasses RLS and must only be used in trusted server code
 *     (TanStack server functions / server routes).
 *   - All sensitive table access must be protected by RLS policies
 *     scoped to `auth.uid()` and the user's firm/role.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Supabase client singleton. `null` when env vars are not set —
 * services should detect this and fall back to mock data.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

if (!isSupabaseConfigured && typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.warn(
    "[FirmVault AI] Supabase is not configured. Falling back to mock data. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable secure backend access.",
  );
}
