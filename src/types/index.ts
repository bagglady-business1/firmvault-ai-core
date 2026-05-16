/**
 * FirmVault AI — Domain Types
 * ---------------------------------------------------------------
 * Canonical TypeScript shapes for entities the FirmVault AI
 * portal manages. These mirror the planned Supabase schema
 * (documented per-service in src/services/*) so the frontend can
 * migrate from mock data to live queries without refactors.
 *
 * Every persisted record carries `id` and `created_at`; mutable
 * records also carry `updated_at`.
 */

export type ISODateString = string;
export type UUID = string;

/* ---------- Identity & Access ---------- */

export type UserRole =
  | "owner"
  | "managing_partner"
  | "senior_partner"
  | "partner"
  | "counsel"
  | "associate"
  | "paralegal"
  | "admin"
  | "billing"
  | "guest";

export type UserStatus = "active" | "invited" | "suspended" | "disabled";

export interface Firm {
  id: UUID;
  name: string;
  slug: string;
  jurisdictions: string[];
  primary_contact_email: string;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface UserProfile {
  id: UUID;
  firm_id: UUID;
  full_name: string;
  email: string;
  initials: string;
  role: UserRole;
  status: UserStatus;
  bar_number?: string | null;
  last_active_at?: ISODateString | null;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Intake ---------- */

export type IntakeSource = "web_form" | "phone" | "email" | "referral" | "walk_in";
export type IntakeRisk = "low" | "medium" | "high" | "critical";
export type IntakeStatus =
  | "new"
  | "in_review"
  | "conflict_check"
  | "qualified"
  | "converted"
  | "declined";

export interface Intake {
  id: UUID;
  firm_id: UUID;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  matter_type: string;
  jurisdiction?: string | null;
  source: IntakeSource;
  risk: IntakeRisk;
  status: IntakeStatus;
  ai_summary?: string | null;
  assigned_to?: UUID | null;
  received_at: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Matters ---------- */

export type MatterStage =
  | "intake"
  | "investigation"
  | "filing"
  | "discovery"
  | "negotiation"
  | "mediation"
  | "trial"
  | "appeal"
  | "probate"
  | "closed";

export type MatterStatus = "active" | "pending" | "review" | "urgent" | "closed";

export interface Matter {
  id: UUID;
  firm_id: UUID;
  reference: string; // e.g. "M-1042"
  title: string;
  client_name: string;
  practice_area: string;
  stage: MatterStage;
  status: MatterStatus;
  lead_attorney_id?: UUID | null;
  opened_at: ISODateString;
  closed_at?: ISODateString | null;
  summary?: string | null;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export type MatterTeamRole = "lead" | "co_counsel" | "associate" | "paralegal" | "observer";

export interface MatterTeamMember {
  id: UUID;
  matter_id: UUID;
  user_id: UUID;
  role: MatterTeamRole;
  created_at: ISODateString;
}

/* ---------- Documents ---------- */

export type DocumentTag =
  | "Contract"
  | "Deposition"
  | "Exhibit"
  | "Pleading"
  | "Correspondence"
  | "Discovery"
  | "Other";

export interface DocumentRecord {
  id: UUID;
  firm_id: UUID;
  matter_id?: UUID | null;
  name: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  tag: DocumentTag;
  uploaded_by: UUID;
  privileged: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Tasks ---------- */

export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface TaskRecord {
  id: UUID;
  firm_id: UUID;
  matter_id?: UUID | null;
  title: string;
  description?: string | null;
  assignee_id?: UUID | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_at?: ISODateString | null;
  completed_at?: ISODateString | null;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Deadlines ---------- */

export type DeadlinePriority = "low" | "medium" | "high" | "critical";

export interface DeadlineRecord {
  id: UUID;
  firm_id: UUID;
  matter_id: UUID;
  title: string;
  description?: string | null;
  due_at: ISODateString;
  priority: DeadlinePriority;
  jurisdiction_rule?: string | null;
  satisfied_at?: ISODateString | null;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Notes ---------- */

export interface NoteRecord {
  id: UUID;
  firm_id: UUID;
  matter_id: UUID;
  author_id: UUID;
  body: string;
  privileged: boolean;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- Offers & Negotiations ---------- */

export type OfferStatus =
  | "draft"
  | "pending"
  | "countered"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface OfferRecord {
  id: UUID;
  firm_id: UUID;
  matter_id: UUID;
  party: string;
  amount_cents: number;
  currency: string; // ISO 4217, e.g. "USD"
  status: OfferStatus;
  terms?: string | null;
  proposed_by: UUID;
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* ---------- AI Review ---------- */

export type AISeverity = "low" | "medium" | "high" | "critical";
export type AIReviewKind =
  | "clause_conflict"
  | "missing_citation"
  | "privilege_leak"
  | "deadline_risk"
  | "summary"
  | "other";

export interface AIReviewRecord {
  id: UUID;
  firm_id: UUID;
  matter_id?: UUID | null;
  document_id?: UUID | null;
  kind: AIReviewKind;
  title: string;
  summary: string;
  severity: AISeverity;
  acknowledged_by?: UUID | null;
  acknowledged_at?: ISODateString | null;
  created_at: ISODateString;
}

/* ---------- Activity Log ---------- */

export interface ActivityLogRecord {
  id: UUID;
  firm_id: UUID;
  actor_id?: UUID | null;
  actor_label: string; // human label (incl. "AI Review")
  action: string;       // e.g. "filed motion in"
  target_type: "matter" | "intake" | "document" | "task" | "offer" | "note";
  target_id?: UUID | null;
  target_label: string;
  created_at: ISODateString;
}
