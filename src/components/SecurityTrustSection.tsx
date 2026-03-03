import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Lock, Eye, Server, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import ParticleField from "./ParticleField";

const tabs = [
  { id: "privacy", label: "Data Privacy" },
  { id: "security", label: "Enterprise Security" },
] as const;

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
    a: "Agents don't make decisions. They operate within a four-tier escalation system: (1) Autonomous — routine sensing, (2) Flagged — marked for human review, (3) Gated — requires human approval before action, (4) Blocked — agent cannot proceed.",
  },
];

const escalationLevels = [
  { level: 1, name: "Autonomous", desc: "Routine sensing", color: "bg-accent/20 text-accent" },
  { level: 2, name: "Flagged", desc: "Marked for human review", color: "bg-teal-bright/20 text-teal-bright" },
  { level: 3, name: "Gated", desc: "Requires human approval", color: "bg-amber-500/20 text-amber-400" },
  { level: 4, name: "Blocked", desc: "Agent cannot proceed", color: "bg-red-500/20 text-red-400" },
];

const securityBadges = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Audited security controls and data handling" },
  { icon: Lock, title: "End-to-End Encryption", desc: "Encrypted at rest and in transit" },
  { icon: Eye, title: "GDPR Compliant", desc: "Full data sovereignty with right-to-delete" },
  { icon: Server, title: "On-Premise Available", desc: "Deploy within your own infrastructure" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-primary-foreground/[0.08] transition-colors"
      >
        <Lock className="w-4 h-4 text-accent shrink-0" />
        <span className="font-semibold text-sm text-primary-foreground flex-1">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-primary-foreground/40" />
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
            <p className="px-5 pb-4 text-sm text-primary-foreground/50 leading-relaxed pl-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SecurityTrustSection() {
  const [activeTab, setActiveTab] = useState<"privacy" | "security">("privacy");

  return (
    <section className="py-16 md:py-28 bg-gradient-hero relative overflow-hidden">
      <ParticleField />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright mb-4 block">
            Trust & Security
          </span>
          <h2 className="text-headline md:text-display-sm text-primary-foreground">
            Built for enterprise-grade confidentiality
          </h2>
          <p className="text-primary-foreground/40 mt-4 text-sm md:text-base max-w-lg mx-auto">
            Your organizational data is sensitive. SENSO meets the strictest security and compliance requirements.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-primary-foreground/10 bg-primary-foreground/5 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-accent text-primary shadow-md"
                    : "text-primary-foreground/50 hover:text-primary-foreground/70"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "privacy" && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Security capability badges */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
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

              {/* Escalation */}
              <div className="mt-8 p-5 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                <h4 className="font-heading font-bold text-primary-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  Four-Tier Escalation Protocol
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {escalationLevels.map((esc) => (
                    <div key={esc.level} className="flex items-start gap-3 p-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-sm", esc.color)}>
                        {esc.level}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-primary-foreground">{esc.name}</p>
                        <p className="text-xs text-primary-foreground/40">{esc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-primary-foreground/30 mt-4 font-mono">
                  Production validated: 20 C-level executives • Zero churn
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {securityBadges.map((badge, i) => (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 text-center hover:border-accent/40 hover:bg-primary-foreground/8 transition-colors duration-300"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/25 to-teal/5 flex items-center justify-center mx-auto mb-4 relative"
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl border border-teal/30"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                      />
                      <badge.icon className="w-6 h-6 text-teal-bright" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-sm text-primary-foreground mb-2">{badge.title}</h3>
                    <p className="text-xs text-primary-foreground/40 leading-relaxed">{badge.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
