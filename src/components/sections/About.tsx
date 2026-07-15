"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Gamepad2 } from "lucide-react";
import { PERSONAL_INFO, STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  // Defer client-side to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shouldAnimate = mounted && inView;

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background blob */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
            Get to know me
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — Story */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-lg leading-relaxed text-white/60"
            >
              I&apos;m a Computer Science undergraduate who enjoys building modern web
              applications, experimenting with AI-powered software, and continuously
              improving my backend and full-stack development skills.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base leading-relaxed text-white/45"
            >
              I love learning new technologies and solving real-world problems through
              software. My passion lies in creating products that are not just
              functional, but beautifully crafted and performant.
            </motion.p>

            {/* Info cards */}
            <div className="space-y-3 pt-2">
              {[
                {
                  icon: GraduationCap,
                  title: PERSONAL_INFO.degree,
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
              ].map(({ icon: Icon, title, subtitle }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-600/15 text-violet-400">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{title}</p>
                    <p className="text-xs text-white/35">{subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-white/[0.04]"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 via-transparent to-blue-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-violet-600/10 group-hover:to-blue-600/5" />

                <div className="relative">
                  <div className="mb-1 text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {shouldAnimate ? (
                      <AnimatedCounter value={stat.value} />
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/45">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
