import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Inbox,
  CalendarClock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AIInsightCard } from "@/components/ui/AIInsightCard";
import {
  mockMatters,
  mockIntakes,
  mockDeadlines,
  mockAIAlerts,
  mockActivity,
  mockActiveUsers,
  mockTasks,
} from "@/lib/mock-data";

export function CommandCenterPage() {
  return (
    <AppShell>
      <PageHeader
        title="Command Center"
        description="Your firm's operational pulse — intakes, matters, deadlines, and AI signals."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              Today
            </button>
            <Link
              to="/intake"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary"
            >
              New Intake
            </Link>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Matters" value="42" delta="+3 this week" icon={Briefcase} tone="primary" />
        <MetricCard label="Intake Queue" value="12" delta="4 awaiting review" icon={Inbox} />
        <MetricCard label="Deadlines · 7d" value="9" delta="2 critical" icon={CalendarClock} tone="warning" />
        <MetricCard label="AI Alerts" value="7" delta="1 critical privilege" icon={Sparkles} tone="danger" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Today's Priorities */}
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Today's Priorities</h2>
            <Link to="/tasks" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="space-y-2">
            {mockTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.matter} · {t.assignee}</p>
                </div>
                <StatusBadge label={t.status.replace("_", " ")} tone={t.status === "in_progress" ? "info" : t.status === "review" ? "warning" : "neutral"} />
                <span className="hidden text-xs text-muted-foreground sm:inline">{t.due}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Active Users */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Active Users</h2>
            <span className="text-xs text-muted-foreground">{mockActiveUsers.length} online</span>
          </div>
          <ul className="space-y-3">
            {mockActiveUsers.map((u) => (
              <li key={u.id} className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                    {u.initials}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card ${u.status === "online" ? "bg-success" : u.status === "in_matter" ? "bg-primary" : "bg-warning"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
                <StatusBadge label={u.status.replace("_", " ")} tone={u.status === "online" ? "success" : u.status === "in_matter" ? "primary" : "warning"} />
              </li>
            ))}
          </ul>
        </section>

        {/* Intake Queue Summary */}
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Intake Queue</h2>
            <Link to="/intake" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Open queue <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {mockIntakes.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/40 text-xs font-semibold text-muted-foreground">
                  {i.id.split("-")[1]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.matter} · {i.source}</p>
                </div>
                <StatusBadge
                  label={`${i.risk} risk`}
                  tone={i.risk === "high" ? "danger" : i.risk === "medium" ? "warning" : "success"}
                />
                <span className="hidden text-xs text-muted-foreground sm:inline">{i.received}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Deadline Watch */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Deadline Watch</h2>
            <Link to="/deadlines" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="space-y-2">
            {mockDeadlines.map((d) => (
              <li key={d.id} className="rounded-lg border border-border bg-background/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{d.task}</p>
                    <p className="text-xs text-muted-foreground">{d.matter}</p>
                  </div>
                  {d.priority === "critical" ? (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
                  ) : (
                    <Clock className="h-4 w-4 shrink-0 text-warning" />
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-primary">{d.due}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Active Matters */}
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Active Matters</h2>
            <Link to="/matters" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Matter</th>
                  <th className="px-3 py-2 text-left">Stage</th>
                  <th className="px-3 py-2 text-left">Lead</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockMatters.slice(0, 4).map((m) => (
                  <tr key={m.id} className="hover:bg-muted/30">
                    <td className="px-3 py-2.5">
                      <Link to="/matters/$id" params={{ id: m.id }} className="font-medium text-foreground hover:text-primary">
                        {m.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{m.client}</p>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{m.stage}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{m.lead}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge
                        label={m.status}
                        tone={m.status === "urgent" ? "danger" : m.status === "review" ? "warning" : "success"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Review Alerts */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">AI Review Alerts</h2>
            <Link to="/ai-review" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
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
        </section>

        {/* Firm Activity */}
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Firm Activity</h2>
            <span className="text-xs text-muted-foreground">Live · audit-logged</span>
          </div>
          <ul className="space-y-3">
            {mockActivity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="flex-1 text-foreground/80">
                  <span className="font-medium text-foreground">{a.who}</span>{" "}
                  <span className="text-muted-foreground">{a.what}</span>{" "}
                  <span className="font-medium text-primary">{a.target}</span>
                </p>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
