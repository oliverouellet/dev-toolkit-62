import { createLogger, format, transports } from 'winston';
import { join } from 'path';

const logDirectory = join(__dirname, 'logs');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: join(logDirectory, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: '14d',
      tailable: true,
    }),
    new transports.File({
      filename: join(logDirectory, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: '14d',
      tailable: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
