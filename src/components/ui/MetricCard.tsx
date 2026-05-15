import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
  className,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  tone?: "default" | "primary" | "warning" | "danger";
  className?: string;
}) {
  const toneRing =
    tone === "primary"
      ? "ring-primary/30"
      : tone === "warning"
        ? "ring-warning/30"
        : tone === "danger"
          ? "ring-destructive/30"
          : "ring-border";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 ring-1 transition-all hover:border-primary/40",
        toneRing,
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-foreground">{value}</p>
          {delta && <p className="mt-1 text-xs text-muted-foreground">{delta}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-2 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
