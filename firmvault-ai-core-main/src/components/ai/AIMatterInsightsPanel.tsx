// src/components/ai/AIMatterInsightsPanel.tsx

import { Card } from "@/components/ui/card";
import { Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";

type AIMatterInsightsPanelProps = {
  insights?: {
    liabilityStrength?: string;
    damagesRange?: string;
    caseStrength?: string;
    riskLevel?: string;
    keyFlags?: string[];
    suggestedNextActions?: string[];
  };
};

export function AIMatterInsightsPanel({ insights }: AIMatterInsightsPanelProps) {
  const flags = insights?.keyFlags ?? [
    "Possible liability issue should be verified.",
    "Missing documents may affect review.",
    "Upcoming deadline should be confirmed by attorney.",
  ];

  const actions = insights?.suggestedNextActions ?? [
    "Review intake details.",
    "Confirm all deadlines.",
    "Request missing documents.",
  ];

  return (
    <Card className="bg-card border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <div>
          <h3 className="text-base font-semibold">AI Matter Insights</h3>
          <p className="text-xs text-muted-foreground">
            Attorney support summary only
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3 mb-4">
        <div className="rounded-md border border-border/60 bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Liability
          </p>
          <p className="mt-1 text-sm font-semibold">
            {insights?.liabilityStrength ?? "Needs Review"}
          </p>
        </div>

        <div className="rounded-md border border-border/60 bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Damages
          </p>
          <p className="mt-1 text-sm font-semibold">
            {insights?.damagesRange ?? "Not Estimated"}
          </p>
        </div>

        <div className="rounded-md border border-border/60 bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Risk
          </p>
          <p className="mt-1 text-sm font-semibold text-warning">
            {insights?.riskLevel ?? "Medium"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h4 className="text-sm font-semibold">Items to Verify</h4>
          </div>

          <ul className="space-y-1 text-sm text-muted-foreground">
            {flags.map((flag) => (
              <li key={flag}>• {flag}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Suggested Next Actions</h4>
          </div>

          <ul className="space-y-1 text-sm text-muted-foreground">
            {actions.map((action) => (
              <li key={action}>• {action}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-border/60 bg-background/40 p-3 text-xs text-muted-foreground">
        AI-generated insights are for attorney support only and do not constitute
        legal advice. Attorney review required.
      </div>
    </Card>
  );
}