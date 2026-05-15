import { Bell, Search, ChevronDown } from "lucide-react";
import { SecureSessionBadge } from "./SecureSessionBadge";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search matters, clients, documents, citations…"
          className="w-full rounded-lg border border-border bg-input/50 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-input focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
          ⌘K
        </kbd>
      </div>

      <SecureSessionBadge />

      <button className="relative rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
          5
        </span>
      </button>

      <button className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-2 py-1.5 text-left transition-colors hover:border-primary/40">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
          SO
        </div>
        <div className="hidden leading-tight md:block">
          <p className="text-xs font-medium text-foreground">Sade Okafor</p>
          <p className="text-[10px] text-muted-foreground">Senior Partner</p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </header>
  );
}
