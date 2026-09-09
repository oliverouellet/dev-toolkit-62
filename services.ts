import { GameState } from './types';

const CACHE_TTL = 5000;

interface CachedData {
  data: GameState;
  timestamp: number;
}

// performance optimization via memory caching
const stateCache: Map<string, CachedData> = new Map();

export const getGameState = (gameId: string, fetcher: (id: string) => Promise<GameState>): Promise<GameState> => {
  const now = Date.now();
  const cached = stateCache.get(gameId);

  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return Promise.resolve(cached.data);
  }

  return fetcher(gameId).then((data) => {
    stateCache.set(gameId, { data, timestamp: now });
    return data;
  });
};

export const clearCache = (gameId?: string): void => {
  if (gameId) {
    stateCache.delete(gameId);
  } else {
    stateCache.clear();
  }
};

// periodic cache cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of stateCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      stateCache.delete(key);
    }
  }
}, CACHE_TTL);