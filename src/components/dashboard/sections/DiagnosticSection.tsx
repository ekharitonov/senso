import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HealthGauge from "../HealthGauge";
import { declaredValues, realBehavior } from "../DashboardData";

const conversationExcerpts = [
  {
    speaker: "SENSO Agent",
    text: "James, you mentioned transparency is a core value. I noticed that 95% of your team's communication happens in private channels. How do you reconcile that?",
    type: "agent" as const,
  },
  {
    speaker: "James K. (CEO)",
    text: "Well... I think people just prefer DMs for quick things. It's not a transparency issue, it's efficiency.",
    type: "human" as const,
  },
  {
    speaker: "SENSO Agent",
    text: "Interesting. The data shows 34 cross-department messages were ignored this month. When decisions happen in private channels, teams downstream don't have context. Does that feel efficient to them?",
    type: "agent" as const,
  },
  {
    speaker: "James K. (CEO)",
    text: "...I hadn't thought about it that way. I assumed everyone was in the loop.",
    type: "human" as const,
  },
  {
    speaker: "SENSO Agent",
    text: "That assumption gap is exactly what creates shadow governance. The intent is good — the structural effect is corrosive. Would you like to see which specific decisions got lost?",
    type: "agent" as const,
  },
];

const behaviorTimeline = [
  { date: "Nov 12", event: "Skipped Engineering all-hands — sent delegate instead", source: "Calendar", severity: "medium" as const },
  { date: "Nov 18", event: "Made roadmap decision in DM with VP Product — no team visibility", source: "Slack", severity: "high" as const },
  { date: "Nov 25", event: "Used phrase 'we're aligned' 4 times in board update — no supporting data", source: "Email", severity: "medium" as const },
  { date: "Dec 2", event: "Praised 'open door policy' in company meeting — zero 1:1s scheduled with ICs", source: "Calendar", severity: "high" as const },
];

const sevColor = {
  high: "border-red-400/30 text-red-400",
  medium: "border-yellow-400/30 text-yellow-400",
};

export default function DiagnosticSection() {
  const [showChat, setShowChat] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState(3);

  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-xl font-bold mb-5">
        Behavioral Analysis: <span className="text-muted-foreground font-normal">James K. (CEO)</span>
      </h2>

      {/* Declared vs Real */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 sm:p-8 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6 items-center">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Declared <span className="italic opacity-70">(Words)</span>
            </h4>
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {declaredValues.map(v => (
                <div key={v} className="px-4 py-2 rounded-full border border-teal/40 text-teal text-xs font-medium bg-teal/10 w-fit">{v}</div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-card rounded-lg border border-border text-xs text-muted-foreground italic leading-relaxed">
              "I always champion transparency in our processes."
            </div>
          </div>
          <div className="flex justify-center order-first lg:order-none">
            <HealthGauge score={6.8} label="Behavior Gap Score" severity="Moderate" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 lg:text-right">
              Actual Behavior <span className="italic opacity-70">(Data)</span>
            </h4>
            <div className="flex flex-col gap-4">
              {realBehavior.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-base border border-border shrink-0">{b.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-teal leading-none font-heading">{b.val}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-1">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ LIVE DIALOGUE ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Conversation Excerpt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-teal/15 rounded-xl p-4 sm:p-5 relative overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-teal inline-block" />
              Agent Dialogue Excerpt
              <span className="text-[10px] font-mono text-muted-foreground bg-card px-2 py-0.5 rounded-full border border-border">✦ LIVE</span>
            </h3>
            <button onClick={() => setShowChat(!showChat)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {showChat ? "Hide" : "Show"}
            </button>
          </div>

          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-col gap-3 relative z-10 overflow-hidden"
              >
                {conversationExcerpts.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.type === "agent" ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex gap-3 ${msg.type === "human" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      msg.type === "agent" ? "bg-teal/20 text-teal border border-teal/30" : "bg-card border border-border text-muted-foreground"
                    }`}>
                      {msg.type === "agent" ? "S" : "JK"}
                    </div>
                    <div className={`flex-1 max-w-[85%] ${msg.type === "human" ? "text-right" : ""}`}>
                      <div className="text-[10px] text-muted-foreground mb-1 font-mono">{msg.speaker}</div>
                      <div className={`text-[13px] leading-relaxed p-3 rounded-lg ${
                        msg.type === "agent"
                          ? "bg-teal/5 border border-teal/15 text-foreground"
                          : "bg-card border border-border text-muted-foreground"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {visibleMessages < conversationExcerpts.length && (
                  <button
                    onClick={() => setVisibleMessages(conversationExcerpts.length)}
                    className="text-xs text-teal hover:text-teal/80 transition-colors self-center py-2"
                  >
                    Show full conversation ↓
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Behavior Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-5"
        >
          <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-yellow-400 inline-block" />
            Behavior Evidence Timeline
          </h3>

          <div className="flex flex-col gap-2">
            {behaviorTimeline.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`flex gap-3 p-3 rounded-lg border bg-card/30 ${sevColor[event.severity]}`}
              >
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground">{event.date}</span>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${event.severity === "high" ? "bg-red-400" : "bg-yellow-400"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-foreground leading-relaxed">{event.event}</p>
                  <span className="text-[10px] font-mono text-muted-foreground">Source: {event.source}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-red-400/5 border border-red-400/15 rounded-lg">
            <div className="text-[10px] font-bold tracking-[0.15em] text-red-400 mb-1">PATTERN DETECTED</div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              James consistently <strong className="text-foreground">declares transparency</strong> while structurally <strong className="text-foreground">concentrating information access</strong>.
              This isn't deception — it's a blind spot. He genuinely believes the door is open. The data shows it's locked from the inside.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}