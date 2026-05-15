import { createFileRoute } from "@tanstack/react-router";
import { FirmSetupPage } from "@/pages/auth/FirmSetupPage";
export const Route = createFileRoute("/setup")({ component: FirmSetupPage });
