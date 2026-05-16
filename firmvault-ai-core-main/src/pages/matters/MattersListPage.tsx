// src/pages/matters/MattersListPage.tsx

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { matterService, type MatterRecord } from "@/services/matterService";

export function MattersListPage() {
  const [matters, setMatters] = useState<MatterRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatters() {
      try {
        const data = await matterService.getAll();
        setMatters(data);
      } catch (error) {
        console.error("Failed to load matters:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMatters();
  }, []);

  const columns: Column<MatterRecord>[] = [
    {
      key: "id",
      header: "ID",
      render: (r) => (
        <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
      ),
    },
    {
      key: "matter_name",
      header: "Matter",
      render: (r) => (
        <Link
          to="/matters/$id/timeline"
          params={{ id: r.id }}
          className="font-medium text-foreground hover:text-primary"
        >
          {r.matter_name || "Untitled Matter"}
          <p className="text-xs font-normal text-muted-foreground">
            {r.client_name || "Client not listed"}
          </p>
        </Link>
      ),
    },
    {
      key: "case_type",
      header: "Case Type",
      render: (r) => (
        <span className="text-muted-foreground">
          {r.case_type || "General"}
        </span>
      ),
    },
    {
      key: "matter_status",
      header: "Status",
      render: (r) => {
        const status = r.matter_status || "active";

        return (
          <StatusBadge
            label={status}
            tone={
              status === "urgent"
                ? "danger"
                : status === "review"
                  ? "warning"
                  : "success"
            }
          />
        );
      },
    },
    {
      key: "created_at",
      header: "Created",
      render: (r) => (
        <span className="text-xs text-muted-foreground">
          {r.created_at ? new Date(r.created_at).toLocaleDateString() : "Not listed"}
        </span>
      ),
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Matters"
        description="All active, pending, and archived matters across the firm."
        actions={
          <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">
            New Matter
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading matters...
        </div>
      ) : (
        <DataTable columns={columns} rows={matters} />
      )}
    </AppShell>
  );
}