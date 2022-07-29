export interface GameConcept {
  defaultPlayOptionsSet: { [key: string]: string | number };
  gameFlow: { id: string; phase: string }[];
  phases: { name: string; stages: string[] }[];
}

export interface Observation {}

export type WithId<T> = T & { id: string };
