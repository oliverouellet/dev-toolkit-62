export interface GameEntity {
  id: string;
  name: string;
  position: { x: number; y: number };
  active: boolean;
}

export interface PlayerState extends GameEntity {
  score: number;
  inventory: string[];
}

export interface GameConfig {
  maxPlayers: number;
  tickRate: number;
  region: string;
}

export type EntityUpdate = Partial<Pick<GameEntity, 'position' | 'active'>>;

export enum GameStatus {
  Idle = 'IDLE',
  Running = 'RUNNING',
  Paused = 'PAUSED',
  Finished = 'FINISHED'
}

export interface SystemMetrics {
  memoryUsage: number;
  activeEntities: number;
  latency: number;
}

export type Callback<T> = (data: T) => void;