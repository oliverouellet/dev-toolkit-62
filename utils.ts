export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error; // re-throw the last error
            await new Promise(res => setTimeout(res, delay)); // wait before next retry
        }
    }
    throw new Error('Max retries reached'); // this should never be reached
}

// Example of using retry for a network operation:
export async function fetchWithRetry(url: string, options?: RequestInit): Promise<Response> {
    return retry(() => fetch(url, options), 3, 1000);
}