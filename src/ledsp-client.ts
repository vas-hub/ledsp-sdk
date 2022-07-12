import { GameProgressEvent, GAME_PROGRESS_EVENT_TYPES } from "./game-progress";
import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import HttpClient from "./http-client";
import { GameConcept, Interpretation, Observation } from "./interfaces";
import { LedspEmulator } from "./ledsp-emulator";

export default class LedspClient {
  ledspHttpClient: HttpClient;

  constructor(
    public readonly environment: string,
    private readonly gameConceptToEmulate?: GameConcept
  ) {
    if (!LEDSP_API_ENDPOINT[environment])
      throw new Error(`Unknown environment for ledsp-sdk: ${environment}`);
    this.ledspHttpClient = new HttpClient(
      LEDSP_API_ENDPOINT[this.environment].concat("/", LEDSP_API_BASEPATH)
    );
  }

  async findInterpretation(interpretationId: string): Promise<Interpretation> {
    // TODO implement a specific class and transform it to a Decorator
    if (this.gameConceptToEmulate)
      return LedspEmulator.findInterpretation(
        interpretationId,
        this.gameConceptToEmulate
      );
    return this.ledspHttpClient.get(
      `game-launcher/interpretations/${interpretationId}`
    );
  }

  async sendGameProgressEvent(event: Omit<GameProgressEvent, "id">) {
    // TODO implement a specific class and transform it to a Decorator
    if (this.gameConceptToEmulate) return;
    if (!GAME_PROGRESS_EVENT_TYPES.includes(event.eventType))
      throw new Error(
        `Game Progress Event: unknown event type: ${event.eventType}`
      );
    this.ledspHttpClient.post(`games-progresses`, {
      ...event,
      id: `${event.gameId}.${
        typeof window !== "undefined" &&
        typeof window.crypto === "object" &&
        typeof window.crypto.randomUUID === "function"
          ? window.crypto.randomUUID()
          : Math.ceil(Math.random() * Date.now()).toString(36)
      }`,
    });
  }

  async saveResults(results: Observation[]) {}

  // TODO: Check: should this endpoint stay here?
  // TODO: Type this.
  async debriefingInfo(debriefingId: string) {
    if (this.gameConceptToEmulate) return;
    return this.ledspHttpClient.get(
      `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
    );
  }
}
