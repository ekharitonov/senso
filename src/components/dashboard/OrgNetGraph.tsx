import { useState, useCallback, useRef, useEffect } from "react";
import { orgNodes as initialNodes, orgEdges, OrgEdge, avatarMap } from "./DashboardData";

interface OrgNetGraphProps {
  onSelectEdge?: (edge: OrgEdge, key: string) => void;
  selectedEdgeKey?: string | null;
}

type NodePos = typeof initialNodes[0] & { x: number; y: number };

export default function OrgNetGraph({ onSelectEdge, selectedEdgeKey }: OrgNetGraphProps) {
  const [hovEdge, setHovEdge] = useState<number | null>(null);
  const [hovNode, setHovNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<NodePos[]>(() => initialNodes.map(n => ({ ...n })));
  const [dragId, setDragId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragStart = useRef<{ ox: number; oy: number; mx: number; my: number } | null>(null);
  const nodeMap = useRef<Record<string, NodePos>>({});

  useEffect(() => {
    const map: Record<string, NodePos> = {};
    nodePositions.forEach(n => { map[n.id] = n; });
    nodeMap.current = map;
  }, [nodePositions]);

  const getEdgeKey = useCallback((e: OrgEdge) => [e.a, e.b].sort().join("-"), []);

  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  const handlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault(); e.stopPropagation();
    const node = nodeMap.current[id];
    if (!node) return;
    const svgPt = getSVGPoint(e.clientX, e.clientY);
    dragStart.current = { ox: node.x, oy: node.y, mx: svgPt.x, my: svgPt.y };
    setDragId(id);
    (e.target as SVGElement).setPointerCapture(e.pointerId);
  }, [getSVGPoint]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragId || !dragStart.current) return;
    const svgPt = getSVGPoint(e.clientX, e.clientY);
    const dx = svgPt.x - dragStart.current.mx;
    const dy = svgPt.y - dragStart.current.my;
    setNodePositions(prev => prev.map(n => n.id === dragId
      ? { ...n, x: Math.max(30, Math.min(570, dragStart.current!.ox + dx)), y: Math.max(30, Math.min(510, dragStart.current!.oy + dy)) }
      : n
    ));
  }, [dragId, getSVGPoint]);

  const handlePointerUp = useCallback(() => { setDragId(null); dragStart.current = null; }, []);

  const nMap = nodeMap.current;

  const tensionColor = (t?: string) => {
    if (t === "high") return "hsl(0, 65%, 55%)";
    if (t === "medium") return "hsl(45, 80%, 55%)";
    return "hsla(178, 42%, 48%, 0.25)";
  };

  const deptColor = (dept: string) => {
    const map: Record<string, string> = {
      Executive: "hsl(178, 42%, 48%)",
      Engineering: "hsl(213, 50%, 57%)",
      Product: "hsl(270, 45%, 60%)",
      Design: "hsl(330, 50%, 60%)",
      Marketing: "hsl(45, 80%, 55%)",
      QA: "hsl(150, 40%, 50%)",
      HR: "hsl(200, 45%, 55%)",
    };
    return map[dept] || "hsl(210, 20%, 50%)";
  };

  return (
    <svg
      ref={svgRef} viewBox="0 0 600 540" className="w-full h-auto select-none"
      style={{ maxHeight: 520, touchAction: "none" }}
      onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}
    >
      <defs>
        <filter id="sEdgeGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="sEdgePulse">
          <feGaussianBlur stdDeviation="4" result="b"><animate attributeName="stdDeviation" values="2;5;2" dur="2s" repeatCount="indefinite"/></feGaussianBlur>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sNodeGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="sNodePulse">
          <feGaussianBlur stdDeviation="5" result="b"><animate attributeName="stdDeviation" values="3;7;3" dur="2s" repeatCount="indefinite"/></feGaussianBlur>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Clip paths for avatar circles */}
        {initialNodes.map(nd => (
          <clipPath key={`clip-${nd.id}`} id={`clip-${nd.id}`}>
            <circle cx={0} cy={0} r={nd.r - 1.5} />
          </clipPath>
        ))}
      </defs>

      {/* Background rings */}
      <circle cx="300" cy="270" r="220" fill="none" stroke="hsla(178, 42%, 48%, 0.04)" strokeWidth="1"/>
      <circle cx="300" cy="270" r="160" fill="none" stroke="hsla(178, 42%, 48%, 0.03)" strokeWidth="1"/>

      {/* Edges */}
      {orgEdges.map((e, i) => {
        const a = nMap[e.a], b = nMap[e.b];
        if (!a || !b) return null;
        const key = getEdgeKey(e);
        const isSelected = selectedEdgeKey === key;
        const isConnected = hovNode && (e.a === hovNode || e.b === hovNode);
        const isHov = hovEdge === i;

        let stroke = "hsla(210, 20%, 40%, 0.12)";
        let width = 0.8;
        let filter = "none";

        if (e.tension === "high") {
          stroke = tensionColor("high");
          width = isSelected ? 3.5 : 2;
          filter = isSelected ? "url(#sEdgePulse)" : "url(#sEdgeGlow)";
        } else if (isSelected) {
          stroke = "hsl(178, 42%, 48%)";
          width = 3;
          filter = "url(#sEdgeGlow)";
        } else if (isHov || isConnected) {
          stroke = "hsl(178, 42%, 60%)";
          width = 1.8;
        } else if (e.tension === "medium") {
          stroke = "hsla(45, 80%, 55%, 0.4)";
          width = 1.2;
        }

        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={14} className="cursor-pointer"
              onMouseEnter={() => setHovEdge(i)} onMouseLeave={() => setHovEdge(null)}
              onClick={() => onSelectEdge?.(e, key)}/>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={width} filter={filter}
              className="pointer-events-none" style={{ transition: dragId ? "none" : "stroke 0.2s, stroke-width 0.2s" }}/>
            {/* Tension indicator for high */}
            {e.tension === "high" && !isSelected && (
              <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8} textAnchor="middle"
                fill="hsl(0, 65%, 55%)" fontSize={9} fontWeight={700} className="pointer-events-none" opacity={0.7}>⚡</text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodePositions.map(nd => {
        const isHov = hovNode === nd.id;
        const isDragging = dragId === nd.id;
        const isInSelected = selectedEdgeKey?.includes(nd.id);
        const showGlow = nd.highlight || isHov || isInSelected || isDragging;
        const color = deptColor(nd.department);

        return (
          <g key={nd.id} className={isDragging ? "cursor-grabbing" : "cursor-grab"}
            onMouseEnter={() => !dragId && setHovNode(nd.id)}
            onMouseLeave={() => !dragId && setHovNode(null)}
            onPointerDown={(e) => handlePointerDown(nd.id, e)}>
            {showGlow && (
              <circle cx={nd.x} cy={nd.y} r={nd.r + 7} fill="none" stroke={color}
                strokeWidth={isDragging ? 2 : 1.5}
                filter={nd.highlight && !isDragging ? "url(#sNodePulse)" : "url(#sNodeGlow)"}
                opacity={isHov || isDragging ? 1 : 0.6}>
                {nd.highlight && !isDragging && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>}
              </circle>
            )}
            <circle cx={nd.x} cy={nd.y} r={nd.r}
              fill="hsl(220, 30%, 12%)"
              stroke={isDragging ? "hsl(178, 42%, 48%)" : isInSelected ? color : isHov ? "hsl(178, 42%, 60%)" : "hsl(220, 20%, 22%)"}
              strokeWidth={isDragging ? 3 : isInSelected ? 2.5 : 1.5}/>
            {/* Avatar photo or initials */}
            {avatarMap[nd.name] ? (
              <g transform={`translate(${nd.x}, ${nd.y})`} clipPath={`url(#clip-${nd.id})`} style={{ pointerEvents: "none" }}>
                <image href={avatarMap[nd.name]} x={-(nd.r - 1.5)} y={-(nd.r - 1.5)} width={(nd.r - 1.5) * 2} height={(nd.r - 1.5) * 2} preserveAspectRatio="xMidYMid slice" />
              </g>
            ) : (
              <text x={nd.x} y={nd.y + 1} textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize={nd.r > 24 ? 13 : 11} fontWeight={700}
                style={{ pointerEvents: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {nd.name.split(" ").map(w => w[0]).join("")}
              </text>
            )}
            {/* Name */}
            <text x={nd.x} y={nd.y + nd.r + 16} textAnchor="middle"
              fill={isHov || isInSelected || isDragging ? "hsl(210, 40%, 95%)" : "hsl(210, 15%, 50%)"}
              fontSize={10} fontWeight={isInSelected ? 600 : 400}
              style={{ transition: dragId ? "none" : "fill 0.2s", pointerEvents: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {nd.name}
            </text>
            {/* Role */}
            {(isHov || isInSelected) && (
              <text x={nd.x} y={nd.y + nd.r + 28} textAnchor="middle"
                fill="hsl(210, 15%, 45%)" fontSize={8} style={{ pointerEvents: "none", fontFamily: "'JetBrains Mono', monospace" }}>
                {nd.role}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
