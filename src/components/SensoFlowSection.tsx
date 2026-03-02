import { motion } from "framer-motion";
import { Search, MessageCircle, Compass, CheckCircle } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    title: "Sense",
    desc: "AI agents continuously monitor organizational signals — communications, decisions, and team dynamics.",
    gradient: "from-teal via-teal-bright to-teal",
  },
  {
    icon: MessageCircle,
    title: "Engage",
    desc: "Structured conversations with key stakeholders surface hidden patterns and friction points.",
    gradient: "from-teal-bright via-teal to-teal-bright",
  },
  {
    icon: Compass,
    title: "Navigate",
    desc: "Agents map political landscapes and cultural dynamics to identify the real blockers.",
    gradient: "from-teal via-teal-bright to-teal",
  },
  {
    icon: CheckCircle,
    title: "Solve",
    desc: "Actionable insights and intervention strategies delivered in a comprehensive 50-page report.",
    gradient: "from-teal-bright via-teal to-teal-bright",
  },
];

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: "easeInOut" as const } },
};

export default function SensoFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-32 bg-card relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-teal/3 blur-[150px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            How It Works
          </span>
          <h2 className="text-headline md:text-display-sm text-card-foreground">
            Four intelligent steps from diagnosis to resolution
          </h2>
        </motion.div>

        {/* Connection line (desktop) */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          <motion.svg
            className="absolute top-[52px] left-0 w-full h-2 z-0"
            viewBox="0 0 1000 8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.line
              x1="125" y1="4" x2="875" y2="4"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              strokeDasharray="6 4"
              variants={lineVariants}
            />
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(178 42% 48%)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="hsl(178 42% 48%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(178 42% 48%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="relative group"
            >
              <div className="bg-background rounded-2xl p-6 border border-border group-hover:border-accent/40 transition-all duration-500 h-full relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal/5 via-transparent to-teal/3 rounded-2xl" />
                
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center mb-5 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-accent/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <step.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-accent/60 mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
