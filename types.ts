/**
 * Core gaming interfaces for dev-toolkit-62
 */

export interface GameEntity {
  id: string;
  name: string;
  position: Vector3;
  isActive: boolean;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface GameConfig {
  renderScale: number;
  maxPlayers: number;
  isDebugMode: boolean;
  serverAddress: string;
}

export type EntityUpdate = Partial<Pick<GameEntity, 'position' | 'isActive'>>;

export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Validates position coordinates
 */
export function isValidPosition(pos: Vector3): boolean {
  return !isNaN(pos.x) && !isNaN(pos.y) && !isNaN(pos.z);
}

export const DEFAULT_CONFIG: GameConfig = {
  renderScale: 1.0,
  maxPlayers: 32,
  isDebugMode: false,
  serverAddress: '127.0.0.1'
};