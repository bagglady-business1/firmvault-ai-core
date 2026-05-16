// src/pages/ai/AIReviewCenterPage.tsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Flag,
  FileQuestion,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIReviewSummaryCard } from "@/components/ai/AIReviewSummaryCard";
import { AIRiskFlagCard } from "@/components/ai/AIRiskFlagCard";
import { AIDisclaimer } from "@/components/ai/AIDisclaimer";
import {
  aiReviewService,
  type AIReviewRecord,
} from "@/services/aiReviewService";

type ReviewTypeFilter = "all" | "intake" | "matter";
type RiskFilter = "all" | "low" | "medium" | "high" | "critical";

function getReviewTypeLabel(review: AIReviewRecord) {
  if (review.related_type === "intake") return "Intake";
  if (review.related_type === "matter") return "Matter";
  return review.related_type || "Review";
}

function getReviewTitle(review: AIReviewRecord) {
  if (review.review_type === "intake_review") return "AI Intake Review";
  if (review.review_type === "matter_review") return "AI Matter Review";
  return review.review_type || "AI Review";
}

export default function AIReviewCenterPage() {
  const [reviews, setReviews] = useState<AIReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<ReviewTypeFilter>("all");
  const [risk, setRisk] = useState<RiskFilter>("all");

  async function loadReviews() {
    setLoading(true);

    try {
      const data = await aiReviewService.getAll();
      setReviews(data);
    } catch (error) {
      console.error("Failed to load AI reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const filtered = useMemo(() => {
    return reviews.filter((review) => {
      const typeMatch = type === "all" || review.related_type === type;
      const riskMatch = risk === "all" || review.risk_level === risk;
      return typeMatch && riskMatch;
    });
  }, [reviews, type, risk]);

  const flagged = reviews.length;
  const highRisk = reviews.filter(
    (review) =>
      review.risk_level === "high" || review.risk_level === "critical",
  ).length;
  const intakeReviews = reviews.filter(
    (review) => review.related_type === "intake",
  ).length;
  const matterReviews = reviews.filter(
    (review) => review.related_type === "matter",
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            AI Review
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            AI Review Center
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Saved AI-assisted reviews across intakes and matters. Attorney
            review is still required.
          </p>
        </div>

        <AIDisclaimer className="max-w-xl" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AIReviewSummaryCard
          label="Saved reviews"
          value={flagged}
          icon={Flag}
          tone="warning"
          hint="Across intakes and matters"
        />
        <AIReviewSummaryCard
          label="High-risk reviews"
          value={highRisk}
          icon={AlertTriangle}
          tone="danger"
          hint="High or critical risk"
        />
        <AIReviewSummaryCard
          label="Intake reviews"
          value={intakeReviews}
          icon={FileQuestion}
          tone="default"
          hint="Client intake analysis"
        />
        <AIReviewSummaryCard
          label="Matter reviews"
          value={matterReviews}
          icon={CalendarClock}
          tone="warning"
          hint="Active matter analysis"
        />
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Filters
          </span>

          <Select
            value={type}
            onValueChange={(value) => setType(value as ReviewTypeFilter)}
          >
            <SelectTrigger className="h-9 w-44">
              <SelectValue placeholder="Review type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All review types</SelectItem>
              <SelectItem value="intake">Intake</SelectItem>
              <SelectItem value="matter">Matter</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={risk}
            onValueChange={(value) => setRisk(value as RiskFilter)}
          >
            <SelectTrigger className="h-9 w-40">
              <SelectValue placeholder="Risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={loadReviews}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
          >
            Refresh
          </button>

          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} of {reviews.length} reviews
          </span>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            Loading AI reviews...
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            No AI reviews found yet. Run an intake or matter AI review first.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => {
            const isMatter = review.related_type === "matter";
            const isIntake = review.related_type === "intake";

            return (
              <Card
                key={review.id}
                className="transition-colors hover:border-primary/40"
              >
                <CardContent className="flex flex-wrap items-start gap-4 p-5">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {getReviewTypeLabel(review)}
                      </span>

                      <AIRiskFlagCard
                        risk={(review.risk_level || "low") as never}
                        size="sm"
                      />

                      <span className="text-xs text-muted-foreground">
                        Created{" "}
                        {review.created_at
                          ? new Date(review.created_at).toLocaleString()
                          : "unknown date"}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground">
                      {getReviewTitle(review)}
                    </h3>

                    <p className="text-sm leading-relaxed text-foreground/80">
                      {review.summary || "No summary saved."}
                    </p>

                    <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground/80">
                      <span className="font-medium">Recommendations: </span>
                      {review.recommendations || "No recommendations saved."}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {isMatter && review.related_id ? (
                      <Link
                        to="/matters/$id/timeline"
                        params={{ id: review.related_id }}
                        className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                      >
                        Open matter
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : isIntake && review.related_id ? (
                      <Link
                        to="/intake/$id"
                        params={{ id: review.related_id }}
                        className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                      >
                        Open intake
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No linked record
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}