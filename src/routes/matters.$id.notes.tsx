import { createFileRoute } from "@tanstack/react-router";
import { MatterNotesPage } from "@/pages/matters/MatterNotesPage";
export const Route = createFileRoute("/matters/$id/notes")({ component: MatterNotesPage });
