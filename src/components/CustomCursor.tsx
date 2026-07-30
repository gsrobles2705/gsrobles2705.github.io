
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Robust touch device detection
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const check = () => {
      const isTouch = coarseQuery.matches;
      const prefersReduced = motionQuery.matches;
      setShouldRender(!isTouch && !prefersReduced);
    };

    check();
    coarseQuery.addEventListener('change', check);
    motionQuery.addEventListener('change', check);

    return () => {
      coarseQuery.removeEventListener('change', check);
      motionQuery.removeEventListener('change', check);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        !!t.closest('a') ||
        !!t.closest('button') ||
        !!t.closest('[data-cursor-hover]');
      isHovering.current = hover;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        const size = isHovering.current ? 48 : 24;
        const offset = isHovering.current ? 24 : 12;
        ringRef.current.style.transform = `translate(${pos.current.x - offset}px, ${pos.current.y - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = '1';
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-accent/30 mix-blend-difference will-change-transform"
        style={{ width: 24, height: 24, opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-accent will-change-transform"
      />
    </>
  );
}
