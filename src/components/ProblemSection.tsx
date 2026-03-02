import { motion, useScroll, useTransform } from "framer-motion";
import icebergImg from "@/assets/iceberg.png";
import { Users, GitFork, Layers } from "lucide-react";
import { useRef } from "react";

const dysfunctions = [
  { icon: Layers, label: "Cultural Misalignment", delay: 0 },
  { icon: Users, label: "Interpersonal Friction", delay: 0.1 },
  { icon: GitFork, label: "Siloed Decision-Making", delay: 0.2 },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const icebergY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-headline md:text-display-sm lg:text-display font-heading font-extrabold text-foreground leading-tight">
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
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-right space-y-2 md:pr-8"
            >
              <motion.div
                className="bg-card/90 backdrop-blur-sm rounded-2xl p-5 border border-border shadow-elevated inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                  Visible Execution (30%)
                </p>
                <p className="text-sm text-muted-foreground">
                  Task completion, Document processing
                </p>
              </motion.div>
            </motion.div>

            {/* Center — iceberg */}
            <motion.div
              style={{ y: icebergY }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", stiffness: 60 }}
              className="flex justify-center relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-64 h-64 bg-teal/8 rounded-full blur-[80px]" />
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_80px_-10px_hsl(178_42%_48%/0.35),0_10px_40px_-8px_hsl(220_50%_14%/0.3),0_4px_16px_-4px_hsl(220_50%_14%/0.2)] ring-1 ring-white/20">
                {/* Glass highlight overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-gradient-to-t from-black/10 via-transparent to-white/5" />
                {/* Inner border glow */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10" />
                <img
                  src={icebergImg}
                  alt="Organizational iceberg — 70% of problems are invisible"
                  className="w-48 sm:w-64 md:w-80 lg:w-96 block"
                />
              </div>
            </motion.div>

            {/* Right labels — hidden */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-5 md:pl-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-3">
                  Invisible Dysfunction (70%)
                </p>
                <div className="space-y-3">
                  {dysfunctions.map((item) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 group cursor-default"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + item.delay }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center group-hover:from-teal/30 transition-all duration-300 shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cost callout */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-elevated inline-block relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.15em] font-bold text-muted-foreground mb-1">
                    The Cost:
                  </p>
                  <p className="text-3xl font-heading font-extrabold text-foreground">$200K+</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    annual invisible overhead
                    <br />
                    per mid-level manager.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
