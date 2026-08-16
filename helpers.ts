interface GameInput { action: string; value?: number; }

function validateInput(input: GameInput): boolean {
    const validActions = ['move', 'attack', 'defend'];
    if (!validActions.includes(input.action)) {
        console.error(`Invalid action: ${input.action}`);
        return false;
    }
    if (input.value !== undefined && (typeof input.value !== 'number' || input.value < 0)) {
        console.error(`Invalid value: ${input.value}`);
        return false;
    }
    return true;
}

function mainProcessingLoop(inputs: GameInput[]): void {
    for (const input of inputs) {
        if (!validateInput(input)) {
            continue; // Skip invalid input
        }
        // Process valid input (placeholder)
        console.log(`Processing input: ${JSON.stringify(input)}`);
    }
}