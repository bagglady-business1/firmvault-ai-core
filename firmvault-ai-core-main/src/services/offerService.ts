// src/services/offerService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "offers";

export type OfferRecord = {
  id: string;
  firm_id?: string | null;
  matter_id?: string | null;
  offer_title?: string | null;
  offer_amount?: number | null;
  offer_status?: string | null;
  notes?: string | null;
  created_at?: string;
};

export const offerService = {
  async getAll(filters?: { matterId?: string }): Promise<OfferRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.matterId) {
      query = query.eq("matter_id", filters.matterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading offers:", error);
      return [];
    }

    return (data ?? []) as OfferRecord[];
  },

  async create(payload: Partial<OfferRecord>): Promise<OfferRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating offer:", error);
      return null;
    }

    const offer = data as OfferRecord;

    if (offer.matter_id) {
      await activityService.logMatterActivity(
        offer.matter_id,
        `Offer added: ${offer.offer_title || "Untitled offer"}`,
      );
    }

    return offer;
  },

  async update(
    id: string,
    patch: Partial<OfferRecord>,
  ): Promise<OfferRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating offer:", error);
      return null;
    }

    const offer = data as OfferRecord;

    if (offer.matter_id) {
      await activityService.logMatterActivity(
        offer.matter_id,
        `Offer updated: ${offer.offer_title || "Untitled offer"}`,
      );
    }

    return offer;
  },
};