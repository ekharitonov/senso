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
    accent: "from-teal/20 via-teal-bright/10 to-transparent",
  },
  {
    icon: Eye,
    title: "Soft Problem Discovery",
    pain: "Projects stall, talent leaves, but nobody knows why.",
    solution: "Persistent agents build trust over time, uncovering cultural debt and interpersonal dynamics that surveys can't detect.",
    accent: "from-teal-bright/15 via-teal/10 to-transparent",
  },
  {
    icon: Scale,
    title: "The Ideal Third Party",
    pain: "Conflicts escalate without a neutral mediator.",
    solution: "SENSO acts as an objective AI mediator — no bias, no politics, complete confidentiality.",
    accent: "from-teal/20 via-teal-bright/10 to-transparent",
  },
];

export default function UseCasesPreview() {
  return (
    <section className="py-16 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-teal/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[200px] h-[200px] bg-teal/2 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-7 border border-border hover:border-accent/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Card glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${uc.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <uc.icon className="w-6 h-6 text-accent" />
                </motion.div>
                <h3 className="font-heading font-bold text-lg text-card-foreground mb-3">{uc.title}</h3>
                <p className="text-sm text-accent font-medium mb-3 italic">"{uc.pain}"</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{uc.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
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
