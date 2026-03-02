import { motion } from "framer-motion";
import { Search, MessageCircle, Compass, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Sense",
    desc: "AI agents continuously monitor organizational signals — communications, decisions, and team dynamics.",
    color: "from-teal/20 to-teal/5",
  },
  {
    icon: MessageCircle,
    title: "Engage",
    desc: "Structured conversations with key stakeholders surface hidden patterns and friction points.",
    color: "from-teal/15 to-teal/5",
  },
  {
    icon: Compass,
    title: "Navigate",
    desc: "Agents map political landscapes and cultural dynamics to identify the real blockers.",
    color: "from-teal/20 to-teal/5",
  },
  {
    icon: CheckCircle,
    title: "Solve",
    desc: "Actionable insights and intervention strategies delivered in a comprehensive 50-page report.",
    color: "from-teal/15 to-teal/5",
  },
];

export default function SensoFlowSection() {
  return (
    <section className="py-16 md:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            How It Works
          </span>
          <h2 className="text-headline md:text-display-sm text-card-foreground">
            Four intelligent steps from diagnosis to resolution
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 -right-3 z-10 w-6 h-6 items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-accent/40" />
                </div>
              )}
              <div className="bg-background rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5`}>
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-accent/60 mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
