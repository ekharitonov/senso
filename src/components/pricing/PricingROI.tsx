import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield } from "lucide-react";

export default function PricingROI() {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">The Math</p>
            <h2 className="text-headline font-heading font-bold text-primary-foreground">
              The ROI speaks for itself
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Organize ROI */}
            <div className="rounded-2xl border border-border/10 bg-primary-foreground/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h4 className="font-heading font-bold text-primary-foreground">Organize Plan ROI</h4>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed mb-2">
                A mid-size company (200 employees, 20 managers, $130K avg. manager salary) loses approximately{" "}
                <span className="text-primary-foreground font-semibold">$910,000/year</span>{" "}
                in coordination overhead — 35% of manager time spent on invisible friction.
              </p>
              <div className="rounded-lg bg-primary-foreground/[0.02] border border-border/5 p-3 mb-4 space-y-1 text-xs text-primary-foreground/50">
                <p>Annual coordination waste (35% of manager time): <span className="text-primary-foreground/80 font-medium">$910,000</span></p>
                <p>SENSO Organize plan ($5K/mo): <span className="text-primary-foreground/80 font-medium">$60,000/year</span></p>
                <p>Target: 30% reduction in coordination dysfunction</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">$273K</p>
                  <p className="text-xs text-primary-foreground/40 mt-1">Annual Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">81 days</p>
                  <p className="text-xs text-primary-foreground/40 mt-1">Payback Period</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">355%</p>
                  <p className="text-xs text-primary-foreground/40 mt-1">First-Year ROI</p>
                </div>
              </div>
            </div>

            {/* Health Check ROI */}
            <div className="rounded-2xl border border-border/10 bg-primary-foreground/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <h4 className="font-heading font-bold text-primary-foreground">Health Check ROI</h4>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed mb-5">
                The Health Check alone ($25K) typically identifies{" "}
                <span className="text-primary-foreground font-semibold">$150K–$400K</span>{" "}
                in recoverable annual waste within 48 hours.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">$150–400K</p>
                  <p className="text-xs text-primary-foreground/40 mt-1">Identified Waste</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">48 hrs</p>
                  <p className="text-xs text-primary-foreground/40 mt-1">Time to Report</p>
                </div>
              </div>
              <p className="text-xs text-primary-foreground/40 leading-relaxed">
                Most clients convert to Organize within 30 days of receiving their report.
              </p>
            </div>
          </div>

          {/* Every plan includes */}
          <div className="rounded-2xl border border-accent/10 bg-accent/[0.03] p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <p className="font-heading font-bold text-primary-foreground text-lg">What's included in every plan</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mx-auto">
              {[
                "Full data portability — export your Knowledge Graph at any time",
                "Right to delete — full GDPR/CCPA compliant data removal",
                "Client owns all organizational data — you own the insights",
                "No cross-tenant data sharing — your data never trains models for other clients",
                "No lock-in — cancel anytime (0% churn across 8,500+ interactions)",
              ].map((item, i) => (
                <p key={i} className="text-sm text-primary-foreground/60 flex gap-2">
                  <span className="text-accent shrink-0">·</span> {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
