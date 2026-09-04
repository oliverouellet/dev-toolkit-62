/**
 * memoization wrapper for heavy entity calculations
 * caches results based on object ID for frame consistency
 */
export function memoizeEntityLogic<T>(fn: (id: string) => T): (id: string) => T {
  const cache = new Map<string, T>();

  return (id: string): T => {
    if (cache.has(id)) {
      return cache.get(id)!;
    }

    const result = fn(id);
    cache.set(id, result);

    // maintain heap size limit to prevent memory leaks
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey!);
    }

    return result;
  };
}

/**
 * batch processing utility for entity state updates
 * reduces redraw cycles in game loop
 */
export function throttleUpdates<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastExecution = 0;

  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastExecution >= delay) {
      lastExecution = now;
      fn(...args);
    }
  }) as T;
}