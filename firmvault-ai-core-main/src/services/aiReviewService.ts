// src/services/aiReviewService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "ai_reviews";

export type AIReviewRecord = {
  id: string;
  firm_id?: string | null;
  related_type: string;
  related_id?: string | null;
  review_type?: string | null;
  summary?: string | null;
  risk_level?: string | null;
  recommendations?: string | null;
  created_at?: string;
};

export const aiReviewService = {
  async getAll(filters?: {
    relatedType?: string;
    relatedId?: string;
  }): Promise<AIReviewRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.relatedType) {
      query = query.eq("related_type", filters.relatedType);
    }

    if (filters?.relatedId) {
      query = query.eq("related_id", filters.relatedId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading AI reviews:", error);
      return [];
    }

    return (data ?? []) as AIReviewRecord[];
  },

  async getById(id: string): Promise<AIReviewRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error loading AI review:", error);
      return null;
    }

    return data as AIReviewRecord | null;
  },

  async create(payload: Partial<AIReviewRecord>): Promise<AIReviewRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating AI review:", error);
      return null;
    }

    const review = data as AIReviewRecord;

    if (review.related_type === "matter" && review.related_id) {
      await activityService.logMatterActivity(
        review.related_id,
        `AI review created: ${review.review_type || "General review"}`,
      );
    }

    return review;
  },

  async createMatterReview(payload: {
    matterId: string;
    summary: string;
    riskLevel: string;
    recommendations: string;
  }): Promise<AIReviewRecord | null> {
    return this.create({
      related_type: "matter",
      related_id: payload.matterId,
      review_type: "matter_review",
      summary: payload.summary,
      risk_level: payload.riskLevel,
      recommendations: payload.recommendations,
    });
  },

  async createIntakeReview(payload: {
    intakeId: string;
    summary: string;
    riskLevel: string;
    recommendations: string;
  }): Promise<AIReviewRecord | null> {
    return this.create({
      related_type: "intake",
      related_id: payload.intakeId,
      review_type: "intake_review",
      summary: payload.summary,
      risk_level: payload.riskLevel,
      recommendations: payload.recommendations,
    });
  },
};