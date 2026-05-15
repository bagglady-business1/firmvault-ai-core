import { createFileRoute } from "@tanstack/react-router";
import { MatterTimelinePage } from "@/pages/matters/MatterTimelinePage";
export const Route = createFileRoute("/matters/$id/timeline")({ component: MatterTimelinePage });
