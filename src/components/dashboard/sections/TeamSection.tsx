import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamMembers, avatarMap } from "../DashboardData";

const keyGaps = [
  { icon: "📊", source: "Jira", text: "Claims burnout but takes +30% tasks above capacity", severity: "high" as const },
  { icon: "💬", source: "Slack", text: "Ignores messages from Product team — 34 unanswered in 30 days", severity: "high" as const },
  { icon: "🕐", source: "Calendar", text: "Missed 3 of 5 cross-functional syncs this month", severity: "medium" as const },
  { icon: "📧", source: "Email", text: "CC's CEO on routine decisions — bypassing direct manager", severity: "medium" as const },
];

const blindSpots = [
  { title: "Hidden Conflict", text: "Sarah may be concealing a conflict with VP Product due to fear of being seen as 'not a team player'. Pattern: avoids direct disagreement in public, escalates through backchannels.", risk: "high" as const },
  { title: "Overload as Shield", text: "Complaints about overload may be a mechanism to avoid accountability for cross-team deliverables. Data shows capacity exists but is selectively allocated.", risk: "medium" as const },
];

const scalpelQuestions = [
  "Sarah, you mentioned feeling stretched thin, but the data shows you're taking on more tasks voluntarily. What motivates that?",
  "How would you describe your working relationship with Michael's team right now — honestly?",
  "If you could change one thing about how decisions get made here, what would it be?",
  "I noticed the cross-functional syncs have been difficult to attend. What's getting in the way?",
];

const severityColor = {
  high: "border-red-400/30 bg-red-400/5",
  medium: "border-yellow-400/30 bg-yellow-400/5",
  low: "border-border bg-card",
};

const severityDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-muted-foreground",
};

export default function TeamSection() {
  const [hovRow, setHovRow] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState(1); // Sarah M.
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [scenario, setScenario] = useState<string | null>(null);
  const [expandedBlind, setExpandedBlind] = useState<number | null>(0);

  const riskColor = (v: number) => {
    if (v > 6) return "text-red-400 bg-red-400/15";
    if (v > 4) return "text-yellow-400 bg-yellow-400/10";
    return "text-teal bg-teal/15";
  };

  const copyQuestion = (q: string, idx: number) => {
    navigator.clipboard.writeText(q);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setScenario(
        "1. Open with recognition: highlight recent engineering wins and Sarah's leadership.\n" +
        "2. Surface the pattern: gently raise the missed syncs — ask what's blocking attendance.\n" +
        "3. Deploy scalpel question #1 — observe body language and response latency.\n" +
        "4. Transition to the Product team dynamic — use specific Slack data as evidence.\n" +
        "5. Close with support: ask what structural changes would help her succeed."
      );
      setGenerating(false);
    }, 2200);
  };

  const member = teamMembers[selectedMember];

  return (
    <div className="animate-fade-in">
      {/* Compact team table */}
      <h2 className="font-heading text-xl font-bold mb-4">Stakeholder Alignment</h2>
      <div className="hidden sm:block bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden mb-6">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border">
              {["Stakeholder", "Department", "Alignment", "Risk", "Bridges"].map(h => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[10px] tracking-[0.12em] uppercase text-muted-foreground font-mono">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((p, i) => (
              <tr key={i}
                className={`transition-colors cursor-pointer ${i < teamMembers.length - 1 ? "border-b border-border" : ""} ${selectedMember === i ? "bg-teal/5" : ""}`}
                style={{ background: hovRow === i ? "hsla(178, 42%, 48%, 0.03)" : selectedMember === i ? "hsla(178, 42%, 48%, 0.05)" : "transparent" }}
                onMouseEnter={() => setHovRow(i)} onMouseLeave={() => setHovRow(null)}
                onClick={() => setSelectedMember(i)}>
                <td className="py-3 px-4 text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    {avatarMap[p.name] ? (
                      <img src={avatarMap[p.name]} alt={p.name} className={`w-7 h-7 rounded-lg object-cover border ${selectedMember === i ? "border-teal/40" : "border-border"}`} />
                    ) : (
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border ${selectedMember === i ? "text-teal border-teal/40 bg-teal/10" : "text-teal border-border bg-card"}`}>
                        {p.name.split(" ").map(w => w[0]).join("")}
                      </div>
                    )}
                    <span className="text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{p.department}</td>
                <td className="py-3 px-4 font-bold font-mono text-teal text-xs">{p.alignmentScore}</td>
                <td className="py-3 px-4">
                  <span className={`font-bold font-mono px-1.5 py-0.5 rounded text-xs ${riskColor(p.dysfunctionRisk)}`}>{p.dysfunctionRisk}</span>
                </td>
                <td className="py-3 px-4 text-teal font-semibold font-mono text-xs">{p.bridges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden flex flex-col gap-2 mb-6">
        {teamMembers.map((p, i) => (
          <div key={i} onClick={() => setSelectedMember(i)}
            className={`bg-card/50 border rounded-xl p-3 cursor-pointer transition-colors ${selectedMember === i ? "border-teal/40 bg-teal/5" : "border-border"}`}>
            <div className="flex items-center gap-2">
              {avatarMap[p.name] ? (
                <img src={avatarMap[p.name]} alt={p.name} className="w-7 h-7 rounded-lg object-cover border border-border" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-card flex items-center justify-center text-[10px] font-bold text-teal border border-border">{p.name.split(" ").map(w => w[0]).join("")}</div>
              )}
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[10px] text-muted-foreground">{p.role}</div>
              </div>
              <span className={`ml-auto font-bold font-mono text-xs px-1.5 py-0.5 rounded ${riskColor(p.dysfunctionRisk)}`}>{p.dysfunctionRisk}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ COACHING PREP ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="font-heading text-lg font-bold flex items-center gap-3">
          {avatarMap[member.name] && (
            <img src={avatarMap[member.name]} alt={member.name} className="w-10 h-10 rounded-xl object-cover border-2 border-teal/30 shadow-lg" />
          )}
          <span>Coaching Prep: <span className="text-muted-foreground font-normal">Meeting with {member.name}</span></span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Data updated 2 min ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Key Gaps from Data */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-5"
        >
          <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-red-400 inline-block" />
            Key Behavioral Gaps <span className="text-muted-foreground font-normal text-xs">(from data sources)</span>
          </h3>
          <div className="flex flex-col gap-2">
            {keyGaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-card/80 cursor-default ${severityColor[gap.severity]}`}
              >
                <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-sm border border-border shrink-0 relative">
                  {gap.icon}
                  <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${severityDot[gap.severity]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{gap.text}</p>
                  <span className="text-[10px] text-muted-foreground font-mono mt-0.5 inline-block">
                    Source: {gap.source}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Blind Spots */}
          <h4 className="text-[14px] font-semibold mt-5 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-yellow-400 inline-block" />
            Blind Spots
          </h4>
          <div className="flex flex-col gap-2">
            {blindSpots.map((spot, i) => (
              <motion.div
                key={i}
                layout
                onClick={() => setExpandedBlind(expandedBlind === i ? null : i)}
                className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-card/80 ${
                  expandedBlind === i ? "bg-card border-teal/20" : "bg-card/50 border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${
                    spot.risk === "high" ? "bg-red-400/15 text-red-400 border-red-400/30" : "bg-yellow-400/15 text-yellow-400 border-yellow-400/30"
                  }`}>
                    {spot.risk === "high" ? "High Risk" : "Medium Risk"}
                  </span>
                  <h4 className="text-[13px] font-bold flex-1">{spot.title}</h4>
                  <motion.span animate={{ rotate: expandedBlind === i ? 180 : 0 }} className="text-muted-foreground text-xs">▼</motion.span>
                </div>
                <AnimatePresence>
                  {expandedBlind === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-muted-foreground leading-relaxed mt-2 overflow-hidden"
                    >
                      {spot.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: AI Coaching */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm border border-teal/15 rounded-xl p-4 sm:p-5 flex flex-col relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2 relative z-10">
            <span className="w-1 h-4 rounded-full bg-teal inline-block" />
            AI Coaching & Scenario
            <span className="ml-auto text-[10px] font-mono text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border">✦ AI</span>
          </h3>

          {/* Scalpel Questions */}
          <h4 className="text-[13px] font-semibold mb-3 relative z-10">
            Scalpel Questions <span className="text-muted-foreground font-normal">(AI-generated)</span>
          </h4>
          <div className="flex flex-col gap-2 mb-4 flex-1 relative z-10">
            {scalpelQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => copyQuestion(q, i)}
                className="group flex gap-2.5 p-2.5 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-teal/20 cursor-pointer transition-all"
              >
                <span className="text-teal font-mono text-sm font-bold shrink-0 mt-0.5">{i + 1}.</span>
                <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">{q}</p>
                <span className={`text-[10px] font-mono shrink-0 mt-0.5 transition-all ${
                  copiedIdx === i ? "text-green-400 opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}>
                  {copiedIdx === i ? "✓ copied" : "📋"}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Generated Scenario */}
          <AnimatePresence>
            {scenario && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 relative z-10 overflow-hidden"
              >
                <div className="p-3.5 rounded-lg border border-teal/20 bg-teal/5">
                  <h4 className="text-[13px] font-bold text-teal mb-2 flex items-center gap-2">✦ Conversation Scenario</h4>
                  <pre className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">{scenario}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={generating}
            className="relative z-10 w-full py-3 rounded-lg font-heading font-bold text-sm text-accent-foreground bg-gradient-teal hover:brightness-110 transition-all shadow-[0_0_20px_rgba(78,205,196,0.15)] border border-teal/30 disabled:opacity-60 disabled:cursor-wait"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block">✦</motion.span>
                Generating...
              </span>
            ) : scenario ? "Regenerate Scenario" : "Generate Conversation Scenario"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}