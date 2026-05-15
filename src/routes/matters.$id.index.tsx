import { createFileRoute } from "@tanstack/react-router";
import { MatterOverviewPage } from "@/pages/matters/MatterOverviewPage";
export const Route = createFileRoute("/matters/$id/")({ component: MatterOverviewPage });
