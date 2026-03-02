import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 2, suffix: "", label: "Production Agents" },
  { value: 20, suffix: "", label: "C-Level Executives" },
  { value: 8500, suffix: "+", label: "Messages" },
  { value: 0, suffix: "%", label: "Churn" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

export default function SocialProofBar() {
  return (
    <section className="bg-primary border-y border-primary-foreground/5">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-primary-foreground/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center md:items-baseline md:flex-row gap-1 md:gap-3 px-4 md:px-10 py-2"
            >
              <span className="text-2xl sm:text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs md:text-sm text-primary-foreground/40 font-medium text-center md:text-left">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
