import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slackLogo from "@/assets/logos/slack-color.png";
import teamsLogo from "@/assets/logos/teams-color.png";
import gmailLogo from "@/assets/logos/gmail-color.png";
import calendarLogo from "@/assets/logos/calendar-color.png";

/* ─── Integrations ─── */
interface Integration {
  name: string;
  icon: string;
  logo: string;
  status: "ok" | "processing" | "error";
  statusText: string;
  y: number;
}

const initialIntegrations: Integration[] = [
  { name: "Slack", icon: "💬", logo: slackLogo, status: "ok", statusText: "Connected: 15 min ago (OK)", y: 70 },
  { name: "MS Teams", icon: "🟦", logo: teamsLogo, status: "ok", statusText: "Connected: 10 min ago (OK)", y: 210 },
  { name: "Email", icon: "✉️", logo: gmailLogo, status: "processing", statusText: "Syncing... (Processing)", y: 350 },
  { name: "Calendar", icon: "📅", logo: calendarLogo, status: "error", statusText: "Access error (Disconnected)", y: 490 },
];

const statusDotColor = { ok: "hsl(160 60% 45%)", processing: "hsl(178 42% 48%)", error: "hsl(0 68% 50%)" };
const statusTextColor = { ok: "hsl(160 60% 45%)", processing: "hsl(178 42% 48%)", error: "hsl(0 68% 50%)" };

/* ─── Log ─── */
const logEntries = [
  { time: "10:45:23", tag: "INFO", color: "hsl(160 60% 45%)", text: "Slack integration: New messages fetched (358)." },
  { time: "10:42:10", tag: "WARN", color: "hsl(178 42% 48%)", text: "MS Teams: API rate limit approaching." },
  { time: "10:49:01", tag: "ERROR", color: "hsl(0 68% 50%)", text: "Calendar integration: Connection timeout. Retrying..." },
];

/* ─── Counter ─── */
function Counter({ target, label }: { target: number; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <div className="flex justify-end items-baseline gap-3">
      <span className="text-xs text-muted-foreground font-mono text-right">{label}:</span>
      <span className="text-xl sm:text-2xl font-bold text-accent font-mono tabular-nums min-w-[70px] text-right">
        {val.toLocaleString()}
      </span>
    </div>
  );
}

// SENSO teal palette for SVG
const TEAL = "hsl(178 42% 48%)";
const TEAL_BRIGHT = "hsl(175 55% 55%)";
const TEAL_DIM = "hsl(178 42% 35%)";

export default function DataFlowSection() {
  const [termOpen, setTermOpen] = useState(true);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [reconnecting, setReconnecting] = useState<string | null>(null);

  const handleReconnect = (name: string) => {
    setReconnecting(name);
    setIntegrations(prev => prev.map(i =>
      i.name === name ? { ...i, status: "processing" as const, statusText: "Reconnecting..." } : i
    ));
    setTimeout(() => {
      setIntegrations(prev => prev.map(i =>
        i.name === name ? { ...i, status: "ok" as const, statusText: "Connected: just now (OK)" } : i
      ));
      setReconnecting(null);
    }, 3000);
  };

  const coreX = 580;
  const coreY = 290;

  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-xl sm:text-2xl font-bold mb-1 text-foreground">
        Data Flow & Integrations
      </h2>
      <p className="text-sm text-muted-foreground mb-4">Live data pipeline from communication tools through SENSO AI agents</p>

      <div className="relative bg-card/30 border border-border rounded-xl overflow-hidden" style={{ minHeight: 600 }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${TEAL} 1px, transparent 1px), linear-gradient(90deg, ${TEAL} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        {/* Main SVG */}
        <svg viewBox="0 0 900 600" className="w-full relative z-10" preserveAspectRatio="xMidYMid meet" style={{ minHeight: 600 }}>
          <defs>
            <filter id="sfGlow">
              <feGaussianBlur stdDeviation="4" result="b1" />
              <feGaussianBlur stdDeviation="10" result="b2" />
              <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sfBigGlow">
              <feGaussianBlur stdDeviation="16" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Pipe gradients */}
            <linearGradient id="sfTealGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={TEAL_DIM} />
              <stop offset="50%" stopColor={TEAL} />
              <stop offset="100%" stopColor={TEAL_BRIGHT} />
            </linearGradient>
            <linearGradient id="sfProcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={TEAL_DIM} />
              <stop offset="100%" stopColor={TEAL} />
            </linearGradient>
            <linearGradient id="sfRedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(0 68% 50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(0 68% 50%)" stopOpacity="0.15" />
            </linearGradient>
            {/* Beam gradients — teal palette */}
            <linearGradient id="sfBeamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(175 80% 90%)" stopOpacity="1" />
              <stop offset="8%" stopColor={TEAL} stopOpacity="0.9" />
              <stop offset="25%" stopColor={TEAL_BRIGHT} stopOpacity="0.6" />
              <stop offset="50%" stopColor={TEAL} stopOpacity="0.3" />
              <stop offset="80%" stopColor={TEAL_DIM} stopOpacity="0.1" />
              <stop offset="100%" stopColor={TEAL_DIM} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sfBeamBright" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="5%" stopColor="hsl(175 80% 90%)" stopOpacity="0.95" />
              <stop offset="15%" stopColor={TEAL_BRIGHT} stopOpacity="0.7" />
              <stop offset="40%" stopColor={TEAL} stopOpacity="0.35" />
              <stop offset="70%" stopColor={TEAL_DIM} stopOpacity="0.08" />
              <stop offset="100%" stopColor={TEAL_DIM} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sfBeamWarm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(175 70% 85%)" stopOpacity="0.8" />
              <stop offset="10%" stopColor={TEAL} stopOpacity="0.5" />
              <stop offset="35%" stopColor={TEAL_DIM} stopOpacity="0.2" />
              <stop offset="100%" stopColor={TEAL_DIM} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="sfBeamOrigin" cx="0" cy="0.5" r="0.4" fx="0" fy="0.5">
              <stop offset="0%" stopColor="hsl(175 80% 90%)" stopOpacity="0.6" />
              <stop offset="50%" stopColor={TEAL} stopOpacity="0.2" />
              <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
            </radialGradient>
            <filter id="sfBeamGlow">
              <feGaussianBlur stdDeviation="8" result="b1" />
              <feGaussianBlur stdDeviation="20" result="b2" />
              <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sfPlasmaGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feComposite in="b" in2="SourceGraphic" operator="over" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ═══ FLOW PIPES ═══ */}
          {integrations.map((integ, i) => {
            const sy = integ.y;
            const controlY = coreY + (i - 1.5) * 15;
            const path = `M 230 ${sy} C 370 ${sy}, 420 ${controlY}, ${coreX - 70} ${coreY}`;
            const pipeColor = integ.status === "ok" ? "url(#sfTealGrad)" : integ.status === "processing" ? "url(#sfProcGrad)" : "url(#sfRedGrad)";
            const rawColor = integ.status === "ok" ? TEAL_BRIGHT : integ.status === "processing" ? TEAL : "hsl(0 68% 50%)";

            return (
              <g key={integ.name}>
                <path d={path} fill="none" stroke="hsl(220 20% 10%)" strokeWidth="18" strokeLinecap="round" />
                <path d={path} fill="none" stroke={rawColor} strokeWidth="14" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.06 : 0.12} filter="url(#sfBigGlow)" />
                <path d={path} fill="none" stroke={pipeColor} strokeWidth="8" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.2 : 0.7} filter="url(#sfGlow)" />
                <path d={path} fill="none" stroke={rawColor} strokeWidth="2" strokeLinecap="round"
                  opacity={integ.status === "error" ? 0.15 : 0.4} />

                {/* Animated particles */}
                {integ.status !== "error" && (
                  <>
                    <circle r="6" fill={rawColor} opacity="0.9" filter="url(#sfGlow)">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                        <mpath href={`#sfp${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="3" fill="white" opacity="0.7">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4 + 1.0}s`}>
                        <mpath href={`#sfp${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill={rawColor} opacity="0.5" filter="url(#sfGlow)">
                      <animateMotion dur={integ.status === "processing" ? "5s" : "2.8s"} repeatCount="indefinite" begin={`${i * 0.4 + 1.8}s`}>
                        <mpath href={`#sfp${i}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
                <path id={`sfp${i}`} d={path} fill="none" stroke="none" />
              </g>
            );
          })}

          {/* ═══ INTEGRATION CARDS ═══ */}
          {integrations.map((integ) => {
            const y = integ.y;
            return (
              <g key={`c-${integ.name}`}>
                <rect x="38" y={y - 55} width="170" height="95" rx="14"
                  fill="hsl(222 55% 8%)" stroke="hsl(220 30% 20%)" strokeWidth="1.5" />
                <image href={integ.logo} x="97" y={y - 40} width="52" height="42"
                  preserveAspectRatio="xMidYMid meet" opacity={integ.status === "error" ? 0.4 : 0.95} />
                <text x="123" y={y + 26} textAnchor="middle"
                  fill="hsl(210 40% 95%)" fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
                  {integ.name}
                </text>
                <circle cx="50" cy={y + 44} r="5" fill={statusDotColor[integ.status]} />
                <text x="62" y={y + 48} fill={statusTextColor[integ.status]} fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace">
                  {integ.statusText}
                </text>
              </g>
            );
          })}

          {/* ═══ SENSO CORE ENGINE ═══ */}
          <g>
            <rect x={coreX - 82} y={coreY - 82} width="164" height="164" rx="28"
              fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0.2" />
            <rect x={coreX - 72} y={coreY - 72} width="144" height="144" rx="24"
              fill="hsl(222 55% 8%)" stroke={TEAL} strokeWidth="2" opacity="0.9" filter="url(#sfGlow)" />
            <rect x={coreX - 72} y={coreY - 72} width="144" height="144" rx="24"
              fill={TEAL} opacity="0.05">
              <animate attributeName="opacity" values="0.03;0.1;0.03" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* S logo */}
            <text x={coreX} y={coreY + 18} textAnchor="middle" fontSize="64" fontWeight="800"
              fill={TEAL} fontFamily="'Plus Jakarta Sans', sans-serif" opacity="0.9">
              S
            </text>
            {/* Corner accents */}
            {[
              { x: coreX - 78, y: coreY - 78 }, { x: coreX + 68, y: coreY - 78 },
              { x: coreX - 78, y: coreY + 68 }, { x: coreX + 68, y: coreY + 68 },
            ].map((c, i) => (
              <circle key={`corner-${i}`} cx={c.x + 5} cy={c.y + 5} r="2" fill={TEAL_BRIGHT} opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <text x={coreX} y={coreY + 100} textAnchor="middle"
              fill="hsl(210 40% 95%)" fontSize="16" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
              SENSO Core
            </text>
            <text x={coreX} y={coreY + 118} textAnchor="middle"
              fill="hsl(210 20% 60%)" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif">
              (AI Agents)
            </text>
          </g>

          {/* ═══ PLASMA BEAM → Output ═══ */}
          <g>
            <ellipse cx={coreX + 72} cy={coreY} rx="40" ry="50" fill="url(#sfBeamOrigin)" opacity="0.8">
              <animate attributeName="rx" values="35;50;35" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </ellipse>

            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke={TEAL} strokeWidth="80" opacity="0.03" filter="url(#sfBeamGlow)">
              <animate attributeName="opacity" values="0.02;0.06;0.02" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#sfBeamWarm)" strokeWidth="45" opacity="0.15" filter="url(#sfBeamGlow)">
              <animate attributeName="opacity" values="0.1;0.22;0.1" dur="1.3s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#sfBeamGrad)" strokeWidth="22" opacity="0.25" filter="url(#sfBeamGlow)">
              <animate attributeName="opacity" values="0.2;0.35;0.2" dur="0.9s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#sfBeamGrad)" strokeWidth="10" opacity="0.7" filter="url(#sfPlasmaGlow)">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="9;12;9" dur="0.8s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="url(#sfBeamBright)" strokeWidth="4" opacity="0.9" filter="url(#sfPlasmaGlow)">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="0.35s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 72} y1={coreY} x2="900" y2={coreY}
              stroke="hsl(175 80% 95%)" strokeWidth="1.8" opacity="0.95">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="0.25s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="1.5;2.5;1.5" dur="0.4s" repeatCount="indefinite" />
            </line>

            {/* Plasma jitter */}
            <line x1={coreX + 80} y1={coreY - 1.5} x2="900" y2={coreY - 2}
              stroke="url(#sfBeamBright)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="0.5s" repeatCount="indefinite" />
            </line>
            <line x1={coreX + 80} y1={coreY + 1.5} x2="900" y2={coreY + 2}
              stroke="url(#sfBeamBright)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.6s" repeatCount="indefinite" />
            </line>

            {/* Plasma spark particles */}
            {[
              { delay: 0, r: 5, dur: 1.0 },
              { delay: 0.15, r: 3, dur: 1.2 },
              { delay: 0.3, r: 4, dur: 0.9 },
              { delay: 0.45, r: 2.5, dur: 1.1 },
              { delay: 0.6, r: 6, dur: 1.3 },
              { delay: 0.75, r: 2, dur: 0.8 },
              { delay: 0.9, r: 3.5, dur: 1.0 },
              { delay: 1.05, r: 4.5, dur: 1.4 },
              { delay: 1.2, r: 2, dur: 0.7 },
              { delay: 1.35, r: 3, dur: 1.1 },
            ].map((p, i) => (
              <circle key={`pp-${i}`} r={p.r} fill={i % 3 === 0 ? "#FFFFFF" : "hsl(175 80% 90%)"} opacity="0.9" filter="url(#sfPlasmaGlow)">
                <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`}
                  path={`M ${coreX + 72},${coreY + (i % 3 - 1) * 2} L 900,${coreY + (i % 5 - 2) * 1.5}`} />
                <animate attributeName="opacity" values="1;0.1;0" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
                <animate attributeName="r" values={`${p.r};${p.r * 0.3};0`} dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} />
              </circle>
            ))}

            {/* Sparkle bursts near origin */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const sx = coreX + 72 + Math.cos(rad) * 15;
              const sy = coreY + Math.sin(rad) * 15;
              const ex = coreX + 72 + Math.cos(rad) * 35;
              const ey = coreY + Math.sin(rad) * 25;
              return (
                <line key={`spark-${i}`} x1={sx} y1={sy} x2={ex} y2={ey}
                  stroke="hsl(175 80% 90%)" strokeWidth="0.8" opacity="0.3" strokeLinecap="round">
                  <animate attributeName="opacity" values="0;0.5;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
                </line>
              );
            })}

            {/* Circuit board branches */}
            <path d={`M ${coreX + 150} ${coreY} L ${coreX + 180} ${coreY - 30} L 750 ${coreY - 30} L 770 ${coreY - 50} L 850 ${coreY - 50}`}
              fill="none" stroke={TEAL} strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <path d={`M ${coreX + 200} ${coreY} L ${coreX + 220} ${coreY - 55} L 720 ${coreY - 55} L 740 ${coreY - 80} L 780 ${coreY - 80} L 800 ${coreY - 105} L 870 ${coreY - 105}`}
              fill="none" stroke={TEAL} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
            <path d={`M ${coreX + 150} ${coreY} L ${coreX + 180} ${coreY + 30} L 750 ${coreY + 30} L 770 ${coreY + 50} L 860 ${coreY + 50}`}
              fill="none" stroke={TEAL} strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
            <path d={`M ${coreX + 200} ${coreY} L ${coreX + 220} ${coreY + 55} L 710 ${coreY + 55} L 730 ${coreY + 85} L 770 ${coreY + 85} L 790 ${coreY + 110} L 860 ${coreY + 110}`}
              fill="none" stroke={TEAL} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />

            {/* Circuit pulse particles */}
            {[
              `M ${coreX + 150},${coreY} L ${coreX + 180},${coreY - 30} L 750,${coreY - 30} L 770,${coreY - 50} L 850,${coreY - 50}`,
              `M ${coreX + 150},${coreY} L ${coreX + 180},${coreY + 30} L 750,${coreY + 30} L 770,${coreY + 50} L 860,${coreY + 50}`,
              `M ${coreX + 200},${coreY} L ${coreX + 220},${coreY - 55} L 720,${coreY - 55} L 740,${coreY - 80} L 780,${coreY - 80} L 800,${coreY - 105} L 870,${coreY - 105}`,
              `M ${coreX + 200},${coreY} L ${coreX + 220},${coreY + 55} L 710,${coreY + 55} L 730,${coreY + 85} L 770,${coreY + 85} L 790,${coreY + 110} L 860,${coreY + 110}`,
            ].map((path, i) => (
              <g key={`cp-${i}`}>
                <circle r="2.5" fill={TEAL_BRIGHT} opacity="0.8" filter="url(#sfGlow)">
                  <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={path} />
                </circle>
                <circle r="1.5" fill="hsl(175 80% 80%)" opacity="0.5">
                  <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8 + 1.5}s`} path={path} />
                </circle>
              </g>
            ))}

            {/* Junction dots */}
            {[
              { x: coreX + 180, y: coreY - 30 }, { x: 770, y: coreY - 50 },
              { x: coreX + 220, y: coreY - 55 }, { x: 800, y: coreY - 105 },
              { x: coreX + 180, y: coreY + 30 }, { x: 770, y: coreY + 50 },
              { x: coreX + 220, y: coreY + 55 }, { x: 790, y: coreY + 110 },
            ].map((dot, i) => (
              <circle key={`jd-${i}`} cx={dot.x} cy={dot.y} r="2.5" fill={TEAL_BRIGHT} opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Endpoint terminal dots */}
            {[
              { x: 850, y: coreY - 50 }, { x: 870, y: coreY - 105 },
              { x: 860, y: coreY + 50 }, { x: 860, y: coreY + 110 },
            ].map((dot, i) => (
              <g key={`td-${i}`}>
                <circle cx={dot.x} cy={dot.y} r="3.5" fill={TEAL} opacity="0.15" filter="url(#sfGlow)">
                  <animate attributeName="r" values="3;6;3" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={dot.x} cy={dot.y} r="2" fill={TEAL_BRIGHT} opacity="0.7">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* Binary data streams */}
            {[
              { x: 740, y: coreY - 42, text: "10011010101" },
              { x: 690, y: coreY - 68, text: "01101100010" },
              { x: 740, y: coreY + 42, text: "01011010110" },
              { x: 700, y: coreY + 68, text: "11001010100" },
              { x: 800, y: coreY - 18, text: "1001110101011" },
              { x: 810, y: coreY + 12, text: "0110101001101" },
            ].map((d, i) => (
              <text key={`bin-${i}`} x={d.x} y={d.y} fontSize="7" fill={TEAL} opacity="0.12"
                fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">
                <animate attributeName="opacity" values="0.06;0.22;0.06" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                {d.text}
              </text>
            ))}

            {/* Scattered floating particles */}
            {Array.from({ length: 15 }).map((_, i) => {
              const px = coreX + 90 + (i * 37) % 280;
              const py = coreY - 100 + (i * 23) % 200;
              const r = 0.8 + (i % 4) * 0.5;
              return (
                <circle key={`sp-${i}`} cx={px} cy={py} r={r}
                  fill={TEAL_BRIGHT} opacity={0.15 + (i % 5) * 0.04}>
                  <animate attributeName="opacity"
                    values={`${0.08 + (i % 3) * 0.05};${0.3 + (i % 4) * 0.05};${0.08 + (i % 3) * 0.05}`}
                    dur={`${2 + (i % 5) * 0.6}s`} repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>
        </svg>

        {/* ═══ RECONNECT BUTTONS ═══ */}
        {integrations.map((integ) => {
          if (integ.status !== "error") return null;
          const topPercent = ((integ.y + 55) / 600) * 100;
          return (
            <motion.button
              key={`reconnect-${integ.name}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReconnect(integ.name)}
              disabled={reconnecting === integ.name}
              className="absolute z-20 px-3 py-1.5 text-[10px] sm:text-xs font-mono font-semibold rounded-md bg-destructive/15 border border-destructive/30 text-destructive hover:bg-destructive/25 transition-colors disabled:opacity-50"
              style={{ left: "4%", top: `${topPercent}%` }}
            >
              {reconnecting === integ.name ? "⟳ Connecting..." : "🔄 Reconnect"}
            </motion.button>
          );
        })}

        {/* ═══ STATS OVERLAY ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-5 right-5 bg-card/85 backdrop-blur-lg border border-border rounded-xl p-4 sm:p-5 z-20 min-w-[260px]"
        >
          <Counter target={14502} label="Messages analyzed today" />
          <div className="border-t border-border my-2.5" />
          <Counter target={32} label="New patterns detected" />
          <div className="border-t border-border my-2.5" />
          <Counter target={148} label="Active sessions" />
        </motion.div>

        {/* ═══ TERMINAL OVERLAY ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-5 right-5 z-20 w-[340px] sm:w-[480px]"
        >
          <div className="bg-card/92 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b border-border">
              <span className="text-[11px] font-mono font-semibold text-muted-foreground">Activity Log (Terminal)</span>
              <div className="flex gap-1.5">
                <button onClick={() => setTermOpen(!termOpen)}
                  className="w-2.5 h-2.5 rounded-full bg-accent/50 hover:bg-accent transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
            <AnimatePresence>
              {termOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-3 sm:p-4 space-y-1.5">
                    {logEntries.map((log, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex gap-2 text-[11px] sm:text-xs font-mono leading-relaxed">
                        <span className="text-muted-foreground shrink-0">{log.time}</span>
                        <span className="font-bold shrink-0" style={{ color: log.color }}>[{log.tag}]</span>
                        <span className="text-foreground/70">{log.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
