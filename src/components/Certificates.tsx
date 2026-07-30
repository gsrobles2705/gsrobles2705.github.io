
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { certificates } from '@/data/certificates';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Award, ExternalLink, FileCheck } from 'lucide-react';

export default function Certificates() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t, lang } = useLang();
  const handleMouseMove = useSpotlight();

  return (
    <section id="certificates" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('certificates.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-12">
          {t('certificates.title')}
        </h2>

        <div className="grid sm:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.file}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              className="group relative glass-v2 glass-v2-hover rounded-2xl p-6 flex flex-col gap-4 card-spotlight card-shine"
              data-cursor-hover
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white/80 font-mono mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {lang === 'es' ? cert.titleEs : cert.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/35 mb-3">
                    <FileCheck size={11} />
                    {cert.issuer}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/30 group-hover:text-accent/70 transition-colors font-mono pt-3 border-t border-white/[0.04]">
                  {lang === 'es' ? 'Ver certificado' : 'View certificate'}
                  <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
