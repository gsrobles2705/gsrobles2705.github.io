
import { useLang } from '@/context/LangContext';

/**
 * Simple footer with a quote and dynamic copyright year.
 */
export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="px-6 md:px-10 py-20 border-t border-border text-center">
      <p className="text-[clamp(18px,3vw,24px)] font-light italic text-white/50 max-w-[600px] mx-auto mb-8 leading-[1.6]">
        {t('footer.quote')}
      </p>
      <p className="text-[13px] text-white/40 font-mono">
        © {new Date().getFullYear()} Gabriel Saúl Robles García. {t('footer.copyright')}
      </p>
    </footer>
  );
}
