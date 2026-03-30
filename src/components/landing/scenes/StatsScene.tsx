"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const RING_RADIUS = 36;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface Stat {
  number: string;
  label: string;
  progressRange: [number, number];
}

const stats: Stat[] = [
  { number: "500+", label: "Students Protected", progressRange: [0.08, 0.30] },
  { number: "4", label: "Campus Gates", progressRange: [0.15, 0.38] },
  { number: "10,000+", label: "Verifications", progressRange: [0.22, 0.45] },
  { number: "99.9%", label: "Uptime", progressRange: [0.30, 0.52] },
];

function StatCard({
  stat,
  progress,
  index,
}: {
  stat: Stat;
  progress: MotionValue<number>;
  index: number;
}) {
  const [pStart, pEnd] = stat.progressRange;

  const opacity = useTransform(progress, [pStart, pStart + 0.10], [0, 1]);
  const y = useTransform(progress, [pStart, pStart + 0.12], [30, 0]);

  const ringOffset = useTransform(
    progress,
    [pStart, pEnd],
    [RING_CIRCUMFERENCE, 0]
  );

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      style={{ opacity, y }}
    >
      {/* Progress ring + number */}
      <div className="relative flex items-center justify-center mb-3">
        <svg
          width="88"
          height="88"
          viewBox="0 0 80 80"
          className="absolute"
        >
          <circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={0.06}
          />
          <motion.circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke="#da7756"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: ringOffset }}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent relative z-10"
          style={{
            backgroundImage: "linear-gradient(135deg, #da7756, #C15F3C)",
          }}
        >
          {stat.number}
        </span>
      </div>

      {/* Label */}
      <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.15em] text-white/45 font-medium">
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
  const headerOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const headerY = useTransform(progress, [0, 0.12], [25, 0]);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Section header */}
      <motion.div
        className="text-center mb-10 md:mb-14"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          By the Numbers
        </h2>
        <div
          className="mx-auto mt-2 h-[2px] w-12 rounded-full"
          style={{
            background: "linear-gradient(90deg, #da7756, #C15F3C)",
          }}
        />
      </motion.div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-8 sm:gap-10 md:gap-14 max-w-lg md:max-w-xl">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} progress={progress} index={i} />
        ))}
      </div>
    </div>
  );
}
