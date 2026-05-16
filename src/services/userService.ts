/**
 * FirmVault AI — User Service
 * ---------------------------------------------------------------
 * IMPORTANT: per security best practice, ROLES MUST live in a
 * separate `user_roles` table — never on `user_profiles` — to
 * prevent privilege-escalation attacks via profile updates.
 *
 * Suggested Supabase schema:
 *
 *   create type public.app_role as enum (
 *     'owner','managing_partner','senior_partner','partner','counsel',
 *     'associate','paralegal','admin','billing','guest'
 *   );
 *
 *   create table public.user_profiles (
 *     id uuid primary key references auth.users(id) on delete cascade,
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     full_name text not null,
 *     email text not null,
 *     initials text not null,
 *     status text not null default 'active',
 *     bar_number text,
 *     last_active_at timestamptz,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 *
 *   create table public.user_roles (
 *     id uuid primary key default gen_random_uuid(),
 *     user_id uuid not null references auth.users(id) on delete cascade,
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     role app_role not null,
 *     unique (user_id, firm_id, role)
 *   );
 *   -- Use a SECURITY DEFINER `has_role(user, role)` function in RLS.
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockFirmUsers, mockActiveUsers } from "@/lib/mock-data";
import type { UserProfile } from "@/types";

const TABLE = "user_profiles";

export const userService = {
  async getAll() {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .select("*")
          .order("full_name");
        if (error) throw error;
        return data as UserProfile[];
      },
      mockFirmUsers,
      "users.getAll",
    );
  },

  async getActive() {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .select("*")
          .not("last_active_at", "is", null)
          .order("last_active_at", { ascending: false })
          .limit(8);
        if (error) throw error;
        return data as UserProfile[];
      },
      mockActiveUsers,
      "users.getActive",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        return data as UserProfile | null;
      },
      () => mockFirmUsers.find((u) => u.id === id) ?? null,
      "users.getById",
    );
  },

  async create(payload: Partial<UserProfile>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data as UserProfile;
      },
      () => ({ ...(payload as UserProfile) }),
      "users.create",
    );
  },

  async update(id: string, patch: Partial<UserProfile>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as UserProfile;
      },
      () => ({ id, ...(patch as UserProfile) }),
      "users.update",
    );
  },

  async remove(id: string) {
    return withFallback(
      async () => {
        const { error } = await supabase!.from(TABLE).delete().eq("id", id);
        if (error) throw error;
        return { id };
      },
      { id },
      "users.remove",
    );
  },
};
