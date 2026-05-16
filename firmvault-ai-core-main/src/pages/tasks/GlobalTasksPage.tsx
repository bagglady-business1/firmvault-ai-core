import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockTasks } from "@/lib/mock-data";

type T = (typeof mockTasks)[number];

export function GlobalTasksPage() {
  const cols: Column<T>[] = [
    { key: "title", header: "Task", render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "matter", header: "Matter", render: (r) => <span className="text-muted-foreground">{r.matter}</span> },
    { key: "assignee", header: "Assignee", render: (r) => <span className="text-muted-foreground">{r.assignee}</span> },
    { key: "due", header: "Due", render: (r) => <span className="text-muted-foreground">{r.due}</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={r.status.replace("_", " ")}
          tone={r.status === "in_progress" ? "info" : r.status === "review" ? "warning" : "neutral"}
        />
      ),
    },
  ];
  return (
    <AppShell>
      <PageHeader title="Tasks" description="Cross-matter task tracker for the firm." />
      <DataTable columns={cols} rows={mockTasks} />
    </AppShell>
  );
}
