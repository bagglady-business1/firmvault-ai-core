import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockDeadlines } from "@/lib/mock-data";

type D = (typeof mockDeadlines)[number];

export function DeadlineWatchPage() {
  const cols: Column<D>[] = [
    { key: "matter", header: "Matter", render: (r) => <span className="font-medium">{r.matter}</span> },
    { key: "task", header: "Task", render: (r) => <span className="text-foreground">{r.task}</span> },
    { key: "due", header: "Due", render: (r) => <span className="text-primary">{r.due}</span> },
    {
      key: "priority",
      header: "Priority",
      render: (r) => (
        <StatusBadge
          label={r.priority}
          tone={r.priority === "critical" ? "danger" : r.priority === "high" ? "warning" : "info"}
          pulse={r.priority === "critical"}
        />
      ),
    },
  ];
  return (
    <AppShell>
      <PageHeader title="Deadline Watch" description="Court-aware deadlines, statutes, and reminders across all matters." />
      <DataTable columns={cols} rows={mockDeadlines} />
    </AppShell>
  );
}
