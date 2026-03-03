import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Calendar, MessageSquare } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/kharitonov-expert/30min";
const FORMSPREE_URL = "https://formspree.io/f/xwvngvge";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

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
          {/* Page header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto">
              Schedule a briefing or leave your contact details — we'll get back to you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Left — Calendly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary-foreground">
                    Schedule a Briefing
                  </h2>
                  <p className="text-sm text-primary-foreground/50">
                    30-minute executive demo
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a1628&text_color=e2e8f0&primary_color=2dd4bf`}
                  style={{ minWidth: "280px", height: "660px" }}
                />
              </div>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary-foreground">
                    Leave a Request
                  </h2>
                  <p className="text-sm text-primary-foreground/50">
                    We'll contact you within 24 hours
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-md p-8">
                {formStatus === "success" ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-14 h-14 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
                      Request sent!
                    </h3>
                    <p className="text-primary-foreground/50 mb-6">
                      We'll get back to you shortly.
                    </p>
                    <Button
                      variant="teal-ghost"
                      size="sm"
                      onClick={() => setFormStatus("idle")}
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 [&_input]:bg-[hsl(220_40%_22%)] [&_input]:border-[hsl(210_30%_35%)] [&_input]:text-primary-foreground [&_input]:placeholder:text-primary-foreground/50 [&_input]:focus:border-accent [&_textarea]:bg-[hsl(220_40%_22%)] [&_textarea]:border-[hsl(210_30%_35%)] [&_textarea]:text-primary-foreground [&_textarea]:placeholder:text-primary-foreground/50 [&_textarea]:focus:border-accent">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary-foreground/70">
                          Name *
                        </label>
                        <Input
                          name="name"
                          required
                          maxLength={100}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary-foreground/70">
                          Company
                        </label>
                        <Input
                          name="company"
                          maxLength={100}
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary-foreground/70">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        maxLength={255}
                        placeholder="you@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary-foreground/70">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        maxLength={30}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary-foreground/70">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        maxLength={1000}
                        rows={4}
                        placeholder="How can we help?"
                        className="resize-none"
                      />
                    </div>

                    {formStatus === "error" && (
                      <p className="text-sm text-destructive">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="teal"
                      size="lg"
                      className="w-full group"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send Request"}
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
