import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search,
  MessageCircle,
  Compass,
  CheckCircle,
  ChevronDown,
  Brain,
  Users,
  Layers,
  Shield,
  Server,
  Database,
  Lock,
  GitBranch,
  Network,
  Eye,
  Zap,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ─── SENSO Flow Steps ─── */
const steps = [
  {
    icon: Search,
    title: "Sense",
    desc: "AI agents continuously monitor organizational signals — communications, decisions, and team dynamics.",
  },
  {
    icon: MessageCircle,
    title: "Engage",
    desc: "Structured conversations with key stakeholders surface hidden patterns and friction points.",
  },
  {
    icon: Compass,
    title: "Navigate",
    desc: "Agents map political landscapes and cultural dynamics to identify the real blockers.",
  },
  {
    icon: CheckCircle,
    title: "Solve",
    desc: "Actionable insights and intervention strategies delivered in a comprehensive 50-page report.",
  },
];

/* ─── Architecture Layers ─── */
const architectureLayers = [
  {
    id: "strategic",
    label: "Strategic Layer",
    sublabel: "Humans-in-the-Loop",
    icon: Users,
    color: "from-accent/30 to-accent/10",
    borderColor: "border-accent/30",
    description:
      "People remain in the decision loop. Every critical action goes through escalation. An agent can say 'I see a conflict between departments X and Y' — but the decision of what to do about it is made by a human.",
  },
  {
    id: "agent",
    label: "Agent Layer",
    sublabel: "4 Specialized Agents",
    icon: Brain,
    color: "from-teal-bright/30 to-teal/10",
    borderColor: "border-teal/30",
    description:
      "Four specialized agents, each with a clear role: Diagnostic Agent (structured interviews), Cultural Sensing Agent (behavioral signals), Facilitation Agent (conflict mediation), Synthesis Agent (50-page report). No agent makes decisions for people — they diagnose, not prescribe.",
  },
  {
    id: "intelligence",
    label: "Intelligence Layer",
    sublabel: "Organizational Memory",
    icon: Database,
    color: "from-teal/20 to-navy/30",
    borderColor: "border-teal/20",
    description:
      "A persistent organizational memory. A knowledge graph that stores connections between people, decisions, conflicts, and cultural patterns. It doesn't reset after each conversation — it accumulates and gets smarter with every interaction.",
  },
];

/* ─── Agents detail ─── */
const agents = [
  {
    name: "Diagnostic Agent",
    icon: Search,
    role: "Conducts structured interviews with employees at every level, using adaptive questioning that adjusts based on knowledge graph context.",
  },
  {
    name: "Cultural Sensing Agent",
    icon: Eye,
    role: "Tracks behavioral signals — sentiment trajectories, trust scores, communication pattern shifts — across the entire organization.",
  },
  {
    name: "Facilitation Agent",
    icon: MessageCircle,
    role: "Mediates identified conflicts using evidence-based intervention frameworks. Operates only with explicit human approval at Gate level.",
  },
  {
    name: "Synthesis Agent",
    icon: FileText,
    role: "Aggregates all agent findings into a comprehensive 50-page diagnostic report. Every claim is traceable to specific interviews and behavioral data.",
  },
];

/* ─── IT Director FAQ ─── */
const itFaq = [
  {
    q: "Where do our data live?",
    a: "Full tenant isolation. One customer's data never intersects with another's. SOC 2 Type I on the roadmap for months 7–12. Data is stored in a dedicated perimeter and is NOT used for model training.",
  },
  {
    q: "What exactly do you collect?",
    a: "Only data from structured dialogues with SENSO agents. We do NOT connect to your email, Slack, calendars, HRIS, or any internal systems. All information comes exclusively through conscious employee interaction with agents.",
  },
  {
    q: "Which LLMs are used?",
    a: "Claude Sonnet (Anthropic) as the primary inference engine. Architecture is model-agnostic — can switch to any provider or self-hosted model. No OpenAI dependency.",
  },
  {
    q: "How does it integrate?",
    a: "Phase 1 — delivery via Slack, Microsoft Teams, or web interface. This is channel adaptation, not infrastructure rebuilding. No access to your internal systems, VPN, or SSO required (though SSO is supported). Time from signing to first diagnostic conversation — under 48 hours.",
  },
  {
    q: "What about hallucinations?",
    a: "Agents are grounded in the knowledge graph — they reference real data from conversations, not patterns generated from thin air. Every statement in the final report traces to specific sources — interviews, quotes, behavioral signals.",
  },
  {
    q: "Can we delete data?",
    a: "Full portability and right to deletion. You own your knowledge graph — export or complete wipe at any time.",
  },
  {
    q: "What if an agent makes a wrong decision?",
    a: "Agents don't make decisions. They operate within a four-level escalation system: (1) Autonomous — routine sensing, (2) Flag — agent marks for human review, (3) Gate — requires human approval before action, (4) Block — agent cannot proceed (personnel decisions, strategy). This isn't a theoretical model — it runs in production with 20 C-level executives at zero churn.",
  },
];

/* ─── AI Deep Dive ─── */
const aiDeepDive = [
  {
    title: "Why not single-agent?",
    content:
      "A monolithic agent doesn't scale for organizational tasks. Research shows that a 'smart' AI with monolithic reasoning becomes selfish — it optimizes its own task, not the systemic outcome. Our agents are embedded participants that recognize structural similarity with other agents and achieve rational cooperation. This is fundamentally different from the 'one GPT-wrapper for everything' approach.",
  },
  {
    title: "Graph Architecture",
    content:
      "Property graph (Neo4j) with typed edges: REPORTS_TO, COLLABORATES_WITH, CONFLICTS_WITH, DECIDES_ON, BLOCKS. Node properties include sentiment trajectories and trust scores. The graph updates after every agent interaction.",
  },
  {
    title: "Agent Orchestration",
    content:
      "Built on CrewAI/LangGraph with a custom governance layer. Agents share a common knowledge graph but have isolated reasoning contexts. No agent has access to another agent's raw conversation data — only synthesized, anonymized patterns.",
  },
  {
    title: "Embedding Strategy",
    content:
      "Dual-encoder approach: organizational context embeddings (fine-tuned on a management consulting corpus) + conversation-specific embeddings for RAG. This enables agents to find patterns like 'this conflict between VP Engineering and VP Product resembles 47 other cases we've seen, and in 80% the root cause was undefined ownership of product decisions.'",
  },
  {
    title: "Compound Data Moat",
    content:
      "Each engagement enriches a proprietary dataset of organizational dysfunction patterns. After 100+ engagements, this becomes an irreproducible asset — analogous to how Palantir's models improve with each deployment. Current production: 8,500+ messages processed autonomously.",
  },
  {
    title: "Why 24–30%, not 100% autonomy?",
    content:
      "Per the CMU TheAgentCompany benchmark, current AI agents complete only 24–30% of realistic work tasks autonomously. 70% of tasks require social intelligence — exactly the zone we cover. We don't promise full autonomy — we design pragmatic architecture with explicit human gates at critical points. This isn't a limitation — it's an architectural decision.",
  },
  {
    title: "Open Source",
    content:
      "Fully open source (Apache 2.0). GitHub repository, model collections on Hugging Face, documentation on IEEE Collaboratec. We believe openness accelerates trust and attracts the right technical partners.",
  },
];

/* ─── Escalation levels ─── */
const escalationLevels = [
  { level: 1, name: "Autonomous", desc: "Routine sensing", color: "bg-accent/20 text-accent" },
  { level: 2, name: "Flag", desc: "Marked for human review", color: "bg-teal-bright/20 text-teal-bright" },
  { level: 3, name: "Gate", desc: "Requires human approval", color: "bg-amber-500/20 text-amber-400" },
  { level: 4, name: "Block", desc: "Agent cannot proceed", color: "bg-red-500/20 text-red-400" },
];

/* ─── Expandable Section Component ─── */
function ExpandableSection({
  title,
  subtitle,
  icon: Icon,
  defaultOpen = false,
  children,
  accentColor = "accent",
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  defaultOpen?: boolean;
  children: React.ReactNode;
  accentColor?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="border border-border rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 md:px-8 py-5 md:py-6 text-left hover:bg-accent/5 transition-colors group"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-heading font-bold text-card-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
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
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function HowItWorksPage() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-[72px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-teal/5 blur-[150px]" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
              How It Works
            </span>
            <h1 className="text-display-sm md:text-display text-primary-foreground mb-6">
              Not a chatbot.{" "}
              <span className="text-gradient-brand">Not a survey.</span>
              <br />A multi-agent diagnostic system.
            </h1>
            <p className="text-body-lg text-primary-foreground/60 max-w-2xl leading-relaxed">
              SENSO operates like an organizational physician — not a therapist asking "how are you?" but a diagnostician running an MRI that shows exactly what's broken and where.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Level 1: Executive Overview ─── */}
      <section className="py-16 md:py-24 bg-card relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* SENSO Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
              The Process
            </span>
            <h2 className="text-headline md:text-display-sm text-card-foreground">
              Four intelligent steps from diagnosis to resolution
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-background rounded-2xl p-5 md:p-6 border border-border group-hover:border-accent/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-accent/50 mb-1.5">
                    Step {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
                Three-Layer Architecture
              </span>
              <h2 className="text-headline md:text-display-sm text-card-foreground mb-4">
                How the layers work together
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Click any layer to explore its role in the diagnostic process
              </p>
            </div>

            <div className="space-y-3">
              {architectureLayers.map((layer, i) => (
                <motion.button
                  key={layer.id}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  className={cn(
                    "w-full text-left rounded-xl border p-5 md:p-6 transition-all duration-300",
                    activeLayer === layer.id
                      ? "border-accent/40 bg-accent/5 shadow-lg"
                      : "border-border bg-background hover:border-accent/20 hover:bg-accent/[0.02]"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", layer.color)}>
                      <layer.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-foreground">{layer.label}</h3>
                        <span className="text-xs font-mono text-accent/60 bg-accent/10 px-2 py-0.5 rounded-full">
                          {layer.sublabel}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeLayer === layer.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeLayer === layer.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground text-sm leading-relaxed mt-4 pl-16">
                          {layer.description}
                        </p>

                        {/* Show agents for Agent Layer */}
                        {layer.id === "agent" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pl-16">
                            {agents.map((agent) => (
                              <div
                                key={agent.name}
                                className="bg-card rounded-lg border border-border p-4"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <agent.icon className="w-4 h-4 text-accent" />
                                  <span className="font-semibold text-sm text-foreground">
                                    {agent.name}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {agent.role}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Show escalation for Strategic Layer */}
                        {layer.id === "strategic" && (
                          <div className="flex flex-wrap gap-2 mt-5 pl-16">
                            {escalationLevels.map((esc) => (
                              <div
                                key={esc.level}
                                className={cn("rounded-lg px-3 py-2 text-xs font-mono", esc.color)}
                              >
                                <span className="font-bold">L{esc.level}</span> {esc.name}
                                <span className="opacity-60 ml-1">— {esc.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Visual connector lines between layers */}
            <div className="flex justify-center my-2">
              <div className="text-center py-6">
                <p className="text-xs text-muted-foreground font-mono">
                  ↕ Shared Knowledge Graph • Escalation Protocols • Audit Trail
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Key Metaphor Banner ─── */}
      <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-0 right-0 w-[500px] h-[300px] rounded-full bg-teal/5 blur-[120px]" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Key Insight</span>
            </div>
            <p className="text-xl md:text-2xl text-primary-foreground font-heading leading-relaxed">
              SENSO works like an organizational physician. Not a therapist asking{" "}
              <span className="text-primary-foreground/40">"how are you?"</span> — but a diagnostician running
              an MRI that shows{" "}
              <span className="text-gradient-brand font-bold">exactly what's broken and where.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Level 2 & 3: Expandable Deep Dives ─── */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6">
          {/* Level 2: IT Director View */}
          <ExpandableSection
            title="Technical Details"
            subtitle="Security, data handling, integration — everything your CTO needs to know"
            icon={Shield}
          >
            <div className="space-y-6 mt-4">
              {/* Security badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Tenant Isolation", "SOC 2 Roadmap", "Model-Agnostic", "SSO Ready", "48h Deployment", "Full Data Portability"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="text-xs font-mono bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1"
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>

              {/* FAQ items */}
              <div className="space-y-4">
                {itFaq.map((item, i) => (
                  <FaqItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>

              {/* Escalation system detail */}
              <div className="mt-8 p-5 rounded-xl bg-background border border-border">
                <h4 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  Four-Level Escalation System
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {escalationLevels.map((esc) => (
                    <div
                      key={esc.level}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                    >
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
          </ExpandableSection>

          {/* Level 3: AI Professional View */}
          <ExpandableSection
            title="Architecture Deep Dive"
            subtitle="Multi-agent orchestration, graph architecture, embedding strategy, data moat"
            icon={GitBranch}
          >
            <div className="space-y-5 mt-4">
              {aiDeepDive.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-background border border-border hover:border-accent/20 transition-colors"
                >
                  <h4 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                    {item.content}
                  </p>
                </motion.div>
              ))}

              {/* Tech stack badges */}
              <div className="p-5 rounded-xl bg-accent/5 border border-accent/15">
                <h4 className="font-heading font-bold text-foreground mb-3 text-sm uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Claude Sonnet (Anthropic)",
                    "Neo4j Property Graph",
                    "CrewAI / LangGraph",
                    "Dual-Encoder RAG",
                    "Apache 2.0 License",
                    "Hugging Face Models",
                    "IEEE Collaboratec",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono bg-background border border-border text-foreground rounded-md px-3 py-1.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Open source CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl bg-background border border-accent/20">
                <div className="flex-1">
                  <p className="font-heading font-bold text-foreground mb-1">Open Source — Apache 2.0</p>
                  <p className="text-sm text-muted-foreground">
                    Full source on GitHub. Model collections on Hugging Face. We believe openness accelerates trust.
                  </p>
                </div>
                <Link to="/open-source">
                  <Button variant="teal-ghost" size="sm" className="group shrink-0">
                    View on GitHub
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </ExpandableSection>
        </div>
      </section>

      {/* ─── Production Stats ─── */}
      <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "8,500+", label: "Messages processed autonomously" },
              { value: "20", label: "C-level executives in production" },
              { value: "0%", label: "Client churn rate" },
              { value: "<48h", label: "Time to first conversation" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-gradient-brand mb-1">
                  {stat.value}
                </div>
                <p className="text-xs md:text-sm text-primary-foreground/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline md:text-display-sm text-card-foreground mb-4">
              Convinced by the architecture?
            </h2>
            <p className="text-muted-foreground mb-8">
              See SENSO diagnose a real organizational challenge. Schedule a 30-minute technical briefing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="teal" size="lg" className="group">
                  Schedule Technical Briefing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="teal-ghost" size="lg">
                  Try Interactive Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─── FAQ Item sub-component ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
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
            <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed pl-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
