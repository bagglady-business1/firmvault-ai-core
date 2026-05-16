// src/routes/ai.deadlines.tsx

import { createFileRoute } from "@tanstack/react-router";
import AIDeadlineInsightsPage from "@/pages/ai/AIDeadlineInsightsPage";

export const Route = createFileRoute("/ai/deadlines")({
  component: AIDeadlineInsightsPage,
});