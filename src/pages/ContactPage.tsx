import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/kharitonov-expert/30min";

export default function ContactPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-4">
              Schedule a Briefing
            </h1>
            <p className="text-lg text-primary-foreground/60 max-w-xl mx-auto">
              30-minute executive briefing — see how SENSO detects hidden dysfunction
              and drives measurable organizational change.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a1628&text_color=e2e8f0&primary_color=2dd4bf`}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
