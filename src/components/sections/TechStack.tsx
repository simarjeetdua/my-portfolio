"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TECH_CATEGORIES } from "@/lib/constants";
import { TechMarquee } from "@/components/shared/TechMarquee";

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const currentCategory = TECH_CATEGORIES.find((c) => c.label === activeCategory);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
            My toolkit
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Tech{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Technologies I use to build modern, scalable, and AI-powered applications.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.label
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {activeCategory === cat.label && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/30 to-blue-600/20 border border-violet-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tech cards grid */}
        <div className="min-h-[200px]">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          >
            {currentCategory?.items.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/[0.05] cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl"
                  style={{ backgroundColor: `${tech.color}15` }}
                />
                <span className="relative text-3xl">{tech.icon}</span>
                <span className="relative text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Marquee */}
        <TechMarquee />
      </div>
    </section>
  );
}
