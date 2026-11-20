"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Terminal } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SOCIAL = [
  { icon: GitHubIcon,   href: PERSONAL_INFO.github,                label: "GitHub"   },
  { icon: LinkedInIcon, href: PERSONAL_INFO.linkedin,              label: "LinkedIn" },
  { icon: LeetCodeIcon, href: PERSONAL_INFO.leetcode,              label: "LeetCode" },
  { icon: Mail,         href: `mailto:${PERSONAL_INFO.email}`,     label: "Email"    },
];

const BUILT_WITH = ["Next.js", "React", "Tailwind CSS", "Framer Motion"];

export function Footer() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="border-t border-gray-200 bg-white py-12 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Logo */}
          <motion.div variants={staggerItem} className="flex items-center gap-2">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-sm"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Terminal size={14} className="text-white" />
            </motion.div>
            <span className="font-bold text-gray-900">{PERSONAL_INFO.firstName}</span>
          </motion.div>

          {/* Social links */}
          <motion.div variants={staggerItem} className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2, y: -4, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                aria-label={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p variants={staggerItem} className="text-sm text-gray-500">
            Designed & Developed by{" "}
            <span className="font-semibold text-gray-800">{PERSONAL_INFO.name}</span>
          </motion.p>

          {/* Built with */}
          <motion.p
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-400"
          >
            Built with{" "}
            {BUILT_WITH.map((tech, i) => (
              <span key={tech}>
                <span className="font-medium text-gray-500">{tech}</span>
                {i < BUILT_WITH.length - 1 && <span className="mx-1 text-gray-300">·</span>}
              </span>
            ))}
          </motion.p>

          {/* Copyright */}
          <motion.p variants={staggerItem} className="text-xs text-gray-400">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
