/**
 * Represents a game entity with coordinate tracking
 */
export interface GameEntity {
  id: string;
  x: number;
  y: number;
  active: boolean;
}

/**
 * Calculates Manhattan distance between two game entities
 */
export const getDistance = (a: GameEntity, b: GameEntity): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

/**
 * Normalizes entity coordinates to grid boundaries
 */
export const clampPosition = (pos: number, min: number, max: number): number => {
  return Math.min(Math.max(pos, min), max);
};

/**
 * Filters a list of entities to return only active ones
 */
export const getActiveEntities = (entities: GameEntity[]): GameEntity[] => {
  return entities.filter((e) => e.active);
};

/**
 * Generates a mock identifier for new game objects
 */
export const generateEntityId = (prefix: string = 'ent'): string => {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
};