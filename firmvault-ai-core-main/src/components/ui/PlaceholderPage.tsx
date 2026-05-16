import type { ReactNode } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";

export function PlaceholderPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <AppShell>
      <PageHeader title={title} description={description} />
      {children ?? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
          <p className="font-display text-lg font-semibold text-foreground">Module ready</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This surface is wired into the vault. Connect data to bring it to life.
          </p>
        </div>
      )}
    </AppShell>
  );
}
