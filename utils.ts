/**
 * gaming dev-toolkit-62 utility functions
 */

export interface Vec2 {
  x: number;
  y: number;
}

/**
 * calculates distance between two coordinate points
 */
export const calculateDistance = (a: Vec2, b: Vec2): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * normalizes game entity position to a grid
 */
export const gridSnap = (pos: Vec2, cellSize: number): Vec2 => {
  return {
    x: Math.round(pos.x / cellSize) * cellSize,
    y: Math.round(pos.y / cellSize) * cellSize
  };
};

/**
 * determines if point lies within rectangular bounding box
 */
export const isInsideBounds = (
  point: Vec2, 
  rect: { x: number; y: number; w: number; h: number }
): boolean => {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.h
  );
};

/**
 * generates random integer within range for loot tables
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};