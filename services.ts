type Game = { id: string; title: string; genre: string; releaseDate: Date; };

type Player = { username: string; score: number; level: number; };

const games: Game[] = [];
const players: Player[] = [];

/**
 * Adds a new game to the list
 * @param game - The game to add
 */
function addGame(game: Game): void {
    games.push(game);
}

/**
 * Retrieves a game by its ID
 * @param id - The ID of the game to retrieve
 * @returns The game object or undefined if not found
 */
function getGameById(id: string): Game | undefined {
    return games.find(game => game.id === id);
}

/**
 * Adds a new player to the list
 * @param player - The player to add
 */
function addPlayer(player: Player): void {
    players.push(player);
}

/**
 * Retrieves a player by their username
 * @param username - The username of the player to retrieve
 * @returns The player object or undefined if not found
 */
function getPlayerByUsername(username: string): Player | undefined {
    return players.find(player => player.username === username);
}

/**
 * Gets all games
 * @returns An array of all games
 */
function getAllGames(): Game[] {
    return games;
}

/**
 * Gets all players
 * @returns An array of all players
 */
function getAllPlayers(): Player[] {
    return players;
}