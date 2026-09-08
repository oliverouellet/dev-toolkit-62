export interface GameConfig {
  renderScale: number;
  audioEnabled: boolean;
  maxPlayers: number;
  serverAddress: string;
}

const DEFAULT_CONFIG: GameConfig = {
  renderScale: 1.0,
  audioEnabled: true,
  maxPlayers: 32,
  serverAddress: 'localhost:8080',
};

/**
 * Merges partial config with defaults for gaming engine
 */
export function loadConfig(userConfig: Partial<GameConfig>): GameConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates that config constraints are met
 */
export function validateConfig(config: GameConfig): boolean {
  return (
    config.renderScale > 0 &&
    config.renderScale <= 2.0 &&
    config.maxPlayers > 0 &&
    config.maxPlayers <= 128
  );
}