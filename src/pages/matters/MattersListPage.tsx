import { Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockMatters } from "@/lib/mock-data";

type M = (typeof mockMatters)[number];

export function MattersListPage() {
  const columns: Column<M>[] = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
    {
      key: "title",
      header: "Matter",
      render: (r) => (
        <Link to="/matters/$id" params={{ id: r.id }} className="font-medium text-foreground hover:text-primary">
          {r.title}
          <p className="text-xs font-normal text-muted-foreground">{r.client}</p>
        </Link>
      ),
    },
    { key: "stage", header: "Stage", render: (r) => <span className="text-muted-foreground">{r.stage}</span> },
    { key: "lead", header: "Lead", render: (r) => <span className="text-muted-foreground">{r.lead}</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={r.status}
          tone={r.status === "urgent" ? "danger" : r.status === "review" ? "warning" : "success"}
        />
      ),
    },
    { key: "updated", header: "Updated", render: (r) => <span className="text-xs text-muted-foreground">{r.updated}</span> },
  ];
  return (
    <AppShell>
      <PageHeader
        title="Matters"
        description="All active, pending, and archived matters across the firm."
        actions={<button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">New Matter</button>}
      />
      <DataTable columns={columns} rows={mockMatters} />
    </AppShell>
  );
}
