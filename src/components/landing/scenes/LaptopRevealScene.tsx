"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/*
  LAPTOP REVEAL SCENE — "The Solution"
  ─────────────────────────────────────
  The signature moment of the scrollytelling:

  Phase 1 (0 → 0.35):  Closed laptop appears, then lid opens via rotateX
  Phase 2 (0.35 → 0.55): Screen content fades in (Campus Guard dashboard)
  Phase 3 (0.55 → 0.75): "Introducing Campus Guard" text appears ON the screen
  Phase 4 (0.75 → 1.0):  Laptop scales up, bezel fades — screen fills viewport

  Built with pure CSS 3D transforms — no Three.js.
  The laptop is viewed from a slight elevated angle (as if sitting at a desk).
*/

/* ── Keyboard row config ── */
const KB_ROWS = [
  { keys: 14, h: "h-[6px] md:h-[8px]" },
  { keys: 14, h: "h-[8px] md:h-[10px]" },
  { keys: 13, h: "h-[8px] md:h-[10px]" },
  { keys: 12, h: "h-[8px] md:h-[10px]" },
  { keys: 10, h: "h-[8px] md:h-[10px]" },
];

export default function LaptopRevealScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ═══════ Phase 1: Laptop appears + lid opens ═══════ */

  // Whole laptop fades in
  const laptopOpacity = useTransform(progress, [0, 0.08], [0, 1]);
  const laptopY = useTransform(progress, [0, 0.08], [60, 0]);

  // Lid rotateX: closed (-85deg) → open (0deg)
  // -85 not -90 to avoid the lid being perfectly edge-on (invisible)
  const lidRotateX = useTransform(progress, [0.05, 0.35], [-80, 0]);

  // Shadow grows as lid opens
  const shadowOpacity = useTransform(progress, [0.05, 0.35], [0.1, 0.35]);
  const shadowBlur = useTransform(progress, [0.05, 0.35], [10, 30]);

  /* ═══════ Phase 2: Screen content lights up ═══════ */
  const screenGlow = useTransform(progress, [0.3, 0.5], [0, 1]);
  const screenContentOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);

  /* ═══════ Phase 3: "Introducing Campus Guard" on screen ═══════ */
  const introTextOpacity = useTransform(progress, [0.45, 0.55], [0, 1]);
  const introTextY = useTransform(progress, [0.45, 0.55], [20, 0]);

  // Feature pills on screen
  const pill1Opacity = useTransform(progress, [0.52, 0.58], [0, 1]);
  const pill2Opacity = useTransform(progress, [0.56, 0.62], [0, 1]);
  const pill3Opacity = useTransform(progress, [0.60, 0.66], [0, 1]);

  /* ═══════ Phase 4: Zoom into screen ═══════ */

  // Scale the entire laptop up so the screen fills the viewport
  const zoomScale = useTransform(progress, [0.72, 0.95], [1, 4.5]);
  // Shift up so the screen (not the hinge) stays centered
  const zoomY = useTransform(progress, [0.72, 0.95], [0, -280]);
  // Fade out the bezel + base so only screen content remains
  const bezelOpacity = useTransform(progress, [0.78, 0.92], [1, 0]);
  // Screen content stays fully visible
  const screenBgOpacity = useTransform(progress, [0.88, 0.95], [1, 0]);

  /* ═══════ Ambient glow behind laptop ═══════ */
  const ambientGlow = useTransform(progress, [0.3, 0.6], [0, 0.5]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Ambient glow ── */}
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full"
        style={{
          opacity: ambientGlow,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.05) 50%, transparent 70%)",
        }}
      />

      {/* ── Laptop assembly ── */}
      <motion.div
        className="relative"
        style={{
          opacity: laptopOpacity,
          y: laptopY,
          scale: zoomScale,
          translateY: zoomY,
        }}
      >
        {/* 3D perspective container */}
        <div
          className="relative w-[420px] md:w-[560px] lg:w-[640px]"
          style={{ perspective: 1500 }}
        >
          <div style={{ transformStyle: "preserve-3d" }}>

            {/* ══════ LID (screen half) ══════ */}
            <motion.div
              className="relative w-full"
              style={{
                rotateX: lidRotateX,
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Bezel (dark frame) */}
              <motion.div
                className="relative w-full aspect-[16/10] rounded-t-xl overflow-hidden"
                style={{ opacity: bezelOpacity }}
              >
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    backgroundColor: "#1a1a1a",
                    padding: "6px 6px 4px 6px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Camera notch */}
                  <div className="absolute top-[2px] left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-[5px] h-[5px] rounded-full"
                      style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)",
                      }}
                    />
                  </div>

                  {/* ── SCREEN AREA ── */}
                  <div className="relative w-full h-full rounded-[3px] overflow-hidden bg-[#050a14]">
                    {/* Screen glow (power on) */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        opacity: screenGlow,
                        background:
                          "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0.05) 60%, transparent 80%)",
                      }}
                    />

                    {/* Screen background gradient */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        opacity: screenBgOpacity,
                        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                      }}
                    />

                    {/* ── Screen content ── */}
                    <motion.div
                      className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-6"
                      style={{ opacity: screenContentOpacity }}
                    >
                      {/* Window chrome dots */}
                      <div className="absolute top-2 left-3 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                      </div>

                      {/* Shield icon */}
                      <motion.div
                        style={{ opacity: introTextOpacity }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-2 md:mb-3 mx-auto"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </motion.div>

                      {/* "Introducing Campus Guard" */}
                      <motion.div
                        className="text-center"
                        style={{ opacity: introTextOpacity, y: introTextY }}
                      >
                        <p className="text-[8px] md:text-[11px] uppercase tracking-[0.2em] text-blue-400/60 font-medium mb-1">
                          Introducing
                        </p>
                        <h2 className="text-sm md:text-xl lg:text-2xl font-black text-white tracking-tight">
                          Campus Guard
                        </h2>
                        <p className="text-[7px] md:text-[10px] text-white/40 mt-1 max-w-[200px] mx-auto leading-relaxed">
                          Real-time laptop verification for every campus gate.
                        </p>
                      </motion.div>

                      {/* Feature pills */}
                      <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-4">
                        <motion.span
                          className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-300/80 text-[6px] md:text-[9px] font-medium"
                          style={{ opacity: pill1Opacity }}
                        >
                          Instant Verify
                        </motion.span>
                        <motion.span
                          className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300/80 text-[6px] md:text-[9px] font-medium"
                          style={{ opacity: pill2Opacity }}
                        >
                          Gate Logs
                        </motion.span>
                        <motion.span
                          className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300/80 text-[6px] md:text-[9px] font-medium"
                          style={{ opacity: pill3Opacity }}
                        >
                          Real-time
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Screen reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Lid bottom edge (metallic strip at hinge) */}
              <motion.div
                className="w-[95%] mx-auto h-[2px]"
                style={{
                  opacity: bezelOpacity,
                  background: "linear-gradient(90deg, #666 0%, #999 50%, #666 100%)",
                }}
              />
            </motion.div>

            {/* ══════ HINGE ══════ */}
            <motion.div
              className="w-[96%] mx-auto h-[3px]"
              style={{
                opacity: bezelOpacity,
                background: "linear-gradient(180deg, #555 0%, #888 50%, #777 100%)",
                borderRadius: "0 0 2px 2px",
              }}
            />

            {/* ══════ BASE (keyboard half) ══════ */}
            <motion.div
              className="w-full rounded-b-xl overflow-hidden"
              style={{
                opacity: bezelOpacity,
                background: "linear-gradient(180deg, #d4d4d4 0%, #c0c0c0 30%, #b8b8b8 100%)",
                boxShadow: `0 ${shadowBlur.get?.() || 20}px 40px rgba(0,0,0,${shadowOpacity.get?.() || 0.25})`,
                padding: "6px 8px 6px",
              }}
            >
              {/* Keyboard */}
              <div className="flex flex-col gap-[1.5px] w-[85%] mx-auto">
                {KB_ROWS.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex gap-[1.5px] justify-center">
                    {Array.from({ length: row.keys }).map((_, keyIdx) => (
                      <div
                        key={keyIdx}
                        className={`${row.h} flex-1 rounded-[1.5px]`}
                        style={{
                          backgroundColor: "#2a2a2a",
                          boxShadow: "inset 0 -1px 0 #111",
                          maxWidth: rowIdx === 0 ? 14 : 20,
                        }}
                      />
                    ))}
                  </div>
                ))}
                {/* Space bar row */}
                <div className="flex gap-[1.5px] justify-center">
                  <div className="h-[8px] md:h-[10px] flex-1 max-w-[16px] rounded-[1.5px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
                  <div className="h-[8px] md:h-[10px] flex-1 max-w-[16px] rounded-[1.5px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
                  <div className="h-[8px] md:h-[10px] flex-[5] max-w-[100px] rounded-[1.5px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
                  <div className="h-[8px] md:h-[10px] flex-1 max-w-[16px] rounded-[1.5px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
                  <div className="h-[8px] md:h-[10px] flex-1 max-w-[16px] rounded-[1.5px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
                </div>
              </div>

              {/* Trackpad */}
              <div
                className="mt-1.5 mx-auto rounded-md"
                style={{
                  width: "36%",
                  height: "28px",
                  background: "linear-gradient(180deg, #d1d1d1 0%, #c4c4c4 100%)",
                  border: "1px solid #b0b0b0",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
              />

              {/* Bottom notch */}
              <div className="mt-1.5 flex justify-center">
                <div className="w-[14%] h-[1.5px] rounded-full" style={{ backgroundColor: "#a0a0a0" }} />
              </div>
            </motion.div>

            {/* ══════ SHADOW ══════ */}
            <motion.div
              className="absolute -bottom-4 left-[8%] right-[8%] h-6 rounded-full"
              style={{
                opacity: shadowOpacity,
                filter: useTransform(shadowBlur, (b) => `blur(${b}px)`),
                background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
