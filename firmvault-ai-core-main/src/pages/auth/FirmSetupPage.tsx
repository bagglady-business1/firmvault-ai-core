import { Link } from "@tanstack/react-router";
import { Vault, Check } from "lucide-react";

const steps = ["Firm Profile", "Practice Areas", "Team", "Security"];

export function FirmSetupPage() {
  return (
    <div className="min-h-screen w-full bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/15">
            <Vault className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold">FirmVault AI · Firm Setup</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Aision Operator</p>
          </div>
        </div>

        <ol className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                {i === 0 ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-xs ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-semibold">Tell us about your firm</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This information shapes your vault, audit trail, and AI review defaults.
          </p>

          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: "Firm name", placeholder: "Okafor & Associates" },
              { label: "Bar jurisdiction", placeholder: "New York" },
              { label: "Primary contact", placeholder: "Sade Okafor" },
              { label: "Contact email", placeholder: "ops@firm.law" },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </label>
                <input
                  placeholder={f.placeholder}
                  className="w-full rounded-lg border border-border bg-input/50 px-3 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
            ))}
            <div className="sm:col-span-2 mt-4 flex justify-end gap-2">
              <Link to="/login" className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                Cancel
              </Link>
              <Link to="/command-center" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
