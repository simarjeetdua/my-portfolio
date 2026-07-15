"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, Loader2, AlertCircle, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

// ─── Social links ────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    icon: GitHubIcon,
    label: "GitHub",
    href: PERSONAL_INFO.github,
    color: "hover:border-white/30 hover:text-white",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
    color: "hover:border-blue-400/40 hover:text-blue-300",
  },
  {
    icon: LeetCodeIcon,
    label: "LeetCode",
    href: PERSONAL_INFO.leetcode,
    color: "hover:border-orange-400/40 hover:text-orange-300",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    color: "hover:border-violet-400/40 hover:text-violet-300",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Full name is required (min 2 characters).";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  if (!form.subject.trim() || form.subject.trim().length < 3)
    errors.subject = "Subject is required (min 3 characters).";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message is required (min 10 characters).";
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ErrorToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.95 }}
        className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
      >
        <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="shrink-0 text-red-400/60 hover:text-red-300 transition-colors">
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center backdrop-blur-sm"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        className="relative flex h-20 w-20 items-center justify-center"
      >
        {/* Pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-emerald-500/20"
        />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          className="absolute inset-0 rounded-full bg-emerald-500/10"
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
      </motion.div>

      <div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-xl font-semibold text-white"
        >
          Message Sent Successfully!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-white/45"
        >
          Thank you! I&apos;ll get back to you within 24–48 hours.
          <br />
          Check your inbox for a confirmation email.
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => window.location.reload()}
        className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
      >
        Send another message
      </motion.button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string>("");
  // Honeypot — hidden from real users, bots fill it
  const [honeypot, setHoneypot] = useState("");

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border ${
      hasError ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-violet-500/40"
    } bg-white/[0.03] px-4 py-3 text-sm text-white/80 placeholder-white/20 outline-none transition-all focus:bg-white/[0.05] focus:ring-1 ${
      hasError ? "focus:ring-red-500/20" : "focus:ring-violet-500/20"
    } backdrop-blur-sm`;

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Client-side validation
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
      setFieldErrors({});
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setApiError(message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
            Get in touch
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Whether you have an opportunity, collaboration, or simply want to connect — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left — Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div>
              <h3 className="mb-1 font-semibold text-white/80">Connect with me</h3>
              <p className="text-sm text-white/35">
                Find me on these platforms or reach out directly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white/40 backdrop-blur-sm transition-all ${color}`}
                >
                  <Icon size={15} className="" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>

            {/* Email display */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="mb-1 text-xs text-white/25">Email directly</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Response time note */}
            <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
              <p className="text-xs text-violet-300/60">
                ⚡ I typically respond within <strong className="text-violet-300">24–48 hours</strong>. Open to internships, freelance projects, and collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <SuccessCard />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
              >
                {/* API error toast */}
                {apiError && (
                  <ErrorToast message={apiError} onClose={() => setApiError("")} />
                )}

                {/* Honeypot — visually hidden, real users never see it */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  tabIndex={-1}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      className={inputClass(!!fieldErrors.name)}
                      placeholder="Simarjeet Singh"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      maxLength={100}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      className={inputClass(!!fieldErrors.email)}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      maxLength={254}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass(!!fieldErrors.subject)}
                    placeholder="Internship opportunity / Project collaboration..."
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    maxLength={200}
                  />
                  {fieldErrors.subject && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className={`${inputClass(!!fieldErrors.message)} resize-none`}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    maxLength={5000}
                  />
                  <div className="mt-1 flex items-start justify-between">
                    {fieldErrors.message ? (
                      <p className="text-xs text-red-400">{fieldErrors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[10px] text-white/20">
                      {form.message.length}/5000
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.99 } : {}}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[11px] text-white/20">
                  Your message is sent securely. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
