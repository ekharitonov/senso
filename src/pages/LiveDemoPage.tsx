import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Send, Activity, BrainCircuit, Zap, Shield, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const mockAnalysis = {
    diagnosis: "Core systemic misalignment between Technical Leadership and Product Vision.",
    rootCause: "Ego clash and lack of shared OKRs. The CTO feels bypassed by the new VP of Product's agile rollout. It's not a framework issue, it's a defensive posture.",
    impact: "$340K/quarter in delayed releases, elevated technical debt, and silent attrition in the engineering ranks.",
    intervention: "Immediate: Facilitate a structured 3-way alignment session. We must establish clear swimlanes and de-escalate the perceived threat to technical autonomy.",
    spokenResponse: "I hear you. The frustration with the CTO blocking the release isn't really about the code. It is a defensive posture against the new VP of Product. They are protecting their territory because they feel bypassed. This invisible friction is costing you about $340,000 this quarter in delays. I recommend an immediate structured alignment session to establish clear swimlanes. Shall I draft the intervention protocol?"
};

/* ── Graph data ── */
const graphNodes = [
    { id: "ceo", label: "CEO", x: 300, y: 60, r: 28, color: "hsl(178, 42%, 48%)", dept: "Executive" },
    { id: "cto", label: "CTO", x: 140, y: 180, r: 24, color: "hsl(0, 65%, 55%)", dept: "Engineering", highlight: true },
    { id: "vpp", label: "VP Product", x: 460, y: 180, r: 24, color: "hsl(270, 45%, 60%)", dept: "Product", highlight: true },
    { id: "eng1", label: "Lead Eng", x: 80, y: 320, r: 18, color: "hsl(213, 50%, 57%)", dept: "Engineering" },
    { id: "eng2", label: "Sr. Dev", x: 200, y: 340, r: 16, color: "hsl(213, 50%, 57%)", dept: "Engineering" },
    { id: "pm1", label: "PM", x: 400, y: 320, r: 18, color: "hsl(270, 45%, 60%)", dept: "Product" },
    { id: "des1", label: "Design Lead", x: 520, y: 310, r: 16, color: "hsl(330, 50%, 60%)", dept: "Design" },
    { id: "rel", label: "Release 2.0", x: 300, y: 260, r: 22, color: "hsl(45, 80%, 55%)", dept: "Project" },
];

const graphEdges = [
    { a: "ceo", b: "cto", tension: "medium" as const },
    { a: "ceo", b: "vpp", tension: null },
    { a: "cto", b: "vpp", tension: "high" as const, label: "Conflict" },
    { a: "cto", b: "rel", tension: "high" as const, label: "Blocks" },
    { a: "vpp", b: "rel", tension: "medium" as const, label: "Pushes" },
    { a: "cto", b: "eng1", tension: null },
    { a: "cto", b: "eng2", tension: null },
    { a: "vpp", b: "pm1", tension: null },
    { a: "vpp", b: "des1", tension: null },
    { a: "eng1", b: "rel", tension: null },
    { a: "pm1", b: "rel", tension: null },
];

const tensionColor = (t: string | null) => {
    if (t === "high") return "hsl(0, 65%, 55%)";
    if (t === "medium") return "hsl(45, 80%, 55%)";
    return "hsla(178, 42%, 48%, 0.15)";
};

/* ── Interactive Graph Component ── */
function DiagnosticGraph({ active }: { active: boolean }) {
    const [hovNode, setHovNode] = useState<string | null>(null);

    const nodeMap: Record<string, typeof graphNodes[0]> = {};
    graphNodes.forEach(n => { nodeMap[n.id] = n; });

    return (
        <svg viewBox="0 0 600 400" className="w-full h-full select-none" style={{ minHeight: 300 }}>
            <defs>
                <filter id="dglow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <filter id="dpulse">
                    <feGaussianBlur stdDeviation="5" result="b"><animate attributeName="stdDeviation" values="3;7;3" dur="2.5s" repeatCount="indefinite" /></feGaussianBlur>
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="bgGrad" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="hsla(178, 42%, 48%, 0.03)" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>

            <rect width="600" height="400" fill="url(#bgGrad)" rx="16" />

            {/* Background rings */}
            <circle cx="300" cy="200" r="160" fill="none" stroke="hsla(178, 42%, 48%, 0.04)" strokeWidth="1" />
            <circle cx="300" cy="200" r="100" fill="none" stroke="hsla(178, 42%, 48%, 0.03)" strokeWidth="1" />

            {/* Edges */}
            {graphEdges.map((e, i) => {
                const a = nodeMap[e.a], b = nodeMap[e.b];
                if (!a || !b) return null;
                const isConn = hovNode && (e.a === hovNode || e.b === hovNode);
                const stroke = e.tension === "high" ? tensionColor("high") :
                    e.tension === "medium" ? "hsla(45, 80%, 55%, 0.4)" :
                        isConn ? "hsla(178, 42%, 60%, 0.5)" : "hsla(210, 20%, 40%, 0.1)";
                const width = e.tension === "high" ? 2.5 : e.tension === "medium" ? 1.5 : isConn ? 1.2 : 0.6;

                return (
                    <g key={i}>
                        <motion.line
                            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                            stroke={stroke} strokeWidth={width}
                            filter={e.tension === "high" ? "url(#dpulse)" : "none"}
                            initial={active ? { pathLength: 0, opacity: 0 } : {}}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: active ? 0.3 + i * 0.15 : 0 }}
                        />
                        {e.label && (
                            <motion.text
                                x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}
                                textAnchor="middle" fill={stroke} fontSize="9" fontWeight="600"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                initial={active ? { opacity: 0 } : {}}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: active ? 1 + i * 0.15 : 0 }}
                            >
                                {e.label}
                            </motion.text>
                        )}
                        {e.tension === "high" && (
                            <text x={(a.x + b.x) / 2 + 25} y={(a.y + b.y) / 2 - 6} textAnchor="middle"
                                fill="hsl(0, 65%, 55%)" fontSize="10" fontWeight="700" opacity="0.7">⚡</text>
                        )}
                    </g>
                );
            })}

            {/* Nodes */}
            {graphNodes.map((nd, i) => {
                const isHov = hovNode === nd.id;
                return (
                    <motion.g key={nd.id}
                        initial={active ? { scale: 0, opacity: 0 } : {}}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, delay: active ? i * 0.12 : 0 }}
                        onMouseEnter={() => setHovNode(nd.id)}
                        onMouseLeave={() => setHovNode(null)}
                        className="cursor-pointer"
                    >
                        {/* Glow ring */}
                        {(nd.highlight || isHov) && (
                            <circle cx={nd.x} cy={nd.y} r={nd.r + 8} fill="none" stroke={nd.color}
                                strokeWidth={1.5} filter={nd.highlight ? "url(#dpulse)" : "url(#dglow)"}
                                opacity={isHov ? 1 : 0.5}>
                                {nd.highlight && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />}
                            </circle>
                        )}
                        {/* Node circle */}
                        <circle cx={nd.x} cy={nd.y} r={nd.r}
                            fill="hsl(220, 30%, 10%)"
                            stroke={isHov ? "hsl(178, 42%, 60%)" : nd.highlight ? nd.color : "hsl(220, 20%, 20%)"}
                            strokeWidth={isHov ? 2.5 : nd.highlight ? 2 : 1}
                        />
                        {/* Initials */}
                        <text x={nd.x} y={nd.y + 1} textAnchor="middle" dominantBaseline="middle"
                            fill={nd.color} fontSize={nd.r > 22 ? 12 : 10} fontWeight="700"
                            style={{ pointerEvents: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {nd.label.split(" ").map(w => w[0]).join("")}
                        </text>
                        {/* Label */}
                        <text x={nd.x} y={nd.y + nd.r + 14} textAnchor="middle"
                            fill={isHov ? "hsl(210, 40%, 95%)" : "hsl(210, 15%, 50%)"} fontSize="9" fontWeight="500"
                            style={{ pointerEvents: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "fill 0.2s" }}>
                            {nd.label}
                        </text>
                        {/* Dept on hover */}
                        {isHov && (
                            <text x={nd.x} y={nd.y + nd.r + 26} textAnchor="middle"
                                fill="hsl(210, 15%, 40%)" fontSize="7"
                                style={{ pointerEvents: "none", fontFamily: "'JetBrains Mono', monospace" }}>
                                {nd.dept}
                            </text>
                        )}
                    </motion.g>
                );
            })}
        </svg>
    );
}

/* ── Main Page ── */
export default function LiveDemoPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [showGraph, setShowGraph] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [turnCount, setTurnCount] = useState(0);
    const [isSessionComplete, setIsSessionComplete] = useState(false);
    const recognitionRef = useRef<any>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";
            recognition.onresult = (event: any) => {
                let t = "";
                for (let i = 0; i < event.results.length; i++) t += event.results[i][0].transcript;
                setTranscript(t);
            };
            recognition.onerror = (event: any) => {
                if (event.error !== 'no-speech') { toast.error("Microphone error. Please type your input."); setIsRecording(false); }
            };
            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
            if (transcript.trim().length > 10) handleAnalyze();
        } else {
            setTranscript(""); setReport(null);
            setIsRecording(true);
            if (recognitionRef.current) { try { recognitionRef.current.start(); } catch (e) { console.error(e); } }
            else { toast.warning("Speech Recognition not supported. Please type."); setIsRecording(false); }
        }
    };

    const speakResponse = (text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            const pref = voices.find(v => v.lang.includes("en") && (v.name.includes("Male") || v.name.includes("Daniel")));
            if (pref) u.voice = pref;
            u.pitch = 0.9; u.rate = 0.95;
            window.speechSynthesis.speak(u);
        }
    };

    const handleAnalyze = async () => {
        if (!transcript.trim() && !isRecording) return;
        setIsAnalyzing(true); setShowGraph(true);
        if (isRecording && recognitionRef.current) { recognitionRef.current.stop(); setIsRecording(false); }
        const userMsg: ChatMessage = { role: 'user', content: transcript };
        setMessages(prev => [...prev, userMsg]);
        const currentTranscript = transcript;
        setTranscript("");

        try {
            const res = await fetch("http://localhost:7861/api/v1/diagnostic-booth", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: currentTranscript, history: messages })
            });
            const data = await res.json();
            setReport(data);
            if (data.spokenResponse) {
                speakResponse(data.spokenResponse);
                setMessages(prev => [...prev, { role: 'assistant', content: data.spokenResponse }]);
                setTurnCount(prev => prev + 1);
            }
            if (data.session_complete) setIsSessionComplete(true);
        } catch {
            toast.error("Failed to connect to the Cognitive Engine. Ensure backend is running.");
        } finally { setIsAnalyzing(false); }
    };

    useEffect(() => { return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }; }, []);

    return (
        <div className="min-h-screen bg-navy-deep flex flex-col relative overflow-hidden dark">
            {/* Ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-teal/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-rose-500/3 blur-[120px] rounded-full" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/2 blur-[200px] rounded-full" />
            </div>

            <Navbar />

            <main className="flex-1 pt-24 pb-16 relative z-10">
                {/* Hero Header */}
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                                Cognitive Engine Live
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-foreground mb-5 tracking-tight">
                            The Diagnostic Booth
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            Speak your organizational reality. Watch AMOS map the dysfunction, and listen to VED deliver the intervention strategy in real-time.
                        </p>
                    </motion.div>

                    {/* Main Layout — 3-column on desktop */}
                    <div className="grid lg:grid-cols-[1fr_1.3fr_1fr] gap-6 items-start">

                        {/* ─── Left: Input Panel ─── */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                            className="lg:sticky lg:top-28 space-y-5">

                            {/* Chat / Input Card */}
                            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
                                            <BrainCircuit className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                        Live Session
                                        {turnCount > 0 && !isSessionComplete && (
                                            <span className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                                                Turn {turnCount}
                                            </span>
                                        )}
                                    </h3>
                                    {isRecording && (
                                        <span className="flex h-2.5 w-2.5 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
                                        </span>
                                    )}
                                </div>

                                {/* Messages */}
                                {messages.length > 0 && (
                                    <div className="max-h-[300px] overflow-y-auto px-4 py-3 space-y-3">
                                        {messages.map((msg, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-[13px] leading-relaxed ${
                                                    msg.role === 'user'
                                                        ? 'bg-accent/15 border border-accent/20 text-foreground rounded-br-md'
                                                        : 'bg-muted/50 border border-border/30 text-foreground/80 rounded-bl-md'
                                                }`}>
                                                    {msg.role === 'assistant' && <BrainCircuit className="w-3.5 h-3.5 text-accent/60 mb-1.5" />}
                                                    {msg.content}
                                                </div>
                                            </motion.div>
                                        ))}
                                        {isAnalyzing && (
                                            <div className="flex justify-start">
                                                <div className="bg-muted/50 border border-border/30 rounded-2xl px-4 py-3 rounded-bl-md flex items-center gap-2">
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Processing...</span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>
                                )}

                                {/* Input area */}
                                <div className="p-4">
                                    <textarea
                                        value={transcript}
                                        onChange={(e) => setTranscript(e.target.value)}
                                        placeholder={isSessionComplete ? "Session complete." : messages.length > 0 ? "Respond to Ved..." : "Describe a leadership conflict, blocked project, or toxic dynamic..."}
                                        className="w-full bg-muted/30 border border-border/30 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-accent/50 leading-relaxed min-h-[100px]"
                                        disabled={isSessionComplete || isAnalyzing}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && transcript.trim()) { e.preventDefault(); handleAnalyze(); } }}
                                    />
                                    <div className="flex gap-2.5 mt-3">
                                        {!isSessionComplete && (
                                            <Button
                                                variant={isRecording ? "destructive" : "default"}
                                                className={`flex-1 h-11 text-sm font-semibold rounded-xl transition-all ${
                                                    !isRecording ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20' : ''
                                                }`}
                                                onClick={toggleRecording}
                                                disabled={isAnalyzing}
                                            >
                                                {isRecording ? <><Square className="w-4 h-4 mr-2 fill-current" /> Stop</> : <><Mic className="w-4 h-4 mr-2" /> Speak</>}
                                            </Button>
                                        )}
                                        {!isSessionComplete && !isRecording && (
                                            <Button
                                                variant="outline"
                                                className="h-11 px-5 border-border/50 text-foreground hover:bg-muted/50 rounded-xl"
                                                onClick={handleAnalyze}
                                                disabled={!transcript.trim() || isAnalyzing}
                                            >
                                                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ─── Center: Network Graph ─── */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                            className="bg-card/40 backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden relative min-h-[480px]">
                            
                            <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Activity className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-heading font-bold text-foreground">AMOS Network Graph</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-destructive" />
                                        <span className="text-[9px] text-muted-foreground font-mono">Conflict</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ background: "hsl(45, 80%, 55%)" }} />
                                        <span className="text-[9px] text-muted-foreground font-mono">Tension</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-accent" />
                                        <span className="text-[9px] text-muted-foreground font-mono">Healthy</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <DiagnosticGraph active={showGraph} />
                            </div>

                            {/* Overlay when idle */}
                            <AnimatePresence>
                                {!showGraph && !report && (
                                    <motion.div exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
                                        <div className="relative mb-5">
                                            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                                                <BrainCircuit className="w-7 h-7 text-accent/40" />
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm max-w-xs text-center leading-relaxed">
                                            The cognitive engine is standing by.<br />
                                            <span className="text-foreground/60 font-medium">Inject organizational data to begin mapping.</span>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* ─── Right: Diagnostic Report ─── */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="lg:sticky lg:top-28 space-y-5">

                            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden min-h-[480px] flex flex-col">
                                <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <Shield className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                        Diagnostic Report
                                    </h3>
                                    {report && (
                                        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">4.5s</span>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    {isAnalyzing ? (
                                        <div className="flex flex-col items-center justify-center flex-1 gap-5">
                                            <div className="relative">
                                                <div className="w-14 h-14 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-1.5">
                                                <p className="text-foreground text-sm font-medium">Synthesizing Vectors...</p>
                                                <p className="text-muted-foreground text-[11px] font-mono">Applying IFS & SCARF models</p>
                                            </div>
                                        </div>
                                    ) : report ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 flex-1 overflow-y-auto">
                                            
                                            {/* VED Response */}
                                            <div className="bg-accent/5 border border-accent/15 rounded-xl p-4 relative">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                                                        <Mic className="w-2.5 h-2.5 text-accent-foreground" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                        VED Voice
                                                    </span>
                                                </div>
                                                <p className="text-foreground/80 text-[13px] leading-relaxed italic border-l-2 border-accent/30 pl-3">
                                                    "{report.spokenResponse}"
                                                </p>
                                            </div>

                                            {isSessionComplete && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                                    {/* Diagnosis */}
                                                    <div>
                                                        <div className="flex items-center gap-1.5 mb-2">
                                                            <BrainCircuit className="w-3 h-3 text-muted-foreground" />
                                                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Primary Diagnosis</span>
                                                        </div>
                                                        <p className="text-sm text-foreground/90 font-medium leading-relaxed">{report.diagnosis}</p>
                                                    </div>

                                                    {/* Root Cause */}
                                                    <div className="p-3.5 bg-destructive/5 border border-destructive/15 rounded-xl">
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            <Zap className="w-3 h-3 text-destructive" />
                                                            <span className="text-[10px] uppercase font-bold tracking-widest text-destructive">Root Cause</span>
                                                        </div>
                                                        <p className="text-[13px] text-foreground/70 leading-relaxed">{report.rootCause}</p>
                                                    </div>

                                                    {/* Metrics */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="p-3.5 bg-muted/30 rounded-xl border border-border/30">
                                                            <TrendingDown className="w-3.5 h-3.5 text-muted-foreground mb-2" />
                                                            <p className="font-mono text-lg font-bold" style={{ color: "hsl(45, 80%, 55%)" }}>
                                                                {report.impact?.split(' ')[0]}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground mt-0.5">Per quarter</p>
                                                        </div>
                                                        <div className="p-3.5 bg-muted/30 rounded-xl border border-border/30">
                                                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mb-2" />
                                                            <p className="text-[11px] text-foreground/70 leading-relaxed">
                                                                {report.intervention?.split('.')[0]}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 rounded-xl shadow-lg shadow-accent/15">
                                                        Send Full Action Plan
                                                    </Button>
                                                </motion.div>
                                            )}

                                            {!isSessionComplete && (
                                                <div className="border border-border/30 border-dashed rounded-xl p-6 text-center bg-muted/10">
                                                    <Activity className="w-8 h-8 text-accent/30 mx-auto mb-3 animate-[spin_4s_linear_infinite]" />
                                                    <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                                                        Continue the session to unlock the full diagnostic report.
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                                            <div className="w-12 h-12 rounded-2xl bg-muted/30 border border-border/30 flex items-center justify-center mb-4">
                                                <Shield className="w-6 h-6 text-muted-foreground/30" />
                                            </div>
                                            <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">
                                                Awaiting organizational data input to generate diagnostics.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
