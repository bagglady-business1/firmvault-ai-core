import { useParams } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { AIInsightCard } from "@/components/ui/AIInsightCard";

export function AIIntakeReviewPage() {
  const { id } = useParams({ from: "/intake/$id/ai-review" });
  return (
    <AppShell>
      <PageHeader
        title={`AI Review · Intake ${id}`}
        description="Aision Cognitive Systems analysis of intake completeness, risk, and routing."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <AIInsightCard severity="high" title="Statute of limitations near" matter="Personal Injury · NY" summary="Estimated 14 days remaining based on incident date provided. Recommend immediate engagement letter." />
        <AIInsightCard severity="medium" title="Missing accident report" matter="Personal Injury · NY" summary="No police report uploaded. Requesting from client improves case viability score by 22%." />
        <AIInsightCard severity="low" title="Recommended practice area" matter="Routing" summary="Best fit: Litigation · Personal Injury team. Suggested lead: S. Okafor." />
        <AIInsightCard severity="critical" title="PII detected in attachments" matter="Compliance" summary="SSN and DOB detected in uploaded PDF. Auto-redaction available before storage." />
      </div>
    </AppShell>
  );
}
