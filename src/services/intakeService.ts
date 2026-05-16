/**
 * FirmVault AI — Intake Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema (apply later via migration):
 *
 *   create table public.intakes (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     client_name text not null,
 *     client_email text,
 *     client_phone text,
 *     matter_type text not null,
 *     jurisdiction text,
 *     source text not null check (source in ('web_form','phone','email','referral','walk_in')),
 *     risk text not null check (risk in ('low','medium','high','critical')) default 'low',
 *     status text not null check (status in ('new','in_review','conflict_check','qualified','converted','declined')) default 'new',
 *     ai_summary text,
 *     assigned_to uuid references public.user_profiles(id),
 *     received_at timestamptz not null default now(),
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 *   -- RLS: enable + policy "firm members read/write own firm".
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockIntakes } from "@/lib/mock-data";
import type { Intake } from "@/types";

const TABLE = "intakes";

export const intakeService = {
  async getAll() {
    return withFallback<Intake[] | typeof mockIntakes>(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .select("*")
          .order("received_at", { ascending: false });
        if (error) throw error;
        return data as Intake[];
      },
      mockIntakes,
      "intakes.getAll",
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
        return data as Intake | null;
      },
      () => mockIntakes.find((i) => i.id === id) ?? null,
      "intakes.getById",
    );
  },

  async create(payload: Partial<Intake>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data as Intake;
      },
      () => ({ ...(payload as Intake) }),
      "intakes.create",
    );
  },

  async update(id: string, patch: Partial<Intake>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .update(patch)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as Intake;
      },
      () => ({ ...(patch as Intake), id }),
      "intakes.update",
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
      "intakes.remove",
    );
  },
};
