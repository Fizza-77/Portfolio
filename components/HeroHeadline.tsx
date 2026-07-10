"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
};

function AnimatedChar({
  char,
  index,
  hovered,
}: {
  char: string;
  index: number;
  hovered: boolean;
}) {
  if (char === " ") {
    return <span className="inline-block w-[0.28em]" aria-hidden />;
  }

  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: "1.2em" }}
    >
      <motion.span
        className="flex flex-col"
        animate={{ y: hovered ? "-50%" : "0%" }}
        transition={{ ...spring, delay: index * 0.028 }}
      >
        <span className="flex h-[1.2em] items-center">{char}</span>
        <span className="flex h-[1.2em] items-center bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          {char}
        </span>
      </motion.span>
    </span>
  );
}

type HeroHeadlineProps = {
  lines: readonly string[];
};

export default function HeroHeadline({ lines }: HeroHeadlineProps) {
  const [hovered, setHovered] = useState(false);
  let charIndex = 0;

  return (
    <motion.h1
      className="max-w-[560px] cursor-default text-center text-[1.75rem] font-bold leading-[1.35] tracking-tight sm:text-3xl md:text-4xl md:leading-[1.3] lg:text-[2.75rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        letterSpacing: hovered ? "0.025em" : "0em",
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {lines.map((line) => {
        const words = line.split(" ");

        return (
          <span key={line} className="block py-0.5">
            {words.map((word, wordIndex) => (
              <span
                key={`${line}-${word}`}
                className="inline-block whitespace-nowrap"
              >
                {word.split("").map((char) => {
                  const index = charIndex;
                  charIndex += 1;
                  return (
                    <AnimatedChar
                      key={`${line}-${index}`}
                      char={char}
                      index={index}
                      hovered={hovered}
                    />
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span className="inline-block w-[0.28em]" aria-hidden />
                )}
              </span>
            ))}
          </span>
        );
      })}
    </motion.h1>
  );
}
