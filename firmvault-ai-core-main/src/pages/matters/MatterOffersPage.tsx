// src/pages/matters/MatterOffersPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { offerService, type OfferRecord } from "@/services/offerService";

type NewOfferForm = {
  offer_title: string;
  offer_amount: string;
  offer_status: string;
  notes: string;
};

const emptyOfferForm: NewOfferForm = {
  offer_title: "",
  offer_amount: "",
  offer_status: "pending",
  notes: "",
};

export function MatterOffersPage() {
  const { id } = useParams({ from: "/matters/$id/offers" });

  const [offers, setOffers] = useState<OfferRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<NewOfferForm>(emptyOfferForm);

  async function loadOffers() {
    setLoading(true);

    try {
      const data = await offerService.getAll({ matterId: id });
      setOffers(data);
    } catch (error) {
      console.error("Failed to load offers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, [id]);

  function updateForm(field: keyof NewOfferForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCreateOffer() {
    if (!form.offer_title.trim()) return;

    setCreating(true);

    try {
      const created = await offerService.create({
        matter_id: id,
        offer_title: form.offer_title.trim(),
        offer_amount: form.offer_amount ? Number(form.offer_amount) : null,
        offer_status: form.offer_status || "pending",
        notes: form.notes.trim() || null,
      });

      if (created) {
        setForm(emptyOfferForm);
        await loadOffers();
      }
    } catch (error) {
      console.error("Failed to create offer:", error);
    } finally {
      setCreating(false);
    }
  }

  const cols: Column<OfferRecord>[] = [
    {
      key: "offer_title",
      header: "Offer",
      render: (r) => (
        <span className="font-medium">{r.offer_title || "Untitled offer"}</span>
      ),
    },
    {
      key: "offer_amount",
      header: "Amount",
      render: (r) => (
        <span className="font-display text-foreground">
          {typeof r.offer_amount === "number"
            ? r.offer_amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "Not listed"}
        </span>
      ),
    },
    {
      key: "offer_status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={r.offer_status || "pending"}
          tone={
            r.offer_status === "accepted"
              ? "success"
              : r.offer_status === "countered"
                ? "warning"
                : r.offer_status === "rejected"
                  ? "danger"
                  : "info"
          }
        />
      ),
    },
    {
      key: "notes",
      header: "Notes",
      render: (r) => (
        <span className="text-muted-foreground">{r.notes || "None"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-base font-semibold">
          Add Matter Offer
        </h2>

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={form.offer_title}
            onChange={(event) => updateForm("offer_title", event.target.value)}
            placeholder="Offer title or party"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-2"
          />

          <input
            value={form.offer_amount}
            onChange={(event) => updateForm("offer_amount", event.target.value)}
            placeholder="Amount"
            type="number"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <select
            value={form.offer_status}
            onChange={(event) => updateForm("offer_status", event.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="pending">Pending</option>
            <option value="countered">Countered</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <textarea
            value={form.notes}
            onChange={(event) => updateForm("notes", event.target.value)}
            placeholder="Offer notes, settlement terms, or negotiation context"
            className="min-h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary md:col-span-4"
          />

          <div className="md:col-span-4">
            <button
              onClick={handleCreateOffer}
              disabled={creating}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? "Adding..." : "Add Offer"}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading offers...
        </div>
      ) : offers.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No offers yet for this matter.
        </div>
      ) : (
        <DataTable columns={cols} rows={offers} />
      )}
    </div>
  );
}