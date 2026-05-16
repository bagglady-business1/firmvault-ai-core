// src/pages/intake/IntakeDetailPage.tsx

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { intakeService, type IntakeRecord } from "@/services/intakeService";
import { matterService, type MatterRecord } from "@/services/matterService";
import { Sparkles, FolderPlus } from "lucide-react";

export function IntakeDetailPage() {
  const { id } = useParams({ from: "/intake/$id/" });
  const navigate = useNavigate();
  const [intake, setIntake] = useState<IntakeRecord | null>(null);
  const [createdMatter, setCreatedMatter] = useState<MatterRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    async function loadIntake() {
      try {
        const data = await intakeService.getById(id);
        setIntake(data);
      } catch (error) {
        console.error("Failed to load intake detail:", error);
      } finally {
        setLoading(false);
      }
    }

    loadIntake();
  }, [id]);

  async function handleConvertToMatter() {
    if (!intake) return;

    setConverting(true);

    try {
      const matter = await matterService.create({
        intake_id: intake.id,
        matter_name: `${intake.client_name || "Unnamed Client"} Matter`,
        client_name: intake.client_name,
        case_type: intake.case_type || "General",
        matter_status: "active",
        description: intake.summary || "Converted from intake.",
      });

      if (matter) {
        setCreatedMatter(matter);

        await intakeService.update(intake.id, {
          intake_status: "converted",
        });

        setIntake({
          ...intake,
          intake_status: "converted",
        });

        navigate({
          to: "/matters/$id/timeline",
          params: { id: matter.id },
        });
      }
    } catch (error) {
      console.error("Failed to convert intake to matter:", error);
    } finally {
      setConverting(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        title={intake?.client_name || `Intake ${id}`}
        description="Conflict check, jurisdiction, and intake worksheet."
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleConvertToMatter}
              disabled={!intake || converting || intake?.intake_status === "converted"}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FolderPlus className="h-4 w-4" />
              {converting
                ? "Converting..."
                : intake?.intake_status === "converted"
                  ? "Converted"
                  : "Convert to Matter"}
            </button>

            <Link
              to="/intake/$id/ai-review"
              params={{ id }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" /> Run AI Review
            </Link>
          </div>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading intake...
        </div>
      ) : !intake ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-semibold text-foreground">
            Intake not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This intake may have been deleted or was not found in Supabase.
          </p>
          <Link
            to="/intake"
            className="mt-4 inline-flex rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
          >
            Back to Intake Queue
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
            <h2 className="mb-4 font-display text-base font-semibold">
              Client Worksheet
            </h2>

            {createdMatter && (
              <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm">
                <p className="font-medium text-foreground">
                  Matter created successfully.
                </p>
                <p className="mt-1 text-muted-foreground">
                  Matter: {createdMatter.matter_name}
                </p>
              </div>
            )}

            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Full name
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.client_name || "Not listed"}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Matter type
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.case_type || "Not listed"}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Intake status
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.intake_status || "new"}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  AI Risk
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.ai_risk_level || "low"}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.client_phone || "Not listed"}
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {intake.client_email || "Not listed"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-lg border border-border bg-background p-4">
              <h3 className="mb-2 font-display text-sm font-semibold">
                Intake Summary
              </h3>
              <p className="text-sm text-muted-foreground">
                {intake.summary || "No intake summary has been added yet."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-display text-sm font-semibold">
                Conflict Check
              </h3>
              <StatusBadge label="Pending review" tone="warning" pulse />
              <p className="mt-3 text-xs text-muted-foreground">
                This will later check against active and closed matters.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-display text-sm font-semibold">
                Risk Signals
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>AI risk level</span>
                  <StatusBadge
                    label={intake.ai_risk_level || "low"}
                    tone={
                      intake.ai_risk_level === "high" ||
                      intake.ai_risk_level === "critical"
                        ? "danger"
                        : intake.ai_risk_level === "medium"
                          ? "warning"
                          : "success"
                    }
                  />
                </li>
                <li className="flex justify-between">
                  <span>Intake status</span>
                  <StatusBadge
                    label={intake.intake_status || "new"}
                    tone={intake.intake_status === "converted" ? "success" : "warning"}
                  />
                </li>
                <li className="flex justify-between">
                  <span>Document gaps</span>
                  <StatusBadge label="Not reviewed" tone="warning" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}