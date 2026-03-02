import { motion } from "framer-motion";

const visibleProblems = ["Task Execution", "Email Management", "Calendar Scheduling"];
const hiddenProblems = [
  "Cultural Misalignment",
  "Interpersonal Friction", 
  "Siloed Decision-Making",
  "Political Dynamics",
  "Trust Deficits",
  "Coordination Overhead",
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            The Problem
          </span>
          <h2 className="text-headline md:text-display-sm text-foreground mb-6">
            Enterprise AI solves what you can see.{" "}
            <span className="text-gradient-brand">SENSO solves what you can't.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            70% of workplace challenges are invisible — hidden below the surface in culture, politics, and human dynamics.
          </p>
        </motion.div>

        {/* Iceberg visual */}
        <div className="max-w-2xl mx-auto">
          {/* Above waterline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-t-2xl p-8 border border-border border-b-0 shadow-elevated"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                What AI solves today — 24–30%
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleProblems.map((p) => (
                <span key={p} className="px-4 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground font-medium">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Waterline divider */}
          <div className="relative h-1">
            <div className="absolute inset-0 bg-gradient-teal" />
            <div className="absolute inset-0 bg-gradient-teal blur-sm opacity-50" />
          </div>

          {/* Below waterline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-hero rounded-b-2xl p-8 border border-primary-foreground/10 border-t-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-teal animate-glow-pulse" />
              <span className="text-xs uppercase tracking-[0.15em] text-primary-foreground/40 font-semibold">
                What SENSO uncovers — 70%
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hiddenProblems.map((p) => (
                <span key={p} className="px-4 py-2 rounded-lg bg-primary-foreground/8 text-sm text-primary-foreground/80 font-medium border border-primary-foreground/10">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-6 mt-10"
          >
            {[
              { value: "$150–200K", label: "Avg. manager cost" },
              { value: "70%", label: "Time on coordination" },
              { value: "3–6 mo", label: "Traditional consulting" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-heading font-bold text-accent">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
