export const GAME_LAUNCHED = "game-launched";
export const GAME_STARTED = "game-started";
export const GAME_STAGE_ENTERED = "game-stage-entered";
export const GAME_ENDED = "game-ended";

export const GAME_PROGRESS_EVENT_TYPES = [
  GAME_LAUNCHED,
  GAME_STARTED,
  GAME_STAGE_ENTERED,
  GAME_ENDED,
];

export type GameProgressEvent =
  | IGameLaunched
  | IGameStarted
  | IGameStageEntered
  | IGameEnded;

export interface IGameLaunched {
  eventType: typeof GAME_LAUNCHED;
  gameId: string;
  gameConcept: GameConcept;
}

export type GameConcept = {
  id: string;
  version: `${string}.${string}.${string}`;
  phases: Phase[];
  gameFlow: { id: string; phase: Phase["name"], description: string }[];
};

export type Phase = {
  name: string;
  stages: string[];
  expectedDurationInSeconds: {
    min: number;
    max: number;
  };
};

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
