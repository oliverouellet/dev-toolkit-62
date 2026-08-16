interface Coordinate {
    x: number;
    y: number;
}

/**
 * Computes the distance between two coordinates.
 * @param pointA - The first coordinate.
 * @param pointB - The second coordinate.
 * @returns The distance between pointA and pointB.
 */
function calculateDistance(pointA: Coordinate, pointB: Coordinate): number {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Clamps a value between a minimum and maximum.
 * @param value - The value to clamp.
 * @param min - The minimum limit.
 * @param max - The maximum limit.
 * @returns The clamped value.
 */
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Generates a random integer within a range.
 * @param min - The minimum integer (inclusive).
 * @param max - The maximum integer (exclusive).
 * @returns A random integer between min and max.
 */
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export { calculateDistance, clamp, randomInt };