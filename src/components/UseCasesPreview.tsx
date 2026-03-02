import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stethoscope, Eye, Scale, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: Stethoscope,
    title: "Strategic Diagnostics",
    pain: "You sense something's wrong but can't pinpoint it.",
    solution: "SENSO agents conduct confidential 1-on-1 conversations across your leadership team, mapping hidden friction and misalignment in 48 hours.",
  },
  {
    icon: Eye,
    title: "Soft Problem Discovery",
    pain: "Projects stall, talent leaves, but nobody knows why.",
    solution: "Persistent agents build trust over time, uncovering cultural debt and interpersonal dynamics that surveys can't detect.",
  },
  {
    icon: Scale,
    title: "The Ideal Third Party",
    pain: "Conflicts escalate without a neutral mediator.",
    solution: "SENSO acts as an objective AI mediator — no bias, no politics, complete confidentiality.",
  },
];

export default function UseCasesPreview() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Use Cases
          </span>
          <h2 className="text-headline md:text-display-sm text-foreground">
            Where SENSO delivers results
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-7 border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center mb-5">
                <uc.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-card-foreground mb-3">{uc.title}</h3>
              <p className="text-sm text-accent font-medium mb-3 italic">"{uc.pain}"</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{uc.solution}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/use-cases">
            <Button variant="teal-ghost" className="group">
              View All Use Cases
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
