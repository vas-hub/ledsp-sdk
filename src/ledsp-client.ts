import { LEDSP_API_BASEPATH, LEDSP_API_ENDPOINT } from "./env";
import LedspEnvironment from "./ledsp-environment.type";
import HttpClient from "./http-client";

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

  private try(callback: () => Promise<any>) {
    try {
      return callback();
    } catch (error) {
      throw new Error("An error occurred while fetching the data");
    }
  }

  async gameInfo(interpretationId: string) {
    return this.try(
      async () =>
        await this.ledspHttpClient.get(
          `game-launcher/interpretations/${interpretationId}/configuration`
        )
    );
  }

  async debriefingInfo(debriefingId: string) {
    this.try(
      async () =>
        await this.ledspHttpClient.get(
          `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
        )
    );
  }
}
