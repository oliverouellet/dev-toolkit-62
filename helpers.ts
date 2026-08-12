type Game = { id: number; name: string; genre: string; releaseDate: string; }

type GameIndex = { [id: number]: Game; }

/**
 * Retrieves a game by its ID from the given game index.
 * @param gameId - The ID of the game to retrieve.
 * @param gameIndex - A mapping of game IDs to game data.
 * @returns The game object if found, otherwise null.
 */
function getGameById(gameId: number, gameIndex: GameIndex): Game | null {
    return gameIndex[gameId] || null;
}

/**
 * Adds a new game to the game index.
 * @param game - The game object to add.
 * @param gameIndex - The current game index.
 * @returns Updated game index with the new game included.
 */
function addGame(game: Game, gameIndex: GameIndex): GameIndex {
    return { ...gameIndex, [game.id]: game };
}

/**
 * Removes a game by its ID from the game index.
 * @param gameId - The ID of the game to remove.
 * @param gameIndex - The current game index.
 * @returns Updated game index without the specified game.
 */
function removeGame(gameId: number, gameIndex: GameIndex): GameIndex {
    const { [gameId]: removed, ...remaining } = gameIndex;
    return remaining;
}

export { getGameById, addGame, removeGame, Game, GameIndex };