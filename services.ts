import { GameData } from './types';

export class GameService {
    private games: GameData[] = [];

    constructor(games: GameData[]) {
        this.games = games;
    }

    public getGameById(id: string): GameData | undefined {
        // Using a more efficient search method
        return this.games.find(game => game.id === id);
    }

    public getAllGames(): GameData[] {
        // Return a shallow copy to prevent mutations
        return [...this.games];
    }

    public updateGame(updatedGame: GameData): boolean {
        const index = this.games.findIndex(game => game.id === updatedGame.id);
        if (index === -1) return false;
        this.games[index] = updatedGame;
        return true;
    }

    public deleteGame(id: string): boolean {
        const initialLength = this.games.length;
        this.games = this.games.filter(game => game.id !== id);
        return this.games.length < initialLength;
    }
}
