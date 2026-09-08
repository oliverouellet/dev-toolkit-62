export interface GameEntity {
  id: string;
  name: string;
  active: boolean;
}

/**
 * Filters active entities and maps to IDs for game loops
 */
export const getActiveEntityIds = (entities: GameEntity[]): string[] => {
  return entities
    .filter((entity) => entity.active)
    .map((entity) => entity.id);
};

/**
 * Normalizes coordinate inputs for grid-based movement
 */
export const normalizeCoordinates = (x: number, y: number): { x: number; y: number } => {
  return {
    x: Math.round(x),
    y: Math.round(y),
  };
};

/**
 * Generates deterministic lookup key for entity cache
 */
export const generateEntityKey = (type: string, id: string): string => {
  return `${type.toLowerCase()}:${id}`;
};