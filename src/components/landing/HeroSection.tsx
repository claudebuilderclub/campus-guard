"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Laptop3D } from "./Laptop3D";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text fades out
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  // Reveal CTA fades in
  const revealOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.5, 0.65], [30, 0]);

  return (
    <section ref={containerRef} style={{ height: "250vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(37,99,235,0.06) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 75% 25%, rgba(124,58,237,0.05) 0%, transparent 50%), " +
              "var(--background)",
          }}
        />

        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3 + i * 2,
              height: 3 + i * 2,
              left: `${12 + i * 18}%`,
              top: `${25 + (i % 3) * 22}%`,
              backgroundColor: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
              opacity: 0.12,
            }}
            animate={{ y: [0, -15 - i * 4, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}

        {/* ═══ LAPTOP — centered in viewport ═══ */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Laptop3D scrollProgress={scrollYProgress} />
        </div>

        {/* ═══ TEXT OVERLAY — fades out on scroll ═══ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-start pt-[12vh] z-20 pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5 pointer-events-auto"
            style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Campus Laptop Security Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-center"
          >
            Secure Every Laptop
            <br />
            <span className="gradient-text">At Every Gate</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-base md:text-lg text-center max-w-lg"
            style={{ color: "var(--muted)" }}
          >
            Scroll down to see how it works
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-6"
          >
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--muted)" strokeWidth="2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* ═══ CTA REVEAL — appears after laptop opens ═══ */}
        <motion.div
          className="absolute inset-x-0 bottom-12 flex flex-col items-center text-center z-20"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            One Dashboard. Every Gate. <span className="gradient-text">Total Control.</span>
          </h2>
          <p className="text-sm md:text-base mb-6 max-w-md" style={{ color: "var(--muted)" }}>
            Register once. Verify anywhere. Track everything.
          </p>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03, y: -2 }}>
              <Link
                href="/register"
                className="inline-flex items-center px-7 py-3 rounded-xl text-white font-semibold text-sm"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.35)",
                }}
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }}>
              <Link
                href="/login"
                className="inline-flex items-center px-7 py-3 rounded-xl font-semibold text-sm border-2"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                Staff Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
