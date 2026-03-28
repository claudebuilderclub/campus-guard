"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

/* ── Particle positions ── */
const particles = [
  { left: "10%", size: 4, color: "rgba(96,165,250,0.2)", drift: 40 },
  { left: "20%", size: 3, color: "rgba(168,85,247,0.15)", drift: 55 },
  { left: "35%", size: 5, color: "rgba(255,255,255,0.1)", drift: 35 },
  { left: "45%", size: 3, color: "rgba(96,165,250,0.25)", drift: 60 },
  { left: "55%", size: 6, color: "rgba(168,85,247,0.15)", drift: 45 },
  { left: "65%", size: 4, color: "rgba(255,255,255,0.15)", drift: 50 },
  { left: "75%", size: 3, color: "rgba(96,165,250,0.15)", drift: 38 },
  { left: "85%", size: 5, color: "rgba(168,85,247,0.2)", drift: 55 },
  { left: "92%", size: 4, color: "rgba(255,255,255,0.1)", drift: 42 },
  { left: "5%", size: 3, color: "rgba(96,165,250,0.15)", drift: 48 },
];

export default function CTAScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase 1 (0–0.3): Heading enters ── */
  const readyY = useTransform(progress, [0, 0.2], [60, 0]);
  const readyOpacity = useTransform(progress, [0, 0.2], [0, 1]);

  const secureY = useTransform(progress, [0.08, 0.28], [60, 0]);
  const secureOpacity = useTransform(progress, [0.08, 0.28], [0, 1]);

  // Gradient underline width
  const underlineWidth = useTransform(progress, [0.2, 0.4], [0, 100]);

  /* ── Phase 2 (0.25–0.5): Subtitle ── */
  const subtitleOpacity = useTransform(progress, [0.3, 0.45], [0, 1]);
  const subtitleY = useTransform(progress, [0.3, 0.45], [25, 0]);

  /* ── Phase 3 (0.4–0.65): Buttons ── */
  const getStartedOpacity = useTransform(progress, [0.42, 0.55], [0, 1]);
  const getStartedY = useTransform(progress, [0.42, 0.53, 0.58, 0.62], [60, -4, 2, 0]);

  const staffLoginOpacity = useTransform(progress, [0.48, 0.6], [0, 1]);
  const staffLoginY = useTransform(progress, [0.48, 0.58, 0.63, 0.65], [60, -4, 2, 0]);

  /* ── Phase 4 (0.6–0.85): Built with badge ── */
  const badgeOpacity = useTransform(progress, [0.65, 0.8], [0, 1]);
  const badgeScale = useTransform(progress, [0.65, 0.8], [0.85, 1]);
  const clubOpacity = useTransform(progress, [0.72, 0.85], [0, 1]);

  /* ── Phase 5 (0.8–1.0): Particle drift ── */
  const particleOpacity = useTransform(progress, [0.8, 0.92], [0, 1]);
  const particleDriftBase = useTransform(progress, [0.8, 1.0], [0, 1]);

  /* ── Animated mesh gradient ── */
  const meshRotate = useTransform(progress, [0, 1], [0, 30]);
  const meshScale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const meshOpacity = useTransform(progress, [0, 0.3], [0, 1]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* ── Animated mesh gradient background ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: meshOpacity,
          rotate: meshRotate,
          scale: meshScale,
          background:
            "radial-gradient(ellipse at 25% 25%, rgba(37,99,235,0.2) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 75% 25%, rgba(124,58,237,0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 75%, rgba(236,72,153,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/15 via-transparent to-transparent" />

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
        {/* Phase 1: Heading — vertical entrance */}
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <motion.span
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
            style={{ y: readyY, opacity: readyOpacity }}
          >
            Ready to
          </motion.span>
          <motion.span
            className="relative text-4xl md:text-7xl font-black text-white tracking-tight"
            style={{ y: secureY, opacity: secureOpacity }}
          >
            Secure Your Campus?
            {/* Gradient underline */}
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] md:h-[4px] rounded-full"
              style={{
                width: useTransform(underlineWidth, (w) => `${w}%`),
                background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
                boxShadow: "0 0 12px rgba(167,139,250,0.3)",
              }}
            />
          </motion.span>
        </div>

        {/* Phase 2: Subtitle */}
        <motion.p
          className="text-base md:text-lg text-white/60 max-w-md leading-relaxed"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Join hundreds of campuses already using Campus Guard
        </motion.p>

        {/* Phase 3: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-3">
          <motion.div
            style={{
              opacity: getStartedOpacity,
              y: getStartedY,
            }}
          >
            <Link
              href="/register"
              className="group relative inline-block bg-white text-blue-600 rounded-xl px-8 py-4 font-bold text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent" />
              <span className="relative">Get Started</span>
            </Link>
          </motion.div>

          <motion.div
            style={{
              opacity: staffLoginOpacity,
              y: staffLoginY,
            }}
          >
            <Link
              href="/login"
              className="inline-block bg-transparent border border-white/30 text-white rounded-xl px-8 py-4 font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Staff Login
            </Link>
          </motion.div>
        </div>

        {/* Phase 4: Built with badge */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          style={{ opacity: badgeOpacity, scale: badgeScale }}
        >
          <span className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-white/60 text-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/50"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Built with Claude
          </span>
          <motion.span
            className="text-sm text-white/35"
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
