export interface GameEvent {
  id: string;
  payload: Record<string, unknown>;
}

export class GameServiceError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'GameServiceError';
  }
}

/**
 * Processes game events with safety wrappers
 */
export const processEvent = async (event: GameEvent): Promise<boolean> => {
  try {
    if (!event.id) {
      throw new GameServiceError('INVALID_ID', 'Event missing unique identifier');
    }

    const response = await fetch('/api/game/dispatch', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new GameServiceError('NETWORK_FAILURE', `Server returned ${response.status}`);
    }

    return true;
  } catch (error) {
    if (error instanceof GameServiceError) {
      console.error(`[${error.code}] ${error.message}`);
    } else {
      console.error('UNEXPECTED_FAILURE', error);
    }
    return false;
  }
};