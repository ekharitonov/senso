import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import SensoFlowSection from "@/components/SensoFlowSection";
import UseCasesPreview from "@/components/UseCasesPreview";
import WedgeSection from "@/components/WedgeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <SensoFlowSection />
      <UseCasesPreview />
      <WedgeSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
