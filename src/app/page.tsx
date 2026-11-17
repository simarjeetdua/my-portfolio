"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { GitHub } from "@/components/sections/GitHub";
import { LeetCode } from "@/components/sections/LeetCode";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { BackToTop } from "@/components/shared/BackToTop";

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Command palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Navigation */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Achievements />
        <Projects />
        <TechStack />
        <CurrentlyExploring />
        <GitHub />
        <LeetCode />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
