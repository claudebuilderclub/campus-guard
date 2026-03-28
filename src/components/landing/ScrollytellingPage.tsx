"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HookScene from "./scenes/HookScene";
import LaptopRevealScene from "./scenes/LaptopRevealScene";
import FeatureTourScene from "./scenes/FeatureTourScene";
import StatsScene from "./scenes/StatsScene";
import CTAScene from "./scenes/CTAScene";

/*
  Narrative Arc (PASPA):
  ───────────────────────
  1. HOOK         (0 – 0.08)   → Emotionally resonant problem statement
  2. LAPTOP OPEN  (0.08 – 0.30) → Closed laptop → opens → screen lights up with Campus Guard
  3. SCREEN ZOOM  (0.30 – 0.42) → Laptop screen zooms in to fill the entire viewport
  4. FEATURE TOUR (0.42 – 0.72) → Dashboard features revealed inside the "screen"
  5. STATS        (0.72 – 0.86) → Social proof / numbers
  6. CTA          (0.86 – 1.0)  → Call to action
*/

const SCENES = [
  { id: "hook",     start: 0,    end: 0.08,  label: "The Problem" },
  { id: "laptop",   start: 0.06, end: 0.42,  label: "The Solution" },
  { id: "features", start: 0.40, end: 0.72,  label: "Features" },
  { id: "stats",    start: 0.70, end: 0.86,  label: "Impact" },
  { id: "cta",      start: 0.84, end: 1.0,   label: "Get Started" },
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
        className="w-2 h-2 rounded-full bg-white"
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
    [start, start + 0.025, end - 0.025, end],
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

  const sHook     = useSceneProgress(scrollYProgress, SCENES[0].start, SCENES[0].end);
  const sLaptop   = useSceneProgress(scrollYProgress, SCENES[1].start, SCENES[1].end);
  const sFeatures = useSceneProgress(scrollYProgress, SCENES[2].start, SCENES[2].end);
  const sStats    = useSceneProgress(scrollYProgress, SCENES[3].start, SCENES[3].end);
  const sCTA      = useSceneProgress(scrollYProgress, SCENES[4].start, SCENES[4].end);

  // Background color — dark throughout laptop reveal, then transitions
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.40, 0.44, 0.70, 0.84, 1.0],
    [
      "#0a0f1a",  // hook + laptop: very dark
      "#0a0f1a",  // end laptop
      "#0f172a",  // features: dark blue
      "#0f172a",  // stats
      "#1e1b4b",  // CTA: deep purple
      "#1e1b4b",
    ]
  );

  return (
    <section ref={containerRef} style={{ height: "1600vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ backgroundColor: bgColor }} />

        {/* Scene indicator dots */}
        <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
          {SCENES.map((scene) => (
            <SceneDot key={scene.id} scene={scene} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Scene 1: Hook — problem awareness */}
        <motion.div className="absolute inset-0" style={{ opacity: sHook.opacity }}>
          <HookScene progress={sHook.progress} />
        </motion.div>

        {/* Scene 2: Laptop opens + screen zoom */}
        <motion.div className="absolute inset-0" style={{ opacity: sLaptop.opacity }}>
          <LaptopRevealScene progress={sLaptop.progress} />
        </motion.div>

        {/* Scene 3: Feature tour (inside zoomed screen) */}
        <motion.div className="absolute inset-0" style={{ opacity: sFeatures.opacity }}>
          <FeatureTourScene progress={sFeatures.progress} />
        </motion.div>

        {/* Scene 4: Stats / social proof */}
        <motion.div className="absolute inset-0" style={{ opacity: sStats.opacity }}>
          <StatsScene progress={sStats.progress} />
        </motion.div>

        {/* Scene 5: CTA */}
        <motion.div className="absolute inset-0" style={{ opacity: sCTA.opacity }}>
          <CTAScene progress={sCTA.progress} />
        </motion.div>
      </div>
    </section>
  );
}
