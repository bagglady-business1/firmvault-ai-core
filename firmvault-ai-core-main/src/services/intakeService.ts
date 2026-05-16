// src/services/intakeService.ts

import { supabase } from "@/lib/supabaseClient";

const TABLE = "intakes";

export type IntakeRecord = {
  id: string;
  firm_id?: string | null;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  case_type?: string | null;
  intake_status?: string | null;
  summary?: string | null;
  ai_summary?: string | null;
  ai_risk_level?: string | null;
  created_at?: string;
  updated_at?: string;
};

export const intakeService = {
  async getAll(): Promise<IntakeRecord[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading intakes:", error);
      return [];
    }

    return (data ?? []) as IntakeRecord[];
  },

  async getById(id: string): Promise<IntakeRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error loading intake:", error);
      return null;
    }

    return data as IntakeRecord | null;
  },

  async create(payload: Partial<IntakeRecord>): Promise<IntakeRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating intake:", error);
      return null;
    }

    return data as IntakeRecord;
  },

  async update(
    id: string,
    patch: Partial<IntakeRecord>,
  ): Promise<IntakeRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating intake:", error);
      return null;
    }

    return data as IntakeRecord;
  },

  async remove(id: string): Promise<{ id: string } | null> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);

    if (error) {
      console.error("Error deleting intake:", error);
      return null;
    }

    return { id };
  },
};