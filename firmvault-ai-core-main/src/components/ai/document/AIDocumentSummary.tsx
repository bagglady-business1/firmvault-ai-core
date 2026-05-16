import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIConfidenceIndicator } from "../AIConfidenceIndicator";
import type { DocumentReview } from "@/data/mockAIReviews";

interface AIDocumentSummaryProps {
  doc: DocumentReview;
}

export function AIDocumentSummary({ doc }: AIDocumentSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                {doc.documentName}
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {doc.documentType} · uploaded {doc.uploadedAt}
              </p>
            </div>
          </div>
          <AIConfidenceIndicator confidence={doc.confidence} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/90">
          {doc.summary}
        </p>
      </CardContent>
    </Card>
  );
}
