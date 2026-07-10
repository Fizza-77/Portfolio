export type TechCategory = {
  category: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "Supabase", "PostgreSQL"],
  },
  {
    category: "AI",
    items: ["PyTorch", "YOLOv8", "Computer Vision", "OpenCV"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker", "Vercel", "Linux"],
  },
];
