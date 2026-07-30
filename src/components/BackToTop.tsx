
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Appears after scrolling 400px and smoothly scrolls back to top when clicked.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center transition-all duration-300 z-[99] hover:bg-accent/20 hover:-translate-y-0.5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
