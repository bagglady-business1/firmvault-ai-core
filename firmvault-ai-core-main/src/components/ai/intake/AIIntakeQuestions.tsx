import { MessageSquare, FilePlus2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntakeReview } from "@/data/mockAIReviews";

interface AIIntakeQuestionsProps {
  review: IntakeReview;
}

export function AIIntakeQuestions({ review }: AIIntakeQuestionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4 text-primary" />
            Suggested follow-up questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {review.followUpQuestions.map((q, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground/90"
              >
                <span className="font-mono text-xs text-primary">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Questions are suggestions only — attorney should review before
            client contact.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <FilePlus2 className="h-4 w-4 text-primary" />
            Documents to request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {review.documentsToRequest.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm"
            >
              <span className="text-foreground/90">{d}</span>
              <span className="text-[11px] text-muted-foreground">
                requires confirmation
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
