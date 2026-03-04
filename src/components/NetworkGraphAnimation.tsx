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
  baseRadius: number;
  radius: number;
  vx: number;
  vy: number;
  brightness: number;
  pulseSpeed: number;
  pulseOffset: number;
  imgIndex: number;
  // Lifecycle: spawning → alive → dying → dead
  lifecycle: "spawning" | "alive" | "dying";
  lifecycleTimer: number;
  lifeDuration: number;
  // Growth/shrink animation
  scalePhase: number;
  scaleSpeed: number;
}

function randomAngle() { return Math.random() * Math.PI * 2; }

function createNode(cx: number, cy: number, imgIndex: number, forceAlive = false): NetNode {
  const angle = randomAngle();
  const dist = 90 + Math.random() * 300;
  const baseRadius = 8 + Math.random() * 22;
  return {
    x: cx + Math.cos(angle) * dist,
    y: cy + Math.sin(angle) * dist,
    baseRadius,
    radius: baseRadius,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    brightness: 0.3 + Math.random() * 0.7,
    pulseSpeed: 0.4 + Math.random() * 1.2,
    pulseOffset: Math.random() * Math.PI * 2,
    imgIndex,
    lifecycle: forceAlive ? "alive" : "spawning",
    lifecycleTimer: 0,
    lifeDuration: 8 + Math.random() * 20, // 8-28 seconds alive
    scalePhase: Math.random() * Math.PI * 2,
    scaleSpeed: 0.3 + Math.random() * 0.8,
  };
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

    // Track used face indices to prevent duplicates
    const usedFaces = new Set<number>();

    function getUniqueFaceIndex(): number {
      if (usedFaces.size >= faceSrcs.length) {
        // All faces used, clear and start over
        usedFaces.clear();
      }
      let idx: number;
      do {
        idx = Math.floor(Math.random() * faceSrcs.length);
      } while (usedFaces.has(idx));
      usedFaces.add(idx);
      return idx;
    }

    // Create initial nodes — mix of sizes
    const TARGET_NODE_COUNT = 34;
    const allNodes: NetNode[] = [];

    // Create initial set — all start alive
    for (let i = 0; i < TARGET_NODE_COUNT; i++) {
      const idx = getUniqueFaceIndex();
      allNodes.push(createNode(cx, cy, idx, true));
    }

    // Give initial nodes varied sizes
    // 4 large inner nodes
    for (let i = 0; i < 4; i++) {
      allNodes[i].baseRadius = 24 + Math.random() * 6;
      allNodes[i].radius = allNodes[i].baseRadius;
      allNodes[i].brightness = 0.85 + Math.random() * 0.15;
      const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 140 + Math.random() * 60;
      allNodes[i].x = cx + Math.cos(angle) * dist;
      allNodes[i].y = cy + Math.sin(angle) * dist;
    }
    // 8 medium nodes
    for (let i = 4; i < 12; i++) {
      allNodes[i].baseRadius = 17 + Math.random() * 7;
      allNodes[i].radius = allNodes[i].baseRadius;
      const angle = ((i - 4) / 8) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 220 + Math.random() * 80;
      allNodes[i].x = cx + Math.cos(angle) * dist;
      allNodes[i].y = cy + Math.sin(angle) * dist;
    }

    const tH = 178, tS = 42, tL = 48;
    let time = 0;
    let nextSpawnCheck = 2; // seconds until next spawn check

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      const dt = 0.016;
      time += dt;

      // === LIFECYCLE MANAGEMENT ===
      // Update lifecycle timers
      for (const n of allNodes) {
        n.lifecycleTimer += dt;
        if (n.lifecycle === "alive" && n.lifecycleTimer > n.lifeDuration) {
          n.lifecycle = "dying";
          n.lifecycleTimer = 0;
        }
      }

      // Remove dead nodes
      for (let i = allNodes.length - 1; i >= 0; i--) {
        if (allNodes[i].lifecycle === "dying" && allNodes[i].lifecycleTimer > 1.5) {
          usedFaces.delete(allNodes[i].imgIndex);
          allNodes.splice(i, 1);
        }
      }

      // Spawn new nodes to maintain count
      nextSpawnCheck -= dt;
      if (nextSpawnCheck <= 0) {
        nextSpawnCheck = 1 + Math.random() * 2;
        const aliveCount = allNodes.filter(n => n.lifecycle !== "dying").length;
        if (aliveCount < TARGET_NODE_COUNT) {
          const toSpawn = Math.min(3, TARGET_NODE_COUNT - aliveCount);
          for (let i = 0; i < toSpawn; i++) {
            const idx = getUniqueFaceIndex();
            allNodes.push(createNode(cx, cy, idx));
          }
        }
      }

      // === UPDATE POSITIONS — more dynamic movement ===
      for (const n of allNodes) {
        // Drift with gentle wandering
        n.x += n.vx;
        n.y += n.vy;

        // Attraction to center (elastic)
        const dx = n.x - cx, dy = n.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 240) {
          n.vx -= dx * 0.001;
          n.vy -= dy * 0.001;
        }

        // Random wandering impulse — makes movement organic
        n.vx += (Math.random() - 0.5) * 0.025;
        n.vy += (Math.random() - 0.5) * 0.025;

        // Damping
        n.vx *= 0.993;
        n.vy *= 0.993;

        // Clamp speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.2) {
          n.vx = (n.vx / speed) * 1.2;
          n.vy = (n.vy / speed) * 1.2;
        }

        // Animate radius — breathing/growing/shrinking
        const scaleBreathe = Math.sin(time * n.scaleSpeed + n.scalePhase) * 0.15;
        n.radius = n.baseRadius * (1 + scaleBreathe);
      }

      // === DYNAMIC EDGES — recalculated each frame ===
      const edges: { from: number; to: number; dist: number }[] = [];
      for (let i = 0; i < allNodes.length; i++) {
        for (let j = i + 1; j < allNodes.length; j++) {
          const dx = allNodes[i].x - allNodes[j].x;
          const dy = allNodes[i].y - allNodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            edges.push({ from: i, to: j, dist: d });
          }
        }
      }

      // Edge colors — vivid red, yellow, green + teal
      const edgeColors = [
        { h: 0, s: 90, l: 55 },     // bright red
        { h: 0, s: 85, l: 50 },     // deeper red
        { h: 40, s: 100, l: 55 },   // yellow/amber
        { h: 50, s: 95, l: 50 },    // gold
        { h: 130, s: 75, l: 48 },   // green
        { h: 120, s: 70, l: 42 },   // darker green
        { h: 178, s: 50, l: 52 },   // teal bright
      ];

      // Draw edges — much more visible, varied thickness
      for (let ei = 0; ei < edges.length; ei++) {
        const e = edges[ei];
        const a = allNodes[e.from], b = allNodes[e.to];
        const alphaA = getNodeAlpha(a, time);
        const alphaB = getNodeAlpha(b, time);
        const edgeAlpha = Math.min(alphaA, alphaB);
        
        // Each edge gets a stable color based on its index
        const colorIdx = ei % edgeColors.length;
        const c = edgeColors[colorIdx];
        
        const pulse = Math.sin(time * (0.3 + (ei % 7) * 0.15) + ei * 1.8);
        const baseOp = Math.max(0, (1 - e.dist / 210)) * 0.7; // much brighter base
        const op = baseOp * (0.5 + pulse * 0.5) * edgeAlpha;
        
        // Varied thickness: some thin (0.8), some medium (2), some thick (3.5)
        const thicknessClass = ei % 5;
        let lw: number;
        if (thicknessClass === 0) lw = 2.5 + pulse * 1.5;       // thick
        else if (thicknessClass === 1) lw = 1.5 + pulse * 1.0;   // medium
        else if (thicknessClass === 2) lw = 0.8 + pulse * 0.6;   // thin
        else if (thicknessClass === 3) lw = 2.0 + pulse * 1.2;   // medium-thick
        else lw = 1.0 + pulse * 0.8;                              // thin-medium
        
        if (op > 0.015) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${c.h}, ${c.s}%, ${c.l}%, ${op})`;
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      }

      // Signal dots
      const dotColors = [
        { h: 0, s: 85, l: 58 },
        { h: 45, s: 95, l: 58 },
        { h: 130, s: 70, l: 50 },
      ];
      for (let i = 0; i < 40 && edges.length > 0; i++) {
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
      for (const n of allNodes) {
        const alpha = getNodeAlpha(n, time);
        if (alpha < 0.01) continue;

        const currentImgIndex = n.imgIndex % faceSrcs.length;
        if (loadedRef.current >= faceSrcs.length) {
          const r = n.radius;
          const img = imagesRef.current[currentImgIndex];

          // Glow
          const glowR = r + 8 + alpha * 10;
          const gg = ctx.createRadialGradient(n.x, n.y, r * 0.8, n.x, n.y, glowR);
          gg.addColorStop(0, `hsla(${tH}, ${tS}%, ${tL + 15}%, ${alpha * 0.5})`);
          gg.addColorStop(1, `hsla(${tH}, ${tS}%, ${tL}%, 0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gg;
          ctx.fill();

          // Border ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${tH}, ${tS + 10}%, ${tL + 20}%, ${alpha * 0.9})`;
          ctx.lineWidth = 1.5 + alpha * 1.5;
          ctx.stroke();

          // Face
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

    function getNodeAlpha(n: NetNode, t: number): number {
      const sinVal = Math.sin(t * n.pulseSpeed + n.pulseOffset);
      const slowBreath = Math.sin(t * 0.15 + n.pulseOffset * 2);
      let baseAlpha = 0.1 + (sinVal * 0.5 + 0.5) * 0.5 + (slowBreath * 0.5 + 0.5) * 0.4;
      baseAlpha = Math.min(1, baseAlpha * n.brightness);

      // Lifecycle modulation
      if (n.lifecycle === "spawning") {
        const spawnProgress = Math.min(1, n.lifecycleTimer / 1.5); // 1.5s fade in
        baseAlpha *= spawnProgress;
        if (spawnProgress >= 1) {
          n.lifecycle = "alive";
          n.lifecycleTimer = 0;
        }
      } else if (n.lifecycle === "dying") {
        const dieProgress = Math.min(1, n.lifecycleTimer / 1.5); // 1.5s fade out
        baseAlpha *= 1 - dieProgress;
      }

      return baseAlpha;
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
