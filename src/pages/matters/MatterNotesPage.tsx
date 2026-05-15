const notes = [
  { id: "n1", who: "S. Okafor", time: "2h ago", body: "Confirmed mediator availability for Q3. Need to circulate dates with opposing counsel." },
  { id: "n2", who: "A. Reyes", time: "Yesterday", body: "Witness Carter willing to sit for second deposition. Prep memo drafted." },
  { id: "n3", who: "M. Lin", time: "2d ago", body: "Bates-stamped production batch 5 (HART-04200—04812). Uploaded to vault." },
];

export function MatterNotesPage() {
  return (
    <div className="space-y-3">
      <textarea
        placeholder="Add a privileged note…"
        className="w-full rounded-xl border border-border bg-card p-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
        rows={3}
      />
      <ul className="space-y-3">
        {notes.map((n) => (
          <li key={n.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{n.who}</p>
              <span className="text-xs text-muted-foreground">{n.time}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/80">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
