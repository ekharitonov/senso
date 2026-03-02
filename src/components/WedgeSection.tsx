import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, DollarSign, FileText } from "lucide-react";

export default function WedgeSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-12">
            The Strategic Health Check
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-card rounded-xl p-8 border border-border opacity-60">
              <h3 className="font-heading font-bold text-lg text-muted-foreground mb-6">Traditional Consulting</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">$200K+ engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">3–6 months delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Generic binder of recommendations</span>
                </div>
              </div>
            </div>

            {/* SENSO */}
            <div className="bg-primary rounded-xl p-8 border-2 border-accent glow-teal relative">
              <div className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-foreground mb-6">SENSO Health Check</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-teal" />
                  <span className="text-primary-foreground">$15,000 one-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal" />
                  <span className="text-primary-foreground">48-hour delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal" />
                  <span className="text-primary-foreground">50-page actionable health report</span>
                </div>
              </div>
              <Link to="/contact" className="block mt-6">
                <Button variant="hero" className="w-full">Request Your Health Check</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
