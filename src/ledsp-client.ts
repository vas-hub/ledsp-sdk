import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import LedspEnvironment from "./ledsp-environment.type";
import HttpClient from "./http-client";
import {
  GameConcept,
  Interpretation,
  GameProgressEvents,
  Observation,
} from "./interfaces";
import { LedspEmulator } from "./ledsp-emulator";

export default class LedspClient {
  ledspHttpClient: HttpClient;

  constructor(
    public readonly environment: LedspEnvironment,
    private readonly gameConceptToEmulate?: GameConcept
  ) {
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

  async sendGameProgressEvent(event: GameProgressEvents) {
    // TODO implement a specific class and transform it to a Decorator
    if (this.gameConceptToEmulate) return;
    this.ledspHttpClient.post(`game-progress/${event.gameId}`, event);
  }

  async saveResults(results: Observation[]) {}

  // TODO Check: should this endpoint stay here?
  async debriefingInfo(debriefingId: string) {
    if (this.gameConceptToEmulate) return;
    return this.ledspHttpClient.get(
      `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
    );
  }
}
