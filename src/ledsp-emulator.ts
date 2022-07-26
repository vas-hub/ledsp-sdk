import { GameProgressEvent } from "./game-progress";
import { GameConcept, Interpretation } from "./interfaces";

export class LedspEmulator {
  private _events: GameProgressEvent[] = [];

  constructor(
    private readonly interpretationId: string,
    private readonly gameConcept: GameConcept
  ) {}

  get events(): GameProgressEvent[] {
    return typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            `games-progresses-events.${this.interpretationId}`
          ) || "[]"
        )
      : this._events;
  }

  async findInterpretation(): Promise<Interpretation> {
    const playerId = (Math.random() * 10000).toString();
    return {
      interpretationId: this.interpretationId,
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
    if (typeof window !== "undefined")
      localStorage.setItem(
        `games-progresses-events.${this.interpretationId}`,
        JSON.stringify(this.events.concat(event))
      );
    else this._events.push(event);
  }
}
