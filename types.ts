export type GameState = 'idle' | 'loading' | 'active' | 'error';

export interface GameError extends Error {
  code: string;
  retryable: boolean;
}

export class ToolkitError extends Error implements GameError {
  public readonly code: string;
  public readonly retryable: boolean;

  constructor(message: string, code: string, retryable: boolean = false) {
    super(message);
    this.code = code;
    this.retryable = retryable;
    Object.setPrototypeOf(this, ToolkitError.prototype);
  }
}

export const handleGameException = (error: unknown): GameError => {
  if (error instanceof ToolkitError) {
    return error;
  }

  if (error instanceof Error) {
    return new ToolkitError(error.message, 'INTERNAL_ERROR', false);
  }

  return new ToolkitError('Unknown gaming engine error occurred', 'UNKNOWN_FAILURE', true);
};