export interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes an async function with exponential backoff for gaming API stability
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < config.maxAttempts) {
        const backoff = config.delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

export async function fetchGameData<T>(endpoint: string): Promise<T> {
  return withRetry(async () => {
    const response = await fetch(`https://api.dev-toolkit-62.internal/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Network response error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
}