import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Send, Activity, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// Mock AI generated report structure
const mockAnalysis = {
    diagnosis: "Core systemic misalignment between Technical Leadership and Product Vision.",
    rootCause: "Ego clash and lack of shared OKRs. The CTO feels bypassed by the new VP of Product's agile rollout. It's not a framework issue, it's a defensive posture.",
    impact: "$340K/quarter in delayed releases, elevated technical debt, and silent attrition in the engineering ranks.",
    intervention: "Immediate: Facilitate a structured 3-way alignment session. We must establish clear swimlanes and de-escalate the perceived threat to technical autonomy.",
    spokenResponse: "I hear you. The frustration with the CTO blocking the release isn't really about the code. It is a defensive posture against the new VP of Product. They are protecting their territory because they feel bypassed. This invisible friction is costing you about $340,000 this quarter in delays. I recommend an immediate structured alignment session to establish clear swimlanes. Shall I draft the intervention protocol?"
};

// Graph visualization data
const initialNodes = [
    { id: "CTO", x: 20, y: 30, label: "CTO", type: "person" },
    { id: "VP_Prod", x: 80, y: 70, label: "VP Product", type: "person" },
    { id: "Release", x: 50, y: 15, label: "Release 2.0", type: "project" },
    { id: "Culture", x: 50, y: 85, label: "Eng Culture", type: "concept" },
];

const initialEdges = [
    { source: "CTO", target: "Release", label: "Blocks" },
    { source: "VP_Prod", target: "Release", label: "Pushes" },
    { source: "CTO", target: "VP_Prod", label: "Conflict" },
    { source: "CTO", target: "Culture", label: "Protects" },
];

export default function LiveDemoPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [showGraph, setShowGraph] = useState(false);

    // Speech Recognition Ref
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check for browser support of Web Speech API
        if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US"; // Can be dynamic

            recognition.onresult = (event: any) => {
                let currentTranscript = "";
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                if (event.error !== 'no-speech') {
                    toast.error("Microphone error. Please type your input.");
                    setIsRecording(false);
                }
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            if (recognitionRef.current) recognitionRef.current.stop();
            setIsRecording(false);
            if (transcript.trim().length > 10) {
                handleAnalyze();
            }
        } else {
            setTranscript("");
            setReport(null);
            setShowGraph(false);
            setIsRecording(true);
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                } catch (e) {
                    console.error("Rec start error", e);
                }
            } else {
                toast.warning("Speech Recognition not supported in this browser. Please type.");
                setIsRecording(false);
            }
        }
    };

    const speakResponse = (text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel(); // stop any ongoing speech
            const utterance = new SpeechSynthesisUtterance(text);

            // Try to find a good authoritative/calm voice (like a coach)
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes("en") && (v.name.includes("Male") || v.name.includes("Daniel") || v.name.includes("Google UK English Male")));
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.pitch = 0.9;
            utterance.rate = 0.95; // slightly slower, more thoughtful

            window.speechSynthesis.speak(utterance);
        }
    };

    const handleAnalyze = () => {
        if (!transcript.trim() && !isRecording) return;
        setIsAnalyzing(true);
        setShowGraph(true); // Start showing the graph building process

        // Stop recording if active
        if (isRecording && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }

        // Simulate Ved processing and graph building
        setTimeout(() => {
            setReport(mockAnalysis);
            setIsAnalyzing(false);
            speakResponse(mockAnalysis.spokenResponse);
        }, 4500); // 4.5 seconds of "thinking" magic
    };

    // Stop speech synthesis if user navigates away
    useEffect(() => {
        return () => {
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-navy-deep flex flex-col relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

            <Navbar />

            <main className="flex-1 pt-28 pb-20 container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                        <Activity className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                            Cognitive Engine Live
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-4">
                        The Diagnostic Booth
                    </h1>
                    <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
                        Speak your organizational reality. Watch AMOS map the dysfunction, and listen to VED deliver the intervention strategy in real-time.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left Column: Input & Graph */}
                    <div className="space-y-6 flex flex-col">

                        {/* Input Module */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 glow-teal-subtle flex-1 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-heading font-bold text-xl text-primary-foreground">Raw Audio Signal</h3>
                                {isRecording && (
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                    </span>
                                )}
                            </div>

                            <textarea
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                placeholder="Click the microphone and describe a leadership conflict, a blocked project, or a toxic dynamic..."
                                className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-5 text-base md:text-lg text-primary-foreground/90 font-light mb-6 resize-none focus:outline-none focus:ring-1 focus:ring-accent min-h-[160px] leading-relaxed"
                            />

                            <div className="flex gap-4">
                                <Button
                                    variant={isRecording ? "destructive" : "teal"}
                                    className="flex-1 h-14 text-lg font-bold rounded-xl shadow-lg shadow-teal/20 transition-all hover:scale-[1.02]"
                                    onClick={toggleRecording}
                                >
                                    {isRecording ? (
                                        <>
                                            <Square className="w-5 h-5 mr-2 fill-current" /> Stop Listening
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="w-5 h-5 mr-2" /> Speak Reality
                                        </>
                                    )}
                                </Button>
                                {!isRecording && (
                                    <Button
                                        variant="outline"
                                        className="h-14 px-8 border-white/20 text-primary-foreground hover:bg-white/10 hover:text-white rounded-xl backdrop-blur-md"
                                        onClick={handleAnalyze}
                                        disabled={!transcript.trim() || isAnalyzing}
                                    >
                                        {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </Button>
                                )}
                            </div>
                        </motion.div>

                        {/* Live Graph / Mental Map Module */}
                        <AnimatePresence>
                            {showGraph && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 280 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden"
                                >
                                    <div className="absolute top-4 left-6 flex items-center gap-2 z-20">
                                        <BrainCircuit className="w-4 h-4 text-accent/70" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent/70">AMOS Network Graph</span>
                                    </div>

                                    {/* SVG Graph Visualization */}
                                    <div className="absolute inset-0 w-full h-full pt-10 px-4 pb-4">
                                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            {/* Edges */}
                                            {initialEdges.map((edge, i) => {
                                                const sourceNode = initialNodes.find(n => n.id === edge.source);
                                                const targetNode = initialNodes.find(n => n.id === edge.target);
                                                if (!sourceNode || !targetNode) return null;

                                                return (
                                                    <motion.g key={i}>
                                                        <motion.line
                                                            x1={sourceNode.x} y1={sourceNode.y}
                                                            x2={targetNode.x} y2={targetNode.y}
                                                            stroke="rgba(45, 212, 191, 0.3)" // Teal
                                                            strokeWidth="0.5"
                                                            initial={{ pathLength: 0, opacity: 0 }}
                                                            animate={{ pathLength: 1, opacity: 1 }}
                                                            transition={{ duration: 1.5, delay: i * 0.8 }}
                                                        />
                                                        <motion.text
                                                            x={(sourceNode.x + targetNode.x) / 2}
                                                            y={(sourceNode.y + targetNode.y) / 2 - 2}
                                                            fill="rgba(255,255,255,0.4)"
                                                            fontSize="3.5"
                                                            textAnchor="middle"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.5, delay: (i * 0.8) + 1.2 }}
                                                        >
                                                            {edge.label}
                                                        </motion.text>
                                                    </motion.g>
                                                )
                                            })}

                                            {/* Nodes */}
                                            {initialNodes.map((node, i) => (
                                                <motion.g
                                                    key={node.id}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: "spring", stiffness: 100, delay: i * 0.5 }}
                                                >
                                                    <circle cx={node.x} cy={node.y} r="3" fill="rgba(20, 184, 166, 0.8)" />
                                                    <circle cx={node.x} cy={node.y} r="6" fill="rgba(20, 184, 166, 0.2)" className="animate-pulse" />
                                                    <text x={node.x} y={node.y + 7} fill="white" fontSize="4.5" textAnchor="middle" fontWeight="bold">
                                                        {node.label}
                                                    </text>
                                                </motion.g>
                                            ))}
                                        </svg>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: AI Output */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col min-h-[500px]"
                    >
                        <h3 className="font-heading font-bold text-2xl mb-8 text-primary-foreground border-b border-white/10 pb-4">
                            Diagnostic Report
                            <span className="ml-3 text-xs font-normal text-muted-foreground bg-white/5 px-2 py-1 rounded">Generated in 4.5s</span>
                        </h3>

                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center flex-1 space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-teal/20 border-t-accent rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-primary-foreground font-semibold">Synthesizing Voice Vectors...</p>
                                    <p className="text-primary-foreground/40 text-sm font-mono">Applying IFS & SCARF models...</p>
                                    <p className="text-primary-foreground/40 text-sm font-mono">Mapping shadow hierarchy...</p>
                                </div>
                            </div>
                        ) : report ? (
                            <motion.div
                                className="space-y-6 flex-1 overflow-y-auto pr-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >

                                {/* Spoken Response Visualization */}
                                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 mb-8 relative">
                                    <div className="absolute -left-3 top-5 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                        <Mic className="w-3 h-3 text-navy-deep" />
                                    </div>
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                        VED Voice Response
                                    </h4>
                                    <p className="text-primary-foreground text-sm leading-relaxed italic border-l-2 border-accent/40 pl-4">
                                        "{report.spokenResponse}"
                                    </p>
                                </div>

                                {/* Structured Output */}
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest text-primary-foreground/40 mb-2">Primary Diagnosis</h4>
                                    <p className="text-base text-primary-foreground/90 font-medium leading-relaxed">
                                        {report.diagnosis}
                                    </p>
                                </div>

                                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                                    <h4 className="text-xs uppercase font-bold tracking-widest text-rose-400 mb-2">Hidden Root Cause</h4>
                                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                                        {report.rootCause}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary-foreground/40 mb-2">Cost of Friction</h4>
                                        <p className="font-mono text-xl text-amber-400">{report.impact.split(' ')[0]}</p>
                                        <p className="text-xs text-primary-foreground/50 mt-1">Per quarter</p>
                                    </div>
                                    <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary-foreground/40 mb-2">Suggested Action</h4>
                                        <p className="text-xs text-primary-foreground/80 leading-relaxed">{report.intervention.split(':')[0]}</p>
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center flex-1 text-center px-4 opacity-50">
                                <BrainCircuit className="w-16 h-16 text-primary-foreground/10 mb-6" />
                                <p className="text-primary-foreground/60 text-base max-w-sm">
                                    The psychological engine is standing by.
                                    <br />Press the microphone and inject raw organizational data.
                                </p>
                            </div>
                        )}
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
