export const GAME_CONCEPT_CREATED = "game-concept-created";
export const GAME_CONCEPT_UPDATED = "game-concept-updated";
export const GAME_CONCEPT_DELETED = "game-concept-deleted";

export type GameConceptEvent =
  | IGameConceptCreated
  | IGameConceptUpdated
  | IGameConceptDeleted;

export interface IGameConceptCreated {
  id: string;
  eventType: typeof GAME_CONCEPT_CREATED;
  data: any;
  timestamp: number;
}

export interface IGameConceptUpdated {
  id: string;
  eventType: typeof GAME_CONCEPT_UPDATED;
  data: any;
  timestamp: number;
}

export interface IGameConceptDeleted {
  id: string;
  eventType: typeof GAME_CONCEPT_DELETED;
  gameConceptId: string;
  timestamp: number;
}
