export interface GameInfo {
  gameInfoId: string; // Aka interpretationId
  userId: string;
  gameId: string;
  playerId: string;
  team: string;
  role: string;
  settings: {
    playURL: string;
    configuration: unknown;
  };
}

export interface PlayerStatus {
  gameId: string;
  playerId: string;
  timestamp: Date;
  phase: string;
  round: number;
  isOwnTurn: boolean;
  stage: string;
}

export interface Observation {}
