/// <reference types="vitest/globals" />
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LangProvider, useLang } from './LangContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LangProvider>{children}</LangProvider>
);

describe('LangContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns English translation by default', () => {
    const { result } = renderHook(() => useLang(), { wrapper });
    expect(result.current.t('hero.badge')).toBe('Available for opportunities');
    expect(result.current.lang).toBe('en');
  });

  it('toggles to Spanish and returns Spanish translations', () => {
    const { result } = renderHook(() => useLang(), { wrapper });

    act(() => result.current.toggleLang());

    expect(result.current.lang).toBe('es');
    expect(result.current.t('hero.badge')).toBe('Disponible para oportunidades');
    expect(result.current.t('nav.about')).toBe('Sobre mí');
  });

  it('toggles back to English', () => {
    const { result } = renderHook(() => useLang(), { wrapper });

    act(() => result.current.toggleLang());
    expect(result.current.lang).toBe('es');

    act(() => result.current.toggleLang());
    expect(result.current.lang).toBe('en');
    expect(result.current.t('contact.title')).toBe("Let's Connect");
  });
});
