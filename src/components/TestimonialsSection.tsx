import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "In 48 hours, SENSO surfaced three critical friction points that six months of internal meetings had completely missed.",
    name: "VP of Operations",
    company: "Series B SaaS Company",
  },
  {
    quote: "Finally, an AI tool that understands office politics. SENSO gave us the honest diagnostic our leadership team needed.",
    name: "Chief of Staff",
    company: "Mid-Market Enterprise",
  },
  {
    quote: "The ROI was immediate. We redirected $400K in misallocated resources within the first quarter after SENSO's health check.",
    name: "COO",
    company: "Professional Services Firm",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-teal-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-14"
        >
          What Leaders Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <Quote className="w-8 h-8 text-teal mb-4 opacity-40" />
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
