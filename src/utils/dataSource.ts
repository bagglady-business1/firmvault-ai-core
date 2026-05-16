/**
 * FirmVault AI — Data Source Resolver
 * ---------------------------------------------------------------
 * Single source of truth for "are we talking to Supabase, or
 * returning mock data?". All services in src/services/* import
 * `getDataSource()` and branch on the result.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export type DataSource = "supabase" | "mock";

export function getDataSource(): DataSource {
  return isSupabaseConfigured && supabase ? "supabase" : "mock";
}

export function isUsingSupabase(): boolean {
  return getDataSource() === "supabase";
}

/**
 * Wrap a Supabase call with an automatic mock fallback.
 * If Supabase is unavailable, or the query throws, we log a
 * warning and return the provided mock value — never crash the UI.
 */
export async function withFallback<T>(
  supabaseCall: () => Promise<T>,
  mockValue: T | (() => T | Promise<T>),
  context = "query",
): Promise<T> {
  if (!isUsingSupabase()) {
    return typeof mockValue === "function"
      ? await (mockValue as () => T | Promise<T>)()
      : mockValue;
  }
  try {
    return await supabaseCall();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `[FirmVault AI] Supabase ${context} failed, using mock fallback.`,
      err,
    );
    return typeof mockValue === "function"
      ? await (mockValue as () => T | Promise<T>)()
      : mockValue;
  }
}
