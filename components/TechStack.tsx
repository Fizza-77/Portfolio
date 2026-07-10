"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/tech-stack";

const ease = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function TechStack() {
  return (
    <section className="relative bg-black px-6 py-24 text-white md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="mb-12 text-3xl font-bold tracking-tight md:mb-16 md:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          Tech Stack
        </motion.h2>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {techStack.map((group) => (
            <motion.div key={group.category} variants={itemVariants}>
              <article className="tech-stack-card">
                <div className="tech-stack-border" />
                <div className="tech-stack-content">
                  <div className="tech-stack-inner">
                    <span className="tech-stack-category">
                      {group.category}
                    </span>
                    <ul className="tech-stack-items">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className="tech-stack-bottom-text">{group.category}</span>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
