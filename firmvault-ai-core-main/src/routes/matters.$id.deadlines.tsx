import { createFileRoute } from "@tanstack/react-router";
import { MatterDeadlinesPage } from "@/pages/matters/MatterDeadlinesPage";
export const Route = createFileRoute("/matters/$id/deadlines")({ component: MatterDeadlinesPage });
