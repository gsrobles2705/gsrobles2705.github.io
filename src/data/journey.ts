
export interface Milestone {
  hash: string;
  date: string;
  branch: string;
  msg: string;
  desc: string;
  tag: string | null;
}

export const commits: Milestone[] = [
  { hash: 'a1b2c3d', date: '2020', branch: 'main', msg: 'Scratch', desc: 'Where it all began — visual programming fundamentals', tag: 'init' },
  { hash: 'e4f5g6h', date: '2022', branch: 'main', msg: 'C++', desc: 'Mastering algorithms and systems programming', tag: null },
  { hash: 'i7j8k9l', date: '2023', branch: 'feature/games', msg: 'Game Development', desc: 'Building interactive experiences from the ground up', tag: 'milestone' },
  { hash: 'm0n1o2p', date: '2024', branch: 'feature/games', msg: 'Desktop Applications', desc: 'Native software with real-world utility', tag: null },
  { hash: 'q3r4s5t', date: '2026', branch: 'main', msg: 'PWAs', desc: 'Modern web apps with offline capabilities', tag: 'merge' },
  { hash: 'u6v7w8x', date: '2026', branch: 'feature/oss', msg: 'Open Source', desc: 'Sharing knowledge with the community', tag: null },
  { hash: 'y9z0a1b', date: '2027', branch: 'feature/engineering', msg: 'Industrial Engineering', desc: 'Systems optimization and process management', tag: 'milestone' },
];

export const branchColors: Record<string, string> = {
  main: '#4F7CFF',
  'feature/games': '#e06c75',
  'feature/oss': '#98c379',
  'feature/engineering': '#e5c07b',
  future: '#c678dd',
};

/** Milestone metadata localized by language. Kept separate from commit data to avoid redefining arrays inside components. */
export const milestoneMeta: Record<string, { title: string; desc: string }[]> = {
  es: [
    { title: 'Scratch', desc: 'Donde todo comenzó — fundamentos de programación visual' },
    { title: 'C++', desc: 'Dominando algoritmos y programación de sistemas' },
    { title: 'Desarrollo de Juegos', desc: 'Construyendo experiencias interactivas desde cero' },
    { title: 'Aplicaciones de Escritorio', desc: 'Software nativo con utilidad real' },
    { title: 'PWAs', desc: 'Apps web modernas con capacidades offline' },
    { title: 'Código Abierto', desc: 'Compartiendo conocimiento con la comunidad' },
    { title: 'Ingeniería Industrial', desc: 'Optimización de sistemas y gestión de procesos' },
    { title: 'Futuro Fundador de Startup', desc: 'Construyendo productos que importan' },
  ],
  en: [
    { title: 'Scratch', desc: 'Where it all began — visual programming fundamentals' },
    { title: 'C++', desc: 'Mastering algorithms and systems programming' },
    { title: 'Game Development', desc: 'Building interactive experiences from the ground up' },
    { title: 'Desktop Applications', desc: 'Native software with real-world utility' },
    { title: 'PWAs', desc: 'Modern web apps with offline capabilities' },
    { title: 'Open Source', desc: 'Sharing knowledge with the community' },
    { title: 'Industrial Engineering', desc: 'Systems optimization and process management' },
    { title: 'Future Startup Founder', desc: 'Building products that matter' },
  ],
};
