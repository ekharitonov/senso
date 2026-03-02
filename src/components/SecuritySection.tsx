import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    desc: "Audited security controls and data handling procedures",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All conversations and reports encrypted at rest and in transit",
  },
  {
    icon: Eye,
    title: "GDPR Compliant",
    desc: "Full data sovereignty with right-to-delete and export",
  },
  {
    icon: Server,
    title: "On-Premise Available",
    desc: "Deploy within your own infrastructure for maximum control",
  },
];

export default function SecuritySection() {
  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Enterprise Security
          </span>
          <h2 className="text-headline md:text-display-sm text-card-foreground">
            Built for enterprise-grade confidentiality
          </h2>
          <p className="text-muted-foreground mt-4 text-sm md:text-base max-w-lg mx-auto">
            Your organizational data is sensitive. SENSO is designed from the ground up to meet the strictest security and compliance requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background rounded-2xl p-6 border border-border text-center hover:border-accent/30 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-sm text-foreground mb-2">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
