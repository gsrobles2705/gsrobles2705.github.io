
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { aboutCodeLines } from '@/data/about-data';
import CodeBlock from './CodeBlock';

export default function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t, lang } = useLang();
  const codeLines = aboutCodeLines[lang] || aboutCodeLines.en;
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('about.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-12 whitespace-pre-line">
          {t('about.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-start">
          <div className="space-y-5 text-lg leading-[1.8] text-muted order-2 lg:order-1">
            <p className="hover:text-white/70 transition-colors duration-300">{t('about.p1')}</p>
            <p className="hover:text-white/70 transition-colors duration-300">{t('about.p2')}</p>
            <p className="hover:text-white/70 transition-colors duration-300">{t('about.p3')}</p>
          </div>

          <div className="order-1 lg:order-2 flex flex-col gap-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative group"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
                {!imgError ? (
                  <img
                    src="/profile.jpg"
                    alt="Gabriel Saúl Robles García"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-surface flex items-center justify-center">
                    <span className="text-white/30 font-mono text-sm">GS</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent" />
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-accent">
                    @gsrobles2705
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f] animate-pulse" />
                    <span className="text-[9px] font-mono text-white/50">Online</span>
                  </span>
                </div>
              </div>
            </motion.div>

            <CodeBlock
              filename={lang === 'es' ? '// sobre-mi.config.ts' : '// about-me.config.ts'}
              lines={codeLines}
              delay={0.3}
              compact
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
