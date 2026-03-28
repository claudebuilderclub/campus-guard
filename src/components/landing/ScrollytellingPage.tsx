"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProblemScene from "./scenes/ProblemScene";
import AssembleScene from "./scenes/AssembleScene";
import DashboardScene from "./scenes/DashboardScene";
import FlowScene from "./scenes/FlowScene";
import StatsScene from "./scenes/StatsScene";
import DemoScene from "./scenes/DemoScene";
import CTAScene from "./scenes/CTAScene";

// Scene boundaries — wider ranges for comfortable pacing (1400vh total)
const SCENES = [
  { id: "problem", start: 0, end: 0.12, label: "Problem" },
  { id: "assemble", start: 0.10, end: 0.30, label: "Solution" },
  { id: "dashboard", start: 0.28, end: 0.45, label: "Dashboard" },
  { id: "flow", start: 0.43, end: 0.65, label: "How It Works" },
  { id: "stats", start: 0.63, end: 0.76, label: "Stats" },
  { id: "demo", start: 0.74, end: 0.88, label: "Demo" },
  { id: "cta", start: 0.86, end: 1.0, label: "Get Started" },
] as const;

function useSceneProgress(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  start: number,
  end: number
) {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Wider fade ranges for smoother transitions
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.03, end - 0.03, end],
    [0, 1, 1, 0]
  );
  return { progress, opacity };
}

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
  const dotOpacity = useTransform(isActive, [0, 0.5, 1], [0.25, 0.6, 1]);
  const labelOpacity = useTransform(isActive, [0, 0.5, 1], [0, 0, 1]);

  return (
    <div className="relative flex items-center">
      {/* Label — appears on active */}
      <motion.span
        className="absolute right-5 whitespace-nowrap text-[10px] md:text-xs font-medium text-white/70 pointer-events-none"
        style={{ opacity: labelOpacity }}
      >
        {scene.label}
      </motion.span>
      {/* Dot */}
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
    </div>
  );
}

export default function ScrollytellingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const s1 = useSceneProgress(scrollYProgress, SCENES[0].start, SCENES[0].end);
  const s2 = useSceneProgress(scrollYProgress, SCENES[1].start, SCENES[1].end);
  const s3 = useSceneProgress(scrollYProgress, SCENES[2].start, SCENES[2].end);
  const s4 = useSceneProgress(scrollYProgress, SCENES[3].start, SCENES[3].end);
  const s5 = useSceneProgress(scrollYProgress, SCENES[4].start, SCENES[4].end);
  const s6 = useSceneProgress(scrollYProgress, SCENES[5].start, SCENES[5].end);
  const s7 = useSceneProgress(scrollYProgress, SCENES[6].start, SCENES[6].end);

  // Background color transitions
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.18, 0.42, 0.63, 0.74, 0.86, 1.0],
    [
      "#0f172a",  // Scene 1: dark
      "#0f172a",  // end problem
      "#f8fafc",  // assemble → dashboard: light
      "#f8fafc",  // flow: light
      "#0f172a",  // stats: dark
      "#0f172a",  // demo: dark
      "#1e1b4b",  // CTA: deep purple
      "#1e1b4b",
    ]
  );

  return (
    <section ref={containerRef} style={{ height: "1400vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ backgroundColor: bgColor }} />

        {/* ── Scene indicator dots (right side) ── */}
        <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
          {SCENES.map((scene) => (
            <SceneDot
              key={scene.id}
              scene={scene}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div className="absolute inset-0" style={{ opacity: s1.opacity }}>
          <ProblemScene progress={s1.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s2.opacity }}>
          <AssembleScene progress={s2.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s3.opacity }}>
          <DashboardScene progress={s3.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s4.opacity }}>
          <FlowScene progress={s4.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s5.opacity }}>
          <StatsScene progress={s5.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s6.opacity }}>
          <DemoScene progress={s6.progress} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: s7.opacity }}>
          <CTAScene progress={s7.progress} />
        </motion.div>
      </div>
    </section>
  );
}
