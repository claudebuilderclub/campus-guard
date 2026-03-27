"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import RealisticLaptop from "./RealisticLaptop";

/* ── Student card mock data ── */
const STUDENT_CARDS = [
  { name: "Alice Chen", detail: "CS — Laptop #4821", color: "bg-blue-500" },
  { name: "Omar Khalid", detail: "EE — Laptop #1037", color: "bg-emerald-500" },
  { name: "Sofia Reyes", detail: "BIO — Laptop #7294", color: "bg-purple-500" },
];

/* ── Floating glass labels ── */
const FLOATING_LABELS = [
  {
    text: "Instant Search",
    position: "top-[8%] right-[2%] md:right-[8%]",
    enterFrom: { x: 120, y: -40 },
  },
  {
    text: "Real-time",
    position: "bottom-[12%] left-[2%] md:left-[8%]",
    enterFrom: { x: -120, y: 40 },
  },
  {
    text: "Secure",
    position: "top-[8%] left-[2%] md:left-[8%]",
    enterFrom: { x: -120, y: -40 },
  },
];

const CAMPUS_GUARD_TEXT = "Campus Guard";

export default function DashboardScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Typing: "Campus Guard" (0 → 0.2) ── */
  const visibleChars = useTransform(progress, [0, 0.2], [0, CAMPUS_GUARD_TEXT.length]);

  /* ── Search bar slides in from left (0.2 → 0.4) ── */
  const searchX = useTransform(progress, [0.2, 0.4], [-300, 0]);
  const searchOpacity = useTransform(progress, [0.2, 0.35], [0, 1]);

  /* ── Student cards pop in one by one (0.4 → 0.6) ── */
  const card0Scale = useTransform(progress, [0.4, 0.48], [0, 1]);
  const card0Opacity = useTransform(progress, [0.4, 0.48], [0, 1]);
  const card1Scale = useTransform(progress, [0.47, 0.54], [0, 1]);
  const card1Opacity = useTransform(progress, [0.47, 0.54], [0, 1]);
  const card2Scale = useTransform(progress, [0.53, 0.6], [0, 1]);
  const card2Opacity = useTransform(progress, [0.53, 0.6], [0, 1]);
  const cardStyles = [
    { scale: card0Scale, opacity: card0Opacity },
    { scale: card1Scale, opacity: card1Opacity },
    { scale: card2Scale, opacity: card2Opacity },
  ];

  /* ── Green checkmark (0.6 → 0.8) with bounce ── */
  const checkScale = useTransform(progress, [0.6, 0.7, 0.75, 0.8], [0, 1.3, 0.9, 1]);
  const checkOpacity = useTransform(progress, [0.6, 0.68], [0, 1]);

  /* ── Floating labels (start AFTER cards appear) ── */
  const label0X = useTransform(progress, [0.5, 0.7], [FLOATING_LABELS[0].enterFrom.x, 0]);
  const label0Y = useTransform(progress, [0.5, 0.7], [FLOATING_LABELS[0].enterFrom.y, 0]);
  const label0Opacity = useTransform(progress, [0.5, 0.65], [0, 1]);
  const label0Float = useTransform(progress, [0.7, 1.0], [0, -8]);

  const label1X = useTransform(progress, [0.6, 0.8], [FLOATING_LABELS[1].enterFrom.x, 0]);
  const label1Y = useTransform(progress, [0.6, 0.8], [FLOATING_LABELS[1].enterFrom.y, 0]);
  const label1Opacity = useTransform(progress, [0.6, 0.75], [0, 1]);
  const label1Float = useTransform(progress, [0.8, 1.0], [0, 6]);

  const label2X = useTransform(progress, [0.7, 0.9], [FLOATING_LABELS[2].enterFrom.x, 0]);
  const label2Y = useTransform(progress, [0.7, 0.9], [FLOATING_LABELS[2].enterFrom.y, 0]);
  const label2Opacity = useTransform(progress, [0.7, 0.85], [0, 1]);
  const label2Float = useTransform(progress, [0.9, 1.0], [0, -6]);

  const labelAnimations = [
    { x: label0X, y: label0Y, opacity: label0Opacity, float: label0Float },
    { x: label1X, y: label1Y, opacity: label1Opacity, float: label1Float },
    { x: label2X, y: label2Y, opacity: label2Opacity, float: label2Float },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* ── Floating glass-morphism labels ── */}
      {FLOATING_LABELS.map((label, i) => {
        const anim = labelAnimations[i];
        return (
          <motion.div
            key={label.text}
            className={`absolute ${label.position} z-20`}
            style={{
              x: anim.x,
              y: anim.float,
              opacity: anim.opacity,
            }}
          >
            <motion.div
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white/90 font-medium shadow-lg"
              style={{ y: anim.y }}
            >
              {label.text}
            </motion.div>
          </motion.div>
        );
      })}

      {/* ── Laptop with RealisticLaptop component ── */}
      <RealisticLaptop rotateX={15} rotateY={-5}>
        {/* ── Dashboard screen content ── */}
        <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
          {/* Screen glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.3) 0%, transparent 60%)",
            }}
          />

          <div className="relative p-3 md:p-5 h-full flex flex-col">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
              <div className="w-2 h-2 rounded-full bg-green-400/80" />
            </div>

            {/* Typing "Campus Guard" */}
            <div className="text-center mb-2 md:mb-3">
              <TypingText
                text={CAMPUS_GUARD_TEXT}
                visibleChars={visibleChars}
              />
            </div>

            {/* Search bar */}
            <motion.div
              className="mx-auto w-[85%] h-5 md:h-6 rounded-md bg-white/10 border border-white/15 flex items-center px-2 gap-1.5 mb-2 md:mb-3"
              style={{ x: searchX, opacity: searchOpacity }}
            >
              {/* Search icon */}
              <svg
                viewBox="0 0 16 16"
                className="w-2.5 h-2.5 text-white/40 fill-current"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
              </svg>
              <div className="h-2 w-20 bg-white/15 rounded" />
            </motion.div>

            {/* Student result cards */}
            <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
              {STUDENT_CARDS.map((card, i) => (
                <motion.div
                  key={card.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-2 py-1.5"
                  style={{
                    scale: cardStyles[i].scale,
                    opacity: cardStyles[i].opacity,
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${card.color} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[8px] md:text-[10px] text-white/80 font-medium truncate">
                      {card.name}
                    </div>
                    <div className="text-[7px] md:text-[9px] text-white/40 truncate">
                      {card.detail}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Green checkmark */}
              <motion.div
                className="flex items-center justify-center mt-1"
                style={{
                  scale: checkScale,
                  opacity: checkOpacity,
                }}
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3 h-3 md:w-4 md:h-4 text-green-400 fill-current"
                  >
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </RealisticLaptop>
    </div>
  );
}

/* ── Typing text sub-component ── */
function TypingText({
  text,
  visibleChars,
}: {
  text: string;
  visibleChars: MotionValue<number>;
}) {
  const displayText = useTransform(visibleChars, (v) => {
    const count = Math.floor(v);
    return text.slice(0, count);
  });

  const cursorOpacity = useTransform(visibleChars, (v) =>
    v < text.length ? 1 : 0
  );

  return (
    <span className="inline-flex items-center font-mono text-[10px] md:text-sm text-blue-400 font-bold tracking-wider">
      <motion.span>{displayText}</motion.span>
      <motion.span
        className="inline-block w-[1px] h-3 md:h-4 bg-blue-400 ml-0.5"
        style={{ opacity: cursorOpacity }}
      />
    </span>
  );
}
