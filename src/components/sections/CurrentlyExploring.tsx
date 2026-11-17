"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cloud, Container, Network, Server, BrainCircuit, GitBranch, LucideIcon,
} from "lucide-react";
import { EXPLORING_ITEMS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Cloud, Container, Network, Server, BrainCircuit, GitBranch,
};

export function CurrentlyExploring() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="exploring" className="relative py-24 sm:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Growth mindset
          </p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Currently <span className="accent-text">Exploring</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Areas I&apos;m actively learning and building — from cloud engineering to AI agent systems.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORING_ITEMS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Cloud;
            const isApplied = item.status === "Applied in projects";
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                {/* Icon + status row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                    <Icon size={20} />
                  </div>
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
        </div>
      </div>
    </section>
  );
}
