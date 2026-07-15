"use client";

import { motion } from "framer-motion";
import { Mail, Terminal } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

const SOCIAL = [
  { icon: GitHubIcon, href: PERSONAL_INFO.github, label: "GitHub" },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode, label: "LeetCode" },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
];

const BUILT_WITH = ["Next.js", "React", "Tailwind CSS", "Framer Motion"];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
              <Terminal size={14} className="text-white" />
            </div>
            <span className="font-bold text-white/70">
              <span className="text-violet-400">S</span>imarjeet
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-colors hover:border-violet-500/40 hover:text-violet-300"
                aria-label={label}
              >
                <Icon size={15} className="" />
              </motion.a>
            ))}
          </div>

          {/* Designed by */}
          <p className="text-sm text-white/30">
            Designed & Developed by{" "}
            <span className="font-medium text-white/60">{PERSONAL_INFO.name}</span>
          </p>

          {/* Built with */}
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-white/20">
            Built with{" "}
            {BUILT_WITH.map((tech, i) => (
              <span key={tech}>
                <span className="font-medium text-white/35">{tech}</span>
                {i < BUILT_WITH.length - 1 && (
                  <span className="mx-1 text-white/15">·</span>
                )}
              </span>
            ))}
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/15">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
