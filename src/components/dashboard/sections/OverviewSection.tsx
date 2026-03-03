import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { pulseData, insightsData, metricsCards } from "../DashboardData";

export default function OverviewSection() {
  const insightDotColor = (type: string) => {
    if (type === "alert") return "hsl(0, 65%, 55%)";
    if (type === "warn") return "hsl(45, 80%, 55%)";
    return "hsl(178, 42%, 48%)";
  };

  const metricColor = (c: string) => {
    if (c === "warn") return "text-yellow-400";
    if (c === "good") return "text-teal";
    return "text-muted-foreground";
  };

  const metricDot = (c: string) => {
    if (c === "warn") return "bg-yellow-400";
    if (c === "good") return "bg-teal";
    return "";
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* Organizational Pulse */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 pb-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold">Organizational Pulse</span>
              <span className="text-sm text-muted-foreground cursor-help" title="Culture health trend over time">ⓘ</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={275}>
            <AreaChart data={pulseData}>
              <defs>
                <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(178, 42%, 48%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(178, 42%, 48%)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(213, 47%, 57%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(213, 47%, 57%)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 30%, 25%, 0.5)" />
              <XAxis dataKey="month" stroke="hsl(210, 15%, 45%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(210, 15%, 45%)" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(222, 55%, 8%)", border: "1px solid hsl(220, 30%, 20%)", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "hsl(210, 15%, 55%)" }}
                itemStyle={{ color: "hsl(210, 40%, 92%)" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(210, 15%, 55%)", paddingTop: 8 }} iconType="plainline" />
              <Area type="monotone" dataKey="health" name="Cultural Health"
                stroke="hsl(178, 42%, 48%)" strokeWidth={2.5} fill="url(#tealFill)" dot={false}
                activeDot={{ r: 5, fill: "hsl(178, 42%, 48%)", strokeWidth: 0 }} />
              <Area type="monotone" dataKey="connectivity" name="Connectivity Index"
                stroke="hsl(213, 47%, 57%)" strokeWidth={1.5} fill="url(#blueFill)" dot={false}
                activeDot={{ r: 4, fill: "hsl(213, 47%, 57%)", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Early-Warning Alerts */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
          <h3 className="font-heading text-base font-bold mb-4">Early-Warning Alerts</h3>
          {insightsData.map((ins, i) => (
            <div key={i} className={`py-3 text-[13px] text-muted-foreground leading-relaxed flex gap-2.5 items-start ${i < insightsData.length - 1 ? "border-b border-border" : ""}`}>
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{
                background: insightDotColor(ins.type),
                boxShadow: `0 0 6px ${insightDotColor(ins.type)}`,
              }} />
              {ins.text}
            </div>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {metricsCards.map((m, i) => (
          <div key={i} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-teal/20 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              {metricDot(m.color) && <span className={`w-3 h-3 rounded-full ${metricDot(m.color)}`} style={{ boxShadow: "0 0 10px currentColor" }} />}
            </div>
            <div className={`text-[22px] font-bold font-mono tracking-tight ${metricColor(m.color)}`}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
