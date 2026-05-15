import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockOffers } from "@/lib/mock-data";

type O = (typeof mockOffers)[number];

export function MatterOffersPage() {
  const cols: Column<O>[] = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
    { key: "party", header: "Party", render: (r) => <span className="font-medium">{r.party}</span> },
    { key: "amount", header: "Amount", render: (r) => <span className="font-display text-foreground">{r.amount}</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge label={r.status} tone={r.status === "countered" ? "warning" : "info"} />,
    },
    { key: "updated", header: "Updated", render: (r) => <span className="text-muted-foreground">{r.updated}</span> },
  ];
  return <DataTable columns={cols} rows={mockOffers} />;
}
