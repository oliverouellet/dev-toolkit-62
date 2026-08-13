// Default configuration values
const defaultConfig = {
    resolution: '1920x1080',
    volume: 70,
    controls: {
        jump: 'space',
        shoot: 'ctrl',
        moveLeft: 'a',
        moveRight: 'd'
    }
};

// Configuration loader
export function loadConfig(customConfig = {}): any {
    return {
        ...defaultConfig,
        ...customConfig
    };
}

// Example usage
const userConfig = {
    volume: 80,
    controls: {
        jump: 'w'
    }
};

const finalConfig = loadConfig(userConfig);
console.log(finalConfig); // Merges defaults with user input