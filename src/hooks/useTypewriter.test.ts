/// <reference types="vitest/globals" />
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypewriter } from './useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts empty and types the first word character by character', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hi'], typingSpeed: 10 })
    );

    expect(result.current.text).toBe('');
    expect(result.current.isDeleting).toBe(false);

    act(() => vi.runOnlyPendingTimers()); // type 'H'
    expect(result.current.text).toBe('H');

    act(() => vi.runOnlyPendingTimers()); // type 'i'
    expect(result.current.text).toBe('Hi');
  });

  it('pauses after typing a full word then deletes it', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hi'], typingSpeed: 10, pauseDuration: 1000, deletingSpeed: 10 })
    );

    // Type full word
    act(() => vi.runOnlyPendingTimers()); // H
    act(() => vi.runOnlyPendingTimers()); // Hi
    expect(result.current.text).toBe('Hi');

    // Pause timer fires
    act(() => vi.runOnlyPendingTimers());
    expect(result.current.text).toBe('Hi'); // still Hi

    // Transition to deleting (300ms micro-pause)
    act(() => vi.runOnlyPendingTimers());
    expect(result.current.isDeleting).toBe(true);

    act(() => vi.runOnlyPendingTimers()); // delete 'i'
    expect(result.current.text).toBe('H');

    act(() => vi.runOnlyPendingTimers()); // delete 'H'
    expect(result.current.text).toBe('');
  });

  it('cycles to the next word after deleting the current one', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['A', 'B'], typingSpeed: 10, pauseDuration: 100, deletingSpeed: 10 })
    );

    act(() => vi.runOnlyPendingTimers()); // type 'A'
    expect(result.current.text).toBe('A');

    act(() => vi.runOnlyPendingTimers()); // pause starts
    act(() => vi.runOnlyPendingTimers()); // transition to deleting
    expect(result.current.isDeleting).toBe(true);

    act(() => vi.runOnlyPendingTimers()); // delete 'A'
    expect(result.current.text).toBe('');

    act(() => vi.runOnlyPendingTimers()); // schedule next word (setTimeout 0)
    act(() => vi.runOnlyPendingTimers()); // start typing 'B'
    expect(result.current.text).toBe('B');
  });
});
