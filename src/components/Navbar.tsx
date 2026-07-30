
import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

  const navLinks = [
    { label: t('nav.about') as string, href: '#about' },
    { label: t('nav.skills') as string, href: '#skills' },
    { label: t('nav.projects') as string, href: '#projects' },
    { label: t('nav.certificates') as string, href: '#certificates' },
    { label: t('nav.journey') as string, href: '#journey' },
    { label: t('nav.contact') as string, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight hover:text-accent transition-colors font-mono"
        >
          <span className="text-accent">{'<'}</span>GS<span className="text-accent">{'/>'}</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-accent transition-colors duration-300 font-mono"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-white/60 hover:text-accent hover:border-accent/20 transition-all"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            <span className="uppercase tracking-wider">{lang}</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-white/60"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            <span className="uppercase">{lang}</span>
          </button>
          <button
            className="text-muted hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted hover:text-accent transition-colors py-2 font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
