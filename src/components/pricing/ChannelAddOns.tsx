import { motion } from "framer-motion";
import { MessageSquare, Shield } from "lucide-react";

const coreChannels = ["Slack", "Microsoft Teams", "Web interface"];

const premiumAddOns = [
  { name: "HRIS connector (Workday, BambooHR, Personio)", price: "+$1,500/mo" },
  { name: "Email digest and async interview channels", price: "+$1,000/mo" },
  { name: "Telegram / WhatsApp (distributed or field teams)", price: "+$1,000/mo" },
  { name: "Custom API integration", price: "+$2,000/mo" },
  { name: "Jira / Asana / Monday.com workflow connector", price: "+$1,500/mo" },
];

export default function ChannelAddOns() {
  return (
    <section className="py-12 md:py-16 bg-gradient-hero border-t border-border/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-heading font-bold text-primary-foreground">Channel Add-Ons</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Core */}
            <div className="rounded-xl border border-border/10 bg-primary-foreground/[0.03] p-5">
              <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">
                Core — included in all plans
              </p>
              <ul className="space-y-2">
                {coreChannels.map((ch, i) => (
                  <li key={i} className="text-sm text-primary-foreground/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {ch} — <span className="text-accent text-xs font-medium">included</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="rounded-xl border border-border/10 bg-primary-foreground/[0.03] p-5">
              <p className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-wider mb-3">
                Premium — Organize & Enterprise
              </p>
              <ul className="space-y-2">
                {premiumAddOns.map((addon, i) => (
                  <li key={i} className="text-sm text-primary-foreground/60 flex justify-between gap-3">
                    <span>{addon.name}</span>
                    <span className="text-primary-foreground/80 font-semibold text-xs whitespace-nowrap">{addon.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-6 rounded-xl bg-accent/[0.03] border border-accent/10 p-4 flex gap-3">
            <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-primary-foreground/50 leading-relaxed">
              <span className="font-semibold text-primary-foreground/70">Important:</span> SENSO does not passively scrape Slack/Teams/email. All data comes from structured SENSO conversations — agents conduct interviews and sensing sessions through these channels. Your existing communications remain untouched.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
