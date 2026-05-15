import { Link } from "@tanstack/react-router";
import { Vault, ShieldCheck, Lock, Fingerprint } from "lucide-react";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 vault-grid opacity-40" />
      <div className="absolute -top-40 left-1/2 h-96 w-[80vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        {/* Left: brand */}
        <div className="hidden flex-col justify-between rounded-2xl border border-border bg-card/40 p-8 backdrop-blur lg:flex">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/15">
              <Vault className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-display text-base font-semibold">FirmVault AI</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                An Aision Operator System
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight">
              The secure operating system for the modern law firm.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Intakes, matters, deadlines, documents, and AI review — unified in one auditable vault.
              Powered by Aision Cognitive Systems.
            </p>
          </div>

          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> SOC 2 Type II · HIPAA-aligned</li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> AES-256 at rest · TLS 1.3 in transit</li>
            <li className="flex items-center gap-2"><Fingerprint className="h-3.5 w-3.5 text-primary" /> SSO, MFA, and per-matter access</li>
          </ul>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.6)]">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-semibold">Sign in to your firm</h1>
            <p className="mt-1 text-sm text-muted-foreground">Use your firm-issued credentials.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Work email
              </label>
              <input
                type="email"
                placeholder="attorney@firm.law"
                className="w-full rounded-lg border border-border bg-input/50 px-3 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-border bg-input/50 px-3 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>

            <Link
              to="/command-center"
              className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 glow-primary"
            >
              Enter Vault
            </Link>

            <div className="flex items-center justify-between text-xs">
              <Link to="/setup" className="text-muted-foreground hover:text-primary">
                Set up a new firm
              </Link>
              <a className="text-muted-foreground hover:text-primary" href="#">
                Forgot password?
              </a>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-primary" />
            Encrypted session · Audit-logged
          </div>
        </div>
      </div>
    </div>
  );
}
