import { MatterDocument } from "@/data/mockMatterTabsData";
import { FileText, Tag } from "lucide-react";

export function DocumentTable({ docs }: { docs: MatterDocument[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3">File</th>
            <th className="text-left font-medium px-4 py-3">Category</th>
            <th className="text-left font-medium px-4 py-3">Uploaded by</th>
            <th className="text-left font-medium px-4 py-3">Modified</th>
            <th className="text-left font-medium px-4 py-3">Tags</th>
            <th className="text-left font-medium px-4 py-3">Type</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d) => (
            <tr key={d.id} className="border-t border-border hover:bg-muted/20">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{(d.sizeKb / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{d.category}</td>
              <td className="px-4 py-3">{d.uploadedBy}</td>
              <td className="px-4 py-3 text-muted-foreground">{d.modified}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {d.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                      <Tag className="size-2.5" />{t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-mono">{d.fileType}</span>
              </td>
            </tr>
          ))}
          {docs.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                No documents in this category yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
