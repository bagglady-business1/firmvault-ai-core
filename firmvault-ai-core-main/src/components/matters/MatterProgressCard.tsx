import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Matter } from "@/data/mockMatters";
import { MATTER_STAGES } from "@/data/mockMatters";

export function MatterProgressCard({ matter }: { matter: Matter }) {
  const currentIdx = MATTER_STAGES.indexOf(matter.stage);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Case Progress</CardTitle>
        <span className="text-xs text-muted-foreground">
          {matter.progressPercent}% complete
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
            style={{ width: `${matter.progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-9 gap-1">
          {MATTER_STAGES.map((stage, i) => {
            const reached = i <= currentIdx;
            const current = i === currentIdx;
            return (
              <div key={stage} className="flex flex-col items-center gap-1.5">
                <div
                  className={[
                    "h-2 w-full rounded-sm",
                    current
                      ? "bg-primary shadow-[0_0_8px] shadow-primary/50"
                      : reached
                      ? "bg-primary/60"
                      : "bg-secondary",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-[9px] leading-tight text-center",
                    current ? "text-primary font-medium" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
