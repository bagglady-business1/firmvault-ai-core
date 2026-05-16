import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIConfidenceIndicator } from "../AIConfidenceIndicator";
import { AIRiskFlagCard } from "../AIRiskFlagCard";
import type { IntakeReview } from "@/data/mockAIReviews";

interface AIIntakeSummaryProps {
  review: IntakeReview;
}

export function AIIntakeSummary({ review }: AIIntakeSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Intake summary
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {review.client} · {review.practiceArea} · received{" "}
              {review.receivedAt}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <AIRiskFlagCard risk={review.risk} />
            <AIConfidenceIndicator confidence={review.confidence} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/90">
          {review.summary}
        </p>
        <div>
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Key facts (should be verified)
          </h4>
          <ul className="space-y-1.5">
            {review.keyFacts.map((f, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-foreground/90"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
