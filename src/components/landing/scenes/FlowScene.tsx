"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/* ── Step number badge ── */
function StepBadge({
  number,
  color,
  scale,
  opacity,
}: {
  number: number;
  color: string;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-black text-lg md:text-xl"
      style={{
        width: 48,
        height: 48,
        scale,
        opacity,
        backgroundColor: `${color}15`,
        border: `2px solid ${color}40`,
        color,
        boxShadow: `0 0 30px ${color}20`,
      }}
    >
      {number}
    </motion.div>
  );
}

export default function FlowScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // ── Step 1: Register (0 - 0.33) ──────────────────────────────────
  const step1Opacity = useTransform(progress, [0, 0.05, 0.3, 0.36], [0, 1, 1, 0]);

  const badge1Scale = useTransform(progress, [0, 0.08, 0.12], [0, 1.2, 1]);
  const badge1Opacity = useTransform(progress, [0, 0.06], [0, 1]);

  const cardX = useTransform(progress, [0.05, 0.18], [200, 0]);
  const cardOpacity = useTransform(progress, [0.05, 0.12], [0, 1]);
  const fieldWidth1 = useTransform(progress, [0.15, 0.25], ["0%", "100%"]);
  const fieldWidth2 = useTransform(progress, [0.18, 0.27], ["0%", "100%"]);
  const checkScale1 = useTransform(progress, [0.28, 0.32], [0, 1]);
  const checkOpacity1 = useTransform(progress, [0.28, 0.3], [0, 1]);
  const text1X = useTransform(progress, [0.08, 0.2], [-80, 0]);
  const text1Opacity = useTransform(progress, [0.08, 0.16], [0, 1]);
  const subtitle1Opacity = useTransform(progress, [0.14, 0.22], [0, 1]);
  const subtitle1Y = useTransform(progress, [0.14, 0.22], [15, 0]);

  // ── Connecting line 1→2 (0.28 → 0.38) ──
  const line1Width = useTransform(progress, [0.28, 0.38], ["0%", "100%"]);
  const line1Opacity = useTransform(progress, [0.28, 0.32, 0.36, 0.38], [0, 1, 1, 0]);

  // ── Step 2: Verify (0.33 - 0.66) ─────────────────────────────────
  const step2Opacity = useTransform(progress, [0.33, 0.38, 0.63, 0.68], [0, 1, 1, 0]);

  const badge2Scale = useTransform(progress, [0.33, 0.41, 0.45], [0, 1.2, 1]);
  const badge2Opacity = useTransform(progress, [0.33, 0.39], [0, 1]);

  const glassX = useTransform(progress, [0.36, 0.46], [-200, 0]);
  const glassOpacity = useTransform(progress, [0.36, 0.42], [0, 1]);
  const scanLineX = useTransform(progress, [0.44, 0.55], ["-100%", "100%"]);
  const scanLineOpacity = useTransform(progress, [0.44, 0.46, 0.53, 0.55], [0, 1, 1, 0]);
  const detailCardScale = useTransform(progress, [0.53, 0.58], [0, 1]);
  const detailCardOpacity = useTransform(progress, [0.53, 0.56], [0, 1]);
  const text2X = useTransform(progress, [0.42, 0.54], [120, 0]);
  const text2Opacity = useTransform(progress, [0.42, 0.5], [0, 1]);
  const subtitle2Opacity = useTransform(progress, [0.48, 0.56], [0, 1]);
  const subtitle2Y = useTransform(progress, [0.48, 0.56], [15, 0]);

  // ── Connecting line 2→3 (0.6 → 0.7) ──
  const line2Width = useTransform(progress, [0.6, 0.7], ["0%", "100%"]);
  const line2Opacity = useTransform(progress, [0.6, 0.64, 0.68, 0.7], [0, 1, 1, 0]);

  // ── Step 3: Access (0.66 - 1.0) ───────────────────────────────────
  const step3Opacity = useTransform(progress, [0.66, 0.72, 0.95, 1], [0, 1, 1, 1]);

  const badge3Scale = useTransform(progress, [0.66, 0.74, 0.78], [0, 1.2, 1]);
  const badge3Opacity = useTransform(progress, [0.66, 0.72], [0, 1]);

  const gateY = useTransform(progress, [0.7, 0.8], [120, 0]);
  const gateRotate = useTransform(progress, [0.8, 0.88], [0, -45]);
  const gateOpacity = useTransform(progress, [0.7, 0.76], [0, 1]);
  const greenGlowScale = useTransform(progress, [0.82, 0.92], [0, 1.5]);
  const greenGlowOpacity = useTransform(progress, [0.82, 0.9], [0, 0.4]);
  const accessTextScale = useTransform(progress, [0.85, 0.9, 0.94], [0, 1.15, 1]);
  const accessTextOpacity = useTransform(progress, [0.85, 0.89], [0, 1]);
  const shieldScale = useTransform(progress, [0.9, 0.96], [0, 1]);
  const shieldOpacity = useTransform(progress, [0.9, 0.93], [0, 1]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ═══════════ STEP 1: REGISTER ═══════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: step1Opacity }}
      >
        {/* Text — left side */}
        <motion.div
          className="absolute left-[6%] md:left-[12%] top-1/2 -translate-y-1/2 z-10"
          style={{ x: text1X, opacity: text1Opacity }}
        >
          <StepBadge number={1} color="#2563eb" scale={badge1Scale} opacity={badge1Opacity} />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2563eb] mt-4">
            Register Once
          </h2>
          <motion.p
            className="text-muted-foreground mt-2 text-sm md:text-base max-w-xs leading-relaxed"
            style={{ opacity: subtitle1Opacity, y: subtitle1Y }}
          >
            One-time sign-up with your student ID — takes seconds.
          </motion.p>
        </motion.div>

        {/* ID Card — right side */}
        <motion.div
          className="absolute right-[6%] md:right-[14%] top-1/2 -translate-y-1/2"
          style={{ x: cardX, opacity: cardOpacity }}
        >
          <div className="relative w-56 md:w-72 h-36 md:h-44 rounded-2xl border border-[#2563eb]/30 bg-gradient-to-br from-[#2563eb]/[0.08] to-[#2563eb]/[0.02] backdrop-blur-sm shadow-2xl shadow-[#2563eb]/10 p-5">
            {/* Decorative corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2563eb]/30 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2563eb]/30 rounded-tr-lg" />
            {/* Avatar circle */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2563eb]/30 to-[#2563eb]/10 border-2 border-[#2563eb]/30 mb-3" />
            {/* Typing fields */}
            <motion.div
              className="h-2.5 rounded-full bg-gradient-to-r from-[#2563eb]/40 to-[#2563eb]/20 mb-2.5"
              style={{ width: fieldWidth1 }}
            />
            <motion.div
              className="h-2 rounded-full bg-[#2563eb]/15"
              style={{ width: fieldWidth2 }}
            />
            {/* Checkmark */}
            <motion.div
              className="absolute top-3 right-3"
              style={{ scale: checkScale1, opacity: checkOpacity1 }}
            >
              <div className="w-7 h-7 rounded-full bg-[#2563eb]/15 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12l3 3 5-6" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Connecting line 1 → 2 ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] z-30"
        style={{
          width: line1Width,
          opacity: line1Opacity,
          maxWidth: 200,
          background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          boxShadow: "0 0 12px rgba(37,99,235,0.4)",
        }}
      />

      {/* ═══════════ STEP 2: VERIFY ═══════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: step2Opacity }}
      >
        {/* Magnifying glass — left side */}
        <motion.div
          className="absolute left-[6%] md:left-[14%] top-1/2 -translate-y-1/2"
          style={{ x: glassX, opacity: glassOpacity }}
        >
          <div className="relative">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="md:w-[150px] md:h-[150px]"
            >
              {/* Outer glow ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#7c3aed"
                strokeWidth="1"
                opacity={0.15}
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#7c3aed"
                strokeWidth="2.5"
                opacity={0.3}
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#7c3aed"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <line
                x1="76"
                y1="76"
                x2="105"
                y2="105"
                stroke="#7c3aed"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            {/* Scan line */}
            <motion.div
              className="absolute top-[25%] left-[10%] w-[55%] h-[2px]"
              style={{
                x: scanLineX,
                opacity: scanLineOpacity,
                background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
                boxShadow: "0 0 10px rgba(124,58,237,0.5)",
              }}
            />
          </div>

          {/* Details card pops from scan */}
          <motion.div
            className="absolute -right-32 md:-right-40 top-1/2 -translate-y-1/2 w-48 md:w-56 rounded-xl border border-[#7c3aed]/25 bg-gradient-to-br from-[#7c3aed]/[0.08] to-transparent backdrop-blur-sm p-4 shadow-xl shadow-[#7c3aed]/10"
            style={{ scale: detailCardScale, opacity: detailCardOpacity }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed]/25 to-[#7c3aed]/10 border border-[#7c3aed]/30" />
              <div>
                <div className="h-2 w-20 rounded bg-[#7c3aed]/30 mb-1" />
                <div className="h-1.5 w-14 rounded bg-[#7c3aed]/15" />
              </div>
            </div>
            <div className="h-1.5 w-full rounded bg-[#7c3aed]/15 mb-1.5" />
            <div className="h-1.5 w-3/4 rounded bg-[#7c3aed]/10" />
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
              <span className="text-[10px] font-bold text-[#7c3aed]/70 uppercase tracking-wider">
                Verified
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Text — right side */}
        <motion.div
          className="absolute right-[6%] md:right-[12%] top-1/2 -translate-y-1/2 text-right z-10"
          style={{ x: text2X, opacity: text2Opacity }}
        >
          <StepBadge number={2} color="#7c3aed" scale={badge2Scale} opacity={badge2Opacity} />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#7c3aed] mt-4">
            Verify Anywhere
          </h2>
          <motion.p
            className="text-muted-foreground mt-2 text-sm md:text-base max-w-xs ml-auto leading-relaxed"
            style={{ opacity: subtitle2Opacity, y: subtitle2Y }}
          >
            Guards scan and confirm identity in real time.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ── Connecting line 2 → 3 ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] z-30"
        style={{
          width: line2Width,
          opacity: line2Opacity,
          maxWidth: 200,
          background: "linear-gradient(90deg, #7c3aed, #059669)",
          boxShadow: "0 0 12px rgba(124,58,237,0.4)",
        }}
      />

      {/* ═══════════ STEP 3: ACCESS ═══════════ */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: step3Opacity }}
      >
        {/* Step badge */}
        <StepBadge number={3} color="#059669" scale={badge3Scale} opacity={badge3Opacity} />

        {/* Green glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ scale: greenGlowScale, opacity: greenGlowOpacity }}
        >
          <div
            className="w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(5,150,105,0.35) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Gate barrier */}
        <motion.div
          className="relative mt-6 mb-8"
          style={{ y: gateY, opacity: gateOpacity }}
        >
          <motion.div
            className="w-48 md:w-64 h-3 rounded-full shadow-lg"
            style={{
              rotate: gateRotate,
              transformOrigin: "left center",
              background: "linear-gradient(90deg, #059669, rgba(5,150,105,0.6))",
              boxShadow: "0 0 20px rgba(5,150,105,0.3)",
            }}
          />
          {/* Gate post */}
          <div className="absolute -left-2 -top-1 w-4 h-5 rounded-sm bg-[#059669]" />
        </motion.div>

        {/* Shield with checkmark */}
        <motion.div
          className="mb-6"
          style={{ scale: shieldScale, opacity: shieldOpacity }}
        >
          <svg
            width="72"
            height="82"
            viewBox="0 0 80 90"
            fill="none"
            className="drop-shadow-[0_0_20px_rgba(5,150,105,0.3)]"
          >
            <path
              d="M40 5 L70 20 V50 C70 65 55 78 40 85 C25 78 10 65 10 50 V20 Z"
              fill="#059669"
              opacity={0.12}
              stroke="#059669"
              strokeWidth="2"
            />
            <path
              d="M28 45 L36 53 L54 35"
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Text — centered */}
        <motion.div
          className="text-center z-10"
          style={{ scale: accessTextScale, opacity: accessTextOpacity }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#059669]">
            Access Granted
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Walk through — the campus is yours.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
