import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockDocuments } from "@/lib/mock-data";

type D = (typeof mockDocuments)[number];

export function DocumentsLibraryPage() {
  const cols: Column<D>[] = [
    { key: "name", header: "Document", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "matter", header: "Matter", render: (r) => <span className="text-muted-foreground">{r.matter}</span> },
    { key: "tag", header: "Tag", render: (r) => <StatusBadge label={r.tag} tone="primary" /> },
    { key: "size", header: "Size", render: (r) => <span className="text-muted-foreground">{r.size}</span> },
    { key: "updated", header: "Updated", render: (r) => <span className="text-muted-foreground">{r.updated}</span> },
  ];
  return (
    <AppShell>
      <PageHeader
        title="Documents Library"
        description="Encrypted vault for pleadings, exhibits, contracts, and discovery materials."
        actions={<button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">Upload</button>}
      />
      <DataTable columns={cols} rows={mockDocuments} />
    </AppShell>
  );
}
