// src/pages/intake/AIIntakeReviewPage.tsx

import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AIInsightCard } from "@/components/ui/AIInsightCard";
import { aiReviewService } from "@/services/aiReviewService";

export function AIIntakeReviewPage() {
  const { id } = useParams({ strict: false }) as { id: string };

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleRunReview() {
    setLoading(true);
    setSaved(false);

    try {
      const review = await aiReviewService.createIntakeReview({
        intakeId: id,
        summary:
          "Initial intake reviewed. Missing supporting documents and possible timeline concerns.",
        riskLevel: "medium",
        recommendations:
          "Request additional documentation, confirm incident date, and assign attorney for follow-up.",
      });

      if (review) {
        setSaved(true);
      }
    } catch (error) {
      console.error("AI intake review failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        title={`AI Review · Intake ${id}`}
        description="AI-generated intake analysis. Attorney review required."
        actions={
          <button
            onClick={handleRunReview}
            disabled={loading}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Running..." : "Run AI Review"}
          </button>
        }
      />

      {saved && (
        <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-foreground">
          AI intake review saved. It will now appear in the AI Review Center.
          <div className="mt-2">
            <Link
              to="/ai-review"
              className="text-sm font-medium text-primary hover:underline"
            >
              Open AI Review Center
            </Link>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <AIInsightCard
          severity="medium"
          title="Missing documentation"
          matter="Intake"
          summary="No supporting files uploaded."
        />

        <AIInsightCard
          severity="low"
          title="Client follow-up needed"
          matter="Intake"
          summary="Phone/email verification recommended."
        />
      </div>
    </AppShell>
  );
}