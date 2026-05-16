import { useState } from "react";

type Mode = "civil" | "criminal";

export function AddOfferPanel({ defaultMode = "civil" }: { defaultMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(defaultMode);

  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Add offer</h3>
        <div className="flex rounded-md border border-border bg-input/40 p-0.5 text-xs">
          {(["civil", "criminal"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-2.5 py-1 capitalize ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Field label="Date"><input type="date" className={inputCls} /></Field>
        <Field label="Source">
          <select className={inputCls}>
            {mode === "civil" ? ["Plaintiff", "Defendant", "Insurer"].map((s) => <option key={s}>{s}</option>) : ["DA", "Defense"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        {mode === "civil" ? (
          <>
            <Field label="Type">
              <select className={inputCls}>
                {["Demand", "Offer", "Counteroffer"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Amount (USD)"><input type="number" placeholder="0" className={inputCls} /></Field>
          </>
        ) : (
          <>
            <Field label="Charge"><input placeholder="e.g. PC 245(a)(1)" className={inputCls} /></Field>
            <Field label="Expiration"><input type="date" className={inputCls} /></Field>
          </>
        )}
        <Field label="Status">
          <select className={inputCls}>
            {["Open", "Accepted", "Rejected", "Expired", "Countered"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Response deadline"><input type="date" className={inputCls} /></Field>
        <div className="col-span-2">
          <Field label={mode === "civil" ? "Notes" : "Terms"}>
            <textarea rows={3} className={inputCls} />
          </Field>
        </div>
      </div>

      <button className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Save offer
      </button>
    </div>
  );
}

const inputCls =
  "mt-1 w-full h-10 rounded-md border border-border bg-input/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
