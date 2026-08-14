type GameCharacter = {
    id: number;
    name: string;
    health: number;
    experience: number;
    level: number;
    inventory: Item[];
};

interface Item {
    itemId: number;
    itemName: string;
    description?: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

type GameState = {
    characters: GameCharacter[];
    currentLevel: number;
    score: number;
    isGameOver: boolean;
};

type PlayerAction = 'MOVE' | 'ATTACK' | 'DEFEND' | 'USE_ITEM';

interface ActionResult {
    success: boolean;
    message: string;
    newState?: GameState;
};

export { GameCharacter, Item, GameState, PlayerAction, ActionResult };