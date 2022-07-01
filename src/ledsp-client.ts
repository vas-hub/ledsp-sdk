import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import LedspEnvironment from "./ledsp-environment.type";
import HttpClient from "./http-client";
import {
  GameConcept,
  GameInfo,
  GameProgressEvents,
  Observation,
  PlayerStatus,
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

  async findGameConfiguration(gameConfigId: string): Promise<GameInfo> {
    // TODO implement a specific class and transform it to a Decorator
    if (this.gameConceptToEmulate)
      return LedspEmulator.findGameConfiguration(this.gameConceptToEmulate);
    return this.ledspHttpClient.get(
      `game-launcher/interpretations/${gameConfigId}/configuration`
    );
  }

  async sendGameProgress(event: GameProgressEvents) {
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
