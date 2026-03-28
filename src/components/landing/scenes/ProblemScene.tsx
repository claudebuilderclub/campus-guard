"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

/* ── Animated grid dots ── */
const GRID_DOTS = Array.from({ length: 48 }, (_, i) => ({
  col: i % 8,
  row: Math.floor(i / 8),
}));

export default function ProblemScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Grid fade-in (0 → 0.15) ── */
  const gridOpacity = useTransform(progress, [0, 0.15], [0, 0.4]);

  /* ── Phase 1 words (0 → 0.35) — staggered with varied entrances ── */
  const everyX = useTransform(progress, [0, 0.12], [-120, 0]);
  const everyOpacity = useTransform(progress, [0, 0.08], [0, 1]);

  const dayX = useTransform(progress, [0.05, 0.17], [120, 0]);
  const dayOpacity = useTransform(progress, [0.05, 0.12], [0, 1]);

  const thousandsY = useTransform(progress, [0.1, 0.22], [-80, 0]);
  const thousandsOpacity = useTransform(progress, [0.1, 0.17], [0, 1]);
  const thousandsBlur = useTransform(progress, [0.1, 0.22], [8, 0]);

  const ofLaptopsX = useTransform(progress, [0.15, 0.27], [-120, 0]);
  const ofLaptopsOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);

  const passThroughX = useTransform(progress, [0.2, 0.32], [120, 0]);
  const passThroughOpacity = useTransform(progress, [0.2, 0.27], [0, 1]);

  const campusGatesScale = useTransform(progress, [0.25, 0.35], [0.3, 1]);
  const campusGatesOpacity = useTransform(progress, [0.25, 0.32], [0, 1]);
  const campusGatesBlur = useTransform(progress, [0.25, 0.35], [12, 0]);

  /* ── Phase 1 → Phase 2 crossfade ── */
  const phase1Opacity = useTransform(progress, [0.35, 0.42], [1, 0]);
  const phase1Scale = useTransform(progress, [0.35, 0.42], [1, 0.95]);
  const phase2Opacity = useTransform(progress, [0.4, 0.5], [0, 1]);
  const phase2Scale = useTransform(progress, [0.4, 0.5], [1.05, 1]);

  /* ── Phase 2 words (0.4 → 0.7) — dramatic warning ── */
  const howX = useTransform(progress, [0.4, 0.58], [-150, 0]);
  const howOpacity = useTransform(progress, [0.4, 0.52], [0, 1]);

  const belongX = useTransform(progress, [0.5, 0.68], [150, 0]);
  const belongOpacity = useTransform(progress, [0.5, 0.62], [0, 1]);

  /* ── Warning icon pulse (0.55 → 0.8) ── */
  const warningScale = useTransform(progress, [0.55, 0.65, 0.7], [0, 1.2, 1]);
  const warningOpacity = useTransform(progress, [0.55, 0.62], [0, 1]);

  /* ── Edge glow: pulsing vignette ── */
  const glowOpacity = useTransform(progress, (p) =>
    Math.max(0, Math.sin(p * Math.PI) * 0.5)
  );

  /* ── Drifting grid pulse ── */
  const gridPulse = useTransform(progress, (p) =>
    0.3 + Math.sin(p * Math.PI * 3) * 0.15
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Animated dot grid background ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: gridOpacity }}
      >
        <div className="relative" style={{ width: "70%", height: "70%" }}>
          {GRID_DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(dot.col / 7) * 100}%`,
                top: `${(dot.row / 5) * 100}%`,
                width: 3,
                height: 3,
                backgroundColor: "rgba(255,255,255,0.15)",
                opacity: gridPulse,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Radial vignette glow (red/orange edges) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(239,68,68,0.3) 0%, transparent 45%), " +
            "radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.3) 0%, transparent 45%), " +
            "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.15) 0%, transparent 35%), " +
            "radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.15) 0%, transparent 35%)",
        }}
      />

      {/* ── Phase 1: "Every day, thousands of laptops pass through campus gates" ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
        style={{ opacity: phase1Opacity, scale: phase1Scale }}
      >
        {/* Line 1: "Every day," */}
        <div className="flex items-baseline gap-3">
          <motion.span
            className="text-4xl md:text-7xl font-extrabold text-white tracking-tight"
            style={{ x: everyX, opacity: everyOpacity }}
          >
            Every
          </motion.span>
          <motion.span
            className="text-4xl md:text-7xl font-extrabold text-white/80 tracking-tight"
            style={{ x: dayX, opacity: dayOpacity }}
          >
            day,
          </motion.span>
        </div>

        {/* Line 2: "thousands" — emphasized */}
        <motion.span
          className="text-5xl md:text-8xl font-black bg-clip-text text-transparent"
          style={{
            y: thousandsY,
            opacity: thousandsOpacity,
            filter: useTransform(thousandsBlur, (b) => `blur(${b}px)`),
            backgroundImage: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          }}
        >
          thousands
        </motion.span>

        {/* Line 3: "of laptops" */}
        <motion.span
          className="text-3xl md:text-5xl font-bold text-white/70 tracking-wide"
          style={{ x: ofLaptopsX, opacity: ofLaptopsOpacity }}
        >
          of laptops
        </motion.span>

        {/* Line 4: "pass through" */}
        <motion.span
          className="text-3xl md:text-5xl font-bold text-white/70 tracking-wide"
          style={{ x: passThroughX, opacity: passThroughOpacity }}
        >
          pass through
        </motion.span>

        {/* Line 5: "campus gates" — scale emphasis */}
        <motion.span
          className="text-4xl md:text-7xl font-black text-white tracking-tight"
          style={{
            scale: campusGatesScale,
            opacity: campusGatesOpacity,
            filter: useTransform(campusGatesBlur, (b) => `blur(${b}px)`),
          }}
        >
          campus gates
        </motion.span>
      </motion.div>

      {/* ── Phase 2: warning question ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
        style={{ opacity: phase2Opacity, scale: phase2Scale }}
      >
        {/* Warning triangle icon */}
        <motion.div
          style={{ scale: warningScale, opacity: warningOpacity }}
          className="mb-2"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
          >
            <path
              d="M12 2L1 21h22L12 2z"
              fill="rgba(239,68,68,0.15)"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 9v5"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="17" r="1" fill="#ef4444" />
          </svg>
        </motion.div>

        <motion.span
          className="text-3xl md:text-6xl font-extrabold tracking-tight"
          style={{
            x: howX,
            opacity: howOpacity,
            color: "#fca5a5",
          }}
        >
          But how do you know...
        </motion.span>
        <motion.span
          className="text-4xl md:text-7xl font-black tracking-tight"
          style={{
            x: belongX,
            opacity: belongOpacity,
            color: "#ef4444",
            textShadow: "0 0 60px rgba(239,68,68,0.3)",
          }}
        >
          which ones belong here?
        </motion.span>
      </motion.div>
    </div>
  );
}
