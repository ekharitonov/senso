import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stethoscope, Eye, Scale } from "lucide-react";

const useCases = [
  {
    icon: Stethoscope,
    title: "Strategic Diagnostics",
    pain: "You sense something's wrong but can't pinpoint it. Internal politics obscure root causes.",
    solution: "SENSO agents conduct confidential 1-on-1 conversations across your leadership team, mapping hidden friction and misalignment in 48 hours.",
  },
  {
    icon: Eye,
    title: "Soft Problem Discovery",
    pain: "Projects stall, talent leaves, but exit interviews don't reveal why.",
    solution: "Persistent agents build trust over time, uncovering cultural debt and interpersonal dynamics that surveys can't detect.",
  },
  {
    icon: Scale,
    title: "The Ideal Third Party",
    pain: "Conflicts escalate because there's no neutral, trusted mediator.",
    solution: "SENSO acts as an objective AI mediator — no bias, no politics, complete confidentiality.",
  },
];

export default function UseCasesPreview() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-card-foreground mb-4">
            Where SENSO Delivers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <uc.icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">{uc.title}</h3>
              <p className="text-destructive/80 text-sm mb-3 italic">"{uc.pain}"</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{uc.solution}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/use-cases">
            <Button variant="teal-ghost">View All Use Cases →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
