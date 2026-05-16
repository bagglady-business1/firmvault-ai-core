import { DocumentCategory } from "@/data/mockMatterTabsData";
import { Folder, FolderOpen } from "lucide-react";

const CATEGORIES: DocumentCategory[] = [
  "Intake Documents",
  "Evidence",
  "Medical Records",
  "Court Filings",
  "Discovery",
  "Communications",
];

export function DocumentCategoriesSidebar({
  active,
  onChange,
  counts,
}: {
  active: DocumentCategory | "All";
  onChange: (c: DocumentCategory | "All") => void;
  counts: Record<string, number>;
}) {
  return (
    <nav className="rounded-xl border border-border bg-card/60 p-3 text-sm">
      <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Categories</div>
      <button
        onClick={() => onChange("All")}
        className={`w-full flex items-center justify-between gap-2 rounded-md px-3 py-2 transition-colors ${
          active === "All" ? "bg-primary/15 text-primary" : "hover:bg-muted/50"
        }`}
      >
        <span className="flex items-center gap-2">
          <FolderOpen className="size-4" /> All Documents
        </span>
        <span className="text-xs text-muted-foreground">{counts.All ?? 0}</span>
      </button>
      <div className="mt-1 space-y-0.5">
        {CATEGORIES.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`w-full flex items-center justify-between gap-2 rounded-md px-3 py-2 transition-colors ${
                isActive ? "bg-primary/15 text-primary" : "hover:bg-muted/50 text-foreground/85"
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                <Folder className="size-4 text-primary/80" /> {c}
              </span>
              <span className="text-xs text-muted-foreground">{counts[c] ?? 0}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
