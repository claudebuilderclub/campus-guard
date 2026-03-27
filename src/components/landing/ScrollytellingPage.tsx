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

// Scene boundaries (percentage of total scroll)
const SCENES = [
  { id: "problem", start: 0, end: 0.15 },
  { id: "assemble", start: 0.13, end: 0.35 },
  { id: "dashboard", start: 0.33, end: 0.50 },
  { id: "flow", start: 0.48, end: 0.70 },
  { id: "stats", start: 0.68, end: 0.80 },
  { id: "demo", start: 0.78, end: 0.90 },
  { id: "cta", start: 0.88, end: 1.0 },
] as const;

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

  const s1 = useSceneProgress(scrollYProgress, SCENES[0].start, SCENES[0].end);
  const s2 = useSceneProgress(scrollYProgress, SCENES[1].start, SCENES[1].end);
  const s3 = useSceneProgress(scrollYProgress, SCENES[2].start, SCENES[2].end);
  const s4 = useSceneProgress(scrollYProgress, SCENES[3].start, SCENES[3].end);
  const s5 = useSceneProgress(scrollYProgress, SCENES[4].start, SCENES[4].end);
  const s6 = useSceneProgress(scrollYProgress, SCENES[5].start, SCENES[5].end);
  const s7 = useSceneProgress(scrollYProgress, SCENES[6].start, SCENES[6].end);

  // Global background color transition (dark → light → dark → gradient)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.68, 0.80, 0.88, 1.0],
    [
      "#0f172a",        // Scene 1: dark
      "#0f172a",        // end of Scene 1: still dark
      "#f8fafc",        // Scene 2-3: light
      "#f8fafc",        // Scene 4: light
      "#0f172a",        // Scene 5: dark
      "#0f172a",        // Scene 6: dark
      "#1e1b4b",        // Scene 7: deep purple-dark
    ]
  );

  return (
    <section ref={containerRef} style={{ height: "700vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dynamic background */}
        <motion.div className="absolute inset-0 -z-10" style={{ backgroundColor: bgColor }} />

        {/* Scene layers — only visible when their scroll range is active */}
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
