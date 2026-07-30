
import { useEffect, useRef, useState } from 'react';

/**
 * Observes an element and returns a visibility flag once it enters the viewport.
 *
 * @param threshold - A number between 0 and 1 indicating the percentage of the
 *   element that must be visible before triggering (default: 0.1).
 * @returns An object containing:
 *   - ref: assign this to the target element.
 *   - isVisible: becomes true once the element intersects the viewport.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
