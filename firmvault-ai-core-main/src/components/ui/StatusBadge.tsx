import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const toneClass: Record<Tone, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  info: "bg-info/15 text-info border-info/30",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({
  label,
  tone = "neutral",
  pulse = false,
  className,
}: {
  label: string;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        toneClass[tone],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}
