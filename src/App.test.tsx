/// <reference types="vitest/globals" />
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

// Evita que Lenis inicie su loop de requestAnimationFrame en jsdom
vi.mock('@/hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => {},
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(document.body.textContent).toContain('Gabriel');
  });
});
