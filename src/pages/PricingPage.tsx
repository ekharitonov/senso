import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  Shield,
  Zap,
  ArrowRight,
  Building2,
  Users,
  BarChart3,
  Clock,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const diagnosticRows = [
  { size: "Up to 50 employees", interviews: "12 interviews", price: "$15,000" },
  { size: "50–200 employees", interviews: "20 interviews", price: "$25,000" },
  { size: "200–1,000 employees", interviews: "30+ interviews", price: "$40,000" },
  { size: "1,000+ employees", interviews: "Custom scope", price: "Custom" },
];

const organizeRows = [
  { size: "Up to 50 employees", price: "$3,000/mo" },
  { size: "50–200 employees", price: "$5,000/mo" },
  { size: "200–1,000 employees", price: "$8,000/mo" },
  { size: "1,000+ employees", price: "Custom" },
];

const diagnosticFeatures = [
  "Confidential structured interviews with stakeholders across 3+ organizational levels",
  "Dysfunction map with severity scores (1–10)",
  "50-page Organizational Health Report with anonymized, traceable evidence",
  "Root cause analysis — not symptoms, not opinions, not surveys",
  "Prioritized intervention roadmap with effort/impact scoring",
];

const organizeFeatures = [
  "Live culture dashboard — alignment scores by team, updated continuously",
  "Proactive early-warning alerts when dysfunction patterns re-emerge",
  "Continuous behavioral sensing — not point-in-time surveys",
  "Monthly executive briefings with trend analysis",
  "Dedicated human oversight analyst",
  "Organizational Knowledge Graph — yours to own and keep",
];

const enterpriseFeatures = [
  "Multi-unit rollout and coordinated onboarding",
  "Cross-unit dysfunction pattern analysis — see what's systemic vs. local",
  "Executive committee-level reporting and board-ready summaries",
  "Custom agent configuration per business unit",
  "SSO / SAML integration",
  "Dedicated tenant isolation with SOC 2 Type I roadmap",
  "API access for integration with internal tooling and dashboards",
];

const channels = [
  { name: "Slack, Microsoft Teams, Web", note: "included at no additional cost" },
  { name: "Custom integrations (HRIS, Telegram, custom API)", note: "+$1,000–2,000/mo" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="pt-[72px]">
        {/* Hero */}
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
              system your organization didn't know it needed.
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24 bg-gradient-hero relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto">

              {/* DIAGNOSTIC */}
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="relative rounded-2xl border border-border/10 bg-primary-foreground/[0.03] backdrop-blur-sm p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary-foreground">
                    DIAGNOSTIC
                  </h3>
                </div>
                <p className="text-accent font-semibold text-sm mb-1">
                  Strategic Health Check
                </p>
                <p className="text-primary-foreground/50 text-sm mb-6">
                  One-time. 48 hours from first conversation to delivered report.
                </p>

                {/* Price table */}
                <div className="rounded-xl border border-border/10 overflow-hidden mb-6">
                  <div className="grid grid-cols-3 text-xs font-mono uppercase tracking-wider text-primary-foreground/40 bg-primary-foreground/[0.03] px-4 py-2.5">
                    <span>Size</span>
                    <span>Interviews</span>
                    <span className="text-right">Price</span>
                  </div>
                  {diagnosticRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 px-4 py-3 text-sm border-t border-border/5 text-primary-foreground/70"
                    >
                      <span>{row.size}</span>
                      <span>{row.interviews}</span>
                      <span className="text-right font-semibold text-primary-foreground">
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">
                  What you get
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {diagnosticFeatures.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-primary-foreground/60">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-accent/5 border border-accent/10 p-4 mb-6">
                  <p className="text-sm text-primary-foreground/70">
                    <span className="font-semibold text-primary-foreground">Traditional consulting:</span>{" "}
                    $200K+ and 3–6 months.
                  </p>
                  <p className="text-sm font-bold text-accent mt-1">
                    SENSO: 48 hours.
                  </p>
                </div>

                <Link to="/contact">
                  <Button variant="hero-ghost" className="w-full">
                    Request Health Check
                  </Button>
                </Link>
              </motion.div>

              {/* ORGANIZE — Most Popular */}
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="relative rounded-2xl border-2 border-accent/30 bg-primary-foreground/[0.05] backdrop-blur-sm p-8 flex flex-col lg:scale-[1.03] shadow-[0_0_60px_-15px_hsl(178_42%_48%/0.2)]"
              >
                {/* Popular badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-teal text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5" fill="currentColor" />
                    Most Popular
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary-foreground">
                    ORGANIZE
                  </h3>
                </div>
                <p className="text-accent font-semibold text-sm mb-1">
                  Organizational OS
                </p>
                <p className="text-primary-foreground/50 text-sm mb-6">
                  Monthly. This is why we have 0% churn.
                </p>

                {/* Price table */}
                <div className="rounded-xl border border-accent/15 overflow-hidden mb-6">
                  <div className="grid grid-cols-2 text-xs font-mono uppercase tracking-wider text-primary-foreground/40 bg-accent/[0.05] px-4 py-2.5">
                    <span>Size</span>
                    <span className="text-right">Monthly</span>
                  </div>
                  {organizeRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 px-4 py-3 text-sm border-t border-accent/5 text-primary-foreground/70"
                    >
                      <span>{row.size}</span>
                      <span className="text-right font-semibold text-primary-foreground">
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">
                  Everything in Health Check, plus
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {organizeFeatures.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-primary-foreground/60">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-accent/5 border border-accent/10 p-4 mb-6">
                  <p className="text-xs text-primary-foreground/50 leading-relaxed">
                    SENSO transitions from diagnostic to permanent infrastructure.
                    Agents stay embedded. They learn your organization over time.{" "}
                    <span className="text-primary-foreground/80 font-semibold">
                      The longer they run, the more valuable they become.
                    </span>
                  </p>
                </div>

                <Link to="/contact">
                  <Button variant="hero" size="lg" className="w-full">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              {/* ENTERPRISE */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="relative rounded-2xl border border-border/10 bg-primary-foreground/[0.03] backdrop-blur-sm p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary-foreground">
                    ENTERPRISE
                  </h3>
                </div>
                <p className="text-accent font-semibold text-sm mb-1">
                  Multi-Unit Deployment
                </p>
                <p className="text-primary-foreground/50 text-sm mb-6">
                  Custom pricing. For organizations with multiple business units,
                  regions, or subsidiaries.
                </p>

                <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">
                  Everything in Organize, plus
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {enterpriseFeatures.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-primary-foreground/60">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button variant="hero-ghost" className="w-full">
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="py-12 bg-gradient-hero border-t border-border/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
            >
              <div className="flex items-center gap-3 shrink-0">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-heading font-bold text-primary-foreground">
                  Channels
                </h3>
                <span className="text-xs text-primary-foreground/30 font-mono">
                  Included in all plans
                </span>
              </div>
              <div className="space-y-2">
                {channels.map((ch, i) => (
                  <p key={i} className="text-sm text-primary-foreground/60">
                    <span className="text-primary-foreground/80 font-medium">{ch.name}</span>{" "}
                    — <span className="text-accent/80">{ch.note}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI Math */}
        <section className="py-16 md:py-24 bg-gradient-hero relative">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center mb-12">
                <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
                  The Math
                </p>
                <h2 className="text-headline font-heading font-bold text-primary-foreground">
                  The ROI speaks for itself
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Organize ROI */}
                <div className="rounded-2xl border border-border/10 bg-primary-foreground/[0.03] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <h4 className="font-heading font-bold text-primary-foreground">
                      Organize Plan ROI
                    </h4>
                  </div>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed mb-5">
                    A mid-size company (200 employees, 20 managers, $130K avg.
                    manager salary) loses approximately{" "}
                    <span className="text-primary-foreground font-semibold">
                      $910,000/year
                    </span>{" "}
                    in coordination overhead — 35% of manager time spent on
                    invisible friction.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">$273K</p>
                      <p className="text-xs text-primary-foreground/40 mt-1">
                        Annual Savings
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">&lt;3 mo</p>
                      <p className="text-xs text-primary-foreground/40 mt-1">
                        Payback Period
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">355%</p>
                      <p className="text-xs text-primary-foreground/40 mt-1">
                        First-Year ROI
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health Check ROI */}
                <div className="rounded-2xl border border-border/10 bg-primary-foreground/[0.03] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-accent" />
                    <h4 className="font-heading font-bold text-primary-foreground">
                      Health Check ROI
                    </h4>
                  </div>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed mb-5">
                    The Health Check alone ($25K) typically identifies{" "}
                    <span className="text-primary-foreground font-semibold">
                      $150K–$400K
                    </span>{" "}
                    in recoverable annual waste within 48 hours.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">
                        $150–400K
                      </p>
                      <p className="text-xs text-primary-foreground/40 mt-1">
                        Identified Waste
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">48 hrs</p>
                      <p className="text-xs text-primary-foreground/40 mt-1">
                        Time to Report
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust line */}
              <div className="rounded-2xl border border-accent/10 bg-accent/[0.03] p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <p className="font-heading font-bold text-primary-foreground text-lg">
                    Every plan includes
                  </p>
                </div>
                <p className="text-sm text-primary-foreground/60">
                  Full data portability · Right to delete · Client owns all
                  organizational data · No lock-in
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-hero border-t border-border/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Request Your Health Check <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-ghost" size="lg">
                  Schedule a Call
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
