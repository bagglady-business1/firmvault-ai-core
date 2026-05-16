/**
 * FirmVault AI — Matter Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.matters (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     reference text not null unique,
 *     title text not null,
 *     client_name text not null,
 *     practice_area text not null,
 *     stage text not null,
 *     status text not null default 'active',
 *     lead_attorney_id uuid references public.user_profiles(id),
 *     opened_at timestamptz not null default now(),
 *     closed_at timestamptz,
 *     summary text,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 *
 *   create table public.matter_team_members (
 *     id uuid primary key default gen_random_uuid(),
 *     matter_id uuid not null references public.matters(id) on delete cascade,
 *     user_id uuid not null references public.user_profiles(id) on delete cascade,
 *     role text not null,
 *     created_at timestamptz not null default now(),
 *     unique (matter_id, user_id)
 *   );
 *   -- RLS: only firm members assigned to matter may read/write.
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockMatters } from "@/lib/mock-data";
import type { Matter } from "@/types";

const TABLE = "matters";

export const matterService = {
  async getAll() {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .select("*")
          .order("updated_at", { ascending: false });
        if (error) throw error;
        return data as Matter[];
      },
      mockMatters,
      "matters.getAll",
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
        return data as Matter | null;
      },
      () => mockMatters.find((m) => m.id === id) ?? null,
      "matters.getById",
    );
  },

  async create(payload: Partial<Matter>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data as Matter;
      },
      () => ({ ...(payload as Matter) }),
      "matters.create",
    );
  },

  async update(id: string, patch: Partial<Matter>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as Matter;
      },
      () => ({ id, ...(patch as Matter) }),
      "matters.update",
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
      "matters.remove",
    );
  },
};
