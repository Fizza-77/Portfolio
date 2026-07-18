"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

type FormStatus = "idle" | "loading" | "success" | "error";

const prompts = [
  "a new build",
  "a collaboration",
  "an idea",
  "a freelance gig",
  "just saying hi",
];

const fieldClass =
  "peer w-full rounded-2xl border border-white/10 bg-black/50 px-4 pb-3 pt-6 text-sm text-white outline-none transition-all duration-300 placeholder:text-transparent focus:border-purple-400/60 focus:bg-black/70 focus:shadow-[0_0_0_4px_rgba(168,85,247,0.12)] disabled:opacity-60";

const labelClass =
  "pointer-events-none absolute left-4 top-3.5 origin-left text-xs text-white/40 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-purple-300";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const smoothX = useSpring(spotlightX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(spotlightY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % prompts.length);
    }, 2200);

    return () => window.clearInterval(id);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback("Message launched. I'll reply soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Network glitch. Try once more.");
    }
  }

  function handleSectionMove(event: MouseEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16"
      aria-labelledby="contact-heading"
      onMouseMove={handleSectionMove}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute hidden size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_65%)] md:block"
          style={{ left: smoothX, top: smoothY }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <motion.div
          className="absolute right-[8%] top-16 hidden size-24 rounded-full border border-purple-400/20 sm:block"
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-[10%] size-3 rounded-full bg-cyan-300/50"
          animate={{ y: [0, 18, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <h2
              id="contact-heading"
              className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Let&apos;s make{" "}
              <span className="relative inline-block text-purple-300">
                something
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-purple-400 to-cyan-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease }}
                />
              </span>{" "}
              together.
            </h2>
          </motion.div>

          <motion.div
            className="max-w-xs font-mono text-sm text-white/45"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div className="relative h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={prompts[promptIndex]}
                  className="absolute inset-0 text-purple-200"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {prompts[promptIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-4 sm:rounded-[28px] sm:p-6 md:p-8 lg:p-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          noValidate
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-purple-500/10 blur-2xl"
            aria-hidden
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.label
              className="relative block"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
                placeholder="Your name"
                disabled={status === "loading"}
              />
              <span className={labelClass}>Your name</span>
            </motion.label>

            <motion.label
              className="relative block"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={200}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
                placeholder="you@example.com"
                disabled={status === "loading"}
              />
              <span className={labelClass}>Email address</span>
            </motion.label>
          </div>

          <motion.label
            className="relative mt-5 block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
          >
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${fieldClass} min-h-[140px] resize-y`}
              placeholder="Your message"
              disabled={status === "loading"}
            />
            <span className="pointer-events-none absolute left-4 top-3.5 text-xs text-white/40 transition-colors peer-focus:text-purple-300">
              Your message
            </span>
            <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] text-white/30">
              {message.length}/2000
            </span>
          </motion.label>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-purple-300 to-cyan-200 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 inline-flex items-center gap-2">
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                    Launching...
                  </>
                ) : status === "success" ? (
                  <>
                    <Check className="size-4" strokeWidth={2} />
                    Sent
                  </>
                ) : (
                  <>
                    Fire it off
                    <motion.span
                      animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>

            <AnimatePresence mode="wait">
              {feedback && (
                <motion.p
                  key={feedback}
                  className={`text-sm ${
                    status === "success" ? "text-emerald-400" : "text-red-400"
                  }`}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-hidden
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute size-2 rounded-full bg-purple-300"
                    style={{
                      left: `${10 + (index % 6) * 15}%`,
                      top: "55%",
                    }}
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      y: -120 - index * 8,
                      x: (index % 2 === 0 ? 1 : -1) * (20 + index * 6),
                      scale: 0.2,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
