/**
 * FirmVault AI — Offer & Negotiation Service
 * ---------------------------------------------------------------
 * Suggested Supabase schema:
 *
 *   create table public.offers (
 *     id uuid primary key default gen_random_uuid(),
 *     firm_id uuid not null references public.firms(id) on delete cascade,
 *     matter_id uuid not null references public.matters(id) on delete cascade,
 *     party text not null,
 *     amount_cents bigint not null,
 *     currency text not null default 'USD',
 *     status text not null default 'pending',
 *     terms text,
 *     proposed_by uuid not null references public.user_profiles(id),
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 */

import { supabase } from "@/lib/supabaseClient";
import { withFallback } from "@/utils/dataSource";
import { mockOffers } from "@/lib/mock-data";
import type { OfferRecord } from "@/types";

const TABLE = "offers";

export const offerService = {
  async getAll(filters?: { matterId?: string }) {
    return withFallback(
      async () => {
        let q = supabase!.from(TABLE).select("*").order("updated_at", { ascending: false });
        if (filters?.matterId) q = q.eq("matter_id", filters.matterId);
        const { data, error } = await q;
        if (error) throw error;
        return data as OfferRecord[];
      },
      mockOffers,
      "offers.getAll",
    );
  },

  async getById(id: string) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data as OfferRecord | null;
      },
      () => mockOffers.find((o) => o.id === id) ?? null,
      "offers.getById",
    );
  },

  async create(payload: Partial<OfferRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).insert(payload).select().single();
        if (error) throw error;
        return data as OfferRecord;
      },
      () => ({ ...(payload as OfferRecord) }),
      "offers.create",
    );
  },

  async update(id: string, patch: Partial<OfferRecord>) {
    return withFallback(
      async () => {
        const { data, error } = await supabase!
          .from(TABLE).update(patch).eq("id", id).select().single();
        if (error) throw error;
        return data as OfferRecord;
      },
      () => ({ ...(patch as OfferRecord), id }),
      "offers.update",
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
      "offers.remove",
    );
  },
};
