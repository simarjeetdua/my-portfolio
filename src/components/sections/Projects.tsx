"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, GitFork, Clock, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "@/components/shared/SocialIcons";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/lib/constants";
import type { GitHubRepo } from "@/lib/github";

// ----- Types -----
interface RepoData {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  updatedAt: string;
  topics: string[];
  openIssues: number;
}

// ----- Hooks -----
function useRepoData(repoName: string) {
  const [data, setData] = useState<RepoData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/simarjeetdua/${repoName}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((repo: GitHubRepo | null) => {
        if (repo) {
          setData({
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            description: repo.description,
            updatedAt: repo.updated_at,
            topics: repo.topics ?? [],
            openIssues: repo.open_issues_count,
          });
        }
      })
      .catch(() => null);
  }, [repoName]);

  return data;
}

// ----- Helpers -----
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  "C++": "#00599C",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
};

// ----- Featured Card -----
function FeaturedCard({
  project,
  index,
}: {
  project: (typeof FEATURED_PROJECTS)[0];
  index: number;
}) {
  const repo = useRepoData(project.repoName);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all hover:border-white/15"
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300">
                Featured
              </span>
              {repo?.language && (
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[repo.language] || "#888" }}
                  />
                  {repo.language}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
            <p className="mt-2 text-white/50">
              {repo?.description || project.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex shrink-0 gap-4">
            <div className="flex items-center gap-1.5 text-sm text-white/40">
              <Star size={14} className="text-yellow-400/70" />
              <span>{repo?.stars ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/40">
              <GitFork size={14} />
              <span>{repo?.forks ?? 0}</span>
            </div>
            {repo?.updatedAt && (
              <div className="flex items-center gap-1.5 text-sm text-white/30">
                <Clock size={12} />
                <span>{timeAgo(repo.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tech badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            Key Features
            {showFeatures ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/45"
                    >
                      <span className="h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topics */}
        {repo?.topics && repo.topics.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-300/70"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <GitHubIcon size={15} className="" />
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${project.color} px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:scale-[1.02]`}
          >
            <ExternalLink size={15} />
            {project.liveUrl === "#" ? "Coming Soon" : "Live Demo"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ----- Other Project Card -----
function OtherCard({ project, index }: { project: (typeof OTHER_PROJECTS)[0]; index: number }) {
  const repo = useRepoData(project.repoName);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-violet-500/25 hover:bg-white/[0.03]"
    >
      {/* Icon + title */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{project.emoji}</span>
          <div>
            <h4 className="font-semibold text-white/90 group-hover:text-white transition-colors">
              {project.title}
            </h4>
            {repo?.language && (
              <span className="flex items-center gap-1 text-xs text-white/30 mt-0.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: LANG_COLORS[repo.language] || "#888" }}
                />
                {repo.language}
              </span>
            )}
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 text-xs text-white/30">
          <Star size={11} className="text-yellow-400/50" />
          {repo?.stars ?? 0}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/40">
        {repo?.description || project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/40"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-auto flex items-center gap-3 pt-2 border-t border-white/[0.04]">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <GitHubIcon size={12} className="" />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-violet-400/70 transition-colors hover:text-violet-300"
          >
            <ExternalLink size={12} />
            Demo
          </a>
        )}
        {repo?.updatedAt && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-white/20">
            <Clock size={10} />
            {timeAgo(repo.updatedAt)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ----- Main Section -----
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/8 blur-[120px]" />
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
            What I've built
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Real-world applications built with modern technologies. Data pulled live from GitHub.
          </p>
        </motion.div>

        {/* Featured */}
        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex items-center gap-4"
        >
          <h3 className="text-xl font-semibold text-white/80">Other Projects</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <a
            href="https://github.com/simarjeetdua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            View all on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_PROJECTS.map((p, i) => (
            <OtherCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
