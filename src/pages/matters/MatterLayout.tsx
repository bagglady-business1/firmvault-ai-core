import { Link, Outlet, useParams, useRouterState } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/matters/$id", label: "Overview", end: true },
  { to: "/matters/$id/timeline", label: "Timeline" },
  { to: "/matters/$id/documents", label: "Documents" },
  { to: "/matters/$id/tasks", label: "Tasks" },
  { to: "/matters/$id/notes", label: "Notes" },
  { to: "/matters/$id/offers", label: "Offers" },
  { to: "/matters/$id/deadlines", label: "Deadlines" },
];

export function MatterLayout() {
  const { id } = useParams({ from: "/matters/$id" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AppShell>
      <PageHeader
        title={`Matter ${id}`}
        description="Hartwell v. Continental Holdings · Litigation · Discovery"
        actions={<StatusBadge label="Active · Discovery" tone="primary" pulse />}
      />
      <nav className="mb-6 flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
        {tabs.map((t) => {
          const href = t.to.replace("$id", id);
          const active = t.end ? pathname === href : pathname === href;
          return (
            <Link
              key={t.label}
              to={t.to}
              params={{ id }}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </AppShell>
  );
}
