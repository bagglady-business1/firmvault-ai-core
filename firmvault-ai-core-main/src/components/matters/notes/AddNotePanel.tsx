import { useState } from "react";
import { NoteCategory } from "@/data/mockMatterTabsData";

const CATEGORIES: NoteCategory[] = [
  "Client Communication", "Strategy", "Medical", "Discovery", "Opposing Counsel", "Settlement", "Court",
];

export function AddNotePanel({ onAdd }: { onAdd: (n: { category: NoteCategory; body: string }) => void }) {
  const [category, setCategory] = useState<NoteCategory>("Strategy");
  const [body, setBody] = useState("");

  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <h3 className="text-sm font-semibold tracking-tight">Add internal note</h3>
      <p className="text-xs text-muted-foreground mt-0.5">Attorney work product — not shared with client portal.</p>
      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as NoteCategory)}
            className="mt-1 w-full h-10 rounded-md border border-border bg-input/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Note</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Memorialize the conversation, decision, or strategy thought…"
            className="mt-1 w-full rounded-md border border-border bg-input/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={() => {
            if (!body.trim()) return;
            onAdd({ category, body });
            setBody("");
          }}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Save note
        </button>
      </div>
    </div>
  );
}
