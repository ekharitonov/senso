import { useState, useCallback } from "react";
import OrgNetGraph from "../OrgNetGraph";
import { OrgEdge, bridgeDetails } from "../DashboardData";

export default function NetworkSection() {
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>("ceo-vpe");

  const handleSelectEdge = useCallback((_edge: OrgEdge, key: string) => {
    setSelectedEdgeKey(prev => prev === key ? null : key);
  }, []);

  const detail = selectedEdgeKey ? bridgeDetails[selectedEdgeKey] : null;

  const tensionBadge = (level?: string) => {
    switch (level) {
      case "low": return "text-teal bg-teal/15 border-teal/30";
      case "high": return "text-red-400 bg-red-400/15 border-red-400/30";
      default: return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
        <h2 className="font-heading text-xl font-bold">Organizational Knowledge Graph</h2>
        <span className="text-xs text-muted-foreground font-mono">Drag nodes · Click edges for details</span>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6 items-start">
          {/* Graph */}
          <div className="min-h-[300px] sm:min-h-[420px]">
            <OrgNetGraph onSelectEdge={handleSelectEdge} selectedEdgeKey={selectedEdgeKey} />
            <div className="flex gap-4 justify-center mt-3 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-red-400 rounded inline-block" /> High Tension</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-yellow-400 rounded inline-block" /> Medium</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 rounded inline-block" style={{ background: "hsla(178, 42%, 48%, 0.3)" }} /> Low</span>
            </div>
          </div>

          {/* Bridge Detail */}
          <div className={`transition-all duration-300 ${detail ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"}`}>
            {detail ? (
              <div className="bg-background/60 backdrop-blur-sm rounded-xl border border-border p-5 lg:sticky lg:top-20">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase block mb-1">Relationship Bridge</span>
                    <span className="text-base font-bold">
                      {detail.personA} <span className="text-teal">↔</span> {detail.personB}
                    </span>
                  </div>
                  <span className={`text-[11px] px-3 py-1.5 rounded-md font-semibold border whitespace-nowrap ${tensionBadge(detail.tensionLevel)}`}>
                    Tension: {detail.tension}
                  </span>
                </div>

                {/* SENSO Insight */}
                <div className="mb-4 p-3 bg-teal/5 rounded-lg border border-teal/10">
                  <div className="text-[10px] text-teal font-mono uppercase mb-1.5 font-semibold">SENSO Agent Insight</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{detail.insight}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {detail.gives.map(s => (
                    <div key={s.who}>
                      <div className="text-xs font-semibold text-teal mb-2">{s.who}</div>
                      {s.items.map(it => (
                        <div key={it} className="text-[12px] text-muted-foreground py-1.5 border-b border-border/60 flex items-start gap-1.5 leading-snug">
                          <span className="text-teal text-[8px] mt-1 shrink-0">●</span>
                          {it}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-card/30 rounded-xl border border-border/50 p-8 text-center">
                <div className="text-2xl mb-3 opacity-40">⟷</div>
                <p className="text-sm text-muted-foreground">Select a connection on the graph<br />to see relationship analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
