// Helper functions for common operations in gaming

/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum value.
 * @param max - Maximum value.
 * @returns A random integer between min and max.
 */
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @returns The clamped value.
 */
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param array - The array to shuffle.
 * @returns A new array with shuffled elements.
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export { getRandomInt, clamp, shuffleArray };