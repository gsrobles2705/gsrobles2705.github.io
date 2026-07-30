
import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  /** Array of words to cycle through. */
  words: string[];
  /** Milliseconds per character when typing (default: 80). */
  typingSpeed?: number;
  /** Milliseconds per character when deleting (default: 40). */
  deletingSpeed?: number;
  /** Pause duration in ms after a word is fully typed (default: 2000). */
  pauseDuration?: number;
}

interface UseTypewriterReturn {
  /** The currently displayed text fragment. */
  text: string;
  /** Whether the current phase is deleting. */
  isDeleting: boolean;
}

/**
 * Simulates a typewriter effect that cycles through an array of words.
 *
 * Phases: typing → paused → deleting → (repeat with next word)
 */
export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting'>('typing');

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text === currentWord) {
        timeout = setTimeout(() => setPhase('paused'), pauseDuration);
      } else {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      }
    } else if (phase === 'paused') {
      timeout = setTimeout(() => setPhase('deleting'), 300);
    } else if (phase === 'deleting') {
      if (text === '') {
        timeout = setTimeout(() => {
          setWordIndex((p) => (p + 1) % words.length);
          setPhase('typing');
        }, 0);
      } else {
        timeout = setTimeout(() => setText((p) => p.slice(0, -1)), deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, phase, words, typingSpeed, deletingSpeed, pauseDuration]);

  return { text, isDeleting: phase === 'deleting' };
}
