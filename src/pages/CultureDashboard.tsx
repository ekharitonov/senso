import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import TeamSection from "@/components/dashboard/sections/TeamSection";
import NetworkSection from "@/components/dashboard/sections/NetworkSection";
import DiagnosticSection from "@/components/dashboard/sections/DiagnosticSection";
import DataFlowSection from "@/components/dashboard/sections/DataFlowSection";

const nav = [
  { id: "overview", label: "Overview" },
  { id: "team", label: "Team" },
  { id: "network", label: "Knowledge Graph" },
  { id: "diagnostic", label: "Behavioral Analysis" },
  { id: "dataflow", label: "Data Flow" },
];

export default function CultureDashboard() {
  const [page, setPage] = useState("overview");

  // Force dark mode for dashboard
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => { document.documentElement.classList.remove("dark"); };
  }, []);

  const content = () => {
    switch (page) {
      case "overview": return <OverviewSection />;
      case "team": return <TeamSection />;
      case "network": return <NetworkSection />;
      case "diagnostic": return <DiagnosticSection />;
      case "dataflow": return <DataFlowSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Top Nav */}
      <nav className="flex items-center px-4 sm:px-7 h-14 border-b border-border bg-card/30 backdrop-blur-xl sticky top-0 z-50 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <Link to="/" className="flex items-center gap-2.5 mr-6 sm:mr-10 shrink-0">
          <div className="w-7 h-7 rounded-md bg-gradient-teal flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-heading text-base font-bold tracking-wider text-foreground">SENSO</span>
        </Link>

        <div className="flex shrink-0">
          {nav.map(n => (
            <button key={n.id}
              onClick={() => setPage(n.id)}
              className={`relative bg-transparent border-none cursor-pointer px-3 sm:px-4 py-[17px] text-xs sm:text-sm whitespace-nowrap transition-colors ${
                page === n.id ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-sm bg-teal transition-all duration-200 ${
                page === n.id ? "w-[60%] glow-teal-subtle" : "w-0"
              }`} />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">DEMO MODE</span>
          <div className="w-2 h-2 rounded-full bg-teal animate-glow-pulse" />
        </div>
      </nav>

      {/* Content */}
      <main className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        {/* Dashboard header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Culture Dashboard</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-teal/30 text-teal bg-teal/10">LIVE</span>
          </div>
          <p className="text-sm text-muted-foreground">Acme Corp · 200 employees · ORGANIZE plan · Updated 2 min ago</p>
        </div>
        {content()}
      </main>
    </div>
  );
}
