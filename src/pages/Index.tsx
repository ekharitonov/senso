import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import UseCasesPreview from "@/components/UseCasesPreview";
import WedgeSection from "@/components/WedgeSection";
import SensoFlowSection from "@/components/SensoFlowSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TractionSection from "@/components/TractionSection";
import SecurityTrustSection from "@/components/SecurityTrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <TestimonialsSection />
      <UseCasesPreview />
      <WedgeSection />
      <SensoFlowSection />
      <TractionSection />
      <ArchitectureSection />
      <SecurityTrustSection />
      <Footer />
    </div>
  );
};

export default Index;
