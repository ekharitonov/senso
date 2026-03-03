import { useEffect, useRef } from "react";

interface HealthGaugeProps {
  score?: number;
  max?: number;
  size?: number;
  label?: string;
  severity?: string;
}

export default function HealthGauge({ score = 4.2, max = 10, size = 260, label = "Dysfunction Score", severity = "Moderate" }: HealthGaugeProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 2;
    cv.width = size * dpr;
    cv.height = size * 0.72 * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size * 0.62, R = size * 0.4;
    let progress = 0;
    const target = score / max;

    // SENSO teal palette
    const tealStart = "hsl(178, 42%, 48%)";
    const tealMid = "hsl(45, 80%, 55%)";
    const redEnd = "hsl(0, 65%, 55%)";

    const draw = () => {
      ctx.clearRect(0, 0, size, size * 0.72);
      const sA = Math.PI, eA = 2 * Math.PI;
      const curAngle = sA + progress * Math.PI;

      // Outer glow ring
      ctx.save();
      ctx.shadowColor = "hsla(178, 42%, 48%, 0.15)";
      ctx.shadowBlur = 30;
      ctx.beginPath(); ctx.arc(cx, cy, R + 8, sA, eA);
      ctx.lineWidth = 1; ctx.strokeStyle = "hsla(178, 42%, 48%, 0.08)"; ctx.stroke();
      ctx.restore();

      // Track
      ctx.beginPath(); ctx.arc(cx, cy, R, sA, eA);
      ctx.lineWidth = 20; ctx.strokeStyle = "hsl(220, 30%, 15%)"; ctx.lineCap = "round"; ctx.stroke();

      // Value arc gradient: teal → yellow → red
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, tealStart);
      grad.addColorStop(0.5, tealMid);
      grad.addColorStop(1, redEnd);
      ctx.save();
      ctx.shadowColor = "hsla(178, 42%, 48%, 0.4)"; ctx.shadowBlur = 20;
      ctx.beginPath(); ctx.arc(cx, cy, R, sA, curAngle);
      ctx.lineWidth = 20; ctx.strokeStyle = grad; ctx.lineCap = "round"; ctx.stroke();
      ctx.restore();

      // Inner subtle arc
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R - 14, sA, curAngle);
      ctx.lineWidth = 2; ctx.strokeStyle = "hsla(178, 42%, 48%, 0.15)"; ctx.stroke();
      ctx.restore();

      // Tick marks
      for (let i = 0; i <= 10; i++) {
        const a = sA + (i / 10) * Math.PI;
        const inner = R - 28, outer = R - 22;
        ctx.beginPath();
        ctx.moveTo(cx + inner * Math.cos(a), cy + inner * Math.sin(a));
        ctx.lineTo(cx + outer * Math.cos(a), cy + outer * Math.sin(a));
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.strokeStyle = i / 10 <= progress ? "hsla(178, 42%, 48%, 0.5)" : "hsla(210, 20%, 40%, 0.3)";
        ctx.stroke();
      }

      // Needle
      const needleR = R - 18;
      const nx = cx + needleR * Math.cos(curAngle);
      const ny = cy + needleR * Math.sin(curAngle);
      ctx.save();
      ctx.shadowColor = "hsla(178, 42%, 48%, 0.6)"; ctx.shadowBlur = 12;
      const nGrad = ctx.createLinearGradient(cx, cy, nx, ny);
      nGrad.addColorStop(0, "hsla(178, 42%, 48%, 0.3)");
      nGrad.addColorStop(1, tealStart);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
      ctx.lineWidth = 3; ctx.strokeStyle = nGrad; ctx.stroke();
      ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fillStyle = tealStart; ctx.fill();
      ctx.restore();

      // Center dot
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(220, 30%, 12%)"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(210, 40%, 95%)"; ctx.fill();

      if (progress < target) {
        progress += (target - progress) * 0.04;
        if (target - progress < 0.001) progress = target;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [score, max, size]);

  const severityColor = score > 6 ? "text-red-400" : score > 4 ? "text-yellow-400" : "text-teal";

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <canvas ref={ref} style={{ width: size, height: size * 0.72 }} />
      <div className="text-center -mt-2">
        <div className="text-xs text-muted-foreground tracking-wider uppercase font-mono">{label}</div>
        <div className="font-heading text-4xl font-bold text-foreground leading-none mt-1">
          {score} <span className="text-lg text-muted-foreground font-normal">/ {max}</span>
        </div>
        <div className={`text-sm font-semibold mt-0.5 ${severityColor}`}>({severity})</div>
      </div>
    </div>
  );
}
