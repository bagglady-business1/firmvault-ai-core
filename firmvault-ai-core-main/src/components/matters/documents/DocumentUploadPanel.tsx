import { UploadCloud, FolderPlus, Tag } from "lucide-react";

export function DocumentUploadPanel() {
  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-md bg-primary/15 grid place-items-center">
            <UploadCloud className="size-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Upload documents</div>
            <div className="text-xs text-muted-foreground">Drop files here or use the actions to organize the matter file.</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            <UploadCloud className="size-3.5" /> Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-xs hover:bg-muted/40">
            <FolderPlus className="size-3.5" /> Create folder
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2 text-xs hover:bg-muted/40">
            <Tag className="size-3.5" /> Tag selected
          </button>
        </div>
      </div>
    </div>
  );
}
