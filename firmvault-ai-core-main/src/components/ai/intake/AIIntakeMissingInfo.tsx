import { FileQuestion, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntakeReview } from "@/data/mockAIReviews";

interface AIIntakeMissingInfoProps {
  review: IntakeReview;
}

export function AIIntakeMissingInfo({ review }: AIIntakeMissingInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <FileQuestion className="h-4 w-4 text-primary" />
            Missing information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {review.missingInfo.map((m, i) => (
            <div
              key={i}
              className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground/90"
            >
              {m}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            Unclear or conflicting details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {review.unclearDetails.map((m, i) => (
            <div
              key={i}
              className="rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-100/90"
            >
              {m}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
