import { GameProgressEvent } from "./game-progress";
import { GameConcept, Interpretation } from "./interfaces";

export class LedspEmulator {
  events: GameProgressEvent[] = [];

  constructor(private readonly gameConcept: GameConcept) {}

  async findInterpretation(interpretationId: string): Promise<Interpretation> {
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
          playOptions: this.gameConcept.defaultPlayOptionsSet,
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
  async sendGameProgressEvent(event: GameProgressEvent): Promise<void> {
    this.events.push(event);
  }
}
