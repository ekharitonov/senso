import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import NetworkGraphAnimation from "@/components/NetworkGraphAnimation";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-lighten"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-teal/5 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-teal/3 blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-teal animate-glow-pulse" />
              <span className="text-xs font-medium text-primary-foreground/70 tracking-wide">
                Multi-Agent Organizational Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[2rem] sm:text-[2.6rem] md:text-[3.5rem] lg:text-[4.5rem] font-heading font-extrabold text-primary-foreground leading-[1.1] tracking-tight mb-6 md:mb-8"
            >
              Your organization has problems AI can't see.
              <br />
              <motion.span
                className="text-gradient-brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                SENSO can.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-xl text-primary-foreground/50 max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              Persistent AI agents that sense dysfunction, engage stakeholders,
              navigate politics, solve root causes, and organize lasting change —
              so your company stops bleeding millions on invisible overhead.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    Schedule a Briefing
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/demo">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero-ghost" size="lg">
                    <Play className="w-4 h-4" />
                    See the Platform
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["SC", "MT", "DK", "JL"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal/40 to-teal/10 border-2 border-navy-deep flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-teal-bright">{initials}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-primary-foreground/30">
                Trusted by C-level executives at leading organizations
              </p>
            </motion.div>
          </div>

          {/* Right — live network animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <NetworkGraphAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
