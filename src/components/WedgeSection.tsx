import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, DollarSign, FileText, X, Check, ArrowRight, Sparkles } from "lucide-react";

const traditionalItems = [
  { icon: DollarSign, text: "$200K+ engagement" },
  { icon: Clock, text: "3–6 months delivery" },
  { icon: FileText, text: "Generic recommendations" },
];

const sensoItems = [
  { text: "$15,000 one-time" },
  { text: "48-hour delivery" },
  { text: "50-page actionable report" },
];

export default function WedgeSection() {
  return (
    <section className="py-16 md:py-32 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/3 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{ scale: 0.98 }}
            className="bg-background rounded-2xl p-8 border border-border relative overflow-hidden"
          >
            {/* Strikethrough overlay effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-destructive/3 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />
            
            <h3 className="font-heading font-bold text-lg text-muted-foreground mb-8">Traditional Consulting</h3>
            <div className="space-y-5">
              {traditionalItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring" }}
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </motion.div>
                  <span className="text-muted-foreground text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SENSO */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="relative bg-gradient-hero rounded-2xl p-8 border border-accent/30 glow-teal-subtle overflow-hidden"
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/5 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 2 }}
            />
            
            <div className="absolute -top-3 left-8 z-20">
              <motion.span
                className="bg-gradient-teal text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg inline-flex items-center gap-1.5"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-3 h-3" />
                RECOMMENDED
              </motion.span>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-lg text-primary-foreground mb-8">SENSO Health Check</h3>
              <div className="space-y-5">
                {sensoItems.map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center shrink-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 300 }}
                    >
                      <Check className="w-4 h-4 text-teal" />
                    </motion.div>
                    <span className="text-primary-foreground/90 text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" className="block mt-8">
                <Button variant="hero" size="lg" className="w-full group">
                  Request Your Health Check
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
