// src/components/matters/MatterShell.tsx

import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode, useEffect, useState } from "react";
import {
  Shield,
  Search,
  Briefcase,
  Clock,
  FileText,
  CheckSquare,
  NotebookPen,
  Handshake,
  AlarmClock,
  Sparkles,
} from "lucide-react";
import { matterService, type MatterRecord } from "@/services/matterService";

const tabs: { to: string; label: string; Icon: typeof Clock }[] = [
  { to: "/matters/$id/timeline", label: "Timeline", Icon: Clock },
  { to: "/matters/$id/documents", label: "Documents", Icon: FileText },
  { to: "/matters/$id/tasks", label: "Tasks", Icon: CheckSquare },
  { to: "/matters/$id/notes", label: "Notes", Icon: NotebookPen },
  { to: "/matters/$id/offers", label: "Offers", Icon: Handshake },
  { to: "/matters/$id/deadlines", label: "Deadlines", Icon: AlarmClock },
];

export function MatterShell({
  matterId,
  children,
}: {
  matterId: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [matter, setMatter] = useState<MatterRecord | null>(null);
  const [matters, setMatters] = useState<MatterRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatterWorkspace() {
      try {
        const [selectedMatter, allMatters] = await Promise.all([
          matterService.getById(matterId),
          matterService.getAll(),
        ]);

        setMatter(selectedMatter);
        setMatters(allMatters);
      } catch (error) {
        console.error("Failed to load matter workspace:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMatterWorkspace();
  }, [matterId]);

  const displayMatterName = matter?.matter_name || "Matter Workspace";
  const displayClientName = matter?.client_name || "Client not listed";
  const displayCaseType = matter?.case_type || "General";
  const displayStatus = matter?.matter_status || "active";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid size-8 place-items-center rounded-md bg-primary/15">
            <Shield className="size-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">
              FirmVault AI
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Matter Workspace
            </div>
          </div>
        </div>

        <nav className="space-y-1 px-3 py-4">
          <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            Matters
          </div>

          {matters.length === 0 ? (
            <div className="rounded-md px-3 py-2 text-xs text-muted-foreground">
              No matters loaded yet.
            </div>
          ) : (
            matters.map((item) => {
              const active = item.id === matterId;

              return (
                <Link
                  key={item.id}
                  to="/matters/$id/timeline"
                  params={{ id: item.id }}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border border-primary/30 bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-3.5 text-primary" />
                    <span className="truncate font-medium">
                      {item.matter_name || "Untitled Matter"}
                    </span>
                  </div>
                  <div className="ml-5 truncate text-xs text-muted-foreground">
                    {item.client_name || "Client not listed"}
                  </div>
                </Link>
              );
            })
          )}
        </nav>

        <div className="mt-auto border-t border-sidebar-border px-4 py-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-success" />
            Secure session · TLS 1.3
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card/40 px-6 backdrop-blur">
          <div className="relative max-w-xl flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search matters, documents, notes…"
              className="h-10 w-full rounded-md border border-border bg-input/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success">
            <Shield className="size-3" />
            Secure session
          </div>

          <div className="grid size-9 place-items-center rounded-full bg-secondary/20 text-xs font-semibold text-secondary-foreground">
            FV
          </div>
        </header>

        <div className="px-6 pt-6">
          {loading ? (
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Loading matter workspace...
            </div>
          ) : !matter ? (
            <div className="rounded-xl border border-border bg-card p-5">
              <h1 className="text-xl font-semibold tracking-tight">
                Matter not found
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                This matter may not exist in Supabase yet.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-primary">
                    {displayCaseType}
                  </div>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                    {displayMatterName}
                  </h1>
                  <div className="text-sm text-muted-foreground">
                    Client: {displayClientName} · Status: {displayStatus}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="size-3.5 text-primary" /> AI assistance enabled
                </div>
              </div>

              <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
                {tabs.map(({ to, label, Icon }) => {
                  const href = to.replace("$id", matterId);
                  const active = pathname.startsWith(href);

                  return (
                    <Link
                      key={to}
                      to={to}
                      params={{ id: matterId }}
                      className={`-mb-px flex items-center gap-2 rounded-t-md border-b-2 px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? "border-primary bg-card/60 text-foreground"
                          : "border-transparent text-muted-foreground hover:bg-card/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-4" /> {label}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}