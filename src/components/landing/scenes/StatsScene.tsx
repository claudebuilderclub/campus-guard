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

// Spacing for the 2x2 grid (offset from center in px)
const GRID_OFFSET_X = 160;
const GRID_OFFSET_Y = 120;

// Particle dots config
const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 8) * Math.PI * 2) * 280 + (i % 3) * 40,
  y: Math.sin((i / 8) * Math.PI * 2) * 220 + (i % 2) * 30,
  size: 3 + (i % 3) * 2,
  delay: i * 0.4,
}));

function StatCard({
  stat,
  progress,
}: {
  stat: Stat;
  progress: MotionValue<number>;
}) {
  const [pStart, pEnd] = stat.progressRange;

  // Entry animation
  const entryProgress = useTransform(progress, [pStart, pEnd], [0, 1]);

  // Settle into grid (0.7 → 0.9)
  const settleProgress = useTransform(progress, [0.7, 0.9], [0, 1]);

  // Scattered entry positions
  const scatteredX = stat.entryAxis === "x" ? stat.entryValue * 0.3 : 0;
  const scatteredY = stat.entryAxis === "y" ? stat.entryValue * 0.3 : 0;

  // Final grid position
  const finalX = stat.gridX * GRID_OFFSET_X;
  const finalY = stat.gridY * GRID_OFFSET_Y;

  // Lerp from scattered to grid
  const x = useTransform(settleProgress, [0, 1], [scatteredX, finalX]);
  const y = useTransform(settleProgress, [0, 1], [scatteredY, finalY]);

  // Entry transforms (opacity + axis-specific)
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

  // Combine entry motion + settle motion: before settle, use entry; after, use grid
  const combinedX = useTransform(
    () => (settleProgress.get() > 0 ? x.get() : entryX.get() + scatteredX)
  );
  const combinedY = useTransform(
    () => (settleProgress.get() > 0 ? y.get() : entryY.get() + scatteredY)
  );

  // Ring animation
  const ringOffset = useTransform(
    progress,
    [pStart, pEnd],
    [RING_CIRCUMFERENCE, 0]
  );

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
      {/* Progress ring */}
      <div className="relative flex items-center justify-center mb-2">
        <svg
          width="80"
          height="80"
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
            strokeWidth="3"
            opacity={0.08}
          />
          {/* Animated ring */}
          <motion.circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke={stat.accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: ringOffset }}
            transform="rotate(-90 40 40)"
          />
        </svg>
        {/* Number */}
        <span
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent relative z-10"
          style={{
            backgroundImage: "linear-gradient(135deg, #2563eb, #7c3aed)",
          }}
        >
          {stat.number}
        </span>
      </div>
      {/* Label */}
      <span className="text-sm uppercase tracking-widest text-white/50 mt-2 text-center">
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

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Floating particle dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: particleOpacity }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{
              width: p.size,
              height: p.size,
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
            }}
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -12, 8, 0],
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

      {/* Stats container — centered reference point */}
      <div className="relative">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} progress={progress} />
        ))}
      </div>
    </div>
  );
}
