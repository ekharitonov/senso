import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, ChevronDown, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const faq = [
  {
    q: "Where does our data live?",
    a: "Dedicated tenant isolation. Your organizational data never crosses tenant boundaries. We do not use client data for model training. SOC 2 Type I in roadmap for months 7–12.",
  },
  {
    q: "What data do you ingest?",
    a: "Only structured dialogue from SENSO agent conversations. We do NOT connect to your email, Slack, calendars, HRIS, or any internal systems. All data enters through explicit employee interaction with agents.",
  },
  {
    q: "What LLMs power this?",
    a: "Claude Sonnet (Anthropic) as primary inference engine. Model-agnostic architecture — can switch to any provider or self-hosted model. No OpenAI dependency.",
  },
  {
    q: "How does it integrate?",
    a: "Delivered through Slack, Microsoft Teams, or web interface. No VPN access, no internal system integration required. SSO supported but not mandatory. Time from signing to first diagnostic conversation: under 48 hours.",
  },
  {
    q: "What about hallucinations?",
    a: "Agents are grounded in the Organizational Knowledge Graph — they reference actual conversation data, not generated patterns. Every claim in the health report is traceable to specific source interactions.",
  },
  {
    q: "Can we delete our data?",
    a: "Full data portability and right-to-delete. You own your organizational knowledge graph. Export or purge at any time.",
  },
  {
    q: "What if an agent makes a wrong decision?",
    a: "Agents don't make decisions. They operate within a four-tier escalation system: (1) Autonomous — routine sensing, (2) Flagged — marked for human review, (3) Gated — requires human approval before action, (4) Blocked — agent cannot proceed. Personnel and strategy decisions are always Blocked tier.",
  },
];

const escalationLevels = [
  { level: 1, name: "Autonomous", desc: "Routine sensing", color: "bg-accent/20 text-accent" },
  { level: 2, name: "Flagged", desc: "Marked for human review", color: "bg-teal-bright/20 text-teal-bright" },
  { level: 3, name: "Gated", desc: "Requires human approval", color: "bg-amber-500/20 text-amber-400" },
  { level: 4, name: "Blocked", desc: "Agent cannot proceed", color: "bg-red-500/20 text-red-400" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent/[0.03] transition-colors"
      >
        <Lock className="w-4 h-4 text-accent shrink-0" />
        <span className="font-semibold text-sm text-foreground flex-1">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed pl-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ITSecuritySection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div
          className="border border-border rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center gap-4 px-6 md:px-8 py-5 md:py-6 text-left hover:bg-accent/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">
                IT & Security
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Built for the questions your security team will ask
              </p>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border/50">
                  {/* Security badges */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-4">
                    {["Tenant Isolation", "SOC 2 Roadmap", "Model-Agnostic", "SSO Ready", "48h Deployment", "Full Data Portability"].map(
                      (badge) => (
                        <span key={badge} className="text-xs font-mono bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1">
                          {badge}
                        </span>
                      )
                    )}
                  </div>

                  <div className="space-y-3">
                    {faq.map((item, i) => (
                      <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                  </div>

                  {/* Escalation system */}
                  <div className="mt-8 p-5 rounded-xl bg-background border border-border">
                    <h4 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-accent" />
                      Four-Tier Escalation Protocol
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {escalationLevels.map((esc) => (
                        <div key={esc.level} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-sm", esc.color)}>
                            {esc.level}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{esc.name}</p>
                            <p className="text-xs text-muted-foreground">{esc.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 font-mono">
                      Production validated: 20 C-level executives • Zero churn
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
