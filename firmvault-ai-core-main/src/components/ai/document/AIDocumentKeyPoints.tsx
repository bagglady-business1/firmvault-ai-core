import { ListChecks, Flag, FilePlus2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIRiskFlagCard } from "../AIRiskFlagCard";
import type { DocumentReview } from "@/data/mockAIReviews";

interface AIDocumentKeyPointsProps {
  doc: DocumentReview;
}

export function AIDocumentKeyPoints({ doc }: AIDocumentKeyPointsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <ListChecks className="h-4 w-4 text-primary" />
            Key points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {doc.keyPoints.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Flag className="h-4 w-4 text-amber-400" />
            Flagged issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {doc.flaggedIssues.map((f, i) => (
            <div
              key={i}
              className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3"
            >
              <AIRiskFlagCard risk={f.risk} size="sm" />
              <p className="text-sm text-foreground/90">{f.issue}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <FilePlus2 className="h-4 w-4 text-primary" />
            Missing supporting documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {doc.missingSupportingDocs.map((d, i) => (
            <div
              key={i}
              className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground/90"
            >
              {d}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
