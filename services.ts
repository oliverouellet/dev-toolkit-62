export interface GameState {
  health: number;
  mana: number;
  position: { x: number; y: number };
  inventory: string[];
}

export class GameStateService {
  private state: GameState;

  constructor(initialState?: Partial<GameState>) {
    // Guarantee defaults even with partial or corrupted inputs
    this.state = {
      health: initialState?.health ?? 100,
      mana: initialState?.mana ?? 100,
      position: {
        x: initialState?.position?.x ?? 0,
        y: initialState?.position?.y ?? 0
      },
      inventory: Array.isArray(initialState?.inventory) ? [...initialState.inventory] : []
    };
  }

  public getState(): GameState {
    // Return a deep copy to prevent side-channel mutations
    return {
      health: this.state.health,
      mana: this.state.mana,
      position: { ...this.state.position },
      inventory: [...this.state.inventory]
    };
  }

  public updateState(patch: Partial<GameState>): boolean {
    if (!patch) return false;

    try {
      if (patch.health !== undefined) {
        if (typeof patch.health !== "number" || isNaN(patch.health)) {
          throw new TypeError("Health value must be a valid number");
        }
        this.state.health = Math.max(0, Math.min(100, patch.health));
      }

      if (patch.mana !== undefined) {
        if (typeof patch.mana !== "number" || isNaN(patch.mana)) {
          throw new TypeError("Mana value must be a valid number");
        }
        this.state.mana = Math.max(0, Math.min(100, patch.mana));
      }

      if (patch.position !== undefined) {
        const x = patch.position.x ?? this.state.position.x;
        const y = patch.position.y ?? this.state.position.y;
        if (typeof x !== "number" || typeof y !== "number" || isNaN(x) || isNaN(y)) {
          throw new TypeError("Coordinates must be valid numbers");
        }
        this.state.position = { x, y };
      }

      if (patch.inventory !== undefined) {
        if (!Array.isArray(patch.inventory)) {
          throw new TypeError("Inventory must be a valid array");
        }
        this.state.inventory = patch.inventory.filter(item => typeof item === "string" && item.trim() !== "");
      }

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown mutation failure";
      console.error(`[GameStateService] Critical state boundary bypass aborted: ${message}`);
      return false;
    }
  }
}