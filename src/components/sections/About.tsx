"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Gamepad2 } from "lucide-react";
import { PERSONAL_INFO, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerContainer, staggerItem, slideLeft, slideRight, viewportOnce } from "@/lib/animations";

export function About() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, viewportOnce);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldAnimate = mounted && inView;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden">
      {/* Animated background accent */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-50 blur-3xl opacity-70"
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
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
            Get to know me
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About <span className="accent-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — Story */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="space-y-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg leading-relaxed text-gray-700"
            >
              I&apos;m a Computer Science undergraduate who enjoys building modern web
              applications, backend systems, cloud-deployed services, and AI-powered products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-base leading-relaxed text-gray-500"
            >
              I&apos;m actively exploring MCP server development, multi-agent AI orchestration,
              and cloud engineering with AWS and Docker. My goal is to build software that is
              scalable, maintainable, and production-ready.
            </motion.p>

            {/* Info cards with stagger */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              className="space-y-3 pt-2"
            >
              {[
                {
                  icon: GraduationCap,
                  title: `${PERSONAL_INFO.degree}`,
                  subtitle: `${PERSONAL_INFO.college} · ${PERSONAL_INFO.graduationYear}`,
                },
                {
                  icon: MapPin,
                  title: "India",
                  subtitle: "Based in · Open to Remote",
                },
                {
                  icon: Gamepad2,
                  title: "General Secretary",
                  subtitle: "Ameya Esports Club",
                },
              ].map(({ icon: Icon, title, subtitle }) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm cursor-default"
                >
                  <motion.div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={16} />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 24 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 32px rgba(79,70,229,0.12)",
                  borderColor: "#a5b4fc",
                }}
                className="group flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors cursor-default"
              >
                <div className="mb-1 text-3xl font-bold text-indigo-600">
                  {shouldAnimate ? (
                    <AnimatedCounter value={stat.value} />
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
