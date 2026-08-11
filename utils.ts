// Utility functions for gaming operations

// Check if a number is within a given range
export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

// Randomly shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
    }
    return shuffled;
}

// Clamp a number between a minimum and maximum value
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

// Calculate the distance between two points
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Generate a random integer within a range
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}