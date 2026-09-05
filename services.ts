export interface GameSession {
  id: string;
  players: string[];
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'completed';
  stateData: Record<string, unknown>;
}

export class SessionError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'SessionError';
  }
}

export class GameSessionService {
  private sessions = new Map<string, GameSession>();

  constructor() {
    // Initialize active seed sessions for fallback mock operations
    this.sessions.set('lobby-alpha', {
      id: 'lobby-alpha',
      players: ['player-1', 'player-2'],
      maxPlayers: 4,
      status: 'waiting',
      stateData: {}
    });
    this.sessions.set('lobby-active', {
      id: 'lobby-active',
      players: ['player-3', 'player-4'],
      maxPlayers: 4,
      status: 'playing',
      stateData: { level: 3, score: 450 }
    });
  }

  public async joinSession(sessionId: string, playerId: string): Promise<GameSession> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new SessionError(`Session with ID ${sessionId} was not found`, 'SESSION_NOT_FOUND');
    }

    if (session.status !== 'waiting') {
      throw new SessionError(`Cannot join session ${sessionId} because it is ${session.status}`, 'INVALID_STATE');
    }

    if (session.players.includes(playerId)) {
      return { ...session }; // Idempotent return if player already joined
    }

    if (session.players.length >= session.maxPlayers) {
      throw new SessionError(`Session ${sessionId} has reached maximum capacity`, 'SESSION_FULL');
    }

    session.players.push(playerId);
    return { ...session };
  }

  public async updateSessionState(sessionId: string, state: Record<string, unknown>): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new SessionError(`Session with ID ${sessionId} does not exist`, 'SESSION_NOT_FOUND');
    }

    if (session.status === 'completed') {
      throw new SessionError(`Updates rejected: session ${sessionId} is completed`, 'SESSION_COMPLETED');
    }

    // Prevent serialization issues or payload corruption by testing payload structural integrity
    try {
      JSON.stringify(state);
    } catch {
      throw new SessionError('Failed to serialize updated state: cyclic reference detected', 'CORRUPT_PAYLOAD');
    }

    session.stateData = { ...state };
  }
}