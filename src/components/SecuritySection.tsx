import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server } from "lucide-react";
import ParticleField from "./ParticleField";

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
    <section className="py-16 md:py-28 bg-gradient-hero relative overflow-hidden">
      <ParticleField />
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Enterprise Security
          </motion.span>
          <h2 className="text-headline md:text-display-sm text-primary-foreground">
            Built for enterprise-grade confidentiality
          </h2>
          <p className="text-primary-foreground/40 mt-4 text-sm md:text-base max-w-lg mx-auto">
            Your organizational data is sensitive. SENSO is designed from the ground up to meet the strictest security and compliance requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 text-center hover:border-accent/40 hover:bg-primary-foreground/8 transition-colors duration-300 group"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/25 to-teal/5 flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-teal/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                />
                <badge.icon className="w-6 h-6 text-teal-bright" />
              </motion.div>
              <h3 className="font-heading font-bold text-sm text-primary-foreground mb-2">{badge.title}</h3>
              <p className="text-xs text-primary-foreground/40 leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
