"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

const ROLES = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Cloud & DevOps Enthusiast",
  "AI & Multi-Agent Builder",
];

const SOCIAL = [
  { icon: GitHubIcon,   href: PERSONAL_INFO.github,                   label: "GitHub"   },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin,                 label: "LinkedIn" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode,                 label: "LeetCode" },
  { icon: Mail,         href: `mailto:${PERSONAL_INFO.email}`,        label: "Email"    },
];

function useTypingEffect(strings: string[], speed = 75) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentIndex((i) => (i + 1) % strings.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, strings, speed]);

  return displayText;
}

export function Hero() {
  const typedText = useTypingEffect(ROLES);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center bg-white overflow-hidden"
    >
      {/* Very subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      {/* Subtle top gradient wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-50/60 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Text */}
          <div className="flex flex-col gap-7">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="mb-1 text-base font-medium text-gray-500">Hi, I&apos;m</p>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
                Simarjeet{" "}
                <span className="accent-text">Singh Dua</span>
              </h1>
            </motion.div>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-1.5 text-lg font-medium text-gray-600 min-h-[1.75rem]"
            >
              <span>{typedText}</span>
              <motion.span
                className="inline-block h-5 w-0.5 bg-indigo-500 ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </motion.div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="max-w-lg text-base leading-relaxed text-gray-500"
            >
              {PERSONAL_INFO.intro}
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-wrap gap-2"
            >
              {["React.js / Next.js","Node.js / Express.js","MongoDB / MySQL","Docker / AWS","MCP & Multi-Agent AI"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98]"
              >
                View Projects
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
              >
                <Download size={14} />
                Resume
              </a>

              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-all hover:bg-indigo-100 active:scale-[0.98]"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-gray-400">Find me on</span>
              <div className="flex items-center gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Minimal code card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-3 bg-gray-50">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-mono">portfolio.ts</span>
              </div>
              {/* Code */}
              <div className="p-5 font-mono text-sm leading-7">
                {[
                  { text: "const developer = {",          cls: "text-gray-800" },
                  { text: '  name: "Simarjeet",',         cls: "text-green-700", pl: true },
                  { text: '  role: "Full-Stack Dev",',    cls: "text-blue-700",  pl: true },
                  { text: '  focus: ["Backend","Cloud"],',cls: "text-orange-600",pl: true },
                  { text: '  ai: ["MCP","Agents"],',      cls: "text-violet-700",pl: true },
                  { text: "  openToWork: true,",          cls: "text-emerald-700",pl: true },
                  { text: "};",                            cls: "text-gray-800" },
                  { text: "",                              cls: "" },
                  { text: "developer.build();",            cls: "text-indigo-600 font-semibold" },
                ].map((line, i) => (
                  <div key={i} className={`flex gap-4 ${line.cls}`}>
                    <span className="w-4 shrink-0 text-right text-gray-300 text-xs select-none">
                      {line.text ? i + 1 : ""}
                    </span>
                    <span className={line.pl ? "pl-4" : ""}>{line.text}</span>
                  </div>
                ))}
                <motion.div
                  className="mt-1 ml-9 h-4 w-0.5 bg-indigo-500 inline-block"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 text-[10px] text-gray-400">
                <span>TypeScript</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Ready
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-xs text-gray-400">scroll down</span>
          <motion.div
            className="h-7 w-4 rounded-full border border-gray-300 p-1"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-1.5 w-full rounded-full bg-gray-400"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
