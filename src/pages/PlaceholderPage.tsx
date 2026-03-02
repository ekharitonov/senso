import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/how-it-works": "How It Works",
  "/use-cases": "Use Cases",
  "/demo": "Interactive Demo",
  "/roi-calculator": "ROI Calculator",
  "/pricing": "Pricing",
  "/case-studies": "Case Studies",
  "/blog": "Blog & Insights",
  "/open-source": "Open Source",
  "/about": "About SENSO",
  "/investors": "For Investors",
  "/contact": "Contact & Request Pilot",
};

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || "Page";

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="pt-[72px]">
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {title}
            </h1>
            <p className="text-primary-foreground/60 text-lg">
              This page is coming soon.
            </p>
            <Link to="/" className="inline-block mt-8">
              <Button variant="hero-ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
