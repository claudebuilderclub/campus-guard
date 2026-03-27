"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface Laptop3DProps {
  scrollProgress: MotionValue<number>;
}

export function Laptop3D({ scrollProgress }: Laptop3DProps) {
  // Lid: starts mostly closed (70deg) → opens to slight angle (10deg for visibility)
  const lidRotateX = useTransform(scrollProgress, [0, 0.35], [70, 10]);
  // Whole laptop: viewed from slight top-down angle (like Apple product shots)
  const baseTiltX = useTransform(scrollProgress, [0, 0.3, 0.5], [25, 15, 12]);
  const baseTiltY = useTransform(scrollProgress, [0, 0.3, 0.5], [-20, -5, 0]);
  // Scale: starts smaller, grows to full
  const scale = useTransform(scrollProgress, [0, 0.4], [0.75, 1]);
  // Screen glow fades in
  const screenGlow = useTransform(scrollProgress, [0.05, 0.25], [0.3, 1]);

  return (
    <motion.div
      className="relative w-[500px] md:w-[600px] lg:w-[700px] mx-auto"
      style={{
        perspective: 1200,
        scale,
      }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX: baseTiltX,
          rotateY: baseTiltY,
        }}
      >
        {/* ── Screen / Lid ── */}
        <motion.div
          className="relative w-full aspect-[16/10] rounded-t-xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            rotateX: lidRotateX,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Screen bezel (outer) */}
          <div className="absolute inset-0 bg-[#0f172a] rounded-t-xl p-[6px] md:p-[8px]">
            {/* Screen display area */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
              {/* Screen glow / content */}
              <motion.div
                className="absolute inset-0"
                style={{ opacity: screenGlow }}
              >
                {/* Gradient mesh background on screen */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 20%, rgba(37, 99, 235, 0.4) 0%, transparent 50%), " +
                      "radial-gradient(ellipse at 70% 60%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), " +
                      "radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), " +
                      "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  }}
                />

                {/* Dashboard mockup on screen */}
                <div className="relative p-3 md:p-5 h-full flex flex-col">
                  {/* Top bar */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                    <div className="w-2 h-2 rounded-full bg-green-400/80" />
                    <div className="ml-3 h-3 w-32 bg-white/10 rounded-full" />
                  </div>

                  {/* Mock UI */}
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-2">
                      <div className="h-3 w-16 bg-blue-400/30 rounded" />
                      <div className="h-2 w-20 bg-white/10 rounded" />
                      <div className="h-2 w-14 bg-white/10 rounded" />
                      <div className="h-2 w-18 bg-white/10 rounded" />
                      <div className="h-2 w-12 bg-blue-400/20 rounded" />
                    </div>

                    {/* Main content */}
                    <div className="col-span-2 space-y-2">
                      <div className="h-4 w-28 bg-white/15 rounded" />
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="h-10 bg-blue-500/20 rounded-md border border-blue-500/20" />
                        <div className="h-10 bg-purple-500/20 rounded-md border border-purple-500/20" />
                        <div className="h-10 bg-emerald-500/20 rounded-md border border-emerald-500/20" />
                      </div>
                      <div className="h-16 bg-white/5 rounded-md border border-white/10" />
                      <div className="flex gap-1.5">
                        <div className="h-2 flex-1 bg-blue-400/20 rounded" />
                        <div className="h-2 flex-1 bg-purple-400/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Camera notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#0f172a] rounded-full flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Base / Keyboard ── */}
        <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Base body */}
          <div
            className="w-full h-4 md:h-5 rounded-b-xl"
            style={{
              background: "linear-gradient(180deg, #475569 0%, #334155 100%)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 2px 0 rgba(255,255,255,0.08) inset",
            }}
          />

          {/* Keyboard deck (visible when lid is open) */}
          <motion.div
            className="absolute -top-1 left-0 right-0 mx-auto w-[96%] overflow-hidden rounded-t-sm"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, transparent 10%, rgba(100,116,139,0.3) 50%, transparent 90%)",
            }}
          />

          {/* Trackpad indent hint */}
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-white/5 rounded-full" />
        </div>

        {/* ── Shadow ── */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-6 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(8px)",
            opacity: useTransform(scrollProgress, [0, 0.4], [0.3, 0.8]),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
