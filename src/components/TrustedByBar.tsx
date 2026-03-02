import { motion } from "framer-motion";

const logos = [
  { name: "Deloitte", abbr: "D" },
  { name: "McKinsey", abbr: "Mc" },
  { name: "Accenture", abbr: "Ac" },
  { name: "Boston Consulting", abbr: "BCG" },
  { name: "PwC", abbr: "PwC" },
  { name: "KPMG", abbr: "K" },
];

export default function TrustedByBar() {
  return (
    <section className="py-10 md:py-14 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-8"
        >
          Trusted by leaders at organizations like
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">{logo.abbr}</span>
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:block">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
