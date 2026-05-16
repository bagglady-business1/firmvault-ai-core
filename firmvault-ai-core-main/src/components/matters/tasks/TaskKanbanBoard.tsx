import { MatterTask, TaskStatus } from "@/data/mockMatterTabsData";
import { PRIORITY_COLOR } from "./TaskTable";

const COLUMNS: TaskStatus[] = ["To Do", "In Progress", "In Review", "Completed"];

export function TaskKanbanBoard({ tasks }: { tasks: MatterTask[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col);
        return (
          <div key={col} className="rounded-xl border border-border bg-card/40 p-3">
            <div className="flex items-center justify-between px-1 pb-3">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground">{col}</h4>
              <span className="text-xs text-muted-foreground">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((t) => (
                <div key={t.id} className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t.assignedTo}</span>
                    <span>{t.dueDate}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] ${PRIORITY_COLOR[t.priority]}`}>{t.priority}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="rounded-lg border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
                  Nothing here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
