/**
 * dev-toolkit-62: gaming utility helpers
 */

export interface GameState {
  id: string;
  score: number;
  active: boolean;
}

/**
 * Normalizes input coordinates to game grid bounds
 */
export const clampToGrid = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Calculates interpolation between game ticks
 */
export const lerp = (start: number, end: number, alpha: number): number => {
  return start + (end - start) * alpha;
};

/**
 * Safely parses game configuration strings
 */
export const parseConfigValue = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/**
 * Formats score for UI rendering
 */
export const formatScore = (score: number): string => {
  return score.toString().padStart(6, '0');
};

/**
 * Random integer generator for spawn locations
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};