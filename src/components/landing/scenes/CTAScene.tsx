"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

/* ── Particle positions ── */
const particles = [
  { left: "10%", size: 4, color: "rgba(96,165,250,0.25)", drift: 40 },
  { left: "20%", size: 3, color: "rgba(168,85,247,0.2)", drift: 55 },
  { left: "35%", size: 5, color: "rgba(255,255,255,0.15)", drift: 35 },
  { left: "45%", size: 3, color: "rgba(96,165,250,0.3)", drift: 60 },
  { left: "55%", size: 6, color: "rgba(168,85,247,0.2)", drift: 45 },
  { left: "65%", size: 4, color: "rgba(255,255,255,0.2)", drift: 50 },
  { left: "75%", size: 3, color: "rgba(96,165,250,0.2)", drift: 38 },
  { left: "85%", size: 5, color: "rgba(168,85,247,0.25)", drift: 55 },
  { left: "92%", size: 4, color: "rgba(255,255,255,0.15)", drift: 42 },
  { left: "5%", size: 3, color: "rgba(96,165,250,0.2)", drift: 48 },
];

export default function CTAScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase 1 (0–0.3): Heading enters ── */
  const readyX = useTransform(progress, [0, 0.25], [-200, 0]);
  const readyOpacity = useTransform(progress, [0, 0.25], [0, 1]);

  const secureX = useTransform(progress, [0.05, 0.3], [200, 0]);
  const secureOpacity = useTransform(progress, [0.05, 0.3], [0, 1]);

  // Gradient underline width
  const underlineWidth = useTransform(progress, [0.15, 0.35], [0, 100]);

  /* ── Phase 2 (0.25–0.5): Subtitle ── */
  const subtitleOpacity = useTransform(progress, [0.25, 0.45], [0, 1]);
  const subtitleY = useTransform(progress, [0.25, 0.45], [30, 0]);

  /* ── Phase 3 (0.4–0.65): Buttons with spring overshoot ── */
  const getStartedOpacity = useTransform(progress, [0.4, 0.55], [0, 1]);
  const getStartedX = useTransform(progress, [0.4, 0.55], [-50, 0]);
  // Overshoot: goes to -5 then settles at 0
  const getStartedY = useTransform(progress, [0.4, 0.52, 0.58, 0.65], [100, -5, 2, 0]);

  const staffLoginOpacity = useTransform(progress, [0.45, 0.6], [0, 1]);
  const staffLoginX = useTransform(progress, [0.45, 0.6], [50, 0]);
  const staffLoginY = useTransform(progress, [0.45, 0.57, 0.63, 0.65], [100, -5, 2, 0]);

  /* ── Phase 4 (0.6–0.85): Built with badge ── */
  const badgeOpacity = useTransform(progress, [0.6, 0.78], [0, 1]);
  const badgeScale = useTransform(progress, [0.6, 0.78], [0.8, 1]);
  const clubOpacity = useTransform(progress, [0.7, 0.85], [0, 1]);

  /* ── Phase 5 (0.8–1.0): Particle drift ── */
  const particleOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
  const particleDriftBase = useTransform(progress, [0.8, 1.0], [0, 1]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent" />

      {/* ── Phase 5: Particles ── */}
      {particles.map((p, i) => (
        <ParticleDot
          key={i}
          left={p.left}
          size={p.size}
          color={p.color}
          drift={p.drift}
          opacity={particleOpacity}
          driftProgress={particleDriftBase}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-4 md:gap-6">
        {/* Phase 1: Heading */}
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <motion.span
            className="text-4xl md:text-6xl font-extrabold text-white"
            style={{ x: readyX, opacity: readyOpacity }}
          >
            Ready to
          </motion.span>
          <motion.span
            className="relative text-4xl md:text-6xl font-extrabold text-white"
            style={{ x: secureX, opacity: secureOpacity }}
          >
            Secure Your Campus?
            {/* Gradient underline */}
            <motion.span
              className="absolute bottom-0 left-0 h-[3px] md:h-[4px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              style={{
                width: useTransform(underlineWidth, (w) => `${w}%`),
              }}
            />
          </motion.span>
        </div>

        {/* Phase 2: Subtitle */}
        <motion.p
          className="text-lg text-white/70 max-w-md"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Join hundreds of campuses already using Campus Guard
        </motion.p>

        {/* Phase 3: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2">
          <motion.div
            style={{
              opacity: getStartedOpacity,
              x: getStartedX,
              y: getStartedY,
            }}
          >
            <Link
              href="/register"
              className="inline-block bg-white text-blue-600 rounded-xl px-8 py-4 font-bold text-lg shadow-2xl hover:shadow-white/20 transition-shadow"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            style={{
              opacity: staffLoginOpacity,
              x: staffLoginX,
              y: staffLoginY,
            }}
          >
            <Link
              href="/login"
              className="inline-block bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Staff Login
            </Link>
          </motion.div>
        </div>

        {/* Phase 4: Built with badge */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-1"
          style={{ opacity: badgeOpacity, scale: badgeScale }}
        >
          <span className="flex items-center gap-1.5 bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-white/70 text-sm">
            <span>✨</span>
            Built with Claude
          </span>
          <motion.span
            className="text-sm text-white/50"
            style={{ opacity: clubOpacity }}
          >
            Claude Builder Club
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Helper: individual drifting particle ── */
function ParticleDot({
  left,
  size,
  color,
  drift,
  opacity,
  driftProgress,
}: {
  left: string;
  size: number;
  color: string;
  drift: number;
  opacity: MotionValue<number>;
  driftProgress: MotionValue<number>;
}) {
  const y = useTransform(driftProgress, (p) => p * drift);

  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left,
        top: "10%",
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        y,
      }}
    />
  );
}
