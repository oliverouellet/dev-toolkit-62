import fs from 'fs';
import path from 'path';

interface Config {
    port: number;
    dbUrl: string;
    logLevel: string;
}

const defaultConfig: Config = {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017/myapp',
    logLevel: 'info',
};

function loadConfig(filePath: string): Config {
    const fullPath = path.resolve(filePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`Config file not found. Using default config.`);
        return defaultConfig;
    }
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    try {
        const userConfig: Partial<Config> = JSON.parse(fileContent);
        return { ...defaultConfig, ...userConfig }; // Merge with defaults
    } catch (error) {
        console.error('Error parsing config file:', error);
        return defaultConfig;
    }
}

export { loadConfig };