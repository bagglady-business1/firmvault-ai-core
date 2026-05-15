import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  CalendarClock,
  FileText,
  CheckSquare,
  Handshake,
  Sparkles,
  Users,
  Settings,
  Vault,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockActiveUsers } from "@/lib/mock-data";

const nav = [
  { to: "/command-center", label: "Command Center", icon: LayoutDashboard },
  { to: "/intake", label: "Intake Queue", icon: Inbox, badge: 4 },
  { to: "/matters", label: "Matters", icon: Briefcase },
  { to: "/deadlines", label: "Deadline Watch", icon: CalendarClock, badge: 2 },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/matters", label: "Offers & Negotiations", icon: Handshake },
  { to: "/ai-review", label: "AI Review", icon: Sparkles, badge: 3 },
  { to: "/firm-users", label: "Firm Users", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground sticky top-0">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/15">
          <Vault className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold tracking-wide text-foreground">FirmVault AI</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Aision Operator</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                active
                  ? "bg-sidebar-accent text-foreground border border-primary/30 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-foreground border border-transparent",
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-sidebar-foreground/60 group-hover:text-primary")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Active Users · {mockActiveUsers.length}
        </p>
        <ul className="space-y-2">
          {mockActiveUsers.map((u) => (
            <li key={u.id} className="flex items-center gap-2.5">
              <div className="relative">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-foreground">
                  {u.initials}
                </div>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-sidebar",
                    u.status === "online" && "bg-success",
                    u.status === "in_matter" && "bg-primary",
                    u.status === "idle" && "bg-warning",
                  )}
                />
              </div>
              <div className="leading-tight min-w-0">
                <p className="truncate text-xs font-medium text-foreground">{u.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{u.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
