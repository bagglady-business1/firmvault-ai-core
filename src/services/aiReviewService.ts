/**
 * FirmVault AI — AI Review Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.ai_reviews (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid references public.matters(id) on delete cascade,
 *     document_id uuid references public.documents(id) on delete set null,
 *     kind text not null,
 *     title text not null,
 *     summary text not null,
 *     severity text not null,
 *     acknowledged_by uuid references public.user_profiles(id),
 *     acknowledged_at timestamptz,
 *     created_at timestamptz not null default now()
 *   );
 *   create table public.activity_logs (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     actor_id uuid references public.user_profiles(id),
 *     actor_label text not null,
 *     action text not null,
 *     target_type text not null,
 *     target_id uuid,
 *     target_label text not null,
 *     created_at timestamptz not null default now()
 *   );
 *   -- Both tables RLS-scoped to the user's firm_id.
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockAIAlerts, mockActivity } from "@/lib/mock-data";
import type { AIReviewRecord, ActivityLogRecord } from "@/types";

const TABLE = "ai_reviews";
const ACTIVITY_TABLE = "activity_logs";

export const aiReviewService = {
  async getAll(filters?: { matterId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("created_at", { ascending: false });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        const { data, error } = await q;
        if (error) throw error;
        return data as AIReviewRecord[];
      },
      mockAIAlerts,
      "ai_reviews.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as AIReviewRecord | null;
      },
      () => mockAIAlerts.find((a) => a.id === id) ?? null,
      "ai_reviews.getById",
    );
  },

  async create(payload: Partial<AIReviewRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as AIReviewRecord;
      },
      () => ({ ...(payload as AIReviewRecord) }),
      "ai_reviews.create",
    );
  },

  async acknowledge(id: string, userId: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE)
          .update({ acknowledged_by: userId, acknowledged_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as AIReviewRecord;
      },
      () => ({ id, acknowledged_by: userId } as AIReviewRecord),
      "ai_reviews.acknowledge",
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
      "ai_reviews.remove",
    );
  },

  async getActivity() {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(ACTIVITY_TABLE)
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);
        if (error) throw error;
        return data as ActivityLogRecord[];
      },
      mockActivity,
      "activity_logs.recent",
    );
  },
};
