import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ROICalculatorPage from "./pages/ROICalculator";
import InvestorsPage from "./pages/InvestorsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import UseCasesPage from "./pages/UseCasesPage";
import AboutPage from "./pages/AboutPage";
import DemoPage from "./pages/DemoPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import PricingPage from "./pages/PricingPage";
import CultureDashboard from "./pages/CultureDashboard";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const placeholderRoutes = [
  "/case-studies",
  "/blog",
  "/open-source",
  
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/roi-calculator" element={<ROICalculatorPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<CultureDashboard />} />
          <Route path="/contact" element={<ContactPage />} />
          {placeholderRoutes.map((path) => (
            <Route key={path} path={path} element={<PlaceholderPage />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
