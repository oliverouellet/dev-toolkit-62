interface GameInput {
  playerId: string;
  action: string;
  value?: number;
  timestamp?: number;
}

export class GameService {
  private validActions: string[] = ['move', 'jump', 'attack', 'collect'];

  /**
   * Processes inputs in main loop after validation.
   */
  processInputs(inputs: unknown[]): void {
    for (let i = 0; i < inputs.length; i++) {
      const currentInput = inputs[i];
      if (!this.isValidGameInput(currentInput)) {
        console.error(`Invalid input detected at index ${i}`);
        continue;
      }
      const validatedInput = currentInput as GameInput;
      this.applyAction(validatedInput);
    }
  }

  private isValidGameInput(input: unknown): input is GameInput {
    if (typeof input !== 'object' || input === null) {
      return false;
    }
    const data = input as any;
    if (typeof data.playerId !== 'string' || data.playerId.trim() === '') {
      return false;
    }
    if (typeof data.action !== 'string' || !this.validActions.includes(data.action)) {
      return false;
    }
    if (data.value !== undefined && typeof data.value !== 'number') {
      return false;
    }
    if (data.timestamp !== undefined && typeof data.timestamp !== 'number') {
      return false;
    }
    return true;
  }

  private applyAction(input: GameInput): void {
    console.log(`Processing action '${input.action}' for player ${input.playerId}`);
    if (input.value !== undefined) {
      console.log(`  Value: ${input.value}`);
    }
    // Apply game-specific effects
    if (input.action === 'attack') {
      console.log('  Attack executed');
    } else if (input.action === 'collect') {
      console.log('  Item collected');
    }
  }
}