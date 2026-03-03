import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import TeamSection from "@/components/dashboard/sections/TeamSection";
import NetworkSection from "@/components/dashboard/sections/NetworkSection";
import DiagnosticSection from "@/components/dashboard/sections/DiagnosticSection";
import DataFlowSection from "@/components/dashboard/sections/DataFlowSection";

// ─── Network Graph SVG ───
interface NodeData {
  id: string; x: number; y: number; label: string; r: number; tier: number;
}

function NetworkGraph({ phase }: { phase: number }) {
  const nodes: NodeData[] = [
    { id: "ceo", x: 250, y: 40, label: "CEO", r: 22, tier: 0 },
    { id: "vpe", x: 120, y: 130, label: "VP Eng", r: 18, tier: 1 },
    { id: "vpp", x: 380, y: 130, label: "VP Prod", r: 18, tier: 1 },
    { id: "vps", x: 250, y: 150, label: "VP Sales", r: 16, tier: 1 },
    { id: "em1", x: 60, y: 230, label: "Eng Lead", r: 13, tier: 2 },
    { id: "em2", x: 160, y: 250, label: "Eng Lead", r: 13, tier: 2 },
    { id: "pm1", x: 330, y: 240, label: "PM Lead", r: 13, tier: 2 },
    { id: "pm2", x: 430, y: 220, label: "PM Lead", r: 13, tier: 2 },
    { id: "ic1", x: 40, y: 320, label: "IC", r: 9, tier: 3 },
    { id: "ic2", x: 110, y: 330, label: "IC", r: 9, tier: 3 },
    { id: "ic3", x: 190, y: 340, label: "IC", r: 9, tier: 3 },
    { id: "ic4", x: 300, y: 330, label: "IC", r: 9, tier: 3 },
    { id: "ic5", x: 390, y: 320, label: "IC", r: 9, tier: 3 },
    { id: "ic6", x: 460, y: 340, label: "IC", r: 9, tier: 3 },
  ];

  const edges = [
    { from: "ceo", to: "vpe" }, { from: "ceo", to: "vpp" }, { from: "ceo", to: "vps" },
    { from: "vpe", to: "em1" }, { from: "vpe", to: "em2" },
    { from: "vpp", to: "pm1" }, { from: "vpp", to: "pm2" },
    { from: "em1", to: "ic1" }, { from: "em1", to: "ic2" },
    { from: "em2", to: "ic3" }, { from: "pm1", to: "ic4" },
    { from: "pm2", to: "ic5" }, { from: "pm2", to: "ic6" },
    { from: "vps", to: "pm1" },
  ];

  const conflictEdges = phase >= 2 ? [
    { from: "vpe", to: "vpp", type: "conflict" },
    { from: "em2", to: "ceo", type: "shadow" },
  ] : [];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;
  const phaseColors = ["#4ECDC4", "#818CF8", "#F59E0B", "#34D399", "#4ECDC4"];
  const activeColor = phaseColors[phase] || "#4ECDC4";

  const scannedNodes = phase === 0 ? ["ceo", "vpe", "vpp", "vps"]
    : phase === 1 ? ["ceo", "vpe", "vpp", "vps", "em1", "em2", "pm1", "pm2"]
    : nodes.map(n => n.id);

  return (
    <svg viewBox="0 0 500 370" className="w-full h-auto" style={{ opacity: 0.95 }}>
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor={activeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {edges.map((e, i) => {
        const a = getNode(e.from), b = getNode(e.to);
        const scanned = scannedNodes.includes(e.from) && scannedNodes.includes(e.to);
        return (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={scanned ? `${activeColor}40` : "rgba(255,255,255,0.04)"}
            strokeWidth={scanned ? 1.5 : 0.5}
            style={{ transition: "all 0.8s ease" }}
          />
        );
      })}

      {conflictEdges.map((e, i) => {
        const a = getNode(e.from), b = getNode(e.to);
        return (
          <g key={`c${i}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={e.type === "conflict" ? "#EF4444" : "#F59E0B"}
              strokeWidth={2.5} strokeDasharray={e.type === "shadow" ? "6,4" : "none"}
              filter="url(#glow)"
              className="animate-pulse"
            />
            <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}
              fill={e.type === "conflict" ? "#EF4444" : "#F59E0B"}
              fontSize="8" fontWeight="600" textAnchor="middle"
            >
              {e.type === "conflict" ? "⚡ CONFLICT" : "⚠ SHADOW"}
            </text>
          </g>
        );
      })}

      {nodes.map((n) => {
        const scanned = scannedNodes.includes(n.id);
        const isConflict = phase >= 2 && (n.id === "vpe" || n.id === "vpp");
        const isShadow = phase >= 2 && n.id === "em2";
        return (
          <g key={n.id} style={{ transition: "all 0.6s ease" }}>
            {scanned && <circle cx={n.x} cy={n.y} r={n.r * 2.5} fill="url(#nodeGlow)" />}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={isConflict ? "rgba(239,68,68,0.25)" : isShadow ? "rgba(245,158,11,0.25)" : scanned ? `${activeColor}20` : "rgba(255,255,255,0.03)"}
              stroke={isConflict ? "#EF4444" : isShadow ? "#F59E0B" : scanned ? activeColor : "rgba(255,255,255,0.08)"}
              strokeWidth={isConflict || isShadow ? 2 : scanned ? 1.5 : 0.5}
              style={{ transition: "all 0.6s ease" }}
            />
            <text x={n.x} y={n.y + 3.5} fill={scanned ? "#fff" : "rgba(255,255,255,0.2)"}
              fontSize={n.tier === 0 ? "9" : n.tier === 3 ? "6" : "7.5"}
              fontWeight={n.tier < 2 ? "600" : "400"}
              textAnchor="middle"
              style={{ transition: "fill 0.6s" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Scenario Data ───
interface Finding { severity: string; label: string; color: string; }
interface ReportItem { label: string; score: number; color: string; }
interface Outcome { label: string; before: string; after: string; delta: string; color: string; }
interface Phase {
  key: string; color: string; icon: string;
  title: string; time: string; action: string; method: string; metric: string;
  findings?: Finding[];
  report?: { score: number; items: ReportItem[] };
  outcomes?: Outcome[];
}

const phases: Phase[] = [
  {
    key: "SENSE", color: "#4ECDC4", icon: "◎",
    title: "Reading the Landscape",
    time: "Day 1 · 4 hours",
    action: "Diagnostic Agent initiates confidential structured interviews with 12 stakeholders across 3 organizational levels.",
    method: "Clinical interview methodology adapted from organizational psychology. Questions designed to bypass defensive responses and surface root causes.",
    metric: "12 interviews completed · 47 distinct organizational signals captured · 3 anomaly patterns flagged for deep analysis",
  },
  {
    key: "ENGAGE", color: "#818CF8", icon: "◉",
    title: "Surfacing What Nobody Will Say",
    time: "Day 1–2 · 8 hours",
    action: "Cultural Sensing Agent tracks language patterns, sentiment trajectories, and avoidance behaviors across all conversations simultaneously.",
    method: "People tell AI what they'd never tell HR. No political agenda, no career to protect. Structural neutrality produces deeper candor than any human third party.",
    metric: "8/12 stakeholders use passive voice on product decisions · 6 reference 'alignment meetings' with negative sentiment · Trust deficit score: 7.2/10",
  },
  {
    key: "NAVIGATE", color: "#F59E0B", icon: "◈",
    title: "Mapping the Real Org Chart",
    time: "Day 2 · 4 hours",
    action: "Agents cross-reference all conversations to build a dysfunction map — who blocks whom, where decisions stall, which alliances drive behavior.",
    method: "Organizational Knowledge Graph updated with typed relationships: REPORTS_TO, COLLABORATES_WITH, CONFLICTS_WITH, BLOCKS. Every edge has evidence.",
    metric: "3 hidden friction patterns identified · 2 shadow decision paths mapped · 1 cultural split quantified · All invisible in 6 months of leadership meetings",
    findings: [
      { severity: "Critical", label: "VP Eng ↔ VP Product: trust breakdown over roadmap ownership", color: "#EF4444" },
      { severity: "High", label: "Middle managers routing around skip-level via shadow process", color: "#F59E0B" },
      { severity: "High", label: "Cultural split: founding team vs. post-Series B hires on risk", color: "#F59E0B" },
    ],
  },
  {
    key: "SOLVE", color: "#34D399", icon: "◆",
    title: "From Patterns to Action",
    time: "Day 2 · delivered",
    action: "Synthesis Agent produces 50-page Organizational Health Report. Every claim traceable to source conversations.",
    method: "Not generic recommendations. Specific dysfunction patterns with anonymized evidence chains. Prioritized intervention roadmap with effort/impact scoring.",
    metric: "50-page report · 3 root causes identified · 8 interventions recommended · 48 hours total · $15,000 vs. $200K+ traditional",
    report: {
      score: 38,
      items: [
        { label: "Leadership Alignment", score: 28, color: "#EF4444" },
        { label: "Decision Velocity", score: 35, color: "#EF4444" },
        { label: "Cultural Cohesion", score: 41, color: "#F59E0B" },
        { label: "Cross-Functional Flow", score: 32, color: "#EF4444" },
        { label: "Talent Retention Risk", score: 52, color: "#F59E0B" },
      ],
    },
  },
  {
    key: "ORGANIZE", color: "#4ECDC4", icon: "◇",
    title: "From Report to Infrastructure",
    time: "Ongoing",
    action: "Agents remain embedded. Live culture dashboard. Proactive alerts when patterns re-emerge. SENSO becomes organizational infrastructure.",
    method: "This is why we have 0% churn. Clients don't leave because SENSO isn't a project — it's the operating system for organizational health.",
    metric: "Month 3: VP conflict resolved · Shadow decisions eliminated · Engineering attrition ↓40% · Cross-functional delivery ↑2x",
    outcomes: [
      { label: "Engineering Attrition", before: "24%", after: "14%", delta: "-40%", color: "#34D399" },
      { label: "Decision Cycle Time", before: "18 days", after: "7 days", delta: "-61%", color: "#34D399" },
      { label: "Cross-Team Delivery", before: "Baseline", after: "2x", delta: "+100%", color: "#34D399" },
      { label: "Coordination Overhead", before: "35%", after: "18%", delta: "-49%", color: "#34D399" },
    ],
  },
];

// ─── Diagnostic Questions ───
const dxQuestions = [
  { q: "What's your role?", opts: ["CEO / Founder", "VP / C-Suite", "Director / Head of", "Board Member / Investor"] },
  { q: "Company size?", opts: ["10–50", "50–200", "200–1,000", "1,000+"] },
  { q: "Biggest organizational pain right now?", opts: [
    "Good people leave — nobody knows why",
    "Decisions stall — meetings produce nothing",
    "Leadership team misaligned — disagree silently",
    "Culture feels off — surveys say it's fine",
  ]},
  { q: "How does cross-team work feel?", opts: [
    "Smooth — teams align naturally",
    "Okay — occasional friction",
    "Difficult — projects stall between teams",
    "Broken — silos, politics, passive resistance",
  ]},
  { q: "Have you tried solving this before?", opts: [
    "McKinsey / BCG / Big 4 — expensive, generic",
    "Internal task force — no real change",
    "Executive coach — helped individuals, not system",
    "Nothing yet — don't know where to start",
  ]},
];

interface DxReport {
  score: number;
  riskLevel: string;
  findings: string[];
  hiddenRisks: string[];
  costEstimate: string;
  recommendation: string;
  urgency: string;
}

const sc = (v: number) => v >= 60 ? "#34D399" : v >= 40 ? "#F59E0B" : "#EF4444";
const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

// ─── Shared Styles ───
const cardStyle = "bg-[rgba(18,32,56,0.8)] backdrop-blur-xl border border-[rgba(78,205,196,0.08)] rounded-[20px] p-8 hover:border-[rgba(78,205,196,0.2)] transition-colors";
const glowStyle = "shadow-[0_0_40px_rgba(78,205,196,0.06),inset_0_1px_0_rgba(255,255,255,0.04)]";
const labelStyle = "text-[11px] font-bold tracking-[0.25em] uppercase mb-3.5";
const bodyStyle = "text-[15px] leading-[1.75] text-[rgba(238,240,244,0.55)]";

export default function DemoPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [dxStep, setDxStep] = useState(0);
  const [dxAnswers, setDxAnswers] = useState<string[]>([]);
  const [dxReport, setDxReport] = useState<DxReport | null>(null);
  const [dxLoading, setDxLoading] = useState(false);
  const [employees, setEmployees] = useState(200);
  const [managers, setManagers] = useState(20);
  const [salary, setSalary] = useState(130000);
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  const p = phases[activePhase];

  // Auto-advance walkthrough (only if user hasn't clicked)
  useEffect(() => {
    if (userClicked) return;
    const t = setInterval(() => {
      setActivePhase(prev => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(t);
  }, [activePhase, userClicked]);

  // Diagnostic handler
  const handleDxAnswer = (ans: string) => {
    const newAns = [...dxAnswers, ans];
    setDxAnswers(newAns);
    if (dxStep < dxQuestions.length - 1) {
      setDxStep(dxStep + 1);
    } else {
      setDxLoading(true);
      // Simulate agent analysis
      setTimeout(() => {
        setDxReport({
          score: 34, riskLevel: "High",
          findings: [
            "Leadership misalignment is creating cascading decision bottlenecks — teams wait for clarity that never arrives",
            "Gap between stated culture and actual behavior suggests your engagement data is masking systemic dysfunction",
            "Top performers are likely already interviewing — attrition accelerates when organizational pain goes unaddressed",
          ],
          hiddenRisks: [
            "Shadow governance: informal decision channels are replacing formal ones, eroding trust in leadership",
            "Innovation debt: cultural friction is killing initiative before ideas reach the surface",
          ],
          costEstimate: "$280K–$520K annually",
          recommendation: "A 48-hour Strategic Health Check would identify the specific friction patterns, map root causes with evidence, and deliver a prioritized intervention plan.",
          urgency: "Every month of delay compounds the dysfunction — the cost of inaction exceeds the cost of diagnosis by 10–20x.",
        });
        setDxLoading(false);
      }, 2500);
    }
  };

  // ROI calcs
  const waste = managers * salary * 0.35;
  const savings = waste * 0.30;
  const payback = Math.round(15000 / (savings / 365));
  const roi = Math.round(((savings - 15000) / 15000) * 100);

  return (
    <div className="min-h-screen bg-[#0B1628] text-[#EEF0F4]">
      <Navbar />
      <div className="pt-[72px]">

        {/* ═══ HERO ═══ */}
        <section className="relative text-center px-7 pt-16 pb-10 overflow-hidden">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(78,205,196,0.06)_0%,transparent_70%)] pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className={`${labelStyle} text-accent`}>SENSO · INTERACTIVE DEMO</p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-bold text-[clamp(36px,7vw,64px)] leading-[1.1] max-w-[700px] mx-auto mb-5"
          >
            See what's <em className="text-accent italic">invisible</em> in your organization
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className={`${bodyStyle} max-w-[500px] mx-auto`}
          >
            Walk through a real diagnostic scenario, try the agent yourself, and calculate your cost of dysfunction.
          </motion.p>
        </section>

        {/* ═══ SECTION 1: LIVE WALKTHROUGH ═══ */}
        <section className="max-w-[960px] mx-auto px-7 py-10">
          <p className={labelStyle} style={{ color: p.color }}>Live Diagnostic Walkthrough</p>
          <h2 className="font-heading font-bold text-[clamp(26px,4vw,38px)] leading-[1.1] mb-4">
            TechScale Inc. — 220 employees, Series B
          </h2>
          <p className={`${bodyStyle} mb-10 max-w-[600px]`}>
            Two product launches failed. Engineering attrition spiking. Every team says "we're fine." Watch SENSO find what 6 months of leadership meetings missed.
          </p>

          {/* Phase selector */}
          <div className="flex gap-1.5 mb-9 flex-wrap">
            {phases.map((ph, i) => (
              <button key={ph.key} onClick={() => { setActivePhase(i); setUserClicked(true); }}
                className="text-xs font-medium px-5 py-2.5 rounded-[10px] cursor-pointer transition-all duration-300 relative overflow-hidden"
                style={{
                  fontWeight: i === activePhase ? 700 : 500,
                  border: i === activePhase ? `2px solid ${ph.color}` : "1px solid rgba(255,255,255,0.06)",
                  background: i === activePhase ? `${ph.color}15` : "transparent",
                  color: i === activePhase ? ph.color : "rgba(255,255,255,0.35)",
                }}
              >
                <span className="mr-1.5">{ph.icon}</span>{ph.key}
                {i === activePhase && (
                  <div className="absolute bottom-0 left-0 h-0.5 w-full" style={{ background: ph.color, animation: "shimmer 8s linear" }} />
                )}
              </button>
            ))}
          </div>

          {/* Main content grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[420px]"
            >
              {/* Left: Network visualization */}
              <div className={`${cardStyle} ${glowStyle} flex flex-col !p-6`}>
                <div className="text-[10px] font-bold tracking-[0.2em] mb-3" style={{ color: p.color }}>
                  ORGANIZATIONAL MAP · {p.key} PHASE
                </div>
                <div className="flex-1 flex items-center relative">
                  <NetworkGraph phase={activePhase} />
                  {activePhase < 2 && (
                    <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)`,
                        animation: "scanLine 3s ease infinite",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Right: Phase details */}
              <div className="flex flex-col gap-4">
                <div className={`${cardStyle} ${glowStyle}`}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-2xl" style={{ color: p.color }}>{p.icon}</span>
                    <div>
                      <div className="font-heading text-[22px] font-bold">{p.title}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.35)] mt-0.5">{p.time}</div>
                    </div>
                  </div>
                  <p className={`${bodyStyle} mb-4`}>{p.action}</p>
                  <div className="rounded-xl p-4" style={{ background: `${p.color}08`, border: `1px solid ${p.color}15` }}>
                    <div className="text-[10px] font-bold tracking-[0.15em] mb-1.5" style={{ color: p.color }}>METHOD</div>
                    <p className="text-[13px] text-[rgba(238,240,244,0.65)] leading-relaxed">{p.method}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className={`${cardStyle} !py-4 !px-6`} style={{ borderColor: `${p.color}20` }}>
                  <div className="text-[10px] font-bold tracking-[0.15em] mb-2" style={{ color: p.color }}>AGENT OUTPUT</div>
                  <p className="text-[13px] text-[rgba(238,240,244,0.75)] leading-relaxed">{p.metric}</p>
                </div>

                {/* Findings */}
                {p.findings && (
                  <div className={`${cardStyle} !p-5`} style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-[#EF4444] mb-3">HIDDEN FRICTION PATTERNS</div>
                    {p.findings.map((f, i) => (
                      <div key={i} className="flex gap-2.5 items-start mb-2.5">
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded shrink-0 mt-0.5" style={{ color: f.color, background: `${f.color}20` }}>{f.severity}</span>
                        <span className="text-[13px] text-[rgba(238,240,244,0.75)]">{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Report */}
                {p.report && (
                  <div className={`${cardStyle} !p-5`} style={{ borderColor: "rgba(52,211,153,0.2)" }}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-[10px] font-bold tracking-[0.15em] text-[#34D399]">HEALTH REPORT PREVIEW</div>
                      <div className="text-[32px] font-extrabold" style={{ color: sc(p.report.score) }}>
                        {p.report.score}<span className="text-sm text-[rgba(255,255,255,0.3)]">/100</span>
                      </div>
                    </div>
                    {p.report.items.map((item, i) => (
                      <div key={i} className="mb-2.5">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[rgba(238,240,244,0.6)]">{item.label}</span>
                          <span className="font-bold" style={{ color: item.color }}>{item.score}</span>
                        </div>
                        <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-sm overflow-hidden">
                          <div className="h-full rounded-sm transition-all duration-[1.5s]" style={{ width: `${item.score}%`, background: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Outcomes */}
                {p.outcomes && (
                  <div className={`${cardStyle} !p-5`} style={{ borderColor: "rgba(52,211,153,0.2)" }}>
                    <div className="text-[10px] font-bold tracking-[0.15em] text-[#34D399] mb-3.5">MONTH 3 OUTCOMES</div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {p.outcomes.map((o, i) => (
                        <div key={i} className="bg-[rgba(52,211,153,0.05)] rounded-[10px] p-3.5 text-center">
                          <div className="text-[11px] text-[rgba(238,240,244,0.45)] mb-1.5">{o.label}</div>
                          <div className="font-extrabold text-xl" style={{ color: o.color }}>{o.delta}</div>
                          <div className="text-[10px] text-[rgba(238,240,244,0.3)] mt-0.5">{o.before} → {o.after}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dashboard section for active phase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`dashboard-${activePhase}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className={`${cardStyle} ${glowStyle} !p-0 overflow-hidden`}>
                <div className="flex items-center gap-2 px-6 py-3 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.color }} />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: p.color }}>
                    Live Dashboard · {p.key} Phase
                  </span>
                </div>
                <div className="p-4 sm:p-6 dark" style={{
                  '--background': '222 55% 8%',
                  '--foreground': '210 40% 95%',
                  '--card': '220 50% 12%',
                  '--card-foreground': '210 40% 95%',
                  '--border': '220 30% 20%',
                  '--muted': '220 40% 16%',
                  '--muted-foreground': '210 20% 60%',
                  '--primary': '178 42% 48%',
                  '--secondary': '220 40% 18%',
                  '--secondary-foreground': '210 40% 95%',
                  '--accent': '178 42% 48%',
                  color: 'hsl(210 40% 95%)',
                } as React.CSSProperties}>
                  {activePhase === 0 && <OverviewSection />}
                  {activePhase === 1 && <TeamSection />}
                  {activePhase === 2 && <NetworkSection />}
                  {activePhase === 3 && <DiagnosticSection />}
                  {activePhase === 4 && <DataFlowSection />}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Divider */}
        <div className="max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-[rgba(78,205,196,0.2)] to-transparent" />

        {/* ═══ SECTION 2: DIAGNOSTIC AGENT ═══ */}
        <section className="max-w-[960px] mx-auto px-7 py-24">
          <p className={`${labelStyle} text-[#818CF8]`}>Try the Diagnostic Agent</p>
          <h2 className="font-heading font-bold text-[clamp(26px,4vw,38px)] leading-[1.1] mb-4">
            5 questions. Your health snapshot.
          </h2>
          <p className={`${bodyStyle} mb-10 max-w-[540px]`}>
            The same methodology used with our 20 C-level pilot executives. Answer honestly — the agent adapts to your specific situation.
          </p>

          {/* Questions */}
          {!dxReport && !dxLoading && (
            <div className={`${cardStyle} ${glowStyle} max-w-[600px]`}>
              {/* Progress */}
              <div className="flex gap-2 mb-7">
                {dxQuestions.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-sm transition-all duration-400"
                    style={{
                      background: i < dxStep ? "#818CF8" : i === dxStep ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.06)",
                    }}
                  />
                ))}
              </div>

              {/* Previous answers */}
              {dxAnswers.map((a, i) => (
                <div key={i} className="mb-3.5 pb-3.5 border-b border-[rgba(255,255,255,0.04)]">
                  <div className="text-[11px] text-[rgba(255,255,255,0.25)] mb-1">{dxQuestions[i].q}</div>
                  <div className="text-sm text-[#818CF8] font-medium">✓ {a}</div>
                </div>
              ))}

              {/* Current question */}
              <motion.div key={dxStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-[11px] text-[rgba(255,255,255,0.25)] mb-1.5">Question {dxStep + 1} of {dxQuestions.length}</div>
                <h3 className="font-heading text-xl font-bold mb-5">{dxQuestions[dxStep].q}</h3>
                <div className="flex flex-col gap-2">
                  {dxQuestions[dxStep].opts.map(o => (
                    <button key={o} onClick={() => handleDxAnswer(o)}
                      className="text-sm font-medium py-4 px-5 rounded-[14px] border border-[rgba(78,205,196,0.12)] bg-[rgba(78,205,196,0.04)] text-[rgba(238,240,244,0.8)] cursor-pointer text-left transition-all duration-250 w-full hover:border-accent hover:text-white hover:bg-[rgba(78,205,196,0.12)] hover:translate-x-1"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Loading */}
          {dxLoading && (
            <div className={`${cardStyle} ${glowStyle} max-w-[600px] text-center !py-20`}>
              <div className="w-12 h-12 rounded-full border-[3px] border-[rgba(129,140,248,0.2)] border-t-[#818CF8] animate-spin mx-auto mb-5" />
              <p className="text-[#818CF8] font-semibold text-base">Diagnostic Agent analyzing...</p>
              <p className={`${bodyStyle} mt-2 text-[13px]`}>Cross-referencing your responses against organizational dysfunction patterns</p>
            </div>
          )}

          {/* Report */}
          {dxReport && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[600px]">
              <div className={`${cardStyle} ${glowStyle} mb-4`} style={{ borderColor: `${sc(dxReport.score)}25` }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[rgba(255,255,255,0.3)]">ORGANIZATIONAL HEALTH SNAPSHOT</div>
                    <div className="text-[13px] text-[rgba(255,255,255,0.4)] mt-1">Preliminary · Based on Executive Screening</div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-extrabold leading-none" style={{ color: sc(dxReport.score) }}>{dxReport.score}</div>
                    <div className="text-[11px] font-semibold mt-0.5" style={{ color: sc(dxReport.score) }}>{dxReport.riskLevel} Risk</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className={`${labelStyle} text-accent !text-[10px]`}>KEY FINDINGS</div>
                  {dxReport.findings.map((f, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                      <span className="text-accent shrink-0 mt-0.5">→</span>
                      <p className="text-sm text-[rgba(238,240,244,0.75)] leading-relaxed m-0">{f}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className={`${labelStyle} text-[#F59E0B] !text-[10px]`}>HIDDEN RISKS</div>
                  {dxReport.hiddenRisks.map((r, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                      <span className="text-[#F59E0B] shrink-0">⚠</span>
                      <p className="text-sm text-[rgba(238,240,244,0.75)] leading-relaxed m-0">{r}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] rounded-[14px] p-5 mb-5">
                  <div className="text-[10px] font-bold tracking-[0.15em] text-[#EF4444] mb-1.5">ESTIMATED ANNUAL COST OF DYSFUNCTION</div>
                  <div className="text-[28px] font-extrabold text-[#EF4444]">{dxReport.costEstimate}</div>
                </div>

                <div className="bg-[rgba(78,205,196,0.06)] border border-[rgba(78,205,196,0.15)] rounded-[14px] p-5">
                  <div className="text-[10px] font-bold tracking-[0.15em] text-accent mb-1.5">RECOMMENDATION</div>
                  <p className="text-sm text-[#EEF0F4] leading-relaxed mb-2.5">{dxReport.recommendation}</p>
                  <p className="text-[13px] text-[#F59E0B] font-medium m-0">{dxReport.urgency}</p>
                </div>
              </div>

              <div className="flex gap-2.5 flex-wrap">
                <button onClick={() => { setDxStep(0); setDxAnswers([]); setDxReport(null); }}
                  className="text-[13px] py-3 px-6 rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-transparent text-[rgba(238,240,244,0.5)] cursor-pointer hover:border-accent/30 transition-colors"
                >
                  ↺ Retake
                </button>
                <button onClick={() => window.open("mailto:eugene@aiworkforceos.org?subject=SENSO Health Check", "_blank")}
                  className="text-[13px] font-bold py-3 px-7 rounded-[10px] border-none bg-accent text-[#0B1628] cursor-pointer hover:brightness-110 transition-all"
                >
                  Request Full 48-Hour Diagnostic →
                </button>
              </div>
            </motion.div>
          )}
        </section>

        <div className="max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-[rgba(78,205,196,0.2)] to-transparent" />

        {/* ═══ SECTION 3: ROI CALCULATOR ═══ */}
        <section className="max-w-[960px] mx-auto px-7 py-24">
          <p className={`${labelStyle} text-[#34D399]`}>ROI Calculator</p>
          <h2 className="font-heading font-bold text-[clamp(26px,4vw,38px)] leading-[1.1] mb-4">
            What is invisible dysfunction costing you?
          </h2>
          <p className={`${bodyStyle} mb-10 max-w-[540px]`}>
            Managers spend 30–40% of time on coordination overhead caused by misalignment, unclear ownership, and unresolved friction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`${cardStyle} ${glowStyle}`}>
              <div className="text-[10px] font-bold tracking-[0.2em] text-[rgba(255,255,255,0.3)] mb-6">YOUR ORGANIZATION</div>
              {[
                { label: "Employees", value: employees, set: setEmployees, min: 20, max: 2000, step: 10, format: (v: number) => String(v) },
                { label: "Managers / Leaders", value: managers, set: setManagers, min: 2, max: 200, step: 1, format: (v: number) => String(v) },
                { label: "Avg. Manager Salary", value: salary, set: setSalary, min: 60000, max: 300000, step: 5000, format: (v: number) => fmt(v) },
              ].map(s => (
                <div key={s.label} className="mb-7">
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[13px] text-[rgba(238,240,244,0.55)]">{s.label}</span>
                    <span className="text-base font-bold text-accent">{s.format(s.value)}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                    onChange={e => s.set(Number(e.target.value))}
                    className="w-full h-1.5 rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#0B1628] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(78,205,196,0.4)]"
                    style={{
                      background: `linear-gradient(to right, #4ECDC4 0%, #4ECDC4 ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.08) ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.08) 100%)`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${cardStyle} !border-[rgba(239,68,68,0.2)] !bg-[rgba(239,68,68,0.04)]`}>
                <div className="text-[10px] font-bold tracking-[0.15em] text-[#EF4444] mb-2">ANNUAL COORDINATION WASTE</div>
                <div className="text-4xl font-extrabold text-[#EF4444]">{fmt(waste)}</div>
                <div className="text-xs text-[rgba(238,240,244,0.35)] mt-1.5">35% of manager time lost to invisible overhead</div>
              </div>
              <div className={`${cardStyle} !border-[rgba(52,211,153,0.2)] !bg-[rgba(52,211,153,0.04)]`}>
                <div className="text-[10px] font-bold tracking-[0.15em] text-[#34D399] mb-2">SENSO ANNUAL SAVINGS</div>
                <div className="text-4xl font-extrabold text-[#34D399]">{fmt(savings)}</div>
                <div className="text-xs text-[rgba(238,240,244,0.35)] mt-1.5">30% reduction in coordination dysfunction</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "HEALTH CHECK", value: "$15K", color: "#EEF0F4" },
                  { label: "PAYBACK", value: `${payback}d`, color: "#4ECDC4" },
                  { label: "FIRST-YEAR ROI", value: `${roi}%`, color: "#34D399" },
                ].map(m => (
                  <div key={m.label} className={`${cardStyle} !p-4 text-center`}>
                    <div className="text-[9px] font-bold tracking-[0.15em] text-[rgba(255,255,255,0.25)] mb-2">{m.label}</div>
                    <div className="text-2xl font-extrabold" style={{ color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="text-center px-7 pt-16 pb-24 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(78,205,196,0.05)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="font-heading font-bold text-[clamp(22px,4vw,32px)] leading-[1.1] max-w-[560px] mx-auto mb-3">
            Every organization has invisible dysfunction.
          </h2>
          <p className={`${bodyStyle} max-w-[440px] mx-auto mb-8`}>
            The question is whether you discover it on your terms — or it discovers you.
          </p>

          {!emailSent ? (
            <div className="flex max-w-[440px] mx-auto rounded-[14px] overflow-hidden border-2 border-accent/30">
              <input
                type="email" placeholder="your@email.com" value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="flex-1 py-4 px-5 text-sm bg-[rgba(78,205,196,0.04)] border-none text-[#EEF0F4] outline-none placeholder:text-[rgba(238,240,244,0.3)]"
              />
              <button onClick={() => { if (emailInput.includes("@")) setEmailSent(true); }}
                className="text-[13px] font-bold py-4 px-7 border-none bg-accent text-[#0B1628] cursor-pointer whitespace-nowrap hover:brightness-110 transition-all"
              >
                Request Health Check
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-[32px] mb-3">✓</div>
              <p className="text-accent font-semibold text-base">Request received. We'll be in touch within 24 hours.</p>
              <p className={`${bodyStyle} text-[13px] mt-2`}>48 hours · 50-page report · Traceable evidence · $15,000</p>
            </motion.div>
          )}

          <p className="text-[11px] text-[rgba(238,240,244,0.2)] mt-6">
            SENSO · Multi-Agent Organizational Intelligence · 8,500+ autonomous interactions · 0% churn
          </p>
        </section>
      </div>
      <Footer />

      {/* Keyframes for scan/shimmer animations */}
      <style>{`
        @keyframes scanLine{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      `}</style>
    </div>
  );
}
