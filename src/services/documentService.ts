/**
 * FirmVault AI — Document Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.documents (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid references public.matters(id) on delete set null,
 *     name text not null,
 *     storage_path text not null,    -- bucket: 'firm-documents'
 *     mime_type text not null,
 *     size_bytes bigint not null,
 *     tag text not null,
 *     uploaded_by uuid not null references public.user_profiles(id),
 *     privileged boolean not null default true,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 *   -- Storage bucket policy: only firm members on the matter may read.
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockDocuments } from "@/lib/mock-data";
import type { DocumentRecord } from "@/types";

const TABLE = "documents";

export const documentService = {
  async getAll(filters?: { matterId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("updated_at", { ascending: false });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        const { data, error } = await q;
        if (error) throw error;
        return data as DocumentRecord[];
      },
      mockDocuments,
      "documents.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as DocumentRecord | null;
      },
      () => mockDocuments.find((d) => d.id === id) ?? null,
      "documents.getById",
    );
  },

  async create(payload: Partial<DocumentRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as DocumentRecord;
      },
      () => ({ ...(payload as DocumentRecord) }),
      "documents.create",
    );
  },

  async update(id: string, patch: Partial<DocumentRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).update(patch).eq("id", id).select().single();
        if (error) throw error;
        return data as DocumentRecord;
      },
      () => ({ id, ...(patch as DocumentRecord) }),
      "documents.update",
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
      "documents.remove",
    );
  },
};
