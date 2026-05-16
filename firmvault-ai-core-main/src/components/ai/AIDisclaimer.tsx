import { ShieldAlert } from "lucide-react";
import { DISCLAIMER } from "@/data/mockAIReviews";
import { cn } from "@/lib/utils";

interface AIDisclaimerProps {
  className?: string;
  variant?: "inline" | "panel";
}

/**
 * Mandatory disclaimer shown on every AI panel.
 */
export function AIDisclaimer({ className, variant = "panel" }: AIDisclaimerProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-lg border text-xs leading-relaxed",
        variant === "panel"
          ? "border-amber-500/30 bg-amber-500/5 px-3 py-2 text-amber-200/90"
          : "border-transparent bg-transparent px-0 py-1 text-muted-foreground",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
      <span>{DISCLAIMER}</span>
    </div>
  );
}
