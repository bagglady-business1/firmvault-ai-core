import { MatterDeadline, DeadlineStatus } from "@/data/mockMatterTabsData";
import { AlertTriangle, AlarmClock, CheckCircle2 } from "lucide-react";

const STATUS_COLOR: Record<DeadlineStatus, string> = {
  Open: "bg-info/15 text-info border-info/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  Completed: "bg-success/15 text-success border-success/30",
};

export interface DeadlineGroup {
  label: string;
  urgency: "overdue" | "week" | "month" | "upcoming";
  items: MatterDeadline[];
}

const URGENCY_STYLE: Record<DeadlineGroup["urgency"], { ring: string; chip: string; Icon: typeof AlarmClock }> = {
  overdue: { ring: "border-destructive/40", chip: "bg-destructive/15 text-destructive border-destructive/30", Icon: AlertTriangle },
  week: { ring: "border-warning/40", chip: "bg-warning/15 text-warning border-warning/30", Icon: AlarmClock },
  month: { ring: "border-info/40", chip: "bg-info/15 text-info border-info/30", Icon: AlarmClock },
  upcoming: { ring: "border-border", chip: "bg-muted text-muted-foreground border-border", Icon: CheckCircle2 },
};

export function DeadlinesTable({ groups }: { groups: DeadlineGroup[] }) {
  return (
    <div className="space-y-5">
      {groups.map((g) => {
        const style = URGENCY_STYLE[g.urgency];
        return (
          <div key={g.label} className={`rounded-xl border bg-card/40 ${style.ring}`}>
            <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${style.chip}`}>
                  <style.Icon className="size-3" /> {g.label}
                </span>
                <span className="text-xs text-muted-foreground">{g.items.length} deadline{g.items.length === 1 ? "" : "s"}</span>
              </div>
            </div>
            {g.items.length === 0 ? (
              <div className="px-5 py-4 text-sm text-muted-foreground">Nothing in this window.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left font-medium px-5 py-2.5">Title</th>
                    <th className="text-left font-medium px-4 py-2.5">Type</th>
                    <th className="text-left font-medium px-4 py-2.5">Due</th>
                    <th className="text-left font-medium px-4 py-2.5">Assignee</th>
                    <th className="text-left font-medium px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {g.items.map((d) => (
                    <tr key={d.id} className="border-t border-border hover:bg-muted/20">
                      <td className="px-5 py-3 font-medium">{d.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.dueDate}</td>
                      <td className="px-4 py-3">{d.assignedTo}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_COLOR[d.status]}`}>{d.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}
