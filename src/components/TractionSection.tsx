import { motion } from "framer-motion";
import { Zap, Clock, Users, Handshake, BookOpen, Building2 } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "1 day",
    label: "First insights delivered",
    sub: "When team communications already exist",
  },
  {
    icon: Zap,
    value: "~2 weeks",
    label: "Full diagnostic from zero",
    sub: "Complete organizational health assessment",
  },
  {
    icon: Zap,
    value: "7 hours",
    label: "To first actionable solution",
    sub: "From kickoff to product concept",
  },
  {
    icon: Building2,
    value: "1 executive",
    label: "Championing corporate rollout",
    sub: "Targeting 2× project execution speed",
  },
  {
    icon: Handshake,
    value: "5 offers",
    label: "Ecosystem collaborations",
    sub: "Academy · Consulting · AI Ethics Labs",
  },
  {
    icon: BookOpen,
    value: "1 client",
    label: "Writing a book about the experience",
    sub: "Documenting the transformation journey",
  },
];

export default function TractionSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Prototype-Stage Traction
          </span>
          <h2 className="text-headline md:text-display-sm text-foreground">
            Already making impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 md:p-6 border border-border hover:shadow-card-hover transition-all duration-300 text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <m.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl md:text-display-sm font-heading font-bold text-foreground leading-none mb-1">
                {m.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {m.label}
              </div>
              <div className="text-xs text-muted-foreground leading-snug">
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
