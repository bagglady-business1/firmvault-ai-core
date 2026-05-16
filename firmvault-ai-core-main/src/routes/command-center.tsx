import { createFileRoute } from "@tanstack/react-router";
import { CommandCenterPage } from "@/pages/command/CommandCenterPage";
export const Route = createFileRoute("/command-center")({ component: CommandCenterPage });
