// Importing necessary types
import { User, UserResponse } from './types';

/**
 * Fetches user data from the server.
 * @param userId - The ID of the user to fetch.
 * @returns A promise that resolves to a UserResponse object.
 */
export async function fetchUserData(userId: string): Promise<UserResponse> {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: User = await response.json();
    return data;
}

/**
 * Creates a new user.
 * @param user - The user data to create.
 * @returns A promise that resolves to the created UserResponse object.
 */
export async function createUser(user: User): Promise<UserResponse> {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    const data: User = await response.json();
    return data;
}