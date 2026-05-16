// src/services/activityService.ts

import { supabase } from "@/lib/supabaseClient";

const TABLE = "activity_logs";

export type ActivityRecord = {
  id: string;
  firm_id?: string | null;
  related_type?: string | null;
  related_id?: string | null;
  action: string;
  created_at?: string;
};

export const activityService = {
  async getByMatter(matterId: string): Promise<ActivityRecord[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("related_type", "matter")
      .eq("related_id", matterId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading activity logs:", error);
      return [];
    }

    return (data ?? []) as ActivityRecord[];
  },

  async logMatterActivity(
    matterId: string,
    action: string,
  ): Promise<ActivityRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        related_type: "matter",
        related_id: matterId,
        action,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating activity log:", error);
      return null;
    }

    return data as ActivityRecord;
  },
};