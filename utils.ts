export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, fraction: number): number {
    return start + (end - start) * fraction;
}

export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function isPointInRect(point: { x: number; y: number }, rect: { x: number; y: number; width: number; height: number }): boolean {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}