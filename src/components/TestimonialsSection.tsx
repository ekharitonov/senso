import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
    <section className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Testimonials
          </span>
          <h2 className="text-headline md:text-display-sm text-foreground">
            What leaders say
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-7 border border-border hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
