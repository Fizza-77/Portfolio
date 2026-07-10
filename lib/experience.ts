export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "2026 — Present",
    role: "Full Stack Developer",
    company: "Skyen Systems",
    highlights: [
      "Built and maintained production web applications",
      "Developed AI-powered features and internal dashboards",
      "Collaborated with designers and backend teams",
      "Optimized performance and database queries",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Teaching Assistant",
    company: "Riphah International University",
    highlights: [
      "Mentored 50+ students in programming, data structures, and software engineering.",
    ],
  },
];
