// src/routes/ai.intake-review.tsx

import { createFileRoute } from "@tanstack/react-router";
import AIIntakeReviewPage from "@/pages/ai/AIIntakeReviewPage";

export const Route = createFileRoute("/ai/intake-review")({
  component: AIIntakeReviewPage,
});