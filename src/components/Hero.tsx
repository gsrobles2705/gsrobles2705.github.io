
import { motion } from 'framer-motion';
import { Github, Mail, FileDown, ArrowRight, Terminal } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useLang } from '@/context/LangContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Decorative floating code snippets rendered behind the hero content. */
const floatingSnippets = [
  { text: 'const', x: '8%', y: '12%', delay: 0, color: '#c678dd', dur: 9 },
  { text: '</>', x: '92%', y: '8%', delay: 1.5, color: '#4F7CFF', dur: 11 },
  { text: 'git push', x: '88%', y: '78%', delay: 0.5, color: '#98c379', dur: 10 },
  { text: 'return', x: '5%', y: '65%', delay: 2.2, color: '#c678dd', dur: 8 },
  { text: 'async', x: '95%', y: '35%', delay: 1.0, color: '#c678dd', dur: 12 },
  { text: '{}', x: '3%', y: '40%', delay: 3.0, color: '#56b6c2', dur: 9 },
  { text: '=>', x: '75%', y: '18%', delay: 0.8, color: '#56b6c2', dur: 10 },
  { text: 'npm i', x: '20%', y: '88%', delay: 2.5, color: '#d19a66', dur: 11 },
  { text: 'await', x: '60%', y: '5%', delay: 1.8, color: '#c678dd', dur: 9 },
  { text: 'true', x: '45%', y: '92%', delay: 0.3, color: '#d19a66', dur: 12 },
  { text: 'null', x: '15%', y: '30%', delay: 3.5, color: '#d19a66', dur: 10 },
  { text: '[]', x: '80%', y: '55%', delay: 2.0, color: '#e06c75', dur: 8 },
  { text: 'import', x: '35%', y: '8%', delay: 4.0, color: '#c678dd', dur: 11 },
  { text: 'export', x: '65%', y: '85%', delay: 1.2, color: '#c678dd', dur: 9 },
  { text: 'void', x: '50%', y: '15%', delay: 2.8, color: '#61afef', dur: 10 },
];

/** Typewriter word lists per language. Defined outside the component to avoid re-creation on every render. */
const typewriterWordsByLang: Record<string, string[]> = {
  es: [
    'const desarrollador = "Gabriel Robles";',
    'console.log("¡Hola, Mundo!");',
    'import { Pasión } from "código";',
    'function construir() { return "Innovación"; }',
    '<Ingeniero mentalidad="producto" />',
    'git commit -m "¡Lanzarlo! 🚀"',
  ],
  en: [
    'const developer = "Gabriel Robles";',
    'console.log("Hello, World!");',
    'import { Passion } from "code";',
    'function build() { return "Innovation"; }',
    '<Engineer mindset="product" />',
    'git commit -m "Ship it! 🚀"',
  ],
};

export default function Hero() {
  const { t, lang } = useLang();
  const words = typewriterWordsByLang[lang] ?? typewriterWordsByLang.en;

  const { text } = useTypewriter({
    words,
    typingSpeed: 60,
    deletingSpeed: 30,
    pauseDuration: 2000,
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start relative overflow-hidden"
    >
      {/* Expansive glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-accent/[0.025] blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-[#4F7CFF]/[0.02] blur-[80px]" />
      </div>

      {/* Floating code particles */}
      {floatingSnippets.map((snippet, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.35, 0.15, 0.35, 0],
            y: [0, -40, -15, -50, -25],
            x: [0, 15, -15, 8, 0],
          }}
          transition={{
            duration: snippet.dur,
            delay: snippet.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute pointer-events-none font-mono text-[10px] md:text-[11px] select-none hidden sm:block"
          style={{
            left: snippet.x,
            top: snippet.y,
            color: snippet.color,
            textShadow: `0 0 25px ${snippet.color}50`,
          }}
        >
          {snippet.text}
        </motion.span>
      ))}

      {/* Smooth transition to the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10 pt-20 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-[13px] font-medium mb-8 font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-2px] mb-4"
          >
            <span className="glitch-text" data-text="Gabriel Saúl">
              Gabriel Saúl
            </span>
            <br />
            <span className="text-accent glitch-text" data-text="Robles García">
              Robles García
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[clamp(18px,2.5vw,24px)] font-normal text-muted mb-6 font-mono"
          >
            {t('hero.role')}
          </motion.p>

          {/* Terminal */}
          <motion.div variants={itemVariants} className="mb-10 max-w-[680px]">
            <div className="rounded-xl border border-white/[0.06] bg-[#0d0d12]/80 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#111118]/80 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <Terminal size={11} className="text-white/20 ml-1" />
                <span className="text-[10px] text-white/25 font-mono ml-1">gabriel@portfolio:~$</span>
              </div>
              <div className="px-4 py-4 font-mono text-[13px] md:text-sm leading-[1.7]">
                <span className="text-[#27c93f]">➜</span>{' '}
                <span className="text-[#61afef]">~</span>{' '}
                <span className="text-white/60">cat</span>{' '}
                <span className="text-[#d19a66]">{lang === 'es' ? 'mision.txt' : 'mission.txt'}</span>
                <br />
                <span className="text-white/80">{t('hero.description')}</span>
                <br />
                <br />
                <span className="text-[#5c6370]">{'// '}{lang === 'es' ? 'Escribiendo código...' : 'Writing code...'}</span>
                <br />
                {/* Animated typewriter — hidden from screen readers to avoid disruption */}
                <span aria-hidden="true">
                  <span className="text-[#c678dd]">{'>'}</span>{' '}
                  <span className="text-[#98c379]">{text}</span>
                  <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 animate-pulse align-middle" />
                </span>
                {/* Static accessible text for assistive technologies */}
                <span className="sr-only">{t('hero.description')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(79,124,255,0.25)] transition-all duration-300"
            >
              {t('hero.cta.projects')}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="/CV_Gabriel_Robles.pdf"
              download="Gabriel_Robles_CV.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/[0.06] text-white/80 text-sm font-medium hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 font-mono"
            >
              <FileDown size={16} />
              {t('hero.cta.cv')}
            </a>
            <a
              href="https://github.com/gsrobles2705"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/[0.06] text-white/80 text-sm font-medium hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 font-mono"
            >
              <Github size={16} />
              {t('hero.cta.github')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/[0.06] text-white/80 text-sm font-medium hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 font-mono"
            >
              <Mail size={16} />
              {t('hero.cta.contact')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
