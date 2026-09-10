export interface GameEntity {
  id: string;
  name: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface PlayerStats {
  score: number;
  level: number;
  lastActive: Date;
}

export type EntityMap = Map<string, GameEntity>;

export interface ToolkitConfig {
  version: string;
  maxPlayers: number;
  debugMode: boolean;
}

export enum EntityType {
  Player = 'player',
  NPC = 'npc',
  Item = 'item'
}

export type Callback = (err?: Error) => void;

export interface SyncPayload {
  entityId: string;
  data: Partial<GameEntity>;
  timestamp: number;
}