"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPLORING_ITEMS } from "@/lib/constants";

export function CurrentlyExploring() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="exploring" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-600/8 blur-[100px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
            Growth mindset
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Currently{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Exploring
            </span>
          </h2>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-12 flex justify-center"
        >
          <motion.span
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-600/15 to-blue-600/10 px-5 py-2 text-sm font-semibold text-violet-300 shadow-lg shadow-violet-500/10"
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🚀
            </motion.span>
            Always Learning
          </motion.span>
        </motion.div>

        {/* Cards grid — 2 cols on sm, 3 cols on lg */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORING_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`group relative overflow-hidden rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} p-5 backdrop-blur-sm transition-all`}
            >
              {/* Shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 translate-x-[-100%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-semibold text-white/90">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/45">{item.description}</p>

                {/* Learning progress bar */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${25 + i * 12}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <span className="shrink-0 text-xs text-white/30">In progress</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
