import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PricingCTA() {
  return (
    <section className="py-16 bg-gradient-hero border-t border-border/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact">
            <Button variant="hero" size="lg">
              Request Your Health Check <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="hero-ghost" size="lg">
              Schedule a Call
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
