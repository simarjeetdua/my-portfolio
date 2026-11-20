"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cloud, Container, Network, Server, BrainCircuit, GitBranch, LucideIcon,
} from "lucide-react";
import { EXPLORING_ITEMS } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, LucideIcon> = {
  Cloud, Container, Network, Server, BrainCircuit, GitBranch,
};

export function CurrentlyExploring() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section id="exploring" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Background orb */}
      <motion.div
        className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-violet-50 blur-3xl opacity-70"
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
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
            Growth mindset
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Currently <span className="accent-text">Exploring</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Areas I&apos;m actively learning and building — from cloud engineering to AI agent systems.
          </p>
        </motion.div>

        {/* Cards — staggered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {EXPLORING_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Cloud;
            const isApplied = item.status === "Applied in projects";
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(79,70,229,0.1)",
                  borderColor: "#a5b4fc",
                }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm cursor-default"
              >
                {/* Icon + status */}
                <div className="flex items-start justify-between gap-2">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600"
                    whileHover={{ rotate: 10, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <span
                    className={`mt-0.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                      isApplied
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-blue-200 bg-blue-50 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="mb-1.5 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
