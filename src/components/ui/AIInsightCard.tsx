import { Sparkles, AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Severity = "low" | "medium" | "high" | "critical";

const sevConfig: Record<Severity, { tone: string; icon: typeof Sparkles; label: string }> = {
  low: { tone: "border-info/30 bg-info/5 text-info", icon: Info, label: "Low" },
  medium: { tone: "border-warning/30 bg-warning/5 text-warning", icon: Sparkles, label: "Medium" },
  high: { tone: "border-destructive/30 bg-destructive/5 text-destructive", icon: AlertTriangle, label: "High" },
  critical: { tone: "border-destructive/50 bg-destructive/10 text-destructive", icon: ShieldAlert, label: "Critical" },
};

export function AIInsightCard({
  title,
  matter,
  summary,
  severity = "medium",
  className,
}: {
  title: string;
  matter: string;
  summary: string;
  severity?: Severity;
  className?: string;
}) {
  const cfg = sevConfig[severity];
  const Icon = cfg.icon;
  return (
    <div className={cn("rounded-xl border bg-card p-4 transition-all hover:border-primary/40", className)}>
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg border p-2", cfg.tone)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-foreground truncate">{title}</p>
            <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", cfg.tone)}>
              {cfg.label}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{matter}</p>
          <p className="mt-2 text-sm text-foreground/80">{summary}</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <button className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 font-medium text-primary hover:bg-primary/20">
              Review
            </button>
            <button className="rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:bg-muted">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
