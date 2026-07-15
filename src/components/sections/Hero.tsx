"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

const ROLES = [
  "Full Stack Developer",
  "AI Builder",
  "Problem Solver",
  "Open Source Contributor",
];

const SOCIAL = [
  { icon: GitHubIcon, href: PERSONAL_INFO.github, label: "GitHub", color: "hover:text-white" },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode, label: "LeetCode", color: "hover:text-orange-400" },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email", color: "hover:text-violet-400" },
];

// Animated Code Editor
function CodeEditor() {
  const lines = [
    { text: "const developer = {", color: "text-white/80" },
    { text: '  name: "Simarjeet",', color: "text-green-400/90", indent: true },
    { text: '  role: "Full Stack Dev",', color: "text-blue-400/90", indent: true },
    { text: '  stack: ["Next.js", "AI"],', color: "text-yellow-400/90", indent: true },
    { text: '  passion: "Building",', color: "text-purple-400/90", indent: true },
    { text: "  available: true,", color: "text-emerald-400/90", indent: true },
    { text: "};", color: "text-white/80" },
    { text: "", color: "" },
    { text: "developer.build();", color: "text-violet-400/90" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-md"
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/20 to-blue-600/10 blur-2xl" />

      {/* Window */}
      <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0d]/90 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/30">portfolio.ts</span>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-sm">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className={`flex gap-4 leading-6 ${line.color}`}
            >
              <span className="w-5 shrink-0 text-right text-white/15 text-xs">
                {line.text ? i + 1 : ""}
              </span>
              <span className={line.indent ? "pl-4" : ""}>{line.text}</span>
            </motion.div>
          ))}

          {/* Cursor */}
          <motion.div
            className="mt-1 ml-9 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-white/30 text-xs">▋</span>
            <motion.div
              className="h-4 w-0.5 bg-violet-400"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-1.5 text-[10px] text-white/20">
          <span>TypeScript</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ready
          </span>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -top-4 -right-4 rounded-xl border border-white/10 bg-violet-600/20 px-3 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-sm"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🚀 Open to Work
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        ⚡ AI Powered
      </motion.div>
    </motion.div>
  );
}

// Typing animation hook
function useTypingEffect(strings: string[], speed = 80) {
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
            setTimeout(() => setIsDeleting(true), 1800);
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
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-600/10 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left — Text */}
          <div className="flex flex-col gap-6">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-1"
            >
              <p className="text-lg font-medium text-white/50">Hi there, I&apos;m 👋</p>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Simarjeet
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Singh Dua
                </span>
              </h1>
            </motion.div>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 text-xl font-medium text-white/60"
            >
              <span>{typedText}</span>
              <motion.span
                className="h-6 w-0.5 bg-violet-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-lg text-base leading-relaxed text-white/45"
            >
              {PERSONAL_INFO.intro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40 active:scale-[0.98]"
              >
                View Projects
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={14} />
                Resume
              </a>

              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-300 transition-all hover:border-violet-400/50 hover:bg-violet-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs text-white/25">Find me on</span>
              <div className="flex items-center gap-3">
                {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-colors ${color}`}
                    aria-label={label}
                  >
                    <Icon size={15} className="" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Code Editor */}
          <div className="flex items-center justify-center lg:justify-end">
            <CodeEditor />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20">scroll down</span>
          <motion.div
            className="h-8 w-5 rounded-full border border-white/15 p-1"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-2 w-full rounded-full bg-white/30"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
