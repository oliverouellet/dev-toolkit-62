async function retry<T>(operation: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i < retries - 1) {
                console.warn(
                    `Attempt ${i + 1} failed. Retrying in ${delay}ms...`
                );
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error('All retry attempts failed:', error);
                throw error;
            }
        }
    }
}

export { retry };