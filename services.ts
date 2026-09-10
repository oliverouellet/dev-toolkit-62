export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes an asynchronous function with exponential backoff strategy
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === options.maxAttempts) break;
      
      // Exponential backoff calculation
      const backoff = options.delayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

/**
 * Wrapper for game network requests
 */
export const fetchWithRetry = <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`Network response error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
};