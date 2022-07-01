export interface GameInfo {
  playOptions: unknown;
  players: Player[];
  returnPath: string;
  teamId: string;
  gameResultsRegistryEndpoint: string;
}

export interface Player {
  id: string;
  displayName: string;
  color: string;
}

export interface GameConcept {
  defaultPlayOptionsSet: unknown;
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
