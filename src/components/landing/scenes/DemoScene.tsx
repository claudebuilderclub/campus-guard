"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

export default function DemoScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase 1 (0–0.15): Laptop fades in ── */
  const laptopOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const laptopY = useTransform(progress, [0, 0.15], [30, 0]);

  /* ── Phase 2 (0.15–0.35): Search bar + typing ── */
  const searchOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const typedChars = useTransform(progress, [0.15, 0.35], [0, 13]);

  /* ── Phase 3 (0.35–0.55): Result card ── */
  const resultOpacity = useTransform(progress, [0.35, 0.45], [0, 1]);
  const resultY = useTransform(progress, [0.35, 0.45], [20, 0]);

  /* ── Phase 4 (0.55–0.75): Entry banner ── */
  const bannerOpacity = useTransform(progress, [0.55, 0.62], [0, 1]);
  const bannerY = useTransform(progress, [0.55, 0.62], [-20, 0]);
  const timestampOpacity = useTransform(progress, [0.62, 0.7], [0, 1]);

  /* ── Phase 5 (0.75–1.0): Completion glow + CTA text ── */
  const glowOpacity = useTransform(progress, (p) =>
    p >= 0.75 ? Math.sin((p - 0.75) * 4 * Math.PI) * 0.3 + 0.7 : 0
  );
  const ctaTextOpacity = useTransform(progress, [0.78, 0.9], [0, 1]);
  const ctaTextY = useTransform(progress, [0.78, 0.9], [20, 0]);
  const labelOpacity = useTransform(progress, [0.85, 0.95], [0, 1]);

  const REG_TEXT = "CST/2021/001";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* ── Laptop Container ── */}
      <motion.div
        className="relative"
        style={{ opacity: laptopOpacity, y: laptopY }}
      >
        {/* Perspective wrapper */}
        <div style={{ perspective: "1200px" }}>
          {/* Laptop group */}
          <div
            style={{
              transform: "rotateX(12deg) rotateY(-3deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Screen bezel */}
            <div className="relative w-[320px] md:w-[480px] bg-[#1e293b] rounded-xl p-2 md:p-2.5">
              {/* Screen inner */}
              <div className="relative bg-[#0f172a] rounded-lg w-full h-[200px] md:h-[280px] overflow-hidden p-3 md:p-4 flex flex-col gap-2">
                {/* Phase 5: green glow overlay */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    opacity: glowOpacity,
                    boxShadow: "inset 0 0 40px rgba(34,197,94,0.25)",
                  }}
                />

                {/* Phase 2: Search bar */}
                <motion.div
                  className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-1.5"
                  style={{ opacity: searchOpacity }}
                >
                  {/* Search icon */}
                  <svg
                    className="w-3.5 h-3.5 text-white/40 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <motion.span
                    className="font-mono text-xs md:text-sm text-white/90"
                  >
                    <motion.span>
                      {/* Map typedChars to visible substring */}
                      <TypingText text={REG_TEXT} chars={typedChars} />
                    </motion.span>
                    <span className="inline-block w-[2px] h-[14px] bg-white/80 align-middle ml-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
                  </motion.span>
                </motion.div>

                {/* Phase 3: Result card */}
                <motion.div
                  className="bg-white/[0.07] backdrop-blur-sm rounded-lg p-2.5 md:p-3 flex items-start gap-3"
                  style={{ opacity: resultOpacity, y: resultY }}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs md:text-sm shrink-0">
                    JD
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-white font-semibold text-xs md:text-sm">
                      John Doe
                    </span>
                    <span className="text-white/50 text-[10px] md:text-xs font-mono">
                      CST/2021/001
                    </span>
                    <span className="text-white/50 text-[10px] md:text-xs">
                      MacBook Pro — Silver
                    </span>
                    <span className="inline-flex items-center gap-1 mt-1 bg-green-500/20 text-green-400 text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Verified ✓
                    </span>
                  </div>
                </motion.div>

                {/* Phase 4: Entry banner */}
                <motion.div
                  className="bg-green-500/20 border border-green-500/30 rounded-md px-3 py-1.5 text-center"
                  style={{ opacity: bannerOpacity, y: bannerY }}
                >
                  <span className="text-green-400 font-semibold text-xs md:text-sm">
                    ✓ Entry Logged — Main Gate
                  </span>
                  <motion.div
                    className="text-white/40 text-[10px] md:text-xs mt-0.5"
                    style={{ opacity: timestampOpacity }}
                  >
                    2026-03-27 10:30 AM
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="w-[340px] md:w-[510px] h-[10px] md:h-[14px] mx-auto bg-gradient-to-b from-[#334155] to-[#1e293b] rounded-b-xl -mt-[1px]" />
          </div>
        </div>

        {/* Shadow under laptop */}
        <div className="w-[280px] md:w-[420px] h-[20px] mx-auto mt-2 bg-black/30 rounded-[50%] blur-xl" />
      </motion.div>

      {/* ── Phase 5: CTA text below laptop ── */}
      <motion.div
        className="mt-6 md:mt-8 flex flex-col items-center gap-2"
        style={{ opacity: ctaTextOpacity, y: ctaTextY }}
      >
        <span className="text-white font-semibold text-lg md:text-xl">
          Try it yourself
        </span>
        <svg
          className="w-5 h-5 text-white/60 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

      {/* Glass label */}
      <motion.div
        className="mt-3 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-white/50 text-xs md:text-sm"
        style={{ opacity: labelOpacity }}
      >
        Real verification in &lt; 2 seconds
      </motion.div>

      {/* Cursor blink keyframe (injected via style tag) */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Helper: renders typed text based on a MotionValue<number> of characters ── */
function TypingText({
  text,
  chars,
}: {
  text: string;
  chars: MotionValue<number>;
}) {
  const displayed = useTransform(chars, (c) => text.slice(0, Math.floor(c)));
  return <motion.span>{displayed}</motion.span>;
}
