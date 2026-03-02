import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, ArrowDownRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tractionStats = [
  { label: "ACTIVE PILOTS:", value: "20", suffix: "Execs" },
  { label: "AGENTS DEPLOYED:", value: "2", suffix: "" },
  { label: "MESSAGES PROCESSED:", value: "8,750+", suffix: "" },
  { label: "PILOT CHURN:", value: "0%", suffix: "" },
];

const marketTheses = [
  {
    icon: TrendingUp,
    title: "Agentic AI Growth",
    desc: "The $7–8B Agentic AI market is growing at 40%+ CAGR. SENSO sits at the intersection of AI agents and organizational intelligence — a category with no incumbent.",
  },
  {
    icon: BarChart3,
    title: "HR Tech Convergence",
    desc: "The $43–48B HR Technology market is converging with AI. SENSO's multi-agent approach unlocks insights no survey tool or analytics platform can match.",
  },
  {
    icon: ArrowDownRight,
    title: "Consulting Displacement",
    desc: "The $350–500B management consulting industry is ripe for disruption. SENSO delivers in 48 hours what takes consultants 3–6 months at 1/10th the cost.",
  },
];

const fundingDetails = [
  { label: "Pre-Seed Target", value: "$1M" },
  { label: "Seed Target", value: "$5M" },
  { label: "Gross Margin Target", value: "80–88%" },
  { label: "Entry Point", value: "$15K Health Check" },
];

export default function InvestorsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-hero pt-[72px]">
        <div className="container mx-auto px-6 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary-foreground/40 uppercase tracking-[0.2em] mb-6"
          >
            Investor Relations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-sm md:text-display lg:text-display-lg text-primary-foreground"
          >
            Disrupting the{" "}
            <span className="text-gradient-brand">$500B</span>
            <br />
            Management Consulting Market.
          </motion.h1>
        </div>

        {/* Traction Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="container mx-auto px-6 pb-16"
        >
          <div className="max-w-4xl mx-auto rounded-2xl border border-accent/30 bg-navy-deep/80 backdrop-blur-xl p-1 glow-teal-subtle">
            <div className="text-center py-3 border-b border-primary-foreground/10">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-foreground/50">
                Live Traction Dashboard
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary-foreground/5">
              {tractionStats.map((stat) => (
                <div key={stat.label} className="bg-navy-deep p-6 text-center">
                  <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary-foreground/30 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-heading font-extrabold text-accent">
                    {stat.value}
                  </p>
                  {stat.suffix && (
                    <p className="text-sm text-primary-foreground/40 mt-1">{stat.suffix}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Market Thesis */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-headline md:text-display-sm text-card-foreground text-center mb-16"
          >
            The Market Thesis
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {marketTheses.map((thesis, i) => (
              <motion.div
                key={thesis.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-7 border border-border hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center mb-5">
                  <thesis.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{thesis.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{thesis.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding & Unit Economics */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-headline md:text-display-sm text-foreground text-center mb-16"
            >
              The Opportunity
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {fundingDetails.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-xl p-6 border border-border text-center"
                >
                  <p className="text-2xl md:text-3xl font-heading font-extrabold text-accent mb-2">{item.value}</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block rounded-2xl border-2 border-accent/30 p-8 md:p-10 glow-teal-subtle">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4">
                  Request Access to Seed Pitch Deck
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Qualified Investors Only</p>
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group">
                    Schedule Investor Conversation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
