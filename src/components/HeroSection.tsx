import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import networkGraph from "@/assets/network-graph.png";
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

      {/* Glow accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-teal/5 blur-[120px] animate-glow-pulse" />

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
              Your organization has problems AI can't see.{" "}
              <span className="text-gradient-brand">SENSO can.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-xl text-primary-foreground/50 max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              Persistent AI agents that diagnose, navigate, and solve the invisible
              dysfunction costing your company millions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                 <Button variant="hero" size="lg" className="group w-full sm:w-auto">
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
          </div>

          {/* Right — network graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <img
              src={networkGraph}
              alt="SENSO organizational network graph"
              className="w-full max-w-lg opacity-90 mix-blend-lighten animate-glow-pulse"
              style={{ animationDuration: "6s" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
