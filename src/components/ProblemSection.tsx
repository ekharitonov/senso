import { motion } from "framer-motion";
import icebergImg from "@/assets/iceberg.png";
import { Users, GitFork, Layers } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-display-sm md:text-display font-heading font-extrabold text-foreground leading-tight">
            Enterprise AI solves what you can see.
            <br />
            <span className="text-gradient-brand">SENSO solves what you can't.</span>
          </h2>
        </motion.div>

        {/* Iceberg layout */}
        <div className="relative max-w-5xl mx-auto mt-12">
          <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-0">
            {/* Left labels — visible */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-right space-y-2 md:pr-8"
            >
              <div className="inline-block md:block">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                  Visible Execution (30%)
                </p>
                <p className="text-sm text-muted-foreground">
                  Task completion, Document processing
                </p>
              </div>
            </motion.div>

            {/* Center — iceberg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <img
                src={icebergImg}
                alt="Organizational iceberg — 70% of problems are invisible"
                className="w-64 md:w-80 lg:w-96 drop-shadow-2xl"
              />
            </motion.div>

            {/* Right labels — hidden */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-5 md:pl-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-3">
                  Invisible Dysfunction (70%)
                </p>
                <div className="space-y-3">
                  {[
                    { icon: Layers, label: "Cultural Misalignment" },
                    { icon: Users, label: "Interpersonal Friction" },
                    { icon: GitFork, label: "Siloed Decision-Making" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost callout */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-card rounded-xl p-5 border border-border shadow-elevated inline-block"
              >
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-muted-foreground mb-1">
                  The Cost:
                </p>
                <p className="text-3xl font-heading font-extrabold text-foreground">$200K+</p>
                <p className="text-xs text-muted-foreground mt-1">
                  annual invisible overhead
                  <br />
                  per mid-level manager.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
