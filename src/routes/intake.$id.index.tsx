import { createFileRoute } from "@tanstack/react-router";
import { IntakeDetailPage } from "@/pages/intake/IntakeDetailPage";
export const Route = createFileRoute("/intake/$id/")({ component: IntakeDetailPage });
