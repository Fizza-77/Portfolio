"use client";

import { motion } from "framer-motion";
import { caseStudies } from "@/lib/projects";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Projects() {
  return (
    <section
      id="work"
      className="relative bg-black px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Case Studies
          </h2>
        </motion.div>

        <motion.div
          className="case-study-accordion"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
        >
          {caseStudies.map((study) => (
            <div key={study.number} className="case-study-strip">
              <div className="case-study-strip-inner">
                <span className="case-study-strip-label">
                  {study.outerTitle ?? study.title}
                </span>
                <div className="case-study-strip-details">
                  <p className="case-study-strip-subtitle">{study.subtitle}</p>
                  <p className="case-study-strip-description">
                    {study.description}
                  </p>
                  <p className="case-study-strip-tags">
                    {study.tags.join(" | ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
