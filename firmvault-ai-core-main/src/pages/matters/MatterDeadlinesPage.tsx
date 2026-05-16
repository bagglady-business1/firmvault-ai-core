// src/pages/matters/MatterDeadlinesPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  deadlineService,
  type DeadlineRecord,
} from "@/services/deadlineService";

type NewDeadlineForm = {
  title: string;
  deadline_date: string;
  notes: string;
};

const emptyDeadlineForm: NewDeadlineForm = {
  title: "",
  deadline_date: "",
  notes: "",
};

export function MatterDeadlinesPage() {
  const { id } = useParams({ from: "/matters/$id/deadlines" });

  const [deadlines, setDeadlines] = useState<DeadlineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<NewDeadlineForm>(emptyDeadlineForm);

  async function loadDeadlines() {
    setLoading(true);

    try {
      const data = await deadlineService.getAll({ matterId: id });
      setDeadlines(data);
    } catch (error) {
      console.error("Failed to load matter deadlines:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeadlines();
  }, [id]);

  function updateForm(field: keyof NewDeadlineForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateDeadline() {
    if (!form.title.trim() || !form.deadline_date) return;

    setCreating(true);

    try {
      const created = await deadlineService.create({
        matter_id: id,
        title: form.title.trim(),
        deadline_date: form.deadline_date,
        notes: form.notes.trim() || null,
        status: "upcoming",
      });

      if (created) {
        setForm(emptyDeadlineForm);
        await loadDeadlines();
      }
    } catch (error) {
      console.error("Failed to create deadline:", error);
    } finally {
      setCreating(false);
    }
  }

  async function markComplete(deadline: DeadlineRecord) {
    const updated = await deadlineService.update(deadline.id, {
      status: deadline.status === "completed" ? "upcoming" : "completed",
    });

    if (updated) {
      await loadDeadlines();
    }
  }

  const cols: Column<DeadlineRecord>[] = [
    {
      key: "title",
      header: "Deadline",
      render: (r) => (
        <button
          onClick={() => markComplete(r)}
          className="text-left font-medium text-foreground hover:text-primary"
        >
          {r.title}
        </button>
      ),
    },
    {
      key: "deadline_date",
      header: "Due",
      render: (r) => (
        <span className="text-primary">
          {new Date(r.deadline_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={r.status || "upcoming"}
          tone={r.status === "completed" ? "success" : "warning"}
        />
      ),
    },
    {
      key: "notes",
      header: "Notes",
      render: (r) => (
        <span className="text-muted-foreground">{r.notes || "None"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-base font-semibold">
          Add Matter Deadline
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Deadline title"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-2"
          />

          <input
            type="date"
            value={form.deadline_date}
            onChange={(event) => updateForm("deadline_date", event.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <button
            onClick={handleCreateDeadline}
            disabled={creating}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? "Adding..." : "Add Deadline"}
          </button>

          <textarea
            value={form.notes}
            onChange={(event) => updateForm("notes", event.target.value)}
            placeholder="Notes, court rule, or deadline context"
            className="min-h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-4"
          />
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading deadlines...
        </div>
      ) : deadlines.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No deadlines yet for this matter.
        </div>
      ) : (
        <DataTable columns={cols} rows={deadlines} />
      )}
    </div>
  );
}