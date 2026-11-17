"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TECH_CATEGORIES } from "@/lib/constants";
import Image from "next/image";

function TechItem({
  name,
  logo,
  fallback,
}: {
  name: string;
  logo: string | null;
  fallback?: string;
}) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md cursor-default"
    >
      <div className="flex h-9 w-9 items-center justify-center">
        {logo && !imgErr ? (
          <Image
            src={logo}
            alt={name}
            width={32}
            height={32}
            className="h-7 w-7 object-contain"
            onError={() => setImgErr(true)}
            unoptimized
          />
        ) : (
          <span className="text-2xl leading-none">{fallback ?? "⚙️"}</span>
        )}
      </div>
      <span className="text-center text-xs font-medium text-gray-600 leading-tight group-hover:text-gray-900 transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Languages");

  const currentCategory = TECH_CATEGORIES.find((c) => c.label === activeCategory);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            My toolkit
          </p>
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.label
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="min-h-[220px]">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
          >
            {currentCategory?.items.map((tech) => (
              <TechItem
                key={tech.name}
                name={tech.name}
                logo={"logo" in tech ? tech.logo : null}
                fallback={"fallback" in tech ? (tech as { fallback?: string }).fallback : undefined}
              />
            ))}
          </motion.div>
        </div>

        {/* Special callout for AI & Agents */}
        {activeCategory === "AI & Agents" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
      </div>
    </section>
  );
}
