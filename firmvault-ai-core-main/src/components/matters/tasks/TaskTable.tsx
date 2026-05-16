import { MatterTask, TaskPriority, TaskStatus } from "@/data/mockMatterTabsData";

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  Low: "bg-muted text-muted-foreground border-border",
  Medium: "bg-info/15 text-info border-info/30",
  High: "bg-warning/15 text-warning border-warning/30",
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
};

const STATUS_COLOR: Record<TaskStatus, string> = {
  "To Do": "bg-muted text-muted-foreground border-border",
  "In Progress": "bg-info/15 text-info border-info/30",
  "In Review": "bg-secondary/20 text-secondary-foreground border-secondary/40",
  Completed: "bg-success/15 text-success border-success/30",
};

export function TaskTable({ tasks, onComplete }: { tasks: MatterTask[]; onComplete: (id: string) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3">Task</th>
            <th className="text-left font-medium px-4 py-3">Assignee</th>
            <th className="text-left font-medium px-4 py-3">Due</th>
            <th className="text-left font-medium px-4 py-3">Priority</th>
            <th className="text-left font-medium px-4 py-3">Status</th>
            <th className="text-right font-medium px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-t border-border hover:bg-muted/20">
              <td className="px-4 py-3 font-medium">{t.title}</td>
              <td className="px-4 py-3">{t.assignedTo}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.dueDate}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${PRIORITY_COLOR[t.priority]}`}>{t.priority}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_COLOR[t.status]}`}>{t.status}</span>
              </td>
              <td className="px-4 py-3 text-right">
                {t.status !== "Completed" ? (
                  <button onClick={() => onComplete(t.id)} className="text-xs text-primary hover:underline">
                    Mark complete
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">Done</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { PRIORITY_COLOR, STATUS_COLOR };
