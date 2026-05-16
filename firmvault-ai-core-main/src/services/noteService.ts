// src/services/noteService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "notes";

export type NoteRecord = {
  id: string;
  firm_id?: string | null;
  matter_id?: string | null;
  note_text: string;
  created_at?: string;
};

export const noteService = {
  async getAll(filters?: { matterId?: string }): Promise<NoteRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.matterId) {
      query = query.eq("matter_id", filters.matterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading notes:", error);
      return [];
    }

    return (data ?? []) as NoteRecord[];
  },

  async create(payload: Partial<NoteRecord>): Promise<NoteRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating note:", error);
      return null;
    }

    const note = data as NoteRecord;

    if (note.matter_id) {
      await activityService.logMatterActivity(note.matter_id, "Note added");
    }

    return note;
  },
};