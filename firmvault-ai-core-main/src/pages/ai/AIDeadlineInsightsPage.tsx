import { AIDeadlineAlerts } from "@/components/ai/deadline/AIDeadlineAlerts";
import { AIReviewSummaryCard } from "@/components/ai/AIReviewSummaryCard";
import { AIDisclaimer } from "@/components/ai/AIDisclaimer";
import { Clock, AlertTriangle, CalendarClock } from "lucide-react";
import { mockDeadlineAlerts } from "@/data/mockAIReviews";

export default function AIDeadlineInsightsPage() {
  const overdue = mockDeadlineAlerts.filter(
    (d) => d.note.toLowerCase().includes("overdue") || d.group === "urgent",
  ).length;
  const upcoming = mockDeadlineAlerts.filter((d) => d.group === "upcoming")
    .length;
  const possibleMissing = mockDeadlineAlerts.filter(
    (d) => d.group === "informational",
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            AI Insights
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            AI Deadline Insights
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Deadline alerts surfaced by AI. Dates should be verified against
            the official docket or contract before action.
          </p>
        </div>
        <AIDisclaimer className="max-w-xl" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <AIReviewSummaryCard
          label="Overdue or urgent"
          value={overdue}
          icon={AlertTriangle}
          tone="danger"
        />
        <AIReviewSummaryCard
          label="Upcoming critical"
          value={upcoming}
          icon={Clock}
          tone="warning"
        />
        <AIReviewSummaryCard
          label="Possible missing deadlines"
          value={possibleMissing}
          icon={CalendarClock}
          tone="default"
          hint="Should be verified"
        />
      </div>

      <AIDeadlineAlerts alerts={mockDeadlineAlerts} />
    </div>
  );
}
