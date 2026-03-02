import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary" />

      <div className="relative z-10 container mx-auto px-4 py-32 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6"
        >
          Your organization has problems AI can't see.{" "}
          <span className="text-gradient-teal">SENSO can.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Persistent AI agents that diagnose, navigate, and solve the invisible dysfunction costing your company millions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/contact">
            <Button variant="hero">Get Your 48-Hour Strategic Health Check</Button>
          </Link>
          <Link to="/demo">
            <Button variant="hero-ghost">See It In Action</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
