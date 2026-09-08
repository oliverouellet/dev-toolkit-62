/**
 * Core gaming domain types for dev-toolkit-62
 */

export interface GameEntity {
  id: string;
  name: string;
  version: string;
  metadata: Record<string, unknown>;
}

export interface EngineConfig {
  renderMode: 'software' | 'hardware';
  targetFps: number;
  enableDebugOverlay: boolean;
}

export interface AssetManifest {
  assetId: string;
  path: string;
  type: 'texture' | 'audio' | 'shader';
  preload: boolean;
}

export type PluginStatus = 'active' | 'inactive' | 'error';

export interface ToolkitPlugin {
  id: string;
  status: PluginStatus;
  init: () => Promise<void>;
  dispose: () => void;
}

export interface AnalyticsEvent {
  timestamp: number;
  category: string;
  action: string;
  value?: number;
}

export type Registry<T> = Map<string, T>;