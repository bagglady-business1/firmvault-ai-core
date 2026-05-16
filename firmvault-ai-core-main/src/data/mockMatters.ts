export type MatterStage =
  | "Intake"
  | "Investigation"
  | "Pre-Litigation"
  | "Litigation"
  | "Negotiation"
  | "Trial Prep"
  | "Trial"
  | "Resolution"
  | "Closed";

export type MatterStatus = "Active" | "Closed" | "Archived" | "On Hold";

export const MATTER_STAGES: MatterStage[] = [
  "Intake",
  "Investigation",
  "Pre-Litigation",
  "Litigation",
  "Negotiation",
  "Trial Prep",
  "Trial",
  "Resolution",
  "Closed",
];

export interface TeamMember {
  name: string;
  role: "Lead Attorney" | "Paralegal" | "Legal Assistant" | "Intake Specialist";
  status: "active" | "idle";
  initials: string;
}

export interface ImportantDate {
  label: string;
  date: string;
  type: "court" | "mediation" | "discovery" | "trial" | "deadline";
}

export interface ActivityItem {
  type: "document" | "note" | "task" | "deadline";
  text: string;
  who: string;
  when: string;
}

export interface AIInsights {
  liabilityStrength: "low" | "medium" | "high";
  damagesEstimate: { low: number; high: number };
  caseStrengthScore: number; // 0-100
  riskLevel: "low" | "medium" | "high";
  flags: string[];
  suggestedActions: string[];
}

export interface Matter {
  id: string;
  name: string;
  client: string;
  practiceArea: string;
  stage: MatterStage;
  status: MatterStatus;
  jurisdiction: string;
  court?: string;
  judge?: string;
  assignedAttorney: string;
  team: TeamMember[];
  dateOpened: string;
  nextDeadline: string;
  nextCourtDate?: string;
  lastUpdated: string;
  summary: string;
  incidentDate?: string;
  location?: string;
  parties: string[];
  liabilitySummary: string;
  importantDates: ImportantDate[];
  progressPercent: number;
  financials: {
    estimatedValue: number;
    expenses: number;
    outstanding: number;
  };
  activity: ActivityItem[];
  ai: AIInsights;
}

export const mockMatters: Matter[] = [
  {
    id: "FV-2025-0142",
    name: "Johnson v. State Insurance",
    client: "Marcus Johnson",
    practiceArea: "Personal Injury",
    stage: "Negotiation",
    status: "Active",
    jurisdiction: "California — Los Angeles County",
    court: "LA Superior Court",
    judge: "Hon. R. Alvarez",
    assignedAttorney: "Sarah Chen",
    team: [
      { name: "Sarah Chen", role: "Lead Attorney", status: "active", initials: "SC" },
      { name: "David Park", role: "Paralegal", status: "active", initials: "DP" },
      { name: "Lena Ortiz", role: "Legal Assistant", status: "idle", initials: "LO" },
      { name: "Mike Reyes", role: "Intake Specialist", status: "idle", initials: "MR" },
    ],
    dateOpened: "2025-01-12",
    nextDeadline: "2026-05-22",
    nextCourtDate: "2026-06-10",
    lastUpdated: "2026-05-14",
    summary:
      "Auto accident on I-10 involving rear-end collision. Client sustained cervical and lumbar injuries; ongoing physical therapy. Carrier has opened settlement negotiations.",
    incidentDate: "2024-11-03",
    location: "I-10 East, Mile Marker 47, Los Angeles, CA",
    parties: ["Marcus Johnson (Plaintiff)", "Lyndon Hayes (Defendant Driver)", "State Insurance Co. (Carrier)"],
    liabilitySummary:
      "Police report and witness statements support strong liability against defendant driver. Comparative fault appears minimal based on current evidence; verification of dash-cam footage recommended.",
    importantDates: [
      { label: "Mediation Conference", date: "2026-05-22", type: "mediation" },
      { label: "Discovery Cutoff", date: "2026-05-30", type: "discovery" },
      { label: "Status Hearing", date: "2026-06-10", type: "court" },
      { label: "Trial Date (tentative)", date: "2026-09-15", type: "trial" },
    ],
    progressPercent: 62,
    financials: { estimatedValue: 285000, expenses: 14200, outstanding: 6800 },
    activity: [
      { type: "document", text: "Medical records (Dr. Patel) uploaded", who: "David Park", when: "2h ago" },
      { type: "note", text: "Carrier requested updated demand letter", who: "Sarah Chen", when: "1d ago" },
      { type: "task", text: "Draft settlement demand v3", who: "David Park", when: "2d ago" },
      { type: "deadline", text: "Mediation deadline updated to May 22", who: "System", when: "3d ago" },
    ],
    ai: {
      liabilityStrength: "high",
      damagesEstimate: { low: 220000, high: 340000 },
      caseStrengthScore: 78,
      riskLevel: "low",
      flags: [
        "Possible gap in treatment between Dec 2024 and Feb 2025 — should be verified",
        "Defendant carrier may dispute future medical projections",
      ],
      suggestedActions: [
        "Obtain treating physician narrative report",
        "Confirm dash-cam preservation request was served",
        "Prepare mediation brief — attorney review required",
      ],
    },
  },
  {
    id: "FV-2025-0207",
    name: "People v. Whitaker",
    client: "Eric Whitaker",
    practiceArea: "Criminal Defense",
    stage: "Pre-Litigation",
    status: "Active",
    jurisdiction: "Texas — Harris County",
    court: "Harris County Criminal Court 8",
    judge: "Hon. T. Nguyen",
    assignedAttorney: "James Holloway",
    team: [
      { name: "James Holloway", role: "Lead Attorney", status: "active", initials: "JH" },
      { name: "Priya Anand", role: "Paralegal", status: "active", initials: "PA" },
      { name: "Tom Bryce", role: "Legal Assistant", status: "idle", initials: "TB" },
    ],
    dateOpened: "2025-03-04",
    nextDeadline: "2026-05-28",
    nextCourtDate: "2026-05-28",
    lastUpdated: "2026-05-15",
    summary:
      "Felony possession charge stemming from traffic stop. Search procedure may involve constitutional issues; suppression motion under evaluation.",
    incidentDate: "2025-02-19",
    location: "Westheimer Rd & S Gessner, Houston, TX",
    parties: ["State of Texas", "Eric Whitaker (Defendant)"],
    liabilitySummary:
      "Evidence chain remains unclear pending discovery. Body-cam footage requested but not yet produced. Initial review suggests possible Fourth Amendment issue; requires attorney review.",
    importantDates: [
      { label: "Pretrial Hearing", date: "2026-05-28", type: "court" },
      { label: "Discovery Production Deadline", date: "2026-06-12", type: "discovery" },
      { label: "Suppression Motion Filing", date: "2026-06-20", type: "deadline" },
    ],
    progressPercent: 28,
    financials: { estimatedValue: 0, expenses: 4100, outstanding: 1200 },
    activity: [
      { type: "task", text: "Send second discovery request to DA", who: "Priya Anand", when: "5h ago" },
      { type: "note", text: "Witness interview scheduled for next week", who: "James Holloway", when: "1d ago" },
      { type: "document", text: "Arrest report (redacted) uploaded", who: "Priya Anand", when: "4d ago" },
    ],
    ai: {
      liabilityStrength: "medium",
      damagesEstimate: { low: 0, high: 0 },
      caseStrengthScore: 54,
      riskLevel: "medium",
      flags: [
        "Body-cam footage not yet produced — chain of custody should be verified",
        "Possible Fourth Amendment basis for suppression — requires attorney review",
      ],
      suggestedActions: [
        "Follow up on outstanding discovery items",
        "Begin draft of suppression motion for attorney review",
        "Schedule client prep session ahead of pretrial hearing",
      ],
    },
  },
  {
    id: "FV-2024-0981",
    name: "In re Marriage of Caldwell",
    client: "Rebecca Caldwell",
    practiceArea: "Family Law",
    stage: "Litigation",
    status: "Active",
    jurisdiction: "New York — Kings County",
    court: "Kings County Family Court",
    judge: "Hon. M. Greene",
    assignedAttorney: "Aisha Rahman",
    team: [
      { name: "Aisha Rahman", role: "Lead Attorney", status: "active", initials: "AR" },
      { name: "Noah Kim", role: "Paralegal", status: "idle", initials: "NK" },
      { name: "Grace Liu", role: "Legal Assistant", status: "active", initials: "GL" },
    ],
    dateOpened: "2024-09-22",
    nextDeadline: "2026-05-19",
    nextCourtDate: "2026-06-04",
    lastUpdated: "2026-05-13",
    summary:
      "Contested custody dispute with multiple cross-filings. Mediation ongoing; school enrollment and parenting time remain primary disputed issues.",
    incidentDate: undefined,
    location: "Brooklyn, NY",
    parties: ["Rebecca Caldwell (Petitioner)", "Daniel Caldwell (Respondent)", "Minor children (2)"],
    liabilitySummary:
      "Best-interest factors favor petitioner on stability and primary caregiver history. Respondent's filings raise relocation concerns that may involve further evaluation.",
    importantDates: [
      { label: "Mediation Session 4", date: "2026-05-19", type: "mediation" },
      { label: "Custody Evaluation Report Due", date: "2026-05-30", type: "deadline" },
      { label: "Status Conference", date: "2026-06-04", type: "court" },
    ],
    progressPercent: 48,
    financials: { estimatedValue: 0, expenses: 22400, outstanding: 5600 },
    activity: [
      { type: "document", text: "School records produced", who: "Grace Liu", when: "3h ago" },
      { type: "task", text: "Prepare mediation outline", who: "Aisha Rahman", when: "1d ago" },
      { type: "note", text: "Client requested update on relocation motion", who: "Aisha Rahman", when: "2d ago" },
      { type: "deadline", text: "Evaluation report deadline confirmed", who: "System", when: "1w ago" },
    ],
    ai: {
      liabilityStrength: "medium",
      damagesEstimate: { low: 0, high: 0 },
      caseStrengthScore: 66,
      riskLevel: "medium",
      flags: [
        "Relocation motion may involve jurisdictional review",
        "Possible need for additional witness declarations",
      ],
      suggestedActions: [
        "Finalize mediation outline for attorney review",
        "Confirm receipt of custody evaluator's preliminary findings",
        "Prepare client for upcoming status conference",
      ],
    },
  },
  {
    id: "FV-2025-0033",
    name: "Apex Logistics v. Northwind Supply Co.",
    client: "Apex Logistics, Inc.",
    practiceArea: "Business Litigation",
    stage: "Investigation",
    status: "Active",
    jurisdiction: "Delaware — New Castle County",
    court: "Delaware Superior Court",
    judge: "Hon. P. Sullivan",
    assignedAttorney: "Marcus Lin",
    team: [
      { name: "Marcus Lin", role: "Lead Attorney", status: "active", initials: "ML" },
      { name: "Hanna Weiss", role: "Paralegal", status: "active", initials: "HW" },
      { name: "Owen Patel", role: "Legal Assistant", status: "active", initials: "OP" },
      { name: "Cara Diaz", role: "Intake Specialist", status: "idle", initials: "CD" },
    ],
    dateOpened: "2025-04-08",
    nextDeadline: "2026-06-01",
    nextCourtDate: "2026-07-15",
    lastUpdated: "2026-05-15",
    summary:
      "Breach of supply contract dispute involving multi-year master agreement. High document volume; damages model remains unclear pending forensic accounting review.",
    incidentDate: "2025-01-15",
    location: "Wilmington, DE",
    parties: ["Apex Logistics, Inc. (Plaintiff)", "Northwind Supply Co. (Defendant)"],
    liabilitySummary:
      "Breach theory rests on Section 7.2 delivery obligations. Defendant asserts force majeure; the defense may involve fact-specific inquiry that requires attorney review.",
    importantDates: [
      { label: "Document Production Deadline", date: "2026-06-01", type: "discovery" },
      { label: "Expert Disclosure", date: "2026-06-25", type: "deadline" },
      { label: "Pretrial Conference", date: "2026-07-15", type: "court" },
      { label: "Trial Date", date: "2026-10-06", type: "trial" },
    ],
    progressPercent: 35,
    financials: { estimatedValue: 1850000, expenses: 96400, outstanding: 31200 },
    activity: [
      { type: "document", text: "12,400 pages produced from defendant", who: "Hanna Weiss", when: "1h ago" },
      { type: "task", text: "Tag privileged documents (batch 4)", who: "Owen Patel", when: "6h ago" },
      { type: "note", text: "Forensic accountant proposal received", who: "Marcus Lin", when: "1d ago" },
      { type: "deadline", text: "Expert disclosure deadline added", who: "System", when: "5d ago" },
    ],
    ai: {
      liabilityStrength: "medium",
      damagesEstimate: { low: 1200000, high: 2400000 },
      caseStrengthScore: 61,
      riskLevel: "medium",
      flags: [
        "Force majeure defense may involve weather and supply-chain evidence",
        "Damages model unclear — forensic accounting should be verified",
        "High document volume increases privilege review risk",
      ],
      suggestedActions: [
        "Engage forensic accountant for damages model",
        "Prioritize privilege log completion",
        "Prepare deposition outlines for key custodians — attorney review required",
      ],
    },
  },
];

export function getMatterById(id: string): Matter | undefined {
  return mockMatters.find((m) => m.id === id);
}
