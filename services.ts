// Import required modules
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log directory
const logDir = path.join(__dirname, 'logs');
// Ensure log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create a rotating file logger
const transport = new winston.transports.DailyRotateFile({
    filename: path.join(logDir, '%DATE%-results.log'),
    datePattern: 'YYYY-MM-DD',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    prepend: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

// Configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [transport],
});

// Export the logger for use in the application
export default logger;
