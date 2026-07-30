
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { openSourceItems } from '@/data/opensource';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Github, BookOpen, FileText, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'GitHub Repository': Github,
  'Repositorio GitHub': Github,
  'Documentation': BookOpen,
  'Documentación': BookOpen,
  'README': FileText,
};

export default function OpenSource() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t, lang } = useLang();
  const handleMouseMove = useSpotlight();

  return (
    <section id="opensource" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('opensource.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4">
          {t('opensource.title')}
        </h2>
        <p className="text-white/45 leading-[1.7] max-w-[600px] mb-10 text-[15px]">
          {t('opensource.desc')}
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {openSourceItems.map((item, i) => {
            const Icon = iconMap[item.label] || FileText;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                className="group relative glass-v2 glass-v2-hover rounded-2xl p-7 text-center card-spotlight shimmer"
                data-cursor-hover
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-accent/[0.04] border border-accent/10 flex items-center justify-center text-accent/80 group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-[15px] font-semibold mb-3 text-white/70 font-mono group-hover:text-white/90 transition-colors duration-300">
                    {item.label}
                  </h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06]">
                    <Rocket size={11} className="text-accent/60" />
                    <span className="text-[11px] text-white/40 font-mono">
                      {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
