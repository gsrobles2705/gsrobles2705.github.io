
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLang } from '@/context/LangContext';
import { EMAIL, contactFields } from '@/data/contact-fields';
import { ArrowUpRight, Check, Copy, Send, Terminal, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const mailtoSubject = lang === 'es' ? 'Hola Gabriel' : 'Hello Gabriel';
  const mailtoBody = 'Hi Gabriel,%0D%0A%0D%0AI saw your portfolio and...';
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;

  return (
    <section id="contact" ref={ref} className="px-6 md:px-10 py-32 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-medium text-accent uppercase tracking-[2px] mb-4 font-mono">
          {'// '}{t('contact.label')}
        </p>
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-1px] mb-4">
          {t('contact.title')}
        </h2>
        <p className="text-white/45 text-sm mb-12 font-mono">
          $ {lang === 'es' ? 'npm run connect' : 'npm run connect'}
        </p>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact terminal */}
          <div className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-[#0d0d12] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111118] border-b border-white/[0.05]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <Terminal size={12} className="text-white/25 ml-1" />
              <span className="text-[11px] text-white/40 font-mono ml-1">contact.js</span>
              <span className="ml-auto text-[10px] text-white/25 font-mono">JSX</span>
            </div>

            <div className="p-5 md:p-6 font-mono text-[13px] leading-[2]">
              <span className="text-[#5c6370]">{'// '}{lang === 'es' ? 'Importar módulos de contacto' : 'Import contact modules'}</span>
              <br />
              <span className="text-[#c678dd]">import</span>{' '}
              <span className="text-white/60">{'{ '}</span>
              <span className="text-[#e06c75]">connect</span>
              <span className="text-white/60">{' }'}</span>{' '}
              <span className="text-[#c678dd]">from</span>{' '}
              <span className="text-[#98c379]">"@/network"</span>
              <span className="text-white/60">;</span>
              <br />
              <br />

              <span className="text-[#c678dd]">const</span>{' '}
              <span className="text-[#e06c75]">contact</span>{' '}
              <span className="text-[#56b6c2]">=</span>{' '}
              <span className="text-white/60">{'{'}</span>
              <br />

              {contactFields.map((field, i) => (
                <div
                  key={field.key}
                  className="group pl-4 transition-colors duration-200"
                  onMouseEnter={() => setHoveredField(field.key)}
                  onMouseLeave={() => setHoveredField(null)}
                  data-cursor-hover
                >
                  <span className="text-[#d19a66]">{field.label}</span>
                  <span className="text-white/60">: </span>
                  {field.href ? (
                    <a
                      href={field.href}
                      target={field.href.startsWith('http') ? '_blank' : undefined}
                      rel={field.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 transition-colors"
                      style={{ color: hoveredField === field.key ? field.color : '#98c379' }}
                    >
                      <span className="text-[#98c379]">"</span>
                      {field.value}
                      <span className="text-[#98c379]">"</span>
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <span className="text-[#98c379]">"{field.value}"</span>
                  )}
                  <span className="text-white/60">{i < contactFields.length - 1 ? ',' : ''}</span>
                </div>
              ))}

              <span className="text-white/60">{'}'}</span>
              <br />
              <br />

              <span className="text-[#5c6370]">{'// '}{lang === 'es' ? 'Iniciar conexión' : 'Initiate connection'}</span>
              <br />
              <span className="text-[#61afef]">connect</span>
              <span className="text-white/60">(</span>
              <span className="text-[#e06c75]">contact</span>
              <span className="text-white/60">)</span>
              <span className="text-white/60">.</span>
              <span className="text-[#61afef]">then</span>
              <span className="text-white/60">(</span>
              <span className="text-[#c678dd]">{'() => '}</span>
              <span className="text-[#61afef]">console</span>
              <span className="text-white/60">.</span>
              <span className="text-[#61afef]">log</span>
              <span className="text-white/60">(</span>
              <span className="text-[#98c379]">"{lang === 'es' ? '¡Conectado!' : 'Connected!'}"</span>
              <span className="text-white/60">));</span>

              <span className="inline-block w-[2px] h-[1.2em] bg-accent ml-1 animate-pulse align-middle" />
            </div>
          </div>

          {/* Side action panel */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass glass-hover rounded-2xl p-6 border-l-2 border-l-accent"
            >
              <h4 className="text-sm font-semibold mb-3 font-mono text-white/80">
                {lang === 'es' ? 'Acciones rápidas' : 'Quick Actions'}
              </h4>
              <div className="space-y-2.5">
                <a
                  href="https://github.com/gsrobles2705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group"
                  data-cursor-hover
                >
                  <Github size={16} className="text-white/45 group-hover:text-white/70 transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors font-mono">GitHub</span>
                  <ArrowUpRight size={12} className="ml-auto text-white/25 group-hover:text-white/45 transition-colors" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 hover:border-accent/20 transition-all duration-300 group"
                  data-cursor-hover
                >
                  {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} className="text-accent/70" />}
                  <span className="text-sm text-accent font-mono">{copied ? t('contact.copied') : t('contact.copy')}</span>
                </button>

                <a
                  href={mailtoHref}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group"
                  data-cursor-hover
                >
                  <Send size={16} className="text-white/45 group-hover:text-white/70 transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors font-mono">{t('contact.openMail')}</span>
                </a>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] opacity-50 cursor-not-allowed">
                  <Linkedin size={16} className="text-white/35" />
                  <span className="text-sm text-white/45 font-mono">{t('contact.linkedinSoon')}</span>
                </div>
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass rounded-2xl p-6 border-l-2 border-l-[#98c379]"
            >
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-3">Status</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
                <span className="text-sm font-mono text-white/70">
                  {lang === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
                </span>
              </div>
              <p className="text-[11px] text-white/40 font-mono leading-relaxed">
                {lang === 'es'
                  ? 'Respuesta típica: < 24h. Zona horaria: GMT-5 (Lima, Perú).'
                  : 'Typical response: < 24h. Timezone: GMT-5 (Lima, Perú).'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
