import { cn } from "@/lib/utils";
import type { Confidence } from "@/data/mockAIReviews";

interface AIConfidenceIndicatorProps {
  confidence: Confidence;
  className?: string;
  showLabel?: boolean;
}

const map: Record<Confidence, { label: string; bars: number; color: string }> = {
  low: { label: "Low confidence", bars: 1, color: "bg-amber-400" },
  medium: { label: "Medium confidence", bars: 2, color: "bg-sky-400" },
  high: { label: "High confidence", bars: 3, color: "bg-primary" },
};

export function AIConfidenceIndicator({
  confidence,
  className,
  showLabel = true,
}: AIConfidenceIndicatorProps) {
  const cfg = map[confidence];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-end gap-0.5" aria-label={cfg.label}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "w-1 rounded-sm",
              i === 1 ? "h-2" : i === 2 ? "h-3" : "h-4",
              i <= cfg.bars ? cfg.color : "bg-muted",
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{cfg.label}</span>
      )}
    </div>
  );
}
