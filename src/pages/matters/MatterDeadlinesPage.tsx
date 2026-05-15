import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockDeadlines } from "@/lib/mock-data";

type D = (typeof mockDeadlines)[number];

export function MatterDeadlinesPage() {
  const cols: Column<D>[] = [
    { key: "task", header: "Task", render: (r) => <span className="font-medium">{r.task}</span> },
    { key: "due", header: "Due", render: (r) => <span className="text-primary">{r.due}</span> },
    {
      key: "priority",
      header: "Priority",
      render: (r) => (
        <StatusBadge
          label={r.priority}
          tone={r.priority === "critical" ? "danger" : r.priority === "high" ? "warning" : "info"}
        />
      ),
    },
  ];
  return <DataTable columns={cols} rows={mockDeadlines} />;
}
