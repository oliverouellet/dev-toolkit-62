// Gaming helpers: error handling for edge cases in player state management
export class GameError extends Error {
  constructor(message: string, public readonly code: string = 'GENERAL_ERROR') {
    super(message);
    this.name = 'GameError';
  }
}
export interface PlayerState { health: number; maxHealth: number; inventory: string[]; score: number; }
export function createPlayer(initialHealth: number = 100): PlayerState {
  if (initialHealth <= 0) {
    throw new GameError('Initial health must be greater than zero', 'INVALID_HEALTH');
  }
  if (initialHealth > 500) {
    throw new GameError('Initial health exceeds maximum allowed value', 'INVALID_HEALTH');
  }
  return {
    health: initialHealth,
    maxHealth: initialHealth,
    inventory: [],
    score: 0
  };
}
export function applyDamage(state: PlayerState, damage: number): PlayerState {
  if (damage < 0) {
    // Handle negative damage edge case
    throw new GameError('Damage value cannot be negative', 'NEGATIVE_VALUE');
  }
  if (damage === 0) {
    return { ...state };
  }
  const newHealth = Math.max(0, state.health - damage);
  return {
    ...state,
    health: newHealth
  };
}
export function addItem(state: PlayerState, itemName: string): PlayerState {
  if (!itemName || itemName.trim().length === 0) {
    // Handle empty item name edge case
    throw new GameError('Item name cannot be empty or whitespace', 'INVALID_ITEM');
  }
  if (state.inventory.length >= 10) {
    throw new GameError('Cannot add item: inventory is full', 'INVENTORY_FULL');
  }
  if (state.inventory.includes(itemName)) {
    throw new GameError('Item already exists in inventory', 'DUPLICATE_ITEM');
  }
  return {
    ...state,
    inventory: [...state.inventory, itemName]
  };
}
export function processGameAction(
  state: PlayerState,
  actionType: string,
  value: number | string
): PlayerState {
  try {
    if (actionType === 'damage') {
      if (typeof value !== 'number') {
        throw new GameError('Damage value must be a number', 'TYPE_ERROR');
      }
      return applyDamage(state, value);
    } else if (actionType === 'addItem') {
      if (typeof value !== 'string') {
        throw new GameError('Item name must be a string', 'TYPE_ERROR');
      }
      return addItem(state, value);
    } else {
      throw new GameError('Unsupported action type', 'INVALID_ACTION');
    }
  } catch (error) {
    if (error instanceof GameError) {
      console.error(`GameError [${error.code}]: ${error.message}`);
      return state;
    }
    throw error;
  }
}