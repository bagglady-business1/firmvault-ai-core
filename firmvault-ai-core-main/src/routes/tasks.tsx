import { createFileRoute } from "@tanstack/react-router";
import { GlobalTasksPage } from "@/pages/tasks/GlobalTasksPage";
export const Route = createFileRoute("/tasks")({ component: GlobalTasksPage });
