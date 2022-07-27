import { GameProgressEvent } from "./game-progress";
import { GameConcept, Interpretation } from "./interfaces";
import ValidateGameFlow from "./validate-game-flow";

export class LedspEmulator {
  private _events: GameProgressEvent[] = [];
  private expectedEvents: { step: string; stage: string }[] = [];

  constructor(
    private readonly interpretationId: string,
    private readonly gameConcept: GameConcept
  ) {
    this.expectedEvents = gameConcept.gameFlow.reduce((acc, step) => {
      const phase = gameConcept.phases.find((p) => p.name == step.phase);
      for (const stage of phase.stages) acc.push({ step: step.id, stage });
      return acc;
    }, [] as { step: string; stage: string }[]);
  }

  private get storageKey() {
    return `games-progresses-events.${this.interpretationId}`;
  }

  get events(): GameProgressEvent[] {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(this.storageKey) || "[]")
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
    ValidateGameFlow(
      this.gameConcept,
      this.events,
      this.expectedEvents,
      event,
      console.error
    );

    if (typeof window !== "undefined")
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.events.concat(event))
      );
    else this._events.push(event);
  }
}
