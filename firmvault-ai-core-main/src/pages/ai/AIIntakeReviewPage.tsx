// src/pages/ai/AIIntakeReviewPage.tsx

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitBranch, CalendarClock } from "lucide-react";
import { AIIntakeSummary } from "@/components/ai/intake/AIIntakeSummary";
import { AIIntakeMissingInfo } from "@/components/ai/intake/AIIntakeMissingInfo";
import { AIIntakeQuestions } from "@/components/ai/intake/AIIntakeQuestions";
import { AIDisclaimer } from "@/components/ai/AIDisclaimer";
import { AIRiskFlagCard } from "@/components/ai/AIRiskFlagCard";
import { mockIntakeReviews } from "@/data/mockAIReviews";

export default function AIIntakeReviewPage() {
  const [selectedId, setSelectedId] = useState(mockIntakeReviews[0].id);

  const review =
    mockIntakeReviews.find((r) => r.id === selectedId) ?? mockIntakeReviews[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            AI Insights
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            AI Intake Review
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated summary of the intake. All items should be verified
            with the client and reviewed by the assigned attorney.
          </p>
        </div>

        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="h-10 w-72">
            <SelectValue placeholder="Select intake" />
          </SelectTrigger>
          <SelectContent>
            {mockIntakeReviews.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.client} — {r.practiceArea}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AIDisclaimer />

      <AIIntakeSummary review={review} />
      <AIIntakeMissingInfo review={review} />
      <AIIntakeQuestions review={review} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <CalendarClock className="h-4 w-4 text-primary" />
              Deadline watch
            </h3>

            <div className="space-y-2">
              {review.deadlineWatch.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2"
                >
                  <div>
                    <p className="text-sm text-foreground/90">{d.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {d.dueIn} — should be verified
                    </p>
                  </div>

                  <AIRiskFlagCard risk={d.risk} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-5">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <GitBranch className="h-4 w-4 text-primary" />
              Practice-area referral flag
            </h3>

            {review.referralFlag ? (
              <div className="rounded-md border border-secondary/30 bg-secondary/10 p-3">
                <p className="text-sm font-medium text-foreground">
                  Possible referral: {review.referralFlag.practiceArea}
                </p>
                <p className="mt-1 text-xs text-foreground/80">
                  {review.referralFlag.reason}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No referral suggested at this time. Attorney should review.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}