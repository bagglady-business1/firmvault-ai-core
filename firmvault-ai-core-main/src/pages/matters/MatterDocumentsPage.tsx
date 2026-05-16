// src/pages/matters/MatterDocumentsPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  documentService,
  type DocumentRecord,
} from "@/services/documentService";

type NewDocumentForm = {
  title: string;
  document_type: string;
  file_url: string;
};

const emptyDocumentForm: NewDocumentForm = {
  title: "",
  document_type: "",
  file_url: "",
};

export function MatterDocumentsPage() {
  const { id } = useParams({ from: "/matters/$id/documents" });

  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<NewDocumentForm>(emptyDocumentForm);

  async function loadDocuments() {
    setLoading(true);

    try {
      const data = await documentService.getAll({ matterId: id });
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load matter documents:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, [id]);

  function updateForm(field: keyof NewDocumentForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateDocument() {
    if (!form.title.trim()) return;

    setCreating(true);

    try {
      const created = await documentService.create({
        matter_id: id,
        title: form.title.trim(),
        document_type: form.document_type.trim() || "General",
        file_url: form.file_url.trim() || null,
        status: "tracked",
      });

      if (created) {
        setForm(emptyDocumentForm);
        await loadDocuments();
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally {
      setCreating(false);
    }
  }

  const cols: Column<DocumentRecord>[] = [
    {
      key: "title",
      header: "Document",
      render: (r) => <span className="font-medium">{r.title}</span>,
    },
    {
      key: "document_type",
      header: "Type",
      render: (r) => (
        <StatusBadge label={r.document_type || "General"} tone="primary" />
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge label={r.status || "tracked"} tone="success" />
      ),
    },
    {
      key: "created_at",
      header: "Added",
      render: (r) => (
        <span className="text-muted-foreground">
          {r.created_at ? new Date(r.created_at).toLocaleDateString() : "Not listed"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-base font-semibold">
          Add Matter Document
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Document title"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-2"
          />

          <input
            value={form.document_type}
            onChange={(event) => updateForm("document_type", event.target.value)}
            placeholder="Type: Complaint, Contract, Evidence..."
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <input
            value={form.file_url}
            onChange={(event) => updateForm("file_url", event.target.value)}
            placeholder="File URL or note"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <div className="md:col-span-4">
            <button
              onClick={handleCreateDocument}
              disabled={creating}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? "Adding..." : "Add Document"}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No documents yet for this matter.
        </div>
      ) : (
        <DataTable columns={cols} rows={documents} />
      )}
    </div>
  );
}