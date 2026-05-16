import { createFileRoute } from "@tanstack/react-router";
import { MatterTasksPage } from "@/pages/matters/MatterTasksPage";
export const Route = createFileRoute("/matters/$id/tasks")({ component: MatterTasksPage });
