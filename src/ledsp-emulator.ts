import { GameConcept, GameInfo } from "./interfaces";

export class LedspEmulator {
  static async findGameConfiguration(
    gameConcept: GameConcept
  ): Promise<GameInfo> {
    return {
      playOptions: gameConcept.defaultPlayOptionsSet,
      players: [
        {
          id: (Math.random() * 10000).toString(),
          color: "red",
          displayName: "Player 1",
        },
        {
          id: (Math.random() * 10000).toString(),
          color: "blue",
          displayName: "Player 2",
        },
      ],
      returnPath: "",
      teamId: "Emulated Team",
      gameResultsRegistryEndpoint: "",
    };
  }
}
