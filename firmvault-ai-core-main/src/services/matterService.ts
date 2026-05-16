// src/services/matterService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "matters";

export type MatterRecord = {
  id: string;
  firm_id?: string | null;
  intake_id?: string | null;
  matter_name: string;
  client_name?: string | null;
  case_type?: string | null;
  matter_status?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const matterService = {
  async getAll(): Promise<MatterRecord[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading matters:", error);
      return [];
    }

    return (data ?? []) as MatterRecord[];
  },

  async getById(id: string): Promise<MatterRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error loading matter:", error);
      return null;
    }

    return data as MatterRecord | null;
  },

  async create(payload: Partial<MatterRecord>): Promise<MatterRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating matter:", error);
      return null;
    }

    const matter = data as MatterRecord;

    await activityService.logMatterActivity(
      matter.id,
      `Matter created: ${matter.matter_name || "Untitled Matter"}`,
    );

    return matter;
  },

  async update(
    id: string,
    patch: Partial<MatterRecord>,
  ): Promise<MatterRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating matter:", error);
      return null;
    }

    await activityService.logMatterActivity(id, "Matter updated");

    return data as MatterRecord;
  },

  async remove(id: string): Promise<{ id: string } | null> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);

    if (error) {
      console.error("Error deleting matter:", error);
      return null;
    }

    return { id };
  },
};