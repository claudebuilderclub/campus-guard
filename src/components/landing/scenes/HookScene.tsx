"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/*
  HOOK SCENE — "The Problem"
  ───────────────────────────
  A dark, urgent opening that establishes the stakes:
  - A single alarming statistic fades in
  - Then the emotional question appears
  - Creates tension that the next scene (laptop reveal) resolves
*/

export default function HookScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Stat line: "Every 53 seconds..." ── */
  const statOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const statY = useTransform(progress, [0, 0.15], [40, 0]);

  /* ── Number highlight glow ── */
  const numberScale = useTransform(progress, [0.05, 0.2, 0.25], [0.8, 1.05, 1]);

  /* ── Second line: "a laptop disappears from a campus" ── */
  const line2Opacity = useTransform(progress, [0.15, 0.35], [0, 1]);
  const line2Y = useTransform(progress, [0.15, 0.35], [30, 0]);

  /* ── Question: "Is yours protected?" ── */
  const questionOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);
  const questionScale = useTransform(progress, [0.4, 0.6], [0.9, 1]);

  /* ── Red pulse vignette ── */
  const vignetteOpacity = useTransform(progress, (p) =>
    Math.sin(p * Math.PI) * 0.35
  );

  /* ── Subtle grid dots ── */
  const gridOpacity = useTransform(progress, [0, 0.2], [0, 0.25]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background vignette (red edges = danger) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(220,38,38,0.15) 100%)",
        }}
      />

      {/* ── Subtle dot grid ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: gridOpacity }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl gap-6">
        {/* Line 1: The statistic */}
        <motion.div
          className="flex flex-col items-center gap-2"
          style={{ opacity: statOpacity, y: statY }}
        >
          <span className="text-sm md:text-base uppercase tracking-[0.25em] text-red-400/60 font-medium">
            Campus Security Crisis
          </span>
          <div className="flex items-baseline gap-2 md:gap-3">
            <span className="text-lg md:text-2xl text-white/60 font-light">
              Every
            </span>
            <motion.span
              className="text-5xl md:text-8xl font-black text-red-400"
              style={{
                scale: numberScale,
                textShadow: "0 0 60px rgba(239,68,68,0.3)",
              }}
            >
              53
            </motion.span>
            <span className="text-lg md:text-2xl text-white/60 font-light">
              seconds
            </span>
          </div>
        </motion.div>

        {/* Line 2: What happens */}
        <motion.p
          className="text-2xl md:text-4xl font-bold text-white/80 leading-tight"
          style={{ opacity: line2Opacity, y: line2Y }}
        >
          a laptop disappears
          <br />
          <span className="text-white/50">from a college campus.</span>
        </motion.p>

        {/* Line 3: The question */}
        <motion.p
          className="text-xl md:text-3xl font-semibold text-white/90 mt-4"
          style={{ opacity: questionOpacity, scale: questionScale }}
        >
          Is yours{" "}
          <span className="text-red-400 underline decoration-red-400/40 underline-offset-4">
            protected
          </span>
          ?
        </motion.p>
      </div>
    </div>
  );
}
