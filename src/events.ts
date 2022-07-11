import { GameConceptEvent } from "./game-concept";
import { GameProgressEvent } from "./game-progress";

export type Event = GameProgressEvent | GameConceptEvent;
