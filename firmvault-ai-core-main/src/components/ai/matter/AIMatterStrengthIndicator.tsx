import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AIMatterStrengthIndicatorProps {
  strength: number; // 0-100
  label?: string;
}

export function AIMatterStrengthIndicator({
  strength,
  label = "Case strength indicator",
}: AIMatterStrengthIndicatorProps) {
  const band =
    strength >= 70
      ? { text: "Possibly strong", color: "text-emerald-300" }
      : strength >= 50
        ? { text: "Mixed / requires review", color: "text-amber-300" }
        : { text: "Possibly weak", color: "text-red-300" };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight text-foreground">
            {strength}
            <span className="text-base font-normal text-muted-foreground">
              /100
            </span>
          </span>
          <span className={cn("text-xs font-medium", band.color)}>
            {band.text}
          </span>
        </div>
        <Progress value={strength} className="h-2" />
        <p className="text-[11px] text-muted-foreground">
          Illustrative score based on available facts; outcomes cannot be
          predicted and attorney should review.
        </p>
      </CardContent>
    </Card>
  );
}
