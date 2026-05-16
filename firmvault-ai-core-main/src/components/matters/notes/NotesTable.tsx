import { MatterNote } from "@/data/mockMatterTabsData";

export function NotesTable({ notes }: { notes: MatterNote[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <div className="border-b border-warning/30 bg-warning/5 px-4 py-2 text-[11px] uppercase tracking-wider text-warning">
        Attorney Work Product — Internal Use Only
      </div>
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3 w-40">Timestamp</th>
            <th className="text-left font-medium px-4 py-3 w-40">Author</th>
            <th className="text-left font-medium px-4 py-3 w-44">Category</th>
            <th className="text-left font-medium px-4 py-3">Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n) => (
            <tr key={n.id} className="border-t border-border align-top hover:bg-muted/20">
              <td className="px-4 py-3 text-muted-foreground">{new Date(n.timestamp).toLocaleString()}</td>
              <td className="px-4 py-3">{n.author}</td>
              <td className="px-4 py-3">
                <span className="rounded-full border border-secondary/40 bg-secondary/20 px-2 py-0.5 text-[11px] text-secondary-foreground">
                  {n.category}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground/90">{n.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
