import { GameConcept } from "./interfaces";
import {
  GameProgressEvent,
  GAME_ENDED,
  GAME_STAGE_ENTERED,
  GAME_STARTED,
} from "./game-progress";

export class GameFlowValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "GameFlowValidationError";
  }
}

export default function ValidateGameFlow(
  gameConcept: GameConcept,
  events: GameProgressEvent[],
  expectedEvents: { step: string; stage: string }[],
  eventToEmit: GameProgressEvent,
  errorReporter: (message: string) => void
): void {
  try {
    if (
      eventToEmit.eventType === GAME_STARTED &&
      events.some(({ eventType }) => eventType === GAME_STARTED)
    )
      throw new GameFlowValidationError(`Duplicated GAME_STARTED event`);

    if (
      eventToEmit.eventType !== GAME_STARTED &&
      !events.some(({ eventType }) => eventType === GAME_STARTED)
    )
      throw new GameFlowValidationError(`GAME_STARTED event is missing`);

    if (eventToEmit.eventType === GAME_STAGE_ENTERED) {
      const expectedEventIndex = events.filter(
        ({ eventType }) => eventType === GAME_STAGE_ENTERED
      ).length;

      const expectedEvent = expectedEvents[expectedEventIndex];
      if (
        expectedEvent.step !== eventToEmit.step ||
        expectedEvent.stage !== eventToEmit.stage
      )
        throw new GameFlowValidationError(
          `Events out of order: expected ${expectedEvent.step}/${expectedEvent.stage}, got ${eventToEmit.step}/${eventToEmit.stage}`
        );
    }

    if (
      eventToEmit.eventType === GAME_ENDED &&
      events.some(({ eventType }) => eventType === GAME_ENDED)
    )
      throw new GameFlowValidationError(`Duplicated GAME_ENDED event`);

    if (eventToEmit.eventType === GAME_ENDED && !eventToEmit.cleared) {
      for (const step of gameConcept.gameFlow) {
        const phase = gameConcept.phases.find(
          ({ name }) => name === step.phase
        );

        // Check if it has been sent all the game flow steps events before the
        // end.
        for (const stage of phase.stages)
          if (
            !events.some(
              (e) =>
                e.eventType === GAME_STAGE_ENTERED &&
                e.step === step.id &&
                e.stage === stage
            )
          )
            throw new GameFlowValidationError(
              `Missing event: GAME_STAGE_ENTERED with step: ${step.id} and stage: ${stage}!`
            );
      }
    }
  } catch (error) {
    errorReporter(error?.message || error);
  }
}
