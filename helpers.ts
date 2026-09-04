/**
 * Performance utilities for dev-toolkit-62 game engine.
 * Provides memoization for expensive physics calculations.
 */

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    // Prevent memory leaks in long-running sessions
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  }) as T;
};

/**
 * Throttles input processing to 60fps equivalent intervals
 */
export const throttleInput = (callback: Function, limit: number = 16) => {
  let wait = false;

  return (...args: any[]) => {
    if (!wait) {
      callback(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
};

export interface PerformanceMetrics {
  frameTime: number;
  memoryUsage: number;
}

export const getPerformanceSnapshot = (): PerformanceMetrics => ({
  frameTime: performance.now(),
  memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
});