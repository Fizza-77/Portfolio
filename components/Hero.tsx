"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SocialCards from "@/components/SocialCards";
import HeroHeadline from "@/components/HeroHeadline";
import { siteConfig } from "@/lib/site-config";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.25, ease } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.45, ease } },
};

function scrollToCaseStudies() {
  const target = document.getElementById("work");
  if (!target) return;

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const duration = 1800;
  let startTime: number | null = null;

  function animateScroll(currentTime: number) {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

export default function Hero() {
  return (
    <section className="grain-overlay relative min-h-[100svh] h-[100svh] overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-[min(500px,70vh)] w-[min(700px,85vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr_auto] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16 lg:py-12">
        {/* Header */}
        <motion.header
          className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:text-left"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-1.5 sm:gap-1">
            <p className="text-2xl font-bold tracking-tight sm:text-base sm:font-medium md:text-lg">
              {siteConfig.name}
            </p>
            <p className="text-base text-white/60 sm:text-sm sm:text-white/50">
              {siteConfig.title}
            </p>
          </div>

          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start md:gap-x-8">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-white"
                    whileHover={{ opacity: 1 }}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>

        {/* Center heading */}
        <div className="flex items-center justify-center px-1 sm:px-2">
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            <HeroHeadline lines={siteConfig.heading.lines} />
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="relative flex items-end justify-between gap-2 overflow-visible sm:gap-4">
          <SocialCards />

          <motion.button
            type="button"
            onClick={scrollToCaseStudies}
            className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 cursor-pointer pb-1 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            aria-label="Scroll to case studies"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="size-5 text-white/30 transition-colors duration-300 hover:text-white/60" strokeWidth={1.5} />
            </motion.div>
          </motion.button>

          <motion.div
            className="flex justify-end overflow-visible"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            <ProfileImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProfileImage() {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      className="group relative size-24 shrink-0 origin-bottom-right cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-zinc-800 shadow-lg sm:size-36 md:size-[220px]"
      whileHover={{
        scale: 1.08,
        y: -8,
        boxShadow: "0 24px 48px rgba(255, 255, 255, 0.12)",
        borderColor: "rgba(255, 255, 255, 0.25)",
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {!hasError ? (
        <Image
          src={siteConfig.profileImage}
          alt={`Portrait of ${siteConfig.name}`}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 220px"
          className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
          priority
          unoptimized
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center text-xs text-white/30">
          Add photo
        </div>
      )}
    </motion.div>
  );
}
