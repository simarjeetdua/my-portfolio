"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      {/* Background blob */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-600/8 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-blue-600/8 blur-[100px]" />
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
            What I&apos;ve accomplished
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Key milestones and highlights from my journey as a developer.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} p-6 backdrop-blur-sm transition-all`}
            >
              {/* Shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 translate-x-[-100%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

              <div className="relative">
                {/* Emoji */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                  {item.emoji}
                </div>

                {/* Title */}
                <h3 className="mb-2 font-semibold text-white/90 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/45">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
