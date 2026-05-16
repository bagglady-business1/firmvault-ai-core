import { TimelineEvent, TimelineEventType } from "@/data/mockMatterTabsData";
import { FileText, NotebookPen, CheckSquare, AlarmClock, Gavel, UserPlus, Cog } from "lucide-react";

const TYPE_META: Record<TimelineEventType, { color: string; Icon: typeof FileText }> = {
  Document: { color: "bg-info/15 text-info border-info/30", Icon: FileText },
  Note: { color: "bg-secondary/20 text-secondary-foreground border-secondary/40", Icon: NotebookPen },
  Task: { color: "bg-primary/15 text-primary border-primary/30", Icon: CheckSquare },
  Deadline: { color: "bg-destructive/15 text-destructive border-destructive/30", Icon: AlarmClock },
  Court: { color: "bg-warning/15 text-warning border-warning/30", Icon: Gavel },
  Assignment: { color: "bg-accent/20 text-accent-foreground border-accent/30", Icon: UserPlus },
  System: { color: "bg-muted text-muted-foreground border-border", Icon: Cog },
};

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const meta = TYPE_META[event.type];
  const date = new Date(event.date);
  return (
    <div className="relative pl-10">
      <span className="absolute left-3 top-2 size-3 rounded-full bg-primary ring-4 ring-background" />
      <div className="rounded-xl border border-border bg-card/60 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${meta.color}`}>
            <meta.Icon className="size-3" /> {event.type}
          </span>
          <span className="text-muted-foreground">
            {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} ·{" "}
            {date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
          </span>
          <span className="text-muted-foreground">· {event.user}</span>
        </div>
        <h4 className="mt-2 text-sm font-semibold">{event.title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
      </div>
    </div>
  );
}

export { TYPE_META as TIMELINE_TYPE_META };
