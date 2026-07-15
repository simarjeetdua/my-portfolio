"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1500 }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const startRef = useRef<number | null>(null);

  // Extract numeric portion and suffix (e.g. "5+" → { num: 5, suffix: "+" })
  const numMatch = value.match(/^(\d+)/);
  const suffixMatch = value.match(/[^\d]+$/);
  const num = numMatch ? parseInt(numMatch[1]) : null;
  const suffix = suffixMatch ? suffixMatch[0] : "";

  useEffect(() => {
    if (num === null) {
      setDisplayed(value);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * num) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [num, suffix, duration, value]);

  return <span>{displayed}</span>;
}
