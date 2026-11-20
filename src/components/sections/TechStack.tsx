"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TECH_CATEGORIES } from "@/lib/constants";
import Image from "next/image";
import { viewportOnce } from "@/lib/animations";

function TechItem({ name, logo, fallback, index }: { name: string; logo: string | null; fallback?: string; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(79,70,229,0.12)", borderColor: "#a5b4fc" }}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors cursor-default"
    >
      <motion.div
        className="flex h-9 w-9 items-center justify-center"
        whileHover={{ scale: 1.2, rotate: 6 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {logo && !imgErr ? (
          <Image
            src={logo} alt={name} width={32} height={32}
            className="h-7 w-7 object-contain"
            onError={() => setImgErr(true)}
            unoptimized
          />
        ) : (
          <span className="text-2xl leading-none">{fallback ?? "⚙️"}</span>
        )}
      </motion.div>
      <span className="text-center text-xs font-medium text-gray-600 leading-tight group-hover:text-indigo-700 transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  const [activeCategory, setActiveCategory] = useState("Languages");

  const currentCategory = TECH_CATEGORIES.find((c) => c.label === activeCategory);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Orb */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-50/80 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.p
            className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            My toolkit
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Tech <span className="accent-text">Stack</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Technologies I use to build scalable, modern, and AI-powered applications.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {TECH_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.label
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {activeCategory === cat.label && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-lg bg-indigo-600"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Animated grid */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
            >
              {currentCategory?.items.map((tech, i) => (
                <TechItem
                  key={tech.name}
                  name={tech.name}
                  logo={"logo" in tech ? tech.logo : null}
                  fallback={"fallback" in tech ? (tech as { fallback?: string }).fallback : undefined}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI & Agents callout */}
        <AnimatePresence>
          {activeCategory === "AI & Agents" && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4"
            >
              <p className="text-sm font-semibold text-indigo-800 mb-1">
                MCP & Multi-Agent Orchestration
              </p>
              <p className="text-sm text-indigo-700">
                Building Model Context Protocol (MCP) servers that expose tools and resources to AI
                agents. Designing multi-agent workflows where autonomous agents collaborate to
                complete complex tasks — combining LLM reasoning, tool use, and memory.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
