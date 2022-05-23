import HttpClient from "./http-client";
import LedspEnvironment from "./ledsp-environment.type";

export default class LedspClient {
  constructor(public readonly environment: LedspEnvironment) {}

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
        await HttpClient.get(
          this.environment,
          `game-launcher/interpretations/${interpretationId}/configuration`
        )
    );
  }

  async debriefingInfo(debriefingId: string) {
    this.try(
      async () =>
        await HttpClient.get(
          this.environment,
          `game-results-storages/payloads?gamingSessionIds[]=${debriefingId}`
        )
    );
  }
}
