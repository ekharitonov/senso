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
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-card-foreground mb-4">
            Enterprise AI solves what you can see.{" "}
            <span className="text-teal">SENSO solves what you can't.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            70% of workplace challenges are invisible — hidden below the surface in culture, politics, and human dynamics.
          </p>
        </motion.div>

        {/* Iceberg visual */}
        <div className="max-w-2xl mx-auto relative">
          {/* Water line */}
          <div className="relative">
            {/* Above */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-teal-light rounded-t-2xl p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                What AI solves today — 24–30%
              </p>
              <div className="flex flex-wrap gap-2">
                {visibleProblems.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-full bg-card text-sm text-card-foreground border border-border">
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-1 bg-accent w-full" />

            {/* Below */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-primary rounded-b-2xl p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-wider text-primary-foreground/50 mb-3 font-semibold">
                What SENSO uncovers — 70%
              </p>
              <div className="flex flex-wrap gap-2">
                {hiddenProblems.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-full bg-primary-foreground/10 text-sm text-primary-foreground/80 border border-primary-foreground/20">
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Supporting stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {[
              { value: "$150–200K", label: "Avg. manager cost" },
              { value: "70%", label: "Time on coordination" },
              { value: "3–6 mo", label: "Traditional consulting" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-teal">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
