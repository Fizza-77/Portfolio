export type CaseStudy = {
  number: string;
  title: string;
  outerTitle?: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    title: "HairLytic",
    subtitle: "AI-Powered Alopecia Detection Platform",
    description:
      "An intelligent computer vision platform that detects alopecia from scalp images using a custom-trained YOLOv8 model. Built to provide fast, accurate, and accessible hair loss analysis through an intuitive web interface.",
    tags: ["YOLOv8", "PyTorch", "React.js", "TypeScript"],
  },
  {
    number: "02",
    title: "GitNarrator",
    subtitle: "GitHub Repository → Presentation Generator",
    description:
      "A browser extension that transforms any public GitHub repository into a structured PowerPoint presentation using AI. It analyzes the repository, understands the codebase, and automatically generates presentation-ready slides.",
    tags: ["Next.js", "TypeScript", "AI APIs", "Browser Extension"],
  },
  {
    number: "03",
    title: "DermMate",
    subtitle: "AI Platform for Dermatologists",
    description:
      "A full-stack healthcare platform that assists dermatologists with AI-powered skin disease analysis. Features secure authentication, patient management, and real-time AI inference through a FastAPI backend.",
    tags: ["React.js", "FastAPI", "PostgreSQL", "Python", "YOLOv8"],
  },
  {
    number: "04",
    title: "Emotix",
    subtitle: "Real-Time Emotion Recognition",
    description:
      "A deep learning application capable of detecting human emotions from live camera input. Processes facial expressions in real time and provides instant emotion classification through a modern web interface.",
    tags: ["Python", "OpenCV", "Deep Learning", "Next.js"],
  },
  {
    number: "05",
    title: "Enterprise Admin Dashboard",
    outerTitle: "CRM platform",
    subtitle: "CRM platform",
    description:
      "A centralized admin system integrating CRM, task management, attendance tracking, and content management into a single dashboard. Designed for internal business operations with secure authentication and scalable architecture.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
  },
  {
    number: "06",
    title: "Corporate Website",
    subtitle: "High-Performance Business Website",
    description:
      "Designed and developed a modern corporate website with responsive layouts, optimized performance, and SEO-focused architecture. Built for speed, accessibility, and a seamless user experience.",
    tags: ["Next.js", "Tailwind CSS", "SEO", "Vercel"],
  },
];
