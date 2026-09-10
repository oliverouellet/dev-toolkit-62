/**
 * dev-toolkit-62 performance optimization
 * Memoized calculation engine for frame-time scaling
 */

const memoizationCache = new Map<string, number>();

export const getScaledFrameTime = (delta: number, factor: number): number => {
  const key = `${delta}:${factor}`;
  
  if (memoizationCache.has(key)) {
    return memoizationCache.get(key)!;
  }

  // Limit cache size to prevent memory leaks in long game sessions
  if (memoizationCache.size > 1000) {
    memoizationCache.clear();
  }

  const result = delta * factor;
  memoizationCache.set(key, result);
  return result;
};

/**
 * Batch updates for high-frequency game events
 */
export function debounceRender<T extends (...args: any[]) => void>(fn: T, delay: number = 16): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export interface PerformanceMetrics {
  fps: number;
  ms: number;
}

export const formatMetrics = (ms: number): PerformanceMetrics => ({
  ms,
  fps: Math.round(1000 / Math.max(ms, 1))
});