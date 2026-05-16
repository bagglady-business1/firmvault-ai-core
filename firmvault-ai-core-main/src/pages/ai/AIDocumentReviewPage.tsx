import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIDocumentSummary } from "@/components/ai/document/AIDocumentSummary";
import { AIDocumentKeyPoints } from "@/components/ai/document/AIDocumentKeyPoints";
import { AISuggestedActions } from "@/components/ai/AISuggestedActions";
import { AIDisclaimer } from "@/components/ai/AIDisclaimer";
import { mockDocumentReviews } from "@/data/mockAIReviews";

export default function AIDocumentReviewPage() {
  const [selectedId, setSelectedId] = useState(mockDocumentReviews[0].id);
  const doc =
    mockDocumentReviews.find((d) => d.id === selectedId) ??
    mockDocumentReviews[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            AI Review
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            AI Document Review
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated document summary and flagged issues. Attorney should
            verify against the source document.
          </p>
        </div>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="h-10 w-[340px]">
            <SelectValue placeholder="Select document" />
          </SelectTrigger>
          <SelectContent>
            {mockDocumentReviews.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.documentName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AIDisclaimer />

      <AIDocumentSummary doc={doc} />
      <AIDocumentKeyPoints doc={doc} />
      <AISuggestedActions
        actions={doc.suggestedActions}
        title="Suggested follow-up actions"
      />
    </div>
  );
}
