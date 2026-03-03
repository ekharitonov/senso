import { useEffect, useRef } from "react";
import face1 from "@/assets/faces/face-1.jpg";
import face2 from "@/assets/faces/face-2.jpg";
import face3 from "@/assets/faces/face-3.jpg";
import face4 from "@/assets/faces/face-4.jpg";
import face5 from "@/assets/faces/face-5.jpg";
import face6 from "@/assets/faces/face-6.jpg";
import face7 from "@/assets/faces/face-7.jpg";
import face8 from "@/assets/faces/face-8.jpg";

const faceSrcs = [face1, face2, face3, face4, face5, face6, face7, face8];

interface FaceNode {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  brightness: number;
  pulseSpeed: number;
  pulseOffset: number;
  imgIndex: number;
}

interface Edge {
  from: number;
  to: number;
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
    const size = 520;
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

    // Create face nodes — 8 primary large nodes with faces
    const faceNodes: FaceNode[] = [];
    const primaryCount = 8;

    // Place primary nodes in a nice organic ring
    const positions = [
      { angle: -0.4, dist: 120 },
      { angle: 0.3, dist: 155 },
      { angle: 1.0, dist: 110 },
      { angle: 1.7, dist: 160 },
      { angle: 2.4, dist: 125 },
      { angle: 3.2, dist: 150 },
      { angle: 4.0, dist: 115 },
      { angle: 5.0, dist: 145 },
    ];

    for (let i = 0; i < primaryCount; i++) {
      const { angle, dist } = positions[i];
      faceNodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        radius: 22 + Math.random() * 8, // face circle radius
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        brightness: 0.7 + Math.random() * 0.3,
        pulseSpeed: 0.4 + Math.random() * 0.8,
        pulseOffset: Math.random() * Math.PI * 2,
        imgIndex: i,
      });
    }

    // Add 14 small abstract nodes for network density
    const smallNodes: FaceNode[] = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist = 40 + Math.random() * 180;
      smallNodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        radius: 2 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        brightness: 0.3 + Math.random() * 0.4,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
        imgIndex: -1, // no image
      });
    }

    const allNodes = [...faceNodes, ...smallNodes];

    // Create edges based on proximity
    const edges: Edge[] = [];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const dx = allNodes[i].x - allNodes[j].x;
        const dy = allNodes[i].y - allNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          edges.push({ from: i, to: j });
        }
      }
    }

    const tealH = 178, tealS = 42, tealL = 48;
    let time = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, size, size);
      time += 0.016;

      // Update positions
      for (const node of allNodes) {
        node.x += node.vx;
        node.y += node.vy;
        const dx = node.x - cx;
        const dy = node.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 210) {
          node.vx -= dx * 0.0004;
          node.vy -= dy * 0.0004;
        }
        node.vx += (Math.random() - 0.5) * 0.008;
        node.vy += (Math.random() - 0.5) * 0.008;
        node.vx *= 0.997;
        node.vy *= 0.997;
      }

      // Draw edges
      for (const edge of edges) {
        const a = allNodes[edge.from];
        const b = allNodes[edge.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = Math.max(0, (1 - dist / 170)) * 0.3;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(${tealH}, ${tealS}%, ${tealL}%, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw signal pulses on some edges
      const pulseEdgeCount = 3;
      for (let i = 0; i < pulseEdgeCount; i++) {
        const edgeIdx = Math.floor((time * 0.3 + i * 7.7) % edges.length);
        const edge = edges[edgeIdx];
        const a = allNodes[edge.from];
        const b = allNodes[edge.to];
        const t = ((time * 0.5 + i * 3.3) % 1);
        const px = a.x + (b.x - a.x) * t;
        const py = a.y + (b.y - a.y) * t;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, `hsla(${tealH}, 60%, 70%, 0.8)`);
        grad.addColorStop(1, `hsla(${tealH}, 60%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw nodes
      for (const node of allNodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.2 + 0.8;
        const alpha = node.brightness * pulse;

        if (node.imgIndex >= 0 && loadedRef.current >= faceSrcs.length) {
          // Face node — draw circular clipped image
          const r = node.radius;
          const img = imagesRef.current[node.imgIndex];

          // Outer glow ring
          const glowGrad = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, r + 12);
          glowGrad.addColorStop(0, `hsla(${tealH}, ${tealS}%, ${tealL + 15}%, ${alpha * 0.5})`);
          glowGrad.addColorStop(1, `hsla(${tealH}, ${tealS}%, ${tealL}%, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 12, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Teal ring border
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${tealH}, ${tealS + 10}%, ${tealL + 20}%, ${alpha * 0.7})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Clip circle and draw face
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.clip();

          // Draw image centered and covering the circle
          const imgSize = r * 2;
          ctx.drawImage(img, node.x - r, node.y - r, imgSize, imgSize);

          ctx.restore();
        } else if (node.imgIndex < 0) {
          // Small abstract node
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
          gradient.addColorStop(0, `hsla(${tealH}, ${tealS}%, ${tealL + 15}%, ${alpha * 0.4})`);
          gradient.addColorStop(1, `hsla(${tealH}, ${tealS}%, ${tealL}%, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${tealH}, ${tealS + 10}%, ${tealL + 20}%, ${alpha})`;
          ctx.fill();
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
      className="w-full max-w-[520px] h-auto aspect-square"
      style={{ imageRendering: "auto" }}
    />
  );
}
