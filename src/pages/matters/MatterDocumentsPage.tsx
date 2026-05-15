import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockDocuments } from "@/lib/mock-data";

type D = (typeof mockDocuments)[number];

export function MatterDocumentsPage() {
  const cols: Column<D>[] = [
    { key: "name", header: "Document", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "tag", header: "Tag", render: (r) => <StatusBadge label={r.tag} tone="primary" /> },
    { key: "size", header: "Size", render: (r) => <span className="text-muted-foreground">{r.size}</span> },
    { key: "updated", header: "Updated", render: (r) => <span className="text-muted-foreground">{r.updated}</span> },
  ];
  return <DataTable columns={cols} rows={mockDocuments} />;
}
