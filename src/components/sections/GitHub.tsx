"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, GitFork, Clock } from "lucide-react";
import { GitHubIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  fork: boolean;
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

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function GitHub() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=100`
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Repo[]) => {
        // filter out forks, sort by updated
        const filtered = data
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayed = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="open-source" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-violet-600/8 blur-[120px]" />
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
            Open source
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Projects &{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Repositories
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Live repository data fetched directly from GitHub.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
            <p className="text-sm text-white/30">Fetching repositories…</p>
          </div>
        )}

        {/* Repo grid */}
        {!loading && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-all hover:border-violet-500/25 hover:bg-white/[0.04]"
                >
                  {/* Repo name + icon */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitHubIcon size={14} className="shrink-0 text-white/40 group-hover:text-white/70 transition-colors" />
                      <span className="truncate text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink
                      size={12}
                      className="shrink-0 text-white/20 opacity-0 transition-all group-hover:opacity-100 group-hover:text-violet-400"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-white/40 line-clamp-2 flex-1">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-300/70"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-3 border-t border-white/[0.04] pt-2 text-[11px] text-white/30">
                    {/* Language */}
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              LANG_COLORS[repo.language] || "#888",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}

                    {/* Stars */}
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="text-yellow-400/60" />
                      {repo.stargazers_count}
                    </span>

                    {/* Forks */}
                    <span className="flex items-center gap-0.5">
                      <GitFork size={10} />
                      {repo.forks_count}
                    </span>

                    {/* Updated */}
                    <span className="ml-auto flex items-center gap-1">
                      <Clock size={9} />
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Show more / less */}
            {repos.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center gap-3"
              >
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-white/10 hover:text-white"
                >
                  {showAll ? "Show Less" : `Show All (${repos.length})`}
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && repos.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <GitHubIcon size={32} className="text-white/20" />
            <p className="text-sm text-white/30">
              Could not load repositories. Visit the{" "}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                GitHub profile
              </a>{" "}
              directly.
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/60 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-white/10 hover:text-white"
          >
            <GitHubIcon size={15} className="" />
            View Full GitHub Profile
            <ExternalLink
              size={12}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
