/**
 * Represents the detailed outcome of a damage calculation in an RPG.
 */
export interface DamageResult {
  /** The final calculated damage points. */
  damage: number;
  /** Indicates if the damage was a critical hit. */
  isCritical: boolean;
}

/**
 * Calculates the final damage dealt based on attacker stats and defender defense.
 * 
 * @param attackPower - The base attack power of the attacker.
 * @param defense - The physical defense score of the target.
 * @param criticalChance - Chance of landing a critical hit (value between 0.0 and 1.0).
 * @param criticalMultiplier - Damage multiplier on critical hit (defaults to 1.5).
 * @returns The resulting DamageResult object.
 */
export function calculateDamage(
  attackPower: number,
  defense: number,
  criticalChance: number,
  criticalMultiplier: number = 1.5
): DamageResult {
  const isCritical = Math.random() < criticalChance;
  const baseDamage = Math.max(1, attackPower - defense * 0.5);
  const finalDamage = isCritical ? baseDamage * criticalMultiplier : baseDamage;

  return {
    damage: Math.round(finalDamage),
    isCritical,
  };
}

/**
 * Computes the experience points (XP) required to reach a specific character level.
 * Uses an exponential curve suitable for RPG progression systems.
 * 
 * @param level - The target level to calculate XP requirements for.
 * @returns The amount of total XP needed.
 */
export function calculateXpForLevel(level: number): number {
  if (level <= 1) return 0;
  const baseXP = 100;
  const exponent = 1.5;
  return Math.floor(baseXP * Math.pow(level - 1, exponent));
}