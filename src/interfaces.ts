export type Interpretation = {
  readonly interpretationId: string;
  readonly userId: string;
  readonly gameId: string;
  readonly playerId: string;
  readonly team: string;
  readonly role: string;
  readonly settings: InterpretationPlaySettings;
};

export type InterpretationPlaySettings = {
  readonly playURL: string;
  readonly configuration: any;
};

export interface Player {
  id: string;
  displayName: string;
  color: string;
}

export interface GameConcept {
  defaultPlayOptionsSet: unknown;
}

export interface Observation {}

export type GameProgressEvents =
  | GameLaunched
  | GameStarted
  | PhaseEntered
  | PhaseLeft
  | GameEnded;

export type EventType =
  | "game-launched"
  | "game-started"
  | "phase-entered"
  | "phase-left"
  | "game-ended";

export type GameLaunched = {
  gameId: string;
  playerId: string;
  type: "game-launched";
  timestamp: number;
};

export type GameStarted = {
  gameId: string;
  playerId: string;
  type: "game-started";
  timestamp: number;
};

export type GameEnded = {
  gameId: string;
  playerId: string;
  type: "game-ended";
  timestamp: number;
};

export type PhaseEntered = {
  gameId: string;
  type: "phase-entered";
  playerId: string;
  phase: string;
  timestamp: number;
};

export type PhaseLeft = {
  gameId: string;
  type: "phase-left";
  playerId: string;
  phase: string;
  timestamp: number;
};
