import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
        >
          SENSO Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-sm md:text-display font-heading font-bold text-primary-foreground mb-6"
        >
          Not consulting.{" "}
          <span className="text-gradient-brand">Infrastructure.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-foreground/60 text-body-lg max-w-2xl mx-auto"
        >
          Start with a diagnostic. Stay because SENSO becomes the operating
          system your organization didn't know it needed. Pricing scales with
          your organization — the number of people SENSO interviews, monitors,
          and protects.
        </motion.p>
      </div>
    </section>
  );
}
