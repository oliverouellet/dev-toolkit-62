export interface Player {
  id: string;
  health: number;
}
export class GameService {
  private players: Map<string, Player> = new Map();
  private gameActive: boolean = false;
  // error handling for edge cases in gaming services
  startGame(playerIds: string[]): void {
    if (playerIds.length < 2) {
      throw new Error('Need at least two players to start game');
    }
    if (this.gameActive) {
      throw new Error('Game is already active');
    }
    this.players.clear();
    playerIds.forEach(id => {
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid player ID');
      }
      this.players.set(id, { id, health: 100 });
    });
    this.gameActive = true;
  }
  applyDamage(playerId: string, amount: number): void {
    if (!this.gameActive) {
      throw new Error('Game is not active');
    }
    if (amount <= 0) {
      throw new Error('Damage amount must be positive');
    }
    const player = this.players.get(playerId);
    if (!player) {
      throw new Error('Player not found');
    }
    player.health -= amount;
    if (player.health <= 0) {
      player.health = 0;
      this.endGame();
    }
  }
  handleDisconnect(playerId: string): void {
    if (!this.gameActive || !this.players.has(playerId)) {
      return;
    }
    this.players.delete(playerId);
    if (this.players.size < 2) {
      this.endGame();
    }
  }
  private endGame(): void {
    this.gameActive = false;
    this.players.clear();
  }
  getPlayerHealth(playerId: string): number | null {
    const player = this.players.get(playerId);
    if (!this.gameActive || !player) {
      return null;
    }
    return player.health;
  }
  // uses try catch to handle all edge case errors gracefully
  processAction(playerId: string, actionType: string, value: number): string {
    try {
      switch (actionType) {
        case 'damage':
          this.applyDamage(playerId, value);
          return 'success';
        default:
          throw new Error('Invalid action type');
      }
    } catch (e: unknown) {
      return e instanceof Error ? `error: ${e.message}` : 'error';
    }
  }
}