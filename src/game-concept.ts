export const GAME_CONCEPT_CREATED = "game-concept-created";
export const GAME_CONCEPT_UPDATED = "game-concept-updated";
export const GAME_CONCEPT_DELETED = "game-concept-deleted";

export type GameConceptEvent =
  | IGameConceptCreated
  | IGameConceptUpdated
  | IGameConceptDeleted;

export interface IGameConceptCreated {
  eventType: typeof GAME_CONCEPT_CREATED;
  data: any;
}

export interface IGameConceptUpdated {
  eventType: typeof GAME_CONCEPT_UPDATED;
  data: any;
}

export interface IGameConceptDeleted {
  eventType: typeof GAME_CONCEPT_DELETED;
  gameConceptId: string;
}
