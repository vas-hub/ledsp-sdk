import { GameConcept } from "./interfaces";
import {
  GameProgressEvent,
  GAME_ENDED,
  GAME_STAGE_ENTERED,
  GAME_STARTED,
} from "./game-progress";

export default function ValidateGameFlow(
  gameConcept: GameConcept,
  events: GameProgressEvent[],
  expectedEvents: { step: string; stage: string }[],
  eventToEmit: GameProgressEvent,
  errorReporter: (message: string) => void
): void {
  if (
    eventToEmit.eventType === GAME_STARTED &&
    events.some((e) => e.eventType === GAME_STARTED)
  )
    return errorReporter(`Duplicated GAME_STARTED event`);

  if (
    eventToEmit.eventType !== GAME_STARTED &&
    !events.some((e) => e.eventType === GAME_STARTED)
  ) {
    return errorReporter(`GAME_STARTED event is missing`);
  }

  if (eventToEmit.eventType === GAME_STAGE_ENTERED) {
    const expectedEventIndex = events.filter(
      (e) => e.eventType === GAME_STAGE_ENTERED
    ).length;

    const expectedEvent = expectedEvents[expectedEventIndex];
    if (
      expectedEvent.step !== eventToEmit.step ||
      expectedEvent.stage !== eventToEmit.stage
    )
      return errorReporter(
        `Events out of order: expected ${expectedEvent.step}/${expectedEvent.stage}, got ${eventToEmit.step}/${eventToEmit.stage}`
      );
  }

  if (
    eventToEmit.eventType === GAME_ENDED &&
    events.some((e) => e.eventType === GAME_ENDED)
  )
    return errorReporter(`Duplicated GAME_ENDED event`);

  if (eventToEmit.eventType === GAME_ENDED && !eventToEmit.cleared) {
    for (const step of gameConcept.gameFlow) {
      const phase = gameConcept.phases.find((p) => p.name === step.phase);
      // Check if it has been sent al the game flow steps events before the end
      for (const stage of phase.stages)
        if (
          !events.some(
            (e) =>
              e.eventType === GAME_STAGE_ENTERED &&
              e.step === step.id &&
              e.stage === stage
          )
        ) {
          return errorReporter(
            `Missing event: GAME_STAGE_ENTERED with step: ${step.id} and stage: ${stage}!`
          );
        }
    }
  }
}
