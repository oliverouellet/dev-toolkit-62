export interface GameConfig {
  renderScale: number;
  maxFps: number;
  enableAudio: boolean;
  assetPath: string;
}

const DEFAULT_CONFIG: GameConfig = {
  renderScale: 1.0,
  maxFps: 60,
  enableAudio: true,
  assetPath: './assets',
};

/**
 * Merges user-provided configuration with internal defaults.
 */
export function loadConfig(userConfig: Partial<GameConfig>): GameConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates that the configuration meets range constraints.
 */
export function validateConfig(config: GameConfig): boolean {
  if (config.renderScale <= 0 || config.renderScale > 4) return false;
  if (config.maxFps < 30 || config.maxFps > 240) return false;
  return true;
}