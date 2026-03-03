// ═══ SENSO Culture Dashboard — Data & Types ═══

export const pulseData = [
  { month: "Jan", health: 34, connectivity: 7 },
  { month: "Feb", health: 40, connectivity: 8 },
  { month: "Mar", health: 36, connectivity: 9 },
  { month: "Apr", health: 48, connectivity: 11 },
  { month: "May", health: 55, connectivity: 13 },
  { month: "Jun", health: 58, connectivity: 12 },
  { month: "Jul", health: 70, connectivity: 14 },
  { month: "Aug", health: 65, connectivity: 13 },
  { month: "Sep", health: 78, connectivity: 15 },
  { month: "Oct", health: 85, connectivity: 14 },
  { month: "Nov", health: 72, connectivity: 13 },
  { month: "Dec", health: 62, connectivity: 11 },
];

export const insightsData = [
  { text: '"Performance theater" pattern detected in 3 team members', type: "warn" as const },
  { text: "Gap between stated and actual behavior widening in Marketing", type: "alert" as const },
  { text: "New bridge: Finance ↔ Engineering via Maria S.", type: "good" as const },
  { text: "Silence zone between PM and QA reduced by 20%", type: "good" as const },
  { text: "Shadow decision-making detected: 4 key decisions bypassed official channels", type: "alert" as const },
  { text: "Cross-team collaboration score improved in Product ↔ Design", type: "good" as const },
];

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  x: number;
  y: number;
  r: number;
  highlight?: boolean;
}

export const orgNodes: OrgNode[] = [
  { id: "ceo", name: "James K.", role: "CEO", department: "Executive", x: 300, y: 80, r: 28, highlight: true },
  { id: "vpe", name: "Sarah M.", role: "VP Engineering", department: "Engineering", x: 160, y: 200, r: 26, highlight: true },
  { id: "vpp", name: "Michael R.", role: "VP Product", department: "Product", x: 440, y: 200, r: 26 },
  { id: "des", name: "Lisa T.", role: "Head of Design", department: "Design", x: 520, y: 120, r: 22 },
  { id: "eng1", name: "David L.", role: "Tech Lead", department: "Engineering", x: 80, y: 320, r: 22 },
  { id: "eng2", name: "Anna W.", role: "Sr. Engineer", department: "Engineering", x: 200, y: 380, r: 20 },
  { id: "pm1", name: "Chris P.", role: "Product Manager", department: "Product", x: 380, y: 360, r: 22 },
  { id: "mkt", name: "Elena V.", role: "Marketing Lead", department: "Marketing", x: 500, y: 320, r: 22 },
  { id: "qa", name: "Tom H.", role: "QA Lead", department: "QA", x: 120, y: 440, r: 20 },
  { id: "hr", name: "Nina F.", role: "HR Director", department: "HR", x: 340, y: 470, r: 22 },
];

export interface OrgEdge {
  a: string;
  b: string;
  active?: boolean;
  tension?: "low" | "medium" | "high";
}

export const orgEdges: OrgEdge[] = [
  { a: "ceo", b: "vpe", active: true, tension: "medium" },
  { a: "ceo", b: "vpp", tension: "low" },
  { a: "ceo", b: "des", tension: "low" },
  { a: "vpe", b: "eng1", tension: "low" },
  { a: "vpe", b: "eng2", tension: "low" },
  { a: "vpe", b: "vpp", active: true, tension: "high" },
  { a: "vpp", b: "pm1", tension: "low" },
  { a: "vpp", b: "des", tension: "medium" },
  { a: "vpp", b: "mkt", tension: "medium" },
  { a: "eng1", b: "eng2", tension: "low" },
  { a: "eng1", b: "qa", tension: "low" },
  { a: "eng2", b: "qa", tension: "low" },
  { a: "pm1", b: "mkt", tension: "high" },
  { a: "pm1", b: "hr", tension: "low" },
  { a: "mkt", b: "hr", tension: "medium" },
  { a: "ceo", b: "hr", tension: "low" },
];

export interface BridgeDetail {
  edgeKey: string;
  personA: string;
  personB: string;
  tension: string;
  tensionLevel: "low" | "medium" | "high";
  insight: string;
  gives: { who: string; items: string[] }[];
}

export const bridgeDetails: Record<string, BridgeDetail> = {
  "ceo-vpe": {
    edgeKey: "ceo-vpe",
    personA: "James K.",
    personB: "Sarah M.",
    tension: "Medium",
    tensionLevel: "medium",
    insight: "Strategic alignment gap detected. CEO communicates vision through informal channels; VP Engineering receives filtered versions.",
    gives: [
      { who: "James → Sarah", items: ["Strategic vision", "Stakeholder shielding", "Resource allocation"] },
      { who: "Sarah → James", items: ["Technical feasibility", "Team capacity reality", "Risk assessment"] },
    ],
  },
  "vpe-vpp": {
    edgeKey: "vpe-vpp",
    personA: "Sarah M.",
    personB: "Michael R.",
    tension: "High",
    tensionLevel: "high",
    insight: "Critical dysfunction: 67% of cross-functional decisions are made in shadow channels. Formal sync meetings are performative.",
    gives: [
      { who: "Sarah → Michael", items: ["Technical constraints", "Sprint capacity"] },
      { who: "Michael → Sarah", items: ["Market context", "Customer urgency signals"] },
    ],
  },
  "pm1-mkt": {
    edgeKey: "mkt-pm1",
    personA: "Chris P.",
    personB: "Elena V.",
    tension: "High",
    tensionLevel: "high",
    insight: "Misaligned incentives: Product optimizes for retention, Marketing optimizes for acquisition. No shared success metrics.",
    gives: [
      { who: "Chris → Elena", items: ["Feature roadmap", "Release timelines"] },
      { who: "Elena → Chris", items: ["Market positioning", "Competitive intelligence"] },
    ],
  },
  "ceo-vpp": {
    edgeKey: "ceo-vpp",
    personA: "James K.",
    personB: "Michael R.",
    tension: "Low",
    tensionLevel: "low",
    insight: "Strong alignment. Weekly 1:1s are substantive. Decisions documented and shared transparently.",
    gives: [
      { who: "James → Michael", items: ["Board-level context", "Strategic priorities"] },
      { who: "Michael → James", items: ["Customer insights", "Product metrics"] },
    ],
  },
};

export const teamMembers = [
  { name: "James K.", role: "CEO", department: "Executive", alignmentScore: 8.2, dysfunctionRisk: 3.1, bridges: 4 },
  { name: "Sarah M.", role: "VP Engineering", department: "Engineering", alignmentScore: 6.8, dysfunctionRisk: 5.5, bridges: 6 },
  { name: "Michael R.", role: "VP Product", department: "Product", alignmentScore: 7.4, dysfunctionRisk: 4.2, bridges: 5 },
  { name: "Lisa T.", role: "Head of Design", department: "Design", alignmentScore: 8.1, dysfunctionRisk: 2.8, bridges: 3 },
  { name: "David L.", role: "Tech Lead", department: "Engineering", alignmentScore: 7.0, dysfunctionRisk: 3.5, bridges: 4 },
  { name: "Elena V.", role: "Marketing Lead", department: "Marketing", alignmentScore: 5.5, dysfunctionRisk: 6.8, bridges: 2 },
  { name: "Chris P.", role: "Product Manager", department: "Product", alignmentScore: 6.5, dysfunctionRisk: 5.0, bridges: 3 },
];

export const metricsCards = [
  { label: "Dysfunction Level", value: "Moderate (42%)", color: "warn" as const },
  { label: "Active Bridges", value: "12", color: "good" as const },
  { label: "Silence Zones", value: "Finance ↔ Product", color: "neutral" as const },
];

export const declaredValues = ["Transparency", "Collaboration", "Proactivity"];

export const realBehavior = [
  { icon: "💬", val: "95%", label: "of communications in private messages (vs public channels)" },
  { icon: "❓", val: "0", label: "questions asked in all-hands meetings this month" },
  { icon: "🔇", val: "34", label: "instances of cross-department messages ignored" },
];
