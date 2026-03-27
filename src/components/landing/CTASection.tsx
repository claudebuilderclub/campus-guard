"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      className="py-24 px-4"
      style={{
        background: "linear-gradient(135deg, var(--primary), var(--accent))",
      }}
    >
      <div className="max-w-3xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
        >
          Ready to Secure Your Campus?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-white/80 max-w-xl mx-auto"
        >
          Join hundreds of students and staff already using Campus Guard to
          protect laptops across campus gates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base transition-shadow"
              style={{
                backgroundColor: "#ffffff",
                color: "var(--primary)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base border-2 border-white/30 text-white bg-transparent transition-colors hover:bg-white/10"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
