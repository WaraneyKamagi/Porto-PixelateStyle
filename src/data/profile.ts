/**
 * =====================================================================
 * DATA PRIBADI (LOREM IPSUM PLACEHOLDER)
 * =====================================================================
 * Ganti data di bawah ini dengan data asli Anda kapan saja.
 */

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1 - 100
  category: 'core' | 'frontend' | 'backend' | 'tools';
  coords?: { x: number; y: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  planetTheme: 'cyan' | 'magenta' | 'amber' | 'violet' | 'emerald';
  pixelArtType: 'gas-giant' | 'ring-planet' | 'crater-moon' | 'ice-world' | 'terra';
  stats: {
    status: 'DEPLOYED' | 'IN_ORBIT' | 'PROTOTYPE';
    year: string;
    role: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education';
}

export interface ProfileData {
  name: string;
  classTitle: string;
  level: number;
  hp: number;
  mp: number;
  tagline: string;
  bio: string;
  avatarSeed: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    discord?: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  /* ===================================================================
   * 1. IDENTITAS UTAMA (LOREM IPSUM)
   * =================================================================== */
  name: "LOREM IPSUM",
  classTitle: "LVL 99 GALACTIC DEVELOPER",
  level: 5,
  hp: 999,
  mp: 450,
  tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  avatarSeed: "astro-pilot",

  /* ===================================================================
   * 2. SKILL STATS (LOREM IPSUM / STANDARD TECH)
   * =================================================================== */
  skills: [
    { id: "sk-1", name: "Lorem Framework (React)", level: 95, category: "frontend", coords: { x: 40, y: 30 } },
    { id: "sk-2", name: "Ipsum Script (TypeScript)", level: 90, category: "core", coords: { x: 120, y: 70 } },
    { id: "sk-3", name: "Dolor Motion Engine", level: 96, category: "frontend", coords: { x: 210, y: 40 } },
    { id: "sk-4", name: "Amet Styling (Tailwind)", level: 92, category: "frontend", coords: { x: 280, y: 110 } },
    { id: "sk-5", name: "Consectetur State (Zustand)", level: 88, category: "frontend", coords: { x: 370, y: 60 } },
    { id: "sk-6", name: "Adipiscing Backend (Node)", level: 85, category: "backend", coords: { x: 440, y: 130 } },
    { id: "sk-7", name: "Eiusmod Audio & Canvas", level: 82, category: "tools", coords: { x: 520, y: 80 } },
    { id: "sk-8", name: "Tempor Pixel Graphics", level: 90, category: "tools", coords: { x: 590, y: 150 } },
  ],

  /* ===================================================================
   * 3. GUGUS PROYEK (LOREM IPSUM)
   * =================================================================== */
  projects: [
    {
      id: "proj-1",
      title: "Project Alpha Nebula",
      tagline: "Lorem ipsum dolor sit amet",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      techStack: ["React 19", "TypeScript", "Motion", "Tailwind CSS"],
      demoUrl: "https://example.com/project-alpha",
      repoUrl: "https://github.com/example/project-alpha",
      planetTheme: "cyan",
      pixelArtType: "gas-giant",
      stats: {
        status: "DEPLOYED",
        year: "2025",
        role: "Lead Astro-Dev"
      }
    },
    {
      id: "proj-2",
      title: "Project Beta Pulsar",
      tagline: "Consectetur adipiscing elit",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      techStack: ["Web Audio API", "Canvas 2D", "React"],
      demoUrl: "https://example.com/project-beta",
      repoUrl: "https://github.com/example/project-beta",
      planetTheme: "magenta",
      pixelArtType: "ring-planet",
      stats: {
        status: "DEPLOYED",
        year: "2024",
        role: "Creative Engineer"
      }
    },
    {
      id: "proj-3",
      title: "Project Gamma Quasar",
      tagline: "Sed do eiusmod tempor incididunt",
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      techStack: ["Next.js", "Motion", "Tailwind CSS"],
      demoUrl: "https://example.com/project-gamma",
      repoUrl: "https://github.com/example/project-gamma",
      planetTheme: "amber",
      pixelArtType: "terra",
      stats: {
        status: "IN_ORBIT",
        year: "2024",
        role: "Full-Stack Dev"
      }
    },
    {
      id: "proj-4",
      title: "Project Delta Supernova",
      tagline: "Labore et dolore magna aliqua",
      description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
      techStack: ["React", "WebSocket", "Canvas API"],
      demoUrl: "https://example.com/project-delta",
      repoUrl: "https://github.com/example/project-delta",
      planetTheme: "violet",
      pixelArtType: "ice-world",
      stats: {
        status: "PROTOTYPE",
        year: "2023",
        role: "Frontend Engineer"
      }
    }
  ],

  /* ===================================================================
   * 4. PENGALAMAN & REKAM JEJAK (LOREM IPSUM)
   * =================================================================== */
  experiences: [
    {
      id: "exp-1",
      period: "2023 - PRESENT",
      role: "Senior Galactic Engineer",
      organization: "Lorem Tech Corp",
      location: "Orbit / Remote",
      description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      achievements: [
        "Integer in mauris eu nibh euismod gravida.",
        "Duis ac tellus et risus vulputate vehicula."
      ],
      type: "work"
    },
    {
      id: "exp-2",
      period: "2021 - 2023",
      role: "Frontend Astronaut",
      organization: "Ipsum Interactive Studio",
      location: "Sector 7",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec ipsum nec ante sodales semper.",
      achievements: [
        "Fusce aliquet mollis malesuada pellentesque.",
        "Donec nec justo eget felis facilisis fermentum."
      ],
      type: "work"
    },
    {
      id: "exp-3",
      period: "2017 - 2021",
      role: "B.S. in Astro-Informatics",
      organization: "University of Dolor Sit Amet",
      location: "Earth",
      description: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.",
      achievements: [
        "Cum Laude GPA: 3.9 / 4.0",
        "Captain of the Pixel Programming Guild"
      ],
      type: "education"
    }
  ],

  /* ===================================================================
   * 5. KONTAK (LOREM IPSUM)
   * =================================================================== */
  contact: {
    email: "lorem.ipsum@example-galaxy.dev",
    github: "https://github.com/loremipsum",
    linkedin: "https://linkedin.com/in/loremipsum",
    twitter: "https://twitter.com/loremipsum",
    discord: "lorem#0001"
  }
};
