import { Link, useParams } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Sparkles } from "lucide-react";

export function IntakeDetailPage() {
  const { id } = useParams({ from: "/intake/$id" });
  return (
    <AppShell>
      <PageHeader
        title={`Intake ${id}`}
        description="Conflict check, jurisdiction, and intake worksheet."
        actions={
          <Link to="/intake/$id/ai-review" params={{ id }} className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Run AI Review
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-base font-semibold">Client Worksheet</h2>
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            {[
              ["Full name", "Daniel Whitmore"],
              ["Matter type", "Personal Injury"],
              ["Jurisdiction", "NY · Kings County"],
              ["Source", "Web Form"],
              ["Phone", "+1 (212) 555-0184"],
              ["Email", "d.whitmore@example.com"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-display text-sm font-semibold">Conflict Check</h3>
            <StatusBadge label="No conflicts found" tone="success" pulse />
            <p className="mt-3 text-xs text-muted-foreground">Cross-checked against 1,204 active and closed matters.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-display text-sm font-semibold">Risk Signals</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Statute of limitations</span><StatusBadge label="14 days" tone="warning" /></li>
              <li className="flex justify-between"><span>Insurance coverage</span><StatusBadge label="Confirmed" tone="success" /></li>
              <li className="flex justify-between"><span>Document gaps</span><StatusBadge label="3 missing" tone="danger" /></li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
