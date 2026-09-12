import { GameState } from './types';

/**
 * Optimized state processor using memoization and spatial partitioning
 * to handle high-frequency entity updates in gaming environment.
 */
export class PerformanceOptimizer {
  private static cache: Map<string, any> = new Map();
  private static readonly CACHE_LIMIT = 1000;

  public static processEntityUpdates(state: GameState): GameState {
    const hash = JSON.stringify(state.entities.map(e => e.id + e.pos.x + e.pos.y));

    if (this.cache.has(hash)) {
      return this.cache.get(hash);
    }

    const optimized = this.applySpatialFiltering(state);

    if (this.cache.size >= this.CACHE_LIMIT) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(hash, optimized);
    return optimized;
  }

  private static applySpatialFiltering(state: GameState): GameState {
    // Remove entities outside viewport to save render cycle overhead
    return {
      ...state,
      entities: state.entities.filter(e => 
        e.pos.x >= 0 && e.pos.x <= 1920 && 
        e.pos.y >= 0 && e.pos.y <= 1080
      )
    };
  }

  public static clearCache(): void {
    this.cache.clear();
  }
}