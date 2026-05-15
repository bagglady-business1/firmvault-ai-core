import { createFileRoute } from "@tanstack/react-router";
import { DeadlineWatchPage } from "@/pages/deadlines/DeadlineWatchPage";
export const Route = createFileRoute("/deadlines")({ component: DeadlineWatchPage });
