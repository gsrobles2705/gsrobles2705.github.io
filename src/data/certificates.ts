
export interface Certificate {
  title: string;
  titleEs: string;
  issuer: string;
  file: string;
}

export const certificates: Certificate[] = [
  {
    title: 'C++ Programming',
    titleEs: 'Programación en C++',
    issuer: 'Udemy',
    file: '/certificates/cpp-programming.pdf',
  },
  {
    title: 'Python Fundamentals',
    titleEs: 'Fundamentos de Python',
    issuer: 'Udemy',
    file: '/certificates/python-fundamentals.pdf',
  },
  {
    title: 'Game Programming for Kids',
    titleEs: 'Programación de Juegos para Niños',
    issuer: 'Udemy',
    file: '/certificates/kids-game-programming.pdf',
  },
];
