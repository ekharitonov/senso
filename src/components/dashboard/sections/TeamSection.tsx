import { useState } from "react";
import { teamMembers } from "../DashboardData";

export default function TeamSection() {
  const [hovRow, setHovRow] = useState<number | null>(null);

  const riskColor = (v: number) => {
    if (v > 6) return "text-red-400 bg-red-400/15";
    if (v > 4) return "text-yellow-400 bg-yellow-400/10";
    return "text-teal bg-teal/15";
  };

  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-xl font-bold mb-5">Stakeholder Alignment</h2>

      {/* Desktop table */}
      <div className="hidden sm:block bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border">
              {["Stakeholder", "Department", "Alignment", "Dysfunction Risk", "Bridges"].map(h => (
                <th key={h} className="py-3.5 px-5 text-left font-medium text-[10px] tracking-[0.12em] uppercase text-muted-foreground font-mono">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((p, i) => (
              <tr key={i}
                className={`transition-colors cursor-pointer ${i < teamMembers.length - 1 ? "border-b border-border" : ""}`}
                style={{ background: hovRow === i ? "hsla(178, 42%, 48%, 0.03)" : "transparent" }}
                onMouseEnter={() => setHovRow(i)} onMouseLeave={() => setHovRow(null)}>
                <td className="py-3.5 px-5 text-foreground font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-[11px] font-bold text-teal border border-border">
                      {p.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <div>{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.role}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-muted-foreground">{p.department}</td>
                <td className="py-3.5 px-5">
                  <span className="font-bold font-mono text-teal">{p.alignmentScore}</span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`font-bold font-mono px-2 py-0.5 rounded ${riskColor(p.dysfunctionRisk)}`}>
                    {p.dysfunctionRisk}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-teal font-semibold font-mono">{p.bridges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {teamMembers.map((p, i) => (
          <div key={i} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-xs font-bold text-teal border border-border shrink-0">
                {p.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">{p.role} · {p.department}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-background/50 rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Align</div>
                <span className="text-sm font-bold font-mono text-teal">{p.alignmentScore}</span>
              </div>
              <div className="bg-background/50 rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Risk</div>
                <span className={`text-sm font-bold font-mono ${p.dysfunctionRisk > 5 ? "text-red-400" : "text-yellow-400"}`}>{p.dysfunctionRisk}</span>
              </div>
              <div className="bg-background/50 rounded-lg p-2 border border-border/50">
                <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Bridges</div>
                <span className="text-sm font-bold font-mono text-teal">{p.bridges}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
