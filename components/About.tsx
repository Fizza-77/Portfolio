"use client";

import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import { siteConfig } from "@/lib/site-config";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 md:py-32 lg:px-16"
    >
      <MatrixBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h2
          className="mb-8 text-3xl font-bold tracking-tight md:mb-10 md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="max-w-3xl space-y-6 text-base leading-relaxed text-white/85 md:text-lg md:leading-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <p>{siteConfig.about.bio}</p>
          <ul className="list-disc space-y-2 pl-5 text-white/75 marker:text-white/40">
            <li>
              Recently graduated from {siteConfig.about.education.institution}
            </li>
            <li>
              {siteConfig.about.education.degree} (
              {siteConfig.about.education.period})
            </li>
            <li>CGPA: {siteConfig.about.education.cgpa}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
