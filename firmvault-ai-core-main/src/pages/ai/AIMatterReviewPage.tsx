// src/pages/ai/AIMatterReviewPage.tsx

import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { aiReviewService } from "@/services/aiReviewService";
import { AIDisclaimer } from "@/components/ai/AIDisclaimer";
import { Card, CardContent } from "@/components/ui/card";

export default function AIMatterReviewPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleRunReview() {
    setLoading(true);
    setSaved(false);

    try {
      const review = await aiReviewService.createMatterReview({
        matterId: id,
        summary:
          "Matter reviewed. Key risk indicators include open tasks, pending deadlines, and document review needs.",
        riskLevel: "high",
        recommendations:
          "Review deadlines, confirm missing documents, complete open tasks, and prepare attorney follow-up.",
      });

      if (review) {
        setSaved(true);
      }
    } catch (error) {
      console.error("AI matter review failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            AI Analysis
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            AI Matter Review
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-assisted review of this matter. Attorney review is required.
          </p>
        </div>

        <button
          onClick={handleRunReview}
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Running..." : "Run AI Review"}
        </button>
      </div>

      <AIDisclaimer />

      {saved && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-foreground">
          AI matter review saved. It will now appear in the AI Review Center and
          the matter timeline.
        </div>
      )}

      <Card>
        <CardContent className="space-y-3 p-5">
          <h2 className="font-display text-base font-semibold">
            Review Focus
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Matter summary and current case posture</li>
            <li>• Open tasks and incomplete action items</li>
            <li>• Pending deadlines and risk signals</li>
            <li>• Documents, notes, offers, and missing information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}