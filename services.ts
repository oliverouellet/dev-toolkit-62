export interface PlayerScore {
  playerId: string;
  username: string;
  score: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface LeaderboardPage {
  entries: Array<PlayerScore & { rank: number }>;
  totalPlayers: number;
  page: number;
  totalPages: number;
}

/**
 * Service for managing in-memory player scores and ranking data.
 */
export class LeaderboardService {
  private scores: Map<string, PlayerScore> = new Map();

  public submitScore(entry: Omit<PlayerScore, 'timestamp'>): void {
    const existing = this.scores.get(entry.playerId);
    if (!existing || entry.score > existing.score) {
      this.scores.set(entry.playerId, {
        ...entry,
        timestamp: Date.now(),
      });
    }
  }

  public getPlayerRank(playerId: string): number | null {
    if (!this.scores.has(playerId)) {
      return null;
    }

    const sorted = this.getSortedScores();
    const index = sorted.findIndex((s) => s.playerId === playerId);
    return index !== -1 ? index + 1 : null;
  }

  public getTopPage(page: number = 1, pageSize: number = 10): LeaderboardPage {
    const sorted = this.getSortedScores();
    const totalPlayers = sorted.length;
    const totalPages = Math.ceil(totalPlayers / pageSize) || 1;
    const safePage = Math.max(1, Math.min(page, totalPages));

    const startIndex = (safePage - 1) * pageSize;
    const pageEntries = sorted.slice(startIndex, startIndex + pageSize);

    const entriesWithRank = pageEntries.map((entry, idx) => ({
      ...entry,
      rank: startIndex + idx + 1,
    }));

    return {
      entries: entriesWithRank,
      totalPlayers,
      page: safePage,
      totalPages,
    };
  }

  private getSortedScores(): PlayerScore[] {
    return Array.from(this.scores.values()).sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timestamp - b.timestamp; // Earlier timestamp wins ties
    });
  }
}
