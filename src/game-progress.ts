export const GAME_PREPARED = "game-prepared";
export const GAME_LAUNCHED = "game-launched";
export const GAME_STARTED = "game-started";
export const GAME_FLOW_STEP_ENTERED = "game-flow-step-entered";
export const GAME_ENDED = "game-ended";

export const GAME_PROGRESS_EVENT_TYPES = [
  GAME_PREPARED,
  GAME_LAUNCHED,
  GAME_STARTED,
  GAME_FLOW_STEP_ENTERED,
  GAME_ENDED,
];

export type GameProgressEvent =
  | IGamePrepared
  | IGameLaunched
  | IGameStarted
  | IGameEnded
  | IGameFlowStepEntered;

export interface IGamePrepared {
  id: string;
  eventType: typeof GAME_PREPARED;
  gameId: string;
  timestamp: number;
}
export interface IGameLaunched {
  id: string;
  eventType: typeof GAME_LAUNCHED;
  gameId: string;
  playerId: string;
  teamId: string;
  timestamp: number;
}

export interface IGameStarted {
  id: string;
  eventType: typeof GAME_STARTED;
  gameId: string;
  playerId: string;
  teamId: string;
  timestamp: number;
}

export interface IGameEnded {
  id: string;
  eventType: typeof GAME_ENDED;
  gameId: string;
  playerId: string;
  teamId: string;
  cleared: boolean;
  timestamp: number;
}

export interface IGameFlowStepEntered {
  id: string;
  eventType: typeof GAME_FLOW_STEP_ENTERED;
  gameId: string;
  playerId: string;
  teamId: string;
  step: string;
  stage: string;
  timestamp: number;
}
