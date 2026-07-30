
import {
  SiCplusplus, SiPython, SiHtml5, SiCss,
  SiJavascript, SiTypescript, SiReact, SiFirebase,
  SiTailwindcss, SiGit, SiGithub,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export interface TechItem {
  name: string;
  icon: IconType;
  level: string;
  percent: number;
  color: string;
  bgGlow: string;
  category: 'proficient' | 'learning';
  ext: string;
  detail: string;
}

export const technologies: TechItem[] = [
  {
    name: 'C++',
    icon: SiCplusplus,
    level: 'Advanced',
    percent: 90,
    color: '#61afef',
    bgGlow: 'rgba(97,175,239,0.08)',
    category: 'proficient',
    ext: '.cpp',
    detail: 'Memory management, OOP, STL, algorithm optimization for high-performance computing.',
  },
  {
    name: 'Python',
    icon: SiPython,
    level: 'Advanced',
    percent: 85,
    color: '#e5c07b',
    bgGlow: 'rgba(229,192,123,0.08)',
    category: 'proficient',
    ext: '.py',
    detail: 'Scripting, data processing, automation, and backend prototyping.',
  },
  {
    name: 'HTML5',
    icon: SiHtml5,
    level: 'Expert',
    percent: 95,
    color: '#e06c75',
    bgGlow: 'rgba(224,108,117,0.08)',
    category: 'proficient',
    ext: '.html',
    detail: 'Semantic markup, accessibility, SEO best practices, modern APIs.',
  },
  {
    name: 'CSS3',
    icon: SiCss,
    level: 'Expert',
    percent: 90,
    color: '#61afef',
    bgGlow: 'rgba(97,175,239,0.08)',
    category: 'proficient',
    ext: '.css',
    detail: 'Flexbox, Grid, animations, responsive design, custom properties.',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    level: 'Proficient',
    percent: 80,
    color: '#e5c07b',
    bgGlow: 'rgba(229,192,123,0.08)',
    category: 'proficient',
    ext: '.js',
    detail: 'ES6+, DOM manipulation, async/await, event-driven architecture.',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    level: 'Proficient',
    percent: 78,
    color: '#61afef',
    bgGlow: 'rgba(97,175,239,0.08)',
    category: 'proficient',
    ext: '.ts',
    detail: 'Type safety, interfaces, generics, strict mode adoption.',
  },
  {
    name: 'React',
    icon: SiReact,
    level: 'Proficient',
    percent: 75,
    color: '#56b6c2',
    bgGlow: 'rgba(86,182,194,0.08)',
    category: 'proficient',
    ext: '.tsx',
    detail: 'Components, hooks, state management, JSX, virtual DOM.',
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    level: 'Proficient',
    percent: 82,
    color: '#56b6c2',
    bgGlow: 'rgba(86,182,194,0.08)',
    category: 'proficient',
    ext: '.css',
    detail: 'Utility-first styling, custom config, dark mode, JIT engine.',
  },
  {
    name: 'Firebase',
    icon: SiFirebase,
    level: 'Learning',
    percent: 55,
    color: '#e5c07b',
    bgGlow: 'rgba(229,192,123,0.08)',
    category: 'learning',
    ext: '.fb',
    detail: 'Auth, Firestore, real-time sync, hosting, cloud functions.',
  },
  {
    name: 'Git',
    icon: SiGit,
    level: 'Proficient',
    percent: 70,
    color: '#e06c75',
    bgGlow: 'rgba(224,108,117,0.08)',
    category: 'proficient',
    ext: '.git',
    detail: 'Version control, branching, rebasing, CI/CD workflows.',
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    level: 'Proficient',
    percent: 72,
    color: '#abb2bf',
    bgGlow: 'rgba(171,178,191,0.08)',
    category: 'proficient',
    ext: '.md',
    detail: 'Repositories, actions, pages, collaboration, open source.',
  },
];
