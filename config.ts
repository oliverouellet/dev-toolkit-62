const CONFIG = {
    BASE_API_URL: 'https://api.gamingexample.com',
    TIMEOUT: 5000,
    MAX_RETRIES: 3,
    LOG_LEVEL: 'info',
    featureFlags: {
        ENABLE_NEW_FEATURE: true,
        ENABLE_BETA_ACCESS: false,
    },
};

export const getConfig = (key: string): string | undefined => {
    return CONFIG[key];
};

export const isFeatureEnabled = (feature: string): boolean => {
    return CONFIG.featureFlags[feature] !== undefined ? CONFIG.featureFlags[feature] : false;
};

export default CONFIG;