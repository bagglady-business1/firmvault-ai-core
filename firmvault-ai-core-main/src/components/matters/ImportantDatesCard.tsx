import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Gavel, Handshake, FileSearch, Clock } from "lucide-react";
import type { ImportantDate, Matter } from "@/data/mockMatters";

const iconMap: Record<ImportantDate["type"], any> = {
  court: Gavel,
  mediation: Handshake,
  discovery: FileSearch,
  trial: CalendarDays,
  deadline: Clock,
};

const toneMap: Record<ImportantDate["type"], string> = {
  court: "text-accent bg-accent/15 ring-accent/30",
  mediation: "text-primary bg-primary/15 ring-primary/30",
  discovery: "text-info bg-info/15 ring-info/30",
  trial: "text-warning bg-warning/15 ring-warning/30",
  deadline: "text-foreground bg-secondary ring-border",
};

export function ImportantDatesCard({ matter }: { matter: Matter }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Important Dates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {matter.importantDates.map((d) => {
          const Icon = iconMap[d.type];
          return (
            <div
              key={d.label + d.date}
              className="flex items-center gap-3 rounded-md border border-border/60 bg-secondary/30 p-2.5"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-md ring-1 ${toneMap[d.type]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm truncate">{d.label}</p>
                <p className="text-[11px] text-muted-foreground capitalize">{d.type}</p>
              </div>
              <span className="text-xs font-medium tabular-nums">{d.date}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
