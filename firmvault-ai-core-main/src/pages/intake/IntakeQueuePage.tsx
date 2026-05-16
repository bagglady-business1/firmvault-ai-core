// src/pages/intake/IntakeQueuePage.tsx

import { FormEvent, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { intakeService } from "@/services/intakeService";

type IntakeRow = {
  id: string;
  client_name?: string;
  name?: string;
  client_email?: string;
  client_phone?: string;
  case_type?: string;
  matter_type?: string;
  matter?: string;
  source?: string;
  ai_risk_level?: string;
  risk?: string;
  intake_status?: string;
  summary?: string;
  created_at?: string;
  received_at?: string;
  received?: string;
};

type NewIntakeForm = {
  client_name: string;
  client_email: string;
  client_phone: string;
  case_type: string;
  summary: string;
};

const emptyForm: NewIntakeForm = {
  client_name: "",
  client_email: "",
  client_phone: "",
  case_type: "",
  summary: "",
};

export function IntakeQueuePage() {
  const [intakes, setIntakes] = useState<IntakeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<NewIntakeForm>(emptyForm);

  async function loadIntakes() {
    setLoading(true);

    try {
      const data = await intakeService.getAll();
      setIntakes(data as IntakeRow[]);
    } catch (error) {
      console.error("Failed to load intakes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIntakes();
  }, []);

  function updateForm(field: keyof NewIntakeForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.client_name.trim()) {
      return;
    }

    setCreating(true);

    try {
      const newIntake = await intakeService.create({
        client_name: form.client_name.trim(),
        client_email: form.client_email.trim() || null,
        client_phone: form.client_phone.trim() || null,
        case_type: form.case_type.trim() || "General",
        summary: form.summary.trim() || null,
        intake_status: "new",
        ai_risk_level: "low",
      });

      if (newIntake) {
        setForm(emptyForm);
        setModalOpen(false);
        await loadIntakes();
      }
    } catch (error) {
      console.error("Failed to create intake:", error);
    } finally {
      setCreating(false);
    }
  }

  const columns: Column<IntakeRow>[] = [
    {
      key: "id",
      header: "ID",
      render: (r) => (
        <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
      ),
    },
    {
      key: "client_name",
      header: "Client",
      render: (r) => (
        <Link
          to="/intake/$id"
          params={{ id: r.id }}
          className="font-medium text-foreground hover:text-primary"
        >
          {r.client_name || r.name || "Unnamed Client"}
        </Link>
      ),
    },
    {
      key: "case_type",
      header: "Matter Type",
      render: (r) => (
        <span className="text-muted-foreground">
          {r.case_type || r.matter_type || r.matter || "Not listed"}
        </span>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (r) => (
        <span className="text-muted-foreground">{r.source || "Manual"}</span>
      ),
    },
    {
      key: "risk",
      header: "AI Risk",
      render: (r) => {
        const risk = r.ai_risk_level || r.risk || "low";

        return (
          <StatusBadge
            label={`${risk} risk`}
            tone={
              risk === "high" || risk === "critical"
                ? "danger"
                : risk === "medium"
                  ? "warning"
                  : "success"
            }
          />
        );
      },
    },
    {
      key: "created_at",
      header: "Received",
      render: (r) => (
        <span className="text-xs text-muted-foreground">
          {r.created_at
            ? new Date(r.created_at).toLocaleDateString()
            : r.received_at
              ? new Date(r.received_at).toLocaleDateString()
              : r.received || "Not listed"}
        </span>
      ),
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Intake Queue"
        description="Triage incoming clients with AI-assisted conflict and risk screening."
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary"
          >
            New Intake
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading intakes...
        </div>
      ) : (
        <DataTable columns={columns} rows={intakes} />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="font-display text-lg font-semibold text-foreground">
                New Intake
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a new potential client intake to FirmVault.
              </p>
            </div>

            <form onSubmit={handleCreateIntake} className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Client Name *
                </label>
                <input
                  value={form.client_name}
                  onChange={(event) => updateForm("client_name", event.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </label>
                  <input
                    value={form.client_email}
                    onChange={(event) => updateForm("client_email", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="client@email.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Phone
                  </label>
                  <input
                    value={form.client_phone}
                    onChange={(event) => updateForm("client_phone", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                    placeholder="555-555-5555"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Matter Type
                </label>
                <input
                  value={form.case_type}
                  onChange={(event) => updateForm("case_type", event.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Civil, Family, PI, Contract, Criminal, etc."
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Intake Summary
                </label>
                <textarea
                  value={form.summary}
                  onChange={(event) => updateForm("summary", event.target.value)}
                  className="mt-1 min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Briefly describe the issue, concern, or case background."
                />
              </div>

              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setForm(emptyForm);
                  }}
                  className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creating ? "Saving..." : "Save Intake"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}