import axios from 'axios';
import { GameData, GameError } from './types';

const API_URL = 'https://api.gaming.com/games';

export const fetchGameData = async (gameId: string): Promise<GameData | GameError> => {
    try {
        const response = await axios.get(`${API_URL}/${gameId}`);
        if (response.status !== 200) {
            return { error: 'Failed to fetch game data', code: response.status };
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { error: error.message, code: error.response?.status || 500 };
        }
        return { error: 'An unexpected error occurred', code: 500 };
    }
};

export const processGameData = (data: GameData): string => {
    if (!data || !data.name) {
        throw new Error('Invalid game data');
    }
    return `Game: ${data.name} - Genre: ${data.genre}`;
};

export const getGameById = async (gameId: string): Promise<string> => {
    const dataResult = await fetchGameData(gameId);
    if ('error' in dataResult) {
        return `Error: ${dataResult.error} (Code: ${dataResult.code})`;
    }
    return processGameData(dataResult);
};
