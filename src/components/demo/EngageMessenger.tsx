import { motion } from "framer-motion";
import face1 from "@/assets/faces/face-1.jpg";
import face2 from "@/assets/faces/face-2.jpg";
import face3 from "@/assets/faces/face-3.jpg";
import face4 from "@/assets/faces/face-4.jpg";
import face5 from "@/assets/faces/face-5.jpg";

interface ChatMessage {
  avatar: string;
  name: string;
  lines: number[];
}

const chatMessages: ChatMessage[] = [
  { avatar: face1, name: "Sarah M.", lines: [180, 120] },
  { avatar: face2, name: "David L.", lines: [200, 160, 90] },
  { avatar: face3, name: "James K.", lines: [140, 100] },
  { avatar: face4, name: "Lisa T.", lines: [190, 130, 80] },
];

export default function EngageMessenger() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1a1a2e] text-[13px] select-none font-sans" style={{ fontFamily: "'Lato', 'Segoe UI', sans-serif" }}>
      {/* ── macOS Window Chrome ── */}
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

      <div className="flex" style={{ height: 360 }}>
        {/* ── Sidebar ── */}
        <div className="w-[170px] bg-[#1e1040] border-r border-[rgba(255,255,255,0.06)] flex-col hidden sm:flex">
          {/* Workspace header */}
          <div className="px-3 py-2.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#818CF8] to-[#6366F1] flex items-center justify-center text-white text-[11px] font-extrabold">S</div>
            <div>
              <div className="text-[12px] font-bold text-white/90 flex items-center gap-1">Chats <span className="text-[rgba(255,255,255,0.3)] text-[10px]">▾</span></div>
            </div>
          </div>

          <div className="px-2 py-2 space-y-0.5 text-[12px]">
            <div className="text-[10px] font-bold text-[rgba(255,255,255,0.35)] uppercase tracking-wider px-2 py-1">Channels</div>
            <div className="px-2 py-1 text-[rgba(255,255,255,0.4)] rounded hover:bg-[rgba(255,255,255,0.04)] cursor-default flex items-center gap-1.5">
              <span className="text-[rgba(255,255,255,0.25)]">#</span> general
            </div>
            <div className="px-2 py-1 text-white/90 bg-[rgba(129,140,248,0.15)] rounded font-medium flex items-center gap-1.5">
              <span className="text-[rgba(129,140,248,0.6)]">#</span> project-alpha
            </div>
            <div className="mt-2 text-[10px] font-bold text-[rgba(255,255,255,0.35)] uppercase tracking-wider px-2 py-1">Direct Messages</div>
            <div className="px-2 py-1 text-[rgba(255,255,255,0.4)] rounded flex items-center gap-1.5">
              <img src={face1} className="w-4 h-4 rounded-full object-cover" alt="" /> Sarah M.
            </div>
          </div>
        </div>

        {/* ── Main Chat Area ── */}
        <div className="flex-1 flex flex-col bg-[#1a1a2e] relative">
          {/* Channel header */}
          <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <span className="text-[13px] font-bold text-white/90">#project-alpha</span>
            <div className="flex items-center gap-3 text-[rgba(255,255,255,0.25)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="text-[13px]">@</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-3 space-y-4 overflow-hidden">
            {chatMessages.map((msg, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <img src={msg.avatar} className="w-8 h-8 rounded object-cover shrink-0 mt-0.5" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[12px] font-bold text-white/80">{msg.name}</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.2)]">{9 + i}:{15 + i * 7} AM</span>
                  </div>
                  <div className="space-y-1">
                    {msg.lines.map((w, j) => (
                      <div key={j} className="h-2.5 rounded bg-[rgba(255,255,255,0.06)]" style={{ width: Math.min(w, 250) }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* ── Toxic message (red highlight) ── */}
            <div className="flex gap-2.5 items-start">
              <img src={face5} className="w-8 h-8 rounded object-cover shrink-0 mt-0.5" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-[12px] font-bold text-white/80">Alex P.</span>
                  <span className="text-[10px] text-[rgba(255,255,255,0.2)]">10:03 AM</span>
                </div>
                <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg px-3 py-2 inline-block">
                  <span className="text-[12px] text-[rgba(255,255,255,0.8)] leading-snug">
                    Marketing dropped the ball again, as usual. Nothing new.
                  </span>
                  <span className="ml-1.5 inline-block w-4 h-4 rounded-full bg-[rgba(239,68,68,0.2)] text-[10px] text-[#EF4444] text-center leading-4">⚠</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── SENSO AI Insight Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring", stiffness: 120 }}
            className="mx-3 mb-2 relative z-10"
          >
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "linear-gradient(135deg, rgba(28,28,58,0.95), rgba(20,20,45,0.98))",
                borderColor: "rgba(245,158,11,0.35)",
                boxShadow: "0 0 40px rgba(245,158,11,0.06), 0 0 80px rgba(245,158,11,0.03)",
              }}
            >
              <div className="text-[13px] font-extrabold text-white mb-2 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[9px] font-black text-black">S</div>
                SENSO Insight: Communication Pattern
              </div>

              <p className="text-[11px] text-[rgba(255,255,255,0.6)] leading-relaxed mb-2">
                <span className="text-[#F59E0B] font-bold">⚠ Pattern detected:</span>{" "}
                Toxic generalization. This contradicts the team value "Collaboration" and lowers the Foundation Score on the "Reliability" metric.
              </p>

              <p className="text-[11px] text-[rgba(255,255,255,0.6)] leading-relaxed mb-3">
                <span className="text-white font-bold">Coach suggestion:</span>{" "}
                Focus on facts and solutions.
              </p>

              <div
                className="rounded-lg px-3 py-2.5"
                style={{
                  background: "rgba(78,205,196,0.06)",
                  border: "1px solid rgba(78,205,196,0.25)",
                }}
              >
                <p className="text-[11px] font-semibold leading-relaxed" style={{ color: "rgba(78,205,196,0.9)" }}>
                  Replace with: "The marketing team's deadlines shifted. Let's discuss causes and build a new sync plan."
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Input bar ── */}
          <div className="px-3 pb-3">
            <div className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[rgba(255,255,255,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span className="flex-1 text-[12px] text-[rgba(255,255,255,0.25)]">Message #project-alpha</span>
              <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.2)]">
                <span className="text-[14px]">📎</span>
                <span className="text-[14px]">😊</span>
                <span className="text-[12px] font-bold">Aa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
