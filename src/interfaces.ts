import { PlayOption } from './game-play-info';

export interface GameConcept {
  defaultPlayOptionsSet: { [key: string]: PlayOption };
  gameFlow: { id: string; phase: string }[];
  phases: { name: string; stages: string[] }[];
}

export interface Observation {}

export type WithId<T> = T & { id: string };
