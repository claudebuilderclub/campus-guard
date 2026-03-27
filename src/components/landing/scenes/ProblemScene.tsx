"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

/* ── tiny laptop SVG outline ── */
function LaptopIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
      <path d="M7 16v4M17 16v4" />
    </svg>
  );
}

/* ── Drifting laptop silhouettes ── */
const laptopPositions = [
  { left: "8%", top: "15%" },
  { left: "78%", top: "10%" },
  { left: "18%", top: "72%" },
  { left: "85%", top: "65%" },
  { left: "50%", top: "8%" },
  { left: "60%", top: "80%" },
  { left: "35%", top: "85%" },
  { left: "90%", top: "40%" },
];

export default function ProblemScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase 1 words (0 → 0.5) ── */
  // "Every" — from LEFT
  const everyX = useTransform(progress, [0, 0.15], [-200, 0]);
  const everyOpacity = useTransform(progress, [0, 0.15], [0, 1]);

  // "day," — from RIGHT
  const dayX = useTransform(progress, [0.1, 0.25], [200, 0]);
  const dayOpacity = useTransform(progress, [0.1, 0.25], [0, 1]);

  // "thousands" — from TOP
  const thousandsY = useTransform(progress, [0.15, 0.3], [-150, 0]);
  const thousandsOpacity = useTransform(progress, [0.15, 0.3], [0, 1]);

  // "of laptops" — from LEFT
  const ofLaptopsX = useTransform(progress, [0.2, 0.35], [-200, 0]);
  const ofLaptopsOpacity = useTransform(progress, [0.2, 0.35], [0, 1]);

  // "pass through" — from RIGHT
  const passThroughX = useTransform(progress, [0.25, 0.4], [200, 0]);
  const passThroughOpacity = useTransform(progress, [0.25, 0.4], [0, 1]);

  // "campus gates" — scale from CENTER
  const campusGatesScale = useTransform(progress, [0.3, 0.45], [0, 1]);
  const campusGatesOpacity = useTransform(progress, [0.3, 0.45], [0, 1]);

  /* ── Phase 1 → Phase 2 crossfade ── */
  const phase1Opacity = useTransform(progress, [0.45, 0.55], [1, 0]);
  const phase2Opacity = useTransform(progress, [0.5, 0.65], [0, 1]);

  /* ── Phase 2 words (0.5 → 1.0) ── */
  // "But how do you know..." — from LEFT
  const howX = useTransform(progress, [0.5, 0.7], [-200, 0]);
  const howOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);

  // "which ones belong here?" — from RIGHT
  const belongX = useTransform(progress, [0.6, 0.8], [200, 0]);
  const belongOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  /* ── Edge glow: pulsing with sin(progress * PI) ── */
  const glowOpacity = useTransform(progress, (p) =>
    Math.max(0, Math.sin(p * Math.PI) * 0.5)
  );

  /* ── Drifting laptop icons ── */
  const driftValues = [
    useTransform(progress, [0, 1], [0, -30]),
    useTransform(progress, [0, 1], [0, 20]),
    useTransform(progress, [0, 1], [0, -25]),
    useTransform(progress, [0, 1], [0, 15]),
    useTransform(progress, [0, 1], [0, -20]),
    useTransform(progress, [0, 1], [0, 25]),
    useTransform(progress, [0, 1], [0, -18]),
    useTransform(progress, [0, 1], [0, 22]),
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Red / orange edge glow ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(239,68,68,0.35) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.35) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.2) 0%, transparent 40%), " +
            "radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.2) 0%, transparent 40%)",
        }}
      />

      {/* ── Drifting laptop silhouettes ── */}
      {laptopPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-white/[0.07]"
          style={{
            left: pos.left,
            top: pos.top,
            y: driftValues[i],
          }}
        >
          <LaptopIcon className="w-10 h-10 md:w-14 md:h-14" />
        </motion.div>
      ))}

      {/* ── Phase 1: "Every day, thousands of laptops pass through campus gates" ── */}
      <motion.div
        className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center"
        style={{ opacity: phase1Opacity }}
      >
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ x: everyX, opacity: everyOpacity }}
        >
          Every
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ x: dayX, opacity: dayOpacity }}
        >
          day,
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ y: thousandsY, opacity: thousandsOpacity }}
        >
          thousands
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ x: ofLaptopsX, opacity: ofLaptopsOpacity }}
        >
          of laptops
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ x: passThroughX, opacity: passThroughOpacity }}
        >
          pass through
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold text-white"
          style={{ scale: campusGatesScale, opacity: campusGatesOpacity }}
        >
          campus gates
        </motion.span>
      </motion.div>

      {/* ── Phase 2: warning question ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ opacity: phase2Opacity }}
      >
        <motion.span
          className="text-4xl md:text-6xl font-extrabold"
          style={{ x: howX, opacity: howOpacity, color: "#ef4444" }}
        >
          But how do you know...
        </motion.span>
        <motion.span
          className="text-4xl md:text-6xl font-extrabold"
          style={{ x: belongX, opacity: belongOpacity, color: "#ef4444" }}
        >
          which ones belong here?
        </motion.span>
      </motion.div>
    </div>
  );
}
