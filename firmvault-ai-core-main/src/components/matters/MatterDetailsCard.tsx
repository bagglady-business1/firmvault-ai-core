import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Matter } from "@/data/mockMatters";

export function MatterDetailsCard({ matter }: { matter: Matter }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Key Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Incident Date
            </p>
            <p className="mt-0.5">{matter.incidentDate ?? "—"}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</p>
            <p className="mt-0.5">{matter.location ?? "—"}</p>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Parties Involved
          </p>
          <ul className="mt-1.5 space-y-1">
            {matter.parties.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Liability Summary
          </p>
          <p className="mt-1.5 rounded-md border border-border bg-background/40 p-3 text-xs leading-relaxed text-foreground/90">
            {matter.liabilitySummary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
