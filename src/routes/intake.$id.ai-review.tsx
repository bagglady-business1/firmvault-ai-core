import { createFileRoute } from "@tanstack/react-router";
import { AIIntakeReviewPage } from "@/pages/intake/AIIntakeReviewPage";
export const Route = createFileRoute("/intake/$id/ai-review")({ component: AIIntakeReviewPage });
