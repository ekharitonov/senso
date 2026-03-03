import Navbar from "@/components/Navbar";
import founderPhoto from "@/assets/founder-eugene.png";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Linkedin, Github, Award, GraduationCap, Briefcase, Shield, ExternalLink, Heart, Sparkles, Users, MessageCircle, ArrowRight, Building2, BookOpen, BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Brand logo components for visual richness
const GELogo = () => (
  <svg viewBox="0 0 80 80" className="w-10 h-10">
    <circle cx="40" cy="40" r="36" stroke="#3B82F6" strokeWidth="3" fill="none" opacity="0.7" />
    <text x="40" y="50" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="serif" fill="#60A5FA">GE</text>
  </svg>
);
const ThreeMlogo = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <span className="text-xl font-black text-red-400" style={{ fontFamily: 'Arial Black, sans-serif' }}>3M</span>
  </div>
);
const WalmartLogo = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 40 40" className="w-7 h-7">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={angle} x1="20" y1="20" x2={20 + 14 * Math.cos((angle * Math.PI) / 180)} y2={20 + 14 * Math.sin((angle * Math.PI) / 180)} stroke="#FDB913" strokeWidth="3.5" strokeLinecap="round" />
      ))}
    </svg>
  </div>
);
const StanfordLogo = () => (
  <div className="w-10 h-10 rounded-full bg-[#8C1515]/20 border border-[#8C1515]/30 flex items-center justify-center">
    <span className="text-sm font-bold text-[#E08080]" style={{ fontFamily: 'serif' }}>S</span>
  </div>
);
const INSEADLogo = () => (
  <div className="w-10 h-10 rounded-full bg-[#006B3F]/20 border border-[#006B3F]/30 flex items-center justify-center">
    <span className="text-[9px] font-bold text-emerald-400 tracking-tight">INSEAD</span>
  </div>
);
const AWSLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/20 flex items-center justify-center">
    <span className="text-[10px] font-black text-[#FF9900]">AWS</span>
  </div>
);
const IBMLogo = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <svg viewBox="0 0 40 20" className="w-8">
      {[0, 4, 8, 12, 16].map((y) => (
        <rect key={y} x="2" y={y} width="36" height="2.5" fill="#4A90D9" rx="0.5" />
      ))}
      <text x="20" y="14.5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a2e" fontFamily="monospace">IBM</text>
    </svg>
  </div>
);
const MITLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-[#A31F34]/15 border border-[#A31F34]/25 flex items-center justify-center">
    <span className="text-[11px] font-black text-[#E06070] tracking-tight">MIT</span>
  </div>
);
const DukeLogo = () => (
  <div className="w-10 h-10 rounded-full bg-[#003087]/20 border border-[#003087]/30 flex items-center justify-center">
    <span className="text-[10px] font-bold text-blue-400">Duke</span>
  </div>
);
const IEEELogo = () => (
  <div className="w-10 h-10 rounded-lg bg-[#006699]/15 border border-[#006699]/25 flex items-center justify-center">
    <span className="text-[9px] font-bold text-cyan-400 tracking-tight">IEEE</span>
  </div>
);
const WHLogo = () => (
  <div className="w-10 h-10 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground/50" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const credentialRows = [
  {
    label: "Enterprise",
    subtitle: "15+ years scaling products",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/15",
    items: [
      { logo: GELogo, name: "General Electric" },
      { logo: ThreeMlogo, name: "3M" },
      { logo: WalmartLogo, name: "Walmart" },
    ],
  },
  {
    label: "Education",
    subtitle: "5 graduate programs",
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/15",
    items: [
      { logo: StanfordLogo, name: "Stanford d.school" },
      { logo: INSEADLogo, name: "INSEAD" },
      { name: "M.S. CS" },
      { name: "M.Eng." },
      { name: "MBA" },
    ],
  },
  {
    label: "Certifications",
    subtitle: "5 professional certifications",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/15",
    items: [
      { logo: AWSLogo, name: "AWS Architecture" },
      { logo: IBMLogo, name: "IBM AI" },
      { logo: DukeLogo, name: "Duke MLOps" },
      { logo: MITLogo, name: "MIT Fintech" },
      { logo: StanfordLogo, name: "Stanford AI Health" },
    ],
  },
  {
    label: "Recognition",
    subtitle: "Industry leadership",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/15",
    items: [
      { logo: IEEELogo, name: "IEEE Senior Member" },
      { logo: WHLogo, name: "White House AI Judge" },
      { name: "NSF I-Corps" },
      { name: "HBR Speaker" },
      { name: "Board Member" },
    ],
  },
];

const stats = [
  { value: "2", label: "AI Agents", suffix: "" },
  { value: "20", label: "C-Level Executives", suffix: "+" },
  { value: "8,500", label: "Autonomous Interactions", suffix: "+" },
  { value: "0", label: "Churn Rate", suffix: "%" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="pt-[72px]">
        {/* Hero */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)' }} />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
                About SENSO
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight">
                Built by an Engineer Who<br />
                <span className="text-gradient-brand">Lived the Problem</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-primary" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Founder Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Animated border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent/40 via-accent/10 to-accent/30" />

                <div className="relative bg-primary rounded-2xl p-8 md:p-12">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
                    {/* Avatar */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative shrink-0"
                    >
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-accent/20">
                        <img src={founderPhoto} alt="Eugene Kharitonov — Founder & CEO of SENSO" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Shield className="w-4 h-4 text-accent-foreground" />
                      </div>
                    </motion.div>

                    {/* Name & Title */}
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
                        Eugene Kharitonov
                      </h2>
                      <p className="text-accent text-lg font-semibold mb-4">
                        Founder & Technical Architect
                      </p>
                      <p className="text-primary-foreground/60 text-base leading-relaxed max-w-2xl">
                        15+ years scaling enterprise products at GE, 3M, and Walmart. Built SENSO's entire production system solo — from architecture to deployment to 20 executive pilots.
                      </p>


                      {/* Social links */}
                      <div className="flex items-center gap-3 mt-5">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/70 border border-primary-foreground/10 hover:border-accent/40 hover:text-accent transition-all duration-200 bg-primary-foreground/5">
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/70 border border-primary-foreground/10 hover:border-accent/40 hover:text-accent transition-all duration-200 bg-primary-foreground/5">
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a href="https://ieee-collabratec.ieee.org" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/70 border border-primary-foreground/10 hover:border-accent/40 hover:text-accent transition-all duration-200 bg-primary-foreground/5">
                          <ExternalLink className="w-4 h-4" /> IEEE Collaboratec
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Credentials Visual Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {credentialRows.map((section, i) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * i }}
                        className="relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-br ${section.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                        
                        <div className="relative bg-primary rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm font-bold text-primary-foreground/90">{section.label}</p>
                              <p className="text-[11px] text-primary-foreground/40">{section.subtitle}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            {section.items.map((item) => (
                              <div key={item.name} className="flex flex-col items-center gap-1.5 group/item">
                                {item.logo ? (
                                  <item.logo />
                                ) : (
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} ${section.borderColor} border flex items-center justify-center`}>
                                    <span className="text-[9px] font-bold text-primary-foreground/50 text-center leading-tight">{item.name}</span>
                                  </div>
                                )}
                                <span className="text-[10px] text-primary-foreground/40 font-medium text-center max-w-[72px] leading-tight group-hover/item:text-primary-foreground/60 transition-colors">
                                  {item.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/20 p-6 md:p-8"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent/60 mb-5 text-center">
                      Built the Entire Production System Solo
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-1">
                            {stat.value}{stat.suffix}
                          </div>
                          <div className="text-xs text-primary-foreground/50 font-medium uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
              >
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-accent/30 text-accent bg-accent/5 mb-6">
                  The Origin Story
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground leading-tight">
                  Why SENSO <span className="text-gradient-brand">Exists</span>
                </h2>
              </motion.div>

              {/* Story Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

                {/* Block 1: The Question */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-16 md:pl-20 mb-12"
                >
                  <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="p-6 md:p-8 rounded-xl bg-primary-foreground/[0.03] border border-primary-foreground/[0.06]">
                    <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed italic mb-4">
                      "SENSO didn't start as a startup. It started as a question."
                    </p>
                    <p className="text-primary-foreground/60 leading-relaxed">
                      In 2025, Eugene Kharitonov created a private community for executives and entrepreneurs — <span className="text-accent font-semibold">Homo Amans Space</span>. "Homo Amans" is Latin for "the loving human." Not Homo Economicus (the rational human), not Homo Faber (the making human) — but a human for whom relationships, trust, and authenticity are the foundation, not a side effect.
                    </p>
                  </div>
                </motion.div>

                {/* Block 2: The Space */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative pl-16 md:pl-20 mb-12"
                >
                  <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="p-6 md:p-8 rounded-xl bg-primary-foreground/[0.03] border border-primary-foreground/[0.06]">
                    <p className="text-primary-foreground/60 leading-relaxed">
                      The idea was simple: create a space where successful people can be real. Not networking for business cards. Not a mastermind for self-promotion. A space where a CEO can say <span className="text-primary-foreground/90 font-medium">"I don't know what to do"</span> — and that's okay. Where a conflict between co-founders can be discussed without fear of leaks. Where <span className="text-primary-foreground/90 font-medium">"what truly concerns you?"</span> matters more than <span className="text-primary-foreground/90 font-medium">"what do you do?"</span>
                    </p>
                  </div>
                </motion.div>

                {/* Block 3: The Bot */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative pl-16 md:pl-20 mb-12"
                >
                  <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="p-6 md:p-8 rounded-xl bg-primary-foreground/[0.03] border border-primary-foreground/[0.06]">
                    <p className="text-primary-foreground/60 leading-relaxed mb-4">
                      To support the community, a Telegram bot was built on a <span className="text-accent font-semibold">multi-agent architecture</span>: a Matcher Agent found pairs "with similar questions," a Context Generator explained "why you should talk," a Nudge Orchestrator gently encouraged reciprocity, and a Feedback Analyst extracted patterns from responses.
                    </p>
                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/15">
                      <p className="text-sm text-primary-foreground/70 leading-relaxed">
                        <span className="text-accent font-semibold">The key principle:</span> the bot is not an obedient assistant. It's an independent mediator. It can refuse a request, remind about reciprocity, ask an uncomfortable question neutrally. This autonomy within rules is what makes it trustworthy — people told the AI things they would never say to HR or a colleague.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Block 4: The Discovery */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative pl-16 md:pl-20 mb-12"
                >
                  <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="p-6 md:p-8 rounded-xl bg-primary-foreground/[0.03] border border-primary-foreground/[0.06]">
                    <p className="text-lg text-primary-foreground/90 font-medium mb-3">Then came the discovery.</p>
                    <p className="text-primary-foreground/60 leading-relaxed mb-4">
                      Executives using the bot started saying: <span className="text-primary-foreground/90 italic">"I need this for my company. Not a networking bot, but a system that sees what I can't see in my organization."</span> They described the same problems: projects stalling for invisible reasons, good people leaving while engagement surveys showed everything was fine, conflicts between leaders that everyone saw but nobody named aloud.
                    </p>
                  </div>
                </motion.div>

                {/* Block 5: The Birth */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative pl-16 md:pl-20 mb-12"
                >
                  <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                  <div className="p-6 md:p-8 rounded-xl bg-accent/5 border border-accent/20">
                    <p className="text-primary-foreground/70 leading-relaxed mb-4">
                      And so from the philosophy of Homo Amans, <span className="text-accent font-bold">SENSO was born</span> — a system that transfers the same principles from a private community into the corporate environment. The five steps of SENSO (<span className="text-primary-foreground/90 font-medium">Sense, Engage, Navigate, Solve, Organize</span>) are a formalization of what naturally happened in Homo Amans Space: sensing real problems, engaging through trust, navigating through politics, solving through data, and organizing sustainable change.
                    </p>
                    <p className="text-primary-foreground/70 leading-relaxed mb-4">
                      The <span className="text-accent font-semibold">"Trojan Horse" philosophy</span> from Homo Amans became SENSO's architectural principle: a person comes for utilitarian value (diagnostics, a report) — and receives transformation, because the environment is designed so that honesty becomes safe.
                    </p>
                  </div>
                </motion.div>

                {/* Final Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="ml-16 md:ml-20 mt-8"
                >
                  <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 text-center">
                    <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed italic font-medium">
                      "SENSO is not an AI tool that solves a business problem. It's a continuation of the belief that organizations — like people — become better when it's safe to be real."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
