import type { MatterStage, MatterStatus } from "@/data/mockMatters";

export function StatusBadge({ status }: { status: MatterStatus }) {
  const map: Record<MatterStatus, string> = {
    Active: "bg-success/15 text-success ring-success/30",
    Closed: "bg-muted text-muted-foreground ring-border",
    Archived: "bg-secondary text-secondary-foreground ring-border",
    "On Hold": "bg-warning/15 text-warning ring-warning/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${map[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function StageBadge({ stage }: { stage: MatterStage }) {
  const tone: Record<MatterStage, string> = {
    Intake: "bg-info/15 text-info ring-info/30",
    Investigation: "bg-info/15 text-info ring-info/30",
    "Pre-Litigation": "bg-accent/15 text-accent ring-accent/30",
    Litigation: "bg-accent/15 text-accent ring-accent/30",
    Negotiation: "bg-primary/15 text-primary ring-primary/30",
    "Trial Prep": "bg-warning/15 text-warning ring-warning/30",
    Trial: "bg-warning/15 text-warning ring-warning/30",
    Resolution: "bg-success/15 text-success ring-success/30",
    Closed: "bg-muted text-muted-foreground ring-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${tone[stage]}`}
    >
      {stage}
    </span>
  );
}
