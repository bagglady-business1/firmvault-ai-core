// src/pages/matters/MatterTasksPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { taskService, type TaskRecord } from "@/services/taskService";

type NewTaskForm = {
  title: string;
  description: string;
  priority: string;
  due_date: string;
};

const emptyTaskForm: NewTaskForm = {
  title: "",
  description: "",
  priority: "normal",
  due_date: "",
};

export function MatterTasksPage() {
  const { id } = useParams({ from: "/matters/$id/tasks" });

  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<NewTaskForm>(emptyTaskForm);

  async function loadTasks() {
    setLoading(true);

    try {
      const data = await taskService.getAll({ matterId: id });
      setTasks(data);
    } catch (error) {
      console.error("Failed to load matter tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [id]);

  function updateForm(field: keyof NewTaskForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateTask() {
    if (!form.title.trim()) return;

    setCreating(true);

    try {
      const created = await taskService.create({
        matter_id: id,
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: form.priority || "normal",
        due_date: form.due_date || null,
        status: "pending",
      });

      if (created) {
        setForm(emptyTaskForm);
        await loadTasks();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setCreating(false);
    }
  }

  async function toggleTaskStatus(task: TaskRecord) {
    const nextStatus = task.status === "completed" ? "pending" : "completed";

    const updated = await taskService.update(task.id, {
      status: nextStatus,
    });

    if (updated) {
      await loadTasks();
    }
  }

  const cols: Column<TaskRecord>[] = [
    {
      key: "title",
      header: "Task",
      render: (r) => (
        <div>
          <button
            onClick={() => toggleTaskStatus(r)}
            className="text-left font-medium text-foreground hover:text-primary"
          >
            {r.title}
          </button>
          {r.description && (
            <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
          )}
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (r) => (
        <StatusBadge
          label={r.priority || "normal"}
          tone={
            r.priority === "high"
              ? "danger"
              : r.priority === "medium"
                ? "warning"
                : "neutral"
          }
        />
      ),
    },
    {
      key: "due_date",
      header: "Due",
      render: (r) => (
        <span className="text-muted-foreground">
          {r.due_date ? new Date(r.due_date).toLocaleDateString() : "Not set"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={r.status || "pending"}
          tone={r.status === "completed" ? "success" : "warning"}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-base font-semibold">
          Add Matter Task
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Task title"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-2"
          />

          <select
            value={form.priority}
            onChange={(event) => updateForm("priority", event.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={form.due_date}
            onChange={(event) => updateForm("due_date", event.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <textarea
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            placeholder="Task notes or instructions"
            className="min-h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-4"
          />

          <div className="md:col-span-4">
            <button
              onClick={handleCreateTask}
              disabled={creating}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No tasks yet for this matter.
        </div>
      ) : (
        <DataTable columns={cols} rows={tasks} />
      )}
    </div>
  );
}