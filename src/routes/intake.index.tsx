import { createFileRoute } from "@tanstack/react-router";
import { IntakeQueuePage } from "@/pages/intake/IntakeQueuePage";
export const Route = createFileRoute("/intake/")({ component: IntakeQueuePage });
