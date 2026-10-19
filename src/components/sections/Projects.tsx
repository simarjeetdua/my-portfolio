"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, GitFork, Clock, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "@/components/shared/SocialIcons";
import { FEATURED_PROJECTS } from "@/lib/constants";
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
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlight badge — Razorpay / AWS callout */}
        {"highlight" in project && project.highlight && (
          <div className="mb-6">
            <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold ${
              (project.highlight as string).includes("Razorpay")
                ? "border-orange-500/25 bg-orange-500/10 text-orange-300"
                : "border-sky-500/25 bg-sky-500/10 text-sky-300"
            }`}>
              {project.highlight as string}
            </span>
          </div>
        )}

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
        
{/* Buttons */}
<div className="flex flex-wrap gap-3">
  <a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
  >
    <GitHubIcon size={15} />
    GitHub
  </a>

  {project.liveUrl && project.liveUrl !== "#" ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${project.color} px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90`}
    >
      <ExternalLink size={15} />
      Live Demo
    </a>
  ) : (
    <button
      type="button"
      disabled
      aria-label="Deployment coming soon"
      className={`flex cursor-not-allowed items-center gap-2 rounded-xl bg-gradient-to-r ${project.color} px-5 py-2.5 text-sm font-medium text-white opacity-70 shadow-lg`}
    >
      <ExternalLink size={15} />
      Deploying Very Soon
    </button>
  )}
</div>

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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
