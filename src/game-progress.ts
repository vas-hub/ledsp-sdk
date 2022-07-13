export const GAME_PREPARED = "game-prepared";
export const GAME_LAUNCHED = "game-launched";
export const GAME_STARTED = "game-started";
export const GAME_STAGE_ENTERED = "game-stage-entered";
export const GAME_ENDED = "game-ended";

export const GAME_PROGRESS_EVENT_TYPES = [
  GAME_PREPARED,
  GAME_LAUNCHED,
  GAME_STARTED,
  GAME_STAGE_ENTERED,
  GAME_ENDED,
];

export type GameProgressEvent =
  | IGamePrepared
  | IGameLaunched
  | IGameStarted
  | IGameStageEntered
  | IGameEnded;

export interface IGamePrepared {
  eventType: typeof GAME_PREPARED;
  gameId: string;
  gameConcept: GameConcept;
}

export type GameConcept = {
  id: string;
  version: `${string}.${string}.${string}`;
  phases: Phase[];
  gameFlow: { id: string; phase: Phase["name"] }[];
};

export type Phase = {
  name: string;
  description: string;
  stages: string[];
  expectedDurationInSeconds: {
    min: number;
    max: number;
  };
};

export interface IGameLaunched {
  eventType: typeof GAME_LAUNCHED;
  gameId: string;
  teamId: string;
}

export interface IGameStarted {
  eventType: typeof GAME_STARTED;
  gameId: string;
  playerId: string;
  teamId: string;
}

export interface IGameEnded {
  eventType: typeof GAME_ENDED;
  gameId: string;
  playerId: string;
  teamId: string;
  cleared: boolean;
}

export interface IGameStageEntered {
  eventType: typeof GAME_STAGE_ENTERED;
  gameId: string;
  playerId: string;
  teamId: string;
  step: string;
  stage: string;
}
