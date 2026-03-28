"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/*
  FEATURE TOUR SCENE
  ──────────────────
  The viewport IS the laptop screen at this point (zoomed in from previous scene).
  Features are revealed one at a time inside a "dashboard" layout.

  Phase 1 (0 → 0.30):  Registration flow — search bar + student card
  Phase 2 (0.30 → 0.60): Verification — scan animation + verified badge
  Phase 3 (0.60 → 1.0):  Gate log — entry logged + access granted
*/

const STUDENT = {
  name: "Alice Chen",
  id: "CST/2021/042",
  dept: "Computer Science",
  laptop: "MacBook Pro — Silver",
};

export default function FeatureTourScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Persistent dashboard chrome ── */
  const chromeOpacity = useTransform(progress, [0, 0.06], [0, 1]);

  /* ═══════ Phase 1: Registration (0 → 0.30) ═══════ */
  const phase1Opacity = useTransform(progress, [0, 0.04, 0.27, 0.33], [0, 1, 1, 0]);

  // Heading
  const reg_headOpacity = useTransform(progress, [0, 0.06], [0, 1]);
  const reg_headY = useTransform(progress, [0, 0.06], [20, 0]);

  // Search bar typing
  const searchOpacity = useTransform(progress, [0.04, 0.1], [0, 1]);
  const typedChars = useTransform(progress, [0.06, 0.18], [0, STUDENT.id.length]);

  // Student card result
  const cardOpacity = useTransform(progress, [0.16, 0.22], [0, 1]);
  const cardY = useTransform(progress, [0.16, 0.22], [20, 0]);

  /* ═══════ Phase 2: Verification (0.30 → 0.60) ═══════ */
  const phase2Opacity = useTransform(progress, [0.3, 0.35, 0.57, 0.63], [0, 1, 1, 0]);

  const verifyHeadOpacity = useTransform(progress, [0.3, 0.36], [0, 1]);
  const scanProgress = useTransform(progress, [0.36, 0.48], [0, 1]);
  const scanLineX = useTransform(progress, [0.36, 0.48], ["-100%", "100%"]);
  const scanLineOpacity = useTransform(progress, [0.36, 0.38, 0.46, 0.48], [0, 1, 1, 0]);

  // Verified badge
  const verifiedScale = useTransform(progress, [0.48, 0.52, 0.55], [0, 1.2, 1]);
  const verifiedOpacity = useTransform(progress, [0.48, 0.51], [0, 1]);

  /* ═══════ Phase 3: Gate Log (0.60 → 1.0) ═══════ */
  const phase3Opacity = useTransform(progress, [0.6, 0.66, 0.95, 1], [0, 1, 1, 1]);

  const gateHeadOpacity = useTransform(progress, [0.6, 0.66], [0, 1]);
  const entryBannerOpacity = useTransform(progress, [0.66, 0.72], [0, 1]);
  const entryBannerY = useTransform(progress, [0.66, 0.72], [-15, 0]);
  const timestampOpacity = useTransform(progress, [0.72, 0.78], [0, 1]);

  // Access granted glow
  const accessGlowOpacity = useTransform(progress, (p) =>
    p >= 0.78 ? 0.15 + Math.sin((p - 0.78) * 8 * Math.PI) * 0.1 : 0
  );
  const accessTextOpacity = useTransform(progress, [0.8, 0.88], [0, 1]);
  const accessTextScale = useTransform(progress, [0.8, 0.86, 0.9], [0.8, 1.05, 1]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* ── Screen glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.12) 0%, transparent 60%)",
        }}
      />

      {/* ── Dashboard chrome (persistent) ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20"
        style={{ opacity: chromeOpacity }}
      >
        <div className="flex items-center gap-2 px-5 md:px-8 pt-4 md:pt-6 pb-3 border-b border-white/[0.06]">
          {/* Window dots */}
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          </div>
          {/* Shield + title */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-xs md:text-sm font-bold text-white/70 tracking-wide">
            Campus Guard
          </span>
          {/* URL bar */}
          <div className="ml-auto hidden md:flex items-center gap-2 bg-white/[0.05] rounded-md px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-green-400/50" />
            <span className="text-[10px] text-white/30 font-mono">campusguard.app/dashboard</span>
          </div>
        </div>
      </motion.div>

      {/* ── Content area ── */}
      <div className="absolute inset-0 pt-14 md:pt-16 px-5 md:px-8 flex items-center justify-center">

        {/* ═══════ PHASE 1: Registration ═══════ */}
        <motion.div
          className="absolute inset-0 pt-14 md:pt-16 px-5 md:px-8 flex flex-col items-center justify-center"
          style={{ opacity: phase1Opacity }}
        >
          <div className="w-full max-w-md">
            {/* Section heading */}
            <motion.div
              className="mb-5"
              style={{ opacity: reg_headOpacity, y: reg_headY }}
            >
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-blue-400/50 font-medium">
                Step 1
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-white mt-1">
                Search & Register
              </h3>
            </motion.div>

            {/* Search bar */}
            <motion.div
              className="flex items-center gap-2.5 bg-white/[0.07] border border-white/10 rounded-lg px-4 py-2.5 mb-4"
              style={{ opacity: searchOpacity }}
            >
              <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="font-mono text-sm text-white/80">
                <TypingText text={STUDENT.id} chars={typedChars} />
                <span className="inline-block w-[2px] h-[14px] bg-blue-400/80 align-middle ml-[1px] animate-[cursor-blink_1s_step-end_infinite]" />
              </span>
            </motion.div>

            {/* Student result card */}
            <motion.div
              className="bg-white/[0.05] border border-white/10 rounded-xl p-4 flex items-start gap-4"
              style={{ opacity: cardOpacity, y: cardY }}
            >
              <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                AC
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-white font-semibold text-sm">{STUDENT.name}</span>
                <span className="text-white/40 text-xs font-mono">{STUDENT.id}</span>
                <span className="text-white/40 text-xs">{STUDENT.dept}</span>
                <span className="text-white/40 text-xs">{STUDENT.laptop}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════ PHASE 2: Verification ═══════ */}
        <motion.div
          className="absolute inset-0 pt-14 md:pt-16 px-5 md:px-8 flex flex-col items-center justify-center"
          style={{ opacity: phase2Opacity }}
        >
          <div className="w-full max-w-md">
            <motion.div className="mb-5" style={{ opacity: verifyHeadOpacity }}>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-purple-400/50 font-medium">
                Step 2
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-white mt-1">
                Verify Identity
              </h3>
            </motion.div>

            {/* Verification card with scan */}
            <div className="relative bg-white/[0.05] border border-white/10 rounded-xl p-5 overflow-hidden">
              {/* Scan line */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ opacity: scanLineOpacity }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 w-[2px]"
                  style={{
                    x: scanLineX,
                    background: "linear-gradient(180deg, transparent, #7c3aed, transparent)",
                    boxShadow: "0 0 15px rgba(124,58,237,0.6)",
                  }}
                />
              </motion.div>

              {/* Student info being scanned */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-300 font-bold text-sm">AC</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{STUDENT.name}</div>
                  <div className="text-white/40 text-xs mt-0.5 font-mono">{STUDENT.id}</div>
                  <div className="text-white/40 text-xs">{STUDENT.laptop}</div>

                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: useTransform(scanProgress, (p) => `${p * 100}%`) }}
                    />
                  </div>
                </div>
              </div>

              {/* Verified badge */}
              <motion.div
                className="mt-4 flex items-center justify-center"
                style={{ scale: verifiedScale, opacity: verifiedOpacity }}
              >
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-full px-4 py-2">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 text-green-400 fill-current">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                  </svg>
                  <span className="text-green-400 font-semibold text-sm">Identity Verified</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ═══════ PHASE 3: Gate Log ═══════ */}
        <motion.div
          className="absolute inset-0 pt-14 md:pt-16 px-5 md:px-8 flex flex-col items-center justify-center"
          style={{ opacity: phase3Opacity }}
        >
          {/* Access granted green glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: accessGlowOpacity,
              background: "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.2) 0%, transparent 60%)",
            }}
          />

          <div className="w-full max-w-md relative z-10">
            <motion.div className="mb-5" style={{ opacity: gateHeadOpacity }}>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-emerald-400/50 font-medium">
                Step 3
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-white mt-1">
                Gate Log & Access
              </h3>
            </motion.div>

            {/* Entry banner */}
            <motion.div
              className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 text-center"
              style={{ opacity: entryBannerOpacity, y: entryBannerY }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-green-400 fill-current">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                </svg>
                <span className="text-green-400 font-semibold text-sm">
                  Entry Logged — Main Gate
                </span>
              </div>
              <div className="text-white/60 text-xs">{STUDENT.name} &middot; {STUDENT.id}</div>
              <motion.div
                className="text-white/30 text-[11px] mt-1"
                style={{ opacity: timestampOpacity }}
              >
                2026-03-28 &middot; 10:30 AM
              </motion.div>
            </motion.div>

            {/* Access Granted */}
            <motion.div
              className="mt-6 text-center"
              style={{ opacity: accessTextOpacity, scale: accessTextScale }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-emerald-400">
                Access Granted
              </h2>
              <p className="text-white/40 mt-2 text-sm">
                Verified in under 2 seconds. Walk through.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

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

/* ── Typing text helper ── */
function TypingText({ text, chars }: { text: string; chars: MotionValue<number> }) {
  const displayed = useTransform(chars, (c) => text.slice(0, Math.floor(c)));
  return <motion.span>{displayed}</motion.span>;
}
