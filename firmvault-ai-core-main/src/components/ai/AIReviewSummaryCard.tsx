import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AIReviewSummaryCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "default" | "warning" | "danger" | "success";
  hint?: string;
}

const toneMap = {
  default: "text-primary bg-primary/10 border-primary/20",
  warning: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  danger: "text-red-300 bg-red-500/10 border-red-500/20",
  success: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
} as const;

export function AIReviewSummaryCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  hint,
}: AIReviewSummaryCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border",
            toneMap[tone],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {hint && (
            <p className="mt-0.5 text-[11px] text-muted-foreground/80">{hint}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
