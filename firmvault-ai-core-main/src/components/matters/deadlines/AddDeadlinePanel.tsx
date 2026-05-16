import { allUsers } from "@/data/mockMatterTabsData";

export function AddDeadlinePanel() {
  const types = ["Filing", "Discovery", "Court", "Response", "Contractual", "Offer Expiration"];
  const inputCls = "mt-1 w-full h-10 rounded-md border border-border bg-input/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <h3 className="text-sm font-semibold tracking-tight">Add deadline</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <label className="col-span-2 block">
          <span className="text-xs text-muted-foreground">Title</span>
          <input className={inputCls} placeholder="e.g. File reply brief" />
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Type</span>
          <select className={inputCls}>{types.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Due date</span>
          <input type="date" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Assignee</span>
          <select className={inputCls}>{allUsers.map((u) => <option key={u}>{u}</option>)}</select>
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Status</span>
          <select className={inputCls}>{["Open", "In Progress", "Completed"].map((s) => <option key={s}>{s}</option>)}</select>
        </label>
      </div>
      <button className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Save deadline
      </button>
    </div>
  );
}
