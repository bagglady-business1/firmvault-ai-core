import { ShieldCheck } from "lucide-react";

export function SecureSessionBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
      <span className="font-medium text-primary">Secure Session</span>
      <span className="hidden text-muted-foreground sm:inline">· AES-256 · SOC 2</span>
    </div>
  );
}
