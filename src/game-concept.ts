export const GAME_CONCEPT_CREATED = "game-concept-created";
export const GAME_CONCEPT_UPDATED = "game-concept-updated";
export const GAME_CONCEPT_DELETED = "game-concept-deleted";

export type GameConceptEvent =
  | IGameConceptCreated
  | IGameConceptUpdated
  | IGameConceptDeleted;

export interface IGameConceptCreated {
  id: string;
  eventType: "game-concept-created";
  data: any;
  timestamp: number;
}

export interface IGameConceptUpdated {
  id: string;
  eventType: "game-concept-updated";
  data: any;
  timestamp: number;
}

export interface IGameConceptDeleted {
  id: string;
  eventType: "game-concept-deleted";
  gameConceptId: string;
  timestamp: number;
}
