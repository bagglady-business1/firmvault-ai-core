import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Matter } from "@/data/mockMatters";

export function MatterTeamCard({ matter }: { matter: Matter }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Assigned Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {matter.team.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 rounded-md border border-border/60 bg-secondary/30 p-2.5"
          >
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary ring-1 ring-primary/30">
                {m.initials}
              </div>
              <span
                className={[
                  "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                  m.status === "active" ? "bg-success" : "bg-muted-foreground/60",
                ].join(" ")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm truncate">{m.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{m.role}</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {m.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
