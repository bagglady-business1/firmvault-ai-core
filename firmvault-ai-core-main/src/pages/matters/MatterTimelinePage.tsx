// src/pages/matters/MatterTimelinePage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { matterService, type MatterRecord } from "@/services/matterService";
import {
  activityService,
  type ActivityRecord,
} from "@/services/activityService";

export function MatterTimelinePage() {
  const { id } = useParams({ from: "/matters/$id/timeline" });

  const [matter, setMatter] = useState<MatterRecord | null>(null);
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const [matterData, activityData] = await Promise.all([
          matterService.getById(id),
          activityService.getByMatter(id),
        ]);

        setMatter(matterData);
        setActivities(activityData);
      } catch (error) {
        console.error("Failed to load matter timeline:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTimeline();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Loading timeline...
      </div>
    );
  }

  if (!matter) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-base font-semibold text-foreground">
          Matter not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This matter could not be loaded from Supabase.
        </p>
      </div>
    );
  }

  const baseEvents = [
    {
      date: matter.created_at
        ? new Date(matter.created_at).toLocaleDateString()
        : "Unknown",
      title: "Matter created",
      detail: matter.description || "Converted into an active matter.",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-5 font-display text-base font-semibold">
        Matter Timeline
      </h2>

      <ol className="relative space-y-5 border-l border-border pl-5">
        {baseEvents.map((event, index) => (
          <li key={`base-${index}`} className="relative">
            <span className="absolute -left-6.5 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-primary/40 bg-primary/30" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {event.date}
            </p>
            <p className="mt-0.5 font-medium text-foreground">{event.title}</p>
            <p className="text-xs text-muted-foreground">{event.detail}</p>
          </li>
        ))}

        {activities.map((activity) => (
          <li key={activity.id} className="relative">
            <span className="absolute -left-6.5 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-primary/40 bg-primary/30" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {activity.created_at
                ? new Date(activity.created_at).toLocaleString()
                : "Unknown date"}
            </p>
            <p className="mt-0.5 font-medium text-foreground">
              {activity.action}
            </p>
            <p className="text-xs text-muted-foreground">System activity</p>
          </li>
        ))}
      </ol>
    </div>
  );
}