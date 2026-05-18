import type { Resume } from "@/schema";

export const emptyResume: Resume = {
  basics: {
    name: "",
    title: "",
    phone: "",
    email: "",
    city: "",
    links: [],
  },
  summary: "",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  awards: [],
  additional: "",
};

export const sampleResume: Resume = {
  basics: {
    name: "Taylor Chen",
    title: "Frontend Engineer / Platform Developer",
    phone: "+86 138 0000 0000",
    email: "taylor.chen@example.com",
    city: "Beijing",
    links: [
      { label: "GitHub", url: "https://github.com/example" },
      { label: "Portfolio", url: "https://example.dev" },
    ],
  },
  summary:
    "Frontend engineer focused on maintainable platforms, design systems, and reliable delivery. Experienced in turning ambiguous product workflows into validated, observable, and reusable interfaces.",
  experience: [
    {
      company: "ByteDance Foundation Platform",
      role: "Frontend Engineer",
      city: "Beijing",
      start: "2023.07",
      end: "Present",
      highlights: [
        "Refactored core workspace pages into reusable form and preview patterns.",
        "Built PDF export and print-safe rendering for single-page resume output.",
        "Centralized state persistence and schema validation to improve reliability.",
      ],
    },
  ],
  projects: [
    {
      name: "Resume Editor And Exporter",
      role: "Owner",
      link: "",
      start: "2026.05",
      end: "2026.05",
      techStack: [
        "React 19",
        "Vite",
        "Tailwind CSS",
        "Ant Design",
        "Jotai",
        "Zod",
      ],
      highlights: [
        "Delivered an editor with real-time A4 preview and local draft persistence.",
        "Validated persisted data at load boundaries with Zod before hydration.",
        "Exported the rendered paper view into a single-page PDF document.",
      ],
    },
  ],
  education: [
    {
      school: "Example University",
      major: "Computer Science",
      degree: "Bachelor",
      start: "2019.09",
      end: "2023.06",
      highlights: ["GPA 3.8/4.0", "University scholarship recipient"],
    },
  ],
  skills: [
    {
      name: "Frontend",
      items: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
    },
    { name: "Engineering", items: ["ESLint", "Monorepo", "pnpm", "CI/CD"] },
  ],
  awards: [
    {
      title: "Engineering Excellence Award",
      date: "2024.11",
      detail:
        "Recognized for improving delivery quality and developer experience.",
    },
  ],
  additional:
    "Open source, technical writing, and cross-functional collaboration.",
};
