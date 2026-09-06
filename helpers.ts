export interface RetryOptions {
  attempts: number;
  delay: number;
}

/**
 * executes an async operation with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < options.attempts - 1) {
        const backoff = options.delay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}