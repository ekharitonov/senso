import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";

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
    emergedIntro:
      "Three hidden friction patterns that six months of leadership meetings had missed:",
    delivered:
      "50-page organizational health report with traceable evidence from source conversations, a dysfunction map with severity scores, and a prioritized intervention roadmap.",
    stats: [
      { icon: Clock, label: "Timeline", value: "48 hours" },
      { icon: DollarSign, label: "Cost", value: "$15,000" },
      { icon: FileText, label: "Report", value: "50 pages" },
    ],
    comparison: "$15K vs. $200K+ and 3–6 months for traditional consulting (McKinsey/BCG)",
    gradient: "from-teal/20 via-teal-bright/5 to-transparent",
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
    gradient: "from-teal-bright/15 via-teal/5 to-transparent",
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
      "The survey said culture was fine because people had learned to give the \"right\" answers. SENSO's continuous sensing detected a growing gap between stated values (\"we're collaborative\") and actual behavior (decisions being made in back-channels, credit being claimed asymmetrically, meeting-after-the-meeting patterns). The dashboard showed exactly where cultural misalignment was widest and which teams were drifting fastest.",
    delivered:
      "Real-time culture dashboard showing alignment scores by team, behavioral trend lines, and early warning signals for emerging dysfunction.",
    stats: null,
    comparison: null,
    gradient: "from-teal/15 via-teal-bright/8 to-transparent",
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
    gradient: "from-teal-bright/12 via-teal/6 to-transparent",
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
      "People confess things to an AI mediator that they would never tell a human consultant or HR. The AI has no political allegiance, no career incentive, no relationship with either party's boss. This structural neutrality produces deeper candor than any human third party can achieve. In our pilot, executives described it as \"like having a therapist who actually understands corporate politics.\"",
    delivered:
      "Conflict resolution without HR escalation, without external consultant fees, and without either party feeling they \"lost.\" The mediation preserved both relationships and the working dynamic. Resolution timeline: days, not months.",
    stats: null,
    comparison: null,
    gradient: "from-teal/18 via-teal-bright/8 to-transparent",
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
    gradient: "from-teal-bright/15 via-teal/5 to-transparent",
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
      "An executive onboarding intelligence package that compresses the \"figuring out the landscape\" phase from months to days. The new leader arrives understanding not just the formal structure, but the actual dynamics — who the real influencers are, which alliances matter, what topics are sensitive, and where the previous person in the role failed.",
    stats: null,
    comparison: null,
    gradient: "from-teal/15 via-teal-bright/10 to-transparent",
  },
];

function UseCaseCard({ uc, index }: { uc: (typeof useCases)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = uc.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.7, type: "spring", stiffness: 60 }}
      className="group relative"
    >
      <div className="relative bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-card-hover">
        {/* Gradient accent top bar */}
        <div className="h-1 bg-gradient-teal" />

        <div className="p-8 md:p-10">
          {/* Tag + Number */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal/15 to-teal/5 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Use Case {uc.id}
              </span>
              <span className="text-xs text-muted-foreground ml-2">•</span>
              <span className="text-xs text-muted-foreground ml-2">{uc.tag}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-xl md:text-2xl text-card-foreground mb-6 leading-tight">
            {uc.title}
          </h3>

          {/* Executive Pain */}
          <div className="relative bg-muted/50 rounded-2xl p-6 mb-6 border border-border/50">
            <Quote className="w-5 h-5 text-accent/40 absolute top-4 left-4" />
            <p className="text-card-foreground font-medium italic pl-6 leading-relaxed">
              "{uc.pain}"
            </p>
            <span className="block text-xs text-muted-foreground mt-3 pl-6 uppercase tracking-wider">
              — Executive Pain Point
            </span>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors mb-2 cursor-pointer"
          >
            {expanded ? "Collapse details" : "See what SENSO did"}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-6">
                  {/* What SENSO Did */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
                      What SENSO Did
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{uc.whatDid}</p>
                  </div>

                  {/* What Emerged */}
                  {uc.emergedIntro && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
                        {uc.emerged ? "What Emerged" : "Why It Works"}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {uc.emergedIntro}
                      </p>
                      {uc.emerged && (
                        <ul className="space-y-2">
                          {uc.emerged.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-1 shrink-0" />
                              <span className="text-muted-foreground text-sm leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Delivered */}
                  <div className="bg-muted/30 rounded-xl p-5 border border-accent/10">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
                      Delivered
                    </h4>
                    <p className="text-card-foreground leading-relaxed font-medium">
                      {uc.delivered}
                    </p>
                  </div>

                  {/* Stats row */}
                  {uc.stats && (
                    <div className="grid grid-cols-3 gap-4">
                      {uc.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="text-center bg-muted/40 rounded-xl p-4 border border-border/50"
                        >
                          <stat.icon className="w-4 h-4 text-accent mx-auto mb-2" />
                          <div className="text-lg font-bold text-card-foreground">
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison */}
                  {uc.comparison && (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-accent/30 pl-4">
                      {uc.comparison}
                    </p>
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

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[72px]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-24 md:py-36">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-bright/3 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(178_42%_48%/0.06),transparent_60%)]" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
                7 Production Use Cases
              </motion.span>

              <h1 className="text-display-sm md:text-display text-primary-foreground mb-6 leading-tight">
                Real scenarios from{" "}
                <span className="text-gradient-brand">20 C-level executives</span> and 8,500+
                autonomous interactions
              </h1>

              <p className="text-body-lg text-primary-foreground/60 max-w-3xl mx-auto leading-relaxed">
                These aren't hypothetical use cases. Each scenario emerged from production
                pilots with executives who had real organizational pain — and got real results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-16 md:py-28 relative">
          <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-teal/3 rounded-full blur-[100px]" />
          <div className="absolute bottom-40 left-0 w-[250px] h-[250px] bg-teal-bright/2 rounded-full blur-[80px]" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {useCases.map((uc, i) => (
                <UseCaseCard key={uc.id} uc={uc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(178_42%_48%/0.08),transparent_60%)]" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-headline md:text-display-sm text-primary-foreground mb-6 leading-tight">
                Every organization has invisible dysfunction.
                <br />
                <span className="text-gradient-brand">
                  The question is whether you discover it on your terms — or it discovers you.
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group">
                    Request Your Strategic Health Check — $15K, 48 Hours
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="hero-ghost" size="lg">
                    Schedule a Call to Discuss Your Scenario
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
