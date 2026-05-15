import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AIInsightCard } from "@/components/ui/AIInsightCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { mockAIAlerts } from "@/lib/mock-data";
import { Sparkles, ShieldAlert, FileSearch, Brain } from "lucide-react";

export function AIReviewCenterPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Review Center"
        description="Aision Cognitive Systems — privileged document review, clause detection, and risk scoring."
      />
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Reviews · 24h" value="184" icon={Brain} tone="primary" />
        <MetricCard label="Open Flags" value="7" delta="1 critical" icon={Sparkles} tone="warning" />
        <MetricCard label="Privilege Hits" value="2" icon={ShieldAlert} tone="danger" />
        <MetricCard label="Docs Scanned" value="3.2k" icon={FileSearch} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mockAIAlerts.map((a) => (
          <AIInsightCard
            key={a.id}
            title={a.title}
            matter={a.matter}
            summary={a.summary}
            severity={a.severity as "high" | "medium" | "critical"}
          />
        ))}
      </div>
    </AppShell>
  );
}
