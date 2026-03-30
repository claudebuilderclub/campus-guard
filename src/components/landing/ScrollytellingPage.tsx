"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaptopScene from "./scenes/LaptopScene";
import StatsScene from "./scenes/StatsScene";
import CTAScene from "./scenes/CTAScene";

/*
  Narrative Arc (Redesigned):
  ────────────────────────────
  1. LAPTOP  (0.00 – 0.65)  → Closed → opens → steps inside screen → zoom to fill
  2. STATS   (0.63 – 0.82)  → Clean 2×2 grid with social proof numbers
  3. CTA     (0.80 – 1.00)  → Call to action + Built with Claude glow
*/

const SCENES = [
  { id: "laptop", start: 0,    end: 0.65, label: "The Solution" },
  { id: "stats",  start: 0.63, end: 0.82, label: "Impact" },
  { id: "cta",    start: 0.80, end: 1.0,  label: "Get Started" },
] as const;

/* ── Scene indicator dot ── */
function SceneDot({
  scene,
  scrollYProgress,
}: {
  scene: (typeof SCENES)[number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const mid = (scene.start + scene.end) / 2;
  const isActive = useTransform(
    scrollYProgress,
    [scene.start, mid, scene.end],
    [0, 1, 0]
  );
  const dotScale = useTransform(isActive, [0, 1], [0.6, 1]);
  const dotOpacity = useTransform(isActive, [0, 0.5, 1], [0.2, 0.5, 1]);
  const labelOpacity = useTransform(isActive, [0, 0.5, 1], [0, 0, 1]);

  return (
    <div className="relative flex items-center">
      <motion.span
        className="absolute right-5 whitespace-nowrap text-[10px] md:text-xs font-medium text-white/70 pointer-events-none"
        style={{ opacity: labelOpacity }}
      >
        {scene.label}
      </motion.span>
      <motion.div
        className="w-2 h-2 rounded-full bg-[#da7756]"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
    </div>
  );
}

function useSceneProgress(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  start: number,
  end: number
) {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.02, end - 0.02, end],
    [0, 1, 1, 0]
  );
  return { progress, opacity };
}

export default function ScrollytellingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sLaptop = useSceneProgress(scrollYProgress, SCENES[0].start, SCENES[0].end);
  const sStats  = useSceneProgress(scrollYProgress, SCENES[1].start, SCENES[1].end);
  const sCTA    = useSceneProgress(scrollYProgress, SCENES[2].start, SCENES[2].end);

  // Background: cream → dark during lid open → stays dark
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.03, 0.10, 0.63, 0.80, 1.0],
    [
      "#F4F3EE", // cream — closed laptop
      "#F4F3EE", // still cream
      "#0d0d0d", // dark — lid open
      "#0d0d0d", // stats
      "#0f1218", // CTA: slightly warmer dark
      "#0f1218",
    ]
  );

  // Laptop scene doesn't use generic opacity — it manages its own
  const laptopVisible = useTransform(
    scrollYProgress,
    [0, 0.01, 0.63, 0.66],
    [1, 1, 1, 0]
  );

  return (
    <section ref={containerRef} style={{ height: "2000vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ backgroundColor: bgColor }} />

        {/* Scene indicator dots */}
        <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
          {SCENES.map((scene) => (
            <SceneDot key={scene.id} scene={scene} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Scene 1: Laptop — closed → open → steps → zoom */}
        <motion.div className="absolute inset-0" style={{ opacity: laptopVisible }}>
          <LaptopScene progress={sLaptop.progress} />
        </motion.div>

        {/* Scene 2: Stats */}
        <motion.div className="absolute inset-0" style={{ opacity: sStats.opacity }}>
          <StatsScene progress={sStats.progress} />
        </motion.div>

        {/* Scene 3: CTA */}
        <motion.div className="absolute inset-0" style={{ opacity: sCTA.opacity }}>
          <CTAScene progress={sCTA.progress} />
        </motion.div>
      </div>
    </section>
  );
}
