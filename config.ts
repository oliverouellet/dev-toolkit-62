import fs from 'fs';
import path from 'path';

type Config = {  
    port: number;  
    dbUrl: string;  
    logLevel: 'debug' | 'info' | 'warn' | 'error';  
};

const defaultConfig: Config = {  
    port: 3000,  
    dbUrl: 'mongodb://localhost:27017/myapp',  
    logLevel: 'info'  
};

export function loadConfig(configPath: string): Config {  
    try {  
        const fullPath = path.resolve(process.cwd(), configPath);  
        const fileData = fs.readFileSync(fullPath, 'utf-8');  
        const userConfig = JSON.parse(fileData);  

        return {  
            ...defaultConfig,  
            ...userConfig,  
        };  
    } catch (error) {  
        console.warn('Could not load config, using defaults:', error);
        return defaultConfig;  
    }  
}
