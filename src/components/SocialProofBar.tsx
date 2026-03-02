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
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center items-center divide-x divide-primary-foreground/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-baseline gap-3 px-8 md:px-12 py-2"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm md:text-base text-primary-foreground/40 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
