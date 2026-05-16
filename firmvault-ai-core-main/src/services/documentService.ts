// src/services/documentService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "documents";

export type DocumentRecord = {
  id: string;
  firm_id?: string | null;
  matter_id?: string | null;
  title: string;
  document_type?: string | null;
  file_url?: string | null;
  status?: string | null;
  created_at?: string;
};

export const documentService = {
  async getAll(filters?: { matterId?: string }): Promise<DocumentRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.matterId) {
      query = query.eq("matter_id", filters.matterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading documents:", error);
      return [];
    }

    return (data ?? []) as DocumentRecord[];
  },

  async create(payload: Partial<DocumentRecord>): Promise<DocumentRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating document:", error);
      return null;
    }

    const document = data as DocumentRecord;

    if (document.matter_id) {
      await activityService.logMatterActivity(
        document.matter_id,
        `Document added: ${document.title}`,
      );
    }

    return document;
  },
};