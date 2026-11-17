"use client";

import { motion } from "framer-motion";
import { Mail, Terminal } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

const SOCIAL = [
  { icon: GitHubIcon,   href: PERSONAL_INFO.github,                 label: "GitHub"   },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin,               label: "LinkedIn" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode,               label: "LeetCode" },
  { icon: Mail,         href: `mailto:${PERSONAL_INFO.email}`,      label: "Email"    },
];

const BUILT_WITH = ["Next.js", "React", "Tailwind CSS", "Framer Motion"];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">
              <Terminal size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">{PERSONAL_INFO.firstName}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                aria-label={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500">
            Designed &amp; Developed by{" "}
            <span className="font-semibold text-gray-800">{PERSONAL_INFO.name}</span>
          </p>

          {/* Built with */}
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-400">
            Built with{" "}
            {BUILT_WITH.map((tech, i) => (
              <span key={tech}>
                <span className="font-medium text-gray-500">{tech}</span>
                {i < BUILT_WITH.length - 1 && (
                  <span className="mx-1 text-gray-300">·</span>
                )}
              </span>
            ))}
          </p>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
