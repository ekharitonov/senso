import { motion } from "framer-motion";
import { Search, MessageCircle, Compass, CheckCircle } from "lucide-react";

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

export default function SensoFlowSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            The SENSO Flow
          </h2>
          <p className="text-muted-foreground text-lg">
            Four intelligent steps from diagnosis to resolution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 group"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-accent text-xl">→</div>
              )}
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <step.icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
