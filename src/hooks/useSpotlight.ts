
import { useCallback } from 'react';

/**
 * Returns a mouse-move handler that updates CSS custom properties
 * (--mouse-x, --mouse-y) on the hovered element for spotlight effects.
 *
 * Usage:
 *   const handleMouseMove = useSpotlight();
 *   <div onMouseMove={handleMouseMove} className="card-spotlight">...</div>
 */
export function useSpotlight() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);
}
