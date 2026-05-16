export const mockMatters = [
  { id: "M-1042", title: "Hartwell v. Continental Holdings", client: "Hartwell Industries", stage: "Discovery", status: "active", lead: "S. Okafor", updated: "2h ago" },
  { id: "M-1039", title: "Estate of Margaret Vance", client: "Vance Family Trust", stage: "Probate", status: "active", lead: "J. Park", updated: "5h ago" },
  { id: "M-1031", title: "Northbridge Acquisition", client: "Northbridge LLC", stage: "Negotiation", status: "review", lead: "A. Reyes", updated: "1d ago" },
  { id: "M-1028", title: "Patel IP Infringement", client: "Patel Technologies", stage: "Filing", status: "urgent", lead: "S. Okafor", updated: "3d ago" },
  { id: "M-1019", title: "Coleman Employment Dispute", client: "Coleman & Co.", stage: "Mediation", status: "active", lead: "M. Lin", updated: "1w ago" },
];

export const mockIntakes = [
  { id: "IN-2207", name: "Daniel Whitmore", matter: "Personal Injury", source: "Web Form", risk: "high", received: "12 min ago" },
  { id: "IN-2206", name: "Lakeside Medical Group", matter: "Contract Review", source: "Referral", risk: "medium", received: "1h ago" },
  { id: "IN-2205", name: "Avery Sutton", matter: "Family Law", source: "Phone", risk: "low", received: "3h ago" },
  { id: "IN-2204", name: "Brightway Logistics", matter: "Commercial Litigation", source: "Email", risk: "high", received: "Yesterday" },
];

export const mockDeadlines = [
  { id: "D-501", matter: "Hartwell v. Continental", task: "Motion to Compel", due: "Tomorrow, 5:00 PM", priority: "critical" },
  { id: "D-498", matter: "Patel IP Infringement", task: "Response Brief", due: "In 3 days", priority: "high" },
  { id: "D-495", matter: "Northbridge Acquisition", task: "Due Diligence Report", due: "In 5 days", priority: "medium" },
  { id: "D-492", matter: "Coleman Employment", task: "Mediation Statement", due: "Next Monday", priority: "medium" },
];

export const mockTasks = [
  { id: "T-9011", title: "Review deposition transcript", matter: "Hartwell", assignee: "S. Okafor", status: "in_progress", due: "Today" },
  { id: "T-9008", title: "Draft settlement memo", matter: "Coleman", assignee: "M. Lin", status: "todo", due: "Tomorrow" },
  { id: "T-9005", title: "File NDA with court", matter: "Northbridge", assignee: "A. Reyes", status: "review", due: "Fri" },
];

export const mockAIAlerts = [
  { id: "AI-77", title: "Conflicting clause detected", matter: "Northbridge Acquisition", severity: "high", summary: "Section 4.2 indemnity conflicts with prior MSA terms." },
  { id: "AI-76", title: "Missing statute citation", matter: "Patel IP", severity: "medium", summary: "Brief references Title 35 §271 without sub-section." },
  { id: "AI-75", title: "Privileged content in upload", matter: "Hartwell", severity: "critical", summary: "Detected attorney-client privileged language in shared exhibit." },
];

export const mockActiveUsers = [
  { id: "u1", name: "Sade Okafor", role: "Senior Partner", initials: "SO", status: "online" },
  { id: "u2", name: "Jiwoo Park", role: "Associate", initials: "JP", status: "online" },
  { id: "u3", name: "Ana Reyes", role: "Counsel", initials: "AR", status: "in_matter" },
  { id: "u4", name: "Marcus Lin", role: "Paralegal", initials: "ML", status: "idle" },
];

export const mockActivity = [
  { id: "a1", who: "Sade Okafor", what: "filed motion in", target: "Hartwell v. Continental", time: "8 min ago" },
  { id: "a2", who: "AI Review", what: "flagged clause in", target: "Northbridge Acquisition", time: "22 min ago" },
  { id: "a3", who: "Jiwoo Park", what: "added note to", target: "Estate of Vance", time: "1h ago" },
  { id: "a4", who: "Ana Reyes", what: "uploaded 3 documents to", target: "Patel IP", time: "2h ago" },
];

export const mockOffers = [
  { id: "O-220", matter: "Coleman Employment", party: "Coleman & Co.", amount: "$185,000", status: "countered", updated: "Today" },
  { id: "O-219", matter: "Hartwell v. Continental", party: "Continental Holdings", amount: "$1.2M", status: "pending", updated: "Yesterday" },
];

export const mockDocuments = [
  { id: "DOC-3301", name: "Hartwell_Deposition_Transcript.pdf", matter: "Hartwell", size: "4.2 MB", updated: "2h ago", tag: "Deposition" },
  { id: "DOC-3300", name: "Northbridge_MSA_v3.docx", matter: "Northbridge", size: "812 KB", updated: "Today", tag: "Contract" },
  { id: "DOC-3298", name: "Patel_PriorArt_Exhibit.pdf", matter: "Patel IP", size: "9.1 MB", updated: "Yesterday", tag: "Exhibit" },
];

export const mockFirmUsers = [
  { id: "fu1", name: "Sade Okafor", email: "s.okafor@firm.law", role: "Senior Partner", status: "active" },
  { id: "fu2", name: "Jiwoo Park", email: "j.park@firm.law", role: "Associate", status: "active" },
  { id: "fu3", name: "Ana Reyes", email: "a.reyes@firm.law", role: "Counsel", status: "active" },
  { id: "fu4", name: "Marcus Lin", email: "m.lin@firm.law", role: "Paralegal", status: "active" },
  { id: "fu5", name: "Elena Vasquez", email: "e.vasquez@firm.law", role: "Admin", status: "invited" },
];
