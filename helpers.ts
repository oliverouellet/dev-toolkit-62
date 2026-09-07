/**
 * dev-toolkit-62: high-frequency memory optimization
 * Memoizes game entity transform calculations
 */

const memoCache = new Map<string, number>();

export const computeEntityTransform = (
  id: string,
  x: number,
  y: number,
  rotation: number
): number => {
  const key = `${id}:${x}:${y}:${rotation}`;

  if (memoCache.has(key)) {
    return memoCache.get(key)!;
  }

  // Heavy simulation calculation
  const result = Math.sqrt(x ** 2 + y ** 2) * Math.cos(rotation);

  if (memoCache.size > 1000) {
    memoCache.clear();
  }

  memoCache.set(key, result);
  return result;
};

/**
 * Debounce utility for input event polling
 */
export const throttleInput = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};