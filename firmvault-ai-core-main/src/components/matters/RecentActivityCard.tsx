import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, StickyNote, CheckCircle2, Clock } from "lucide-react";
import type { ActivityItem, Matter } from "@/data/mockMatters";

const iconMap: Record<ActivityItem["type"], any> = {
  document: FileText,
  note: StickyNote,
  task: CheckCircle2,
  deadline: Clock,
};

export function RecentActivityCard({ matter }: { matter: Matter }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-4 border-l border-border pl-5">
          {matter.activity.map((a, i) => {
            const Icon = iconMap[a.type];
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] flex h-5 w-5 items-center justify-center rounded-full bg-card ring-2 ring-border">
                  <Icon className="h-3 w-3 text-primary" />
                </span>
                <p className="text-sm text-foreground">{a.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {a.who} · {a.when}
                </p>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
