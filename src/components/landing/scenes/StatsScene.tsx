"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const RING_RADIUS = 36;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface Stat {
  number: string;
  label: string;
  accent: string;
  entryAxis: "x" | "y" | "scale";
  entryValue: number;
  progressRange: [number, number];
  gridX: number;
  gridY: number;
}

const stats: Stat[] = [
  {
    number: "500+",
    label: "Students Protected",
    accent: "#2563eb",
    entryAxis: "x",
    entryValue: -300,
    progressRange: [0, 0.25],
    gridX: -1,
    gridY: -1,
  },
  {
    number: "4",
    label: "Campus Gates",
    accent: "#7c3aed",
    entryAxis: "y",
    entryValue: -300,
    progressRange: [0.15, 0.4],
    gridX: 1,
    gridY: -1,
  },
  {
    number: "10,000+",
    label: "Verifications",
    accent: "#ec4899",
    entryAxis: "x",
    entryValue: 300,
    progressRange: [0.3, 0.55],
    gridX: -1,
    gridY: 1,
  },
  {
    number: "99.9%",
    label: "Uptime",
    accent: "#059669",
    entryAxis: "scale",
    entryValue: 0,
    progressRange: [0.45, 0.65],
    gridX: 1,
    gridY: 1,
  },
];

const GRID_OFFSET_X = 170;
const GRID_OFFSET_Y = 130;

// Grid line positions for the background
const GRID_LINES_H = [-200, -100, 0, 100, 200];
const GRID_LINES_V = [-280, -140, 0, 140, 280];

// Particle dots
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 10) * Math.PI * 2) * 300 + (i % 3) * 30,
  y: Math.sin((i / 10) * Math.PI * 2) * 240 + (i % 2) * 20,
  size: 2 + (i % 3) * 2,
  delay: i * 0.5,
}));

function StatCard({
  stat,
  progress,
}: {
  stat: Stat;
  progress: MotionValue<number>;
}) {
  const [pStart, pEnd] = stat.progressRange;

  const entryProgress = useTransform(progress, [pStart, pEnd], [0, 1]);
  const settleProgress = useTransform(progress, [0.7, 0.9], [0, 1]);

  const scatteredX = stat.entryAxis === "x" ? stat.entryValue * 0.3 : 0;
  const scatteredY = stat.entryAxis === "y" ? stat.entryValue * 0.3 : 0;

  const finalX = stat.gridX * GRID_OFFSET_X;
  const finalY = stat.gridY * GRID_OFFSET_Y;

  const x = useTransform(settleProgress, [0, 1], [scatteredX, finalX]);
  const y = useTransform(settleProgress, [0, 1], [scatteredY, finalY]);

  const opacity = useTransform(progress, [pStart, pStart + 0.08], [0, 1]);

  const entryX = useTransform(
    entryProgress,
    [0, 1],
    [stat.entryAxis === "x" ? stat.entryValue : 0, 0]
  );
  const entryY = useTransform(
    entryProgress,
    [0, 1],
    [stat.entryAxis === "y" ? stat.entryValue : 0, 0]
  );
  const entryScale = useTransform(
    entryProgress,
    [0, 1],
    [stat.entryAxis === "scale" ? 0 : 1, 1]
  );

  const combinedX = useTransform(
    () => (settleProgress.get() > 0 ? x.get() : entryX.get() + scatteredX)
  );
  const combinedY = useTransform(
    () => (settleProgress.get() > 0 ? y.get() : entryY.get() + scatteredY)
  );

  const ringOffset = useTransform(
    progress,
    [pStart, pEnd],
    [RING_CIRCUMFERENCE, 0]
  );

  // Card glow on settle
  const cardGlow = useTransform(progress, [0.7, 0.95], [0, 0.6]);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        x: combinedX,
        y: combinedY,
        scale: entryScale,
        opacity,
      }}
    >
      {/* Glassmorphism card background */}
      <motion.div
        className="absolute -inset-4 md:-inset-6 rounded-2xl -z-10"
        style={{
          opacity: cardGlow,
          background: `radial-gradient(circle, ${stat.accent}10 0%, transparent 70%)`,
          border: `1px solid ${stat.accent}15`,
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Progress ring */}
      <div className="relative flex items-center justify-center mb-3">
        <svg
          width="88"
          height="88"
          viewBox="0 0 80 80"
          className="absolute"
        >
          {/* Background ring */}
          <circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={0.06}
          />
          {/* Animated ring */}
          <motion.circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke={stat.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: ringOffset }}
            transform="rotate(-90 40 40)"
          />
        </svg>
        {/* Number */}
        <span
          className="text-4xl md:text-6xl font-black bg-clip-text text-transparent relative z-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${stat.accent}, ${stat.accent}cc)`,
          }}
        >
          {stat.number}
        </span>
      </div>
      {/* Label */}
      <span
        className="text-xs md:text-sm uppercase tracking-[0.15em] text-white/45 text-center font-medium"
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const particleOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  const gridOpacity = useTransform(progress, [0, 0.15], [0, 0.15]);

  // Section header
  const headerOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const headerY = useTransform(progress, [0, 0.12], [30, 0]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* ── Grid background lines ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: gridOpacity }}
      >
        <div className="relative w-full h-full">
          {/* Horizontal lines */}
          {GRID_LINES_H.map((offset, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px]"
              style={{
                top: `calc(50% + ${offset}px)`,
                background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 90%)",
              }}
            />
          ))}
          {/* Vertical lines */}
          {GRID_LINES_V.map((offset, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px]"
              style={{
                left: `calc(50% + ${offset}px)`,
                background: "linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 90%)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Floating particle dots ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: particleOpacity }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: "rgba(255,255,255,0.08)",
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
            }}
            animate={{
              x: [0, 12, -8, 0],
              y: [0, -10, 6, 0],
            }}
            transition={{
              duration: 6 + p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── Section header ── */}
      <motion.div
        className="absolute top-[8%] md:top-[10%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/30 font-medium">
          By the numbers
        </span>
      </motion.div>

      {/* Stats container */}
      <div className="relative">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} progress={progress} />
        ))}
      </div>
    </div>
  );
}
