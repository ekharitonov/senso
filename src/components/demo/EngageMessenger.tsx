import { motion } from "framer-motion";

const messages = [
  { type: "other", name: "Sarah M.", lines: 3 },
  { type: "other", name: "David L.", lines: 2 },
  { type: "other", name: "James K.", lines: 4 },
  { type: "other", name: "Lisa T.", lines: 2 },
];

export default function EngageMessenger() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#1a1a2e] border border-[rgba(255,255,255,0.06)] text-sm select-none">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12122a] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-[10px] text-[rgba(255,255,255,0.3)] font-medium">Corporate Messenger</div>
        <div className="w-12" />
      </div>

      <div className="flex h-[320px]">
        {/* Sidebar */}
        <div className="w-[140px] border-r border-[rgba(255,255,255,0.06)] bg-[#14142b] p-3 hidden sm:block">
          <div className="text-[10px] font-bold text-[rgba(255,255,255,0.5)] mb-2">Chats</div>
          <div className="space-y-1">
            <div className="text-[10px] text-[rgba(255,255,255,0.3)] px-2 py-1"># general</div>
            <div className="text-[10px] text-white/80 bg-[rgba(129,140,248,0.15)] px-2 py-1 rounded font-medium"># project-alpha</div>
            <div className="text-[10px] text-[rgba(255,255,255,0.3)] px-2 py-1">Sarah M.</div>
          </div>
        </div>

        {/* Main chat */}
        <div className="flex-1 flex flex-col">
          {/* Channel header */}
          <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)]">
            <span className="text-xs font-bold text-white/80">#project-alpha</span>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden relative">
            {/* Blurred messages */}
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.5)] mb-0.5">{msg.name}</div>
                  <div className="space-y-0.5">
                    {Array.from({ length: msg.lines }).map((_, j) => (
                      <div
                        key={j}
                        className="h-2 rounded-sm bg-[rgba(255,255,255,0.06)]"
                        style={{ width: `${60 + Math.random() * 80}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Toxic message (highlighted red) */}
            <div className="flex gap-2 items-start">
              <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)] shrink-0 mt-0.5" />
              <div className="bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.25)] rounded-lg px-3 py-2 max-w-[85%]">
                <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.5)] mb-1">Alex P.</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.75)] leading-snug">
                  "Marketing dropped the ball again, as usual. Nothing new."
                </div>
              </div>
            </div>
          </div>

          {/* SENSO AI Insight overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-14 right-3 left-[180px] sm:left-[180px] z-10"
            style={{ position: "relative", margin: "-60px 12px 8px" }}
          >
            <div className="bg-[#1c1c3a] border border-[rgba(245,158,11,0.4)] rounded-xl p-4 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
              <div className="text-xs font-extrabold text-white mb-2">
                SENSO Insight: Communication Pattern
              </div>
              <div className="text-[11px] text-[rgba(255,255,255,0.65)] leading-relaxed mb-2.5">
                <span className="text-[#F59E0B] font-bold">⚠ Pattern detected:</span> Toxic generalization. This contradicts the team value "Collaboration" and lowers the Foundation Score on the "Reliability" metric.
              </div>
              <div className="text-[11px] text-[rgba(255,255,255,0.65)] leading-relaxed mb-2.5">
                <span className="text-white font-bold">Coach suggestion:</span> Focus on facts and solutions.
              </div>
              <div className="bg-[rgba(78,205,196,0.08)] border border-[rgba(78,205,196,0.2)] rounded-lg px-3 py-2.5">
                <div className="text-[11px] text-[rgba(78,205,196,0.9)] leading-relaxed font-medium">
                  Replace with: "The marketing team's deadlines shifted. Let's discuss causes and build a new sync plan."
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
