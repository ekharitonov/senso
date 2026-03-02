import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-lighten"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/50" />

      {/* Animated accent elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-teal-bright/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto px-6 py-32 max-w-5xl">
        <div className="text-center">
          {/* Badge */}
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
            className="text-display-sm md:text-display lg:text-display-lg text-primary-foreground mb-8"
          >
            Your organization has
            <br />
            problems AI can't see.
            <br />
            <span className="text-gradient-brand">SENSO can.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-body-lg text-primary-foreground/55 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Persistent AI agents that diagnose, navigate, and solve the invisible
            dysfunction costing your company millions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Get Your 48-Hour Health Check
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="hero-ghost" size="lg">
                <Play className="w-4 h-4" />
                See It In Action
              </Button>
            </Link>
          </motion.div>

          {/* Trusted by line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 text-xs text-primary-foreground/25 uppercase tracking-[0.2em] font-medium"
          >
            Trusted by executives at leading organizations
          </motion.p>
        </div>
      </div>
    </section>
  );
}
