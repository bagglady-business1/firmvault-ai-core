/**
 * FirmVault AI — Note Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.notes (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid not null references public.matters(id) on delete cascade,
 *     author_id uuid not null references public.user_profiles(id),
 *     body text not null,
 *     privileged boolean not null default true,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 *   -- RLS: only matter team members may read. Privileged notes
 *   --      additionally restricted to attorneys + assigned paralegals.
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import type { NoteRecord } from "@/types";

const TABLE = "notes";

const mockNotes = [
  { id: "n1", author_id: "u1", body: "Confirmed mediator availability.", created_at: new Date().toISOString() },
  { id: "n2", author_id: "u3", body: "Witness prep memo drafted.", created_at: new Date().toISOString() },
];

export const noteService = {
  async getAll(filters?: { matterId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("created_at", { ascending: false });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        const { data, error } = await q;
        if (error) throw error;
        return data as NoteRecord[];
      },
      mockNotes,
      "notes.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as NoteRecord | null;
      },
      () => mockNotes.find((n) => n.id === id) ?? null,
      "notes.getById",
    );
  },

  async create(payload: Partial<NoteRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as NoteRecord;
      },
      () => ({ ...(payload as NoteRecord) }),
      "notes.create",
    );
  },

  async update(id: string, patch: Partial<NoteRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).update(patch).eq("id", id).select().single();
        if (error) throw error;
        return data as NoteRecord;
      },
      () => ({ id, ...(patch as NoteRecord) }),
      "notes.update",
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
      "notes.remove",
    );
  },
};
