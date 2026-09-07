export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes an asynchronous network function with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      if (attempt < options.maxAttempts) {
        const backoff = options.delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

/**
 * Wrapper for fetch requests to verify status codes
 */
export async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response;
  });
}