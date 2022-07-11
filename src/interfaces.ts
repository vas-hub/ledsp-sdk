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
