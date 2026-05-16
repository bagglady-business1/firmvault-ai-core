import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/data/mockAIReviews";

interface AIRiskFlagCardProps {
  risk: RiskLevel;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

const riskConfig: Record<
  RiskLevel,
  { label: string; icon: typeof AlertTriangle; classes: string }
> = {
  high: {
    label: "High Risk",
    icon: AlertTriangle,
    classes: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  medium: {
    label: "Medium Risk",
    icon: AlertCircle,
    classes: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  },
  low: {
    label: "Low Risk",
    icon: CheckCircle2,
    classes: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
};

export function AIRiskFlagCard({
  risk,
  label,
  className,
  size = "md",
}: AIRiskFlagCardProps) {
  const cfg = riskConfig[risk];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        cfg.classes,
        className,
      )}
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      {label ?? cfg.label}
    </span>
  );
}
