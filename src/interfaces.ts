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

export type GameProgressEvents = PhaseEntered | PhaseLeft;

export type PhaseEntered = {
  gameId: string;
  type: PhaseEventTypes.Entered;
  playerId: string;
  phase: string;
  timestamp: number;
};

export type PhaseLeft = {
  gameId: string;
  type: PhaseEventTypes.Left;
  playerId: string;
  phase: string;
  timestamp: number;
};

export enum PhaseEventTypes {
  Entered = "entered",
  Left = "left",
}
