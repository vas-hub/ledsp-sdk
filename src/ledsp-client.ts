import HttpClient from "./http-client";
import { LedspEmulator } from "./ledsp-emulator";
import { GameProgressEvent, GAME_PROGRESS_EVENT_TYPES } from "./game-progress";
import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import { GameConcept, Interpretation, Observation } from "./interfaces";

export default class LedspClient {
  ledspHttpClient: HttpClient;
  ledspEmulator: LedspEmulator;

  constructor(private readonly config: LedspClientConfig) {
    if (!LEDSP_API_ENDPOINT[config.environment])
      throw new Error(
        `Unknown environment for ledsp-sdk: ${config.environment}`
      );

    if (config.emulate && !config.gameConceptToEmulate)
      throw new Error(`
      You must provide a game concept to emulate.`);

    this.ledspHttpClient = new HttpClient(
      LEDSP_API_ENDPOINT[config.environment].concat("/", LEDSP_API_BASEPATH)
    );
    this.ledspEmulator = new LedspEmulator(config.gameConceptToEmulate);
  }

  async findInterpretation(interpretationId: string): Promise<Interpretation> {
    // TODO implement a specific class and transform it to a Decorator
    if (this.config.emulate)
      return this.ledspEmulator.findInterpretation(interpretationId);

    return await this.ledspHttpClient.get(
      `game-launcher/interpretations/${interpretationId}`
    );
  }

  /**
   * Submits an event to LedSP's games progresses registry.
   *
   * @param event {GameProgressEvent} - The event's payload.
   */
  async sendGameProgressEvent(event: GameProgressEvent): Promise<void> {
    const eventToSend = {
      ...event,
      id: `${event.gameId}.${
        typeof window !== "undefined" &&
        typeof window.crypto === "object" &&
        typeof window.crypto.randomUUID === "function"
          ? window.crypto.randomUUID()
          : Math.ceil(Math.random() * Date.now()).toString(36)
      }`,
      timestamp: Date.now(),
    };

    // TODO implement a specific class and transform it to a Decorator
    if (this.config.emulate)
      return this.ledspEmulator.sendGameProgressEvent(eventToSend);

    if (!GAME_PROGRESS_EVENT_TYPES.includes(event.eventType))
      throw new Error(
        `Game Progress Event: unknown event type: ${event.eventType}`
      );

    return await this.ledspHttpClient.post("games-progresses", eventToSend);
  }

  get gameProgressEvents(): GameProgressEvent[] {
    return this.ledspEmulator.events;
  }

  async saveResults(results: Observation[]) {}

  // TODO: Check: should this endpoint stay here?
  // TODO: Type this.
  async debriefingInfo(debriefingId: string) {
    if (this.config.gameConceptToEmulate) return;

    return this.ledspHttpClient.get(
      `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
    );
  }
}

type LedspClientConfig = {
  environment: string;
  emulate?: boolean;
  gameConceptToEmulate?: GameConcept;
};
