import { Clock, CalendarClock, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIRiskFlagCard } from "../AIRiskFlagCard";
import type { DeadlineAlert } from "@/data/mockAIReviews";

interface AIDeadlineAlertsProps {
  alerts: DeadlineAlert[];
}

const groupMeta = {
  urgent: {
    title: "Urgent",
    icon: Clock,
    accent: "text-red-300 border-red-500/30 bg-red-500/5",
  },
  upcoming: {
    title: "Upcoming",
    icon: CalendarClock,
    accent: "text-amber-200 border-amber-500/30 bg-amber-500/5",
  },
  informational: {
    title: "Informational",
    icon: Info,
    accent: "text-sky-200 border-sky-500/30 bg-sky-500/5",
  },
} as const;

export function AIDeadlineAlerts({ alerts }: AIDeadlineAlertsProps) {
  const groups = (["urgent", "upcoming", "informational"] as const).map((g) => ({
    key: g,
    items: alerts.filter((a) => a.group === g),
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {groups.map(({ key, items }) => {
        const meta = groupMeta[key];
        const Icon = meta.icon;
        return (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {meta.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {items.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No items in this group.
                </p>
              ) : (
                items.map((a) => (
                  <div
                    key={a.id}
                    className={`space-y-1.5 rounded-lg border px-3 py-2 ${meta.accent}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {a.label}
                      </p>
                      <AIRiskFlagCard risk={a.risk} size="sm" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {a.matterCaption} · {a.date}
                    </p>
                    <p className="text-xs text-foreground/80">{a.note}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
