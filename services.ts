import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
  minLevel: LogLevel;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export class GameLogger {
  private options: LoggerOptions;
  private currentFile: string;
  private currentSize: number = 0;

  constructor(options: Partial<LoggerOptions> = {}) {
    this.options = {
      logDir: options.logDir || './logs',
      maxSizeBytes: options.maxSizeBytes || 2 * 1024 * 1024, // 2MB
      maxFiles: options.maxFiles || 5,
      minLevel: options.minLevel || 'INFO',
    };

    if (!fs.existsSync(this.options.logDir)) {
      fs.mkdirSync(this.options.logDir, { recursive: true });
    }

    this.currentFile = path.join(this.options.logDir, 'game-server.log');
    if (fs.existsSync(this.currentFile)) {
      this.currentSize = fs.statSync(this.currentFile).size;
    }
  }

  public log(level: LogLevel, category: string, message: string, meta?: Record<string, unknown>): void {
    if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[this.options.minLevel]) {
      return;
    }

    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | ${JSON.stringify(meta)}` : '';
    const entry = `[${timestamp}] [${level}] [${category}]: ${message}${metaString}\n`;

    this.checkRotate(Buffer.byteLength(entry));
    fs.appendFileSync(this.currentFile, entry, 'utf8');
    this.currentSize += Buffer.byteLength(entry);
  }

  private checkRotate(incomingBytes: number): void {
    if (this.currentSize + incomingBytes < this.options.maxSizeBytes) {
      return;
    }

    for (let i = this.options.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.options.logDir, `game-server.${i}.log`);
      const newPath = path.join(this.options.logDir, `game-server.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.options.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }

    if (fs.existsSync(this.currentFile)) {
      const archivePath = path.join(this.options.logDir, 'game-server.1.log');
      fs.renameSync(this.currentFile, archivePath);
    }

    this.currentSize = 0;
  }

  public info(category: string, message: string, meta?: Record<string, unknown>): void {
    this.log('INFO', category, message, meta);
  }

  public error(category: string, message: string, meta?: Record<string, unknown>): void {
    this.log('ERROR', category, message, meta);
  }
}