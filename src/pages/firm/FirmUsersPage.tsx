import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mockFirmUsers } from "@/lib/mock-data";

type U = (typeof mockFirmUsers)[number];

export function FirmUsersPage() {
  const cols: Column<U>[] = [
    {
      key: "name",
      header: "User",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
            {r.name.split(" ").map((p) => p[0]).join("")}
          </div>
          <div>
            <p className="font-medium">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (r) => <span className="text-muted-foreground">{r.role}</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge label={r.status} tone={r.status === "active" ? "success" : "warning"} pulse={r.status === "active"} />,
    },
  ];
  return (
    <AppShell>
      <PageHeader
        title="Firm Users"
        description="Manage attorneys, paralegals, and admins. Roles, MFA, and access controls."
        actions={<button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">Invite User</button>}
      />
      <DataTable columns={cols} rows={mockFirmUsers} />
    </AppShell>
  );
}
