"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  BrainCircuit,
  ShieldCheck,
  CreditCard,
  Cloud,
  Users,
  LucideIcon,
} from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  BrainCircuit,
  ShieldCheck,
  CreditCard,
  Cloud,
  Users,
};

export function Achievements() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            What I&apos;ve accomplished
          </p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Key <span className="accent-text">Achievements</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Milestones and highlights from my journey as a developer.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 + i * 0.07 }}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
