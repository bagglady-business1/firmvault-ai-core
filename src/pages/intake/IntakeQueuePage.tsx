import { Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockIntakes } from "@/lib/mock-data";

type Intake = (typeof mockIntakes)[number];

export function IntakeQueuePage() {
  const columns: Column<Intake>[] = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
    {
      key: "name",
      header: "Client",
      render: (r) => (
        <Link to="/intake/$id" params={{ id: r.id }} className="font-medium text-foreground hover:text-primary">
          {r.name}
        </Link>
      ),
    },
    { key: "matter", header: "Matter Type", render: (r) => <span className="text-muted-foreground">{r.matter}</span> },
    { key: "source", header: "Source", render: (r) => <span className="text-muted-foreground">{r.source}</span> },
    {
      key: "risk",
      header: "AI Risk",
      render: (r) => (
        <StatusBadge
          label={`${r.risk} risk`}
          tone={r.risk === "high" ? "danger" : r.risk === "medium" ? "warning" : "success"}
        />
      ),
    },
    { key: "received", header: "Received", render: (r) => <span className="text-xs text-muted-foreground">{r.received}</span> },
  ];
  return (
    <AppShell>
      <PageHeader
        title="Intake Queue"
        description="Triage incoming clients with AI-assisted conflict and risk screening."
        actions={<button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">New Intake</button>}
      />
      <DataTable columns={columns} rows={mockIntakes} />
    </AppShell>
  );
}
