import { createLogger, format, transports } from 'winston';
import { rotateFile } from 'winston-daily-rotate-file';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new rotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
            level: 'debug',
        }),
    ],
});

export default logger;