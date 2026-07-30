
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Lang = 'es' | 'en';

/** Union type of all valid translation keys. Provides autocomplete and typo prevention. */
type TranslationKey = keyof typeof translations.en;

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  /** Returns the translated string for the given key. Falls back to English if the key is missing. */
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextType | null>(null);

const translations = {
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.certificates': 'Certificates',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',
    'hero.badge': 'Available for opportunities',
    'hero.role': 'Software Developer · Future Industrial Engineer',
    'hero.description': 'Building software that solves real-world problems through clean architecture, scalable systems and thoughtful user experiences.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.cv': 'Download CV',
    'hero.cta.github': 'GitHub',
    'hero.cta.contact': 'Contact',
    'about.label': 'About',
    'about.title': 'Engineering mindset.\nProduct intuition.',
    'about.p1': "I am a software developer driven by a deep passion for solving complex problems through technology. My approach combines analytical thinking with a product-oriented mindset — I don't just write code, I architect solutions that scale.",
    'about.p2': 'My journey began with game development and desktop applications, which taught me the fundamentals of performance and user experience. Today, I build Progressive Web Applications with modern stacks, always prioritizing clean architecture and maintainability.',
    'about.p3': 'Currently pursuing Industrial Engineering, I bring a unique perspective that bridges technical development with process optimization, systems thinking, and operational efficiency.',
    'skills.label': 'Skills',
    'skills.title': 'Technologies & Tools',
    'skills.subtitle': 'A curated stack built for performance, scalability, and modern user experiences.',
    'skills.proficient': 'Proficient',
    'skills.learning': 'Currently Learning',
    'skills.ide.title': 'tech-stack.json',
    'skills.ide.comment': '// Hover to inspect',
    'projects.label': 'Featured Projects',
    'projects.title': 'Selected Work',
    'certificates.label': 'Certifications',
    'certificates.title': 'Certificates',
    'opensource.label': 'Open Source',
    'opensource.title': 'Coming Soon',
    'opensource.desc': 'I am currently preparing the public release of my projects with complete documentation, clean architecture, professional README files, screenshots and development history.',
    'journey.label': 'Journey',
    'journey.title': 'My Path',
    'contact.label': 'Contact',
    'contact.title': "Let's Connect",
    'contact.copy': 'Copy Email',
    'contact.copied': 'Copied!',
    'contact.openMail': 'Open Mail App',
    'contact.linkedinSoon': 'LinkedIn — Coming Soon',
    'footer.quote': '"Great software begins with understanding people before writing code."',
    'footer.copyright': 'Crafted with precision.',
  },
  es: {
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.certificates': 'Certificados',
    'nav.journey': 'Trayectoria',
    'nav.contact': 'Contacto',
    'hero.badge': 'Disponible para oportunidades',
    'hero.role': 'Desarrollador de Software · Futuro Ingeniero Industrial',
    'hero.description': 'Construyendo software que resuelve problemas reales mediante arquitectura limpia, sistemas escalables y experiencias de usuario bien pensadas.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.cv': 'Descargar CV',
    'hero.cta.github': 'GitHub',
    'hero.cta.contact': 'Contacto',
    'about.label': 'Sobre mí',
    'about.title': 'Mentalidad de ingeniería.\nIntuición de producto.',
    'about.p1': 'Soy un desarrollador de software impulsado por una profunda pasión por resolver problemas complejos a través de la tecnología. Mi enfoque combina el pensamiento analítico con una mentalidad orientada al producto: no solo escribo código, diseño arquitecturas que escalan.',
    'about.p2': 'Mi viaje comenzó con el desarrollo de juegos y aplicaciones de escritorio, lo que me enseñó los fundamentos del rendimiento y la experiencia de usuario. Hoy construyo Aplicaciones Web Progresivas con stacks modernos, priorizando siempre la arquitectura limpia y la mantenibilidad.',
    'about.p3': 'Actualmente estudio Ingeniería Industrial, lo que me aporta una perspectiva única que une el desarrollo técnico con la optimización de procesos, el pensamiento de sistemas y la eficiencia operacional.',
    'skills.label': 'Habilidades',
    'skills.title': 'Tecnologías y Herramientas',
    'skills.subtitle': 'Un stack curado para rendimiento, escalabilidad y experiencias de usuario modernas.',
    'skills.proficient': 'Dominado',
    'skills.learning': 'Aprendiendo',
    'skills.ide.title': 'tech-stack.json',
    'skills.ide.comment': '// Pasa el cursor para inspeccionar',
    'projects.label': 'Proyectos Destacados',
    'projects.title': 'Trabajo Seleccionado',
    'certificates.label': 'Certificaciones',
    'certificates.title': 'Certificados',
    'opensource.label': 'Código Abierto',
    'opensource.title': 'Próximamente',
    'opensource.desc': 'Actualmente estoy preparando el lanzamiento público de mis proyectos con documentación completa, arquitectura limpia, archivos README profesionales, capturas de pantalla e historial de desarrollo.',
    'journey.label': 'Trayectoria',
    'journey.title': 'Mi Camino',
    'contact.label': 'Contacto',
    'contact.title': 'Conectemos',
    'contact.copy': 'Copiar Email',
    'contact.copied': '¡Copiado!',
    'contact.openMail': 'Abrir App de Correo',
    'contact.linkedinSoon': 'LinkedIn — Próximamente',
    'footer.quote': '"El gran software comienza por entender a las personas antes de escribir código."',
    'footer.copyright': 'Crafteado con precisión.',
  },
} as const;

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang;
    return saved === 'es' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'));

  const t = (key: TranslationKey): string =>
    (translations[lang][key] as string) ?? (translations.en[key] as string) ?? key;

  return <LangContext.Provider value={{ lang, toggleLang, t }}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
