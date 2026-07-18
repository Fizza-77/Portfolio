"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function CvDownload() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-10, 10]), {
    stiffness: 220,
    damping: 20,
  });

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      id="cv"
      className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16"
      aria-labelledby="cv-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 40%, rgba(168,85,247,0.35) 41%, transparent 42%), linear-gradient(225deg, transparent 48%, rgba(255,255,255,0.08) 49%, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.h2
            id="cv-heading"
            className="max-w-xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            Grab the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">CV</span>
              <motion.span
                className="absolute bottom-1 left-0 z-0 h-3 w-full bg-purple-500/40 md:bottom-2 md:h-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease }}
                style={{ originX: 0 }}
                aria-hidden
              />
            </span>
            .
          </motion.h2>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <motion.a
              href={siteConfig.cv.href}
              download={siteConfig.cv.filename}
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black sm:w-auto"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <span className="absolute inset-0 translate-y-full bg-purple-300 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10">Download CV</span>
              <motion.span
                className="relative z-10"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDownRight className="size-4" strokeWidth={2} />
              </motion.span>
            </motion.a>

            <p className="font-mono text-xs text-white/40">
              {siteConfig.cv.filename}
            </p>
          </motion.div>
        </div>

        <motion.a
          ref={cardRef}
          href={siteConfig.cv.href}
          download={siteConfig.cv.filename}
          className="relative mx-auto block w-full max-w-sm touch-manipulation perspective-[1000px] outline-none lg:mx-0 lg:ml-auto"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          aria-label="Download CV"
        >
          <motion.div
            className="absolute -inset-3 rounded-[28px] border border-dashed border-white/15"
            animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141414] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-8 flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
                <FileText className="size-6" strokeWidth={1.5} />
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-white/50 uppercase">
                PDF
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </h3>
            <p className="mt-1 text-sm text-white/50">{siteConfig.title}</p>

            <p className="mt-6 text-sm leading-relaxed text-white/55">
              Full stack work across Next.js, Node, and AI-powered products.
              Experience, projects, and the tools I ship with.
            </p>

            <div className="mt-8 flex items-center justify-end border-t border-white/10 pt-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-300">
                Download
                <ArrowDownRight className="size-3.5" strokeWidth={2} />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
