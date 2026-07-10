"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/experience";

const ease = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, ease },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Experience() {
  return (
    <section className="experience-section relative px-6 py-24 text-white md:px-10 md:py-32 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight md:mb-16 md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="flex max-w-3xl flex-col gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {experience.map((item, index) => (
            <motion.article key={item.company} variants={itemVariants}>
              <p className="mb-2 text-sm text-white/50">{item.period}</p>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                {item.role}
              </h3>
              <p className="mb-4 text-base text-white/70">{item.company}</p>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-white/60 marker:text-white/40 md:text-lg md:leading-8">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {index < experience.length - 1 && (
                <div
                  className="mt-10 border-t border-white/15 md:mt-12"
                  aria-hidden
                />
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
