export interface GameConfig {
  maxPlayers: number;
  region: string;
}

export class ConfigValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * Validates game configuration settings
 * throws ConfigValidationError on invalid input
 */
export function validateConfig(config: unknown): GameConfig {
  if (!config || typeof config !== 'object') {
    throw new ConfigValidationError('root', 'Configuration must be an object');
  }

  const c = config as Record<string, any>;

  if (typeof c.maxPlayers !== 'number' || c.maxPlayers <= 0) {
    throw new ConfigValidationError('maxPlayers', 'Must be a positive integer');
  }

  if (typeof c.region !== 'string' || c.region.length < 2) {
    throw new ConfigValidationError('region', 'Region code must be at least 2 characters');
  }

  return {
    maxPlayers: c.maxPlayers,
    region: c.region
  };
}

export const safeLoadConfig = (raw: unknown): GameConfig | null => {
  try {
    return validateConfig(raw);
  } catch (err) {
    if (err instanceof ConfigValidationError) {
      console.error(`Config Error [${err.field}]: ${err.message}`);
    }
    return null;
  }
};