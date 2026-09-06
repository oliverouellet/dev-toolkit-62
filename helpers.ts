/**
 * Vector 2D representation for spatial gaming calculations.
 */
export interface Vector2D {
  x: number;
  y: number;
}

/**
 * Calculates the Euclidean distance between two points.
 */
export function getDistance(p1: Vector2D, p2: Vector2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Linearly interpolates between two numbers.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.max(0, Math.min(1, t));
}

/**
 * Linearly interpolates between two 2D vectors.
 */
export function lerp2D(start: Vector2D, end: Vector2D, t: number): Vector2D {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t),
  };
}

/**
 * Converts grid coordinates to screen pixel coordinates.
 */
export function gridToScreen(
  gridX: number,
  gridY: number,
  tileSize: number,
  offsetX: number = 0,
  offsetY: number = 0
): Vector2D {
  return {
    x: gridX * tileSize + offsetX,
    y: gridY * tileSize + offsetY,
  };
}

/**
 * Constrains a value within specified min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}