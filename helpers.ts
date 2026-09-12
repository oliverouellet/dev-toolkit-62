import { readFileSync, existsSync } from 'fs';

export interface GameConfig {
  serverTickRate: number;
  maxPlayers: number;
  debugMode: boolean;
}

const DEFAULT_CONFIG: GameConfig = {
  serverTickRate: 64,
  maxPlayers: 32,
  debugMode: false
};

/**
 * Loads configuration from a JSON file, merging with defaults
 */
export function loadConfig(path: string): GameConfig {
  if (!existsSync(path)) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const data = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(data) as Partial<GameConfig>;
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.error('Failed to parse config, using defaults:', error);
    return { ...DEFAULT_CONFIG };
  }
}