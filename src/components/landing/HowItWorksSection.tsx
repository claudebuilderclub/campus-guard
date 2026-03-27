"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const GateScene = dynamic(
  () => import("./GateScene").then((mod) => ({ default: mod.GateScene })),
  { ssr: false }
);

const steps = [
  {
    number: 1,
    title: "Register Your Laptop",
    description:
      "Students provide laptop details — brand, serial number, and color — at the campus registration portal.",
  },
  {
    number: 2,
    title: "Verify at Any Gate",
    description:
      "Gate staff searches the database instantly by serial number. Results appear in real-time with ownership details.",
  },
  {
    number: 3,
    title: "Access Granted",
    description:
      "Verified laptops pass through seamlessly. Every check is logged automatically with timestamps and gate info.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, mounted } = useIsMobile();
  const [progressValue, setProgressValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const gateProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const activeStep = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 2, 3]);

  useMotionValueEvent(gateProgress, "change", (latest) => {
    setProgressValue(latest);
  });

  const [currentStep, setCurrentStep] = useState(0);
  useMotionValueEvent(activeStep, "change", (latest) => {
    setCurrentStep(Math.round(latest));
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 px-4"
      style={{ backgroundColor: "var(--muted-light)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left column */}
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-extrabold"
                style={{ color: "var(--foreground)" }}
              >
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
                Three simple steps to secure every laptop on campus.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative pl-12">
              {/* Animated progress line */}
              <div
                className="absolute left-[18px] top-0 bottom-0 w-[3px] rounded-full"
                style={{ backgroundColor: "var(--border)" }}
              >
                <motion.div
                  className="w-full rounded-full origin-top"
                  style={{
                    scaleY: lineScaleY,
                    background: "linear-gradient(to bottom, var(--primary), var(--accent))",
                    height: "100%",
                  }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="relative"
                  >
                    {/* Numbered circle */}
                    <div
                      className="absolute -left-12 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
                      style={{
                        backgroundColor:
                          currentStep >= step.number ? "var(--primary)" : "var(--card)",
                        color: currentStep >= step.number ? "#ffffff" : "var(--muted)",
                        border:
                          currentStep >= step.number
                            ? "2px solid var(--primary)"
                            : "2px solid var(--border)",
                        boxShadow:
                          currentStep >= step.number
                            ? "0 0 0 4px rgba(37, 99, 235, 0.15)"
                            : "none",
                      }}
                    >
                      {step.number}
                    </div>

                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                      {step.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - 3D Gate Scene (desktop only) */}
          {mounted && !isMobile && (
            <div className="hidden lg:block lg:w-2/5">
              <div
                className="sticky rounded-2xl overflow-hidden"
                style={{
                  top: "25vh",
                  height: 400,
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <GateScene progress={progressValue} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
