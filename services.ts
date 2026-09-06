import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export class GameLogger {
  private currentFilePath: string;

  constructor(private config: LoggerConfig) {
    if (!fs.existsSync(this.config.logDir)) {
      fs.mkdirSync(this.config.logDir, { recursive: true });
    }
    this.currentFilePath = path.join(this.config.logDir, 'game-session.log');
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR' | 'GAME_EVENT', message: string, payload?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const formattedPayload = payload ? ` | Data: ${JSON.stringify(payload)}` : '';
    const logLine = `[${timestamp}] [${level}] ${message}${formattedPayload}\n`;

    this.checkRotation();
    fs.appendFileSync(this.currentFilePath, logLine, 'utf-8');
  }

  private checkRotation(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.config.maxSizeBytes) return;

    for (let i = this.config.maxFiles - 1; i >= 1; i--) {
      const oldFile = path.join(this.config.logDir, `game-session.${i}.log`);
      const newFile = path.join(this.config.logDir, `game-session.${i + 1}.log`);
      if (fs.existsSync(oldFile)) {
        if (i + 1 > this.config.maxFiles) {
          fs.unlinkSync(oldFile);
        } else {
          fs.renameSync(oldFile, newFile);
        }
      }
    }

    const firstArchive = path.join(this.config.logDir, 'game-session.1.log');
    fs.renameSync(this.currentFilePath, firstArchive);
  }
}