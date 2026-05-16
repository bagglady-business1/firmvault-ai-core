import { MetricCard } from "@/components/ui/MetricCard";
import { AIInsightCard } from "@/components/ui/AIInsightCard";
import { Briefcase, Clock, FileText, Sparkles } from "lucide-react";

export function MatterOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open Tasks" value="14" delta="3 due this week" icon={Briefcase} />
        <MetricCard label="Documents" value="86" delta="12 new" icon={FileText} />
        <MetricCard label="Deadlines" value="4" delta="1 critical" icon={Clock} tone="warning" />
        <MetricCard label="AI Flags" value="2" delta="High severity" icon={Sparkles} tone="danger" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 font-display text-base font-semibold">Matter Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Plaintiff alleges breach of warranty and negligence following industrial equipment failure at Hartwell's
            Brooklyn facility. Discovery ongoing. Continental Holdings has produced 4,200 documents to date.
            Mediation scheduled for next quarter.
          </p>
        </div>
        <AIInsightCard severity="high" title="Key witness contradiction" matter="Deposition · Vol. III" summary="AI detected inconsistency between defendant's interrogatory response and depo transcript p. 142." />
      </div>
    </div>
  );
}
