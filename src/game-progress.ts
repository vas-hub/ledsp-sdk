export const GAME_LAUNCHED = "game-launched";
export const GAME_STARTED = "game-started";
export const GAME_ENDED = "game-ended";
export const PHASE_ENTERED = "phase-entered";
export const STAGE_ENTERED = "stage-entered";

export const GAME_PROGRESS_EVENT_TYPES = [
  GAME_LAUNCHED,
  GAME_STARTED,
  GAME_ENDED,
  PHASE_ENTERED,
  STAGE_ENTERED,
];

export type GameProgressEvent =
  | IGameLaunched
  | IGameStarted
  | IGameEnded
  | IPhaseEntered
  | IStageEntered;

export interface IGameLaunched {
  id: string;
  eventType: "game-launched";
  gameId: string;
  playerId: string;
  teamId: string;
  timestamp: number;
}

export interface IGameStarted {
  id: string;
  eventType: "game-started";
  gameId: string;
  playerId: string;
  teamId: string;
  timestamp: number;
}

export interface IGameEnded {
  id: string;
  eventType: "game-ended";
  gameId: string;
  playerId: string;
  teamId: string;
  cleared: boolean;
  timestamp: number;
}

export interface IPhaseEntered {
  id: string;
  eventType: "phase-entered";
  gameId: string;
  playerId: string;
  teamId: string;
  phase: string;
  timestamp: number;
}

export interface IStageEntered {
  id: string;
  eventType: "stage-entered";
  gameId: string;
  playerId: string;
  teamId: string;
  stage: string;
  timestamp: number;
}
