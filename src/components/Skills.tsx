
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { technologies, type TechItem } from '@/data/skills';
import { Terminal, Braces, Zap, ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const lineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

interface TechListProps {
  items: TechItem[];
  startIndex: number;
  label: string;
  activeTech: TechItem | null;
  setActiveTech: (t: TechItem | null) => void;
  isVisible: boolean;
}

function TechList({ items, startIndex, label, activeTech, setActiveTech, isVisible }: TechListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="space-y-0.5"
    >
      <div className="flex items-center gap-2 px-3 py-1 mb-2">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">{label}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      {items.map((tech, i) => (
        <motion.div
          key={tech.name}
          variants={lineVariants}
          onMouseEnter={() => setActiveTech(tech)}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-default transition-all duration-200 ${
            activeTech?.name === tech.name ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
          }`}
          data-cursor-hover
        >
          <span className="text-[11px] text-white/10 font-mono w-6 text-right select-none tabular-nums">
            {startIndex + i + 1}
          </span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: tech.bgGlow }}
          >
            <tech.icon
              size={18}
              style={{ color: tech.color }}
              className="transition-transform duration-300 group-hover:rotate-6"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-medium text-white/80">{tech.name}</span>
              <span className="text-[10px] font-mono text-white/20">{tech.ext}</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 w-[140px]">
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tech.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: tech.color }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/25 tabular-nums w-7 text-right">
              {tech.percent}%
            </span>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
            style={{
              color: tech.color,
              borderColor: `${tech.color}20`,
              backgroundColor: `${tech.color}08`,
            }}
          >
            {tech.level}
          </span>
          <ChevronRight size={12} className="text-white/10 group-hover:text-white/30 transition-colors" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t } = useLang();
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  const proficient = technologies.filter((tech) => tech.category === 'proficient');
  const learning = technologies.filter((tech) => tech.category === 'learning');

  return (
    <section id="skills" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('skills.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4">
          {t('skills.title')}
        </h2>
        <p className="text-white/40 max-w-[520px] mb-14 leading-relaxed">{t('skills.subtitle')}</p>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d12] overflow-hidden shadow-2xl relative">
          {/* Subtle scan line effect */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-scan" />
          </div>

          {/* VSCode-style header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-white/[0.05]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <Terminal size={12} className="text-white/20 ml-1" />
            <span className="text-[11px] text-white/30 font-mono ml-1">{t('skills.ide.title')}</span>
            <span className="ml-auto text-[10px] text-white/15 font-mono">{t('skills.ide.comment')}</span>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar explorer (decorative) */}
            <div className="hidden lg:flex flex-col w-52 border-r border-white/[0.04] bg-[#0a0a0f] py-3 shrink-0">
              <div className="px-3 mb-2">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Explorer</span>
              </div>
              <div className="px-2 space-y-0.5">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono text-white/40 hover:text-white/60 hover:bg-white/[0.03] cursor-pointer transition-colors">
                  <Braces size={12} className="text-accent/60" />
                  <span>src/</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono text-white/40 hover:text-white/60 hover:bg-white/[0.03] cursor-pointer transition-colors pl-6">
                  <Zap size={12} className="text-yellow-500/60" />
                  <span>skills/</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono text-accent/70 bg-accent/[0.06] cursor-pointer">
                  <Terminal size={12} />
                  <span>tech-stack.json</span>
                </div>
              </div>

              {/* Active tech detail panel */}
              <AnimatePresence mode="wait">
                {activeTech && (
                  <motion.div
                    key={activeTech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 mx-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <activeTech.icon size={14} style={{ color: activeTech.color }} />
                      <span className="text-[11px] font-mono font-medium" style={{ color: activeTech.color }}>
                        {activeTech.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">{activeTech.detail}</p>
                    <div className="mt-2 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeTech.percent}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: activeTech.color }}
                      />
                    </div>
                    <span className="text-[9px] text-white/25 mt-1 block font-mono">
                      {activeTech.percent}% proficiency
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Editor area */}
            <div className="flex-1 p-4 md:p-6 min-w-0">
              <div className="flex gap-1 mb-4 border-b border-white/[0.04] pb-2">
                <span className="text-[11px] font-mono px-3 py-1.5 rounded-t-lg bg-[#111118] text-white/60 border-t border-l border-r border-white/[0.06]">
                  {t('skills.proficient')}
                </span>
                <span className="text-[11px] font-mono px-3 py-1.5 rounded-t-lg text-white/25">
                  {t('skills.learning')}
                </span>
              </div>

              <TechList
                items={proficient}
                startIndex={0}
                label={t('skills.proficient') as string}
                activeTech={activeTech}
                setActiveTech={setActiveTech}
                isVisible={isVisible}
              />

              <div className="my-6" />

              <TechList
                items={learning}
                startIndex={proficient.length}
                label={t('skills.learning') as string}
                activeTech={activeTech}
                setActiveTech={setActiveTech}
                isVisible={isVisible}
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-4 px-4 py-2 bg-[#4F7CFF]/5 border-t border-white/[0.04]">
            <span className="text-[10px] font-mono text-white/25">UTF-8</span>
            <span className="text-[10px] font-mono text-white/25">{technologies.length} items</span>
            {activeTech && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-mono text-accent/60">
                Inspecting: {activeTech.name}
              </motion.span>
            )}
            <span className="ml-auto text-[10px] font-mono text-accent/50">{t('skills.ide.comment')}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
