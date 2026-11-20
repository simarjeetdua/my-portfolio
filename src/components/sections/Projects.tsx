"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, GitFork, Clock, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { GitHubIcon } from "@/components/shared/SocialIcons";
import { FEATURED_PROJECTS } from "@/lib/constants";
import type { GitHubRepo } from "@/lib/github";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface RepoData {
  stars: number; forks: number; language: string | null;
  description: string | null; updatedAt: string; topics: string[];
}

function useRepoData(repoName: string) {
  const [data, setData] = useState<RepoData | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/repos/simarjeetdua/${repoName}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((repo: GitHubRepo | null) => {
        if (repo) setData({
          stars: repo.stargazers_count, forks: repo.forks_count,
          language: repo.language, description: repo.description,
          updatedAt: repo.updated_at, topics: repo.topics ?? [],
        });
      })
      .catch(() => null);
  }, [repoName]);
  return data;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const ACCENT: Record<string, { badge: string; border: string; btn: string; stripe: string }> = {
  indigo: { badge: "border-indigo-200 bg-indigo-50 text-indigo-700", border: "border-indigo-200", btn: "bg-indigo-600 hover:bg-indigo-700 text-white", stripe: "bg-indigo-600" },
  blue:   { badge: "border-blue-200 bg-blue-50 text-blue-700", border: "border-blue-200", btn: "bg-blue-600 hover:bg-blue-700 text-white", stripe: "bg-blue-600" },
  violet: { badge: "border-violet-200 bg-violet-50 text-violet-700", border: "border-violet-200", btn: "bg-violet-600 hover:bg-violet-700 text-white", stripe: "bg-violet-600" },
  sky:    { badge: "border-sky-200 bg-sky-50 text-sky-700", border: "border-sky-200", btn: "bg-sky-600 hover:bg-sky-700 text-white", stripe: "bg-sky-600" },
};

function ProjectCard({ project, index }: { project: (typeof FEATURED_PROJECTS)[0]; index: number }) {
  const repo  = useRepoData(project.repoName);
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [showFeatures, setShowFeatures] = useState(false);

  const accent = ACCENT[project.accent] ?? ACCENT.indigo;
  const isLive = project.liveUrl !== "#";
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300"
    >
      {/* Animated top accent stripe */}
      <motion.div
        className={`h-1 w-full ${accent.stripe}`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${accent.badge}`}>
                Featured
              </span>
              {isLive && (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Live
                </span>
              )}
              {repo?.language && <span className="text-xs text-gray-400">{repo.language}</span>}
            </div>
            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{project.title}</h3>
            <p className="mt-0.5 text-sm font-medium text-gray-500">{project.subtitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Star size={13} className="text-yellow-500" />{repo?.stars ?? 0}</span>
            <span className="flex items-center gap-1"><GitFork size={13} />{repo?.forks ?? 0}</span>
            {repo?.updatedAt && (
              <span className="flex items-center gap-1 text-xs"><Clock size={11} />{timeAgo(repo.updatedAt)}</span>
            )}
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-gray-600">{repo?.description || project.description}</p>

        {"highlight" in project && project.highlight && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Zap size={11} />
              {project.highlight as string}
            </span>
          </div>
        )}

        {/* Tech badges */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Key Features toggle */}
        <div className="mb-5">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Key Features
            <motion.span animate={{ rotate: showFeatures ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
          <AnimatePresence>
            {showFeatures && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <span className="h-1 w-1 rounded-full bg-indigo-500 shrink-0" />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
          >
            <GitHubIcon size={15} /> GitHub
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all ${accent.btn}`}
          >
            <ExternalLink size={14} />
            {isLive ? "Live Demo" : "Coming Soon"}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden">
      {/* Background orb */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-indigo-50 blur-3xl opacity-70"
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
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
            What I&apos;ve built
          </motion.p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Featured <span className="accent-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Real-world applications built with modern technologies. Data pulled live from GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
