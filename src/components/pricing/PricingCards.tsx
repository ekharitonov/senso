import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Check, Star, Zap, ArrowRight, Building2, BarChart3,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const diagnosticRows = [
  { size: "Up to 50", interviews: "10–12", channels: "Web + Slack or Teams", price: "$15,000" },
  { size: "50–200", interviews: "15–20", channels: "Web + Slack + Teams", price: "$25,000" },
  { size: "200–500", interviews: "20–30", channels: "Web + Slack + Teams + custom", price: "$40,000" },
  { size: "500–1,000", interviews: "30–40", channels: "All + HRIS", price: "$60,000" },
  { size: "1,000+", interviews: "Custom", channels: "Custom", price: "Custom" },
];

const organizeRows = [
  { size: "Up to 50", channels: "Slack or Teams + Web", price: "$3,000/mo" },
  { size: "50–200", channels: "Slack + Teams + Web", price: "$5,000/mo" },
  { size: "200–500", channels: "Slack + Teams + Web + Email", price: "$8,000/mo" },
  { size: "500–1,000", channels: "All + HRIS connector", price: "$12,000/mo" },
  { size: "1,000+", channels: "Full integration suite", price: "Custom" },
];

const diagnosticFeatures = [
  "Confidential structured interviews across 3+ organizational levels",
  "Dysfunction map with severity scores (1–10) for every friction pattern",
  "50-page Organizational Health Report with anonymized, traceable evidence",
  "Root cause analysis — not symptoms, not opinions, not surveys",
  "Prioritized intervention roadmap with effort/impact scoring",
  "Organizational Knowledge Graph snapshot — the real org chart, not the one on the wall",
];

const organizeFeatures = [
  "Live culture dashboard — alignment scores by team, updated continuously",
  "Proactive early-warning alerts when dysfunction patterns re-emerge or new ones form",
  "Continuous behavioral sensing across all connected channels",
  "Monthly executive briefings with trend analysis and intervention recommendations",
  "Dedicated human oversight analyst reviewing all critical agent actions",
  "Organizational Knowledge Graph — persistent, growing, yours to own",
  "Quarterly re-diagnostic — full health check refresh included",
];

const enterpriseFeatures = [
  "Multi-unit rollout with coordinated onboarding per business unit",
  "Cross-unit dysfunction pattern analysis — see what's systemic vs. local",
  "Executive committee and board-level reporting with board-ready summaries",
  "Custom agent configuration per business unit (different industries, cultures, languages)",
  "Multi-language support (agents conduct interviews in native language)",
  "SSO / SAML integration",
  "Dedicated tenant isolation per business unit with SOC 2 Type I roadmap",
  "API access for integration with internal tooling, BI dashboards, and HRIS systems",
  "Custom channel integrations (internal platforms, proprietary tools, Telegram, WhatsApp)",
  "Dedicated customer success manager + quarterly business reviews",
];

const enterpriseUseCases = [
  "Holding companies",
  "PE portfolio companies (diagnose all portfolio companies)",
  "Multi-geography enterprises",
  "Post-M&A integration (predict cultural compatibility, monitor integration)",
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2.5">
      {features.map((f, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-primary-foreground/60">
          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingCards() {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto">

          {/* DIAGNOSTIC */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="relative rounded-2xl border border-border/10 bg-primary-foreground/[0.03] backdrop-blur-sm p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary-foreground">DIAGNOSTIC</h3>
            </div>
            <p className="text-accent font-semibold text-sm mb-1">Strategic Health Check</p>
            <p className="text-primary-foreground/50 text-sm mb-6">
              One-time. 48 hours from first conversation to delivered report.
            </p>

            {/* Price table */}
            <div className="rounded-xl border border-border/10 overflow-hidden mb-6">
              <div className="grid grid-cols-4 text-[10px] font-mono uppercase tracking-wider text-primary-foreground/40 bg-primary-foreground/[0.03] px-3 py-2.5">
                <span>Size</span><span>Interviews</span><span>Channels</span><span className="text-right">Price</span>
              </div>
              {diagnosticRows.map((row, i) => (
                <div key={i} className="grid grid-cols-4 px-3 py-2.5 text-xs border-t border-border/5 text-primary-foreground/70">
                  <span>{row.size}</span>
                  <span>{row.interviews}</span>
                  <span className="text-primary-foreground/50">{row.channels}</span>
                  <span className="text-right font-semibold text-primary-foreground">{row.price}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">What you get</p>
            <div className="mb-6 flex-1">
              <FeatureList features={diagnosticFeatures} />
            </div>

            <div className="rounded-xl bg-primary-foreground/[0.02] border border-border/10 p-4 mb-4">
              <p className="text-xs text-primary-foreground/50 leading-relaxed">
                <span className="font-semibold text-primary-foreground/70">Price drivers:</span> Number of interviews determines agent inference time and analysis complexity. Larger organizations have more cross-functional dependencies and deeper political layers.
              </p>
            </div>

            <div className="rounded-xl bg-accent/5 border border-accent/10 p-4 mb-6">
              <p className="text-sm text-primary-foreground/70">
                <span className="font-semibold text-primary-foreground">Traditional consulting:</span>{" "}
                $200K–$500K and 3–6 months.
              </p>
              <p className="text-sm font-bold text-accent mt-1">SENSO: 48 hours.</p>
            </div>

            <Link to="/contact">
              <Button variant="hero-ghost" className="w-full">Request Health Check</Button>
            </Link>
          </motion.div>

          {/* ORGANIZE */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="relative rounded-2xl border-2 border-accent/30 bg-primary-foreground/[0.05] backdrop-blur-sm p-8 flex flex-col lg:scale-[1.03] shadow-[0_0_60px_-15px_hsl(178_42%_48%/0.2)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-teal text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5" fill="currentColor" /> Most Popular
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2 mt-2">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary-foreground">ORGANIZE</h3>
            </div>
            <p className="text-accent font-semibold text-sm mb-1">Organizational OS</p>
            <p className="text-primary-foreground/50 text-sm mb-6">
              Monthly. This is why we have 0% churn.
            </p>

            {/* Price table */}
            <div className="rounded-xl border border-accent/15 overflow-hidden mb-6">
              <div className="grid grid-cols-3 text-[10px] font-mono uppercase tracking-wider text-primary-foreground/40 bg-accent/[0.05] px-3 py-2.5">
                <span>Size</span><span>Channels</span><span className="text-right">Monthly</span>
              </div>
              {organizeRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-3 py-2.5 text-xs border-t border-accent/5 text-primary-foreground/70">
                  <span>{row.size}</span>
                  <span className="text-primary-foreground/50">{row.channels}</span>
                  <span className="text-right font-semibold text-primary-foreground">{row.price}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">Everything in Health Check, plus</p>
            <div className="mb-6 flex-1">
              <FeatureList features={organizeFeatures} />
            </div>

            <div className="rounded-xl bg-primary-foreground/[0.02] border border-border/10 p-4 mb-4">
              <p className="text-xs text-primary-foreground/50 leading-relaxed">
                <span className="font-semibold text-primary-foreground/70">Price drivers:</span> Monitoring costs scale with active participants and connected channels. More channels = richer signal = better sensing. The Knowledge Graph becomes exponentially more valuable over time.
              </p>
            </div>

            <div className="rounded-xl bg-accent/5 border border-accent/10 p-4 mb-6">
              <p className="text-xs text-primary-foreground/50 leading-relaxed">
                <span className="text-primary-foreground/80 font-semibold">Why clients don't leave:</span>{" "}
                Turning off SENSO means going blind. The dashboard, alerts, and continuous sensing become organizational infrastructure. The data compounds: month 6 insights are dramatically deeper than month 1.
              </p>
            </div>

            <Link to="/contact">
              <Button variant="hero" size="lg" className="w-full">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* ENTERPRISE */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="relative rounded-2xl border border-border/10 bg-primary-foreground/[0.03] backdrop-blur-sm p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary-foreground">ENTERPRISE</h3>
            </div>
            <p className="text-accent font-semibold text-sm mb-1">Multi-Unit Deployment</p>
            <p className="text-primary-foreground/50 text-sm mb-6">
              Custom pricing. For organizations with multiple business units, regions, or subsidiaries.
            </p>

            <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">Everything in Organize, plus</p>
            <div className="mb-6 flex-1">
              <FeatureList features={enterpriseFeatures} />
            </div>

            <div className="rounded-xl bg-primary-foreground/[0.02] border border-border/10 p-4 mb-6">
              <p className="text-xs font-semibold text-primary-foreground/50 mb-2">Built for:</p>
              <ul className="space-y-1">
                {enterpriseUseCases.map((uc, i) => (
                  <li key={i} className="text-xs text-primary-foreground/40 flex gap-2">
                    <span className="text-accent">›</span> {uc}
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact">
              <Button variant="hero-ghost" className="w-full">Contact Sales</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
