// src/services/deadlineService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "deadlines";

export type DeadlineRecord = {
  id: string;
  firm_id?: string | null;
  matter_id?: string | null;
  title: string;
  deadline_date: string;
  status?: string | null;
  notes?: string | null;
  created_at?: string;
};

export const deadlineService = {
  async getAll(filters?: { matterId?: string }): Promise<DeadlineRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("deadline_date", { ascending: true });

    if (filters?.matterId) {
      query = query.eq("matter_id", filters.matterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading deadlines:", error);
      return [];
    }

    return (data ?? []) as DeadlineRecord[];
  },

  async create(payload: Partial<DeadlineRecord>): Promise<DeadlineRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating deadline:", error);
      return null;
    }

    const deadline = data as DeadlineRecord;

    if (deadline.matter_id) {
      await activityService.logMatterActivity(
        deadline.matter_id,
        `Deadline added: ${deadline.title}`,
      );
    }

    return deadline;
  },

  async update(
    id: string,
    patch: Partial<DeadlineRecord>,
  ): Promise<DeadlineRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating deadline:", error);
      return null;
    }

    const deadline = data as DeadlineRecord;

    if (deadline.matter_id) {
      await activityService.logMatterActivity(
        deadline.matter_id,
        patch.status === "completed"
          ? `Deadline completed: ${deadline.title}`
          : `Deadline updated: ${deadline.title}`,
      );
    }

    return deadline;
  },
};