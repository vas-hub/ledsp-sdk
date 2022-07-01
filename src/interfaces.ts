export type Interpretation = {
  readonly interpretationId: string;
  readonly userId: string;
  readonly gameId: string;
  readonly playerId: string;
  readonly team: string;
  readonly role: string;
  readonly settings: InterpretationPlaySettings;
};

export type InterpretationPlaySettings<T = unknown> = {
  readonly playURL: string;
  readonly configuration: T;
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
