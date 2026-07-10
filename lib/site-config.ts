export const siteConfig = {
  name: "Fizza Ijaz",
  title: "Full Stack Developer",
  heading: {
    lines: [
      "From pixel-perfect interfaces",
      "to scalable backend systems.",
    ],
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "CV", href: "/cv.pdf", external: true },
    { label: "Contact", href: "#contact" },
  ],
  contact: [
    { label: "Email", href: "mailto:hello@example.com", icon: "email" as const },
    { label: "GitHub", href: "https://github.com/Fizza-77", icon: "github" as const },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  ],
  profileImage: "/profile.jpeg",
  githubUsername: "Fizza-77",
  excludedRepos: [
    "swift",
    "DriveDex-SRE",
    "Eventasy-UI-UX-Design",
    "Dermmate-ai-dermatology-platform",
    "boardly",
  ],
  featuredRepos: ["Hairlytic-Part-1", "Quran_Academy"],
  collaborativeRepos: [
    { owner: "Minahil-24", repo: "dermmate" },
  ],
  cv: {
    href: "/cv.pdf",
    filename: "Fizza-Ijaz-CV.pdf",
  },
  about: {
    bio: "I'm a Full Stack Developer specializing in modern web applications and AI-powered products. I build end-to-end products, from intuitive user interfaces to secure backend architectures, with a strong focus on performance, maintainability, and user experience. My focus is building software that's both technically robust and thoughtfully designed.",
    education: {
      period: "2022 — 2026",
      degree: "Bachelor of Software Engineering",
      institution: "Riphah International University",
      cgpa: "3.55",
    },
  },
} as const;
