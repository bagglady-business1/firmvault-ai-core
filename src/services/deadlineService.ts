/**
 * FirmVault AI — Deadline Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.deadlines (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid not null references public.matters(id) on delete cascade,
 *     title text not null,
 *     description text,
 *     due_at timestamptz not null,
 *     priority text not null default 'medium',
 *     jurisdiction_rule text,
 *     satisfied_at timestamptz,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockDeadlines } from "@/lib/mock-data";
import type { DeadlineRecord } from "@/types";

const TABLE = "deadlines";

export const deadlineService = {
  async getAll(filters?: { matterId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("due_at", { ascending: true });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        const { data, error } = await q;
        if (error) throw error;
        return data as DeadlineRecord[];
      },
      mockDeadlines,
      "deadlines.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as DeadlineRecord | null;
      },
      () => mockDeadlines.find((d) => d.id === id) ?? null,
      "deadlines.getById",
    );
  },

  async create(payload: Partial<DeadlineRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as DeadlineRecord;
      },
      () => ({ ...(payload as DeadlineRecord) }),
      "deadlines.create",
    );
  },

  async update(id: string, patch: Partial<DeadlineRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).update(patch).eq("id", id).select().single();
        if (error) throw error;
        return data as DeadlineRecord;
      },
      () => ({ id, ...(patch as DeadlineRecord) }),
      "deadlines.update",
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
      "deadlines.remove",
    );
  },
};
