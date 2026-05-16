// src/pages/matters/MatterNotesPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { noteService, type NoteRecord } from "@/services/noteService";

export function MatterNotesPage() {
  const { id } = useParams({ from: "/matters/$id/notes" });

  const [notes, setNotes] = useState<NoteRecord[]>([]);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function loadNotes() {
    setLoading(true);

    try {
      const data = await noteService.getAll({ matterId: id });
      setNotes(data);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, [id]);

  async function handleCreateNote() {
    if (!noteText.trim()) return;

    setCreating(true);

    try {
      const created = await noteService.create({
        matter_id: id,
        note_text: noteText.trim(),
      });

      if (created) {
        setNoteText("");
        await loadNotes();
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-card p-4">
        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="Add a privileged note…"
          className="w-full rounded-xl border border-border bg-background p-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
          rows={3}
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleCreateNote}
            disabled={creating}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? "Saving..." : "Add Note"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No notes yet for this matter.
        </div>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Firm note</p>
                <span className="text-xs text-muted-foreground">
                  {note.created_at
                    ? new Date(note.created_at).toLocaleString()
                    : "Unknown date"}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">{note.note_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}