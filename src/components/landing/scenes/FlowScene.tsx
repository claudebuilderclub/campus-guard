"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export default function FlowScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // ── Step 1: Register (0 - 0.33) ──────────────────────────────────

  const step1Opacity = useTransform(progress, [0, 0.05, 0.3, 0.36], [0, 1, 1, 0]);
  const cardX = useTransform(progress, [0, 0.15], [300, 50]);
  const cardOpacity = useTransform(progress, [0, 0.08], [0, 1]);
  const fieldWidth1 = useTransform(progress, [0.15, 0.25], ["0%", "100%"]);
  const fieldWidth2 = useTransform(progress, [0.18, 0.27], ["0%", "100%"]);
  const checkScale1 = useTransform(progress, [0.28, 0.32], [0, 1]);
  const checkOpacity1 = useTransform(progress, [0.28, 0.3], [0, 1]);
  const text1X = useTransform(progress, [0.2, 0.33], [-100, 0]);
  const text1Opacity = useTransform(progress, [0.2, 0.28], [0, 1]);

  // ── Step 2: Verify (0.33 - 0.66) ─────────────────────────────────
  const step2Opacity = useTransform(progress, [0.33, 0.38, 0.63, 0.68], [0, 1, 1, 0]);
  const glassX = useTransform(progress, [0.33, 0.42], [-300, 0]);
  const glassOpacity = useTransform(progress, [0.33, 0.38], [0, 1]);
  const scanLineX = useTransform(progress, [0.4, 0.55], ["-100%", "100%"]);
  const scanLineOpacity = useTransform(progress, [0.4, 0.42, 0.53, 0.55], [0, 1, 1, 0]);
  const detailCardScale = useTransform(progress, [0.53, 0.58], [0, 1]);
  const detailCardOpacity = useTransform(progress, [0.53, 0.56], [0, 1]);
  const text2X = useTransform(progress, [0.45, 0.58], [200, 0]);
  const text2Opacity = useTransform(progress, [0.45, 0.52], [0, 1]);

  // ── Step 3: Access (0.66 - 1.0) ───────────────────────────────────
  const step3Opacity = useTransform(progress, [0.66, 0.72, 0.95, 1], [0, 1, 1, 1]);
  const gateY = useTransform(progress, [0.66, 0.76], [200, 0]);
  const gateRotate = useTransform(progress, [0.76, 0.84], [0, -45]);
  const gateOpacity = useTransform(progress, [0.66, 0.7], [0, 1]);
  const greenGlowScale = useTransform(progress, [0.78, 0.9], [0, 1.5]);
  const greenGlowOpacity = useTransform(progress, [0.78, 0.88], [0, 0.4]);
  const accessTextScale = useTransform(progress, [0.82, 0.88, 0.92], [0, 1.2, 1]);
  const accessTextOpacity = useTransform(progress, [0.82, 0.86], [0, 1]);
  const shieldScale = useTransform(progress, [0.88, 0.94], [0, 1]);
  const shieldOpacity = useTransform(progress, [0.88, 0.91], [0, 1]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ═══════════ STEP 1: REGISTER ═══════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: step1Opacity }}
      >
        {/* Text — left side */}
        <motion.div
          className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 z-10"
          style={{ x: text1X, opacity: text1Opacity }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2563eb]">
            Register Once
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-xs">
            One-time sign-up with your student ID — takes seconds.
          </p>
        </motion.div>

        {/* ID Card — right side */}
        <motion.div
          className="absolute right-[8%] md:right-[15%] top-1/2 -translate-y-1/2"
          style={{ x: cardX, opacity: cardOpacity }}
        >
          <div className="relative w-56 md:w-72 h-36 md:h-44 rounded-2xl border-2 border-[#2563eb]/40 bg-[#2563eb]/5 backdrop-blur-sm shadow-xl shadow-[#2563eb]/10 p-5">
            {/* Avatar circle */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2563eb]/20 border-2 border-[#2563eb]/30 mb-3" />
            {/* Typing fields */}
            <motion.div
              className="h-2 rounded-full bg-[#2563eb]/30 mb-2"
              style={{ width: fieldWidth1 }}
            />
            <motion.div
              className="h-2 rounded-full bg-[#2563eb]/20"
              style={{ width: fieldWidth2 }}
            />
            {/* Checkmark */}
            <motion.div
              className="absolute top-3 right-3"
              style={{ scale: checkScale1, opacity: checkOpacity1 }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" opacity={0.2} fill="#2563eb" />
                <path d="M8 12l3 3 5-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════ STEP 2: VERIFY ═══════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: step2Opacity }}
      >
        {/* Magnifying glass — left side */}
        <motion.div
          className="absolute left-[8%] md:left-[15%] top-1/2 -translate-y-1/2"
          style={{ x: glassX, opacity: glassOpacity }}
        >
          <div className="relative">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="md:w-[160px] md:h-[160px]"
            >
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#7c3aed"
                strokeWidth="3"
                opacity={0.3}
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#7c3aed"
                strokeWidth="3"
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
              className="absolute top-[25%] left-[10%] w-[55%] h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent"
              style={{ x: scanLineX, opacity: scanLineOpacity }}
            />
          </div>

          {/* Details card pops from scan */}
          <motion.div
            className="absolute -right-32 md:-right-40 top-1/2 -translate-y-1/2 w-48 md:w-56 rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/5 backdrop-blur-sm p-4 shadow-lg shadow-[#7c3aed]/10"
            style={{ scale: detailCardScale, opacity: detailCardOpacity }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30" />
              <div>
                <div className="h-2 w-20 rounded bg-[#7c3aed]/30 mb-1" />
                <div className="h-1.5 w-14 rounded bg-[#7c3aed]/15" />
              </div>
            </div>
            <div className="h-1.5 w-full rounded bg-[#7c3aed]/15 mb-1.5" />
            <div className="h-1.5 w-3/4 rounded bg-[#7c3aed]/10" />
            <div className="mt-2 text-[10px] font-bold text-[#7c3aed]/60 uppercase tracking-wider">
              Verified
            </div>
          </motion.div>
        </motion.div>

        {/* Text — right side */}
        <motion.div
          className="absolute right-[8%] md:right-[12%] top-1/2 -translate-y-1/2 text-right z-10"
          style={{ x: text2X, opacity: text2Opacity }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#7c3aed]">
            Verify Anywhere
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-xs ml-auto">
            Guards scan and confirm identity in real time.
          </p>
        </motion.div>
      </motion.div>

      {/* ═══════════ STEP 3: ACCESS ═══════════ */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: step3Opacity }}
      >
        {/* Green glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ scale: greenGlowScale, opacity: greenGlowOpacity }}
        >
          <div className="w-[500px] h-[500px] rounded-full bg-radial from-[#059669]/40 to-transparent" />
        </motion.div>

        {/* Gate barrier */}
        <motion.div
          className="relative mb-8"
          style={{ y: gateY, opacity: gateOpacity }}
        >
          <motion.div
            className="w-48 md:w-64 h-3 rounded-full bg-gradient-to-r from-[#059669] to-[#059669]/60 shadow-lg shadow-[#059669]/30"
            style={{ rotate: gateRotate, transformOrigin: "left center" }}
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
            width="80"
            height="90"
            viewBox="0 0 80 90"
            fill="none"
            className="drop-shadow-lg"
          >
            <path
              d="M40 5 L70 20 V50 C70 65 55 78 40 85 C25 78 10 65 10 50 V20 Z"
              fill="#059669"
              opacity={0.15}
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
