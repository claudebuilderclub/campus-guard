"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import RealisticLaptop from "./RealisticLaptop";

/* ── Snap particles ── */
const SNAP_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * Math.PI * 2,
  distance: 60 + Math.random() * 80,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 0.3,
}));

export default function AssembleScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Screen bezel piece: slides from TOP (0 → 0.3) ── */
  const bezelY = useTransform(progress, [0, 0.3], [-500, 0]);
  const bezelRotate = useTransform(progress, [0, 0.3], [-6, 0]);
  const bezelOpacity = useTransform(progress, [0, 0.08], [0, 1]);

  /* ── Base piece: slides from BOTTOM (0.1 → 0.4) ── */
  const baseY = useTransform(progress, [0.1, 0.4], [500, 0]);
  const baseOpacity = useTransform(progress, [0.1, 0.18], [0, 1]);

  /* ── Screen content: fades in during assembly (0.3 → 0.6) ── */
  const screenOpacity = useTransform(progress, [0.3, 0.55], [0, 1]);
  const screenScale = useTransform(progress, [0.3, 0.55], [0.85, 1]);
  const screenGlow = useTransform(progress, [0.3, 0.55], [0, 0.8]);

  /* ── Snap glow at join (pulse at ~0.5) ── */
  const snapGlow = useTransform(progress, [0.45, 0.52, 0.58], [0, 1, 0.1]);

  /* ── Snap particle burst ── */
  const particleBurst = useTransform(progress, [0.45, 0.6], [0, 1]);
  const particleOpacity = useTransform(progress, [0.45, 0.5, 0.58, 0.62], [0, 1, 1, 0]);

  /* ── Crossfade: assembly pieces out, RealisticLaptop in (0.6 → 0.7) ── */
  const assemblyOpacity = useTransform(progress, [0.6, 0.7], [1, 0]);
  const laptopOpacity = useTransform(progress, [0.6, 0.7], [0, 1]);

  /* ── Post-assembly tilt (0.7 → 1.0) ── */
  const tiltX = useTransform(progress, [0.7, 1.0], [0, 15]);
  const tiltY = useTransform(progress, [0.7, 1.0], [0, -5]);
  const laptopScale = useTransform(progress, [0.7, 1.0], [0.95, 1]);

  /* ── "Assembled" text (0.8 → 1.0) ── */
  const assembledOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
  const assembledScale = useTransform(progress, [0.8, 0.88, 0.92], [0.5, 1.1, 1]);
  const assembledY = useTransform(progress, [0.8, 0.9], [15, 0]);

  /* ── Background glow behind laptop ── */
  const bgGlowOpacity = useTransform(progress, [0.7, 1.0], [0, 0.5]);
  const bgGlowScale = useTransform(progress, [0.7, 1.0], [0.6, 1.2]);

  /* ── Subtle label float (0.75 → 1.0) ── */
  const labelOpacity = useTransform(progress, [0.75, 0.85], [0, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Pulsing radial blue glow background ── */}
      <motion.div
        className="pointer-events-none absolute w-[700px] h-[700px] rounded-full"
        style={{
          opacity: bgGlowOpacity,
          scale: bgGlowScale,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)",
        }}
      />

      {/* ── Snap particle burst ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: particleOpacity }}
      >
        {SNAP_PARTICLES.map((p, i) => {
          const px = useTransform(
            particleBurst,
            [0, 1],
            [0, Math.cos(p.angle) * p.distance]
          );
          const py = useTransform(
            particleBurst,
            [0, 1],
            [0, Math.sin(p.angle) * p.distance]
          );
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                x: px,
                y: py,
                width: p.size,
                height: p.size,
                backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.8)" : "rgba(37,99,235,0.6)",
                boxShadow: "0 0 6px rgba(255,255,255,0.4)",
              }}
            />
          );
        })}
      </motion.div>

      {/* ── Assembly pieces (progress 0–0.7, fades out at 0.6–0.7) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: assemblyOpacity }}
      >
        <div
          className="relative w-[480px] md:w-[580px] mx-auto"
          style={{ perspective: 1200 }}
        >
          <div style={{ transformStyle: "preserve-3d" }}>
            {/* ── Screen piece (dark bezel, MacBook-style) ── */}
            <motion.div
              className="relative w-full aspect-[16/10] rounded-t-xl overflow-hidden"
              style={{
                y: bezelY,
                rotateZ: bezelRotate,
                opacity: bezelOpacity,
              }}
            >
              <div
                className="absolute inset-0 rounded-t-xl p-[6px] md:p-[8px]"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {/* Screen display area */}
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
                  {/* Screen content powering on */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ opacity: screenOpacity, scale: screenScale }}
                  >
                    {/* Blue glow background */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        opacity: screenGlow,
                        background:
                          "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.45) 0%, rgba(37,99,235,0.1) 50%, transparent 80%)",
                      }}
                    />

                    {/* Mock dashboard content */}
                    <div className="relative p-3 md:p-5 h-full flex flex-col">
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                        <div className="w-2 h-2 rounded-full bg-green-400/80" />
                        <div className="ml-3 h-3 w-32 bg-white/10 rounded-full" />
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <div className="col-span-1 space-y-2">
                          <div className="h-3 w-16 bg-blue-400/30 rounded" />
                          <div className="h-2 w-20 bg-white/10 rounded" />
                          <div className="h-2 w-14 bg-white/10 rounded" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <div className="h-4 w-28 bg-white/15 rounded" />
                          <div className="grid grid-cols-3 gap-1.5">
                            <div className="h-10 bg-blue-500/20 rounded-md border border-blue-500/20" />
                            <div className="h-10 bg-purple-500/20 rounded-md border border-purple-500/20" />
                            <div className="h-10 bg-emerald-500/20 rounded-md border border-emerald-500/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Camera notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#1a1a1a] rounded-full flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Snap glow at the hinge ── */}
            <motion.div
              className="relative w-full h-[2px] z-10"
              style={{
                opacity: snapGlow,
                boxShadow:
                  "0 0 24px 8px rgba(255,255,255,0.6), 0 0 50px 16px rgba(37,99,235,0.35)",
                background:
                  "linear-gradient(90deg, transparent 5%, white 50%, transparent 95%)",
              }}
            />

            {/* ── Base piece (silver aluminum, MacBook-style) ── */}
            <motion.div
              className="relative w-full"
              style={{
                y: baseY,
                opacity: baseOpacity,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Keyboard deck */}
              <div
                className="w-full rounded-b-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #d4d4d4 0%, #c0c0c0 30%, #b8b8b8 100%)",
                  padding: "8px 10px 10px",
                }}
              >
                {/* Keyboard pattern hint */}
                <div className="flex flex-col gap-[3px]">
                  {[14, 14, 13, 12, 10].map((count, rowIdx) => (
                    <div key={rowIdx} className="flex gap-[2px] justify-center">
                      {Array.from({ length: count }).map((_, colIdx) => (
                        <div
                          key={colIdx}
                          className="h-3 md:h-4 rounded-[2px]"
                          style={{
                            width: "7%",
                            minWidth: 14,
                            maxWidth: rowIdx === 0 ? 16 : 22,
                            backgroundColor: "#2a2a2a",
                            boxShadow:
                              "inset 0 -1px 0 #111, 0 1px 1px rgba(0,0,0,0.3)",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* Trackpad */}
                <div
                  className="mt-2 mx-auto rounded-md"
                  style={{
                    width: "38%",
                    height: "32px",
                    background:
                      "linear-gradient(180deg, #d1d1d1 0%, #c4c4c4 100%)",
                    border: "1px solid #b0b0b0",
                    boxShadow:
                      "inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              {/* Base body bottom edge */}
              <div
                className="w-full h-3 md:h-4 rounded-b-xl"
                style={{
                  background:
                    "linear-gradient(180deg, #c0c0c0 0%, #b0b0b0 100%)",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.4), 0 2px 0 rgba(255,255,255,0.3) inset",
                }}
              />
            </motion.div>

            {/* ── Shadow ── */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-6 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── RealisticLaptop (fades in at 0.6–0.7, tilts 0.7–1.0) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: laptopOpacity }}
      >
        <RealisticLaptop
          rotateX={tiltX}
          rotateY={tiltY}
          scale={laptopScale}
        >
          {/* Same dashboard content shown after assembly */}
          <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0.1) 50%, transparent 80%)",
              }}
            />
            <div className="relative p-3 md:p-5 h-full flex flex-col">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="ml-3 h-3 w-32 bg-white/10 rounded-full" />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="col-span-1 space-y-2">
                  <div className="h-3 w-16 bg-blue-400/30 rounded" />
                  <div className="h-2 w-20 bg-white/10 rounded" />
                  <div className="h-2 w-14 bg-white/10 rounded" />
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="h-4 w-28 bg-white/15 rounded" />
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-10 bg-blue-500/20 rounded-md border border-blue-500/20" />
                    <div className="h-10 bg-purple-500/20 rounded-md border border-purple-500/20" />
                    <div className="h-10 bg-emerald-500/20 rounded-md border border-emerald-500/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RealisticLaptop>

        {/* ── "Assembled" label ── */}
        <motion.div
          className="absolute bottom-[14%] flex items-center justify-center gap-3"
          style={{ opacity: assembledOpacity, scale: assembledScale, y: assembledY }}
        >
          <div className="flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-lg">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-green-400 fill-current"
              >
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
              </svg>
            </div>
            <span className="text-white/80 text-base font-medium tracking-wide">
              Assembled
            </span>
          </div>
        </motion.div>

        {/* ── Floating glass labels ── */}
        <motion.div
          className="absolute top-[12%] right-[8%] md:right-[12%]"
          style={{ opacity: labelOpacity }}
        >
          <div className="backdrop-blur-md bg-white/[0.06] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 font-medium shadow-lg">
            MacBook Pro
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
