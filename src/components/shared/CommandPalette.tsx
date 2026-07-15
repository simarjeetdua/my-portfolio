"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Keyboard } from "lucide-react";
import { COMMAND_ITEMS } from "@/lib/constants";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = COMMAND_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: (typeof COMMAND_ITEMS)[0]) => {
      if (item.action === "scroll") {
        const el = document.querySelector(item.target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (item.action === "link") {
        window.open(item.target, "_blank", "noopener noreferrer");
      } else if (item.action === "download") {
        const a = document.createElement("a");
        a.href = item.target;
        a.download = "Simarjeet_Singh_Dua_Resume.pdf";
        a.click();
      }
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-[201] w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="shrink-0 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-white/30">No results found.</p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-violet-600/20 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span className="flex items-center gap-2.5">
                      <ArrowRight size={12} className="text-violet-400 shrink-0" />
                      {item.label}
                    </span>
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30">
                      {item.shortcut}
                    </kbd>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2">
              <span className="flex items-center gap-1.5 text-[11px] text-white/30">
                <Keyboard size={10} />
                ↑↓ navigate
              </span>
              <span className="text-[11px] text-white/30">↵ select</span>
              <span className="text-[11px] text-white/30">esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
