"use client";

import { motion, type MotionValue } from "framer-motion";
import { type ReactNode } from "react";

/**
 * MacBookFrame — A realistic front-view MacBook mockup.
 *
 * Flat front view, proper 16:10 screen proportions, thin bezels,
 * centered notch, simplified keyboard texture, and trackpad.
 * The lid can be animated open/closed via lidRotateX.
 */

interface MacBookFrameProps {
  children?: ReactNode;
  lidRotateX?: MotionValue<number> | number;
  scale?: MotionValue<number> | number;
  translateY?: MotionValue<number> | number;
  bezelOpacity?: MotionValue<number> | number;
  baseOpacity?: MotionValue<number> | number;
  opacity?: MotionValue<number> | number;
  className?: string;
}

export default function MacBookFrame({
  children,
  lidRotateX = 0,
  scale = 1,
  translateY = 0,
  bezelOpacity = 1,
  baseOpacity = 1,
  opacity = 1,
  className = "",
}: MacBookFrameProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        scale,
        y: translateY,
        opacity,
      }}
    >
      <div className="relative w-[340px] sm:w-[460px] md:w-[580px] lg:w-[660px]">
        {/* ═══ LID (screen half) — rotates open/closed ═══ */}
        <div style={{ perspective: 900 }}>
          <motion.div
            style={{
              rotateX: lidRotateX,
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Bezel frame */}
            <motion.div
              className="relative w-full rounded-t-[10px] sm:rounded-t-[14px] overflow-hidden"
              style={{
                opacity: bezelOpacity,
                aspectRatio: "16 / 10.3",
                backgroundColor: "#1c1c1e",
                padding: "5px 5px 4px 5px",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                style={{
                  width: 52,
                  height: 13,
                  backgroundColor: "#1c1c1e",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: "#0a0a0c",
                    boxShadow: "inset 0 0 1px rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              {/* ── SCREEN AREA ── */}
              <div
                className="relative w-full h-full overflow-hidden bg-[#080808]"
                style={{ borderRadius: 6 }}
              >
                {children}
              </div>
            </motion.div>

            {/* Chin strip (below screen, part of lid) */}
            <motion.div
              className="w-[94%] mx-auto h-[1.5px]"
              style={{
                opacity: bezelOpacity,
                background: "linear-gradient(90deg, #555 0%, #888 50%, #555 100%)",
              }}
            />
          </motion.div>
        </div>

        {/* ═══ HINGE ═══ */}
        <motion.div
          className="w-[97%] mx-auto h-[3px]"
          style={{
            opacity: baseOpacity,
            background: "linear-gradient(180deg, #666 0%, #999 40%, #888 100%)",
            borderRadius: "0 0 1px 1px",
          }}
        />

        {/* ═══ BASE (keyboard half) ═══ */}
        <motion.div
          className="w-full rounded-b-[10px] sm:rounded-b-[14px] overflow-hidden"
          style={{
            opacity: baseOpacity,
            background: "linear-gradient(180deg, #d2d2d2 0%, #c4c4c4 40%, #b8b8b8 100%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.12)",
          }}
        >
          {/* Keyboard area — simplified texture, not individual keys */}
          <div className="px-[7%] pt-[5px] pb-[3px]">
            <div
              className="w-full rounded-[4px] overflow-hidden"
              style={{
                height: "clamp(36px, 6vw, 60px)",
                backgroundColor: "#2a2a2a",
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 10px,
                    rgba(0,0,0,0.25) 10px,
                    rgba(0,0,0,0.25) 11px
                  )
                `,
                filter: "blur(0.2px)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Trackpad */}
          <div className="flex justify-center pb-[6px] pt-[2px]">
            <div
              className="rounded-md"
              style={{
                width: "38%",
                height: "clamp(22px, 3.5vw, 38px)",
                background: "linear-gradient(180deg, #d0d0d0 0%, #c2c2c2 100%)",
                border: "1px solid #aaa",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.08)",
              }}
            />
          </div>

          {/* Bottom notch (front lip) */}
          <div className="flex justify-center pb-[4px]">
            <div
              className="rounded-full"
              style={{
                width: "12%",
                height: 2,
                backgroundColor: "#a0a0a0",
              }}
            />
          </div>
        </motion.div>

        {/* ═══ SHADOW ═══ */}
        <motion.div
          className="absolute -bottom-3 left-[10%] right-[10%] h-5 rounded-full"
          style={{
            opacity: baseOpacity,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
    </motion.div>
  );
}
