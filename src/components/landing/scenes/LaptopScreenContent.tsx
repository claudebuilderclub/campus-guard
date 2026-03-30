"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * LaptopScreenContent — Everything rendered INSIDE the laptop screen.
 *
 * Uses translateY on an inner container to simulate "scrolling within the screen."
 * All three steps, the problem stat, and connected zoom transitions live here.
 *
 * Progress mapping (from LaptopScene, normalized 0–1 within screen phase):
 * 0.00–0.12: Boot — shield + "Campus Guard" + problem stat
 * 0.12–0.22: Three step overview cards appear
 * 0.22–0.38: Step 1 highlights (Register)
 * 0.38–0.58: Step 2 highlights (Verify) — ID card + progress bar
 * 0.58–0.70: Step 2 zoom — ID card scales, cross-fades into search/registration
 * 0.70–0.85: Step 3 (Gate Log) — emerges from previous, ACCESS GRANTED
 * 0.85–1.00: Holds final state for zoom-out
 */

const STUDENT = {
  name: "Alice Chen",
  id: "CST/2021/042",
  dept: "Computer Science",
  laptop: "MacBook Pro — Silver",
};

export default function LaptopScreenContent({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ═══ BOOT PHASE ═══ */
  const bootOpacity = useTransform(progress, [0, 0.06], [0, 1]);
  const shieldScale = useTransform(progress, [0.02, 0.08], [0.5, 1]);
  const titleOpacity = useTransform(progress, [0.04, 0.10], [0, 1]);
  const statOpacity = useTransform(progress, [0.08, 0.14], [0, 1]);
  const statY = useTransform(progress, [0.08, 0.14], [10, 0]);

  /* ═══ STEP OVERVIEW CARDS ═══ */
  const overviewOpacity = useTransform(progress, [0.12, 0.18, 0.58, 0.62], [0, 1, 1, 0]);
  const overviewY = useTransform(progress, [0.12, 0.18], [20, 0]);

  // Internal scroll: shift step cards upward as progress advances
  const innerScrollY = useTransform(progress, [0.22, 0.38, 0.50], [0, -60, -130]);

  // Step highlights
  const step1Glow = useTransform(progress, [0.22, 0.28, 0.34, 0.38], [0, 1, 1, 0]);
  const step2Glow = useTransform(progress, [0.38, 0.44, 0.54, 0.58], [0, 1, 1, 0]);
  const step3Glow = useTransform(progress, [0.70, 0.76], [0, 1]);

  /* ═══ STEP 2 DETAIL: ID CARD + PROGRESS ═══ */
  const idCardOpacity = useTransform(progress, [0.42, 0.48, 0.58, 0.62], [0, 1, 1, 0]);
  const idCardScale = useTransform(progress, [0.42, 0.48], [0.8, 1]);
  const idProgress = useTransform(progress, [0.48, 0.56], [0, 1]);
  const idCheckOpacity = useTransform(progress, [0.55, 0.58], [0, 1]);

  /* ═══ STEP 2 ZOOM → SEARCH/REGISTER ═══ */
  const zoomPhaseOpacity = useTransform(progress, [0.58, 0.64, 0.68, 0.72], [0, 1, 1, 0]);
  const zoomPhaseScale = useTransform(progress, [0.58, 0.64], [0.6, 1]);
  const typedChars = useTransform(progress, [0.62, 0.68], [0, STUDENT.id.length]);
  const resultOpacity = useTransform(progress, [0.66, 0.70], [0, 1]);
  const resultY = useTransform(progress, [0.66, 0.70], [15, 0]);

  /* ═══ STEP 3: GATE LOG ═══ */
  const gateOpacity = useTransform(progress, [0.70, 0.76, 0.95, 1], [0, 1, 1, 1]);
  const gateScale = useTransform(progress, [0.70, 0.76], [0.8, 1]);
  const accessOpacity = useTransform(progress, [0.80, 0.86], [0, 1]);
  const accessScale = useTransform(progress, [0.80, 0.84, 0.87], [0.8, 1.05, 1]);
  const accessGlow = useTransform(progress, (p) =>
    p >= 0.82 ? 0.15 + Math.sin((p - 0.82) * 10 * Math.PI) * 0.1 : 0
  );

  /* ═══ Boot/overview fade for later phases ═══ */
  const bootFade = useTransform(progress, [0.56, 0.62], [1, 0]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Screen background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0c0c0c 0%, #141418 50%, #0c0c0c 100%)",
        }}
      />

      {/* Screen glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bootOpacity,
          background: "radial-gradient(ellipse at 50% 40%, rgba(218,119,86,0.12) 0%, transparent 60%)",
        }}
      />

      {/* ── BOOT: Shield + Title + Stat ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center"
        style={{ opacity: bootFade }}
      >
        {/* Shield */}
        <motion.div style={{ opacity: bootOpacity, scale: shieldScale }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#da7756"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-1.5 md:mb-2 md:w-[32px] md:h-[32px]"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-[10px] sm:text-sm md:text-lg font-bold text-white tracking-tight"
          style={{ opacity: titleOpacity }}
        >
          Campus Guard
        </motion.h2>
        <motion.p
          className="text-[7px] sm:text-[9px] md:text-xs text-white/40 mt-0.5 max-w-[80%]"
          style={{ opacity: titleOpacity }}
        >
          Real-time laptop verification for every campus gate
        </motion.p>

        {/* Problem stat */}
        <motion.div
          className="mt-2 md:mt-3 px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-[#da7756]/20 bg-[#da7756]/5"
          style={{ opacity: statOpacity, y: statY }}
        >
          <span className="text-[7px] sm:text-[9px] md:text-[11px] text-[#da7756]/80">
            Every month, <strong className="text-[#da7756]">2+ laptops</strong> go missing on campuses
          </span>
        </motion.div>

        {/* ── STEP OVERVIEW CARDS ── */}
        <motion.div
          className="mt-2 md:mt-4 w-full max-w-[90%] flex flex-col gap-1.5 md:gap-2"
          style={{ opacity: overviewOpacity, y: overviewY }}
        >
          <motion.div style={{ y: innerScrollY }}>
            {/* Step 1 */}
            <motion.div
              className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md border transition-colors"
              style={{
                borderColor: useTransform(step1Glow, (g) =>
                  g > 0 ? `rgba(218,119,86,${0.2 + g * 0.4})` : "rgba(255,255,255,0.08)"
                ),
                backgroundColor: useTransform(step1Glow, (g) =>
                  g > 0 ? `rgba(218,119,86,${g * 0.06})` : "rgba(255,255,255,0.02)"
                ),
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#da7756]/15 flex items-center justify-center shrink-0">
                <span className="text-[7px] md:text-[9px] font-bold text-[#da7756]">1</span>
              </div>
              <div>
                <span className="text-[8px] md:text-[11px] font-semibold text-white">Register Your Laptop</span>
                <span className="block text-[6px] md:text-[9px] text-white/35">One-time sign up with student ID</span>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md border mt-1.5 md:mt-2 transition-colors"
              style={{
                borderColor: useTransform(step2Glow, (g) =>
                  g > 0 ? `rgba(218,119,86,${0.2 + g * 0.4})` : "rgba(255,255,255,0.08)"
                ),
                backgroundColor: useTransform(step2Glow, (g) =>
                  g > 0 ? `rgba(218,119,86,${g * 0.06})` : "rgba(255,255,255,0.02)"
                ),
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#da7756]/15 flex items-center justify-center shrink-0">
                <span className="text-[7px] md:text-[9px] font-bold text-[#da7756]">2</span>
              </div>
              <div>
                <span className="text-[8px] md:text-[11px] font-semibold text-white">Verify Identity</span>
                <span className="block text-[6px] md:text-[9px] text-white/35">Scan student ID at the gate</span>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md border mt-1.5 md:mt-2 transition-colors"
              style={{
                borderColor: useTransform(step3Glow, (g) =>
                  g > 0 ? `rgba(16,185,129,${0.2 + g * 0.4})` : "rgba(255,255,255,0.08)"
                ),
                backgroundColor: useTransform(step3Glow, (g) =>
                  g > 0 ? `rgba(16,185,129,${g * 0.06})` : "rgba(255,255,255,0.02)"
                ),
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                <span className="text-[7px] md:text-[9px] font-bold text-emerald-400">3</span>
              </div>
              <div>
                <span className="text-[8px] md:text-[11px] font-semibold text-white">Gate Access</span>
                <span className="block text-[6px] md:text-[9px] text-white/35">Walk through — verified in seconds</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── ID CARD (step 2 detail) ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ opacity: idCardOpacity, scale: idCardScale }}
      >
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-[#da7756]/50 font-medium mb-2">
          Verifying Identity
        </span>
        <div className="w-full max-w-[200px] md:max-w-[260px] rounded-lg border border-[#da7756]/20 bg-[#da7756]/[0.04] p-3 md:p-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#da7756] flex items-center justify-center text-white font-bold text-[9px] md:text-xs shrink-0">
              AC
            </div>
            <div>
              <div className="text-[9px] md:text-xs text-white font-semibold">{STUDENT.name}</div>
              <div className="text-[7px] md:text-[10px] text-white/40 font-mono">{STUDENT.id}</div>
            </div>
          </div>
          <div className="text-[7px] md:text-[9px] text-white/35 mb-2">{STUDENT.dept} &middot; {STUDENT.laptop}</div>
          {/* Progress bar */}
          <div className="h-1 md:h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#da7756] to-[#C15F3C]"
              style={{ width: useTransform(idProgress, (p) => `${p * 100}%`) }}
            />
          </div>
          {/* Verified check */}
          <motion.div
            className="mt-2 flex items-center justify-center"
            style={{ opacity: idCheckOpacity }}
          >
            <div className="flex items-center gap-1 text-emerald-400">
              <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
              </svg>
              <span className="text-[8px] md:text-[10px] font-semibold">Verified</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── SEARCH/REGISTER (zoomed from step 2) ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ opacity: zoomPhaseOpacity, scale: zoomPhaseScale }}
      >
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-[#da7756]/50 font-medium mb-2">
          Search & Register
        </span>
        {/* Search bar */}
        <div className="w-full max-w-[220px] md:max-w-[280px] flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-md px-2.5 py-1.5 mb-2">
          <svg className="w-3 h-3 text-white/25 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="font-mono text-[9px] md:text-xs text-white/70">
            <TypingText text={STUDENT.id} chars={typedChars} />
            <span className="inline-block w-[1.5px] h-[10px] bg-[#da7756]/70 align-middle ml-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
          </span>
        </div>
        {/* Result card */}
        <motion.div
          className="w-full max-w-[220px] md:max-w-[280px] bg-white/[0.04] border border-white/10 rounded-lg p-2.5 flex items-start gap-2.5"
          style={{ opacity: resultOpacity, y: resultY }}
        >
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#da7756] flex items-center justify-center text-white font-bold text-[8px] md:text-[10px] shrink-0">
            AC
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[9px] md:text-xs text-white font-semibold">{STUDENT.name}</span>
            <span className="text-[7px] md:text-[9px] text-white/35 font-mono">{STUDENT.id}</span>
            <span className="text-[7px] md:text-[9px] text-white/35">{STUDENT.dept}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── GATE LOG & ACCESS (step 3) ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{ opacity: gateOpacity, scale: gateScale }}
      >
        {/* Access glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: accessGlow,
            background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15) 0%, transparent 60%)",
          }}
        />

        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-emerald-400/50 font-medium mb-2 relative z-10">
          Gate Log
        </span>
        {/* Entry card */}
        <div className="w-full max-w-[220px] md:max-w-[280px] bg-emerald-500/[0.06] border border-emerald-500/20 rounded-lg p-2.5 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <svg viewBox="0 0 16 16" className="w-3 h-3 text-emerald-400 fill-current">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            <span className="text-[8px] md:text-[10px] text-emerald-400 font-semibold">Entry Logged — Main Gate</span>
          </div>
          <div className="text-[7px] md:text-[9px] text-white/50">{STUDENT.name} &middot; {STUDENT.id}</div>
          <div className="text-[6px] md:text-[8px] text-white/25 mt-0.5">2026-03-28 &middot; 10:30 AM</div>
        </div>

        {/* Access Granted */}
        <motion.div
          className="mt-3 text-center relative z-10"
          style={{ opacity: accessOpacity, scale: accessScale }}
        >
          <h2 className="text-sm sm:text-lg md:text-2xl font-black text-emerald-400">
            Access Granted
          </h2>
          <p className="text-[7px] md:text-[9px] text-white/35 mt-0.5">
            Verified in under 2 seconds
          </p>
        </motion.div>
      </motion.div>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TypingText({ text, chars }: { text: string; chars: MotionValue<number> }) {
  const displayed = useTransform(chars, (c) => text.slice(0, Math.floor(c)));
  return <motion.span>{displayed}</motion.span>;
}
