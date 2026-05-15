import { createFileRoute } from "@tanstack/react-router";
import { FirmUsersPage } from "@/pages/firm/FirmUsersPage";
export const Route = createFileRoute("/firm-users")({ component: FirmUsersPage });
