"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface RealisticLaptopProps {
  children?: ReactNode;
  rotateX?: MotionValue<number> | number;
  rotateY?: MotionValue<number> | number;
  scale?: MotionValue<number> | number;
  className?: string;
}

// Keyboard layout: 5 rows with varying key counts
const KEYBOARD_ROWS = [
  { keys: 14, height: "h-[10px]" },  // Function row
  { keys: 14, height: "h-[14px]" },  // Number row
  { keys: 13, height: "h-[14px]" },  // QWERTY row
  { keys: 12, height: "h-[14px]" },  // ASDF row
  { keys: 10, height: "h-[14px]" },  // ZXCV row
];

function KeyboardGrid() {
  return (
    <div className="flex flex-col gap-[2px] w-[85%] mx-auto">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-[2px] justify-center">
          {Array.from({ length: row.keys }).map((_, keyIdx) => (
            <div
              key={keyIdx}
              className={`${row.height} flex-1 rounded-[2px]`}
              style={{
                backgroundColor: "#2a2a2a",
                boxShadow: "inset 0 -1px 0 #111, 0 1px 1px rgba(0,0,0,0.3)",
                maxWidth: rowIdx === 0 ? "16px" : "22px",
              }}
            />
          ))}
        </div>
      ))}
      {/* Space bar row */}
      <div className="flex gap-[2px] justify-center">
        <div className="h-[14px] flex-1 max-w-[18px] rounded-[2px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
        <div className="h-[14px] flex-1 max-w-[18px] rounded-[2px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
        <div className="h-[14px] flex-[5] max-w-[120px] rounded-[2px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
        <div className="h-[14px] flex-1 max-w-[18px] rounded-[2px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
        <div className="h-[14px] flex-1 max-w-[18px] rounded-[2px]" style={{ backgroundColor: "#2a2a2a", boxShadow: "inset 0 -1px 0 #111" }} />
      </div>
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto mt-[6px] rounded-md"
      style={{
        width: "38%",
        height: "50px",
        background: "linear-gradient(180deg, #d1d1d1 0%, #c4c4c4 100%)",
        border: "1px solid #b0b0b0",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.1)",
      }}
    />
  );
}

export default function RealisticLaptop({
  children,
  rotateX = 15,
  rotateY = -5,
  scale = 1,
  className = "",
}: RealisticLaptopProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
        className="w-[520px] md:w-[600px] lg:w-[680px]"
      >
        {/* ── SCREEN / LID ── */}
        <div className="relative w-full aspect-[16/10]">
          {/* Outer bezel (dark frame) */}
          <div
            className="absolute inset-0 rounded-t-xl overflow-hidden"
            style={{
              backgroundColor: "#1a1a1a",
              padding: "8px 8px 6px 8px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Camera notch */}
            <div className="absolute top-[3px] left-1/2 -translate-x-1/2 z-20">
              <div
                className="w-[6px] h-[6px] rounded-full"
                style={{
                  backgroundColor: "#0a0a0a",
                  boxShadow: "inset 0 0 2px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)",
                }}
              />
            </div>

            {/* Inner screen area */}
            <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-[#0c0c0c]">
              {/* Screen content (children) */}
              <div className="relative w-full h-full z-10">
                {children || (
                  <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
                )}
              </div>

              {/* Screen reflection overlay (glass effect) */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
                }}
              />
            </div>
          </div>

          {/* Lid bottom edge (metallic strip) */}
          <div
            className="absolute bottom-0 left-[3%] right-[3%] h-[2px]"
            style={{
              background: "linear-gradient(90deg, #888 0%, #aaa 50%, #888 100%)",
            }}
          />
        </div>

        {/* ── HINGE ── */}
        <div
          className="w-[97%] mx-auto h-[3px]"
          style={{
            background: "linear-gradient(180deg, #666 0%, #999 50%, #888 100%)",
            borderRadius: "0 0 2px 2px",
          }}
        />

        {/* ── BASE / KEYBOARD DECK ── */}
        <div
          className="w-full rounded-b-xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #d4d4d4 0%, #c0c0c0 30%, #b8b8b8 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)",
            padding: "10px 12px 8px 12px",
          }}
        >
          {/* Keyboard */}
          <KeyboardGrid />

          {/* Trackpad */}
          <Trackpad />

          {/* Bottom edge detail */}
          <div className="mt-2 flex justify-center">
            <div className="w-[15%] h-[2px] rounded-full" style={{ backgroundColor: "#a0a0a0" }} />
          </div>
        </div>

        {/* ── SHADOW ── */}
        <div
          className="absolute -bottom-6 left-[10%] right-[10%] h-8 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>
    </div>
  );
}
