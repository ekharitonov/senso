import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function ROICalculatorPage() {
  const [employees, setEmployees] = useState(1500);
  const [salary, setSalary] = useState(175000);
  const [overhead, setOverhead] = useState(70);

  const results = useMemo(() => {
    const managers = Math.round(employees * 0.15);
    const currentWaste = managers * salary * (overhead / 100);
    const sensoSavings = currentWaste * 0.5; // 50% reduction
    return { managers, currentWaste, sensoSavings };
  }, [employees, salary, overhead]);

  const chartData = [
    { name: "Current Waste", value: results.currentWaste, fill: "hsl(215 15% 60%)" },
    { name: "With SENSO", value: results.currentWaste - results.sensoSavings, fill: "hsl(178 42% 48%)" },
  ];

  return (
    <div className="min-h-screen bg-teal-light">
      <Navbar />
      <div className="pt-[72px]">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left — inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-display-sm md:text-display font-heading font-extrabold text-foreground mb-12">
                ROI Calculator
              </h1>

              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-base font-semibold text-foreground">Number of Employees:</label>
                    <span className="text-lg font-bold text-foreground tabular-nums bg-card px-3 py-1 rounded-lg border border-border">
                      {employees.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[employees]}
                    onValueChange={([v]) => setEmployees(v)}
                    min={50}
                    max={10000}
                    step={50}
                    className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-base font-semibold text-foreground">Average Manager Salary:</label>
                    <span className="text-lg font-bold text-foreground tabular-nums bg-card px-3 py-1 rounded-lg border border-border">
                      ${salary.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[salary]}
                    onValueChange={([v]) => setSalary(v)}
                    min={100000}
                    max={300000}
                    step={5000}
                    className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-base font-semibold text-foreground">Est. Coordination Overhead:</label>
                    <span className="text-lg font-bold text-foreground tabular-nums bg-card px-3 py-1 rounded-lg border border-border">
                      {overhead}%
                    </span>
                  </div>
                  <Slider
                    value={[overhead]}
                    onValueChange={([v]) => setOverhead(v)}
                    min={30}
                    max={90}
                    step={5}
                    className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right — results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
            >
              <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-heading font-bold text-primary-foreground text-center">
                  Your Projected Impact
                </h2>
              </div>

              <div className="p-8">
                {/* Chart */}
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={80}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                        <LabelList
                          dataKey="value"
                          position="top"
                          formatter={(v: number) => `${formatCurrency(v)} / Year`}
                          style={{ fontSize: 14, fontWeight: 700, fill: "hsl(220 25% 12%)" }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Savings */}
                <div className="text-center border-t border-border pt-6">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Total Estimated Annual Savings:
                  </p>
                  <p className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
                    {formatCurrency(results.sensoSavings)}
                  </p>
                  <Link to="/contact">
                    <Button variant="teal" size="lg" className="w-full group">
                      Validate These Savings with a Pilot
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
