import { TimelineEventType } from "@/data/mockMatterTabsData";

const TYPES: (TimelineEventType | "All")[] = ["All", "Document", "Note", "Task", "Deadline", "Court", "Assignment", "System"];

export function TimelineFilterBar({
  active,
  onChange,
}: {
  active: TimelineEventType | "All";
  onChange: (t: TimelineEventType | "All") => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TYPES.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            active === t
              ? "border-primary bg-primary/15 text-primary"
              : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
