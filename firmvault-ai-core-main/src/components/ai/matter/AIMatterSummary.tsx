import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIRiskFlagCard } from "../AIRiskFlagCard";
import { AIConfidenceIndicator } from "../AIConfidenceIndicator";
import type { MatterReview } from "@/data/mockAIReviews";

interface AIMatterSummaryProps {
  matter: MatterReview;
}

export function AIMatterSummary({ matter }: AIMatterSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              {matter.caption}
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {matter.client} · {matter.practiceArea} · lead {matter.attorney}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <AIRiskFlagCard risk={matter.risk} />
            <AIConfidenceIndicator confidence={matter.confidence} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/90">
          {matter.summary}
        </p>
      </CardContent>
    </Card>
  );
}
