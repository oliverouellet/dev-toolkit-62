import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

const logDirectory = path.join(__dirname, 'logs');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const getLogFileName = () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    return path.join(logDirectory, `log-${date}.txt`);
};

const rotateLogs = () => {
    const oldFilePath = getLogFileName();
    const backupFilePath = path.join(logDirectory, `log-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.txt`);

    if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, backupFilePath);
    }
};

const logMessage = (message: string) => {
    rotateLogs();
    const logFilePath = getLogFileName();
    const logEntry = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry);
};

export { logMessage };