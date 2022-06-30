import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import LedspEnvironment from "./ledsp-environment.type";
import HttpClient from "./http-client";
import { GameInfo, Observation, PlayerStatus } from "./interfaces";

export default class LedspClient {
  ledspHttpClient: HttpClient;

  constructor(
    public readonly environment: LedspEnvironment,
    private readonly emulator: boolean = false
  ) {
    this.ledspHttpClient = new HttpClient(
      LEDSP_API_ENDPOINT[this.environment].concat("/", LEDSP_API_BASEPATH)
    );
  }

  async findGameInfo(gameInfoId: string): Promise<GameInfo> {
    // TODO implement a specific class and transform it to a Decorator
    if (this.emulator) return undefined;
    return this.ledspHttpClient.get(
      `game-launcher/interpretations/${gameInfoId}/configuration`
    );
  }

  async sendProgress(payload: PlayerStatus) {
    // TODO implement a specific class and transform it to a Decorator
    if (this.emulator) return {};
    this.ledspHttpClient.post(`game-progress/${payload.gameId}`, payload);
  }

  async saveResults(results: Observation[]) {}

  // TODO Check: should this endpoint stay here?
  async debriefingInfo(debriefingId: string) {
    return this.ledspHttpClient.get(
      `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
    );
  }
}
