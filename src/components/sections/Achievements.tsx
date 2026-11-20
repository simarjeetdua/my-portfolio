"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers, BrainCircuit, ShieldCheck, CreditCard, Cloud, Users, LucideIcon,
} from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, BrainCircuit, ShieldCheck, CreditCard, Cloud, Users,
};

export function Achievements() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section id="achievements" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Animated background orb */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-96 rounded-full bg-indigo-50/80 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
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
            What I&apos;ve accomplished
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Key <span className="accent-text">Achievements</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Milestones and highlights from my journey as a developer.
          </p>
        </motion.div>

        {/* Cards — stagger grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ACHIEVEMENTS.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Layers;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(79,70,229,0.12)",
                  borderColor: "#a5b4fc",
                }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm cursor-default"
              >
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600"
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon size={20} />
                </motion.div>
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
        </motion.div>
      </div>
    </section>
  );
}
