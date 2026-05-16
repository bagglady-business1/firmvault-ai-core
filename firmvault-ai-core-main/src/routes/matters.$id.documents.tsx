import { createFileRoute } from "@tanstack/react-router";
import { MatterDocumentsPage } from "@/pages/matters/MatterDocumentsPage";
export const Route = createFileRoute("/matters/$id/documents")({ component: MatterDocumentsPage });
