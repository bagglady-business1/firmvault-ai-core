import { Link, useRouterState } from "@tanstack/react-router";

const tabs = [
  { label: "Overview", to: "" },
  { label: "Timeline", to: "timeline" },
  { label: "Documents", to: "documents" },
  { label: "Tasks", to: "tasks" },
  { label: "Notes", to: "notes" },
  { label: "Offers", to: "offers" },
  { label: "Deadlines", to: "deadlines" },
  { label: "AI Review", to: "ai-review" },
];

export function MatterTabs({ matterId }: { matterId: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const base = `/matters/${matterId}`;

  return (
    <div className="border-b border-border bg-card/20">
      <div className="flex gap-1 overflow-x-auto px-4">
        {tabs.map((t) => {
          const href = t.to ? `${base}/${t.to}` : base;
          const active = t.to ? path === href : path === base || path === base + "/";
          return (
            <Link
              key={t.label}
              to={href}
              className={[
                "relative px-3 py-3 text-sm transition-colors whitespace-nowrap",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {t.label}
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
