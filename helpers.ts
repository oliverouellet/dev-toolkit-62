// A set of common utility functions for various operations

/**
 * Checks if a value is a number.
 * @param value - The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Generates a random integer within a specified range.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max.
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Deep merges two objects.
 * @param target - The target object.
 * @param source - The source object to merge.
 * @returns A new object that is the result of the merge.
 */
export function deepMerge<T, U>(target: T, source: U): T & U {
    const output = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(target[key] as any, source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}