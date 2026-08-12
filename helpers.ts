type GameData = { id: number; name: string; genre: string; };

type ErrorResponse = { error: string; code: number; };

const fetchGameData = async (id: number): Promise<GameData | ErrorResponse> => {
    try {
        const response = await fetch(`https://api.example.com/games/${id}`);
        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            return { error: errorData.error, code: response.status };
        }
        const data: GameData = await response.json();
        return data;
    } catch (error) {
        return { error: 'Network error', code: 500 };
    }
};

const displayGameInfo = async (id: number) => {
    const result = await fetchGameData(id);
    if ('error' in result) {
        console.error(`Error fetching game: ${result.error} (Code: ${result.code})`);
    } else {
        console.log(`Game: ${result.name}, Genre: ${result.genre}`);
    }
};

export { fetchGameData, displayGameInfo };