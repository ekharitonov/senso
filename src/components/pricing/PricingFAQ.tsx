import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Why does price scale with employees, not just interviews?",
    a: "Larger organizations have exponentially more cross-functional dependencies, political layers, and hidden dysfunction patterns. A 50-person startup has ~1,225 possible interpersonal relationships. A 500-person company has ~124,750. The analysis complexity — and the value of what SENSO finds — scales accordingly.",
  },
  {
    q: "Why do channels matter?",
    a: "More channels = richer signal. SENSO agents conduct structured conversations through your existing work tools (Slack, Teams, Web). Meeting people where they already work reduces friction and increases candor. Different employee populations prefer different channels — executives prefer scheduled web sessions, engineers prefer async Slack, field teams need mobile/WhatsApp.",
  },
  {
    q: "What about data security?",
    a: "SENSO does not monitor or scrape your existing communications. All data comes from structured SENSO conversations — interviews, sensing sessions, and follow-ups conducted by agents through connected channels. Dedicated tenant isolation. Encryption at rest and in transit. SOC 2 Type I on roadmap. Full detail on the Security page.",
  },
  {
    q: "How is this different from engagement surveys (Gallup, Culture Amp)?",
    a: "Surveys are point-in-time snapshots where people have learned to give the \"right\" answers. SENSO conducts continuous, confidential, structured conversations that surface what surveys miss — hidden conflicts, shadow decision-making, cultural drift between stated values and actual behavior. Surveys tell you temperature. SENSO tells you why the building is on fire.",
  },
  {
    q: "Can we start with Health Check and upgrade later?",
    a: "Yes — this is the most common path. 90% of Health Check clients convert to Organize within 30 days. The Health Check report makes the case for ongoing monitoring self-evident.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero border-t border-border/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-headline font-heading font-bold text-primary-foreground">
              Common Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/10 bg-primary-foreground/[0.03] px-6 data-[state=open]:border-accent/20"
              >
                <AccordionTrigger className="text-sm font-semibold text-primary-foreground/90 hover:text-accent py-5 [&>svg]:text-accent">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-primary-foreground/55 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
