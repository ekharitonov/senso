import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Eye,
  Palette,
  Users,
  Scale,
  Rocket,
  UserCheck,
  ArrowRight,
  Quote,
  ChevronDown,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Zap,
  Shield,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

/* ──────────────────── Floating Particles Background ──────────────────── */
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(178, 42%, 48%, ${p.o})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(178, 42%, 48%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ──────────────────── Animated Counter ──────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const numericMatch = value.match(/[\d,]+/);
  const prefix = numericMatch ? value.slice(0, value.indexOf(numericMatch[0])) : "";
  const numeric = numericMatch ? parseInt(numericMatch[0].replace(/,/g, "")) : 0;
  const rest = numericMatch ? value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length) : "";
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numericMatch) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numeric));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numeric, hasAnimated, numericMatch]);

  if (!numericMatch) return <span>{value}</span>;

  return (
    <div ref={ref}>
      {prefix}{count.toLocaleString()}{rest}{suffix}
    </div>
  );
}

/* ──────────────────── Progress Line (timeline connector) ──────────────────── */
function TimelineConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-8 md:left-12 top-0 bottom-0 w-px hidden md:block">
      <div className="absolute inset-0 bg-border/30" />
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/60 to-transparent origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

/* ──────────────────── Data ──────────────────── */
const heroStats = [
  { icon: Zap, value: "8,500+", label: "Autonomous Interactions" },
  { icon: Shield, value: "0", label: "Security Incidents" },
  { icon: BarChart3, value: "20", label: "C-Level Executives" },
  { icon: TrendingUp, value: "0%", label: "Client Churn" },
];

const useCases = [
  {
    id: 1,
    icon: Stethoscope,
    tag: "Strategic Diagnostics",
    title: "Strategic Diagnostics — The 48-Hour Organizational MRI",
    pain: "I sense something is wrong in my organization, but I can't pinpoint what it is. We've had two failed product launches and unexplained attrition, but every team says they're fine.",
    whatDid:
      "The Diagnostic Agent conducted confidential 1-on-1 structured interviews with 12 stakeholders across three levels of the organization over 48 hours. Using clinical interview methodology, it asked questions no internal HR person could ask without political consequences. The Cultural Sensing Agent simultaneously tracked language patterns and sentiment shifts across these conversations.",
    emerged: [
      "A trust breakdown between VP Engineering and VP Product over undefined ownership of technical roadmap decisions",
      "A shadow decision-making process where middle managers routed around their skip-level because of perceived favoritism",
      "A cultural split between the founding team and post-Series B hires around risk tolerance",
    ],
    emergedIntro: "Three hidden friction patterns that six months of leadership meetings had missed:",
    delivered:
      "50-page organizational health report with traceable evidence from source conversations, a dysfunction map with severity scores, and a prioritized intervention roadmap.",
    stats: [
      { icon: Clock, label: "Timeline", value: "48 hours" },
      { icon: DollarSign, label: "Cost", value: "$15,000" },
      { icon: FileText, label: "Report", value: "50 pages" },
    ],
    comparison: "$15K vs. $200K+ and 3–6 months for traditional consulting (McKinsey/BCG)",
  },
  {
    id: 2,
    icon: Eye,
    tag: "Soft Problem Discovery",
    title: "Soft Problem Discovery — Naming What Nobody Will Name",
    pain: "Projects stall, good people leave, but nobody can tell me why. Every offsite produces the same action items that never get executed.",
    whatDid:
      "The Diagnostic Agent ran structured inquiry sessions designed to surface root causes without blame or politics. Unlike employee surveys that get sanitized responses, SENSO agents build trust through persistent, confidential dialogue. People told the AI things they would never say to HR or a human consultant — because the AI has no political agenda, no career to protect, no relationships to manage.",
    emerged: null,
    emergedIntro:
      "A hidden dysfunction map revealing that the real issue wasn't strategy or execution — it was three interpersonal conflicts between senior leaders that had been festering for 18 months. These conflicts created invisible decision bottlenecks that cascaded through the entire organization: delayed product decisions, passive-aggressive resource allocation, and meeting cultures where nothing real got discussed.",
    delivered:
      "Hidden dysfunction map with actionable recommendations. Each finding linked to specific anonymized conversation evidence so leadership could see the pattern without exposing individual sources.",
    stats: null,
    comparison: null,
  },
  {
    id: 3,
    icon: Palette,
    tag: "Culture Alignment",
    title: "Culture Alignment — Real-Time Culture Dashboard, Not Another Survey",
    pain: "Our culture resists change. We did an engagement survey six months ago and scored well, but something still feels off. By the time survey results come in, the problems have already mutated.",
    whatDid:
      "The Cultural Sensing Agent tracked behavioral signals across ongoing conversations: language patterns, sentiment trajectories, how people talked about decisions, what topics they avoided, where energy dropped. This isn't a point-in-time snapshot like a Gallup survey — it's continuous monitoring.",
    emerged: null,
    emergedIntro:
      'The survey said culture was fine because people had learned to give the "right" answers. SENSO\'s continuous sensing detected a growing gap between stated values ("we\'re collaborative") and actual behavior (decisions being made in back-channels, credit being claimed asymmetrically, meeting-after-the-meeting patterns). The dashboard showed exactly where cultural misalignment was widest and which teams were drifting fastest.',
    delivered:
      "Real-time culture dashboard showing alignment scores by team, behavioral trend lines, and early warning signals for emerging dysfunction.",
    stats: null,
    comparison: null,
  },
  {
    id: 4,
    icon: Users,
    tag: "Facilitation & Coordination",
    title: "Facilitation & Coordination — Breaking the Cross-Functional Stall",
    pain: "Cross-team projects stall constantly. Everyone agrees in the meeting, then nothing happens. We've tried project management tools, stand-ups, OKRs — nothing sticks.",
    whatDid:
      "The Facilitation Agent embedded itself in the cross-functional workflow: setting agendas tied to actual decision points (not status updates), tracking action items with explicit ownership, and enforcing accountability through structured follow-ups. When commitments slipped, the agent surfaced it — not as blame, but as a pattern to address.",
    emerged: null,
    emergedIntro:
      "The root cause wasn't project management — it was political. Two department leads had an unresolved disagreement about priorities that they expressed through passive non-cooperation: agreeing in public, under-resourcing in private. The Facilitation Agent detected this pattern within two weeks through commitment-vs-action tracking.",
    delivered:
      "30–50% reduction in coordination overhead. More importantly: the real blocker was surfaced and escalated to a human decision-maker who could resolve it, rather than letting it silently drain organizational energy for another quarter.",
    stats: null,
    comparison: null,
  },
  {
    id: 5,
    icon: Scale,
    tag: "The Ideal Third Party",
    title: "The Ideal Third Party — Conflict Resolution Without HR Escalation",
    pain: "Interpersonal tensions between two senior leaders are derailing execution. HR involvement would make it political. An external mediator would be expensive and slow. Both parties are valuable — we can't afford to lose either.",
    whatDid:
      "The Facilitation Agent acted as a trusted, neutral third-party mediator. It conducted separate structured conversations with each party, identified the actual points of disagreement (vs. the emotional overlay), reframed positions into interests, and found common ground that both parties could accept.",
    emerged: null,
    emergedIntro:
      'People confess things to an AI mediator that they would never tell a human consultant or HR. The AI has no political allegiance, no career incentive, no relationship with either party\'s boss. This structural neutrality produces deeper candor than any human third party can achieve. In our pilot, executives described it as "like having a therapist who actually understands corporate politics."',
    delivered:
      'Conflict resolution without HR escalation, without external consultant fees, and without either party feeling they "lost." The mediation preserved both relationships and the working dynamic. Resolution timeline: days, not months.',
    stats: null,
    comparison: null,
  },
  {
    id: 6,
    icon: Rocket,
    tag: "Product & Service Accelerator",
    title: "Product & Service Accelerator — From Discovery to Spec in Days, Not Quarters",
    pain: "Product development takes too long. By the time we ship, the market has moved. Our discovery process is a series of meetings where everyone has opinions but nobody has data.",
    whatDid:
      "The Diagnostic Agent ran compressed research sprints — structured stakeholder interviews, user need synthesis, and competitive landscape analysis. The Synthesis Agent built the roadmap from real data rather than meeting-room consensus. Instead of three months of discovery meetings that produce a deck nobody reads, SENSO compressed discovery-to-spec by 3–5x.",
    emerged: null,
    emergedIntro: null,
    delivered:
      "Compressed discovery-to-spec cycle. Data-grounded product roadmap with prioritized features based on actual stakeholder input rather than the loudest voice in the room. Complete evidence trail showing why each decision was made and which stakeholder input drove it.",
    stats: null,
    comparison: null,
  },
  {
    id: 7,
    icon: UserCheck,
    tag: "Organizational Onboarding Intelligence",
    title: "Organizational Onboarding Intelligence — New Leaders Hit the Ground Running",
    pain: "We hired a new VP and it took them six months to figure out who really makes decisions, which relationships matter, and where the landmines are. Our last two executive hires failed because they stepped on the wrong toes before they understood the landscape.",
    whatDid:
      "The Diagnostic Agent created a confidential organizational landscape briefing for the incoming executive: real power dynamics (not the org chart), cultural norms (stated vs. actual), decision-making patterns, key relationships and tensions, and unwritten rules that nobody puts in the onboarding deck. This is the institutional knowledge that usually takes 6–12 months to acquire through painful trial and error.",
    emerged: null,
    emergedIntro: null,
    delivered:
      'An executive onboarding intelligence package that compresses the "figuring out the landscape" phase from months to days. The new leader arrives understanding not just the formal structure, but the actual dynamics — who the real influencers are, which alliances matter, what topics are sensitive, and where the previous person in the role failed.',
    stats: null,
    comparison: null,
  },
];

/* ──────────────────── Card Component ──────────────────── */
function UseCaseCard({ uc, index }: { uc: (typeof useCases)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = uc.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.8,
        type: "spring",
        stiffness: 50,
        damping: 20,
      }}
      className="group relative md:pl-20"
    >
      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-[26px] md:left-[38px] top-12 w-6 h-6 rounded-full border-2 border-accent/40 bg-primary items-center justify-center z-10">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-accent"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </div>

      {/* Card Number Badge — floating */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.2 }}
        className="hidden md:flex absolute left-[18px] md:left-[28px] top-0 w-10 h-10 rounded-xl bg-gradient-teal items-center justify-center z-10 shadow-lg glow-teal-subtle"
      >
        <span className="text-sm font-bold text-accent-foreground">{String(uc.id).padStart(2, "0")}</span>
      </motion.div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative rounded-3xl border border-border/60 overflow-hidden transition-all duration-500 hover:border-accent/30 bg-primary"
        style={{
          background: `
            radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(178 42% 48% / 0.04), transparent 40%),
            linear-gradient(135deg, hsl(222 55% 8%) 0%, hsl(220 50% 12%) 100%)
          `,
        }}
      >
        {/* Spotlight follow effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, hsl(178 42% 48% / 0.06), transparent 60%)`,
          }}
        />

        {/* Top accent bar with animated gradient */}
        <div className="h-[2px] relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-teal opacity-30" />
        </div>

        <div className="p-8 md:p-10 lg:p-12">
          {/* Header row */}
          <div className="flex items-start gap-5 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative shrink-0"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/10">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              {/* Glow behind icon */}
              <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-xl -z-10" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.15em]">
                  Use Case {uc.id}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {uc.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[1.65rem] text-primary-foreground leading-tight">
                {uc.title}
              </h3>
            </div>

            {/* Mobile number badge */}
            <div className="md:hidden shrink-0 w-10 h-10 rounded-xl bg-gradient-teal flex items-center justify-center glow-teal-subtle">
              <span className="text-sm font-bold text-accent-foreground">{String(uc.id).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Executive Pain — glassmorphism card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative rounded-2xl p-6 md:p-7 mb-8 border border-accent/10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(178 42% 48% / 0.06) 0%, hsl(220 50% 14% / 0.4) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Quote className="w-8 h-8 text-accent/15 absolute -top-1 -left-1" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px]" />

            <p className="text-primary-foreground/90 font-medium italic pl-5 leading-relaxed text-[15px] relative z-10">
              "{uc.pain}"
            </p>
            <div className="flex items-center gap-2 mt-4 pl-5">
              <div className="w-8 h-px bg-accent/30" />
              <span className="text-[10px] text-accent/60 font-semibold uppercase tracking-[0.2em]">
                Executive Pain Point
              </span>
            </div>
          </motion.div>

          {/* Expand toggle — premium styled */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="group/btn flex items-center gap-3 text-sm font-semibold text-accent hover:text-accent/90 transition-all duration-300 cursor-pointer mb-1"
          >
            <span className="relative">
              {expanded ? "Collapse details" : "See what SENSO did →"}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover/btn:w-full transition-all duration-300" />
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
              className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 group-hover/btn:bg-accent/20 transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-7">
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                  {/* What SENSO Did */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-6 rounded-full bg-gradient-teal" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        What SENSO Did
                      </h4>
                    </div>
                    <p className="text-primary-foreground/70 leading-relaxed pl-4 border-l border-border/30">
                      {uc.whatDid}
                    </p>
                  </motion.div>

                  {/* What Emerged */}
                  {uc.emergedIntro && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-6 rounded-full bg-gradient-teal" />
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                          {uc.emerged ? "What Emerged" : "Why It Works"}
                        </h4>
                      </div>
                      <p className="text-primary-foreground/70 leading-relaxed mb-4 pl-4 border-l border-border/30">
                        {uc.emergedIntro}
                      </p>
                      {uc.emerged && (
                        <ul className="space-y-3 pl-4">
                          {uc.emerged.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + i * 0.1 }}
                              className="flex gap-3 items-start"
                            >
                              <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                                <CheckCircle2 className="w-3 h-3 text-accent" />
                              </div>
                              <span className="text-primary-foreground/60 text-sm leading-relaxed">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}

                  {/* Delivered — premium card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative rounded-2xl p-6 border border-accent/15 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, hsl(178 42% 48% / 0.08) 0%, hsl(175 55% 55% / 0.03) 100%)",
                    }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-[80px]" />
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div className="w-1.5 h-6 rounded-full bg-gradient-teal" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        Delivered
                      </h4>
                    </div>
                    <p className="text-primary-foreground leading-relaxed font-medium relative z-10">
                      {uc.delivered}
                    </p>
                  </motion.div>

                  {/* Stats row */}
                  {uc.stats && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="grid grid-cols-3 gap-3"
                    >
                      {uc.stats.map((stat, si) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + si * 0.1 }}
                          className="text-center rounded-xl p-4 border border-accent/10 relative overflow-hidden group/stat"
                          style={{
                            background: "linear-gradient(135deg, hsl(178 42% 48% / 0.05), transparent)",
                          }}
                        >
                          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                          <stat.icon className="w-4 h-4 text-accent mx-auto mb-2 relative z-10" />
                          <div className="text-xl font-bold text-primary-foreground relative z-10 font-heading">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider relative z-10">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Comparison */}
                  {uc.comparison && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl bg-accent/5 border border-accent/10"
                    >
                      <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                      <p className="text-sm text-primary-foreground/60 italic">
                        {uc.comparison}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────── Page ──────────────────── */
export default function UseCasesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="pt-[72px]">
        {/* ──────── HERO ──────── */}
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-hero py-28 md:py-40 lg:py-48">
          <FloatingParticles />

          {/* Multi-layer depth gradients */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/4 rounded-full blur-[200px] -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-bright/3 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[180px]" />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(178 42% 48% / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(178 42% 48% / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-accent/20 mb-10"
                style={{ background: "linear-gradient(135deg, hsl(178 42% 48% / 0.1), hsl(178 42% 48% / 0.03))" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.15em]">
                  7 Production Use Cases — Real Results
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 40 }}
                className="text-display-sm md:text-display lg:text-display-lg text-primary-foreground mb-8 leading-tight"
              >
                Real scenarios from{" "}
                <span className="relative inline-block">
                  <span className="text-gradient-brand">20 C-level executives</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-teal rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
                <br className="hidden md:block" />
                {" "}and 8,500+ autonomous interactions
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="text-body-lg text-primary-foreground/50 max-w-3xl mx-auto leading-relaxed mb-14"
              >
                These aren't hypothetical use cases. Each scenario emerged from production
                pilots with executives who had real organizational pain — and got real results.
              </motion.p>

              {/* Hero stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 100 }}
                    className="relative rounded-2xl p-5 border border-accent/10 text-center group/stat overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, hsl(178 42% 48% / 0.06), hsl(220 50% 14% / 0.3))",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                    <stat.icon className="w-5 h-5 text-accent mx-auto mb-2 relative z-10" />
                    <div className="text-2xl md:text-3xl font-bold text-primary-foreground font-heading relative z-10">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[10px] text-primary-foreground/40 uppercase tracking-[0.15em] font-semibold relative z-10">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
        </section>

        {/* ──────── USE CASES ──────── */}
        <section className="py-16 md:py-28 relative">
          {/* Background depth */}
          <div className="absolute top-60 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[150px]" />
          <div className="absolute top-[50%] left-0 w-[350px] h-[350px] bg-teal-bright/2 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 right-1/4 w-[300px] h-[300px] bg-accent/2 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto relative">
              <TimelineConnector />

              <div className="space-y-10 md:space-y-14">
                {useCases.map((uc, i) => (
                  <UseCaseCard key={uc.id} uc={uc} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────── BOTTOM CTA ──────── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Dramatic gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(178_42%_48%/0.1),transparent_70%)]" />

          {/* Animated orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-teal-bright/4 rounded-full blur-[100px]"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-[2px] bg-gradient-teal mx-auto mb-10 rounded-full"
              />

              <h2 className="text-headline md:text-display-sm lg:text-display text-primary-foreground mb-4 leading-tight">
                Every organization has invisible dysfunction.
              </h2>
              <p className="text-xl md:text-2xl text-gradient-brand font-heading font-bold leading-snug max-w-3xl mx-auto mb-12">
                The question is whether you discover it on your terms — or it discovers you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group text-sm md:text-base">
                    Request Your Strategic Health Check — $15K, 48 Hours
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="hero-ghost" size="lg" className="text-sm md:text-base">
                    Schedule a Call to Discuss Your Scenario
                  </Button>
                </Link>
              </div>

              {/* Trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xs text-primary-foreground/30 mt-8 uppercase tracking-[0.2em] font-medium"
              >
                Trusted by 20 C-level executives · 0% churn · SOC 2 in roadmap
              </motion.p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
