export async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

export interface GamePayload {
  id: string;
  status: string;
}

export async function fetchGameState(id: string): Promise<GamePayload> {
  return withRetry(async () => {
    const response = await fetch(`/api/v1/games/${id}`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    return response.json();
  });
}