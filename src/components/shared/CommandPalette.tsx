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
  const [query, setQuery]               = useState("");
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

  useEffect(() => { setSelectedIndex(0); }, [query]);
  useEffect(() => { if (!isOpen) { setQuery(""); setSelectedIndex(0); } }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
      else if (e.key === "Enter" && filtered[selectedIndex]) { handleSelect(filtered[selectedIndex]); }
      else if (e.key === "Escape") { onClose(); }
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
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-[201] w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="shrink-0 rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-400">No results found.</p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span className="flex items-center gap-2.5">
                      <ArrowRight size={12} className="text-indigo-500 shrink-0" />
                      {item.label}
                    </span>
                    <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-500">
                      {item.shortcut}
                    </kbd>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-2">
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <Keyboard size={10} />
                ↑↓ navigate
              </span>
              <span className="text-[11px] text-gray-400">↵ select</span>
              <span className="text-[11px] text-gray-400">esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
