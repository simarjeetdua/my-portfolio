"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code2, Trophy, Target, Zap, TrendingUp, Calendar, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

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
  value,
  max,
  color,
  label,
  count,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  count: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const dash = pct * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{count}</span>
        </div>
      </div>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}

// Fake weekly activity data for visual (real API doesn't expose this)
const WEEKLY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_ACTIVITY = [3, 1, 4, 2, 5, 0, 2];

export function LeetCode() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://leetcode-stats-api.herokuapp.com/${PERSONAL_INFO.leetcodeUsername}`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.status !== "error") setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const diffRings = stats
    ? [
        { label: "Easy", value: stats.easySolved, max: stats.totalEasy, color: "#10B981", count: stats.easySolved },
        { label: "Medium", value: stats.mediumSolved, max: stats.totalMedium, color: "#F59E0B", count: stats.mediumSolved },
        { label: "Hard", value: stats.hardSolved, max: stats.totalHard, color: "#EF4444", count: stats.hardSolved },
      ]
    : [];

  return (
    <section id="leetcode" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-orange-500/8 blur-[100px]" />
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
            Problem solving
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            LeetCode{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Stats
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Sharpening algorithmic thinking, one problem at a time.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
                <p className="text-sm text-white/30">Loading LeetCode stats…</p>
              </div>
            ) : !stats ? (
              /* Fallback — show static premium layout */
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-sm text-white/40 mb-6">
                    Live stats unavailable — visit the profile for full details.
                  </p>
                </div>
                {/* Static info cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { icon: Code2, label: "Problems Solved", value: "150+", color: "text-orange-400" },
                    { icon: Trophy, label: "Contest Rating", value: "—", color: "text-yellow-400" },
                    { icon: Award, label: "Current Badge", value: "Active", color: "text-violet-400" },
                    { icon: TrendingUp, label: "Coding Streak", value: "Consistent", color: "text-green-400" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                      <Icon size={18} className={color} />
                      <p className="text-lg font-bold text-white">{value}</p>
                      <p className="text-xs text-white/35">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Problems Solved hero */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-6xl font-bold">
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      {stats.totalSolved}
                    </span>
                  </div>
                  <p className="text-white/40">
                    problems solved out of{" "}
                    <span className="text-white/60">{stats.totalQuestions}</span>
                  </p>
                </div>

                {/* Difficulty rings */}
                <div className="flex justify-center gap-10">
                  {diffRings.map((ring) => (
                    <CircleProgress key={ring.label} {...ring} />
                  ))}
                </div>

                {/* Premium stats grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    {
                      icon: Trophy,
                      label: "Global Ranking",
                      value: stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : "N/A",
                      color: "text-yellow-400",
                    },
                    {
                      icon: Target,
                      label: "Acceptance Rate",
                      value: `${stats.acceptanceRate?.toFixed(1) ?? "N/A"}%`,
                      color: "text-blue-400",
                    },
                    {
                      icon: Zap,
                      label: "Contribution Pts",
                      value: stats.contributionPoints ?? "N/A",
                      color: "text-violet-400",
                    },
                    {
                      icon: Award,
                      label: "Current Badge",
                      value: stats.reputation > 0 ? "Active" : "N/A",
                      color: "text-green-400",
                    },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                    >
                      <Icon size={16} className={color} />
                      <p className="text-lg font-bold text-white">{value}</p>
                      <p className="text-xs text-white/35">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Weekly Activity */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/30">
                    <Calendar size={12} />
                    Weekly Activity
                  </div>
                  <div className="flex items-end justify-between gap-1">
                    {WEEKLY_DAYS.map((day, i) => (
                      <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                        <motion.div
                          className="w-full rounded-sm bg-gradient-to-t from-violet-600/40 to-blue-600/40"
                          initial={{ height: 0 }}
                          animate={inView ? { height: `${Math.max(WEEK_ACTIVITY[i] * 8, 4)}px` } : {}}
                          transition={{ duration: 0.6, delay: 0.6 + i * 0.05 }}
                          style={{ minHeight: 4 }}
                        />
                        <span className="text-[9px] text-white/20">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coding Consistency */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-medium uppercase tracking-wider text-white/30 flex items-center gap-1.5">
                      <TrendingUp size={12} />
                      Coding Consistency
                    </span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${Math.min((stats.totalSolved / stats.totalQuestions) * 100 * 3, 85)}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/25">
                    Solved {stats.totalSolved} / {stats.totalQuestions} available problems
                  </p>
                </div>
              </div>
            )}

            {/* Profile link */}
            <div className="mt-6 flex justify-center border-t border-white/[0.04] pt-6">
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-300 transition-all hover:border-orange-400/30 hover:bg-orange-500/20"
              >
                <Code2 size={14} />
                View LeetCode Profile
                <ExternalLink size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
