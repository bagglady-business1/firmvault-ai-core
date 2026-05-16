// Mock data for the FirmVault AI Review System.
// All values here are illustrative — never to be treated as legal advice.

export type RiskLevel = "high" | "medium" | "low";
export type Confidence = "high" | "medium" | "low";
export type ReviewType = "intake" | "matter" | "document" | "deadline";

export interface PendingReview {
  id: string;
  type: ReviewType;
  title: string;
  client: string;
  practiceArea: string;
  assignedAttorney: string;
  risk: RiskLevel;
  confidence: Confidence;
  flaggedCount: number;
  updatedAt: string;
  summary: string;
}

export interface IntakeReview {
  id: string;
  client: string;
  practiceArea: string;
  receivedAt: string;
  summary: string;
  keyFacts: string[];
  missingInfo: string[];
  unclearDetails: string[];
  followUpQuestions: string[];
  documentsToRequest: string[];
  deadlineWatch: { label: string; dueIn: string; risk: RiskLevel }[];
  referralFlag?: { practiceArea: string; reason: string };
  risk: RiskLevel;
  confidence: Confidence;
}

export interface MatterReview {
  id: string;
  caption: string;
  client: string;
  practiceArea: string;
  attorney: string;
  summary: string;
  liability: RiskLevel;
  damagesRange: string;
  strength: number; // 0–100, illustrative
  risk: RiskLevel;
  confidence: Confidence;
  keyRiskFactors: string[];
  suggestedActions: string[];
  timelineConcerns: string[];
  missingInfo: string[];
}

export interface DocumentReview {
  id: string;
  matterId: string;
  documentName: string;
  documentType: string;
  uploadedAt: string;
  summary: string;
  keyPoints: string[];
  flaggedIssues: { issue: string; risk: RiskLevel }[];
  missingSupportingDocs: string[];
  suggestedActions: string[];
  confidence: Confidence;
}

export interface DeadlineAlert {
  id: string;
  matterId: string;
  matterCaption: string;
  label: string;
  date: string;
  group: "urgent" | "upcoming" | "informational";
  risk: RiskLevel;
  note: string;
}

export const DISCLAIMER =
  "AI-generated insights are for attorney support only and do not constitute legal advice. Attorney review required before relying on this information.";

export const mockPendingReviews: PendingReview[] = [
  {
    id: "rv-001",
    type: "intake",
    title: "New intake — Reyes auto collision",
    client: "M. Reyes",
    practiceArea: "Personal Injury",
    assignedAttorney: "A. Whitman",
    risk: "medium",
    confidence: "medium",
    flaggedCount: 3,
    updatedAt: "2 hours ago",
    summary:
      "Possible rear-end collision claim; liability may be largely clear, damages should be verified.",
  },
  {
    id: "rv-002",
    type: "matter",
    title: "State v. Donnelly — pretrial review",
    client: "J. Donnelly",
    practiceArea: "Criminal Defense",
    assignedAttorney: "R. Okafor",
    risk: "high",
    confidence: "low",
    flaggedCount: 6,
    updatedAt: "5 hours ago",
    summary:
      "Evidence appears unclear; discovery pending. High uncertainty — attorney review required.",
  },
  {
    id: "rv-003",
    type: "matter",
    title: "In re Marriage of Patel — custody",
    client: "S. Patel",
    practiceArea: "Family Law",
    assignedAttorney: "L. Becker",
    risk: "medium",
    confidence: "medium",
    flaggedCount: 4,
    updatedAt: "yesterday",
    summary:
      "Custody conflict with unclear timeline; documentation gaps should be addressed.",
  },
  {
    id: "rv-004",
    type: "document",
    title: "Nordlux LLC — master services agreement",
    client: "Nordlux LLC",
    practiceArea: "Business Litigation",
    assignedAttorney: "T. Alvarez",
    risk: "medium",
    confidence: "high",
    flaggedCount: 2,
    updatedAt: "yesterday",
    summary:
      "Contract dispute; damages unclear. High document volume — staged review recommended.",
  },
  {
    id: "rv-005",
    type: "deadline",
    title: "Statute of limitations watch — Reyes",
    client: "M. Reyes",
    practiceArea: "Personal Injury",
    assignedAttorney: "A. Whitman",
    risk: "high",
    confidence: "medium",
    flaggedCount: 1,
    updatedAt: "today",
    summary:
      "Possible SOL window approaching; date should be verified against jurisdiction.",
  },
];

export const mockIntakeReviews: IntakeReview[] = [
  {
    id: "in-001",
    client: "M. Reyes",
    practiceArea: "Personal Injury",
    receivedAt: "May 14, 2026",
    risk: "medium",
    confidence: "medium",
    summary:
      "Possible rear-end auto collision on I-35 with reported soft-tissue injuries. Liability may be largely clear based on the client narrative; damages and treatment scope should be verified.",
    keyFacts: [
      "Reported rear-end collision, May 2, 2026",
      "Police report referenced but not yet provided",
      "Initial ER visit reported; ongoing physical therapy mentioned",
      "Other driver reportedly insured (carrier not confirmed)",
    ],
    missingInfo: [
      "Copy of police/incident report",
      "Insurance declarations page for both parties",
      "Itemized medical bills and treatment timeline",
      "Lost wage documentation from employer",
    ],
    unclearDetails: [
      "Conflict between stated injury onset date and first treatment date",
      "Prior similar injury history requires confirmation",
    ],
    followUpQuestions: [
      "Were there any independent witnesses to the collision?",
      "Has the client given any recorded statement to an insurer?",
      "Are there prior accidents or pre-existing conditions that should be disclosed?",
    ],
    documentsToRequest: [
      "Police report",
      "Medical records from ER and PT provider",
      "Photographs of vehicle damage and scene",
      "Employer wage statement",
    ],
    deadlineWatch: [
      { label: "Possible statute of limitations window", dueIn: "in ~22 months", risk: "medium" },
      { label: "Insurer response deadline (claim acknowledgment)", dueIn: "in 9 days", risk: "low" },
    ],
    referralFlag: undefined,
  },
  {
    id: "in-002",
    client: "J. Donnelly",
    practiceArea: "Criminal Defense",
    receivedAt: "May 12, 2026",
    risk: "high",
    confidence: "low",
    summary:
      "Possible misdemeanor charge involving disputed identification. Evidence appears unclear and discovery is pending — facts should be verified before any case strategy is set.",
    keyFacts: [
      "Arraignment reportedly scheduled",
      "Client denies involvement; alibi witness mentioned",
      "Bodycam footage referenced but not produced",
    ],
    missingInfo: [
      "Charging documents",
      "Discovery package from prosecution",
      "Contact details for alibi witness",
    ],
    unclearDetails: [
      "Date and time of alleged offense conflict between client and report",
      "Whether client gave any post-arrest statement is unclear",
    ],
    followUpQuestions: [
      "Has the client been advised not to discuss the matter with law enforcement?",
      "Are there any prior cases or open matters in any jurisdiction?",
    ],
    documentsToRequest: [
      "Criminal complaint and charging instrument",
      "Bodycam and dashcam footage",
      "Witness statements",
    ],
    deadlineWatch: [
      { label: "Next court appearance", dueIn: "in 6 days", risk: "high" },
      { label: "Discovery motion window", dueIn: "in 14 days", risk: "medium" },
    ],
    referralFlag: undefined,
  },
  {
    id: "in-003",
    client: "S. Patel",
    practiceArea: "Family Law",
    receivedAt: "May 10, 2026",
    risk: "medium",
    confidence: "medium",
    summary:
      "Possible custody dispute with unclear timeline of separation and contested parenting schedule. Documentation gaps should be addressed before responsive pleadings.",
    keyFacts: [
      "Two minor children referenced",
      "Informal parenting schedule reportedly in place",
      "Allegations of missed exchanges — should be verified",
    ],
    missingInfo: [
      "Marriage certificate and any prior court orders",
      "Income documentation for both parties",
      "School and medical records for the children",
    ],
    unclearDetails: [
      "Exact date of separation",
      "Whether mediation has previously been attempted",
    ],
    followUpQuestions: [
      "Are there any safety concerns that should be disclosed to the attorney?",
      "Are both parents currently in the same county/jurisdiction?",
    ],
    documentsToRequest: [
      "Existing court orders, if any",
      "Communication logs regarding parenting time",
      "Financial statements for the past 12 months",
    ],
    deadlineWatch: [
      { label: "Response window if a petition is filed", dueIn: "tentative", risk: "medium" },
    ],
    referralFlag: {
      practiceArea: "Domestic Violence Advocacy",
      reason:
        "Client narrative includes language that may involve safety concerns. Referral should be verified by attorney.",
    },
  },
  {
    id: "in-004",
    client: "Nordlux LLC",
    practiceArea: "Business Litigation",
    receivedAt: "May 8, 2026",
    risk: "medium",
    confidence: "high",
    summary:
      "Possible breach of contract claim involving a master services agreement and disputed deliverables. Damages may involve both direct and consequential components — requires confirmation.",
    keyFacts: [
      "Master services agreement signed Q3 2024",
      "Allegation: vendor failed to deliver phase 2 milestones",
      "Counterparty disputes scope change order",
    ],
    missingInfo: [
      "Signed change orders",
      "Email chain regarding milestone acceptance",
      "Internal cost records to support damages",
    ],
    unclearDetails: [
      "Whether arbitration clause has been triggered",
      "Effective notice-of-default date is unclear",
    ],
    followUpQuestions: [
      "Has any pre-suit notice already been sent?",
      "Are there parallel disputes with related entities?",
    ],
    documentsToRequest: [
      "Fully executed MSA and all amendments",
      "Project management records and status reports",
      "Invoices and payment ledger",
    ],
    deadlineWatch: [
      { label: "Contractual notice-and-cure period", dueIn: "in 18 days", risk: "medium" },
    ],
    referralFlag: undefined,
  },
];

export const mockMatterReviews: MatterReview[] = [
  {
    id: "mt-001",
    caption: "Reyes v. Atlas Logistics",
    client: "M. Reyes",
    practiceArea: "Personal Injury",
    attorney: "A. Whitman",
    summary:
      "Rear-end motor vehicle collision. Liability appears largely clear based on available facts; damages are moderate and insurance negotiation is ongoing.",
    liability: "low",
    damagesRange: "$45,000 – $90,000 (illustrative, should be verified)",
    strength: 72,
    risk: "medium",
    confidence: "medium",
    keyRiskFactors: [
      "Possible prior similar injury — requires confirmation",
      "Treatment gap between ER visit and PT may affect causation argument",
    ],
    suggestedActions: [
      "Confirm carrier and policy limits with opposing insurer",
      "Obtain complete medical records and itemized billing",
      "Document any wage loss with employer letter",
    ],
    timelineConcerns: [
      "Possible statute of limitations window — date should be verified per jurisdiction",
    ],
    missingInfo: ["Police report", "Property damage estimate", "Pre-accident medical history"],
  },
  {
    id: "mt-002",
    caption: "State v. Donnelly",
    client: "J. Donnelly",
    practiceArea: "Criminal Defense",
    attorney: "R. Okafor",
    summary:
      "Pretrial criminal matter with disputed identification. Evidence is unclear and discovery is pending. Outcome cannot be predicted — attorney should review all materials before strategy is set.",
    liability: "high",
    damagesRange: "Not applicable",
    strength: 38,
    risk: "high",
    confidence: "low",
    keyRiskFactors: [
      "Identification evidence may involve reliability concerns",
      "Possible inconsistencies between report and bodycam",
      "Alibi witness availability requires confirmation",
    ],
    suggestedActions: [
      "File discovery request for bodycam and dispatch logs",
      "Interview alibi witness and document statement",
      "Consider motion to suppress, pending review of stop circumstances",
    ],
    timelineConcerns: [
      "Next appearance in 6 days",
      "Discovery motion window closes in 14 days",
    ],
    missingInfo: ["Discovery package", "Witness statements", "Forensic reports, if any"],
  },
  {
    id: "mt-003",
    caption: "In re Marriage of Patel",
    client: "S. Patel",
    practiceArea: "Family Law",
    attorney: "L. Becker",
    summary:
      "Custody dispute with unclear timeline of separation and contested parenting schedule. Documentation gaps should be addressed before responsive filings.",
    liability: "medium",
    damagesRange: "Support range to be determined (requires confirmation)",
    strength: 55,
    risk: "medium",
    confidence: "medium",
    keyRiskFactors: [
      "Allegations regarding missed exchanges may involve credibility issues",
      "Possible jurisdictional question if either parent has relocated",
    ],
    suggestedActions: [
      "Confirm separation date through documentary evidence",
      "Compile parenting-time communication log",
      "Verify whether prior mediation occurred",
    ],
    timelineConcerns: [
      "Tentative response window if petition is filed — should be calendared",
    ],
    missingInfo: ["Income documentation", "Prior orders, if any", "School records"],
  },
  {
    id: "mt-004",
    caption: "Nordlux LLC v. Beacon Systems",
    client: "Nordlux LLC",
    practiceArea: "Business Litigation",
    attorney: "T. Alvarez",
    summary:
      "Possible breach of a master services agreement involving disputed deliverables. Damages are unclear; the matter involves a high document volume that should be staged for review.",
    liability: "medium",
    damagesRange: "$250,000 – $1.2M (illustrative, requires confirmation)",
    strength: 64,
    risk: "medium",
    confidence: "high",
    keyRiskFactors: [
      "Arbitration clause may control forum — should be verified",
      "Scope change orders may involve waiver arguments",
    ],
    suggestedActions: [
      "Issue litigation hold across project channels",
      "Stage document review by milestone phase",
      "Confirm notice-of-default chronology",
    ],
    timelineConcerns: [
      "Contractual notice-and-cure period closes in 18 days",
    ],
    missingInfo: ["Signed change orders", "Internal cost records", "Acceptance correspondence"],
  },
];

export const mockDocumentReviews: DocumentReview[] = [
  {
    id: "doc-001",
    matterId: "mt-004",
    documentName: "Nordlux–Beacon MSA (executed).pdf",
    documentType: "Master Services Agreement",
    uploadedAt: "May 13, 2026",
    confidence: "high",
    summary:
      "Executed master services agreement between Nordlux LLC and Beacon Systems dated Q3 2024. Contains an arbitration clause and milestone-based payment terms. Several provisions should be verified against the version exchanged in negotiations.",
    keyPoints: [
      "Milestone-based payment with 30-day acceptance window",
      "Arbitration clause designating a specific forum",
      "Limitation of liability capped at fees paid in prior 12 months",
      "Change orders require written signature by both parties",
    ],
    flaggedIssues: [
      { issue: "Arbitration clause may control forum — requires confirmation", risk: "medium" },
      { issue: "Limitation of liability may affect recoverable damages", risk: "high" },
      { issue: "Notice provision lists outdated counterparty address", risk: "low" },
    ],
    missingSupportingDocs: [
      "Signed change orders for phase 2",
      "Acceptance emails for prior milestones",
      "Statements of work referenced in §3.2",
    ],
    suggestedActions: [
      "Compare executed copy against last negotiated draft",
      "Confirm notice was properly served per §14",
      "Flag limitation-of-liability clause for attorney review",
    ],
  },
  {
    id: "doc-002",
    matterId: "mt-001",
    documentName: "Reyes — ER discharge summary.pdf",
    documentType: "Medical Record",
    uploadedAt: "May 11, 2026",
    confidence: "medium",
    summary:
      "Emergency department discharge summary referencing soft-tissue cervical strain following a reported motor vehicle collision. Imaging notes appear inconclusive; follow-up with PT is recommended in the record.",
    keyPoints: [
      "Chief complaint: neck and back pain post-MVC",
      "Imaging: no acute fracture noted",
      "Discharge instructions reference PT referral",
    ],
    flaggedIssues: [
      { issue: "Possible inconsistency between reported injury onset and arrival time", risk: "medium" },
      { issue: "Prior similar complaint referenced — requires confirmation", risk: "medium" },
    ],
    missingSupportingDocs: [
      "Imaging studies (CT/X-ray)",
      "PT intake evaluation",
      "Itemized billing",
    ],
    suggestedActions: [
      "Request full imaging set and radiology reads",
      "Obtain PT records and treatment plan",
      "Confirm prior history through records request",
    ],
  },
];

export const mockDeadlineAlerts: DeadlineAlert[] = [
  {
    id: "dl-001",
    matterId: "mt-002",
    matterCaption: "State v. Donnelly",
    label: "Next court appearance",
    date: "May 22, 2026",
    group: "urgent",
    risk: "high",
    note: "Appearance in 6 days. Date should be verified against the court docket.",
  },
  {
    id: "dl-002",
    matterId: "mt-004",
    matterCaption: "Nordlux LLC v. Beacon Systems",
    label: "Notice-and-cure period closes",
    date: "Jun 3, 2026",
    group: "upcoming",
    risk: "medium",
    note: "Contractual cure window — confirm chronology of default notice.",
  },
  {
    id: "dl-003",
    matterId: "mt-001",
    matterCaption: "Reyes v. Atlas Logistics",
    label: "Possible statute of limitations window",
    date: "~Mar 2028",
    group: "informational",
    risk: "medium",
    note: "SOL date depends on jurisdiction and accrual — requires confirmation.",
  },
  {
    id: "dl-004",
    matterId: "mt-002",
    matterCaption: "State v. Donnelly",
    label: "Discovery motion window",
    date: "May 30, 2026",
    group: "upcoming",
    risk: "medium",
    note: "Possible motion to compel if discovery remains outstanding.",
  },
  {
    id: "dl-005",
    matterId: "mt-003",
    matterCaption: "In re Marriage of Patel",
    label: "Possible missing response deadline",
    date: "TBD",
    group: "informational",
    risk: "low",
    note: "If petition has been served, response window may already be running — should be verified.",
  },
  {
    id: "dl-006",
    matterId: "mt-001",
    matterCaption: "Reyes v. Atlas Logistics",
    label: "Overdue: insurer acknowledgment follow-up",
    date: "May 14, 2026",
    group: "urgent",
    risk: "high",
    note: "Follow-up appears overdue per file notes — attorney should review.",
  },
];

export const reviewTypeLabels: Record<ReviewType, string> = {
  intake: "Intake",
  matter: "Matter",
  document: "Document",
  deadline: "Deadline",
};
