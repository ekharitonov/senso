import { motion } from "framer-motion";
import face1 from "@/assets/faces/face-1.jpg";
import face2 from "@/assets/faces/face-2.jpg";
import face3 from "@/assets/faces/face-3.jpg";
import face4 from "@/assets/faces/face-4.jpg";
import face5 from "@/assets/faces/face-5.jpg";

export default function EngageMessenger() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1a1a2e] text-[13px] select-none" style={{ fontFamily: "'Lato','Segoe UI',sans-serif" }}>
      {/* macOS chrome */}
      <div className="flex items-center gap-2 px-3.5 py-2 bg-[#19102e]">
        <div className="flex gap-1.5">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,0.06)] rounded-md px-3 py-1">
            <svg className="w-3 h-3 text-[rgba(255,255,255,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[11px] text-[rgba(255,255,255,0.3)]">Corporate messenger</span>
          </div>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex" style={{ height: 560 }}>
        {/* Sidebar */}
        <div className="w-[160px] bg-[#1e1040] border-r border-[rgba(255,255,255,0.06)] flex-col hidden sm:flex">
          <div className="px-3 py-2.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#818CF8] to-[#6366F1] flex items-center justify-center text-white text-[10px] font-extrabold">S</div>
            <div className="text-[11px] font-bold text-white/90 flex items-center gap-1">Chats <span className="text-[rgba(255,255,255,0.3)] text-[9px]">▾</span></div>
          </div>
          <div className="px-2 py-2 space-y-0.5 text-[11px]">
            <div className="text-[9px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-wider px-2 py-1">Channels</div>
            <div className="px-2 py-1 text-[rgba(255,255,255,0.35)] flex items-center gap-1.5"><span className="text-[rgba(255,255,255,0.2)]">#</span> general</div>
            <div className="px-2 py-1 text-white/90 bg-[rgba(129,140,248,0.15)] rounded font-medium flex items-center gap-1.5"><span className="text-[rgba(129,140,248,0.6)]">#</span> project-alpha</div>
            <div className="mt-2 text-[9px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-wider px-2 py-1">Direct Messages</div>
            <div className="px-2 py-1 text-[rgba(255,255,255,0.35)] flex items-center gap-1.5"><img src={face2} className="w-3.5 h-3.5 rounded-full object-cover" alt="" /> Sarah M.</div>
          </div>
        </div>

        {/* Main chat + SENSO panel */}
        <div className="flex-1 flex flex-col relative">
          {/* Channel header */}
          <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <span className="text-[12px] font-bold text-white/90">#project-alpha</span>
            <div className="flex items-center gap-2.5 text-[rgba(255,255,255,0.2)]">
              <span className="text-[12px]">📞</span>
              <span className="text-[12px]">@</span>
              <span className="text-[12px]">⋮</span>
            </div>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: messages */}
            <div className="flex-1 px-4 py-3 space-y-3.5 overflow-y-auto">
              {/* AMOS bot message first */}
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-black">A</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-[#F59E0B]">AMOS</span>
                    <span className="text-[9px] text-[rgba(245,158,11,0.4)]">APP</span>
                    <span className="text-[9px] text-[rgba(255,255,255,0.18)]">9:02 AM</span>
                  </div>
                  <div className="bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] rounded-lg px-3 py-2 inline-block max-w-[95%]">
                    <span className="text-[11px] text-[rgba(255,255,255,0.75)] leading-snug">
                      Hey team 👋 How's everyone feeling about the project-alpha timeline? Any blockers I can help clear? Would love to hear where things stand so we can support each other.
                    </span>
                  </div>
                </div>
              </div>

              {/* Lisa T. responds */}
              <div className="flex gap-2 items-start">
                <img src={face4} className="w-7 h-7 rounded object-cover shrink-0 mt-0.5" alt="" />
                <div>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-white/70">Lisa T.</span>
                    <span className="text-[9px] text-[rgba(255,255,255,0.18)]">9:08 AM</span>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.04)] rounded-lg px-3 py-2 inline-block max-w-[95%]">
                    <span className="text-[11px] text-[rgba(255,255,255,0.75)] leading-snug">
                      Heads up — the marketing campaign launch is delayed. The designer didn't finish the mockups on time. We need to push back the timeline by at least a week.
                    </span>
                  </div>
                </div>
              </div>

              {/* Blurred messages */}
              {[
                { img: face2, name: "Sarah M.", time: "9:15 AM", widths: [190, 130] },
                { img: face1, name: "David L.", time: "9:22 AM", widths: [210, 170, 80] },
              ].map((msg, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <img src={msg.img} className="w-7 h-7 rounded object-cover shrink-0 mt-0.5" alt="" />
                  <div>
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                      <span className="text-[11px] font-bold text-white/70">{msg.name}</span>
                      <span className="text-[9px] text-[rgba(255,255,255,0.18)]">{msg.time}</span>
                    </div>
                    <div className="space-y-1">
                      {msg.widths.map((w, j) => (
                        <div key={j} className="h-2 rounded-sm bg-[rgba(255,255,255,0.06)]" style={{ width: w }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* ── TOXIC MESSAGE ── */}
              <div className="flex gap-2 items-start">
                <img src={face5} className="w-7 h-7 rounded object-cover shrink-0 mt-0.5" alt="" />
                <div>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-white/70">Alex P.</span>
                    <span className="text-[9px] text-[rgba(255,255,255,0.18)]">10:03 AM</span>
                  </div>
                  <div className="relative">
                    <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg px-3 py-2 inline-block">
                      <span className="text-[11px] text-[rgba(255,255,255,0.8)] leading-snug">
                        Marketing dropped the ball again, as usual. Nothing new.
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] flex items-center justify-center text-[10px]">
                      😠
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: SENSO Insight Panel (appears beside the chat) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 100 }}
              className="w-[260px] border-l border-[rgba(245,158,11,0.2)] bg-[rgba(20,18,40,0.95)] p-4 hidden md:flex flex-col gap-3 overflow-auto"
              style={{ boxShadow: "-10px 0 40px rgba(245,158,11,0.04)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[9px] font-black text-black">A</div>
                <span className="text-[11px] font-extrabold text-white">AMOS Insight</span>
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] text-[rgba(255,255,255,0.35)]">Private to</span>
                <span className="text-[10px] font-bold text-white/80 bg-[rgba(255,255,255,0.08)] rounded px-1.5 py-0.5">Alex P.</span>
              </div>

              <div className="text-[12px] font-bold text-white/90 leading-snug">
                Communication Pattern
              </div>

              <p className="text-[10px] text-[rgba(255,255,255,0.55)] leading-relaxed">
                <span className="text-[#F59E0B] font-bold">⚠ Pattern detected:</span>{" "}
                Toxic generalization. This contradicts the team value "Collaboration" and lowers your Foundation Score on "Reliability."
              </p>

              <p className="text-[10px] text-[rgba(255,255,255,0.55)] leading-relaxed">
                <span className="text-white font-bold">Coach suggestion:</span>{" "}
                Focus on facts and solutions instead of blame.
              </p>

              <div className="rounded-lg px-3 py-2.5 mt-auto" style={{ background: "rgba(78,205,196,0.06)", border: "1px solid rgba(78,205,196,0.2)" }}>
                <p className="text-[10px] font-semibold leading-relaxed" style={{ color: "rgba(78,205,196,0.85)" }}>
                  Replace with: "The marketing team's deadlines shifted. Let's discuss causes and build a new sync plan."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Input bar — Alex P. typing corrected message */}
          <div className="px-3 pb-2.5 pt-1">
            <div className="rounded-lg border border-[rgba(78,205,196,0.3)] bg-[rgba(78,205,196,0.04)] px-3 py-2.5 flex items-center gap-2" style={{ boxShadow: "0 0 12px rgba(78,205,196,0.06)" }}>
              <span className="text-[rgba(255,255,255,0.2)] text-[14px]">+</span>
              <span className="flex-1 text-[11px] text-[rgba(255,255,255,0.75)]">
                Sorry about that. The marketing team's deadlines shifted — let's discuss causes and build a new sync plan together.
              </span>
              <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.25)] text-[12px]">
                📎 😊 <span className="text-[11px] font-bold">Aa</span>
                <span className="ml-1 text-[14px]">➤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
