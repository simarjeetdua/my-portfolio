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
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { BackToTop } from "@/components/shared/BackToTop";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

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
      {/* Loading screen */}
      <LoadingScreen />

      {/* Background effects */}
      <FloatingParticles />
      <CursorSpotlight />
      <ScrollProgress />

      {/* Command palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Navigation */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      {/* Main content */}
      <main>
        <Hero />

        <div className="section-divider" />

        <About />

        <div className="section-divider" />

        {/* Achievements — new section below About */}
        <Achievements />

        <div className="section-divider" />

        <Projects />

        <div className="section-divider" />

        <TechStack />

        <div className="section-divider" />

        <CurrentlyExploring />

        <div className="section-divider" />

        {/* Open Source / GitHub Repos */}
        <GitHub />

        <div className="section-divider" />

        <LeetCode />

        <div className="section-divider" />

        <Contact />
      </main>

      <Footer />

      {/* Back to top */}
      <BackToTop />
    </>
  );
}
