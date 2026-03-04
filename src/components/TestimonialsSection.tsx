import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "In just one diagnostic session, the AI surfaced critical misalignments that six months of leadership meetings had completely missed. The Values Radar showed us exactly where declared priorities and actual behavior diverged.",
    role: "VP of Operations",
    company: "Industrial Enterprise, 5,000+ employees",
    tag: "Enterprise Diagnostics",
    emoji: "🏭",
  },
  {
    quote:
      "Within 7 hours of the first session, my team generated three product concepts we'd been circling for months. The weekly AI check-ins with the team created a new level of honesty — people started showing up differently.",
    role: "CEO",
    company: "Training & Development Firm",
    tag: "Speed & Team Activation",
    emoji: "🚀",
  },
  {
    quote:
      "For 15 years, I carried a problem I couldn't even articulate — always blaming external circumstances. The AI agent revealed the fear patterns I was hiding behind — the masks that kept me from moving toward the goals I'd been dreaming about.",
    role: "CFO",
    company: "Construction Company, 15+ years in leadership",
    tag: "Personal Transformation",
    emoji: "💎",
  },
  {
    quote:
      "My engagement score was among the worst on the team. My ego was furious. But the facts were undeniable. Painful? Yes. But necessary for the team's growth. I'm planning to write a book about this experience.",
    role: "CBDO",
    company: "Logistics Company",
    tag: "Ego Breakthrough",
    emoji: "🔥",
  },
  {
    quote:
      "The team came alive. AI as a neutral third party was the perfect moderator for resolving internal conflicts — addressing the elephants in the room no one dared to mention. I'm now championing enterprise-wide deployment.",
    role: "Head of Finance Department",
    company: "Major Banking Institution",
    tag: "Corporate Champion",
    emoji: "🏦",
  },
  {
    quote:
      "The feedback from a neutral third party, pointing to my specific actions and inactions, didn't destroy my relationship with the leader — it elevated it. I was no longer wrapped in illusions about myself.",
    role: "Team Member",
    company: "Cross-functional Project Team",
    tag: "Conflict → Growth",
    emoji: "👤",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal mb-4 block">
            Real Results
          </span>
          <h2 className="text-headline md:text-display-sm text-primary-foreground mb-4">
            What leaders experience
          </h2>
          <p className="text-primary-foreground/60 text-body-lg">
            Unedited reflections from leaders who went through the diagnostic process
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-primary/40 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:border-teal/30 transition-all duration-300 relative group"
            >
              <Quote className="w-7 h-7 text-teal/15 absolute top-5 right-5" />

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{t.emoji}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">
                  {t.tag}
                </span>
              </div>

              <p className="text-primary-foreground/85 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div className="border-t border-primary-foreground/10 pt-4">
                <p className="font-semibold text-sm text-primary-foreground">
                  {t.role}
                </p>
                <p className="text-xs text-primary-foreground/50">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
