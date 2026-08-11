import fs from 'fs';
import path from 'path';

interface Config {
    host: string;
    port: number;
    useSSL: boolean;
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 3000,
    useSSL: false,
};

function loadConfig(filePath: string): Config {
    const configPath = path.resolve(filePath);
    if (fs.existsSync(configPath)) {
        const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return { ...defaultConfig, ...userConfig };
    }
    return defaultConfig;
}

export { loadConfig, Config };