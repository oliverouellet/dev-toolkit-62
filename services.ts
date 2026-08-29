// Custom error class for handling gaming edge cases
export class GameError extends Error {
  constructor(public message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'GameError';
  }
}
interface GameState { playerId: string; status: 'active' | 'paused' | 'ended'; moves: string[]; score: number; }
// Game service managing sessions and moves with robust error handling
export class GameService {
  private activeGames: Map<string, GameState> = new Map();
  startNewGame(playerId: string): string {
    if (!playerId || typeof playerId !== 'string' || playerId.length < 3) {
      throw new GameError('Player ID must be a valid string with at least 3 characters', 'INVALID_PLAYER_ID');
    }
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    this.activeGames.set(gameId, { playerId, status: 'active', moves: [], score: 0 });
    return gameId;
  }
  processPlayerMove(gameId: string, move: string): number {
    try {
      const game = this.activeGames.get(gameId);
      if (!game) { throw new GameError('No active game found for the given ID', 'GAME_NOT_FOUND'); }
      if (game.status !== 'active') { throw new GameError('Cannot process move in current game state', 'INVALID_GAME_STATE'); }
      if (!move || typeof move !== 'string' || move.trim().length === 0) { throw new GameError('Move must be a non-empty string', 'INVALID_MOVE'); }
      if (game.moves.includes(move)) { throw new GameError('Duplicate move not allowed', 'DUPLICATE_MOVE'); }
      if (game.moves.length >= 50) { throw new GameError('Maximum moves reached', 'MAX_MOVES_EXCEEDED'); }
      game.moves.push(move);
      game.score += move.length * 10;
      if (game.score > 10000) { game.status = 'ended'; }
      return game.score;
    } catch (error: any) {
      if (error instanceof GameError) {
        console.warn(`Game error occurred: ${error.code} - ${error.message}`);
        throw error;
      }
      console.error('Unexpected error in game service:', error);
      throw new GameError('An unexpected error occurred', 'UNEXPECTED_ERROR', error);
    }
  }
  getGameScore(gameId: string): number {
    const game = this.activeGames.get(gameId);
    if (!game) { throw new GameError('Game not found', 'GAME_NOT_FOUND'); }
    return game.score;
  }
  pauseGame(gameId: string): void {
    const game = this.activeGames.get(gameId);
    if (!game) { throw new GameError('Game not found', 'GAME_NOT_FOUND'); }
    if (game.status !== 'active') { throw new GameError('Only active games can be paused', 'INVALID_STATE_TRANSITION'); }
    game.status = 'paused';
  }
}