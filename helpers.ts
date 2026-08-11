type MyError = { code: number; message: string; };

function handleError(err: unknown): MyError {
    // Check if the error is an instance of Error
    if (err instanceof Error) {
        return { code: 500, message: err.message };
    }
    // If it's a known error type, handle accordingly
    if (typeof err === 'object' && err !== null && 'code' in err && 'message' in err) {
        return { code: (err as { code: number }).code || 500, message: (err as { message: string }).message || 'Unknown error occurred' };
    }
    // For any other unknown type
    return { code: 500, message: 'An unknown error occurred' };
}

function processData(data: any): string {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data');
        }
        // Process your data here
        return `Processed: ${JSON.stringify(data)}`;
    } catch (err) {
        const errorResponse = handleError(err);
        return `Error (${errorResponse.code}): ${errorResponse.message}`;
    }
}

export { handleError, processData };
