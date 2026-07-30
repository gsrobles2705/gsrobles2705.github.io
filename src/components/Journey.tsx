
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { commits, branchColors, milestoneMeta } from '@/data/journey';
import { GitCommit, GitBranch, Star } from 'lucide-react';

export default function Journey() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t, lang } = useLang();

  const milestones = useMemo(() => milestoneMeta[lang] || milestoneMeta.en, [lang]);

  const enriched = useMemo(
    () =>
      commits.map((c, i) => ({
        ...c,
        desc: milestones[i]?.desc || c.desc,
        msg: milestones[i]?.title || c.msg,
      })),
    [milestones]
  );

  return (
    <section id="journey" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('journey.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4">
          {t('journey.title')}
        </h2>
        <p className="text-white/30 text-sm mb-12 font-mono">
          $ git log --graph --oneline --decorate --all
        </p>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={isVisible ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-[19px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
          />

          <div className="space-y-0">
            {enriched.map((commit, i) => {
              const color = branchColors[commit.branch] || '#4F7CFF';
              return (
                <motion.div
                  key={commit.hash}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="group relative flex gap-4 md:gap-6 py-5"
                  data-cursor-hover
                >
                  <div className="relative flex flex-col items-center z-10">
                    <div
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--glow)]"
                      style={{
                        borderColor: color,
                        backgroundColor: `${color}10`,
                        boxShadow: `0 0 20px ${color}20`,
                        '--glow': `${color}40`,
                      } as React.CSSProperties}
                    >
                      {commit.tag === 'HEAD' ? (
                        <Star size={16} style={{ color }} className="transition-transform duration-300 group-hover:rotate-12" />
                      ) : commit.tag === 'merge' ? (
                        <GitBranch size={16} style={{ color }} className="transition-transform duration-300 group-hover:rotate-12" />
                      ) : (
                        <GitCommit size={16} style={{ color }} className="transition-transform duration-300 group-hover:rotate-12" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="glass-v2 glass-v2-hover rounded-2xl p-5 md:p-6 border-l-2 transition-all duration-300 group-hover:translate-x-1"
                      style={{ borderLeftColor: color }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-white/40">
                          {commit.hash}
                        </span>
                        <span className="font-mono text-[11px] text-white/30">
                          {commit.date}
                        </span>
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
                          style={{
                            color,
                            borderColor: `${color}30`,
                            backgroundColor: `${color}08`,
                          }}
                        >
                          {commit.branch}
                        </span>
                        {commit.tag && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            {commit.tag}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base md:text-lg font-semibold mb-1.5 font-mono group-hover:text-white transition-colors duration-300">
                        {commit.msg}
                      </h4>
                      <p className="text-[13px] text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                        {commit.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
