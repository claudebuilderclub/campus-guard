"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const easeOutExpo = useCallback((t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, duration, easeOutExpo]);

  return { count, ref };
}

const stats = [
  { target: 500, suffix: "+", label: "Students Protected" },
  { target: 4, suffix: "", label: "Campus Gates" },
  { target: 10000, suffix: "+", label: "Verifications" },
  { target: 99.9, suffix: "%", label: "Uptime", isDecimal: true },
];

function StatItem({
  target,
  suffix,
  label,
  isDecimal,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
  delay: number;
}) {
  const { count, ref } = useCountUp(isDecimal ? 999 : target);

  const displayValue = isDecimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold gradient-text">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm text-white/60 uppercase tracking-wider mt-2">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-24 px-4"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              isDecimal={stat.isDecimal}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
