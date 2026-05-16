// src/routes/ai.tsx

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ai")({
  component: AIParentRoute,
});

function AIParentRoute() {
  return <Outlet />;
}