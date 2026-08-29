export interface PlayerStats {
  name: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

/**
 * Creates a new player with default stats for the given level.
 * @param name - Player's name
 * @param level - Starting level
 * @returns New player stats object
 */
export function createPlayer(name: string, level: number): PlayerStats {
  return {
    name,
    health: 100 + (level * 10),
    attack: 10 + (level * 2),
    defense: 5 + (level * 1),
    speed: 10 + (level * 0.5)
  };
}

/**
 * Applies damage to player stats, ensuring health doesn't go below zero.
 * @param stats - Current player stats
 * @param damage - Amount of damage to apply
 * @returns Updated stats with reduced health
 */
export function applyDamage(stats: PlayerStats, damage: number): PlayerStats {
  const newHealth = Math.max(0, stats.health - damage);
  return { ...stats, health: newHealth };
}

/**
 * Calculates total power based on player stats.
 * @param stats - Player stats
 * @returns Sum of attack and defense
 */
export function calculatePower(stats: PlayerStats): number {
  return stats.attack + stats.defense;
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic';

export interface LootItem {
  name: string;
  rarity: Rarity;
  value: number;
}

/**
 * Generates loot item based on level and random chance.
 * @param level - Current game level
 * @returns A loot item
 */
export function generateLoot(level: number): LootItem {
  const rand = Math.random();
  let rarity: Rarity;
  let value: number;
  if (rand < 0.5) {
    rarity = 'common';
    value = level * 10;
  } else if (rand < 0.8) {
    rarity = 'uncommon';
    value = level * 25;
  } else if (rand < 0.95) {
    rarity = 'rare';
    value = level * 50;
  } else {
    rarity = 'epic';
    value = level * 100;
  }
  return { name: `${rarity} loot`, rarity, value };
}