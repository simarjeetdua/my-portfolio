"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";
import { fadeUp, slideLeft, slideRight, fadeIn } from "@/lib/animations";

const ROLES = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Cloud & DevOps Enthusiast",
  "AI & Multi-Agent Builder",
];

const SOCIAL = [
  { icon: GitHubIcon,   href: PERSONAL_INFO.github,                label: "GitHub"   },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin,              label: "LinkedIn" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode,              label: "LeetCode" },
  { icon: Mail,         href: `mailto:${PERSONAL_INFO.email}`,     label: "Email"    },
];

const CODE_LINES = [
  { text: "const developer = {",          cls: "text-gray-800" },
  { text: '  name: "Simarjeet",',         cls: "text-green-700", pl: true },
  { text: '  role: "Full-Stack Dev",',    cls: "text-blue-700",  pl: true },
  { text: '  focus: ["Backend","Cloud"],',cls: "text-orange-600",pl: true },
  { text: '  ai: ["MCP","Agents"],',      cls: "text-violet-700",pl: true },
  { text: "  openToWork: true,",          cls: "text-emerald-700",pl: true },
  { text: "};",                            cls: "text-gray-800" },
  { text: "",                              cls: "" },
  { text: "developer.build();",            cls: "text-indigo-600 font-semibold" },
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center bg-white overflow-hidden"
    >
      {/* Animated dot grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          y,
        }}
        aria-hidden
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Top gradient wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-50/60 to-transparent"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 w-full"
        style={{ opacity }}
      >
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Text */}
          <div className="flex flex-col gap-7">
            {/* Status badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
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
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <p className="mb-1 text-base font-medium text-gray-500">Hi, I&apos;m</p>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
                Simarjeet{" "}
                <span className="accent-text">Singh Dua</span>
              </h1>
            </motion.div>

            {/* Typed role */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="flex items-center gap-1.5 text-lg font-medium text-gray-600 min-h-[1.75rem]"
            >
              <span>{typedText}</span>
              <motion.span
                className="inline-block h-5 w-0.5 bg-indigo-500 ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="max-w-md text-base leading-relaxed text-gray-500"
            >
              B.Tech CS student at SVVV, building scalable web apps, AI-powered tools, and
              cloud-deployed services. Passionate about MCP servers and multi-agent systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={() => scrollTo("#projects")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.button>
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-all"
              >
                <Sparkles size={14} className="text-indigo-500" />
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-gray-400">Find me on</span>
              <div className="flex items-center gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Animated code card */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
              whileHover={{ y: -8, boxShadow: "0 32px 60px rgba(79,70,229,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-3 bg-gray-50">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-red-400"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-yellow-400"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-green-400"
                  whileHover={{ scale: 1.3 }}
                />
                <span className="ml-2 text-xs text-gray-400 font-mono">portfolio.ts</span>
              </div>
              {/* Code lines — staggered reveal */}
              <div className="p-5 font-mono text-sm leading-7">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    className={`flex gap-4 ${line.cls}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                  >
                    <span className="w-4 shrink-0 text-right text-gray-300 text-xs select-none">
                      {line.text ? i + 1 : ""}
                    </span>
                    <span className={line.pl ? "pl-4" : ""}>{line.text}</span>
                  </motion.div>
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
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Ready
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1.4}
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
      </motion.div>
    </section>
  );
}
