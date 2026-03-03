import HealthGauge from "../HealthGauge";
import { declaredValues, realBehavior } from "../DashboardData";

export default function DiagnosticSection() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-xl font-bold mb-5">
        Behavioral Analysis: <span className="text-muted-foreground font-normal">James K. (CEO)</span>
      </h2>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6 items-center">
          {/* Left: Declared Values */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
              Declared <span className="italic opacity-70">(Words)</span>
            </h4>
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {declaredValues.map(v => (
                <div key={v} className="px-4 py-2 rounded-full border border-teal/40 text-teal text-xs font-medium bg-teal/10 w-fit">
                  {v}
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-card rounded-lg border border-border text-xs text-muted-foreground italic leading-relaxed">
              "I always champion transparency in our processes."
            </div>
          </div>

          {/* Center: Gauge */}
          <div className="flex justify-center order-first lg:order-none">
            <HealthGauge score={6.8} label="Behavior Gap Score" severity="Moderate" />
          </div>

          {/* Right: Real Behavior */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 lg:text-right">
              Actual Behavior <span className="italic opacity-70">(Data)</span>
            </h4>
            <div className="flex flex-col gap-4">
              {realBehavior.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-base border border-border shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal leading-none font-heading">{b.val}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-1">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
