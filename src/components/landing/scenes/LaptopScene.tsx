"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import MacBookFrame from "./MacBookFrame";
import LaptopScreenContent from "./LaptopScreenContent";

/**
 * LaptopScene — Master orchestrator spanning progress 0–0.65 of the page.
 *
 * Flow:
 * 0.00–0.03  Closed laptop fades in centered, "Scroll to explore" hint
 * 0.03–0.12  Lid opens (rotateX -85° → 0°), screen glow appears
 * 0.12–0.57  Screen content phases (boot → steps → zoom transitions)
 * 0.57–0.65  Laptop scales up (~3.5×), bezel/base fades, screen fills viewport
 */

export default function LaptopScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ═══ LAPTOP ENTRANCE ═══ */
  const laptopOpacity = useTransform(progress, [0, 0.03], [0, 1]);

  /* ═══ LID OPENING ═══ */
  const lidRotateX = useTransform(progress, [0.03, 0.12], [-85, 0]);

  /* ═══ SCROLL HINT ═══ */
  const hintOpacity = useTransform(progress, [0, 0.02, 0.06, 0.10], [0, 1, 1, 0]);

  /* ═══ SCREEN CONTENT PROGRESS ═══ */
  // Remap 0.12–0.57 of scene progress → 0–1 for LaptopScreenContent
  const screenProgress = useTransform(progress, [0.12, 0.57], [0, 1]);

  /* ═══ ZOOM TO FILL VIEWPORT ═══ */
  const laptopScale = useTransform(progress, [0.57, 0.65], [1, 3.5]);
  const bezelFade = useTransform(progress, [0.57, 0.63], [1, 0]);
  const baseFade = useTransform(progress, [0.57, 0.62], [1, 0]);
  const laptopY = useTransform(progress, [0.57, 0.65], [0, -40]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background glow during screen active */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(progress, [0.10, 0.16, 0.55, 0.65], [0, 0.6, 0.6, 0]),
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(218,119,86,0.08) 0%, transparent 50%)",
        }}
      />

      {/* MacBook */}
      <MacBookFrame
        lidRotateX={lidRotateX}
        scale={laptopScale}
        translateY={laptopY}
        bezelOpacity={bezelFade}
        baseOpacity={baseFade}
        opacity={laptopOpacity}
      >
        <LaptopScreenContent progress={screenProgress} />
      </MacBookFrame>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: hintOpacity }}
      >
        <span className="text-[11px] md:text-xs text-white/40 font-medium tracking-wide">
          Scroll to explore
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(218,119,86,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: "chevron-bounce 2s ease-in-out infinite",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
