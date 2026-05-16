import { AppShell, PageHeader } from "@/components/layout/AppShell";

const sections = [
  { title: "Firm Profile", desc: "Branding, jurisdiction, billing entity." },
  { title: "Security & Compliance", desc: "MFA, SSO, audit log retention, SOC 2 controls." },
  { title: "AI & Cognitive", desc: "Aision model preferences, redaction rules, privilege guardrails." },
  { title: "Integrations", desc: "Court e-filing, calendar, email, document signing." },
  { title: "Notifications", desc: "Per-user and firm-wide alert routing." },
  { title: "Vault Storage", desc: "Encryption, retention, and legal hold policies." },
];

export function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" description="Configure your FirmVault — security, AI, and integrations." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <button key={s.title} className="text-left rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40">
            <p className="font-display text-base font-semibold text-foreground">{s.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary">Configure →</p>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
