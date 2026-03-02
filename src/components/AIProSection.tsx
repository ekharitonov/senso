import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GitBranch, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Why multi-agent, not single-agent?",
    content:
      "Monolithic agents don't scale to organizational tasks. Research shows \"smarter\" AI with coupled reasoning becomes selfish — it optimizes its own objective, not the system outcome. Our agents are embedded participants that recognize structural similarity with other agents and achieve rational cooperation. Fundamentally different from a single GPT wrapper.",
  },
  {
    title: "Agent Orchestration",
    content:
      "Built on CrewAI/LangGraph with custom governance layer. Agents share a common knowledge graph but have isolated reasoning contexts. No agent accesses another agent's raw conversation data — only synthesized, anonymized patterns.",
  },
  {
    title: "Graph Architecture",
    content:
      "Property graph (Neo4j) with typed edges: REPORTS_TO, COLLABORATES_WITH, CONFLICTS_WITH, DECIDES_ON, BLOCKS. Node properties include sentiment trajectories and trust scores. Updated after every agent interaction.",
  },
  {
    title: "Embedding Strategy",
    content:
      "Dual-encoder approach: organizational context embeddings (fine-tuned on management consulting corpus) + conversation-specific embeddings for RAG. Enables pattern matching like: \"this VP Engineering vs. VP Product conflict resembles 47 prior cases — in 80% the root cause was undefined product decision ownership.\"",
  },
  {
    title: "Why 24–30% autonomy is the right target",
    content:
      "Per CMU's TheAgentCompany benchmark, current AI agents complete only 24–30% of realistic workplace tasks autonomously. 70% require social intelligence. We designed for this reality — pragmatic architecture with explicit human gates, not science fiction promises.",
  },
  {
    title: "Open Source",
    content:
      "Fully open source, Apache 2.0. GitHub repository, Hugging Face model collections, IEEE Collaboratec documentation. We believe openness accelerates trust and attracts the right technical partners.",
  },
];

export default function AIProSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-16 md:pb-24 bg-background">
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
              <GitBranch className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">
                For AI Professionals
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Under the hood: architecture for those who build agents
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
                <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border/50 space-y-4 mt-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-xl bg-background border border-border hover:border-accent/20 transition-colors"
                    >
                      <h4 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-4">{item.content}</p>
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
                        <span key={tech} className="text-xs font-mono bg-background border border-border text-foreground rounded-md px-3 py-1.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
