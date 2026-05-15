import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockTasks } from "@/lib/mock-data";

type T = (typeof mockTasks)[number];

export function MatterTasksPage() {
  const cols: Column<T>[] = [
    { key: "title", header: "Task", render: (r) => <span className="font-medium">{r.title}</span> },
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
  return <DataTable columns={cols} rows={mockTasks} />;
}
