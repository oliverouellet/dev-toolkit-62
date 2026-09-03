export interface GameState { score: number; level: number; }

export class GameError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'GameError';
  }
}

export const fetchGameState = async (playerId: string): Promise<GameState> => {
  if (!playerId) {
    throw new GameError('Invalid player ID provided', 'INVALID_ID');
  }

  try {
    const response = await fetch(`/api/game/${playerId}`);
    
    if (response.status === 404) {
      throw new GameError('Player data not found', 'NOT_FOUND');
    }
    
    if (!response.ok) {
      throw new GameError('Server communication failure', 'NETWORK_ERR');
    }

    return await response.json();
  } catch (err) {
    if (err instanceof GameError) throw err;
    
    // Handle unexpected runtime exceptions
    console.error('Unexpected sync failure:', err);
    throw new GameError('Internal system error', 'SYSTEM_ERR');
  }
};

export const safeUpdate = async (data: GameState): Promise<boolean> => {
  try {
    const res = await fetch('/api/update', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};