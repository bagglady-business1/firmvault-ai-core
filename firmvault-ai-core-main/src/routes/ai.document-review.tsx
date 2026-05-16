// src/routes/ai.document-review.tsx

import { createFileRoute } from "@tanstack/react-router";
import AIDocumentReviewPage from "@/pages/ai/AIDocumentReviewPage";

export const Route = createFileRoute("/ai/document-review")({
  component: AIDocumentReviewPage,
});