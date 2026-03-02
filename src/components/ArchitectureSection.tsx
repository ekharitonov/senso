import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Database,
  Brain,
  Users,
  ChevronDown,
  Search,
  Eye,
  MessageCircle,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  {
    id: "intelligence",
    label: "Layer 1 — Intelligence Layer",
    sublabel: "Persistent Organizational Memory",
    icon: Database,
    description:
      "Every conversation, every decision pattern, every cultural signal is stored in a proprietary Organizational Knowledge Graph. Unlike generic AI that forgets after each session, SENSO accumulates institutional knowledge over time.",
    extra:
      "This is our compound data moat: after 100+ engagements, the pattern library becomes unreplicable. Each new client engagement makes the system smarter for all future clients — while maintaining strict tenant data isolation.",
  },
  {
    id: "agent",
    label: "Layer 2 — Agent Layer",
    sublabel: "Specialized Multi-Agent System",
    icon: Brain,
    description:
      "Four specialized agents, each with a defined role and explicit escalation rules:",
    agents: [
      {
        name: "Diagnostic Agent",
        icon: Search,
        desc: "Conducts structured interviews adapted from organizational psychology. Not free-form chat — clinical methodology.",
      },
      {
        name: "Cultural Sensing Agent",
        icon: Eye,
        desc: "Tracks behavioral signals, language patterns, and sentiment shifts across conversations to build real-time culture maps.",
      },
      {
        name: "Facilitation Agent",
        icon: MessageCircle,
        desc: "Mediates cross-functional conflict. Finds common ground without politics or bias.",
      },
      {
        name: "Synthesis Agent",
        icon: FileText,
        desc: "Aggregates all agent insights into the 50-page health report. Every claim is traceable to source conversations.",
      },
    ],
    extra:
      "No agent operates as a black box. Every agent interaction follows a four-tier escalation protocol: Autonomous → Flagged → Gated → Blocked.",
  },
  {
    id: "strategic",
    label: "Layer 3 — Strategic Layer",
    sublabel: "Humans Stay in Command",
    icon: Users,
    description:
      "Agents diagnose. Humans decide. This isn't a limitation — it's an architectural choice backed by data: CMU's TheAgentCompany benchmark shows current AI completes only 24–30% of realistic workplace tasks autonomously. The remaining 70% require social intelligence — exactly the zone SENSO operates in.",
    extra:
      "We don't promise full autonomy. We deliver pragmatic architecture with human gates at every critical decision point. That's why 20 C-level executives trust us with their most sensitive organizational dynamics.",
  },
];

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-teal/3 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Technical Architecture
          </span>
          <h2 className="text-headline md:text-display-sm text-foreground mb-4">
            Three-layer architecture built for enterprise trust
          </h2>
          <p className="text-muted-foreground">
            Not a chatbot wrapper. Not a survey tool. A production multi-agent system with 8,500+ autonomous interactions and zero incidents.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                activeLayer === layer.id
                  ? "border-accent/40 bg-accent/5 shadow-lg"
                  : "border-border bg-card hover:border-accent/20"
              )}
            >
              <button
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                className="w-full flex items-center gap-4 px-5 md:px-7 py-5 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <layer.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground">{layer.label}</h3>
                  <span className="text-xs font-mono text-accent/60">{layer.sublabel}</span>
                </div>
                <motion.div animate={{ rotate: activeLayer === layer.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {activeLayer === layer.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-7 pb-6 pt-1 border-t border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-16">
                        {layer.description}
                      </p>

                      {layer.agents && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-16 mb-4">
                          {layer.agents.map((agent) => (
                            <div key={agent.name} className="bg-background rounded-lg border border-border p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <agent.icon className="w-4 h-4 text-accent" />
                                <span className="font-semibold text-sm text-foreground">{agent.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{agent.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {layer.extra && (
                        <p className="text-sm text-muted-foreground leading-relaxed pl-16 italic">
                          {layer.extra}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
