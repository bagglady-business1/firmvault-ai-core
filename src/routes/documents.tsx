import { createFileRoute } from "@tanstack/react-router";
import { DocumentsLibraryPage } from "@/pages/documents/DocumentsLibraryPage";
export const Route = createFileRoute("/documents")({ component: DocumentsLibraryPage });
