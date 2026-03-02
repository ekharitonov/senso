import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, DollarSign, FileText, X, Check, ArrowRight } from "lucide-react";

export default function WedgeSection() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
            Your Entry Point
          </span>
          <h2 className="text-headline md:text-display-sm text-card-foreground">
            The Strategic Health Check
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl p-8 border border-border"
          >
            <h3 className="font-heading font-bold text-lg text-muted-foreground mb-8">Traditional Consulting</h3>
            <div className="space-y-5">
              {[
                { icon: DollarSign, text: "$200K+ engagement", status: "bad" },
                { icon: Clock, text: "3–6 months delivery", status: "bad" },
                { icon: FileText, text: "Generic recommendations", status: "bad" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SENSO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-hero rounded-2xl p-8 border border-accent/30 glow-teal-subtle"
          >
            <div className="absolute -top-3 left-8">
              <span className="bg-gradient-teal text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                RECOMMENDED
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-primary-foreground mb-8">SENSO Health Check</h3>
            <div className="space-y-5">
              {[
                { text: "$15,000 one-time" },
                { text: "48-hour delivery" },
                { text: "50-page actionable report" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-primary-foreground/90 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="block mt-8">
              <Button variant="hero" size="lg" className="w-full group">
                Request Your Health Check
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
