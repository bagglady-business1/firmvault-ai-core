const events = [
  { date: "May 12", title: "Motion to Compel filed", who: "S. Okafor" },
  { date: "May 8", title: "Deposition of M. Carter", who: "A. Reyes" },
  { date: "Apr 30", title: "Document production batch 4", who: "M. Lin" },
  { date: "Apr 18", title: "Scheduling order entered", who: "Court" },
  { date: "Mar 22", title: "Complaint filed", who: "S. Okafor" },
];

export function MatterTimelinePage() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-5 font-display text-base font-semibold">Matter Timeline</h2>
      <ol className="relative space-y-5 border-l border-border pl-5">
        {events.map((e) => (
          <li key={e.date} className="relative">
            <span className="absolute -left-[26px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-primary/40 bg-primary/30" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{e.date}</p>
            <p className="mt-0.5 font-medium text-foreground">{e.title}</p>
            <p className="text-xs text-muted-foreground">By {e.who}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
