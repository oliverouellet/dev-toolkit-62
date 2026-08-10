type User = {  id: number;  name: string;  email: string;};

/**
 * Filters users based on a provided email domain.
 * @param users - An array of User objects to be filtered.
 * @param domain - The email domain to filter the users by.
 * @returns An array of User objects with the specified email domain.
 */
function filterUsersByDomain(users: User[], domain: string): User[] {
    return users.filter(user => user.email.endsWith(domain));
}

/**
 * Sorts an array of users by their names.
 * @param users - An array of User objects to be sorted.
 * @returns A new array of User objects sorted by name.
 */
function sortUsersByName(users: User[]): User[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Displays user information in a formatted string.
 * @param user - A User object to be displayed.
 * @returns A formatted string with user details.
 */
function displayUserInfo(user: User): string {
    return `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
}

export { User, filterUsersByDomain, sortUsersByName, displayUserInfo };