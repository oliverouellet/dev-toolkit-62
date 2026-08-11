/**
 * Represents a player in the game.
 * @interface Player
 */
interface Player {
    /** The unique identifier for the player */
    id: string;
    /** The name of the player */
    name: string;
    /** The current score of the player */
    score: number;
}

/**
 * Represents a game state.
 * @interface GameState
 */
interface GameState {
    /** The current level of the game */
    level: number;
    /** The list of players in the game */
    players: Player[];
    /** Indicates if the game is currently active */
    isActive: boolean;
}

/**
 * Represents the settings for the game.
 * @interface GameSettings
 */
interface GameSettings {
    /** The maximum number of players allowed in the game */
    maxPlayers: number;
    /** The duration of the game in minutes */
    duration: number;
    /** The difficulty level of the game */
    difficulty: 'easy' | 'medium' | 'hard';
}

export { Player, GameState, GameSettings };