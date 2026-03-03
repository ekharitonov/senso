import { motion } from "framer-motion";
import { Database, Brain, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const layers = [
  {
    icon: Database,
    label: "Intelligence Layer",
    sublabel: "Organizational Memory",
    brief: "Persistent knowledge graph that accumulates institutional patterns across every engagement.",
  },
  {
    icon: Brain,
    label: "Agent Layer",
    sublabel: "4 Specialized Agents",
    brief: "Diagnostic, Cultural Sensing, Facilitation, and Synthesis agents — each with explicit escalation rules.",
  },
  {
    icon: Users,
    label: "Strategic Layer",
    sublabel: "Humans in Command",
    brief: "Agents diagnose. Humans decide. Every critical action goes through a four-tier escalation protocol.",
  },
];

export default function ArchitectureSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card hover:border-accent/20 transition-all duration-300 p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <layer.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-1">{layer.label}</h3>
              <span className="text-xs font-mono text-accent/60 block mb-3">{layer.sublabel}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{layer.brief}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            Explore the full architecture
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
