import { useEffect, useRef } from "react";
import face1 from "@/assets/faces/face-1.jpg";
import face2 from "@/assets/faces/face-2.jpg";
import face3 from "@/assets/faces/face-3.jpg";
import face4 from "@/assets/faces/face-4.jpg";
import face5 from "@/assets/faces/face-5.jpg";
import face6 from "@/assets/faces/face-6.jpg";
import face7 from "@/assets/faces/face-7.jpg";
import face8 from "@/assets/faces/face-8.jpg";
import face9 from "@/assets/faces/face-9.jpg";
import face10 from "@/assets/faces/face-10.jpg";
import face11 from "@/assets/faces/face-11.jpg";
import face12 from "@/assets/faces/face-12.jpg";
import face13 from "@/assets/faces/face-13.jpg";
import face14 from "@/assets/faces/face-14.jpg";
import face15 from "@/assets/faces/face-15.jpg";
import face16 from "@/assets/faces/face-16.jpg";
import face17 from "@/assets/faces/face-17.jpg";
import face18 from "@/assets/faces/face-18.jpg";
import face19 from "@/assets/faces/face-19.jpg";
import face20 from "@/assets/faces/face-20.jpg";
import face21 from "@/assets/faces/face-21.jpg";
import face22 from "@/assets/faces/face-22.jpg";
import face23 from "@/assets/faces/face-23.jpg";
import face24 from "@/assets/faces/face-24.jpg";
import face25 from "@/assets/faces/face-25.jpg";
import face26 from "@/assets/faces/face-26.jpg";
import face27 from "@/assets/faces/face-27.jpg";
import face28 from "@/assets/faces/face-28.jpg";
import face29 from "@/assets/faces/face-29.jpg";
import face30 from "@/assets/faces/face-30.jpg";
import face31 from "@/assets/faces/face-31.jpg";
import face32 from "@/assets/faces/face-32.jpg";
import face33 from "@/assets/faces/face-33.jpg";
import face34 from "@/assets/faces/face-34.jpg";
import face35 from "@/assets/faces/face-35.jpg";
import face36 from "@/assets/faces/face-36.jpg";
import face37 from "@/assets/faces/face-37.jpg";
import face38 from "@/assets/faces/face-38.jpg";
import face39 from "@/assets/faces/face-39.jpg";
import face40 from "@/assets/faces/face-40.jpg";
import face41 from "@/assets/faces/face-41.jpg";
import face42 from "@/assets/faces/face-42.jpg";
import face43 from "@/assets/faces/face-43.jpg";
import face44 from "@/assets/faces/face-44.jpg";
import face45 from "@/assets/faces/face-45.jpg";
import face46 from "@/assets/faces/face-46.jpg";

const faceSrcs = [face1, face2, face3, face4, face5, face6, face7, face8, face9, face10, face11, face12, face13, face14, face15, face16, face17, face18, face19, face20, face21, face22, face23, face24, face25, face26, face27, face28, face29, face30, face31, face32, face33, face34, face35, face36, face37, face38, face39, face40, face41, face42, face43, face44, face45, face46];

interface NetNode {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  brightness: number;
  pulseSpeed: number;
  pulseOffset: number;
  imgIndex: number; // -1 = abstract dot
  fadeState: "bright" | "dim" | "fading" | "growing";
  fadePhase: number;
}

export default function NetworkGraphAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 620;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    // Load images
    imagesRef.current = faceSrcs.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => { loadedRef.current++; };
      return img;
    });

    // --- Create nodes ---
    // 16 face nodes at varying sizes, depths, and pulse states
    const facePositions = [
      // Inner ring — large, bright (4 nodes)
      { angle: -0.4, dist: 110, r: 28, fade: "bright" as const, ps: 0.6 },
      { angle: 0.9, dist: 120, r: 26, fade: "bright" as const, ps: 0.5 },
      { angle: 2.1, dist: 115, r: 28, fade: "bright" as const, ps: 0.7 },
      { angle: 3.6, dist: 118, r: 27, fade: "bright" as const, ps: 0.55 },
      // Mid ring — 8 nodes spread evenly
      { angle: 0.0, dist: 195, r: 22, fade: "growing" as const, ps: 0.9 },
      { angle: 0.8, dist: 205, r: 20, fade: "bright" as const, ps: 0.8 },
      { angle: 1.6, dist: 190, r: 23, fade: "dim" as const, ps: 1.2 },
      { angle: 2.4, dist: 200, r: 21, fade: "bright" as const, ps: 0.8 },
      { angle: 3.2, dist: 195, r: 20, fade: "fading" as const, ps: 1.0 },
      { angle: 4.0, dist: 205, r: 22, fade: "growing" as const, ps: 0.7 },
      { angle: 4.8, dist: 190, r: 21, fade: "dim" as const, ps: 1.3 },
      { angle: 5.6, dist: 200, r: 19, fade: "fading" as const, ps: 1.1 },
      // Outer ring — 12 nodes
      { angle: 0.3, dist: 270, r: 16, fade: "fading" as const, ps: 1.4 },
      { angle: 0.85, dist: 280, r: 15, fade: "dim" as const, ps: 1.6 },
      { angle: 1.4, dist: 265, r: 16, fade: "growing" as const, ps: 1.1 },
      { angle: 2.0, dist: 275, r: 14, fade: "dim" as const, ps: 1.5 },
      { angle: 2.6, dist: 260, r: 15, fade: "fading" as const, ps: 0.9 },
      { angle: 3.2, dist: 280, r: 14, fade: "dim" as const, ps: 1.2 },
      { angle: 3.8, dist: 270, r: 15, fade: "growing" as const, ps: 1.3 },
      { angle: 4.4, dist: 285, r: 13, fade: "fading" as const, ps: 1.4 },
      { angle: 5.0, dist: 265, r: 15, fade: "dim" as const, ps: 1.0 },
      { angle: 5.5, dist: 278, r: 14, fade: "fading" as const, ps: 1.5 },
      { angle: 5.95, dist: 260, r: 15, fade: "growing" as const, ps: 1.1 },
      { angle: 1.0, dist: 275, r: 13, fade: "dim" as const, ps: 1.6 },
    ];

    const allNodes: NetNode[] = facePositions.map((p, i) => ({
      x: cx + Math.cos(p.angle) * p.dist,
      y: cy + Math.sin(p.angle) * p.dist,
      radius: p.r,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      brightness: p.fade === "bright" ? 0.95 : p.fade === "growing" ? 0.7 : p.fade === "dim" ? 0.35 : 0.5,
      pulseSpeed: p.ps,
      pulseOffset: Math.random() * Math.PI * 2,
      imgIndex: i % faceSrcs.length,
      fadeState: p.fade,
      fadePhase: Math.random() * Math.PI * 2,
    }));

    // 22 additional small face nodes for density — all with photos
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 35 + Math.random() * 260;
      allNodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        radius: 8 + Math.random() * 6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        brightness: 0.2 + Math.random() * 0.5,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
        imgIndex: facePositions.length + i,
        fadeState: i % 3 === 0 ? "fading" : i % 3 === 1 ? "dim" : "growing",
        fadePhase: Math.random() * Math.PI * 2,
      });
    }

    // Build edges
    const edges: { from: number; to: number }[] = [];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const dx = allNodes[i].x - allNodes[j].x;
        const dy = allNodes[i].y - allNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = (allNodes[i].imgIndex >= 0 && allNodes[j].imgIndex >= 0) ? 200 : 155;
        if (dist < threshold) {
          edges.push({ from: i, to: j });
        }
      }
    }

    const tH = 178, tS = 42, tL = 48;
    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      time += 0.016;

      // Update positions
      for (const n of allNodes) {
        n.x += n.vx;
        n.y += n.vy;
        const dx = n.x - cx, dy = n.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 270) { n.vx -= dx * 0.0004; n.vy -= dy * 0.0004; }
        n.vx += (Math.random() - 0.5) * 0.006;
        n.vy += (Math.random() - 0.5) * 0.006;
        n.vx *= 0.997;
        n.vy *= 0.997;
      }

      // Edge color palette — focused on red/yellow/green traffic light
      const edgeColors = [
        { h: 0, s: 80, l: 55 },     // red
        { h: 40, s: 95, l: 55 },    // yellow/amber
        { h: 130, s: 65, l: 48 },   // green
        { h: 178, s: 42, l: 48 },   // teal (brand)
      ];

      // Draw edges — thicker, brighter, with color variation
      for (let ei = 0; ei < edges.length; ei++) {
        const e = edges[ei];
        const a = allNodes[e.from], b = allNodes[e.to];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const colorPhase = Math.sin(time * 0.25 + ei * 1.7) * 0.5 + 0.5;
        const colorIdx = Math.floor(colorPhase * edgeColors.length) % edgeColors.length;
        const c = edgeColors[colorIdx];
        const pulse = Math.sin(time * (0.4 + (ei % 5) * 0.2) + ei * 2.3);
        const baseOp = Math.max(0, (1 - dist / 210)) * 0.45;
        const op = baseOp * (0.4 + pulse * 0.6);
        // Line width varies: some thick, some thin
        const lw = 1.0 + pulse * 1.2 + (ei % 3 === 0 ? 0.5 : 0);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(${c.h}, ${c.s}%, ${c.l}%, ${op})`;
        ctx.lineWidth = lw;
        ctx.stroke();
      }

      // Signal dots — 40 flying dots in red, yellow, green
      const dotColors = [
        { h: 0, s: 85, l: 58 },   // red
        { h: 45, s: 95, l: 58 },  // yellow
        { h: 130, s: 70, l: 50 }, // green
      ];
      for (let i = 0; i < 40; i++) {
        const ei = Math.floor((time * (0.1 + (i % 5) * 0.05) + i * 2.9) % edges.length);
        const e = edges[ei];
        const a = allNodes[e.from], b = allNodes[e.to];
        const speed = 0.2 + (i % 6) * 0.08;
        const t = ((time * speed + i * 1.1) % 1);
        const px = a.x + (b.x - a.x) * t;
        const py = a.y + (b.y - a.y) * t;
        const dc = dotColors[i % 3];
        const dotPulse = 0.5 + Math.sin(time * 3 + i * 2.1) * 0.5;
        const dotRadius = 3 + dotPulse * 4;
        const g = ctx.createRadialGradient(px, py, 0, px, py, dotRadius);
        g.addColorStop(0, `hsla(${dc.h}, ${dc.s}%, ${dc.l + 15}%, ${dotPulse * 0.95})`);
        g.addColorStop(0.5, `hsla(${dc.h}, ${dc.s}%, ${dc.l}%, ${dotPulse * 0.5})`);
        g.addColorStop(1, `hsla(${dc.h}, ${dc.s}%, ${dc.l}%, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Draw nodes
      for (let ni = 0; ni < allNodes.length; ni++) {
        const n = allNodes[ni];

        // ALL nodes breathe dynamically — no static faces
        const sinVal = Math.sin(time * n.pulseSpeed + n.pulseOffset);
        const slowBreath = Math.sin(time * 0.15 + n.fadePhase); // very slow cycle 0→1→0
        // Combine fast pulse with slow deep breathing
        const baseAlpha = 0.1 + (sinVal * 0.5 + 0.5) * 0.5 + (slowBreath * 0.5 + 0.5) * 0.4;
        const alpha = Math.min(1, baseAlpha * n.brightness);

        // Each node has a unique face — no swapping needed
        const currentImgIndex = n.imgIndex % faceSrcs.length;

        if (currentImgIndex < faceSrcs.length && loadedRef.current >= faceSrcs.length) {
          const r = n.radius;
          const img = imagesRef.current[currentImgIndex];

          // Glow — pulses with the node
          const glowR = r + 8 + alpha * 10;
          const gg = ctx.createRadialGradient(n.x, n.y, r * 0.8, n.x, n.y, glowR);
          gg.addColorStop(0, `hsla(${tH}, ${tS}%, ${tL + 15}%, ${alpha * 0.5})`);
          gg.addColorStop(1, `hsla(${tH}, ${tS}%, ${tL}%, 0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gg;
          ctx.fill();

          // Border ring — brightness matches alpha
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${tH}, ${tS + 10}%, ${tL + 20}%, ${alpha * 0.9})`;
          ctx.lineWidth = 1.5 + alpha * 1.5;
          ctx.stroke();

          // Face with dynamic alpha
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, n.x - r, n.y - r, r * 2, r * 2);
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[620px] h-auto aspect-square"
      style={{ imageRendering: "auto" }}
    />
  );
}
