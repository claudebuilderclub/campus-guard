"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Quick Registration",
    description:
      "Students register their laptops in seconds with a simple form. Serial numbers, brands, and colors are stored securely.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    iconBg: "var(--primary-light)",
    initial: { opacity: 0, x: -60 },
  },
  {
    title: "Instant Verification",
    description:
      "Gate staff can verify any laptop in real-time by searching serial numbers. Instant results, zero delays.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M8 11l2 2 4-4" />
      </svg>
    ),
    iconBg: "#ede9fe",
    initial: { opacity: 0, y: 60 },
  },
  {
    title: "Activity Tracking",
    description:
      "Every gate check-in is logged with timestamps and location. Comprehensive analytics for campus security.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--success)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    iconBg: "var(--success-light)",
    initial: { opacity: 0, x: 60 },
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "var(--foreground)" }}
          >
            Why <span className="gradient-text">Campus Guard</span>?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Built for campuses that take laptop security seriously.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={feature.initial}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="rounded-2xl p-8 border shadow-sm"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: feature.iconBg }}
              >
                {feature.icon}
              </motion.div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                {feature.title}
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
