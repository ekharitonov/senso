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
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-headline md:text-display-sm lg:text-display font-heading font-extrabold text-foreground leading-tight">
            Enterprise AI solves what you can see.
            <br />
            <span className="text-gradient-brand">SENSO solves what you can't.</span>
          </h2>
        </motion.div>

        {/* Full-bleed iceberg composition */}
        <div className="relative max-w-6xl mx-auto">
          {/* Water line - full width atmospheric gradient */}
          <div className="absolute top-[38%] left-[-10%] right-[-10%] h-[2px] z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-accent/25 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>

          {/* Above water - light atmospheric haze */}
          <div className="absolute top-0 left-[-10%] right-[-10%] h-[38%] bg-gradient-to-b from-background via-background to-teal-light/20 z-10 pointer-events-none" />

          {/* Below water - deep ocean gradient */}
          <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[62%] bg-gradient-to-b from-teal-light/20 via-accent/5 to-accent/10 z-10 pointer-events-none" />

          <div className="grid md:grid-cols-[1fr_1.3fr_1fr] items-center gap-0 md:gap-0 relative">
            {/* Left — visible execution */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-30 flex justify-end md:pr-6 pb-8 md:pb-0"
            >
              <motion.div
                className="bg-card/90 backdrop-blur-md rounded-2xl p-5 border border-border shadow-elevated max-w-[260px]"
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                  Visible Execution (30%)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Task completion, Document processing
                </p>
              </motion.div>
            </motion.div>

            {/* Center — iceberg with edge-fading masks */}
            <motion.div
              style={{ y: icebergY }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
              className="relative z-20 flex justify-center"
            >
              {/* Soft glow behind iceberg */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[80%] h-[60%] bg-teal/8 rounded-full blur-[80px]" />

              {/* Iceberg with edge-fade mask */}
              <div
                className="relative"
                style={{
                  maskImage: "radial-gradient(ellipse 85% 90% at 50% 45%, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 85% 90% at 50% 45%, black 50%, transparent 100%)",
                }}
              >
                <img
                  src={icebergImg}
                  alt="Organizational iceberg — 70% of problems are invisible"
                  className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Right — invisible dysfunction */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative z-30 md:pl-6 space-y-5 pt-8 md:pt-0"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-4">
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
                      transition={{ delay: 0.5 + item.delay }}
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
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03 }}
                className="bg-card/90 backdrop-blur-md rounded-2xl p-5 border border-border shadow-elevated max-w-[260px] relative overflow-hidden"
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">
                    The Cost:
                  </p>
                  <p className="text-3xl font-heading font-extrabold text-foreground">$200K+</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
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
