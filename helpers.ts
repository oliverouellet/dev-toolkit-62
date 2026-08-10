type Result<T> = { success: boolean; data?: T; error?: string; };

function safeParseJSON<T>(jsonString: string): Result<T> {
    try {
        const parsed = JSON.parse(jsonString);
        return { success: true, data: parsed };
    } catch (error) {
        return { success: false, error: 'Invalid JSON format' };
    }
}

function divideNumbers(numerator: number, denominator: number): Result<number> {
    if (denominator === 0) {
        return { success: false, error: 'Cannot divide by zero' };
    }
    return { success: true, data: numerator / denominator };
}

function fetchData(url: string): Promise<Result<any>> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => ({ success: true, data }))
        .catch(error => ({ success: false, error: error.message }));
}

export { safeParseJSON, divideNumbers, fetchData };