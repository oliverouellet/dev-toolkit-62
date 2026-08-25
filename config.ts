export interface GameSettings {
  graphics: {
    resolution: string;
    qualityLevel: number;
    enableShadows: boolean;
  };
  audio: {
    masterVolume: number;
    musicVolume: number;
  };
  controls: {
    sensitivity: number;
    invertY: boolean;
  };
}

const defaultSettings: GameSettings = {
  graphics: {
    resolution: '1920x1080',
    qualityLevel: 2,
    enableShadows: true,
  },
  audio: {
    masterVolume: 0.75,
    musicVolume: 0.5,
  },
  controls: {
    sensitivity: 1.0,
    invertY: false,
  },
};

/**
 * Recursively merges user configuration with defaults.
 * Ensures all required fields are present.
 */
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key as keyof T])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof T] });
        } else {
          (output as any)[key] = deepMerge((target as any)[key], source[key as keyof T] as any);
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof T] });
      }
    });
  }
  return output;
}

function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Loads game configuration applying defaults where necessary.
 * @param userConfig Partial configuration from user or file.
 */
export function loadConfig(userConfig: Partial<GameSettings> = {}): GameSettings {
  return deepMerge(defaultSettings, userConfig);
}