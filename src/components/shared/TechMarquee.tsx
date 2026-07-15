"use client";

import { motion } from "framer-motion";

const TECH_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL",
  "Tailwind CSS", "shadcn/ui", "Framer Motion", "OpenAI", "Gemini",
  "LangChain", "Express.js", "Python", "C++", "AWS", "Docker", "Git",
  "Clerk", "Arcjet", "Inngest", "MySQL", "Postman", "VS Code",
];

const MarqueeRow = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
  <div className="flex overflow-hidden">
    <motion.div
      className="flex shrink-0 gap-6 pr-6"
      animate={{ x: reverse ? ["0%", "100%"] : ["0%", "-100%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm transition-colors hover:border-violet-500/40 hover:text-violet-300"
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

export function TechMarquee() {
  const half = Math.ceil(TECH_ITEMS.length / 2);
  return (
    <div className="relative mt-12 space-y-3 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#000] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#000] to-transparent" />
      <MarqueeRow items={TECH_ITEMS.slice(0, half)} />
      <MarqueeRow items={TECH_ITEMS.slice(half)} reverse />
    </div>
  );
}
