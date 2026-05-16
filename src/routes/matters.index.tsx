import { createFileRoute } from "@tanstack/react-router";
import { MattersListPage } from "@/pages/matters/MattersListPage";
export const Route = createFileRoute("/matters/")({ component: MattersListPage });
