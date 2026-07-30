
export interface Project {
  name: string;
  status: 'live' | 'wip';
  statusLabel: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'FinTrack',
    status: 'live',
    statusLabel: 'Live',
    description:
      'A PWA for personal finance management. Works offline, no ads, no accounts required. Features daily budgets, savings goals, and debt tracking.',
    tags: ['PWA', 'Offline', 'Finance'],
  },
  {
    name: 'RepUs',
    status: 'live',
    statusLabel: 'Live',
    description:
      'Collaborative workspace with real-time chat, role-based access, file sharing, and comments. Built on Firebase for instant synchronization.',
    tags: ['Firebase', 'Real-time', 'Collaboration'],
  },
  {
    name: "Touchê",
    status: 'live',
    statusLabel: 'Live',
    description:
      'Landing page and PWA developed for a tailoring business. Google Login integration, Firebase backend, and Tailwind-styled interface.',
    tags: ['Landing', 'PWA', 'Firebase'],
  },
  {
    name: 'Arcade Games Collection',
    status: 'wip',
    statusLabel: 'Refactoring',
    description:
      'Classic games rebuilt — Flappy Bird, Tetris, Pong, and Tic Tac Toe. Currently undergoing a complete architectural refactor for better performance.',
    tags: ['Games', 'Canvas', 'Refactor'],
  },
  {
    name: 'Random Generator',
    status: 'live',
    statusLabel: 'Live',
    description:
      'High-performance random number generator capable of producing millions of values using optimized C++ algorithms.',
    tags: ['C++', 'Performance', 'Algorithms'],
  },
];
