"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

// Dynamic import for HeroScene - will gracefully fail if not yet created
let HeroScene: React.ComponentType<{ scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"] }> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  HeroScene = require("./HeroScene").default;
} catch {
  // HeroScene not available yet
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      {!isMobile && HeroScene ? (
        <div className="absolute inset-0 z-0">
          <HeroScene scrollProgress={scrollYProgress} />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: 400,
              height: 400,
              top: "10%",
              left: "10%",
              backgroundColor: "var(--primary)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: 350,
              height: 350,
              top: "40%",
              right: "10%",
              backgroundColor: "var(--accent)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: 300,
              height: 300,
              bottom: "10%",
              left: "40%",
              backgroundColor: "var(--success)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
          }}
        >
          <span>&#128737;&#65039;</span> Securing campus laptops in real-time
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          Secure Every Laptop
          <br />
          <span className="gradient-text">At Every Gate</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--muted)" }}
        >
          A modern gate-management system that tracks, verifies, and secures
          every laptop entering and leaving your campus -- instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-shadow"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow:
                  "0 4px 14px 0 rgba(37, 99, 235, 0.4)",
              }}
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base border-2 transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              Staff Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
