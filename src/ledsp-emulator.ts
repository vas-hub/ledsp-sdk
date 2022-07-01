import { GameConcept, Interpretation } from "./interfaces";

export class LedspEmulator {
  static async findInterpretation(
    interpretationId: string,
    gameConcept: GameConcept
  ): Promise<Interpretation> {
    const playerId = (Math.random() * 10000).toString();
    return {
      interpretationId,
      userId: (Math.random() * 10000).toString(),
      gameId: "String",
      playerId,
      team: (Math.random() * 10000).toString(),
      role: "Role 1",
      settings: {
        playURL: "#",
        configuration: {
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
          returnPath: "#",
          teamId: "Team 1",
          gameResultsRegistryEndpoint: "",
        },
      },
    };
  }
}
