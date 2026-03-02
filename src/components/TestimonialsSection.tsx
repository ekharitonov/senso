import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "In 48 hours, SENSO surfaced three critical friction points that six months of internal meetings had completely missed.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Series B SaaS, 200+ employees",
    initials: "SC",
  },
  {
    quote: "Finally, an AI tool that understands office politics. SENSO gave us the honest diagnostic our leadership team needed.",
    name: "Michael Torres",
    title: "Chief of Staff",
    company: "Mid-Market Enterprise",
    initials: "MT",
  },
  {
    quote: "The ROI was immediate. We redirected $400K in misallocated resources within the first quarter after SENSO's health check.",
    name: "David Kim",
    title: "COO",
    company: "Professional Services, 500+ employees",
    initials: "DK",
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
              className="bg-card rounded-2xl p-7 border border-border hover:shadow-card-hover transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-accent/15 absolute top-5 right-5" />
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal/30 to-teal/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-accent">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground/60">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
