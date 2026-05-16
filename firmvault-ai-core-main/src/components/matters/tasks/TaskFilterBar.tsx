import { TaskPriority, TaskStatus } from "@/data/mockMatterTabsData";

export function TaskFilterBar({
  status,
  priority,
  onStatus,
  onPriority,
}: {
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
  onStatus: (s: TaskStatus | "All") => void;
  onPriority: (p: TaskPriority | "All") => void;
}) {
  const STATUSES: (TaskStatus | "All")[] = ["All", "To Do", "In Progress", "In Review", "Completed"];
  const PRIORITIES: (TaskPriority | "All")[] = ["All", "Low", "Medium", "High", "Critical"];
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Status</span>
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => onStatus(s)}
              className={`rounded-full border px-2.5 py-1 text-xs ${
                status === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Priority</span>
        <div className="flex flex-wrap gap-1">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              onClick={() => onPriority(p)}
              className={`rounded-full border px-2.5 py-1 text-xs ${
                priority === p ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
