import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import ChannelAddOns from "@/components/pricing/ChannelAddOns";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="pt-[72px]">
        <PricingHero />
        <PricingCards />
        <ChannelAddOns />
        {/* ROI CTA Banner */}
        <section className="py-16 md:py-20 bg-gradient-hero relative">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Calculator className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">ROI Calculator</span>
            </div>
            <h2 className="text-headline font-heading font-bold text-primary-foreground mb-4">
              The ROI speaks for itself
            </h2>
            <p className="text-lg text-primary-foreground/60 mb-8 max-w-xl mx-auto">
              See exactly how much invisible coordination waste is costing your organization — and how fast SENSO pays for itself.
            </p>
            <Link to="/roi-calculator">
              <Button variant="teal" size="lg" className="group">
                Calculate Your Savings
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>
        <PricingFAQ />
        <PricingCTA />
      </div>
      <Footer />
    </div>
  );
}
