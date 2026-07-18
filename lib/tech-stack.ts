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
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Prisma",
      "REST APIs",
      "JWT",
      "Supabase",
    ],
  },
  {
    category: "AI",
    items: ["PyTorch", "YOLOv8", "Computer Vision", "OpenCV"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "Linux",
      "Postman",
      "VS Code",
      "Figma",
      "npm",
      "Cloudinary",
    ],
  },
];
