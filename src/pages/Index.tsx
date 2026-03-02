import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import TrustedByBar from "@/components/TrustedByBar";
import ProblemSection from "@/components/ProblemSection";
import SensoFlowSection from "@/components/SensoFlowSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ITSecuritySection from "@/components/ITSecuritySection";
import AIProSection from "@/components/AIProSection";
import UseCasesPreview from "@/components/UseCasesPreview";
import SecuritySection from "@/components/SecuritySection";
import WedgeSection from "@/components/WedgeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <TrustedByBar />
      <ProblemSection />
      <SensoFlowSection />
      <ArchitectureSection />
      <ITSecuritySection />
      <AIProSection />
      <UseCasesPreview />
      <SecuritySection />
      <WedgeSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
