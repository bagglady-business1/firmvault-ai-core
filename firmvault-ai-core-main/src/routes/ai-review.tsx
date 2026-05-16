// src/routes/ai-review.tsx

import { createFileRoute } from "@tanstack/react-router";
import AIReviewCenterPage from "@/pages/ai/AIReviewCenterPage";

export const Route = createFileRoute("/ai-review")({
  component: AIReviewCenterPage,
});