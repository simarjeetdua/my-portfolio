"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, Loader2, AlertCircle, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/shared/SocialIcons";
import { PERSONAL_INFO } from "@/lib/constants";

const SOCIALS = [
  { icon: GitHubIcon,   label: "GitHub",   href: PERSONAL_INFO.github,                 color: "hover:border-gray-400 hover:text-gray-900" },
  { icon: LinkedInIcon, label: "LinkedIn", href: PERSONAL_INFO.linkedin,               color: "hover:border-blue-400 hover:text-blue-700" },
  { icon: LeetCodeIcon, label: "LeetCode", href: PERSONAL_INFO.leetcode,               color: "hover:border-orange-400 hover:text-orange-600" },
  { icon: Mail,         label: "Email",    href: `mailto:${PERSONAL_INFO.email}`,       color: "hover:border-indigo-400 hover:text-indigo-600" },
];

type Status = "idle" | "loading" | "success" | "error";
interface FormState  { name: string; email: string; subject: string; message: string; }
interface FieldErrors { name?: string; email?: string; subject?: string; message?: string; }
const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

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

function ErrorToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="shrink-0 text-red-400 hover:text-red-600 transition-colors">
          <X size={13} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-green-200 bg-green-50 p-10 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 border border-green-200">
        <CheckCircle size={30} className="text-green-600" />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Message Sent!</h3>
        <p className="text-sm text-gray-500">
          Thank you! I&apos;ll get back to you within 24–48 hours.
          <br />
          Check your inbox for a confirmation email.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="text-sm text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors"
      >
        Send another message
      </button>
    </motion.div>
  );
}

export function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [status, setStatus]           = useState<Status>("idle");
  const [form, setForm]               = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError]       = useState<string>("");
  const [honeypot, setHoneypot]       = useState("");

  const inputBase = "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all";
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError
      ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200"
      : "border-gray-300 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
    }`;

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const errors = validate(form);
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    setStatus("loading");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      setForm(EMPTY_FORM);
      setFieldErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setApiError(message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gray-50">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Get in touch</p>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Let&apos;s <span className="accent-text">Connect</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Whether you have an opportunity, project idea, or simply want to connect — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left — socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Connect with me</h3>
              <p className="text-sm text-gray-500">Find me on these platforms or reach out directly.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={`flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all ${color}`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Email card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs text-gray-400">Email directly</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Response time */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-xs text-indigo-700">
                I typically respond within <strong>24–48 hours</strong>. Open to internships, freelance projects, and collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              >
                {apiError && <ErrorToast message={apiError} onClose={() => setApiError("")} />}

                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  tabIndex={-1}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website" name="website" type="text"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1} autoComplete="off"
                  />
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" autoComplete="name"
                      className={inputClass(!!fieldErrors.name)}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      maxLength={100}
                    />
                    {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" autoComplete="email"
                      className={inputClass(!!fieldErrors.email)}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      maxLength={254}
                    />
                    {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass(!!fieldErrors.subject)}
                    placeholder="Internship opportunity / Project collaboration..."
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    maxLength={200}
                  />
                  {fieldErrors.subject && <p className="mt-1 text-xs text-red-500">{fieldErrors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Message <span className="text-red-500">*</span>
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
                    {fieldErrors.message
                      ? <p className="text-xs text-red-500">{fieldErrors.message}</p>
                      : <span />
                    }
                    <span className="text-[10px] text-gray-400">{form.message.length}/5000</span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.99 } : {}}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </motion.button>

                <p className="text-center text-[11px] text-gray-400">
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
