import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import ChannelAddOns from "@/components/pricing/ChannelAddOns";
import PricingROI from "@/components/pricing/PricingROI";
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
        <PricingROI />
        <PricingFAQ />
        <PricingCTA />
      </div>
      <Footer />
    </div>
  );
}
