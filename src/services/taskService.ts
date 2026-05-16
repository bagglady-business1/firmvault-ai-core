/**
 * FirmVault AI — Task Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.tasks (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid references public.matters(id) on delete cascade,
 *     title text not null,
 *     description text,
 *     assignee_id uuid references public.user_profiles(id),
 *     status text not null default 'todo',
 *     priority text not null default 'medium',
 *     due_at timestamptz,
 *     completed_at timestamptz,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockTasks } from "@/lib/mock-data";
import type { TaskRecord } from "@/types";

const TABLE = "tasks";

export const taskService = {
  async getAll(filters?: { matterId?: string; assigneeId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("due_at", { ascending: true });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        if (filters?.assigneeId) q = q.eq("assignee_id", filters.assigneeId);
        const { data, error } = await q;
        if (error) throw error;
        return data as TaskRecord[];
      },
      mockTasks,
      "tasks.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as TaskRecord | null;
      },
      () => mockTasks.find((t) => t.id === id) ?? null,
      "tasks.getById",
    );
  },

  async create(payload: Partial<TaskRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as TaskRecord;
      },
      () => ({ ...(payload as TaskRecord) }),
      "tasks.create",
    );
  },

  async update(id: string, patch: Partial<TaskRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).update(patch).eq("id", id).select().single();
        if (error) throw error;
        return data as TaskRecord;
      },
      () => ({ ...(patch as TaskRecord), id }),
      "tasks.update",
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
      "tasks.remove",
    );
  },
};
