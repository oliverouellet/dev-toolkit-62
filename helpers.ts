export interface GameEntity {
  id: string;
  name: string;
  health: number;
}

/**
 * Normalizes a value within a range for health bars or progress
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Generates a random integer between min and max inclusive
 */
export const getRandomRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Checks if an entity is currently alive based on health property
 */
export const isAlive = (entity: GameEntity): boolean => {
  return entity.health > 0;
};

/**
 * Formats entity data for UI display
 */
export const formatEntityLabel = (entity: GameEntity): string => {
  const status = isAlive(entity) ? 'ACTIVE' : 'DEFEATED';
  return `[${status}] ${entity.name} (HP: ${entity.health})`;
};

/**
 * Calculates distance between two 2D coordinates
 */
export const calculateDistance = (
  x1: number, y1: number, 
  x2: number, y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};