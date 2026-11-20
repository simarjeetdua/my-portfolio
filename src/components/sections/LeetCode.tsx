"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code2, Trophy, Target, Zap, TrendingUp, Calendar, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { viewportOnce, staggerContainer, staggerItem } from "@/lib/animations";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

function CircleProgress({
  value, max, color, label, count,
}: {
  value: number; max: number; color: string; label: string; count: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const pct  = max > 0 ? Math.min(value / max, 1) : 0;
  const dash = pct * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r={radius} fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{count}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
  );
}

const WEEKLY_DAYS    = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_ACTIVITY  = [3, 1, 4, 2, 5, 0, 2];

export function LeetCode() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  const [stats, setStats]   = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${PERSONAL_INFO.leetcodeUsername}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.status !== "error") setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const diffRings = stats ? [
    { label: "Easy",   value: stats.easySolved,   max: stats.totalEasy,   color: "#10B981", count: stats.easySolved   },
    { label: "Medium", value: stats.mediumSolved,  max: stats.totalMedium, color: "#F59E0B", count: stats.mediumSolved  },
    { label: "Hard",   value: stats.hardSolved,    max: stats.totalHard,   color: "#EF4444", count: stats.hardSolved    },
  ] : [];

  return (
    <section id="leetcode" className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden">
      {/* Background orb */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-80 w-80 rounded-full bg-indigo-50/70 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
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
            Problem solving
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            LeetCode <span className="accent-text">Stats</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Sharpening algorithmic thinking, one problem at a time.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm transition-all"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-10">
                <motion.div
                  className="h-10 w-10 rounded-full border-2 border-indigo-200 border-t-indigo-600"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-sm text-gray-400">Loading LeetCode stats…</p>
              </div>
            ) : !stats ? (
              <div className="space-y-6">
                <p className="text-center text-sm text-gray-400 mb-6">
                  Live stats unavailable — visit the profile for full details.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { icon: Code2,     label: "Problems Solved", value: "200+",       color: "text-orange-500" },
                    { icon: Trophy,    label: "Contest Rating",  value: "—",           color: "text-yellow-500" },
                    { icon: Award,     label: "Current Badge",   value: "Active",      color: "text-indigo-500" },
                    { icon: TrendingUp,label: "Coding Streak",   value: "Consistent",  color: "text-green-500"  },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <motion.div
                      key={label}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center transition-all"
                    >
                      <Icon size={18} className={color} />
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Total Solved */}
                <div className="flex flex-col items-center gap-1 text-center">
                  <motion.div
                    className="text-6xl font-bold accent-text"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {stats.totalSolved}
                  </motion.div>
                  <p className="text-gray-500">
                    problems solved out of{" "}
                    <span className="font-medium text-gray-700">{stats.totalQuestions}</span>
                  </p>
                </div>

                {/* Difficulty rings */}
                <div className="flex justify-center gap-10">
                  {diffRings.map((ring) => (
                    <CircleProgress key={ring.label} {...ring} />
                  ))}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { icon: Trophy,     label: "Global Ranking",   value: stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : "N/A", color: "text-yellow-500" },
                    { icon: Target,     label: "Acceptance Rate",  value: `${stats.acceptanceRate?.toFixed(1) ?? "N/A"}%`,                   color: "text-blue-500"   },
                    { icon: Zap,        label: "Contribution Pts", value: stats.contributionPoints ?? "N/A",                                  color: "text-indigo-500" },
                    { icon: Award,      label: "Current Badge",    value: stats.reputation > 0 ? "Active" : "N/A",                           color: "text-green-500"  },
                  ].map(({ icon: Icon, label, value, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center cursor-default transition-all"
                    >
                      <Icon size={16} className={color} />
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500">{label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Weekly Activity */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <Calendar size={12} />
                    Weekly Activity
                  </div>
                  <div className="flex items-end justify-between gap-1">
                    {WEEKLY_DAYS.map((day, i) => (
                      <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                        <motion.div
                          className="w-full rounded-sm bg-indigo-500"
                          initial={{ height: 0 }}
                          animate={inView ? { height: `${Math.max(WEEK_ACTIVITY[i] * 8, 4)}px` } : {}}
                          transition={{ duration: 0.6, delay: 0.6 + i * 0.05 }}
                          style={{ minHeight: 4 }}
                        />
                        <span className="text-[9px] text-gray-400">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consistency */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <TrendingUp size={12} /> Coding Consistency
                    </span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="h-full rounded-full bg-indigo-500"
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${Math.min((stats.totalSolved / stats.totalQuestions) * 100 * 3, 85)}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Solved {stats.totalSolved} / {stats.totalQuestions} available problems
                  </p>
                </div>
              </div>
            )}

            {/* Profile link */}
            <div className="mt-6 flex justify-center border-t border-gray-100 pt-6">
              <motion.a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-700 transition-all hover:bg-orange-100"
              >
                <Code2 size={14} />
                View LeetCode Profile
                <ExternalLink size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
