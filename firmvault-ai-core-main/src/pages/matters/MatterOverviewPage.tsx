// src/pages/matters/MatterOverviewPage.tsx

import { Card } from "@/components/ui/card";
import { MatterSummaryCard } from "@/components/matters/MatterSummaryCard";
import { MatterDetailsCard } from "@/components/matters/MatterDetailsCard";
import { MatterTeamCard } from "@/components/matters/MatterTeamCard";
import { ImportantDatesCard } from "@/components/matters/ImportantDatesCard";
import { MatterProgressCard } from "@/components/matters/MatterProgressCard";
import { RecentActivityCard } from "@/components/matters/RecentActivityCard";
import { MatterActionBar } from "@/components/matters/MatterActionBar";
import { AIMatterInsightsPanel } from "../../components/ai/AIMatterInsightsPanel";
import { mockMatters } from "@/data/mockMatters";
import { DollarSign, TrendingUp, Receipt } from "lucide-react";

function FinancialOverview({
  estimatedValue,
  expenses,
  outstanding,
}: {
  estimatedValue: number;
  expenses: number;
  outstanding: number;
}) {
  const fmt = (n: number) =>
    n === 0
      ? "—"
      : `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const items = [
    {
      label: "Estimated Case Value",
      value: fmt(estimatedValue),
      icon: TrendingUp,
      tone: "text-primary",
    },
    {
      label: "Expenses",
      value: fmt(expenses),
      icon: Receipt,
      tone: "text-foreground",
    },
    {
      label: "Outstanding",
      value: fmt(outstanding),
      icon: DollarSign,
      tone: "text-warning",
    },
  ];

  return (
    <Card className="bg-card border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Financial Overview</h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          UI preview
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-md border border-border/60 bg-background/40 p-3"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <Icon className="h-3 w-3" />
                {item.label}
              </div>
              <p className={`mt-1.5 text-lg font-semibold tabular-nums ${item.tone}`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function MatterOverviewPage() {
  const matter = mockMatters[0];

  return (
    <div className="px-6 py-6 space-y-5 max-w-[1400px] mx-auto">
      <MatterActionBar />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <MatterSummaryCard matter={matter} />
          <MatterDetailsCard matter={matter} />
          <MatterProgressCard matter={matter} />
          <FinancialOverview {...matter.financials} />
          <AIMatterInsightsPanel insights={matter.ai} />
        </div>

        <div className="space-y-5">
          <MatterTeamCard matter={matter} />
          <ImportantDatesCard matter={matter} />
          <RecentActivityCard matter={matter} />
        </div>
      </div>
    </div>
  );
}