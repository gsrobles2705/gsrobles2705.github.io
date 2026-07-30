
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { projects } from '@/data/projects';
import { useSpotlight } from '@/hooks/useSpotlight';
import { ExternalLink, FolderGit2 } from 'lucide-react';

const statusStyles: Record<string, string> = {
  live: 'bg-accent/10 text-accent border-accent/15',
  wip: 'bg-yellow-500/8 text-yellow-400 border-yellow-500/12',
};

const statusGlow: Record<string, string> = {
  live: 'shadow-[0_0_12px_rgba(79,124,255,0.15)]',
  wip: 'shadow-[0_0_12px_rgba(234,179,8,0.1)]',
};

export default function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t } = useLang();
  const handleMouseMove = useSpotlight();

  return (
    <section id="projects" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('projects.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-12">
          {t('projects.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              className="group relative glass-v2 glass-v2-hover rounded-[20px] p-7 cursor-default card-spotlight card-shine"
              data-cursor-hover
            >
              {/* Header with icon and status */}
              <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  <FolderGit2 size={20} />
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${statusStyles[project.status]} ${statusGlow[project.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'live' ? 'bg-accent' : 'bg-yellow-400'} animate-pulse`} />
                  {project.statusLabel}
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-[-0.3px] mb-3 flex items-center gap-2 font-mono relative z-10 group-hover:text-accent transition-colors duration-300">
                {project.name}
                <ExternalLink size={13} className="text-white/20 group-hover:text-accent/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </h3>

              <p className="text-[13px] leading-[1.75] text-white/45 mb-6 relative z-10 group-hover:text-white/55 transition-colors duration-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/[0.03] rounded-md text-[11px] text-white/40 font-mono border border-white/[0.04] group-hover:border-white/[0.08] group-hover:text-white/50 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
