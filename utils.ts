// Utility function to debounce function calls
export function debounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// Utility function to throttle function calls
export function throttle(fn: Function, limit: number) {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (...args: any[]) {
        const context = this;
        if (!lastRan) {
            fn.apply(context, args);
            lastRan = Date.now();
        }
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
            if ((Date.now() - lastRan) >= limit) {
                fn.apply(context, args);
                lastRan = Date.now();
            }
        }, limit - (Date.now() - lastRan));
    };
}

// A function to memoize results of expensive computations
export function memoize(fn: Function) {
    const cache: Record<string, any> = {};
    return function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}