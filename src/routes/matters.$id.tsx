import { createFileRoute } from "@tanstack/react-router";
import { MatterLayout } from "@/pages/matters/MatterLayout";
export const Route = createFileRoute("/matters/$id")({ component: MatterLayout });
