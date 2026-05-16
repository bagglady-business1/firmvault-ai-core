// src/routes/ai.matter-review.tsx

import { createFileRoute } from "@tanstack/react-router";
import AIMatterReviewPage from "@/pages/ai/AIMatterReviewPage";

export const Route = createFileRoute("/ai/matter-review")({
  component: AIMatterReviewPage,
});