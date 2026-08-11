function validateInput(input: any): boolean {
    if (typeof input !== 'string') {
        console.error('Invalid input: must be a string.');
        return false;
    }
    if (input.trim().length === 0) {
        console.error('Invalid input: cannot be empty.');
        return false;
    }
    return true;
}

function processInput(input: any): void {
    if (!validateInput(input)) {
        return;
    }
    // Main processing logic goes here
    console.log('Processing input:', input);
}

// Example usage
const inputs = ["valid input", 42, "   ", null];
inputs.forEach(input => processInput(input));