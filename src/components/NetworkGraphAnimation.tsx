import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  brightness: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
}

export default function NetworkGraphAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 520;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Create nodes in a clustered organic layout
    const nodes: Node[] = [];
    const nodeCount = 28;
    const cx = size / 2;
    const cy = size / 2;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const dist = 60 + Math.random() * 150;
      nodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        radius: 3 + Math.random() * 5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        brightness: 0.5 + Math.random() * 0.5,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Create edges based on proximity
    const edges: Edge[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          edges.push({ from: i, to: j, opacity: 1 - dist / 160 });
        }
      }
    }

    const tealH = 178;
    const tealS = 42;
    const tealL = 48;

    let time = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, size, size);
      time += 0.016;

      // Update node positions (gentle drift)
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary
        const dx = node.x - cx;
        const dy = node.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 200) {
          node.vx -= dx * 0.0003;
          node.vy -= dy * 0.0003;
        }

        // Slight random drift
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Damping
        node.vx *= 0.998;
        node.vy *= 0.998;
      }

      // Draw edges
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dynamicOpacity = Math.max(0, (1 - dist / 180)) * 0.35;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(${tealH}, ${tealS}%, ${tealL}%, ${dynamicOpacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.3 + 0.7;
        const alpha = node.brightness * pulse;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, `hsla(${tealH}, ${tealS}%, ${tealL + 15}%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${tealH}, ${tealS}%, ${tealL}%, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${tealH}, ${tealS + 10}%, ${tealL + 20}%, ${alpha})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${tealH}, 30%, 85%, ${alpha * 0.8})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[520px] h-auto aspect-square"
      style={{ imageRendering: "auto" }}
    />
  );
}
