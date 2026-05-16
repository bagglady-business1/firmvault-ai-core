import { CivilOffer, CriminalOffer, OfferStatus } from "@/data/mockMatterTabsData";

const STATUS_COLOR: Record<OfferStatus, string> = {
  Open: "bg-info/15 text-info border-info/30",
  Accepted: "bg-success/15 text-success border-success/30",
  Rejected: "bg-destructive/15 text-destructive border-destructive/30",
  Expired: "bg-muted text-muted-foreground border-border",
  Countered: "bg-warning/15 text-warning border-warning/30",
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function CivilOffersTable({ offers }: { offers: CivilOffer[] }) {
  if (offers.length === 0) {
    return <EmptyTable label="No civil offers on file." />;
  }
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3">Date</th>
            <th className="text-left font-medium px-4 py-3">Source</th>
            <th className="text-left font-medium px-4 py-3">Type</th>
            <th className="text-right font-medium px-4 py-3">Amount</th>
            <th className="text-left font-medium px-4 py-3">Status</th>
            <th className="text-left font-medium px-4 py-3">Response by</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id} className="border-t border-border hover:bg-muted/20">
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3">{o.source}</td>
              <td className="px-4 py-3">{o.kind}</td>
              <td className="px-4 py-3 text-right font-mono">{fmt(o.amountUsd)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_COLOR[o.status]}`}>{o.status}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{o.responseDeadline ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CriminalOffersTable({ offers }: { offers: CriminalOffer[] }) {
  if (offers.length === 0) {
    return <EmptyTable label="No plea offers on file." />;
  }
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-medium px-4 py-3">Date</th>
            <th className="text-left font-medium px-4 py-3">Source</th>
            <th className="text-left font-medium px-4 py-3">Charge</th>
            <th className="text-left font-medium px-4 py-3">Terms</th>
            <th className="text-left font-medium px-4 py-3">Status</th>
            <th className="text-left font-medium px-4 py-3">Expires</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id} className="border-t border-border align-top hover:bg-muted/20">
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3">{o.source}</td>
              <td className="px-4 py-3 font-mono text-xs">{o.charge}</td>
              <td className="px-4 py-3">{o.terms}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_COLOR[o.status]}`}>{o.status}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{o.expiration ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyTable({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/30 p-6 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
