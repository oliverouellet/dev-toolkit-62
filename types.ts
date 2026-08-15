export interface GameError {
    code: string;
    message: string;
    timestamp: Date;
}

export enum ErrorCodes {
    NETWORK_ERROR = 'NETWORK_ERROR',
    INVALID_INPUT = 'INVALID_INPUT',
    TIMEOUT = 'TIMEOUT',
    UNAUTHORIZED = 'UNAUTHORIZED',
}

export function handleError(error: GameError): void {
    console.error(`Error Code: ${error.code}`);
    console.error(`Error Message: ${error.message}`);
    console.error(`Timestamp: ${error.timestamp.toISOString()}`);
    // Additional error handling logic could be added here
}

export function logError(code: ErrorCodes, message: string): GameError {
    return {
        code,
        message,
        timestamp: new Date(),
    };
}