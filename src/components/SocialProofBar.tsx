import { motion } from "framer-motion";

const stats = [
  { value: "2", label: "Production Agents" },
  { value: "20", label: "C-Level Executives" },
  { value: "8,500+", label: "Messages Processed" },
  { value: "0%", label: "Churn Rate" },
];

export default function SocialProofBar() {
  return (
    <section className="bg-accent py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-accent-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-accent-foreground/70 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
